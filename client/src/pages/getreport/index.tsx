import React, { useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useContext } from "react";
import {userContext} from "../../context/context"

function FileUpload() {
  const [files, setFiles] = useState({ file1: "", file2: "" });
  const [patientName, setPatientName] = useState({ patientName: "" });
  const [generatedResult, setGeneratedResult] = useState(null);
  const [imagePreview1, setImagePreview1] = useState();
  const [imagePreview2, setImagePreview2] = useState();
  const router = useRouter()

  const { User, setUser } = useContext(userContext);

  useEffect(() => {
    if (User.status == false) {
      if (localStorage.getItem('name')){
        setUser({name: localStorage.getItem('name'), status: true})
      }
      else{
      console.log("The status of user is: " + User.status)
      router.push("/login");
      }
    }
  }, [User, router.basePath]);


  const handleFileChange1 = (event) => {
    var file = event.target.files[0]
    setFiles({ ...files, file1: event.target.files[0] });
    console.log(event.target.files[0]);
    if(file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview1(reader.result);
        };
        reader.readAsDataURL(file);
      }
  };

  const handleFileChange2 = (event) => {
    var file = event.target.files[0]
    setFiles({ ...files, file2: event.target.files[0] });
    if(file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview2(reader.result);
        };
        reader.readAsDataURL(file);
      }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image1", files.file1);
    if (files.file2 != "") {
      formData.append("image2", files.file2);
    }
    try {
      const response = await axios.post(
        "http://localhost:3500/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setGeneratedResult(response.data)
      console.log("Files uploaded successfully");
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handleSave = async () => {
    const formData = new FormData()
    let doctorId = localStorage.getItem('user')
    formData.append("doctorId", doctorId)
    formData.append("patientName", patientName)
    formData.append("image1", files.file1)
    formData.append("image2", files.file2)
    formData.append("report", generatedResult.caption)
    console.log(doctorId)
    console.log(patientName)
    console.log(generatedResult.caption)
    try {
        // Send a POST request to Node.js backend
        const response = await axios.post('http://localhost:5000/saveReport', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log(response);
      } catch (error) {
        console.error('Error uploading images and patient name:', error);
      }
    router.push("/dashboard")
  }

  return (
    <>
      <div className="mt-10 w-90 flex flex-col mx-auto">
        <div className="text-center text-4xl font-bold">
          <h2>XrAI Report Generator</h2>
        </div>
        <div className="text-center mt-5">
          <p>
            <span className="font-bold">Instructions: </span> Upload Chest
            X-rays to generate a new report, make sure uploaded images are
            correct. <br></br>Please note that 2nd image is optional, and can be
            used to upload a different view of the same X-ray
          </p>
        </div>
        <form className="mt-10">
          <div className="mb-10 w-2/3 m-auto text-center">
            <label
              htmlFor="default-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Enter Patient's Name
            </label>
            <input
              type="text"
              id="default-input"
              required
              onChange={(e) => setPatientName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex flex-row justify-evenly flex-wrap">
            <div className=" w-2/6">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              >
                Upload Image 1
              </label>
              <input
                className="mt-2 p-2.5 block w-full text-sm text-gray-900 border-2 border-blue-900 cursor-pointer bg-blue-50 dark:text-gray-400 drop-shadow-md focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                type="file"
                onChange={handleFileChange1}
              />
            </div>
            <div className=" w-2/6">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              >
                Upload Image 2 (Optional)
              </label>
              <input
                className="mt-2 block p-2.5 w-full text-sm text-gray-900 border-2 border-blue-800 cursor-pointer bg-blue-50 dark:text-gray-400 drop-shadow-md focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                type="file"
                onChange={handleFileChange2}
              ></input>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <button
              className="text-black bg-blue-50 border-2 border-blue-800 hover:text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 drop-shadow-md dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleSubmit}
            >
              Generate Report
            </button>
          </div>
        </form>
        <hr className="mt-10 w-3/5 m-auto"></hr>
        <div className="mt-10 mb-10 flex justify-evenly">
          <div className=" w-2/6">
            {imagePreview1 && (
                          <img src={imagePreview1} alt="Uploaded" width="100%" className="h-96" />
            )}
          </div>
          <div className=" w-2/6">
          {imagePreview2 && (
                          <img src={imagePreview2} alt="Uploaded" width="100%" className="h-96" />
            )}
          </div>
        </div>
        {generatedResult && <>
        <hr className="mt-10 w-3/5 m-auto"></hr>
        <div className="mt-10 flex flex-col justify-center">
            <div className="font-bold text-center text-xl mt-2 mb-2">Generated Diagnosis</div>
            <div className="text-center">{generatedResult.caption}</div>
            <div className="mt-2 mb-2 text-center">
                <p>{generatedResult.time}</p>
            </div>
            <div className="flex justify-center mt-10 mb-20">
            <button
              className="text-black bg-blue-50 border-2 border-blue-800 hover:text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 drop-shadow-md dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleSave}
            >
              Save Diagnosis
            </button>
          </div>
        </div>
        </>
        }
      </div>
    </>
  );
}

export default FileUpload;

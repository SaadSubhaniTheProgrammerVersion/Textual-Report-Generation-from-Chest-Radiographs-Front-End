import React from "react";
// import config from "../../config/index.json";
// import Header from "../../components/Header";
// import DashboardTable from "../../components/DashboardTable";
// import Modal from "../../components/Modal";
import { useState } from "react";
import { useRouter } from "next/router";
// import { Props } from "@headlessui/react/dist/types";
import { useContext } from "react";
import { userContext } from "../../context/context.js";
import { useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const router = useRouter();
  const { User, setUser } = useContext(userContext);
  const [reports, setReports] = useState([]);

  const logout = () =>{
    setUser({name:"", status:false})
    localStorage.clear()
    router.push('/')
  }


  const getReports = async () => {
    const docId = localStorage.getItem('user')
    const response = await axios.get(`http://localhost:5000/getReports?id=${docId}`);
    const fetchedReports = response.data
    setReports(fetchedReports)
  };

  useEffect(() => {
    if (User.status == false) {
      if (localStorage.getItem("name")) {
        setUser({ name: localStorage.getItem("name"), status: true });
        getReports();
      } else {
        console.log("The status of user is: " + User.status);
        router.push("/login");
      }
    }
    else{
      getReports();
    }
  }, [User, getReports, reports, router.pathname]);

  // const { dummyUser } = config;
  const [showModal, setShowModal] = useState(false);
  return (
    // <>
    //   <div className="bg-background">
    //     <div className="overflow-hidden">
    //       <Header isLoggedIn={User.status}></Header>
    //     </div>
    //   </div>

    <>
      <link
        href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
        rel="stylesheet"
      />

      <div className="bg-white min-h-screen">
        {/* <div className="fixed bg-white text-blue-800 px-10 py-1 z-10 w-full"> */}
        {/* <div className="flex items-center justify-between py-2 text-5x1">
            <div className="font-bold text-blue-900 text-xl">Doctor's <span className="text-orange-600">Panel</span></div>
            <div className="flex items-center text-gray-500">
              {/* <span className="material-icons-outlined p-2" style={{ fontSize: "30px" }}>search</span>
              <span className="material-icons-outlined p-2" style={{ fontSize: "30px" }}>notifications</span>
              <div className="bg-center bg-cover bg-no-repeat rounded-full inline-block h-12 w-12 ml-2" style={{ backgroundImage: "url(https://i.pinimg.com/564x/de/0f/3d/de0f3d06d2c6dbf29a888cf78e4c0323.jpg)" }}></div> */}
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}

        <div className="flex flex-row pt-12 px-10 pb-4">
          <div className="w-2/12 mr-6">
            <div className="bg-white rounded-xl shadow-lg mb-6 px-6 py-4">
              <a
                href="\"
                className="inline-block text-gray-600 hover:text-black my-4 w-full"
              >
                <span className="material-icons-outlined float-left pr-2">
                  dashboard
                </span>
                Home
                <span className="material-icons-outlined float-right">
                  keyboard_arrow_right
                </span>
              </a>
              <a
                href="\getreport"
                className="inline-block text-gray-600 hover:text-black my-4 w-full"
              >
                <span className="material-icons-outlined float-left pr-2">
                  tune
                </span>
                Add New Report
                <span className="material-icons-outlined float-right">
                  keyboard_arrow_right
                </span>
              </a>
              <div
                onClick={logout}
                className="inline-block cursor-pointer text-gray-600 hover:text-black my-4 w-full"
              >
                <span className="material-icons-outlined float-left pr-2 text-red-500">
                  power_settings_new
                </span>
                <span className="text-red-500">Log out</span>
                <span className="material-icons-outlined float-right">
                  keyboard_arrow_right
                </span>
              </div>
            </div>

            {/* <div className="bg-white rounded-xl shadow-lg mb-6 px-6 py-4">
              <a href="" className="inline-block text-gray-600 hover:text-black my-4 w-full">
                <span className="material-icons-outlined float-left pr-2">face</span>
                Profile
                <span className="material-icons-outlined float-right">keyboard_arrow_right</span>
              </a>
              <a href="" className="inline-block text-gray-600 hover:text-black my-4 w-full">
                <span className="material-icons-outlined float-left pr-2">settings</span>
                Settings
                <span className="material-icons-outlined float-right">keyboard_arrow_right</span>
              </a>
              
            </div> */}
          </div>

          <div className="w-10/12">
            <div className="flex flex-row">
              <div
                className="bg-no-repeat bg-blue-800 border border-red-300 rounded-xl w-7/12 mr-2 p-6"
                style={{
                  backgroundImage:
                    "url(https://previews.dropbox.com/p/thumb/AAvyFru8elv-S19NMGkQcztLLpDd6Y6VVVMqKhwISfNEpqV59iR5sJaPD4VTrz8ExV7WU9ryYPIUW8Gk2JmEm03OLBE2zAeQ3i7sjFx80O-7skVlsmlm0qRT0n7z9t07jU_E9KafA9l4rz68MsaZPazbDKBdcvEEEQPPc3TmZDsIhes1U-Z0YsH0uc2RSqEb0b83A1GNRo86e-8TbEoNqyX0gxBG-14Tawn0sZWLo5Iv96X-x10kVauME-Mc9HGS5G4h_26P2oHhiZ3SEgj6jW0KlEnsh2H_yTego0grbhdcN1Yjd_rLpyHUt5XhXHJwoqyJ_ylwvZD9-dRLgi_fM_7j/p.png?fv_content=true&size_mode=5)",
                  backgroundPosition: "90% center",
                }}
              >
                <p className="text-5xl text-white">
                  Welcome
                  <br />
                  <strong>Dr. {User.name}</strong>
                </p>
              </div>

              <div
                className="bg-no-repeat bg-orange-200 border border-orange-300 rounded-xl w-5/12 ml-2 p-6"
                style={{
                  backgroundImage:
                    "url(https://previews.dropbox.com/p/thumb/AAuwpqWfUgs9aC5lRoM_f-yi7OPV4txbpW1makBEj5l21sDbEGYsrC9sb6bwUFXTSsekeka5xb7_IHCdyM4p9XCUaoUjpaTSlKK99S_k4L5PIspjqKkiWoaUYiAeQIdnaUvZJlgAGVUEJoy-1PA9i6Jj0GHQTrF_h9MVEnCyPQ-kg4_p7kZ8Yk0TMTL7XDx4jGJFkz75geOdOklKT3GqY9U9JtxxvRRyo1Un8hOObbWQBS1eYE-MowAI5rNqHCE_e-44yXKY6AKJocLPXz_U4xp87K4mVGehFKC6dgk_i5Ur7gspuD7gRBDvd0sanJ9Ybr_6s2hZhrpad-2WFwWqSNkh/p.png?fv_content=true&size_mode=5)",
                  backgroundPosition: "100% 40%",
                }}
              >
                <p className="text-5xl text-blue-800">
                  Total Generated Reports <br />
                  <strong>{reports.length}</strong>
                </p>
                <a
                  href=""
                  className="bg-orange-300 text-xl text-white underline hover:no-underline inline-block rounded-full mt-12 px-8 py-2"
                >
                  <strong>See messages</strong>
                </a>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-20">
              {reports?.map((report, index) => (
                <div
                  key={index}
                  className="relative bg-white-900 block p-6 border border-gray-400 rounded-lg max-w-sm mx-auto hover:border-blue-800 hover:drop-shadow-lg"
                >
                  <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-white via-blue-400 to-blue-900"></span>
                  <div className="my-4">
                    <h2 className="text-black text-2xl font-bold pb-2">
                      Patient Name: {report?.patientName}
                    </h2>
                    <p className="text-gray-900 py-1">
                      {report.Diagnosis}
                    </p>
                  </div>
                  {/* <div className="flex justify-center mb-7">
                    <button className="px-2 py-1 text-black border border-gray-200 font-semibold rounded hover:bg-blue-800 hover:text-white">
                      Click Me
                    </button>
                  </div> */}
                  <div>
                    <img
                      src={`data:${
                        report.Image1.contentType
                      };base64,${Buffer.from(report.Image1.data).toString(
                        "base64"
                      )}`}
                      alt="Patient Image"
                      height="400px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
//
export default Dashboard;

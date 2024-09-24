import { Props } from "framer-motion/types/types";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useContext } from "react";
import {userContext} from "../context/context"

const LoginForm = ({ isLogin }: Props) => {
  const {User,setUser} = useContext(userContext)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();
  const [error, setError] = useState("");

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async(event: any) => {
    event.preventDefault();
    // alert(`Name: ${formData.name} Email: ${formData.email} Password: ${formData.password}`);

    if (!isLogin && formData.password.length < 8) {
      setError("Password length should be greater than 8");
      setInterval(() => setError(""), 8000);
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert(`${formData.password}  ${formData.confirmPassword}`)
      setError("Passwords do not match, Please try again.");
      setInterval(() => setError(""), 8000);
      return;
    }

    if(!isLogin){
      const {name,email,password} = formData
      alert(name + email)
      try {
        const res = await axios.post('http://localhost:5000/user/register', {name,email,password});
        // console.log("Here I am")
        if(res.status === 400){
          setError("Email Already In Use.");
          setInterval(() => setError(""), 8000);
        }
        if(res.status === 200){
          setError("")
          setUser({name: formData.name, status:true})
          localStorage.setItem("name", formData.name)
          localStorage.setItem("id", res.data._id)
          router.push("/dashboard")
        }
      } catch (err) {
        setError("Error, Try Again")
        console.log(err)
      }
    }

    if(isLogin){
      const {email,password} = formData

      try {
        const res = await axios.post("http://localhost:5000/user/login", {email,password})

        if(res.status === 401){
          setError("Invalid Credentials, Try Again")
          setInterval(() => setError(""), 8000);
        }

        if(res.status === 200){
          setError("")
          console.log(res.data)
          setUser({name: formData.name, status:true})
          console.log("Status Changed to True" + User.status)
          localStorage.setItem("user", res.data._id)
          localStorage.setItem("name", res.data.name)
          router.push('/dashboard')
        }
      } catch (error) {
        
      }
    }
  };

  return (
    <>
      <section className={"dark:bg-gray-900"}>
        <div
          className={
            "flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
          }
        >
          <div
            className={
              "w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
            }
          >
            <div className={"p-6 space-y-4 md:space-y-6 sm:p-8"}>
              <h1
                className={
                  "text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
                }
              >
                {isLogin ? "Sign in to your account" : "Register a new account"}
              </h1>
              <form
                className={"space-y-4 md:space-y-6"}
                action="#"
                onSubmit={handleSubmit}
              >
                {!isLogin && (
                  <div>
                    <label
                      htmlFor="name"
                      className={
                        "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      }
                    >
                      Enter your name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      onChange={handleChange}
                      className={
                        "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-800 focus:border-blue-800 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      }
                      placeholder="Your Name Here"
                      required
                    />
                  </div>
                )}
                <div>
                  <label
                    htmlFor="email"
                    className={
                      "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    }
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    className={
                      "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    }
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className={
                      "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    }
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={
                      "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    }
                    required
                  />
                </div>
                {!isLogin && (
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className={
                        "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      }
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirm-password"
                      placeholder="••••••••"
                      onChange={handleChange}
                      className={
                        "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      }
                      required
                    />
                  </div>
                )}
                <div className={"flex items-center justify-between"}>
                  <div className={"flex items-start"}>
                    <div className={"flex items-center h-5"}>
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className={
                          "w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        }
                        required
                      />
                    </div>
                    <div className={"ml-3 text-sm"}>
                      <label
                        htmlFor="remember"
                        className={"text-gray-500 dark:text-gray-300"}
                      >
                        {isLogin
                          ? "Remember me"
                          : "I agree the terms and conditions"}
                      </label>
                    </div>
                  </div>
                  {isLogin && (
                    <a
                      href="#"
                      className={
                        "text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                      }
                    >
                      Forgot password?
                    </a>
                  )}
                </div>
                <div className="text-center text-red-600">
                  {error.length > 1 ? error : <></>}
                </div>
                {isLogin ? (
                  // <Link href={'/dashboard'}>
                  <button
                    type="submit"
                    className={
                      "w-full text-white bg-blue-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    }
                  >
                    Sign In
                  </button>
                ) : (
                  // </Link>
                  <button
                    type="submit"
                    className={
                      "w-full text-white bg-blue-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    }
                  >
                    Sign up
                  </button>
                )}
                <p
                  className={
                    "text-sm font-light text-gray-500 dark:text-gray-400"
                  }
                >
                  {isLogin ? (
                    <>
                      Don’t have an account yet?{" "}
                      <span
                        className={
                          "font-medium text-primary-600 hover:underline dark:text-primary-500"
                        }
                      >
                        <Link href={"/signup"}>Sign Up</Link>
                      </span>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <span
                        className={
                          "font-medium text-primary-600 hover:underline dark:text-primary-500"
                        }
                      >
                        <Link href={"login"}>Log in </Link>
                      </span>
                    </>
                  )}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginForm;

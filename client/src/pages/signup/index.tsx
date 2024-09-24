import React from 'react'
import MainHeroImage from '../../components/MainHeroImage';
import Header from "../../components/Header"
import LoginForm from '../../components/LoginForm';
import FormImage from '../../components/FormImage';

const Signup = () => {
  return (
    <div>
        <div className={`relative bg-background`}>
        <div className="max-w-7xl mx-auto">
          <div
            className={`relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32`}
          >
            <Header isLoggedIn={false}/>
            <LoginForm isLogin={false}/>
          </div>
        </div>
        <FormImage></FormImage>
      </div>
    </div>
  )
}

export default Signup;
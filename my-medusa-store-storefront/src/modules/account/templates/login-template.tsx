"use client"

import { useState } from "react"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("sign-in")

  return (
    <div className="w-full flex items-center justify-center relative overflow-hidden">
      <div className="relative z-10 w-full max-w-[480px]">
        {currentView === "sign-in" ? (
          <Login setCurrentView={setCurrentView as any} />
        ) : (
          <Register setCurrentView={setCurrentView as any} />
        )}
      </div>
    </div>
  )
}

export default LoginTemplate

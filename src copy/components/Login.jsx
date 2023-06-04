import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { client } from "../client";
// import { FcGoogle } from "react-icons/fc";

import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (credentialResponse) => {
    const details = jwtDecode(credentialResponse.credential);
    console.log(details);
    console.log(credentialResponse);

    localStorage.setItem("user", JSON.stringify(details));
    const { name, sub: googleId, picture: imageUrl } = details;

    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          Loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 bottom-0 left-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <GoogleOAuthProvider
            clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
          >
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={() => console.log("Login Failed")}
              onClick={() => {}}
              cookiePolicy="single_host_origin"
            />
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
};

export default Login;

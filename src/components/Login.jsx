import React from "react";
import { useNavigate } from "react-router-dom";
import jwdDecode from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { client } from "../client";

import shareVideo from "../assets/share.mp4";
import Logo2 from "../assets/Logo2.png";

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (credentialResponse) => {
    const details = jwdDecode(credentialResponse.credential);
    const { name, sub: googleId, picture: imageUrl, ...otherDetails } = details;

    const localDoc = {
      name,
      googleId,
      imageUrl,
      ...otherDetails,
    };

    console.log(localDoc);
    const doc = {
      _type: "user",
      _id: googleId,
      image: imageUrl,
      userName: name,
    };

    localStorage.setItem("user", JSON.stringify(localDoc));
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="flex flex-col justify-start items-center h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          Loop
          autoPlay
          muted
          controls={false}
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 bottom-0 left-0 bg-blackOverlay">
          <div className="p-5">
            <img src={Logo2} width="130px" alt="logo" />
          </div>
          <GoogleOAuthProvider
            clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
          >
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={() => console.log("Login failed")}
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

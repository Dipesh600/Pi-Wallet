"use client";
import { useEffect, useState } from "react";
import { loadPiSDK } from "../utils/piSDK";

const PiAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadPiSDK()
      .then((Pi) => {
        Pi.init({ version: "2.0" });

        Pi.authenticate(["username"], (result, auth) => {
          console.log("Authenticated user:", result);
          setUser(result);
        }, (error) => {
          console.error("Authentication failed:", error);
        });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {user ? (
        <p>Welcome, {user.username}!</p>
      ) : (
        <p>Authenticating with Pi Network...</p>
      )}
    </div>
  );
};

export default PiAuth;

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { handleProviderCallback } from "../../api/auth";
import { checkAuthStatus } from "../../redux/slices/authSlice";

const GoogleRedirect = () => {
  const [text, setText] = useState("Loading...");
  const location = useLocation();
  const { providerName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const processCallback = async () => {
      try {
        await handleProviderCallback(providerName, location.search);
        await dispatch(checkAuthStatus());
        setText("You have been successfully logged in. Redirecting...");
        setTimeout(() => navigate("/", { replace: true }), 3000);
      } catch (err) {
        console.error("Error during provider callback:", err);
        setText(
          "Login failed. Please try again or use another sign-in method."
        );
        setTimeout(() => navigate("/signin", { replace: true }), 3000);
      }
    };

    processCallback();
  }, [dispatch, navigate, location.search, providerName]);

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow max-w-md">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Botanica Plus
        </h2>
        <p className="text-gray-600">{text}</p>
      </div>
    </div>
  );
};

export default GoogleRedirect;

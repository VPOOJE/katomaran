import React, { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from "../Axios/axios.js";
import TokenContext from '../context/TokenContext.js';

function Register() {
  const [formData, setFormData] = useState({});
  const { userToken, tokenDispatch, userDispatch } = useContext(TokenContext);
  const [error, setError] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("/user/register", formData);
      tokenDispatch({ type: "SET_TOKEN", payload: result.data.token });
      userDispatch({ type: "SET_USER", payload: result.data.user });
      localStorage.setItem("authToken", JSON.stringify(result.data.token));
    } catch (error) {
      console.log(error);
      setError({ message: error.response?.data?.message || "Registration failed" });
    }
  };

  // ✅ Handle Google OAuth redirect with token in URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("access_token")) {
      const token = new URLSearchParams(hash.substring(1)).get("access_token");

      if (token) {
        localStorage.setItem("googleToken", token);
        tokenDispatch({ type: "SET_TOKEN", payload: token });

        fetch("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            userDispatch({ type: "SET_USER", payload: data });
            window.history.replaceState(null, null, window.location.pathname); // Clean URL
          })
          .catch((err) => console.error("Google login error:", err));
      }
    }
  }, [tokenDispatch, userDispatch]);

  return (
    <div>
      {userToken && <Navigate to="/" />}
      <section className="register-container">
        <div className="container px-6 py-12 h-full">
          <div className="flex justify-center items-center flex-wrap h-full text-gray-800">
            <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="Phone"
              />
            </div>
            <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="text-center border-2 border-green-600 p-2 mb-2 rounded-md bg-red-200 shadow-2xl">
                    {error.message}
                  </div>
                )}
                <div className="mb-6">
                  <input
                    type="text"
                    name="name"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white border border-gray-300 rounded focus:border-blue-600 focus:outline-none"
                    placeholder="Full name"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    name="email"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white border border-gray-300 rounded focus:border-blue-600 focus:outline-none"
                    placeholder="Email address"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="password"
                    name="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white border border-gray-300 rounded focus:border-blue-600 focus:outline-none"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 cursor-pointer"
                      defaultChecked
                    />
                    <label className="form-check-label text-gray-800">Remember me</label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-7 py-3 bg-blue-600 text-white text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 w-full"
                >
                  Register
                </button>

                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
                  <p className="text-center font-semibold mx-4 mb-0">OR</p>
                </div>

                {/* ✅ Google Login Button */}
                         <a
  className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
  style={{ backgroundColor: '#db4437' }}
  href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=927682597904-lhke36klfujp9dq4jibgl9rah5eqmg44.apps.googleusercontent.com&redirect_uri=http://localhost:3000/auth/callback&response_type=token&scope=email%20profile`}
  role="button"
  data-mdb-ripple="true"
  data-mdb-ripple-color="light"
>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="w-3.5 h-3.5 mr-2">
    <path fill="currentColor" d="M488 261.8c0-17.8-1.5-35.6-4.5-53.1H249v100.8h135.5c-5.8 31-23.5 57.3-50.2 74.9l81.4 63.4c47.5-43.8 74.8-108.3 74.8-185z"/>
    <path fill="currentColor" d="M249 492c67.5 0 124.2-22.5 165.5-61l-81.4-63.4c-22.8 15.3-51.9 24.3-84.1 24.3-64.8 0-119.8-43.6-139.5-102.1H25.6v64.3C67.2 435.7 151.8 492 249 492z"/>
    <path fill="currentColor" d="M109.5 289.8c-4.8-14.2-7.5-29.4-7.5-45s2.7-30.8 7.5-45V135.5H25.6C9.1 170.5 0 208.2 0 249.8s9.1 79.3 25.6 114.3l83.9-64.3z"/>
    <path fill="currentColor" d="M249 97.7c35.2 0 66.9 12.2 91.8 36.1l68.9-68.9C373.2 24.6 316.5 0 249 0 151.8 0 67.2 56.3 25.6 135.5l83.9 64.3c19.7-58.5 74.7-102.1 139.5-102.1z"/>
  </svg>
  Continue with Google
</a>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;

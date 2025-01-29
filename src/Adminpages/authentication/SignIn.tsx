import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from "react";

import { useLoginMutation } from "../../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../../types/api-types";
import { useNavigate } from "react-router-dom";

export default function AuthForm() {
  const navigate = useNavigate();
  // const [signIn, togglesignInsignUp] = useState(true);
  const [gender, setGender] = useState("male");
  const [date, setDate] = useState(Date());

  const [login] = useLoginMutation();
  const GooglePopUploginHandle = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      console.log(user);
      const res = await login({
        name: user.displayName!,
        _id: user.uid,
        dob: date,
        email: user.email!,
        gender,
        photo: user.photoURL!,
        role: "user",
      });
      if ("data" in res) {
        navigate("/");
        console.log("login sucess");
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        console.log(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen p-6 space-y-8 sm:p-8 bg-white   dark:bg-gray-800 flex flex-col justify-center ">
      <div className="max-w-lg w-full mx-auto">
        <form
          onSubmit={GooglePopUploginHandle}
          className="mt-8 space-y-6 flex flex-col justify-center items-center"
        >
          {
            <div className=" grid grid-cols-2 w-full gap-2">
              <div className="w-full">
                <label
                  htmlFor="gender"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Gender
                </label>
                <select
                  required
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  id="gender"
                  name="gender"
                  autoComplete="gender"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>male</option>
                  <option>female</option>
                </select>
              </div>
              <div className="w-full">
                <label
                  htmlFor="age"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter Your Date of Birth
                </label>
                <input
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                  type="date"
                  name="age"
                  id="age"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your Full Name"
                  required
                />
              </div>
            </div>
          }

          <button
            type="submit"
            className="px-4 py-2  w-full border flex justify-center gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
          >
            <img
              className="w-6 h-6"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            ></img>
            <span>Login with Google</span>
          </button>
        </form>
      </div>
    </div>
  );
}

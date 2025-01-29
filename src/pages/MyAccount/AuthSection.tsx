import { useState } from "react";
import { useLoginMutation } from "../../redux/api/userAPI";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../../types/api-types";

export function AuthSection() {
  const [gender, setGender] = useState("male");
  const [date, setDate] = useState(Date());
  const [login] = useLoginMutation();
  // const navigate = useNavigate();
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
        // navigate("/");
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
    <div className="flex-col flex w-full pt-5">
      <h2 className="text-2xl font-bold text-gray-500 pt-5">Sign Up</h2>
      <form
        onSubmit={GooglePopUploginHandle}
        className="mt-8 space-y-6 flex flex-col justify-center items-center"
      >
        {
          <div className=" grid grid-cols-2 w-full gap-3">
            <div className="w-full">
              <label
                htmlFor="gender"
                className="block mb-2 text-xl font-medium text-gray-900"
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
                className="border-[1px] border-gray-600 bg-white w-full py-2 h-full max-h-10 rounded-none px-2"
              >
                <option>male</option>
                <option>female</option>
              </select>
            </div>
            <div className="w-full">
              <label
                htmlFor="age"
                className="block mb-2 text-xl font-medium text-gray-900"
              >
                Date of Birth
              </label>
              <input
                // style={{ backgroundColor: "black" }}
                onChange={(e) => setDate(e.target.value)}
                value={date}
                type="date"
                name="age"
                id="age"
                className="border-[1px] border-gray-600 bg-white w-full py-2 h-full max-h-10 rounded-none px-2"
                required
              />
            </div>
          </div>
        }
        <button
          type="submit"
          className="px-2 py-3  mt-5 w-full border flex justify-center gap-2 bg-black text-white hover:shadow transition duration-150"
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
  );
}

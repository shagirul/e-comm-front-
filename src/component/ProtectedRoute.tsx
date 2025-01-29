import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { UserReducerInitialState } from "../types/reducer-types";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getUser } from "../redux/api/userAPI";
import { userExist, userNotExist } from "../redux/reducer/userReducer";
import { auth } from "../firebase";
import AuthForm from "../Adminpages/authentication/SignIn";
import NotAuthorized from "../Adminpages/authentication/NotAuthorized";

// interface Props {
//   isAuthenticated?: boolean;
//   isAdmin?: boolean; // Directly check if user is admin
//   redirectPath?: string; // Optional redirect path
// }

const ProtectedRoute = () => {
  const { user, loading } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (Fuser) => {
      // console.log(Fuser);
      if (Fuser) {
        const data = await getUser(Fuser.uid);
        console.log("User found, dispatching userExist with data:", data);
        dispatch(userExist(data.user));
      } else {
        console.log("No user found, dispatching userNotExist.");
        dispatch(userNotExist());
      }
    });
    return () => {
      unsub();
    };
  }, []);
  return (
    <div className="h-full w-full text-black">
      {loading && <div>loading</div>}
      {/* {user === null && loading === false && <AuthForm />}
      {user !== null && user.role !== "admin" && <NotAuthorized />} */}
      {/* {user !== null && user.role === "admin" && <Outlet />} */}
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;

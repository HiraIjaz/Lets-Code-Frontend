import { useSelector } from "react-redux";
import { getSuccessMessage } from "../features/users/usersSlice";
import AutoCloseAlert from "../components/AutoCloseAlter";

export default function HomePage() {
  const success = useSelector(getSuccessMessage);

  return (
    <>
      {success === "User logged out" && (
        <AutoCloseAlert
          message={success}
          alertType="success"
          time="0.5"
        ></AutoCloseAlert>
      )}
      <h1>Welcome to Let's Code</h1>
    </>
  );
}

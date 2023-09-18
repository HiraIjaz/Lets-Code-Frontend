import { useSelector } from "react-redux";
import { getUser } from "../features/users/usersSlice";
export default function UserBasePage() {
  const currentUser = useSelector(getUser);

  return (
    <div>
      {currentUser ? (
        <h1>Welcome {currentUser.username}!</h1>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

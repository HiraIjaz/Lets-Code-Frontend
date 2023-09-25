import { useSelector } from "react-redux";
import { getSuccessMessage } from "../features/users/usersSlice";
import AutoCloseAlert from "../components/AutoCloseAlter";
import { Box } from "@mui/material";
export default function HomePage() {
  const success = useSelector(getSuccessMessage);

  return (
    <>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          mt: 12,
        }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        autoComplete="off"
      >
        {success === "User logged out" && (
          <AutoCloseAlert
            message={success}
            alertType="success"
            time="0.5"
          ></AutoCloseAlert>
        )}
        <h1>Welcome to Let's Code</h1>
      </Box>
    </>
  );
}

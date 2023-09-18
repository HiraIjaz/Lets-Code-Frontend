import { useState } from "react";
import { Alert, AlertTitle } from "@mui/material";

// eslint-disable-next-line react/prop-types
function AutoCloseAlert({ message, alertType, time }) {
  const [open, setOpen] = useState(true);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const timeout = Number(time) * 1000;
  // Automatically close the alert
  if (time !== "0") {
    setTimeout(handleClose, timeout);
  }

  return (
    <div>
      {open && (
        <Alert severity={alertType} onClose={handleClose}>
          <AlertTitle>{capitalizeFirstLetter(alertType)}</AlertTitle>
          {message}
          {alertType === "success" ? (
            <strong> successfully</strong>
          ) : (
            <strong> try again!</strong>
          )}
        </Alert>
      )}
    </div>
  );
}

export default AutoCloseAlert;

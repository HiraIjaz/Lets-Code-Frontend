import { useState } from "react";
import { Alert, AlertTitle } from "@mui/material";
import { capitalizeFirstLetter } from "../utils"; // Adjust the import path as needed
import PropTypes from "prop-types";

function AutoCloseAlert({ message, alertType, time }) {
  const [open, setOpen] = useState(true);

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

AutoCloseAlert.propTypes = {
  message: PropTypes.string.isRequired,
  alertType: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};
export default AutoCloseAlert;

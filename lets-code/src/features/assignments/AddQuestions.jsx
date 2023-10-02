import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import QuestionsList from "../questions/QuestionsList";
import { useState } from "react";
import SliderBtns from "../../components/SliderBtns";
import PropTypes from "prop-types";

function AddQuestions({ data, next, prev }) {
  return (
    <>
      <SliderBtns
        date={data}
        prev={prev}
        next={next}
        showPrev={true}
        showNext={true}
      />
      <QuestionsList />
    </>
  );
}
AddQuestions.propTypes = {
  data: PropTypes.object.isRequired,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
};
export default AddQuestions;

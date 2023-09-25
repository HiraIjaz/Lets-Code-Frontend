import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import QuestionsList from "../questions/QuestionsList";
import { useState } from "react";
import SliderBtns from "../../components/SliderBtns";

// eslint-disable-next-line react/prop-types
function AddQuestions({ data, next, prev }) {
  const validationSchema = Yup.object({
    q: Yup.string().required("Question is required"),
  });

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

export default AddQuestions;

import React, { useEffect, useState } from "react";
import { Grid, SliderThumb } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useFormik, Form, Formik } from "formik";
import * as Yup from "yup";
import TextField from "../FormsUI/TextField";
import ButtonWrapper from "../FormsUI/Button";
import Notification from "../DispayComponents/Notification";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import SelectField from "../FormsUI/SelectField";
import SyncIcon from "@mui/icons-material/Sync";
import IconButton from "@mui/material/IconButton";
import { useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SubmitButton from "../FormsUI/SubmitButton";
import CountryOptions from "./CountryOptions.json";

const FORM_VALIDATION = Yup.object().shape({
  vacancy: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  skills: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
});

export default function EditProject(props) {
  const [details, setDetails] = useState(null);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const navigate = useNavigate();
  const { vacancyId } = useParams();

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8070/vacancy/getVacancy/" + vacancyId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDetails(res.data);
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: err.message,
          type: "error",
        });
      });
  }, [vacancyId, token]);

  return (
    <>
      <Notification notify={notify} setNotify={setNotify} />

      <div className="popup">
        <DialogTitle>
          <div className="d-flex">
            <IconButton
              onClick={() => {
                navigate(-1);
              }}
              className="iconbtn"
            >
              <KeyboardBackspaceIcon />
            </IconButton>

            <p className="projectTitle">Edit Vacancy</p>
          </div>
        </DialogTitle>

        {details ? (
          <Formik
            initialValues={{
              vacancy: details?.vacancy || "",
              description: details?.description || "",
              skills: details?.skills || "",
              country: details?.country || "",
              projectName: details?.project?.projectName || "",
              company: details?.project?.company || "",
            }}
            validationSchema={FORM_VALIDATION}
            onSubmit={async (values) => {
              axios
                .put(
                  "http://localhost:8070/vacancy/updateVacancy/" + vacancyId,
                  {
                    vacancy: values.vacancy,
                    description: values.description,
                    skills: values.skills,
                    country: values.country,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                )
                .then((res) => {
                  setNotify({
                    isOpen: true,
                    message: "Vacancy updated successfully!",
                    type: "success",
                  });
                  navigate("/vacancies/viewVacancy/" + vacancyId);
                })
                .catch((err) => {
                  setNotify({
                    isOpen: true,
                    message: err.message,
                    type: "error",
                  });
                });
            }}
          >
            <Form>
              <Grid container sx={{ paddingTop: "10px" }} spacing={2}>
                <Grid item xs={12}>
                  <TextField name="vacancy" label="Vacancy" />
                </Grid>

                <Grid item xs={4}>
                  <TextField name="projectName" label="Project" disabled />
                </Grid>

                <Grid item xs={4}>
                  <TextField name="company" label="Company" disabled />
                </Grid>

                <Grid item xs={4}>
                  <SelectField
                    name="country"
                    label="Country"
                    options={CountryOptions}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="description"
                    label="Job Description"
                    multiline
                    minRows={4}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="skills"
                    label="Requierd Skills"
                    multiline
                    minRows={4}
                  />
                </Grid>

                <div className="d-flex addProjectButtons">
                  <SubmitButton startIcon={<SyncIcon />}>Update</SubmitButton>
                </div>
              </Grid>
            </Form>
          </Formik>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

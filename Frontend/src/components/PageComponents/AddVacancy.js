import React, { useState, useEffect } from "react";
import { Divider, Grid } from "@mui/material";
import "../../styles/dashboard.css";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useFormik, Form, Formik, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";
import TextField from "../FormsUI/TextField";
import SelectField from "../FormsUI/SelectField";
import SubmitButton from "../FormsUI/SubmitButton";
import Toast from "../FormsUI/Toast";
import { useNavigate } from "react-router-dom";
import Notification from "../DispayComponents/Notification";
import CountryOptions from "./CountryOptions.json";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

// FORMIK
const INITIAL_FORM_STATE = {
  vacancy: "",
  country: "",
  description: "",
  skills: "",
};

// YUP
const FORM_VALIDATION = Yup.object().shape({
  vacancy: Yup.string().required("Required!"),
  country: Yup.string().required("Required!"),
  description: Yup.string().required("Required!"),
  skills: Yup.string().required("Required!"),
});

export default function AddVacancy(props) {
  const navigate = useNavigate();
  const { openPopup, setOpenPopup } = props;

  var projectId = props.projectId;

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  // // AUTHENTICATION HEADER
  // const token = localStorage.getItem("token");

  // TOAST
  const [alert, setAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("error");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert(false);
  };

  // AUTHENTICATION HEADER
  const token = localStorage.getItem("token");

  return (
    <Dialog open={openPopup} maxWidth="sm" TransitionComponent={Transition}>
      {/* ERROR MSG START*/}
      <Toast open={alert} onClose={handleClose} type={type} message={msg} />
      {/* ERROR MSG END*/}

      <div className="popup">
        <DialogTitle>
          <div className="d-flex justify-content-between">
            <p className="popupTitle">Add Vacancy</p>
            <ClearIcon
              onClick={() => {
                setOpenPopup(false);
              }}
              sx={{
                cursor: "pointer",
                color: "var(--blue)",
                fontSize: "1.7rem",
                marginTop: "6px",
                marginRight: "10px",
              }}
            />
          </div>

          {/* NOTIFICATION */}
          <Notification notify={notify} setNotify={setNotify} />

          <Divider
            sx={{
              height: "1px",
              backgroundColor: "var(--dark)",
              marginTop: "10px",
            }}
          />
        </DialogTitle>

        <DialogContent>
          <Formik
            initialValues={{ ...INITIAL_FORM_STATE }}
            validationSchema={FORM_VALIDATION}
            onSubmit={async (values) => {
              console.log(values);

              await axios
                .post(
                  "http://localhost:8070/vacancy/create",
                  {
                    vacancy: values.vacancy,
                    project: projectId,
                    country: values.country,
                    description: values.description,
                    skills: values.skills,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                )
                .then((res) => {
                  sessionStorage.setItem("vacancyCreated", "1");
                  setOpenPopup(false);
                  navigate("/project");
                })
                .catch((err) => {
                  if (
                    err.response &&
                    err.response.data &&
                    err.response.data.errorMessage
                  ) {
                    setNotify({
                      isOpen: true,
                      message: err.response.data.errorMessage,
                      type: "error",
                    });
                  }
                });
            }}
          >
            <Form>
              <Grid container sx={{ paddingTop: "10px" }} spacing={2}>
                {/* 1st row */}
                <Grid item xs={12}>
                  <TextField name="vacancy" label="Vacancy Name" />
                </Grid>

                {/* 2nd row */}

                <Grid item xs={12}>
                  <SelectField
                    name="country"
                    options={CountryOptions}
                    label="Country"
                  />
                </Grid>

                {/* 4th row */}

                <Grid item xs={12}>
                  <TextField
                    name="description"
                    label="Job Description"
                    multiline
                    minRows={4}
                    placeholder="In this Vacancy you should...."
                  />
                </Grid>

                {/* 5th row */}

                <Grid item xs={12}>
                  <TextField
                    name="skills"
                    label="Required Skills"
                    multiline
                    minRows={3}
                    placeholder="In this Vacancy you should have...."
                  />
                </Grid>

                {/* 5th row */}

                <div className="d-flex addProjectButtons">
                  <Button
                    type="reset"
                    startIcon={<ClearIcon />}
                    variant="outlined"
                    sx={{
                      marginInline: "10px",
                      border: "1px solid var(--light-blue)",
                      color: "var(--light-blue)",
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": {
                        color: "red",
                        border: "1px solid red",
                      },
                      borderRadius: "10px",
                    }}
                  >
                    Clear
                  </Button>

                  <SubmitButton startIcon={<AddIcon />}>Create</SubmitButton>
                </div>
              </Grid>
            </Form>
          </Formik>
        </DialogContent>
      </div>
    </Dialog>
  );
}

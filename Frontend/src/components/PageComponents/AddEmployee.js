import React, { useState, useEffect } from "react";
import { Divider, Grid } from "@mui/material";
import "../../styles/dashboard.css";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import TextField from "../FormsUI/TextField";
import Dobpicker from "../FormsUI/DobPicker";
import ButtonWrapper from "../FormsUI/Button";
import SubmitButton from "../FormsUI/SubmitButton";
import { useNavigate } from "react-router-dom";
import Notification from "../DispayComponents/Notification";
import SelectField from "../FormsUI/SelectField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Typography from "@mui/material/Typography";
import { ErrorMessage, Field } from "formik";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

// FORMIK
const INITIAL_FORM_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  dob: "",
  address: "",
  etfNo: "",
  epfNo: "",
  nic: "",
  designation: "",
  role: "",
  contact: "",
  baseSalary: "",
  performance: "",
  tenure: "",
  cv: null,
};

// YUP
const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Required!"),
  lastName: Yup.string().required("Required!"),
  email: Yup.string().email("Invalid email format!").required("Required!"),
  username: Yup.string().required("Required!"),
  password: Yup.string().required("Required!"),
  dob: Yup.date().required("Required!"),
  etfNo: Yup.number().required("Required!"),
  epfNo: Yup.number().required("Required!"),
  nic: Yup.string().min(9, "Enter a valid NIC").required("Required!"),
  designation: Yup.string().required("Required!"),
  role: Yup.string().required("Required!"),
  contact: Yup.string()
    .matches(/^\d{10}$/, "Invalid contact number format! Example: 0771234567")
    .required("Required!"),
  address: Yup.string().required("Required!"),
  baseSalary: Yup.number()
    .min(0, "Minimum salary should be 0!")
    .required("Required!"),
  performance: Yup.number()
    .min(0, "Minimum performance should be 0!")
    .max(100, "Maximum performance is 100")
    .required("Required!"),

  tenure: Yup.number()
    .min(1, "Minimum performance should be 1!")
    .max(4, "Maximum performance is 4")
    .required("Required!"),
  cv: Yup.mixed()
    .required("A CV is required")
    .test(
      "fileSize",
      "File size is too large",
      (value) => value && value.size <= 5 * 1024 * 1024
    )
    .test(
      "fileFormat",
      "Unsupported file format",
      (value) => value && ["application/pdf"].includes(value.type)
    ),
});

//the AddEmployee function
export default function AddEmployee(props) {
  const navigate = useNavigate();
  const { openPopup, setOpenPopup } = props;
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  return (
    <Dialog
      open={openPopup}
      maxWidth="lg"
      TransitionComponent={Transition}
      PaperProps={{
        style: { borderRadius: 10 },
      }}
    >
      <div className="popup">
        <DialogTitle>
          <div className="d-flex justify-content-between">
            <p className="popupTitle">Add Employee</p>
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
              console.log(values.cv);

              const fullName = `${values.firstName} ${values.lastName}`;

              await axios
                .post(
                  "http://localhost:8070/user/register",
                  {
                    fullName: fullName,
                    email: values.email,
                    username: values.username,
                    password: values.password,
                    dob: values.dob,
                    designation: values.designation,
                    role: values.role,
                    nic: values.nic,
                    etfNo: values.etfNo,
                    epfNo: values.epfNo,
                    address: values.address,
                    contact: values.contact,
                    baseSalary: values.baseSalary,
                    leaveDates: "20",
                    creditPoints: [],
                    grade: "",
                    empStat: "Active",
                    totCP: "",
                    performance: values.performance,
                    tenure: values.tenure,

                    cv: values.cv,
                  },
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  }
                )
                .then((res) => {
                  sessionStorage.setItem("employeeCreated", "1");
                  setOpenPopup(false);
                  navigate("/employees");
                  window.location.reload(false);
                })
                .catch((err) => {
                  if (
                    err.response &&
                    err.response.data &&
                    err.response.data.error ===
                      "A user with the same username already exists"
                  ) {
                    alert("A user with the same username already exists");
                  } else {
                    console.log(err.response.data.error);
                  }
                });
            }}
          >
            {({ setFieldValue, values }) => (
              <Form>
                <Grid container sx={{ paddingTop: "10px" }} spacing={2}>
                  <Grid item xs={3}>
                    <TextField name="firstName" label="First Name" />
                  </Grid>

                  <Grid item xs={3}>
                    <TextField name="lastName" label="Last Name" />
                  </Grid>

                  <Grid item xs={3}>
                    <TextField name="etfNo" label="etf No." />
                  </Grid>

                  <Grid item xs={3}>
                    <TextField name="epfNo" label="epf No." />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField name="email" label="Email" />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField name="nic" label="NIC" />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField name="username" label="Username" />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      type="password"
                      name="password"
                      label="Password"
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <TextField name="designation" label="Designation" />
                  </Grid>

                  <Grid item xs={3}>
                    <SelectField
                      name="role"
                      label="Role"
                      options={{
                        leader: "Delivery Leader",
                        "HR Manager": "HR Manager",
                        employee: "Employee",
                      }}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Dobpicker name="dob" />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField name="contact" label="Contact" />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField name="address" label="Address" />
                  </Grid>

                  <Grid item xs={3}>
                    <TextField name="baseSalary" label="Base salary" />
                  </Grid>

                  <Grid item xs={2}>
                    <TextField name="performance" label="Performance" />
                  </Grid>

                  <Grid item xs={2}>
                    <TextField name="tenure" label="Tenure" />
                  </Grid>

                  {/* CV Upload */}
                  <Grid item xs={2}>
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload CV
                      <VisuallyHiddenInput
                        type="file"
                        name="cv"
                        accept=".pdf"
                        onChange={(event) => {
                          setFieldValue("cv", event.currentTarget.files[0]);
                        }}
                      />
                    </Button>

                    {/* Display the selected file name */}
                    {values.cv && (
                      <Typography
                        variant="body2"
                        style={{ marginLeft: "10px" }}
                      >
                        {values.cv.name}
                      </Typography>
                    )}

                    <ErrorMessage name="cv">
                      {(msg) => <Typography color="error">{msg}</Typography>}
                    </ErrorMessage>
                  </Grid>

                  <div className="d-flex addProjectButtons">
                    <ButtonWrapper
                      startIcon={<ClearIcon />}
                      style={{ marginRight: "15px" }}
                    >
                      Clear
                    </ButtonWrapper>

                    <SubmitButton startIcon={<AddIcon />}>Add</SubmitButton>
                  </div>
                </Grid>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </div>
    </Dialog>
  );
}

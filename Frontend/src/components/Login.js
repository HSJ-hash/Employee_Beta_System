import React, { useState } from "react";
import "../styles/login.css";
import logo from "../images/logo.png";
import axios from "axios";
import Slide from "@mui/material/Slide";
import { useFormik, Formik, Form } from "formik";
import * as Yup from "yup";
import ClearIcon from "@mui/icons-material/Clear";
import { Grid } from "@mui/material";
import TextfieldWrapper from "./FormsUI/TextField";
import Dialog from "@mui/material/Dialog";
import SubmitButton from "./FormsUI/SubmitButton";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Notification from "./DispayComponents/Notification";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

// FORMIK
const INITIAL_FORM_STATE = {
  username: "",
  password: "",
};

//YUP
const FORM_VALIDATION = Yup.object().shape({
  username: Yup.string().required("Username Required!"),
  password: Yup.string().required("Password Required!"),
});

export default function Login(props) {
  const { openPopup, setOpenPopup } = props;

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const handleClose = () => {
    setOpenPopup(false);
  };

  return (
    <Dialog
      open={openPopup}
      maxWidth="sm"
      // fullWidth
      TransitionComponent={Transition}
      PaperProps={{
        style: { borderRadius: 10 },
      }}
    >
      <DialogTitle>
        <div className="d-flex justify-content-between">
          <p
            className="popupTitle"
            style={{
              textAlign: "center",
              width: "100%",
            }}
          >
            Sign in to Nova
          </p>
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
      </DialogTitle>

      <DialogContent>
        <Formik
          initialValues={{ ...INITIAL_FORM_STATE }}
          validationSchema={FORM_VALIDATION}
          onSubmit={async (values) => {
            await axios
              .post("http://localhost:8070/user/login", {
                username: values.username,
                password: values.password,
              })
              .then((res) => {
                window.localStorage.setItem("token", res.data);
                window.localStorage.setItem("LoggedIn", true);
                sessionStorage.setItem("showmsg", "1");
                window.location.href = "./";
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
          <Form style={{ padding: "5%" }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <p className="loginInputLabel">Username</p>
                <TextfieldWrapper
                  name="username"
                  placeholder="Enter your username"
                />
              </Grid>

              <Grid item xs={12}>
                <p className="loginInputLabel">Password</p>
                <TextfieldWrapper
                  name="password"
                  type="password"
                  placeholder="Enter your Password"
                />
              </Grid>
            </Grid>
            <SubmitButton
              style={{
                marginTop: "25px",
                width: "100%",
                padding: "10px",
                backgroundColor: "var(--pink)",
                color: "var(--white)",
                border: "1px solid var(--pink)",
                "&:hover": {
                  backgroundColor: "var(--white)",
                  border: "1px solid var(--pink)",
                  color: "var(--pink)",
                },
              }}
            >
              Sign In
            </SubmitButton>
          </Form>
        </Formik>
      </DialogContent>

      {/* <div className="login-main">
        <div className="login-container container">
          <div className="right"></div>
        </div>
      </div> */}
    </Dialog>
  );
}

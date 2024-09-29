import React, { useState, useEffect } from "react";
import {
  FormGroup,
  styled,
  Typography,
  Grid,
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import ClearIcon from "@mui/icons-material/Clear";
import SubmitButton from "../FormsUI/SubmitButton";
import TextField from "../FormsUI/TextField";
import SelectField from "../FormsUI/SelectField";
import ButtonWrapper from "../FormsUI/Button";
import SyncIcon from "@mui/icons-material/Sync";
import Notification from "../DispayComponents/Notification";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

// Validation Schema (uncommented now)
const FORM_VALIDATION = Yup.object().shape({
  subject: Yup.string().required("Required!"),
  date: Yup.string().required("Required!"),
  time: Yup.string().required("Required!"),
  organizer: Yup.string().required("Required!"),
  platform: Yup.string().required("Required!"),
});

const Container = styled(FormGroup)`
  width: 70%;
  align-items: center;
  margin: auto;
  & > div {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

const EditMeeting = (props) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { openPopupEdit, setOpenPopupEdit } = props;

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  // Get meeting details as props
  const meetingDetails = props.meetingDetails;

  useEffect(() => {
    console.log(meetingDetails);
  });

  return (
    <Dialog open={openPopupEdit} maxWidth="sm" TransitionComponent={Transition}>
      {/* Notification Component */}
      <Notification notify={notify} setNotify={setNotify} />

      <div className="popup">
        <DialogTitle>
          <div className="d-flex justify-content-between">
            <p className="popupTitle">Edit Meeting</p>
            <ClearIcon
              onClick={() => setOpenPopupEdit(false)}
              sx={{
                cursor: "pointer",
                color: "var(--blue)",
                fontSize: "1.7rem",
                marginTop: "6px",
                marginRight: "10px",
              }}
            />
          </div>
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
            initialValues={{
              subject: meetingDetails.subject,
              date: new Date(meetingDetails.date).toLocaleDateString("en-CA"),
              time: meetingDetails.time,
              organizer: meetingDetails.organizer,
              platform: meetingDetails.platform,
            }}
            validationSchema={FORM_VALIDATION} // Ensuring Yup validation is active
            onSubmit={async (values) => {
              try {
                await axios
                  .put(
                    `http://localhost:8070/meeting/editmeeting/${meetingDetails._id}`,
                    {
                      subject: values.subject,
                      date: values.date,
                      time: values.time,
                      organizer: values.organizer,
                      platform: values.platform,
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                  )
                  .then(() => {
                    sessionStorage.setItem("MeetingUpdated", "1");
                    setOpenPopupEdit(false);
                    navigate("/meetings");
                    window.location.reload(false);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } catch (err) {
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
              }
            }}
          >
            {({ resetForm }) => (
              <Form>
                <Grid container sx={{ paddingTop: "10px" }} spacing={2}>
                  {/* First row */}
                  <Grid item xs={6}>
                    <TextField name="subject" label="Subject" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField name="date" type="date" fullWidth label="Date" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField name="time" label="Time" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField name="organizer" label="Organizer" />
                  </Grid>

                  {/* Second row */}
                  <Grid item xs={6}>
                    <SelectField
                      name="platform"
                      label="Platform"
                      options={{
                        Zoom: "Zoom",
                        Teams: "MS Teams",
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} className="d-flex addProjectButtons">
                    <ButtonWrapper
                      startIcon={<ClearIcon />}
                      style={{ marginRight: "15px" }}
                      onClick={resetForm} // Reset the form values on Clear
                    >
                      Clear
                    </ButtonWrapper>

                    <SubmitButton startIcon={<SyncIcon />}>Update</SubmitButton>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default EditMeeting;

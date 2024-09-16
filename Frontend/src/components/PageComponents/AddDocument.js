import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Divider, Grid } from "@mui/material";
import "../../styles/dashboard.css";
import "../../styles/viewComponent.css";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextField from "../FormsUI/TextField";
import SelectField from "../FormsUI/SelectField";
import DatePicker from "../FormsUI/DatePicker";
import SubmitButton from "../FormsUI/SubmitButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddDocument(props) {
  const { openPopup, setOpenPopup } = props;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // FORMIK
  const INITIAL_FORM_STATE = {
    documentName: "",
    category: "",
    description: "",
  };

  //YUP
  const FORM_VALIDATION = Yup.object().shape({
    documentName: Yup.string().required("Required!"),
    description: Yup.string().required("Required!"),
    category: Yup.string().required("Required!"),
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <>
      <Dialog open={openPopup} maxWidth="sm">
        {/* ERROR MSG START*/}

        {/* ERROR MSG END*/}

        <div className="popup">
          <DialogTitle>
            <div className="d-flex justify-content-between">
              <p className="popupTitle">Add Notice</p>
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
                await axios
                  .post(
                    "http://localhost:8070/documents/add",
                    {
                      docName: values.documentName,
                      category: values.category,
                      description: values.description,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  )
                  .then((res) => {
                    sessionStorage.setItem("noticeAdded", "1");
                    setOpenPopup(false);
                    navigate("/documents");
                    window.location.reload(false);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              <Form>
                <Grid container sx={{ paddingTop: "10px" }} spacing={2}>
                  {/* 1st row */}
                  <Grid item xs={12}>
                    <TextField name="documentName" label="Notice Heading" />
                  </Grid>

                  {/* 2nd row */}

                  <Grid item xs={12}>
                    <SelectField
                      name="category"
                      label="Category"
                      options={{
                        GeneralAnnouncements: "General Announcements",
                        ProjectUpdates: "Project Updates",
                        TaskNotifications: "Task Notifications",
                        TaskNotifications: "Employee Performance",
                        TeamCommunication: "Team Communication",
                        HrNotifications: "HR Notifications",
                        SecurityAlerts: "Security Alerts",
                        HealthAndSafety: "Health and Safety",
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      name="description"
                      label="Notice Body"
                      multiline
                      minRows={4}
                      placeholder="This Notice is about....."
                    />
                  </Grid>

                  <div className="d-flex addProjectButtons">
                    <SubmitButton startIcon={<AddIcon />}>Create</SubmitButton>
                  </div>
                </Grid>
              </Form>
            </Formik>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
}

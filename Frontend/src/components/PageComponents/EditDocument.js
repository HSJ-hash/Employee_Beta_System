import React from "react";
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
import { useNavigate } from "react-router-dom";
import SubmitButton from "../FormsUI/SubmitButton";
import axios from "axios";

export default function EditDocument(props) {
  const { openPopupEdit, setOpenPopupEdit } = props;
  const navigate = useNavigate();
  const documentDetails = props.documentDetails;

  //YUP
  const FORM_VALIDATION = Yup.object().shape({
    documentName: Yup.string().required("Required!"),
    description: Yup.string().required("Required!"),
    category: Yup.string().required("Required!"),
  });

  return (
    <>
      <Dialog open={openPopupEdit} maxWidth="sm">
        {/* ERROR MSG START*/}

        {/* ERROR MSG END*/}

        <div className="popup">
          <DialogTitle>
            <div className="d-flex justify-content-between">
              <p className="popupTitle">Edit Notice</p>
              <ClearIcon
                onClick={() => {
                  setOpenPopupEdit(false);
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
              initialValues={{
                documentName: documentDetails.docName,
                dueDate: new Date(documentDetails.date).toLocaleDateString(
                  "en-CA"
                ),
                category: documentDetails.category,
                description: documentDetails.description,
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={async (values) => {
                await axios
                  .put(
                    "http://localhost:8070/documents/" + documentDetails._id,
                    {
                      docName: values.documentName,
                      category: values.category,
                      description: values.description,
                    }
                  )
                  .then(() => {
                    sessionStorage.setItem("noticeUpdated", "1");
                    setOpenPopupEdit(false);
                    navigate("/documents/");
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

                  {/* 3rd row */}

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
                    <SubmitButton startIcon={<AddIcon />}>UPDATE</SubmitButton>
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

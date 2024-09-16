import React, { useEffect, useState } from "react";
import { Divider, Grid, MenuItem, Select, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Formik, Form, ErrorMessage } from "formik";
import axios from "axios";
import TextField from "../FormsUI/TextField";
import SubmitButton from "../FormsUI/SubmitButton";
import Notification from "../DispayComponents/Notification";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useGetRole } from "../GetRole"; // Import the custom hook

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

export default function UpdateEmployee(props) {
  const { openPopup2, setOpenPopup2, employeeDetails } = props;
  const token = localStorage.getItem("token");

  // Get the role using the custom hook
  const currentRole = useGetRole();

  const [id, setID] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [dob, setDOB] = useState("");
  const [designation, setDesignation] = useState("");
  const [nic, setNIC] = useState("");
  const [etfNo, setetfNo] = useState("");
  const [epfNo, setepfNo] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [leaveDates, setLeaveDates] = useState("");
  const [baseSalary, setBaseSalary] = useState("");
  const [performance, setPerformance] = useState("");
  const [tenure, settenure] = useState("");
  const [ranking, setranking] = useState("");
  const [cv, setcv] = useState(null); // Store the new CV
  const [existingCvName, setExistingCvName] = useState(""); // Store existing CV name

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    if (employeeDetails) {
      setetfNo(employeeDetails.etfNo || "");
      setFullName(employeeDetails.fullName || "");
      setEmail(employeeDetails.email || "");
      setUsername(employeeDetails.username || "");
      setRole(employeeDetails.role || "");
      setDOB(
        employeeDetails.dob ? new Date(employeeDetails.dob).toISOString().split("T")[0] : ""
      );
      setDesignation(employeeDetails.designation || "");
      setNIC(employeeDetails.nic || "");
      setepfNo(employeeDetails.epfNo || "");
      setAddress(employeeDetails.address || "");
      setContact(employeeDetails.contact || "");
      setLeaveDates(employeeDetails.leaveDates || "");
      setBaseSalary(employeeDetails.baseSalary || "");
      setPerformance(employeeDetails.performance || "");
      settenure(employeeDetails.tenure || "");
      setranking(employeeDetails.ranking || "");
      setID(employeeDetails.id || "");

      // Set existing CV name
      if (employeeDetails.cv) {
        const cvFileName = employeeDetails.cv.split("/").pop();
        setExistingCvName(cvFileName);
      }
    }
  }, [employeeDetails]);

  const renderOptions = () => {
    const options = ["leader", "HR Manager", "employee"];
    return options.map((option) => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ));
  };

  return (
    <Dialog
      open={openPopup2}
      maxWidth="lg"
      TransitionComponent={Transition}
      PaperProps={{
        style: { borderRadius: 10 },
      }}
    >
      <Notification notify={notify} setNotify={setNotify} />

      <div className="popup">
        <DialogTitle>
          <div className="d-flex justify-content-between">
            <p className="popupTitle">
              <EditIcon className="me-3" />
              Update Employee
            </p>
            <ClearIcon
              onClick={() => {
                setOpenPopup2(false);
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
              marginBottom: "10px",
            }}
          />
        </DialogTitle>

        <DialogContent>
          <Formik
            initialValues={{
              fullName: fullName,
              email: email,
              username: username,
              role: role,
              dob: dob,
              designation: designation,
              nic: nic,
              etfNo: etfNo,
              epfNo: epfNo,
              address: address,
              contact: contact,
              leaveDates: leaveDates,
              baseSalary: baseSalary,
              performance: performance,
              tenure: tenure,
              ranking: ranking,
            }}
            onSubmit={async (values) => {
              const formData = new FormData(); // Create form data for updating
              formData.append("fullName", values.fullName);
              formData.append("email", values.email);
              formData.append("username", values.username);
              formData.append("role", values.role);
              formData.append("dob", values.dob);
              formData.append("designation", values.designation);
              formData.append("nic", values.nic);
              formData.append("etfNo", values.etfNo);
              formData.append("epfNo", values.epfNo);
              formData.append("address", values.address);
              formData.append("contact", values.contact);
              formData.append("leaveDates", values.leaveDates);
              formData.append("baseSalary", values.baseSalary);
              formData.append("performance", values.performance);
              formData.append("tenure", values.tenure);
              formData.append("ranking", values.ranking);

              // Append the new CV file if it's uploaded
              if (cv) {
                formData.append("cv", cv);
              }

              try {
                await axios.put(
                  `http://localhost:8070/user/updateUser/${employeeDetails.id}`,
                  formData,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "multipart/form-data", // Ensure multipart form data
                    },
                  }
                );
                setOpenPopup2(false);
                window.location.reload(); // Reload to show updated data
              } catch (error) {
                console.error(error);
                setNotify({
                  isOpen: true,
                  message: "Update Failed",
                  type: "error",
                });
              }
            }}
            enableReinitialize
          >
            {({ setFieldValue }) => (
              <Form>
                <Grid container spacing={2} sx={{ padding: "10px" }}>
                  {/* Conditionally render fields based on roles */}
                  {currentRole === "admin" && (
                    <>
                      <Grid item xs={6}>
                        <TextField name="fullName" label="Full Name" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField name="email" label="Email" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField name="username" label="Username" />
                      </Grid>
                      <Grid item xs={6}>
                        <Select
                          name="role"
                          label="Role"
                          value={role}
                          onChange={(event) => {
                            setFieldValue("role", event.target.value);
                          }}
                        >
                          {renderOptions()}
                        </Select>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField name="dob" label="Date of Birth" type="date" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField name="designation" label="Designation" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField name="nic" label="NIC" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField name="etfNo" label="ETF No" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField name="epfNo" label="EPF No" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField name="address" label="Address" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField name="contact" label="Contact" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField name="leaveDates" label="Leave Dates" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField name="baseSalary" label="Base Salary" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField name="performance" label="Performance" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField name="tenure" label="Tenure" />
                      </Grid>
                    </>
                  )}

                  {/* Render common fields for all roles */}
                  {["employee", "leader", "HR Manager"].includes(currentRole) && (
                    <>
                      <Grid item xs={6}>
                        <TextField name="email" label="Email" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField name="username" label="Username" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField name="address" label="Address" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField name="contact" label="Contact" />
                      </Grid>
                    </>
                  )}

                  {/* CV Upload (for all roles) */}
                  <Grid item xs={12}>
                    <Typography variant="h6">Current CV: {existingCvName || "No CV uploaded"}</Typography>
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      sx={{ mt: 2 }}
                    >
                      Upload New CV
                      <VisuallyHiddenInput
                        type="file"
                        name="cv"
                        accept=".pdf"
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          if (file) {
                            setcv(file);
                          }
                        }}
                      />
                    </Button>

                    {cv && (
                      <Typography variant="body2" style={{ marginLeft: "10px" }}>
                        Selected CV: {cv.name}
                      </Typography>
                    )}
                    <ErrorMessage name="cv">
                      {(msg) => <Typography color="error">{msg}</Typography>}
                    </ErrorMessage>
                  </Grid>

                  <div className="d-flex addProjectButtons">
                    <SubmitButton>Update Employee</SubmitButton>
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

import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import "../../styles/dashboard.css";
import { Form, Formik } from "formik";
import axios from "axios";
import { Avatar, Box, CardContent, Typography } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import TextField from "../FormsUI/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import vector from "../../../src/images/avatar.jpg";
import { useNavigate, useParams } from "react-router-dom";
import DashboardCard from "../DispayComponents/DashboardCard";

export default function ViewProfile() {
  const token = localStorage.getItem("token");
  const { userId } = useParams();
  const [userRole, setUserRole] = useState("");

  //user data array
  const [fetched, setfetched] = useState([]);

  //the popuo2
  const [count, setCount] = useState(0);

  //Getting user details
  useEffect(() => {
    axios
      .get("http://localhost:8070/user/viewProfile/" + userId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setfetched(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:8070/user/getRole", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserRole(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [id, setID] = useState(" ");
  const [fullName, setFullName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [role, setRole] = useState(" ");
  const [dob, setDOB] = useState(" ");
  const [designation, setDesignation] = useState(" ");
  const [nic, setNIC] = useState(" ");
  const [address, setAddress] = useState(" ");
  const [contact, setContact] = useState(" ");
  const [ranking, setranking] = useState(" ");
  const [tenure, settenure] = useState(" ");
  const [performance, setperformance] = useState(" ");
  const [cv, setcv] = useState(" ");

  const navigate = useNavigate();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    // Update testuser state when fetched.username changes
    if ((fetched, count < 5)) {
      if (fetched.fullName == null) {
        setFullName("");
      } else {
        setFullName(fetched.fullName);
      }

      if (fetched.email == null) {
        setEmail("");
      } else {
        setEmail(fetched.email);
      }

      if (fetched.role == null) {
        setRole("");
      } else {
        setRole(fetched.role);
      }

      if (fetched.dob == null) {
        setDOB("");
      } else {
        const date = new Date(fetched.dob);
        const formattedDate = date.toISOString().split("T")[0];
        setDOB(formattedDate);
      }

      if (fetched.designation == null) {
        setDesignation("");
      } else {
        setDesignation(fetched.designation);
      }

      if (fetched.nic == null) {
        setNIC("");
      } else {
        setNIC(fetched.nic);
      }

      if (fetched.address == null) {
        setAddress("");
      } else {
        setAddress(fetched.address);
      }

      if (fetched.contact == null) {
        setContact("");
      } else {
        setContact(fetched.contact);
      }

      if (fetched.ranking == null) {
        setranking("");
      } else {
        setranking(fetched.ranking);
      }

      if (fetched.tenure == null) {
        settenure("");
      } else {
        settenure(fetched.tenure);
      }

      if (fetched.performance == null) {
        setperformance("");
      } else {
        setperformance(fetched.performance);
      }

      if (fetched.cv == null) {
        setcv("");
      } else {
        setcv(fetched.cv);
      }

      setID(fetched.id);

      setCount(count + 1);
    }
  }, [fetched]);

  return (
    <>
      <div className="d-flex justify-content-end">
        {/*CV analysis based on roles */}
        {userRole === "leader" ||
        userRole === "admin" ||
        userRole === "HR Manager" ? (
          <a href="https://www.google.lk/" target="blank">
            <Button
              startIcon={<ExitToAppIcon />}
              variant="outlined"
              sx={{
                border: "1px solid var(--light-blue)",
                color: "var(--light-blue)",
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": {
                  backgroundColor: "var(--light-blue)",
                  color: "var(--white)",
                  border: "1px solid var(--white)",
                },
                marginBottom: "25px",
                marginRight: "10px",
              }}
            >
              CV Analysis
            </Button>
          </a>
        ) : null}

{(userRole === "leader" || userRole === "admin" || userRole === "HR Manager") && (
  <a
    href={`http://localhost:8070/${cv}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Button
      startIcon={<ExitToAppIcon />}
      variant="outlined"
      sx={{
        border: "1px solid var(--light-blue)",
        color: "var(--light-blue)",
        "&:hover": {
          backgroundColor: "var(--light-blue)",
          color: "var(--white)",
          border: "1px solid var(--white)",
        },
        marginBottom: "25px",
        marginRight: "10px",
      }}
    >
      View CV
    </Button>
  </a>
)}



{(userRole === "leader" || userRole === "admin" || userRole === "HR Manager") && (
  <a href={`http://localhost:8070/${cv}`} download>
    <Button
      startIcon={<ExitToAppIcon />}
      variant="outlined"
      sx={{
        border: "1px solid var(--light-blue)",
        color: "var(--light-blue)",
        "&:hover": {
          backgroundColor: "var(--light-blue)",
          color: "var(--white)",
          border: "1px solid var(--white)",
        },
        marginBottom: "25px",
      }}
    >
      Download CV
    </Button>
  </a>
)}


      </div>

      <DashboardCard sx={{ mb: 2 }}>
        <CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img src={vector} style={{ borderRadius: "50%", height: "90px" }} />
            <Typography gutterBottom variant="h5">
              {fetched.username}
            </Typography>

            <Typography color="text.secondary" variant="body2">
              {fetched.email}
            </Typography>

            <Typography color="text.secondary" variant="body2">
              {fetched.designation}
            </Typography>
          </Box>
        </CardContent>
      </DashboardCard>

      <DashboardCard sx={{ p: 5 }}>
        <Formik
          initialValues={{
            fullName: fullName,
            email: email,
            role: role,
            dob: dob,
            designation: designation,
            nic: nic,
            address: address,
            contact: contact,
            ranking: ranking,
            tenure: tenure,
            performance: performance,
            cv: cv,
          }}
        >
          <Form>
            <Grid container sx={{ paddingTop: "10px" }} spacing={2}>
              {/* 1st row */}
              <Grid item xs={6}>
                <TextField
                  type="text"
                  name="fullName"
                  label="Full Name"
                  value={fullName}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField name="email" label="Email" value={email} />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  name="designation"
                  label="Designation"
                  value={designation}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField name="role" label="Role" value={role} />
              </Grid>

              <Grid item xs={6}>
                <TextField name="address" label="Address" value={address} />
              </Grid>

              <Grid item xs={6}>
                <TextField name="dob" label="Date-of-Birth" value={dob} />
              </Grid>

              <Grid item xs={6}>
                <TextField name="contact" label="Contact" value={contact} />
              </Grid>

              <Grid item xs={6}>
                <TextField name="nic" type="number" label="NIC" value={nic} />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  name="nic"
                  type="tenure"
                  label="Tenure"
                  value={tenure}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="nic"
                  type="performance"
                  label="Performance"
                  value={performance}
                />
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </DashboardCard>
    </>
  );
}

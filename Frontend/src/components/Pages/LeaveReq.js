import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box, CardContent, Typography, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import moment from "moment";
import axios from "axios";
import DashboardCard from "../DispayComponents/DashboardCard";
import ButtonWrapper from "../FormsUI/Button";
import CreateLeave from "../PageComponents/AddLeaveReq";
import UpdateLeaveReq from "../PageComponents/UpdateLeaveReq";
import DeleteLeaveReq from "../PageComponents/DeleteLeaveReq";
import "../../styles/dashboard.css";

export default function LeaveReq() {
  // The popups
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const token = localStorage.getItem("token");

  // User data
  const [fetched, setfetched] = useState({});
  const [fetchedLeaves, setFetchedLeaves] = useState([]);
  const [LID, setLID] = useState(null);
  const [onClickFetchedLeaves, setOnClickFetchedLeaves] = useState([]);

  // Date difference calculation
  function dateDiff(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const timeDiff = d2.getTime() - d1.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }

  // Fetch user details
  useEffect(() => {
    axios
      .get(`http://localhost:8070/user/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setfetched(res.data);
        console.log("User Data:", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  // Fetch leave requests
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await axios.get("http://localhost:8070/leaves/getLeaves", {
          params: {
            username: fetched.username || "Dananjayahbi119",
          },
        });
        setFetchedLeaves(res.data);
        console.log("Leave Requests:", res.data);
      } catch (err) {
        console.log(err);
      }
    };

    // Only fetch if user data is available
    if (fetched.username) {
      fetchLeaves();
    }
  }, [fetched.username]);

  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = (`0${date.getMonth() + 1}`).slice(-2); // Months are zero indexed
    const dd = (`0${date.getDate()}`).slice(-2);
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        {/* Add Leave button */}
        {fetched.leaveDates > 0 ? (
          <Button
            startIcon={<AddIcon />}
            variant="outlined"
            sx={{
              border: "1px solid var(--light-blue)",
              color: "var(--light-blue)",
              "&:hover": {
                backgroundColor: "var(--light-blue)",
                color: "var(--white)",
                border: "1px solid var(--white)",
              },
              marginBottom: "15px", // Spacing between button and Remaining Leaves
            }}
            onClick={() => {
              setOpenPopup(true); // Open the popup
            }}
          >
            Apply Leave
          </Button>
        ) : (
          <Typography variant="body1" color="error" sx={{ marginBottom: "15px" }}>
            All leaves used!
          </Typography>
        )}

        {/* Remaining Leaves display */}
        <Box
          sx={{
            backgroundColor: "#f0f4f8",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #d1e3f0",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            width: "100%",
            maxWidth: "300px", // Adjust width
            textAlign: "center", // Center the text
          }}
        >
          <Typography variant="h6" color="primary">
            Remaining Leaves
          </Typography>
          <Typography variant="h5" color="secondary" sx={{ fontWeight: 600 }}>
            {fetched.leaveDates !== undefined ? fetched.leaveDates : "Loading..."}
          </Typography>
        </Box>
      </div>

      {/* Rest of your content, such as Leave Request History */}
      <Box
        sx={{
          alignItems: "start",
          display: "flex",
          flexDirection: "column",
          fontWeight: 600,
          fontSize: 28,
          marginTop: "30px", // Adjust the spacing
        }}
      >
        <Typography>Leave Request History</Typography>
      </Box>

      {/* Leave Requests */}
      {fetchedLeaves.slice().reverse().map((leaveRequest) => (
        <DashboardCard key={leaveRequest._id} sx={{ mb: 2 }}>
          <CardContent>
            <Box
              sx={{
                alignItems: "start",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
                {leaveRequest.status === "approved" ? (
                  <FiberManualRecordIcon style={{ fill: "#198754", marginRight: "5px" }} />
                ) : leaveRequest.status === "pending" ? (
                  <FiberManualRecordIcon style={{ fill: "#FFC107", marginRight: "5px" }} />
                ) : leaveRequest.status === "rejected" ? (
                  <FiberManualRecordIcon style={{ fill: "#DC3545", marginRight: "5px" }} />
                ) : null}
                {leaveRequest.username}
              </Typography>
            </Box>
            <Divider
              sx={{
                height: "1px",
                backgroundColor: "var(--dark)",
                marginTop: "10px",
                mb: 3,
              }}
            />
            <Box
              sx={{
                alignItems: "start",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography mb>
                <b>Requested Date:</b> {moment(leaveRequest.reqdDate).format("YYYY-MM-DD")}
              </Typography>
              <Typography mb>
                <b>Leave Type:</b> {leaveRequest.leaveType}
              </Typography>
              <Typography mb>
                <b>Start Date:</b> {moment(leaveRequest.startDate).format("YYYY-MM-DD")}
              </Typography>
              <Typography mb>
                <b>End Date:</b> {moment(leaveRequest.endDate).format("YYYY-MM-DD")}
              </Typography>
              <Typography mb>
                <b>Requested Leaves:</b> {dateDiff(leaveRequest.startDate, leaveRequest.endDate)}
              </Typography>
              <Typography mb textAlign={"start"}>
                <b>Reason:</b> {leaveRequest.reason}
              </Typography>
              <Typography mb>
                <b>Remaining Leaves:</b> {leaveRequest.remainingLeaves}
              </Typography>
              <Typography>
                <b>Status:</b> {leaveRequest.status}
              </Typography>
            </Box>
          </CardContent>
        </DashboardCard>
      ))}

      {/* Popups for Creating and Updating Leave Requests */}
      <CreateLeave
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        employeeDetails={fetched}
      />
      <UpdateLeaveReq
        openPopup2={openPopup2}
        setOpenPopup2={setOpenPopup2}
        leaveDetails={onClickFetchedLeaves}
      />
    </>
  );
}

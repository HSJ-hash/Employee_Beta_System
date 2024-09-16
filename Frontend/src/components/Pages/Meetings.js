import React, { useState, useEffect } from 'react';
import "../../styles/viewComponent.css";
import "../../styles/taskView.css";
import { styled } from '@mui/material/styles';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { Link, useNavigate } from "react-router-dom";
import CreateMeeting from "../PageComponents/CreateMeeting";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getMeeting, deleteMeeting, addMeeting } from '../service/apiMeeting';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from "axios";
import EditMeeting from "../PageComponents/EditMeeting";
import EditIcon from "@mui/icons-material/Edit";
import ButtonWrapper from "../FormsUI/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import MeetingSearch from "../PageComponents/MeetingSearch";
import { useGetRole } from "../GetRole"; 

export default function Meetings() {
  const [meeting, setMeeting] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch role using custom hook
  const userRole = useGetRole();

  useEffect(() => {
    axios
      .get("http://localhost:8070/meeting", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setMeeting(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  const deleteMeeting = (id) => {
    axios
      .delete(`http://localhost:8070/meeting/deletemeeting/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text("Meeting Details", 20, 10);
    autoTable(doc, { html: "#meetingTable" }, { theme: "grid" });
    doc.save("meetings_report.pdf");
  };

  const redirectToZoomScheduleMeeting = () => {
    window.open("https://zoom.us/start", "_blank");
  };

  const redirectToGoogleCalendar = () => {
    window.open("https://calendar.google.com/calendar/", "_blank");
  };

  return (
    <div>
      <div>
        {/* Conditionally show buttons based on user role */}
        {(userRole === "leader" || userRole === "admin" || userRole === "HR Manager") && (
          <>
            <Button
              variant="outlined"
              sx={{
                marginInline: "10px",
                padding: "10px",
                marginBottom: "10px",
                marginLeft: "40%",
                border: "1px solid var(--light-blue)",
                color: "var(--light-blue)",
                "&:hover": {
                  color: "red",
                  border: "1px solid red",
                },
              }}
              onClick={redirectToZoomScheduleMeeting}
            >
              Start a Zoom Meeting
            </Button>

            <Button
              variant="outlined"
              sx={{
                marginInline: "10px",
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid var(--light-blue)",
                color: "var(--light-blue)",
                "&:hover": {
                  color: "red",
                  border: "1px solid red",
                },
              }}
              onClick={() => navigate("/addMeeting")}
            >
              Schedule New Meeting
            </Button>
          </>
        )}

        <Button
          variant="outlined"
          sx={{
            marginInline: "10px",
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid var(--light-blue)",
            color: "var(--light-blue)",
            "&:hover": {
              color: "red",
              border: "1px solid red",
            },
          }}
          onClick={downloadPdf}
        >
          Download Meetings Report PDF
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table id="meetingTable" sx={{ minWidth: 550 }} size="medium">
          <TableHead>
            <TableRow>
              <TableCell width="30%">Subject</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Time</TableCell>
              <TableCell align="right">Organizer</TableCell>
              <TableCell align="right">Platform</TableCell>

              {/* Conditionally render the Actions column header for admin users only */}
              {userRole === "admin" && <TableCell align="right">Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {meeting.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.subject}</TableCell>
                <TableCell align="right">{new Date(row.date).toLocaleDateString()}</TableCell>
                <TableCell align="right">{row.time}</TableCell>
                <TableCell align="right">{row.organizer}</TableCell>
                <TableCell align="right">{row.platform}</TableCell>

                {/* Conditionally render the action buttons for admin users only */}
                {userRole === "admin" && (
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => navigate(`/editMeeting/${row._id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ marginLeft: "10px" }}
                      onClick={() => deleteMeeting(row._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="outlined"
        sx={{
          marginInline: "10px",
          padding: "10px",
          marginBottom: "10px",
          marginTop: "15px",
          marginLeft: "60%",
          border: "1px solid var(--light-blue)",
          color: "var(--light-blue)",
          "&:hover": {
            color: "red",
            border: "1px solid red",
          },
        }}
        onClick={redirectToGoogleCalendar}
      >
        Add to Google Calendar
      </Button>
    </div>
  );
}

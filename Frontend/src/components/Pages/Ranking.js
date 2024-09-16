import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../../styles/dashboard.css";
import AddProject from "../PageComponents/AddProject";
import axios from "axios";
import SkeletonBars from "../FormsUI/SkeletonBars";
import { useNavigate } from "react-router-dom";
import StarsIcon from "@mui/icons-material/Stars";
import { EmptyIcon } from "../DispayComponents/EmptyIcon";

export default function Project() {
  // AUTHENTICATION HEADER
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetEmp, fetchedEmps] = useState([]);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      axios
        .get("http://localhost:8070/user/getAllUsers", {})
        .then((res) => {
          // Filter out users with "Admin" in their fullName
          const filteredData = res.data.filter((user) => !user.fullName.includes("Admin"));
          
          // Sort the filtered data by performance in descending order
          const sortedData = filteredData.sort((a, b) => b.performance - a.performance);
          
          fetchedEmps(sortedData);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500);
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="projectTitle" style={{ fontSize: "1.3rem" }}>
          <StarsIcon className="me-2 " style={{ color: "gray" }} /> Your
          Employee Ranking Board
        </p>
      </div>

      {loading ? (
        <SkeletonBars />
      ) : fetEmp.length === 0 ? (
        <EmptyIcon
          title="No rankings yet"
          subTitle="Rankings will appear once users are signed in"
        />
      ) : (
        <TableContainer
          sx={{
            borderRadius: "10px",
            boxShadow: "0px 0px 15px lightgray",
          }}
          component={Paper}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <p className="tbHeading">RANKING</p>
                </TableCell>
                <TableCell align="left">
                  <p className="tbHeading">DESIGNATION</p>
                </TableCell>
                <TableCell align="left">
                  <p className="tbHeading">EMPLOYEE NAME</p>
                </TableCell>
                <TableCell align="center">
                  <p className="tbHeading">TENURE</p>
                </TableCell>
                <TableCell align="right" sx={{ paddingRight: "30px" }}>
                  <p className="tbHeading">PERFORMANCE %</p>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fetEmp.map((row, index) => (
                <TableRow
                  key={row._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { backgroundColor: "var(--tb-hover)" },
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/employees/viewProfile/" + row._id);
                  }}
                >
                  <TableCell align="left">
                    <p className="tableData">{index + 1}</p>
                  </TableCell>
                  <TableCell align="left" className="col-md-2">
                    <p className="tableData">{row.designation}</p>
                  </TableCell>
                  <TableCell align="left">
                    <p className="tableData">{row.fullName}</p>
                  </TableCell>
                  <TableCell align="center">
                    <p className="tableData">{row.tenure}</p>
                  </TableCell>

                  <TableCell align="right" sx={{ paddingRight: "30px" }}>
                    <p className="tableData">{row.performance}</p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

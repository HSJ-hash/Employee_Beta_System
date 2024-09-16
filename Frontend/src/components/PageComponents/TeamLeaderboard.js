import React, { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import DashboardCard from "../DispayComponents/DashboardCard";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import AvatarGroup from "@mui/material/AvatarGroup";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import axios from "axios";
import vector from "../../../src/images/avatar.jpg";
import { useNavigate, useParams } from "react-router-dom";

const TeamLeaderboard = () => {
  const navigate = useNavigate();
  const [leaderboard, setLeadreboard] = useState([]);

  useEffect(() => {
    function leaderboard() {
      axios
        .get("http://localhost:8070/team/leaderboard2")
        .then((res) => {
          setLeadreboard(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    leaderboard();
  }, []);

  return (
    <>
      <Grid container spacing={4}>
        <Grid container item>
          <h2>Team Leaderboard</h2>
        </Grid>

        <Grid item xs={12}>
          <TableContainer
            component={Paper}
            sx={{ backgroundColor: "var(--dashboard-bg)" }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "transparent",
                    borderWidth: "8px",
                    borderColor: "var(--dashboard-bg)",
                  }}
                >
                  <TableCell>
                    <p className="tbHeading">Team Name</p>
                  </TableCell>

                  <TableCell align="center">
                    <p className="tbHeading">Project Name</p>
                  </TableCell>
                  <TableCell align="center">
                    <p className="tbHeading">Member Count</p>
                  </TableCell>
                  <TableCell align="center">
                    <p className="tbHeading">Project Count</p>
                  </TableCell>
                  <TableCell align="center">
                    <p className="tbHeading">Score</p>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {leaderboard.map((row) => (
                  <TableRow
                    //key={row._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": { backgroundColor: "var(--tb-hover)" },
                      cursor: "pointer",
                      backgroundColor: "white",
                      borderWidth: "8px",
                      borderColor: "var(--dashboard-bg)",
                    }}
                    /*onClick={() => {
                    navigate("/teams/viewTeam/" + row.teamId);
                  }}*/
                  >
                    <TableCell component="th" scope="row" className="">
                      <div className="text2">
                        <p className="tableCommon tableData">{row.team}</p>
                        <p className="tableCommon tableSubData"></p>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <div className="text2">
                        <p className="tableCommon tableData ">{row.projectName}</p>
                        <p className="tableCommon tableSubData "></p>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <div className="text2">
                        <p className="tableCommon tableData ">
                          {row.memberCount}
                        </p>
                        <p className="tableCommon tableSubData "></p>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <div className="flag">{row.projectCount}</div>
                    </TableCell>
                    <TableCell align="center">
                      <div className="flag">{row.score}</div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default TeamLeaderboard;

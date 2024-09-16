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
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { EmptyIcon } from "../DispayComponents/EmptyIcon";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import ConfirmationBox from "../DispayComponents/ConfirmationBox";
import MenuItem from "@mui/material/MenuItem";

// OPTIONS MENU START

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 10,
    backgroundColor: "var(--dashboard-bg)",
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "var(--gray) 0px 0px 10px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

// OPTIONS MENU END

export default function Project() {
  // AUTHENTICATION HEADER
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  var [active, setActive] = useState(0);
  var [queued, setQueued] = useState(0);
  var [completed, setCompleted] = useState(0);
  const [length, setLength] = useState(0);
  const [vacancy, setVacancy] = useState([]);
  const [role, setRole] = useState("");

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    type: "",
    title: "",
    subTitle: "",
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8070/vacancy/getVacancy", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setVacancy(res.data);
        setLoading(false);
        setLength(res.data.length);
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
        setRole(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [openPopup, setOpenPopup] = useState(false);

  // OPTIONS MENU START
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // OPTIONS MENU END

  return (
    <>
      {/* CONFIRM DIALOG */}
      <ConfirmationBox
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="projectTitle" style={{ fontSize: "1.3rem" }}>
          Vacancies
        </p>
      </div>

      {loading ? (
        <SkeletonBars />
      ) : vacancy.length === 0 ? (
        <EmptyIcon
          title="No vacancies yet"
          subTitle="Project vacancies will appear when your leader creates project vacancies"
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
                <TableCell sx={{ paddingLeft: "30px" }}>
                  <p className="tbHeading">VACANCY</p>
                </TableCell>

                <TableCell align="left">
                  <p className="tbHeading">PROJECT</p>
                </TableCell>
                <TableCell align="center">
                  <p className="tbHeading">COMPANY</p>
                </TableCell>
                <TableCell align="right" sx={{ paddingRight: "30px" }}>
                  <p className="tbHeading">COUNTRY</p>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vacancy.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { backgroundColor: "var(--tb-hover)" },
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/vacancies/viewVacancy/" + row._id);
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ paddingLeft: "30px" }}
                  >
                    <p className="tableCommon tableData">{row.vacancy}</p>
                  </TableCell>

                  <TableCell align="left">
                    <p className="tableCommon tableData">
                      {row.project.projectName}
                    </p>
                  </TableCell>

                  <TableCell align="center">
                    <p className="tableData">{row.project.company}</p>
                  </TableCell>

                  <TableCell align="right" sx={{ paddingRight: "30px" }}>
                    <p className="tableData">{row.country}</p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <AddProject
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      ></AddProject>
    </>
  );
}

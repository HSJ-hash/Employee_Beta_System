import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FlagIcon from "@mui/icons-material/Flag";
import AddTask from "./AddTask";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../../styles/addTask.css";
import "../../styles/dashboard.css";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import CircularProgress from "@mui/material/CircularProgress";
import ConfirmationBox from "../DispayComponents/ConfirmationBox";
import IconButton from "@mui/material/IconButton";
import { EmptyIcon } from "../DispayComponents/EmptyIcon";
import Slide from "@mui/material/Slide";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled, alpha } from "@mui/material/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
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

export default function Tasks(props) {
  // AUTHENTICATION HEADER
  const token = localStorage.getItem("token");

  //project id is taken as a prop
  var projectId = props.projectId;

  const [taskList, setTaskList] = useState([]);
  const [vacancy, setVacancy] = useState([]);

  const [loading, setLoading] = useState(true);
  const [length, setLength] = useState(0);
  const [show, setShow] = useState(false);

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    type: "",
    title: "",
    subTitle: "",
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8070/vacancy/getProjVacancy/" + projectId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setVacancy(res.data);
        setLoading(false);
        setLength(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 500);
  }, [taskList]);

  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);
  const [openView, setOpenView] = useState(false);

  // OPTIONS MENU START
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseView = () => {
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
      {show ? null : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "200px",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {show &&
        (length === 0 ? (
          <EmptyIcon
            title="No vacancies yet"
            subTitle="Project vacancies will appear when your leader creates project vacancies"
          />
        ) : (
          <TableContainer component={Paper}>
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
        ))}
      <AddTask
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        projectId={projectId}
      ></AddTask>
    </>
  );
}

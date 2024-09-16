import React, { useState, useEffect } from "react";
import "../../styles/viewComponent.css";
import ButtonWrapper from "../FormsUI/Button";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import IconButton from "@mui/material/IconButton";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";
import Notification from "../DispayComponents/Notification";
import ConfirmationBox from "../DispayComponents/ConfirmationBox";

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

export default function ViewProject() {
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    type: "",
    title: "",
    subTitle: "",
  });

  const [details, setDetails] = useState([]);
  const [role, setRole] = useState("");

  // AUTHENTICATION HEADER
  const token = localStorage.getItem("token");
  const { vacancyId } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8070/vacancy/getVacancy/" + vacancyId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDetails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: err,
          type: "error",
        });
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

  // DELETE VACANCY
  function deleteVacancy() {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    axios
      .delete("http://localhost:8070/vacancy/deleteVacancy/" + vacancyId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        sessionStorage.setItem("vacancyDeleted", "1");
        navigate("/vacancies");
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data &&
          err.response.data.errorMessage
        ) {
          setNotify({
            isOpen: true,
            message: err.response.data.errorMessage,
            type: "error",
          });
        }
      });
  }

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

  const skills = details.skills
    ? details.skills.split(".").filter((skill) => skill.trim() !== "")
    : [];

  return (
    <>
      {/* NOTIFICATION */}
      <Notification notify={notify} setNotify={setNotify} />

      {/* CONFIRM DIALOG */}
      <ConfirmationBox
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />

      <div className="mb-4">
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <IconButton
              onClick={() => {
                navigate(-1);
              }}
              className="iconbtn"
            >
              <KeyboardBackspaceIcon />
            </IconButton>
            {loading ? (
              <Skeleton
                sx={{ width: "250px", height: "10px", marginTop: "15px" }}
              />
            ) : (
              <p className="projectTitle">{details.vacancy}</p>
            )}
          </div>

          {/* OPTIONS MENU START */}
          {role === "leader" || role === "admin" ? (
            <div>
              <ButtonWrapper
                id="demo-customized-button"
                aria-controls={open ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
              >
                Options
              </ButtonWrapper>
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    navigate("/vacancies/editVacancy/" + vacancyId);
                  }}
                  disableRipple
                >
                  <EditIcon />
                  Edit Vacancy
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    setConfirmDialog({
                      isOpen: true,
                      type: "warning",
                      title: "Delete Vacancy?",
                      subTitle:
                        "Do you really want to delete this vacancy? This cannot be undone",
                      onConfirm: () => {
                        deleteVacancy();
                      },
                    });
                  }}
                  disableRipple
                  sx={{ color: "red" }}
                >
                  <DeleteIcon style={{ color: "red" }} />
                  Delete Vacancy
                </MenuItem>
              </StyledMenu>
            </div>
          ) : null}
          {/* OPTIONS MENU END */}
        </div>

        <div style={{ textAlign: "left", paddingLeft: "2rem" }}>
          <div style={{ display: "flex" }}>
            <p
              style={{
                fontSize: "1rem",
                color: "darkBlue",
                fontWeight: 600,
                marginBottom: "15px",
                marginTop: "15px",
              }}
            >
              Project :
            </p>
            <p
              className="tableCommon tableData"
              style={{
                fontSize: "1.1rem",
                alignItems: "center",
                display: "flex",
                margin: "0px 10px",
              }}
            >
              {details.project ? details.project.projectName : null}
            </p>
          </div>

          <div style={{ display: "flex" }}>
            <p
              style={{
                fontSize: "1rem",
                color: "darkBlue",
                fontWeight: 600,
              }}
            >
              Company :
            </p>
            <p
              className="tableCommon tableData"
              style={{
                fontSize: "1.1rem",
                alignItems: "center",
                display: "flex",
                margin: "0px 10px",
              }}
            >
              {details.project ? details.project.company : null}
            </p>
          </div>
          <div style={{ display: "flex" }}>
            <p
              style={{
                fontSize: "1rem",
                color: "darkBlue",
                fontWeight: 600,
                marginBottom: "15px",
                marginTop: "15px",
              }}
            >
              Country :
            </p>
            <p
              className="tableCommon tableData"
              style={{
                fontSize: "1.1rem",
                alignItems: "center",
                display: "flex",
                margin: "0px 10px",
              }}
            >
              {details.country}
            </p>
          </div>

          <p
            style={{
              fontSize: "1.2rem",
              color: "darkBlue",
              fontWeight: 600,
              marginBottom: "15px",
              marginTop: "15px",
            }}
          >
            Job Description
          </p>
          <p style={{ fontSize: "1.1rem", paddingLeft: "15px" }}>
            {details.description}
          </p>
          <p
            style={{
              fontSize: "1.2rem",
              color: "darkBlue",
              fontWeight: 600,
              marginBottom: "15px",
              marginTop: "30px",
            }}
          >
            Required Skills
          </p>
          <ul style={{ fontSize: "1.1rem" }}>
            {skills.map((skill, index) => (
              <li key={index}>{skill.trim()}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

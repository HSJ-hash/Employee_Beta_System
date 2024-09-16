import React from "react";
import { useState, useEffect } from "react";
import {
  Stack,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonWrapper from "../FormsUI/Button";
import { useNavigate } from "react-router-dom";
import AddDocument from "../PageComponents/AddDocument";
import EditDocument from "../PageComponents/EditDocument";
import ConfirmationBox from "../DispayComponents/ConfirmationBox";
import axios from "axios";
import jsPDF from "jspdf";

export default function Documents() {
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupEdit, setOpenPopupEdit] = useState(false);
  const [role, setRole] = useState("");
  const token = localStorage.getItem("token");
  const [documentList, setDocumentList] = useState([]);
  const [docDetails, setDocDetails] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8070/documents/")
      .then((res) => {
        setDocumentList(res.data);
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

  const exportDocument = () => {
    const doc = new jsPDF("landscape", "pt", "A4");
    const title = "Notice List Report";
    const headers = [["Notice Heading", "Category", "Date", "Description"]];
    const document = documentList.map((doc) => [
      doc.docName,
      doc.category,
      doc.createdAt.substring(0, 10),
      doc.description,
    ]);
    let content = {
      startY: 50,
      head: headers,
      body: document,
    };
    doc.setFontSize(20);
    doc.text(title, 40, 40);
    require("jspdf-autotable");
    doc.autoTable(content);
    doc.save("Document-list.pdf");
  };

  const deleteDocument = (docId) => {
    axios
      .delete("http://localhost:8070/documents/" + docId)
      .then(() => {
        console.log("Deleted");
        navigate("/documents");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditClick = (document) => {
    setDocDetails(document);
    setOpenPopupEdit(true);
  };

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    type: "",
    title: "",
    subTitle: "",
  });

  return (
    <>
      <ConfirmationBox
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />

      <Stack
        direction="row"
        spacing={4}
        sx={{ justifyContent: "space-between" }}
      >
        <p className="projectTitle" style={{ fontSize: "1.3rem" }}>
          All Notices
        </p>

        <Stack
          direction="row"
          spacing={1}
          sx={{ justifyContent: "space-between" }}
        >
          {role === "admin" && (
            <ButtonWrapper
              onClick={() => setOpenPopup(true)}
              startIcon={<AddIcon />}
              style={{ marginBottom: "25px" }}
            >
              Add Notice
            </ButtonWrapper>
          )}
          <ButtonWrapper
            onClick={exportDocument}
            style={{ marginBottom: "25px" }}
          >
            Download Report
          </ButtonWrapper>
        </Stack>
      </Stack>

      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {documentList.map((row) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={row._id} spacing={2}>
            <Card
              sx={{
                minHeight: "250px",
                maxHeight: "350px",
                minWidth: "200px",
                maxWidth: "350px",
                display: "flex",
                borderRadius: "15px",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardHeader
                title={row.docName}
                subheader={row.createdAt.substring(0, 10)}
                sx={{
                  paddingBottom: "0px",
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: "darkBlue",
                }}
              >
                {row.category}
              </Typography>
              <CardContent>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    textAlign: "left",
                  }}
                >
                  {row.description}
                </Typography>
              </CardContent>
              {role === "admin" && (
                <CardActions disableSpacing sx={{ justifyContent: "flex-end" }}>
                  <IconButton onClick={() => handleEditClick(row)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() =>
                      setConfirmDialog({
                        isOpen: true,
                        type: "warning",
                        title: "Delete Notice?",
                        subTitle:
                          "Do you really want to delete this Notice? This cannot be undone",
                        onConfirm: () => deleteDocument(row._id),
                      })
                    }
                  >
                    <DeleteIcon sx={{ color: "red" }} />
                  </IconButton>
                </CardActions>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>

      <AddDocument openPopup={openPopup} setOpenPopup={setOpenPopup} />

      <EditDocument
        openPopupEdit={openPopupEdit}
        setOpenPopupEdit={setOpenPopupEdit}
        documentDetails={docDetails}
      />
    </>
  );
}

import styles from "./imageUploadModal.module.scss";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Image from "next/image";
import axios from "axios";
import { storage } from "../../../lib/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { Button } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ImageUploadModal(props) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const uploadImage = () => {
    if (files.length !== 0) {
      const imageRef = ref(storage, `banner/${Date.now()}`);
      uploadBytes(imageRef, files).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          const res = await axios.put(
            "/api/shop/banner",
            {url},
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
            { withCredentials: true }
          );

          if(res.status===200)
          {
            alert("Banner Uploaded");
          }
          else alert("Error Occured");

          props.handleClose(false);

         
        });
      });
    } else return;
  };
  const onChange = (e) => {
    e.preventDefault();
    setFiles(e.target.files[0]);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDrags = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const data = e.dataTransfer;
    const files = data.files;
    setFiles(data.files[0]);
    setIsDragging(false);
  };
  return (
    <>
      <Modal
        open={props.open}
        onClose={() => {
          props.handleClose(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <div className={styles.uploadInput}>
              <input type="file" onChange={onChange} accept="image/*" />
              <div
                className={
                  isDragging
                    ? `${styles.dragDrop} ${styles.dragging}`
                    : styles.dragDrop
                }
                onDrop={handleDrop}
                onDragOver={handleDrags}
                onDragEnter={handleDrags}
                onDragLeave={handleDragLeave}
              >
                <div className={styles.inside}>
                  <span>Drop Your Image</span>
                  <div>
                    <FileUploadIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Button
            variant="contained"
            style={{
              borderRadius: 15,
              backgroundColor: "#0A0927",
              display: "flex",
              justifyContent: "center",
              margin: "2x",
            }}
            onClick={uploadImage}
          >
            Upload
          </Button>
        </Box>
      </Modal>
    </>
  );
}

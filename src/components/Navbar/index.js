import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import FileInput from "../FileInput";
import { Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

const Navbar = ({ handlePhotoUpload }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  };

  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    img: "",
  });

  const handleOpen = () => {
    setOpen(true);
    setData({
      img: "",
    });
  };
  const handleClose = () => {
    setOpen(false);
    setData({
      img: "",
    });
  };

  const handleInputState = (name, value) => {
    // console.log(name, value);
    setData((prev) => ({ [name]: value }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        pt: 2,
        pb: 2,
        pr: 12,
        pl: 12,
      }}
    >
      <div style={{display:"flex"}}>
        <PersonIcon style = {{width:"45px", height:"45px"}}/>
        <div>
      <Typography sx={{fontWeight:"bold", m:0}}>MyUnsplash Clone</Typography>
      <Typography variant="caption" >devchallenge.io</Typography>
      </div>
      </div>
      <div>

        <Button onClick={handleOpen} variant="contained" color="success" sx={{p:1.5}}>
          Add a photo{" "}
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width:300 }}>
            <Typography variant="h6" component="div" id="parent-modal-title">
              Upload your image
            </Typography>
            <Typography variant="caption" p={2} id="parent-modal-description">
              File should be jpeg, Png...
            </Typography>
            <FileInput
              name="img"
              label="Choose Image"
              type="file"
              handleInputState={handleInputState}
              value={data.img}
              handlePhotoUpload={handlePhotoUpload}
            />
          </Box>
        </Modal>
      </div>
    </Box>
  );
};

export default Navbar;

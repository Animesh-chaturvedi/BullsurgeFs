import { useRef, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";
import { Button, Box, Typography, LinearProgress } from "@mui/material";
import axios from "axios";

const FileInput = ({ name, label, value, type, handleInputState, handlePhotoUpload, ...rest }) => {
  const inputRef = useRef();
  const [progress, setProgress] = useState(0);
  const [progressShow, setProgressShow] = useState(false);

  const handleUpload = () => {
    setProgressShow(true);
    const date = new Date().getTime();
    const fileName = date + value.name;
    const storageRef = ref(storage, `/images/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, value);
    uploadTask.on(
      "stateChange",
      (snapshot) => {
        const uploaded = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(uploaded);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            handleInputState(name, url);
            // console.log(name, url)
          try {
            const apiUrl = process.env.REACT_APP_API_URL + "/add";
            const { data: res } = await axios.post(apiUrl, { img: url });
            handlePhotoUpload(res.data)
            console.log(res.data)
          } catch (error) {
            console.log(error);
          }
        });
      }
    );
  };

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }



  return (
    <div style={{display:"contents"}}>
      <input
        type={type}
        ref={inputRef}
        onChange={(e) => {
            console.log(e.currentTarget.files[0])
          handleInputState(name, e.currentTarget.files[0]);
        }}
        // value={value}
        {...rest}
        style={{ display: "none" }}
        accept="image/*"
      />
      <Button
        variant="contained"
        onClick={(e) => {
          e.preventDefault();
          inputRef.current.click();
        }}
        sx={{m:1}}
        disabled={value}
      >
        {label}
      </Button>
      {type === "file" && value && (
        <img
          src={typeof value === "string" ? value : URL.createObjectURL(value)}
          alt="file"
          style={{height:"200px", width:"200px"}}
        />
      )}
      {value !== null && !progressShow && typeof value !== "string" && (
        <Button onClick={handleUpload} >Upload</Button>
      )}
      {progressShow && progress < 100 && (
         <Box sx={{ width: '100%' }}>
         <LinearProgressWithLabel value={progress} />
       </Box>
      )}
      {progress === 100 && (
        <div>
          <p>image uploaded</p>
        </div>
      )}
    </div>
  );
};

export default FileInput;

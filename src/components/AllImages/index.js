import React, { useState, useEffect, useRef } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";
import styles from "./styles.module.css";
import { Typography } from "@mui/material";

export default function AllImages({ photos, getAllImages, end, numUploaded }) {
  const photosRef = useRef();
  const [diff, setDiff] =useState(0)


  const onScroll = () => {
    if (photosRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = photosRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        console.log(end)
        if(!end){
          getAllImages()
        };
      }
    }
  };  

  // console.log(photos)
  return (
    <Box
      sx={{ height: "85vh", overflowY: "scroll", pt: 2, pb: 2, pr: 8, pl: 10 }}
      onScroll={(e) => onScroll(e)}
      ref={photosRef}
    >
      <Masonry columns={3} spacing={5} sx={{ m: 0 }}>
        {photos.map((item, index) => (
          <div key={index}>
            <img
              src={`${item.img}?w=162&fit=crop&auto=format`}
              srcSet={`${item.img}?w=162&fit=crop&auto=format&dpr=2 2x`}
              alt={item.img}
              loading="lazy"
              //   onLoad={(e) => formating(e)}
              style={{
                borderRadius: "12px",
                display: "block",
                width: "100%",
              }}
            />
          </div>
        ))}
      </Masonry>
      {
        end && <Typography variant="h4"> Photo grid ends here-----no more photos----Thank you</Typography>
      }
    </Box>
  );
}

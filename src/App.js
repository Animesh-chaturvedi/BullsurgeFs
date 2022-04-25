import { useEffect, useState } from "react";

import AllImages from "./components/AllImages";
import axios from "axios";
import NavBar from "./components/Navbar"

function App() {

  const [photos, setPhotos] = useState([]);
  const [end, setEnd] = useState(false)
  const [numUploaded, setNumUploaded] = useState(0)
  const getAllImages = async () => {
    const { data } = await axios.get(process.env.REACT_APP_API_URL + "/" + (photos.length-numUploaded));
    try {
      if(data.data.length === 0){
        setEnd(true);
      }
      let newPhotos = photos.concat(data.data)
      setPhotos(newPhotos) 
    } catch (error) {
      
    }
  };
  useEffect(() => {
    getAllImages();
  }, []);

  const handlePhotoUpload = (newImg) => {
    let newPhotos = [newImg, ...photos]
    setPhotos(newPhotos)
    setNumUploaded(numUploaded+1)
  };
   return (
    <div>
      <NavBar handlePhotoUpload = {handlePhotoUpload} />
      {photos && photos.length && <AllImages photos = {photos} getAllImages={getAllImages} end={end} numUploaded={numUploaded} />}
      
    </div>
  );
}

export default App;

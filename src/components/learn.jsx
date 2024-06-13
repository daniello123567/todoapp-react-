import React from 'react'
import {useState} from 'react';
function Image() {
  const [image,setImage] = useState();
  console.log(image);
  return (
    <div>

      <input onChange={(e)=>{setImage(URL.createObjectURL(e.target.files[0]))}} type="file" />
    <img src={image} alt="" />
    </div>
  )
}

export default Image

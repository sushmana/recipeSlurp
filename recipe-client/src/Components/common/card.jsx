import React, { useState, useEffect } from 'react';
import logo from 'src/logo.svg'
import food1 from 'src/asset/images/food1.avif';
import food2 from 'src/asset/images/food2.avif';
import { MdFavoriteBorder,MdFavorite } from "react-icons/md";

const Card = () => {
//   const [fav, setImgSet] = useState([]);
  const imgSet = [food1, food2];
  return (
    <>
      <div>Thumbnail</div>
      {
            imgSet.map((image, index)=>{
                  return <img key={index} src={image} width='200px' height='300px'/>
            })
      }
      <MdFavoriteBorder />
      <MdFavorite />
    </>
  );
};

export default Card;
import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router";
import style from "./index.module.scss";
import Products from "./Products";
import Image from "../components/Image"


const Images = () => {
  
  return (
    <section className={style.gallerie}>
         {images.map((img) => (
        <Image key={img.id} url={img.url} />
      ))}
      
    </section>
  );
};

export default Images;

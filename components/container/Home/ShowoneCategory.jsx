"use client";
import React, { useState, useEffect, useRef } from "react";
import Slider from "../Slider";

export default function ShowoneCategory({ data, imagePath }) {
  const title = data[0]?.article_category;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start border-b-2 mb-3 border-quaternary">
        <h1 className="text-sm py-1 text-white bg-quaternary px-2 uppercase font-montserrat ">
          {title}
        </h1>
      </div>
      <Slider blog_list={data} imagePath={imagePath} className="mb-10" />
    </div>  
  );
}


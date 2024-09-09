"use client";
import React, { useEffect } from "react";

const Search = ({ params }) => {
  useEffect(() => {
    console.log(params.cname);
  }, []);

  const getDoctors=()=>{

  }

  return (

    <div>page</div>;
  ) 
};

export default Search;

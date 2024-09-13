"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import React, { useEffect, useState } from "react";

const Details = ({ params }) => {
  const [doctor, setDoctor] = useState();
  useEffect(() => {
    getDoctorById();
  }, []);

  const getDoctorById = () => {
    GlobalApi.getDoctorById(params.recordId).then((res) => {
      console.log(res);
    });
  };
  return <div>Details</div>;
};

export default Details;

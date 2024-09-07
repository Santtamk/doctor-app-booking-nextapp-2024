"use client";

import Hero from "./_components/Hero";
import CategorySearch from "./_components/CategorySearch";
import DoctorList from "./_components/DoctorList";
import GlobalApi from "./_utils/GlobalApi";
import { useEffect, useState } from "react";

export default function Home() {
  const [doctorList, setDoctorList] = useState([]);
  useEffect(() => {
    getDoctorList();
  }, []);

  const getDoctorList = () => {
    GlobalApi.getDoctorList().then((res) => {
      console.log("Doctor List:", res.data.data);
      setDoctorList(res.data.data);
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Search bar and Categories */}
      <CategorySearch />

      {/* Doctor list */}
      <DoctorList doctorList={doctorList} />
    </div>
  );
}

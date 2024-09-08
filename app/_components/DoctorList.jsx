import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const DoctorList = ({ doctorList }) => {
  return (
    <div className="mb-10 px-8">
      <h2 className="font-bold text-xl">Popular Doctors</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-5">
        {doctorList.length > 0
          ? doctorList.map((doctor, index) => (
              <div
                key={index}
                className="border-[1px] rounded-lg p-3 cursor-pointer hover:border-primary hover:shadow-2xl transition-all ease-in-out hover:scale-105"
              >
                <Image
                  src={doctor.attributes.Image?.data?.[0]?.attributes?.url}
                  alt="doctor"
                  width={500}
                  height={200}
                  className="h-[200px] w-full object-cover rounded-lg object-top"
                />
                <div className="mt-3 items-baseline flex flex-col gap-2">
                  <h2 className="text-[10px] font-semibold bg-teal-50 p-1 rounded-full px-2 text-primary">
                    {doctor.attributes?.category.data.attributes.Name}
                  </h2>
                  <h2 className="font-bold">{doctor.attributes?.Name}</h2>
                  <h2 className="text-primary text-sm">
                    {doctor.attributes?.Years_of_Experience}
                  </h2>
                  <h2 className="text-gray-500 text-sm">
                    {doctor.attributes?.Address}
                  </h2>
                  <h2 className="p-2 px-3 border-[1px] border-primary text-primary rounded-full w-full text-center text-[11px] mt-2 cursor-pointer hover:bg-primary hover:text-white">
                    Book Now
                  </h2>
                </div>
              </div>
            ))
          : // Skeleton Effect
            [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div className="h-[220px] bg-teal-50 w-full rounded-lg animate-pulse"></div>
            ))}
      </div>
    </div>
  );
};

export default DoctorList;

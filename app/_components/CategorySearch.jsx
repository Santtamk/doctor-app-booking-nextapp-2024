"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import Image from "next/image";

const CategorySearch = () => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalApi.getCategory().then((res) => {
      setCategoryList(res.data.data);
    });
  };
  return (
    <div className="mb-10 items-center px-5 flex flex-col gap-2">
      <h2 className="font-bold text-4xl tracking-wide">
        Search
        <span className="text-primary"> Doctors </span>
      </h2>
      <h2 className="text-gray-400 text-xl text-center">
        Search Your Doctor and Book Appointment in one click
      </h2>
      <div className="flex w-full mt-3 max-w-sm items-center space-x-2">
        <Input type="search" placeholder="Search Doctors" />
        <Button type="submit" className="bg-primary">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>

      {/* displaying category list */}
      <div className="grid grid-cols-3 mt-5 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categoryList.length > 0
          ? categoryList.map(
              (item, index) =>
                index < 6 && (
                  <div
                    key={index}
                    className="flex flex-col text-center items-center gap-2 p-5 bg-primary-50 hover:scale-110 transition-all ease-in-out bg-teal-50 cursor-pointer hover:shadow-lg"
                  >
                    <Image
                      src={item.attributes.Icon.data[0].attributes.url}
                      alt="icon"
                      width={40}
                      height={40}
                    />
                    <label className="text-primary">
                      {item?.attributes?.Name}
                    </label>
                  </div>
                )
            )
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div className="h-[120px] w-[150px] bg-teal-50 animate-pulse rounded-lg"></div>
            ))}
      </div>
    </div>
  );
};

export default CategorySearch;

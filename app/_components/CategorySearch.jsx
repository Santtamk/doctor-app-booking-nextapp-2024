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
      console.log(res.data.data);
      setCategoryList(res.data.data);
    });
  };
  return (
    <div className="mb-10 items-center flex flex-col gap-2">
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
      {categoryList.map((item, index) => (
        <div>
          <Image
            src={item.attributes.Icon.data[0].attributes.url}
            alt="icon"
            width={40}
            height={40}
          />
          <label>{item?.attributes?.Name}</label>
        </div>
      ))}
    </div>
  );
};

export default CategorySearch;

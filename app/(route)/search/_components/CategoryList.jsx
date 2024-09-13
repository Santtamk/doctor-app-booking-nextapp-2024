"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import React, { useEffect, useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const CategoryList = () => {
  const [categoryList, setCategoryList] = useState([]);
  const params = usePathname();
  const category = params.split("/")[2];
  const decodedCategory = decodeURIComponent(category); //resolved issues with endpoint that have space in name i.g 'Eye Specialists'

  useEffect(() => {
    getCategoryList();
    // console.log("params:", params);
    // console.log("category", category);
  }, []);

  const getCategoryList = () => {
    GlobalApi.getCategory().then((res) => {
      setCategoryList(res.data.data);
      // console.log("res.data.data for category list:", res.data.data);
    });
  };
  return (
    <div className="h-screen flex-col flex mt-5">
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="overflow-visible">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {categoryList &&
              categoryList.map((item, index) => (
                <CommandItem key={index} className="hover:bg-none">
                  <Link
                    href={"/search/" + item?.attributes.Name}
                    className={`p-2 flex gap-2 text-[12px] text-primary rounded-md cursor-pointer w-full items-center ${
                      decodedCategory === item.attributes.Name && "bg-teal-100"
                    }`}
                  >
                    <Image
                      src={item.attributes.Icon.data[0].attributes.url}
                      alt="icon"
                      width={25}
                      height={25}
                    />
                    <label>{item?.attributes?.Name}</label>
                  </Link>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default CategoryList;

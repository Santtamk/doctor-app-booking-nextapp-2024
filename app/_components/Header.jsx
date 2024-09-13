"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const Header = () => {
  const Menu = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "Explore",
      path: "/explore",
    },
    {
      id: 3,
      name: "Contact Us",
      path: "/",
    },
  ];

  const { user } = useKindeBrowserClient();

  useEffect(() => {
    // console.log(user);
  }, [user]);

  return (
    <div className="flex items-center justify-between p-4 shadow-sm">
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" alt="logo" width={180} height={80} />

        <ul className="md:flex gap-8 hidden">
          {Menu.map((item, index) => (
            <Link href={item.path} key={index}>
              <li
                key={index}
                className="hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out text-lg"
              >
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      {user ? (
        <Popover>
          <PopoverTrigger>
            <Image
              src={user?.picture}
              alt=""
              width={50}
              height={50}
              className="rounded-full"
            />
          </PopoverTrigger>
          <PopoverContent className="w-44">
            <ul className="flex flex-col gap-2">
              <li className="cursor-pointer hover:bg-teal-100 p-2 rounded-md">
                Profile
              </li>
              <li className="cursor-pointer hover:bg-teal-100 p-2 rounded-md">
                My Booking
              </li>
              <li className="cursor-pointer hover:bg-teal-100 p-2 rounded-md">
                <LogoutLink>Logout</LogoutLink>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      ) : (
        <LoginLink>
          <Button className="bg-primary">Get Started</Button>
        </LoginLink>
      )}
    </div>
  );
};

export default Header;

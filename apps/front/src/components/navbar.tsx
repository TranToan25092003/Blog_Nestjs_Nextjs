import Link from "next/link";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <>
      <h1 className="text-2xl font-bold p-2">My modern blog</h1>

      <div
        className="flex sm:flex-col md:flex-row gap-2 ml-auto capitalize [&>a]:py-2 [&>a]:px-2 [&>a]:transition [&>a]:rounded-md [&>a:hover]:text-sky-100
       [&>a:hover]:bg-sky-500
      "
      >
        <Link href={"#/"}>blog</Link>
        <Link href={"#about"}>about</Link>
        <Link href={"#contact"}>contact</Link>
      </div>
    </>
  );
};

export default Navbar;

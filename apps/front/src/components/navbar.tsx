import { getSession } from "@/lib/session";
import Link from "next/link";
import React from "react";
import SignInPanel from "./SignInPanel";
import Profile from "./Profile";

type Props = {};

const Navbar = async (props: Props) => {
  const session = await getSession();
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

        {session && session?.user ? (
          <Profile user={session.user}></Profile>
        ) : (
          // <a href={"/api/auth/signout"}>Sign out</a>
          <SignInPanel></SignInPanel>
        )}
      </div>
    </>
  );
};

export default Navbar;

import { SessionUser } from "@/lib/session";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  ArrowRightStartOnRectangleIcon,
  ListBulletIcon,
  PencilSquareIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

type Props = {
  user: SessionUser;
};

const Profile = ({ user }: Props) => {
  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer  ">
        <Avatar>
          <AvatarImage src={user.avatar}></AvatarImage>
          <AvatarFallback>
            <UserIcon className="w-8 text-slate-500"></UserIcon>
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent>
        <div className="flex items-center justify-center gap-3">
          <UserIcon className="w-4"></UserIcon>
          <p>{user.name} </p>
        </div>

        <div
          className="*:grid *:grid-cols-5 *:gap-3 *:items-center *:my-2 *:py-2 [&>*>span]:col-span-4 [&>*:hover]:bg-sky-500 [&>*:hover]:text-white *:transition *:rounded-md
        [&>*>*:nth-child(1)]:justify-self-end
        "
        >
          {/* signout */}
          <a href="/api/auth/signout">
            <ArrowRightStartOnRectangleIcon className="w-4"></ArrowRightStartOnRectangleIcon>
            <span className="capitalize">sign out</span>
          </a>

          {/* create post */}
          <Link href={"/user/create-post"}>
            <PencilSquareIcon className="w-4"></PencilSquareIcon>
            <span className="capitalize"> create new post</span>
          </Link>

          {/* list posts */}
          <Link href={"/user/create-post"}>
            <ListBulletIcon className="w-4"></ListBulletIcon>
            <span className="capitalize"> post</span>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Profile;

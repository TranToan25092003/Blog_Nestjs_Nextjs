"use client";
import { cn } from "@/lib/utils";
import React, { PropsWithChildren, useEffect, useState } from "react";

type Props = PropsWithChildren;

const DesktopNavbar = (props: Props) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const isScrollDown = scrollPosition > 1;

  return (
    <nav
      className={cn(
        "fixed w-full z-50 text-white top-0 block transition-colors",
        {
          "bg-white text-gray-700 shadow-md": isScrollDown,
        }
      )}
    >
      <div className="flex items-center px-4 py-4  container">
        {props.children}
      </div>
    </nav>
  );
};

export default DesktopNavbar;

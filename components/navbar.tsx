"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

const Navbar = () => {
  const [navigation, setNavigation] = useState<NavigationItem[]>([]);
  let token: any = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  useEffect(() => {
    if (token) {
      setNavigation([
        { name: "Home", href: "/", current: false },
        { name: "Create Blog", href: "/create-blog", current: false },
        { name: "Profile", href: "/profile", current: false },
        { name: "Logout", href: "/login", current: false },
      ]);
    } else {
      setNavigation([
        { name: "Home", href: "/", current: false },
        { name: "Login", href: "/login", current: false },
        { name: "Sign up", href: "/signup", current: false },
      ]);
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    setNavigation([
      { name: "Home", href: "/", current: false },
      { name: "Login", href: "/login", current: false },
      { name: "Sign up", href: "/signup", current: false },
    ]);
  };

  return (
    <div className="sticky top-0 h-16 flex items-center justify-end z-50 bg-slate-300 mb-5">
      <ul className="flex gap-8 justify-end mr-[64px]">
        {navigation.map((item, index) => {
          return (
            <li key={index}>
              {item.name === "Logout" ? (
                <Link
                  className="font-bold text-[1rem]"
                  href={item.href}
                  onClick={logout}
                >
                  {item.name}
                </Link>
              ) : (
                <Link className="font-bold  text-[1rem]" href={item.href}>
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Navbar;

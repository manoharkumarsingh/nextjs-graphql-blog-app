import React from "react";
import Link from "next/link";

export default function Navbar() {
  let navigation = [
    { name: "Home", href: "/", current: false },
    { name: "Create Blog", href: "/create-blog", current: false },
    { name: "Profile", href: "/profile", current: false },
    { name: "Logout", href: "/login", current: false },
  ];

  navigation = [
    { name: "Home", href: "/", current: false },
    { name: "Login", href: "/login", current: false },
    { name: "Sign up", href: "/signup", current: false },
  ];

  return (
    <div className="sticky top-0 h-16 flex items-center justify-end">
      <ul className=" flex gap-8 justify-end mr-[64px] ">
        {navigation.map((item, index) => {
          return (
            <li key={index}>
              <Link href={item.href}>{item.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

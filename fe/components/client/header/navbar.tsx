"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/client/icons";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import Link from "next/link";
import Search from "./search";
import User from "./user";

export default function Navbars() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      className="w-full overflow-visible"
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Left Section */}
      <NavbarContent className="flex items-center">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        />
        <NavbarBrand className="hidden lg:flex ">
          <Logo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      {/* Center Section */}
      <NavbarContent
        className="hidden lg:flex gap-4 flex-grow justify-center"
        justify="center"
      >
        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.href}>
            <Link href={item.href} className="text-foreground hover:underline">
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Right Section */}
      <NavbarContent justify="end" className="gap-2 flex-grow lg:flex-grow-0">
        <Search />
        <User />
      </NavbarContent>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <NavbarMenu className="w-screen">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.label}-${index}`}>
              <Link
                href={item.href}
                className={`w-full text-lg ${
                  index === 2
                    ? "text-primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "text-danger"
                      : "text-foreground"
                }`}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      )}
    </Navbar>
  );
}

'use client'
import { Navbar as NextUINavbar, NavbarContent, NavbarMenu, NavbarMenuToggle, NavbarBrand, NavbarItem, NavbarMenuItem } from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import Image from "next/image";
import {
  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
} from "@nextui-org/dropdown";
import { Avatar } from '@nextui-org/avatar'
import { Icon } from "@iconify/react";
import { useEffect } from "react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { useUserStore } from "@/Store/useUserStore";
import ShoppingCartItem from "./ShoppingCartItem";


export function Navbar() {
  const { user, checkAuth, logout } = useUserStore();

  useEffect(() => {
    checkAuth(false)
  }, []);

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image alt="logo" height={36} src='/images/Logo.svg' width={36} />
            <div className="flex gap-2" />
            <p className="font-bold text-inherit">Buzzar</p>
            <p className="text-slate-500">App</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="basis-1/5 sm:basis-full" justify="center">
        <ul className="lg:flex justify-start gap-4 hidden ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent className="sm:flex hidden basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="sm:flex gap-2 hidden">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="md:flex gap-4 hidden">
          {user === undefined ? <></> :
            user === null ?
              <>
                <Button as={Link} className="text-default-500" href='/login' radius="full" variant="ghost">Login</Button>
                <Button as={Link} className="bg-foreground font-medium text-background" color="secondary" endContent={<Icon icon="solar:alt-arrow-right-linear" />} href='/sign-up'
                  radius="full"
                  variant="flat">
                  Get Started
                </Button>
              </>
              :
              <>
                <ShoppingCartItem />

                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Avatar isBordered as="button" className="transition-transform" size="sm" />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="gap-2 h-14">
                      <p className="font-semibold">Signed in as</p>
                      <p className="font-semibold">{user?.name}</p>
                    </DropdownItem>
                    <DropdownItem key="settings">My Settings</DropdownItem>
                    <DropdownItem key="orders" as={Link} href="/orders">My Orders</DropdownItem>
                    <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                    <DropdownItem key="logout" color="danger" onPress={logout} >Log Out</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </>
          }
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden pl-4 basis-1" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="flex flex-col gap-2 mx-4 mt-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};

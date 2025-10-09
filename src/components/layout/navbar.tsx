"use client";

import { MenuIcon } from "lucide-react";
import Image, { ImageProps } from "next/image";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import logo from "@/../public/logo-bulet.svg";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNavbar } from "@/hooks/useNavbar";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { cn } from "@/lib/utils";
import {
  NavigationMenuLinkProps,
  NavigationMenuProps,
} from "@radix-ui/react-navigation-menu";

import ThemeSwitch from "../theme-switch";
import { ButtonProps, buttonVariants } from "../ui/button";
import UserAction from "../user-action";

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  disableBackground?: boolean;
  background?: string;
}

const NavbarContainer = ({
  className,
  children,
  disableBackground = false,
  background = "bg-skyBackground",
  ...props
}: NavbarProps) => {
  const { scrolled } = useNavbar();
  const isHome = usePathname() === "/";
  return (
    <nav
      className={cn(
        !isHome &&
          "backdrop-blur-2xl backdrop-contrast-75 backdrop-brightness-150 w-full",
        scrolled &&
          "shadow-lg border-b bg-background/80 backdrop-contrast-100 backdrop-brightness-100",
        !scrolled && !disableBackground && background,
        "sticky top-0 z-50",
        className,
      )}
      {...props}
    >
      {children}
    </nav>
  );
};

const NavbarContent = ({ className, children, ...props }: NavbarProps) => {
  return (
    <div
      className={cn(
        "container py-4 flex flex-row items-center justify-between",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface NavbarBrandProps extends ImageProps {}
const NavbarBrand = ({
  className,
  children = null,
  alt,
  ...props
}: NavbarBrandProps) => {
  return (
    <Link href={"/"} className="flex flex-row gap-4 md:w-1/4 items-center">
      <Image
        {...props}
        alt={alt}
        className={cn("hover:cursor-pointer", className)}
      />
      {children}
    </Link>
  );
};

const NavbarItems = ({ className, children, ...props }: NavbarProps) => {
  return (
    <div
      className={cn("flex flex-row gap-2 items-center mx-auto", className)}
      {...props}
    >
      {children}
    </div>
  );
};

type NavbarLinkProps = LinkProps &
  ButtonProps & { active?: boolean; isMobile?: boolean };
const NavbarLink = ({
  className,
  children,
  href,
  isMobile = false,
  ...props
}: NavbarLinkProps) => {
  const active = usePathname() === href;
  return (
    <Link
      className={buttonVariants({
        variant: active ? "outline" : "ghost",
        className: cn("hover:cursor-pointer", isMobile && "w-full", className),
      })}
      href={href}
    >
      <span className={cn(isMobile && "inline mr-auto")}>{children}</span>
    </Link>
  );
};

interface NavbarDropdownProps extends NavigationMenuProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  isMobile?: boolean;
}
const NavbarDropdown = ({
  trigger,
  children,
  isMobile,
  ...props
}: NavbarDropdownProps) => {
  return (
    <NavigationMenu className={cn(isMobile && "w-full")} {...props}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn("bg-transparent", isMobile && "w-full")}
          >
            {trigger}
          </NavigationMenuTrigger>
          <NavigationMenuContent className={cn(isMobile && "w-full")}>
            {children}
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuIndicator />
      </NavigationMenuList>
      <NavigationMenuViewport />
    </NavigationMenu>
  );
};

interface NavbarDropdownLinkProps extends NavigationMenuLinkProps {}
const NavbarDropdownLink = ({
  className,
  children,
  ...props
}: NavbarDropdownLinkProps) => {
  return (
    <NavigationMenuLink
      {...props}
      className={cn(
        navigationMenuTriggerStyle(),
        "w-full whitespace-nowrap justify-start",
      )}
    >
      {children}
    </NavigationMenuLink>
  );
};

const NavbarSideMenu = ({ className, children, ...props }: NavbarProps) => {
  return (
    <div
      className={cn(
        "flex flex-row gap-4 justify-end items-center md:w-1/4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default function Navbar({
  disableBackground = false,
  background,
  ...props
}: NavbarProps) {
  const { width } = useWindowDimensions();
  const isMobile = width! <= 900 ?? undefined;

  // only render on client side (or when mounted) to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <NavbarContainer className="h-[76px]" />;

  switch (isMobile) {
    case true:
      return (
        <NavbarContainer
          disableBackground={disableBackground}
          background={background}
        >
          <NavbarContent>
            <Sheet>
              <SheetTrigger>
                <MenuIcon />
              </SheetTrigger>
              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle>
                    <NavbarBrand src={logo} alt="logo" width={32} height={32}>
                      <p className="text-base text-left">
                        Intellektuelle Schulle
                      </p>
                    </NavbarBrand>
                  </SheetTitle>
                </SheetHeader>
                <NavbarContent className="flex-col gap-4 px-0 items-start w-full">
                  <NavbarLink isMobile href="/">
                    Home
                  </NavbarLink>
                  <NavbarLink isMobile href="/kelas">
                    Kelas
                  </NavbarLink>
                  {/* <NavbarLink isMobile href="/#visi-misi">
                    Visi dan Misi
                  </NavbarLink> */}
                  {/* <NavbarLink isMobile href="/#galeri">
                    Galeri
                  </NavbarLink> */}
                  {/* <NavbarLink isMobile href="/#social">
                    Social
                  </NavbarLink> */}
                  <NavbarLink isMobile href="/leaderboard">
                    Leaderboard
                  </NavbarLink>
                </NavbarContent>
              </SheetContent>
            </Sheet>
            <NavbarSideMenu>
              {/* <ThemeSwitch /> */}
              <UserAction loginText="Sign In" />
            </NavbarSideMenu>
          </NavbarContent>
        </NavbarContainer>
      );

    case false:
      return (
        <NavbarContainer
          disableBackground={disableBackground}
          background={background}
        >
          <NavbarContent>
            <NavbarBrand src={logo} alt="logo" width={40} height={40}>
              {/* <p className="font-bold leading-tight tracking-wider">
                IS HIMAFI 23
                <br />
                <span className="text-xs font-light tracking-normal">
                  Intellektuelle Schulle
                </span>
              </p> */}
            </NavbarBrand>
            <NavbarItems>
              <NavbarLink href="/">Home</NavbarLink>
              <NavbarLink href="/kelas">Kelas</NavbarLink>
              {/* <NavbarLink href="/#visi-misi">Visi dan Misi</NavbarLink> */}
              {/* <NavbarLink href="/#galeri">Galeri</NavbarLink>
              <NavbarLink href="/#social">Social</NavbarLink> */}
              {/*<NavbarLink href="/leaderboard">Leaderboard</NavbarLink>*/}
            </NavbarItems>
            <NavbarSideMenu>
              {/* <ThemeSwitch /> */}
              <UserAction loginText="Sign In" />
            </NavbarSideMenu>
          </NavbarContent>
        </NavbarContainer>
      );

    default:
      return null;
  }
}

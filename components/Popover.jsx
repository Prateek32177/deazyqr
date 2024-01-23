"use client"
import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Button, User} from "@nextui-org/react";
import {NextUIProvider} from '@nextui-org/react'
import Link from "next/link";
export default function Popover({children, user}){

    return (
      <>
      <NextUIProvider>
      <Dropdown
      placement="bottom-end"
      backdrop="opaque"
      showArrow
      radius="xl"
      classNames={{
        base: "before:bg-default-200 border rounded-xl", // change arrow background
        content: "p-0 border-small border-divider bg-background",
      }}
    >
      <DropdownTrigger>
      <img className="w-10 h-10 rounded-full p-1 ring-2 ring-gray-300 dark:ring-gray-500" src="https://api.dicebear.com/7.x/adventurer/svg?seed=Abby&radius=50&backgroundType=gradientLinear&backgroundColor=ffd5dc,b6e3f4" alt="Rounded avatar"></img>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Custom item styles"
        disabledKeys={["profile"]}
        className="p-3"
        itemClasses={{
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            // "data-[hover=true]:text-foreground",
            // "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        }}
      >
        <DropdownSection aria-label="Profile & Actions">
          <DropdownItem
            isReadOnly
            key="profile"
            className="h-14 gap-2 opacity-100"
          >
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{user.email}</p>
 
          </DropdownItem>
          <DropdownItem key="dashboard" >
           <Link href="/generateqr">Dashboard</Link> 
          </DropdownItem>
          <DropdownItem key="logout">{children}</DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>

      </NextUIProvider>
      </>

    )
}
"use client";

import { Frame, PieChart, Settings2, SquareTerminal } from "lucide-react";
import * as React from "react";

import SiteLogo from "@/components/sheared/SiteLogo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/user/dashboard-layout/nav-main";
import Link from "next/link";
import { navList } from "./dashboard-navlist";
import { NavItems } from "./nav-items";
import { NavUser } from "./nav-user";

// Sample data with teams, main navigation and projects.
const data = {
  navMain: [
    {
      title: "Application",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "Loan Application",
          url: "/user/loan-application",
        },
        {
          title: "My Application",
          url: "/user/my-application/my-application-loan",
        },
        {
          title: "Application Status",
          url: "/user/my-application/application-status",
        },
        {
          title: "Cards",
          url: "#",
        },
        {
          title: "Bima/Insurance",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "/user/setting",
      icon: Settings2,
      items: [
        {
          title: "Change Password",
          url: "/user/setting/update-password",
        },
        {
          title: "Update Email/Mobile",
          url: "/user/setting/update-email-mobile",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Profile",
      url: "#",
      icon: Frame,
    },
    {
      name: "Saved Products",
      url: "#",
      icon: PieChart,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <div className="z-50 bg-slate-100">
      <Sidebar
        className="w-72 bg-white shadow-lg transition-all dark:bg-gray-900"
        collapsible="icon"
        {...props}
      >
        {/* Header */}
        <SidebarHeader className="border-b border-gray-200 p-4 dark:border-gray-700">
          <SiteLogo className="w-36" />
        </SidebarHeader>

        {/* Main Content */}
        <SidebarContent className="flex-1 overflow-y-auto">
          {/* Profile*/}
          <NavMain items={navList.navMain} />
          {/* my items*/}
          <NavItems items={navList.myItems} />

          {/* Seetings */}
          {navList.others && (
            <div className="mt-4 border-t border-gray-200 px-4 py-3 dark:border-gray-700">
              <h3 className="text-xs font-semibold uppercase text-gray-500">
                Settings
              </h3>
              <div className="mt-2 space-y-1">
                {navList.settings.map((settings, index) => (
                  <Link
                    key={index}
                    href={settings.url}
                    className="flex items-center space-x-2 rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <settings.icon className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-black dark:text-gray-300">
                      {settings.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Others */}
          {navList.others && (
            <div className="mt-4 border-t border-gray-200 px-4 py-3 dark:border-gray-700">
              <h3 className="text-xs font-semibold uppercase text-gray-500">
                Others
              </h3>
              <div className="mt-2 space-y-1">
                {navList.others.map((project, index) => (
                  <Link
                    key={index}
                    href={project.url}
                    className="flex items-center space-x-2 rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <project.icon className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-black dark:text-gray-300">
                      {project.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter className="border-t border-gray-200 p-4 dark:border-gray-700">
          <NavUser />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </div>
  );
}

import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import MenuItems from "./Navbar/MenuItems";
import MobileHeader from "./Navbar/Mobile/MobileHeader";
import ProfileMenu from "./Navbar/ProfileMenu";
import SiteLogo from "./SiteLogo";

const Header = ({ hasSidebar = true }) => {
  return (
    <header
      className={cn(
        "border-gray-primary sticky top-0 z-50 border-b bg-white py-2 drop-shadow-md xl:py-4",
      )}
    >
      {/* Desktop Navigation */}
      <div className="container-full mx-auto hidden px-4 2xl:container lg:block 2xl:px-0">
        <div className="flex h-full w-full items-center justify-between gap-x-6">
          {hasSidebar && (
            <div className="w-2/12">
              <SiteLogo />
            </div>
          )}
          <div className={cn("", hasSidebar ? "w-10/12" : "w-full")}>
            <nav>
              <div className="flex items-center justify-between gap-x-4">
                <div className="w-8/12">
                  <MenuItems hasSidebar={hasSidebar} />
                </div>
                <div className="w-4/12">
                  <div className="flex items-center justify-center gap-4">
                    <Link href="/track-application" className="!text-xl">
                      <Button variant="outline" className="h-10">
                        <Globe className="h-14 w-14 text-6xl" />
                        Track Application
                      </Button>
                    </Link>
                    <ProfileMenu />
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className="block lg:hidden">
        <MobileHeader />
      </div>
    </header>
  );
};

export default Header;

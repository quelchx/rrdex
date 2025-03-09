import { lazy, Suspense } from "react";
import { NavLink } from "react-router";

import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { DONATION_LINK, EMAIL_LINK, GITHUB_LINK, NAV_LINKS } from "@/constants";

const DropdownMenuContent = lazy(() =>
  import("@/components/ui/dropdown-menu").then((module) => ({
    default: module.DropdownMenuContent,
  }))
);

type MobileNavLinkProps = {
  to: string;
  children: React.ReactNode;
};

function MobileMenuLink(props: MobileNavLinkProps) {
  const { to, children } = props;
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "text-red-600 md:hidden" : "md:hidden"
      }
    >
      <DropdownMenuItem>{children}</DropdownMenuItem>
    </NavLink>
  );
}

export function NavMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <span>Browse</span>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <Suspense fallback={null}>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Browse Sections</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {NAV_LINKS.map((link) => {
              return (
                link.to !== "/about" && (
                  <MobileMenuLink key={link.to} to={link.to}>
                    {link.text}
                  </MobileMenuLink>
                )
              );
            })}
            <NavLink
              to="/overworld-items"
              className={({ isActive }) =>
                isActive ? "text-red-600" : "inherit"
              }
            >
              <DropdownMenuItem>Overworld Items</DropdownMenuItem>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-red-600" : "inherit"
              }
            >
              <DropdownMenuItem>About</DropdownMenuItem>
            </NavLink>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Coming Soon</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem disabled>Mega Stones</DropdownMenuItem>
                  <DropdownMenuItem disabled>Shops</DropdownMenuItem>
                  <DropdownMenuItem disabled>Z Crystals</DropdownMenuItem>
                  <DropdownMenuItem disabled>Care Packages</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <a target="_blank" rel="noreferrer" href={DONATION_LINK}>
              <DropdownMenuItem>Donate</DropdownMenuItem>
            </a>
            <a href={`${GITHUB_LINK}/rrdex`} target="_blank" rel="noreferrer">
              <DropdownMenuItem>Github</DropdownMenuItem>
            </a>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <a href={`mailto:${EMAIL_LINK}`}>
            <DropdownMenuItem>Contact</DropdownMenuItem>
          </a>
        </DropdownMenuContent>
      </Suspense>
    </DropdownMenu>
  );
}

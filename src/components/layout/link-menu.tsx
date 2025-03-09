import { NavLink } from "react-router";

import {
  DropdownMenu,
  DropdownMenuContent,
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
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { DONATION_LINK, EMAIL_LINK, GITHUB_LINK } from "@/constants";

function MobileMenuLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
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

export function LinkMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <span>Browse</span>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Browse Sections</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <MobileMenuLink to="/">Pokédex</MobileMenuLink>
          <MobileMenuLink to="/abilities">Abilities</MobileMenuLink>
          <MobileMenuLink to="/moves">Moves</MobileMenuLink>
          <MobileMenuLink to="/tm-locations">TMs & HMs</MobileMenuLink>
          <MobileMenuLink to="/move-tutors">Move Tutors</MobileMenuLink>
          <NavLink to="/about">
            <DropdownMenuItem>About</DropdownMenuItem>
          </NavLink>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Coming Soon</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem disabled>Overworld Items</DropdownMenuItem>
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
    </DropdownMenu>
  );
}

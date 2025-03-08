import { NavLink } from "react-router";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { DONATION_LINK, EMAIL_LINK, GITHUB_LINK } from "@/constants";

export function LinkMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          Sections <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Browse Sections</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <NavLink to="/">
            <DropdownMenuItem>Pokédex</DropdownMenuItem>
          </NavLink>
          <NavLink to="/abilities">
            <DropdownMenuItem>Abilities</DropdownMenuItem>
          </NavLink>
          <NavLink to="/moves">
            <DropdownMenuItem>Moves</DropdownMenuItem>
          </NavLink>
          <NavLink to="/about">
            <DropdownMenuItem>About</DropdownMenuItem>
          </NavLink>
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

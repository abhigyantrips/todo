import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';

import Link from 'next/link';

import { SettingsModal } from '@/components/modals/settings';
import { TagsModal } from '@/components/modals/tags';

export function Header() {
  return (
    <Navbar maxWidth="full" height="6rem" position="static">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="max-w-fit">
          <Link className="flex items-center justify-start gap-1" href="/">
            <p className="font-branding text-2xl text-inherit italic md:text-3xl">
              TaskMaster 5000<sub>(Lite)</sub>
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="flex basis-1/5 gap-1 sm:basis-full sm:gap-2"
        justify="end"
      >
        <NavbarItem>
          <TagsModal />
        </NavbarItem>
        <NavbarItem>
          <SettingsModal />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

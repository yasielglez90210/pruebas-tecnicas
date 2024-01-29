'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { ToggleTheme } from './ToggleTheme';

export default function Menu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link legacyBehavior passHref href="/">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Partidos
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link legacyBehavior passHref href="/players">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Jugadores
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link legacyBehavior passHref href="/builder">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Armador
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <ToggleTheme />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

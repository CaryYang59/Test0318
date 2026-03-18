import { HomeIcon, Store } from "lucide-react";
import Index from "./pages/Index.jsx";
import Merchant from "./pages/Merchant.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Merchant",
    to: "/merchant",
    icon: <Store className="h-4 w-4" />,
    page: <Merchant />,
  },
];

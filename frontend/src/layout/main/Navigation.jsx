import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Container from "@/components/common/Container";
import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { images } from "@/constants/images";

const ajisItems = [
  {
    title: "About the Journal",
    href: "/ajis/about",
  },
  {
    title: "Author Guidelines",
    href: "/ajis/author-guidelines",
  },
  {
    title: "Editorial Board",
    href: "/ajis/editorial-board",
  },
  {
    title: "Manuscript Preparation",
    href: "/ajis/manuscript-preparation",
  },
  {
    title: "Submission Process",
    href: "/ajis/submission-process",
  },
  {
    title: "Review Process",
    href: "/ajis/review-process",
  },
  {
    title: "Issues",
    href: "/ajis/issues",
  },
  {
    title: "Abstracting and Indexing",
    href: "/ajis/abstracting-indexing",
  },
  {
    title: "Submit Manuscript",
    href: "/ajis/submit-manuscript",
  },
];

function Navigation() {
  const location = useLocation();

  return (
    <div className="relative hidden lg:flex">
      <div className="fixed top-0 w-full bg-white backdrop-blur-md shadow-md z-[9999] ">
        <Container className="py-1 flex items-center justify-between">
          <Link to={"/"}>
            <img
              src={images.logo_landscape}
              alt="LOGO"
              className="max-h-14 md:max-h-20"
            />
          </Link>
          <NavigationMenu viewport={false} className={"z-[9999]"}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  active={location.pathname === "/"}
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  active={location.pathname === "/services"}
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/services">Services</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Membership</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-[200px] gap-1">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/how-to-be-member">
                          <div className="text-sm leading-none font-medium">
                            How to be a member?
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/affiliates">
                          <div className="text-sm leading-none font-medium">
                            Affiliates
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  active={location.pathname === "/strategic-initiatives"}
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/strategic-initiatives">Strategic Initiatives</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>AJIS</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-[200px] gap-1">
                    {ajisItems.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link to={item.href}>
                            <div className="text-sm leading-none font-medium">
                              {item.title}
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  active={location.pathname === "/support"}
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/support">Support</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  active={location.pathname === "/news-events"}
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/news-events">News & Events</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div>
            <div className="bg-dark-green text-primary-foreground rounded-full text-sm font-medium gap-2 pl-2 pr-1 flex items-center py-1">
              Contact Us{" "}
              <Button
                // size={"icon"}
                className={
                  "bg-white rounded-full text-black size-7 hover:bg-white/80"
                }
              >
                <ArrowRight />
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Navigation;

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Bell,
  BookOpen,
  Calendar,
  FileText,
  Home,
  Inbox,
  Megaphone,
  Newspaper,
  Search,
  Settings,
  ShoppingBag,
} from "lucide-react";
import { images } from "@/constants/images";
import { NavUser } from "./NavUser";
import { useLocation } from "react-router";
// Menu items.
const mainItems = [
  {
    title: "Home",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Volumes",
    url: "/admin/volumes",
    icon: Newspaper,
  },
  {
    title: "Articles",
    url: "/admin/articles",
    icon: BookOpen,
  },
  {
    title: "Publications",
    url: "/admin/publications",
    icon: Inbox,
  },
  {
    title: "Announcements",
    url: "/admin/announcements",
    icon: Bell,
  },
  {
    title: "Feature",
    url: "/admin/feature",
    icon: Megaphone,
  },
   {
    title: "News & Features",
    url: "/admin/news-features",
    icon: Newspaper,
  },
  {
    title: "Merchandise",
    url: "/admin/merchandise",
    icon: ShoppingBag,
  },
];

const ajisItems = [
  {
    title: "Volumes",
    url: "/admin/volumes",
    icon: BookOpen,
  },
  {
    title: "Articles",
    url: "/admin/articles",
    icon: FileText,
  },
];

export function AppSidebar() {
  const location = useLocation();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className={"flex-row items-center font-bold font-serif"}>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                <img src={images.logo_square} className="" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {"Phlippine Coleopterist "}
                </span>
                <span className="truncate font-semibold">{"Society Inc."}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    variant="outline"
                    asChild
                    isActive={location.pathname === item.url}
                  >
                    <a href={item.url} className="font-medium font-poppins">
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>AJIS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {ajisItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    variant="outline"
                    asChild
                    isActive={location.pathname === item.url}
                  >
                    <a href={item.url} className="font-medium font-poppins">
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

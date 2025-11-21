import { createBrowserRouter, Navigate } from "react-router";
import Home from "./pages/home";
import MainLayout from "./layout/main";
import About from "./pages/ajis/About";
import AuthorGuidelines from "./pages/ajis/AuthorGuidelines";
import ManuscriptPreparation from "./pages/ajis/ManuscriptPreparation";
import EditorialBoard from "./pages/ajis/EditorialBoard";
import SubmissionProcess from "./pages/ajis/SubmissionProcess";
import ReviewProcess from "./pages/ajis/ReviewProcess";
import Issues from "./pages/ajis/Issues";
import AbstractingIndexing from "./pages/ajis/AbstractingIndexing";
import SubmitManuscript from "./pages/ajis/SubmitManuscript";
import StrategicInitiatives from "./pages/strategic-initiatives";
import Services from "./pages/services";
import NewsAndEvents from "./pages/news-events";
import Support from "./pages/support";
import PublicationsPage from "./pages/publications";
import AnnouncementsPage from "./pages/announcements";

// Admin routes
import AdminLayout from "./layout/admin";
import AdminDashboard from "./pages/admin";
import Publications from "./pages/admin/publications";
import Announcements from "./pages/admin/announcements";
import Merchandise from "./pages/admin/merchandise";
import Feature from "./pages/admin/feature";
import UserProfile from "./pages/admin/user";

//auth routes
import AuthLayout from "./layout/auth";
import Login from "./pages/admin/auth/login";

// Error pages
import NotFound from "./pages/errors/NotFound";
import ErrorPage from "./pages/errors/ErrorPage";

// Auth components
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";
import ForgotPassword from "./pages/admin/auth/ForgotPassword";
import ResetPassword from "./pages/admin/auth/ResetPassword";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "/services", Component: Services },
      { path: "/news-events", Component: NewsAndEvents },
      { path: "/support", Component: Support },
      {
        path: "/ajis",
        children: [
          {
            path: "about",
            Component: About,
          },
          {
            path: "author-guidelines",
            Component: AuthorGuidelines,
          },
          {
            path: "manuscript-preparation",
            Component: ManuscriptPreparation,
          },
          {
            path: "editorial-board",
            Component: EditorialBoard,
          },
          {
            path: "issues",
            Component: Issues,
          },
          {
            path: "submission-process",
            Component: SubmissionProcess,
          },
          {
            path: "review-process",
            Component: ReviewProcess,
          },
          {
            path: "abstracting-indexing",
            Component: AbstractingIndexing,
          },
          {
            path: "submit-manuscript",
            Component: SubmitManuscript,
          },
        ],
      },
      {
        path: "strategic-initiatives",
        Component: StrategicInitiatives,
      },
      {
        path: "/publications",
        Component: PublicationsPage,
      },
      {
        path: "/announcements",
        Component: AnnouncementsPage,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: AdminDashboard },
      {
        path: "publications",
        Component: Publications,
      },
      {
        path: "announcements",
        Component: Announcements,
      },
      {
        path: "merchandise",
        Component: Merchandise,
      },
      {
        path: "feature",
        Component: Feature,
      },
      {
        path: "user-profile",
        Component: UserProfile,
      },
    ],
  },
  {
    path: "/admin/auth",
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/admin/auth/login" replace /> },
      { path: "login", Component: Login },
      { path: "forgot-password", Component: ForgotPassword },
      { path: "reset-password", Component: ResetPassword },
    ],
  },
  // Error routes
  {
    path: "/error",
    Component: ErrorPage,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
export default routes;

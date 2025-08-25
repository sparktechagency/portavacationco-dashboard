import { createBrowserRouter } from "react-router-dom";
import Auth from "../Layout/Auth/Auth";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Dashboard/Home";
import PrivacyPolicy from "../Pages/Dashboard/PrivacyPolicy";
import ChangePassword from "../Pages/Auth/ChangePassword";
import Login from "../Pages/Auth/Login";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import VerifyOtp from "../Pages/Auth/VerifyOtp";
import ResetPassword from "../Pages/Auth/ResetPassword";
import NotFound from "../NotFound";
import Notifications from "../Pages/Dashboard/Notifications";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";
import UserProfile from "../Pages/Dashboard/AdminProfile/UserProfile";
import TermsAndCondition from "../Pages/Dashboard/TermsAndCondition";
import Faq from "../components/ui/Settings/Faq";
import AboutUs from "../components/ui/Settings/AboutUs";
import OfferList from "../components/ui/Settings/OfferList";
import Rental from "../Pages/Dashboard/Rental";
import Bookings from "../Pages/Dashboard/Bookings";
import Blogging from "../Pages/Dashboard/Blogging";
import SingleBlog from "../Pages/Dashboard/SingleBlog";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <ProtectedRoute><Main /></ProtectedRoute> ,
    element: (
      // <PrivateRoute>
      <Main />
      // </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/rentals",
        element: <Rental />,
      },
      {
        path: "/bookings",
        element: <Bookings />,
      },
      {
        path: "/blogging",
        element: <Blogging />,
      },
      {
        path: "/blog/:id",
        element: <SingleBlog />,
      },
      {
        path: "/personal-information",
        element: <UserProfile />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },

      {
        path: "f-a-q",
        element: <Faq />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "offer-list",
        element: <OfferList />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-and-condition",
        element: <TermsAndCondition />,
      },
      // {
      //   path: "/edit-terms-and-conditions",
      //   element: <TermsAndCondition />,
      // },
      // {
      //   path: "/press",
      //   element: <Press />,
      // },

      {
        path: "/change-password",
        element: <ChangePassword />,
      },

      {
        path: "/profile",
        element: <AdminProfile />,
      },
      {
        path: "/notification",
        element: <Notifications />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

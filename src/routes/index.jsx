import { createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import CustomError from "../components/web/CustomError";

// Admin Views
import Login from "../views/Auth/Login";
import Forbidden from "../views/Auth/Forbidden";
import Dashboard from "../views/Admin/Dashboard/Index";
import PermissionsIndex from "../views/Admin/Permissions/Index";
import RolesIndex from "../views/Admin/Roles/Index";
import RolesCreate from "../views/Admin/Roles/Create";
import RolesEdit from "../views/Admin/Roles/Edit";
import UsersIndex from "../views/Admin/Users/Index";
import UsersCreate from "../views/Admin/Users/Create";
import UsersEdit from "../views/Admin/Users/Edit";
import CategoriesIndex from "../views/Admin/Categories/Index";
import CategoriesCreate from "../views/Admin/Categories/Create";
import CategoriesEdit from "../views/Admin/Categories/Edit";
import PostsIndex from "../views/Admin/Posts/Index";
import PostsCreate from "../views/Admin/Posts/Create";
import PostsEdit from "../views/Admin/Posts/Edit";
import PagesIndex from "../views/Admin/Pages/Index";
import PagesCreate from "../views/Admin/Pages/Create";
import PagesEdit from "../views/Admin/Pages/Edit";
import ProductsIndex from "../views/Admin/Products/Index";
import ProductsCreate from "../views/Admin/Products/Create";
import ProductsEdit from "../views/Admin/Products/Edit";
import PhotosIndex from "../views/Admin/Photos/Index";
import SlidersIndex from "../views/Admin/Sliders/Index";
import AparatursIndex from "../views/Admin/Aparaturs/Index";
import AparatursCreate from "../views/Admin/Aparaturs/Create";
import AparatursEdit from "../views/Admin/Aparaturs/Edit";

// Frontend Components
import MainHome from "../components/web/MainHome";
import Settings from "../components/web/Settings";
import Pages from "../components/web/pages";
import Intro from "../components/web/intro";
import ShopGrid from "../components/web/ShopGrid";
import ShopList from "../components/web/ShopList";
import SingleProduct from "../components/web/single-product";
import Catagory from "../components/web/Catagory";
import SubCatagory from "../components/web/SubCatagory";
import FlashSale from "../components/web/FlashSale";
import BlogGrid from "../components/web/BlogGrid";
import BlogList from "../components/web/BlogList";
import BlogDetails from "../components/web/BlogDetails";
import Aboutus from "../components/web/Aboutus";
import Contact from "../components/web/Contact";
import Offline from "../components/web/Offline";
import PrivacyPolicy from "../components/web/PrivacyPolicy";
import NotFound from "../components/web/NotFound";
import HomePage from "../components/web/HomePage";

// Frontend Routes
const frontendRoutes = [
  { path: "/", element: <HomePage />, errorElement: <CustomError /> },
  { path: "/settings", element: <Settings />, errorElement: <CustomError /> },
  { path: "/pages", element: <Pages />, errorElement: <CustomError /> },
  { path: "/shop-grid", element: <ShopGrid />, errorElement: <CustomError /> },
  { path: "/shop-list", element: <ShopList />, errorElement: <CustomError /> },
  {
    path: "/single-product",
    element: <SingleProduct />,
    errorElement: <CustomError />,
  },
  { path: "/catagory", element: <Catagory />, errorElement: <CustomError /> },
  {
    path: "/sub-catagory",
    element: <SubCatagory />,
    errorElement: <CustomError />,
  },
  {
    path: "/flash-sale",
    element: <FlashSale />,
    errorElement: <CustomError />,
  },
  { path: "/blog-grid", element: <BlogGrid />, errorElement: <CustomError /> },
  { path: "/blog-list", element: <BlogList />, errorElement: <CustomError /> },
  {
    path: "/blog-details",
    element: <BlogDetails />,
    errorElement: <CustomError />,
  },
  { path: "/about-us", element: <Aboutus />, errorElement: <CustomError /> },
  { path: "/contact", element: <Contact />, errorElement: <CustomError /> },
  { path: "/offline", element: <Offline />, errorElement: <CustomError /> },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
    errorElement: <CustomError />,
  },
];

// Admin Routes
const adminRoutes = [
  { path: "/login", element: <Login />, errorElement: <CustomError /> },
  { path: "/forbidden", element: <Forbidden />, errorElement: <CustomError /> },
  {
    path: "/admin/dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    errorElement: <CustomError />,
  },
  {
    path: "/admin/permissions",
    element: (
      <PrivateRoutes>
        <PermissionsIndex />
      </PrivateRoutes>
    ),
    errorElement: <CustomError />,
  },
  {
    path: "/admin/roles",
    element: (
      <PrivateRoutes>
        <RolesIndex />
      </PrivateRoutes>
    ),
    errorElement: <CustomError />,
  },
  {
    path: "/admin/roles/create",
    element: (
      <PrivateRoutes>
        <RolesCreate />
      </PrivateRoutes>
    ),
    errorElement: <CustomError />,
  },
  {
    path: "/admin/roles/edit/:id",
    element: (
      <PrivateRoutes>
        <RolesEdit />
      </PrivateRoutes>
    ),
    errorElement: <CustomError />,
  },
  {
    path: "/admin/users",
    element: (
      <PrivateRoutes>
        <UsersIndex />
      </PrivateRoutes>
    ),
    errorElement: <CustomError />,
  },
  {
    path: "/admin/users/create",
    element: (
      <PrivateRoutes>
        <UsersCreate />
      </PrivateRoutes>
    ),
    errorElement: <CustomError />,
  },
  {
    path: "/admin/users/edit/:id",
    element: (
      <PrivateRoutes>
        <UsersEdit />
      </PrivateRoutes>
    ),
    errorElement: <CustomError />,
  },
  {
    path: "/admin/categories",
    element: (
      <PrivateRoutes>
        <CategoriesIndex />
      </PrivateRoutes>
    ),
    errorElement: <CustomError />,
  },
  {
    path: "/admin/categories/create",
    element: (
      <PrivateRoutes>
        <CategoriesCreate />
      </PrivateRoutes>
    ),
    errorElement: <CustomError />,
  },
  {
    path: "/admin/categories/edit/:id",
    element: (
      <PrivateRoutes>
        <CategoriesEdit />
      </PrivateRoutes>
    ),
    errorElement: <CustomError />,
  },
  {
    path: "/admin/posts",
    element: (
      <PrivateRoutes>
        <PostsIndex />
      </PrivateRoutes>
    ),
    errorElement: <CustomError />,
  },
  {
    path: "/admin/posts/create",
    element: (
      <PrivateRoutes>
        <PostsCreate />
      </PrivateRoutes>
    ),
    errorElement: <CustomError />,
  },
  {
    path: "/admin/posts/edit/:id",
    element: (
      <PrivateRoutes>
        <PostsEdit />
      </PrivateRoutes>
    ),
    errorElement: <CustomError />,
  },
  {
    path: "/admin/pages",
    element: (
      <PrivateRoutes>
        <PagesIndex />
      </PrivateRoutes>
    ),
    errorElement: <CustomError />,
  },
  {
    path: "/admin/pages/create",
    element: (
      <PrivateRoutes>
        <PagesCreate />
      </PrivateRoutes>
    ),
    errorElement: <CustomError />,
  },
  {
    path: "/admin/pages/edit/:id",
    element: (
      <PrivateRoutes>
        <PagesEdit />
      </PrivateRoutes>
    ),
    errorElement: <CustomError />,
  },
  {
    path: "/admin/products",
    element: (
      <PrivateRoutes>
        <ProductsIndex />
      </PrivateRoutes>
    ),
    errorElement: <CustomError />,
  },
  {
    path: "/admin/products/create",
    element: (
      <PrivateRoutes>
        <ProductsCreate />
      </PrivateRoutes>
    ),
    errorElement: <CustomError />,
  },
  {
    path: "/admin/products/edit/:id",
    element: (
      <PrivateRoutes>
        <ProductsEdit />
      </PrivateRoutes>
    ),
    errorElement: <CustomError />,
  },
  {
    path: "/admin/photos",
    element: (
      <PrivateRoutes>
        <PhotosIndex />
      </PrivateRoutes>
    ),
    errorElement: <CustomError />,
  },
  {
    path: "/admin/sliders",
    element: (
      <PrivateRoutes>
        <SlidersIndex />
      </PrivateRoutes>
    ),
    errorElement: <CustomError />,
  },
  {
    path: "/admin/aparaturs",
    element: (
      <PrivateRoutes>
        <AparatursIndex />
      </PrivateRoutes>
    ),
    errorElement: <CustomError />,
  },
  {
    path: "/admin/aparaturs/create",
    element: (
      <PrivateRoutes>
        <AparatursCreate />
      </PrivateRoutes>
    ),
    errorElement: <CustomError />,
  },
  {
    path: "/admin/aparaturs/edit/:id",
    element: (
      <PrivateRoutes>
        <AparatursEdit />
      </PrivateRoutes>
    ),
    errorElement: <CustomError />,
  },
];

// Combine all routes
const router = createBrowserRouter([
  ...frontendRoutes,
  ...adminRoutes,
  { path: "*", element: <NotFound />, errorElement: <CustomError /> }, // Catch all route at the end
]);

export default router;

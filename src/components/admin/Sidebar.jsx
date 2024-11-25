import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Tambahkan import Link
import hasAnyPermission from "../../utils/Permissions"; // Import fungsi hasAnyPermission asli

export default function Sidebar() {
  // Get current path
  const currentPath = window.location.pathname;

  // State untuk submenu yang terbuka
  const [openSubMenus, setOpenSubMenus] = useState({
    content:
      currentPath.includes("/admin/categories") ||
      currentPath.includes("/admin/posts") ||
      currentPath.includes("/admin/pages") ||
      currentPath.includes("/admin/products"),
    media:
      currentPath.includes("/admin/photos") ||
      currentPath.includes("/admin/sliders"),
    users:
      currentPath.includes("/admin/permissions") ||
      currentPath.includes("/admin/roles") ||
      currentPath.includes("/admin/users"),
  });

  // Fungsi untuk mengecek apakah menu utama memiliki submenu dengan permission
  const hasAnySubMenuPermissions = (menuType) => {
    const permissionGroups = {
      content: [
        "categories.index",
        "posts.index",
        "pages.index",
        "products.index",
      ],
      media: ["photos.index", "sliders.index"],
      users: ["roles.index", "permissions.index", "users.index"],
    };

    return permissionGroups[menuType].some((permission) =>
      hasAnyPermission([permission])
    );
  };

  // Toggle submenu dengan prevent default
  const toggleSubmenu = (e, menu) => {
    e.preventDefault();
    setOpenSubMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  // Check if route is active
  const isRouteActive = (route) => {
    return currentPath.includes(`/admin/${route}`);
  };

  // Get submenu style
  const getSubmenuStyle = (menu) => {
    return {
      display: openSubMenus[menu] ? "block" : "none",
      maxHeight: openSubMenus[menu] ? "1000px" : "0",
      overflow: "hidden",
      transition: "all 0.3s ease-in-out",
    };
  };

  return (
    <div id="sidebar" className="sidebar">
      <div className="sidebar-wrapper active">
        {/* Sidebar Header */}
        <div className="sidebar-header position-relative">
          <div className="d-flex justify-content-between align-items-center">
            <div className="logo">
              <Link to="/admin/dashboard">
                <img
                  src="/images/situraja.svg"
                  alt="Logo"
                  style={{ height: "50px" }}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar Menu */}
        <div className="sidebar-menu">
          <ul className="menu">
            {/* Dashboard selalu tampil */}
            <li
              className={`sidebar-item ${
                isRouteActive("dashboard") ? "active" : ""
              }`}
            >
              <Link to="/admin/dashboard" className="sidebar-link">
                <i className="bi bi-grid-fill"></i>
                <span>Dashboard</span>
              </Link>
            </li>

            {/* Content Management */}
            {hasAnySubMenuPermissions("content") && (
              <>
                <li className="sidebar-title">Content Management</li>
                <li
                  className={`sidebar-item has-sub ${
                    openSubMenus.content ||
                    isRouteActive("categories") ||
                    isRouteActive("posts") ||
                    isRouteActive("pages") ||
                    isRouteActive("products")
                      ? "active"
                      : ""
                  }`}
                >
                  <a
                    href="#"
                    className="sidebar-link"
                    onClick={(e) => toggleSubmenu(e, "content")}
                  >
                    <i className="bi bi-stack"></i>
                    <span>Contents</span>
                  </a>
                  <ul
                    className={`submenu ${
                      openSubMenus.content ? "active" : ""
                    }`}
                    style={getSubmenuStyle("content")}
                  >
                    {hasAnyPermission(["categories.index"]) && (
                      <li
                        className={`submenu-item ${
                          isRouteActive("categories") ? "active" : ""
                        }`}
                      >
                        <Link to="/admin/categories">Categories</Link>
                      </li>
                    )}
                    {hasAnyPermission(["posts.index"]) && (
                      <li
                        className={`submenu-item ${
                          isRouteActive("posts") ? "active" : ""
                        }`}
                      >
                        <Link to="/admin/posts">Posts</Link>
                      </li>
                    )}
                    {hasAnyPermission(["pages.index"]) && (
                      <li
                        className={`submenu-item ${
                          isRouteActive("pages") ? "active" : ""
                        }`}
                      >
                        <Link to="/admin/pages">Pages</Link>
                      </li>
                    )}
                    {hasAnyPermission(["products.index"]) && (
                      <li
                        className={`submenu-item ${
                          isRouteActive("products") ? "active" : ""
                        }`}
                      >
                        <Link to="/admin/products">Products</Link>
                      </li>
                    )}
                  </ul>
                </li>
              </>
            )}

            {/* Media Management */}
            {hasAnySubMenuPermissions("media") && (
              <>
                <li className="sidebar-title">Media Management</li>
                <li
                  className={`sidebar-item has-sub ${
                    openSubMenus.media ||
                    isRouteActive("photos") ||
                    isRouteActive("sliders")
                      ? "active"
                      : ""
                  }`}
                >
                  <a
                    href="#"
                    className="sidebar-link"
                    onClick={(e) => toggleSubmenu(e, "media")}
                  >
                    <i className="bi bi-image-fill"></i>
                    <span>Media</span>
                  </a>
                  <ul
                    className={`submenu ${openSubMenus.media ? "active" : ""}`}
                    style={getSubmenuStyle("media")}
                  >
                    {hasAnyPermission(["photos.index"]) && (
                      <li
                        className={`submenu-item ${
                          isRouteActive("photos") ? "active" : ""
                        }`}
                      >
                        <Link to="/admin/photos">Photos</Link>
                      </li>
                    )}
                    {hasAnyPermission(["sliders.index"]) && (
                      <li
                        className={`submenu-item ${
                          isRouteActive("sliders") ? "active" : ""
                        }`}
                      >
                        <Link to="/admin/sliders">Sliders</Link>
                      </li>
                    )}
                  </ul>
                </li>
              </>
            )}

            {/* Others - Aparaturs */}
            {hasAnyPermission(["aparaturs.index"]) && (
              <>
                <li className="sidebar-title">Others</li>
                <li
                  className={`sidebar-item ${
                    isRouteActive("aparaturs") ? "active" : ""
                  }`}
                >
                  <Link to="/admin/aparaturs" className="sidebar-link">
                    <i className="bi bi-person-fill"></i>
                    <span>Aparaturs</span>
                  </Link>
                </li>
              </>
            )}

            {/* Users Management */}
            {hasAnySubMenuPermissions("users") && (
              <>
                <li className="sidebar-title">Users Management</li>
                <li
                  className={`sidebar-item has-sub ${
                    openSubMenus.users ||
                    isRouteActive("roles") ||
                    isRouteActive("permissions") ||
                    isRouteActive("users")
                      ? "active"
                      : ""
                  }`}
                >
                  <a
                    href="#"
                    className="sidebar-link"
                    onClick={(e) => toggleSubmenu(e, "users")}
                  >
                    <i className="bi bi-person-badge-fill"></i>
                    <span>Users</span>
                  </a>
                  <ul
                    className={`submenu ${openSubMenus.users ? "active" : ""}`}
                    style={getSubmenuStyle("users")}
                  >
                    {hasAnyPermission(["roles.index"]) && (
                      <li
                        className={`submenu-item ${
                          isRouteActive("roles") ? "active" : ""
                        }`}
                      >
                        <Link to="/admin/roles">Roles</Link>
                      </li>
                    )}
                    {hasAnyPermission(["permissions.index"]) && (
                      <li
                        className={`submenu-item ${
                          isRouteActive("permissions") ? "active" : ""
                        }`}
                      >
                        <Link to="/admin/permissions">Permissions</Link>
                      </li>
                    )}
                    {hasAnyPermission(["users.index"]) && (
                      <li
                        className={`submenu-item ${
                          isRouteActive("users") ? "active" : ""
                        }`}
                      >
                        <Link to="/admin/users">Users</Link>
                      </li>
                    )}
                  </ul>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

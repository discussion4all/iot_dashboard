import pTestPage from "views/Pages/pTestPage.jsx";

import WidgetsIcon from "@material-ui/icons/Widgets";

var dashRoutes = [
  { path: "/dashboard", name: "Dashboard", icon: WidgetsIcon, component: pTestPage },
  { redirect: true, path: "/", pathTo: "/account/login", name: "Login page" }
];
export default dashRoutes;

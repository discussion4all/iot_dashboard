import Pages from "layouts/Pages.jsx";
import Dashboard from "layouts/Dashboard.jsx";
import NotFound from "../views/Pages/NotFound";

var indexRoutes = [
  { path: "/", name: "Pages", component: Pages },
  { path: "/dashboard", name: "Home", component: Dashboard },
  { name: "Not Found", component: NotFound }
];

export default indexRoutes;

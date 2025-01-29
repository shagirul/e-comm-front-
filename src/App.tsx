import { RouterProvider, createBrowserRouter } from "react-router-dom";
// const SidebarLayout = lazy(() => import("./layouts/SidebarLayout"));

import SidebarLayout from "./Adminlayouts/SidebarLayout";
import Dashboard from "./Adminpages/dashboard";
import Products from "./Adminpages/product";

import Orders from "./Adminpages/order";
import Users from "./Adminpages/User";
import NewProduct from "./Adminpages/product/NewProduct";
import ProductLayout from "./Adminlayouts/ProductLayout";

import ProtectedRoute from "./component/ProtectedRoute";
import Home from "./pages/Home";
import Search from "./pages/Search";
import ProductDetailPage from "./pages/ProductDetailPage";
import NotFound from "./component/NotFound";
import ManageProduct from "./Adminpages/product/ManageProduct";
import CheckOutLayout from "./pages/Checkout";
import ShipmentAddress from "./pages/Checkout/ShipmentAddress";
import PaymentPage from "./pages/Checkout/Payment";
import ManageOrder from "./Adminpages/order/ManageOrder";
import PaymentReview from "./pages/Checkout/Review";
import MyAccount from "./pages/MyAccount";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/admin",
          element: <SidebarLayout />,
          children: [
            { path: "/admin", element: <Dashboard /> },
            { path: "customer", element: <Users /> },
            {
              path: "transaction",
              // element: <Orders />,
              children: [
                {
                  path: "",
                  element: <Orders />,
                },
                {
                  path: ":id",
                  element: <ManageOrder />,
                },
              ],
            },
            {
              path: "product",
              children: [
                {
                  path: "",
                  element: <Products />,
                },
                {
                  path: "new",
                  element: <NewProduct />,
                },
                {
                  path: ":id",
                  element: <ManageProduct />,
                },
              ],
            },
          ],
        },
        { path: "/", element: <Home /> },
        { path: "/search", element: <Search /> },
        { path: "/myAccount", element: <MyAccount /> },
        {
          path: "/checkout",
          element: <CheckOutLayout />,
          children: [
            {
              path: "address",
              element: <ShipmentAddress />,
            },
            {
              path: "payment",
              element: <PaymentPage />,
            },
            {
              path: "review",
              element: <PaymentReview />,
            },
          ],
        },
        { path: "/product/:productId", element: <ProductDetailPage /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

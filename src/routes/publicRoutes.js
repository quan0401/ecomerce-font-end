import CartPage from "../pages/CartPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ProductListPage from "../pages/ProductListPage";
import RegisterPage from "../pages/RegisterPage";

const routes = [
  { path: "/cart", Component: CartPage },
  { path: "/home", Component: HomePage },

  { path: "/login", Component: LoginPage },
  { path: "/product-detail/:id", Component: ProductDetailPage },

  // Product paths
  { path: "/product-list", Component: ProductListPage },
  { path: "/product-list/:pageNum", Component: ProductListPage },
  { path: "/product-list/category/:categoryName", Component: ProductListPage },
  {
    path: "/product-list/category/:categoryName/:pageNum",
    Component: ProductListPage,
  },
  { path: "/product-list/search/searchQuery", Component: ProductListPage },
  {
    path: "/product-list/search/searchQuery/:pageNum",
    Component: ProductListPage,
  },
  {
    path: "/product-list/category/:categoryName/search/searchQuery",
    Component: ProductListPage,
  },
  {
    path: "/product-list/category/:categoryName/search/searchQuery/:pageNum",
    Component: ProductListPage,
  },

  //
  { path: "/register", Component: RegisterPage },

  {
    path: "*",
    Component: function () {
      return (
        <h1 className="text-align-center">Need to login or page not exist</h1>
      );
    },
  },
];
export default routes;

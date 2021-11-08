import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import AddProduct from "./pages/addProduct/AddProduct";
import Login from "./pages/login/Login";
import Orders from "./pages/orders/Orders";
import Overview from "./pages/overview/Overview";
import Payment from "./pages/payment/Payment";
import Products from "./pages/products/Products";
import Promotion from "./pages/promotion/Promotion";
import Setting from "./pages/setting/Setting";

const App = () => {
  const { user } = useSelector((state) => state.auth);
  // console.log(user?.data.user.role);

  if (user?.data.user.role !== "admin") {
    return (
      <Switch>
        <Route path="/">
          <Login />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    );
  }
  return (
    <div className="grid grid-cols-6">
      <Sidebar />
      <Switch>
        <Route path="/" exact>
          <Overview />
        </Route>
        <Route path="/orders">
          <Orders />
        </Route>
        <Route path="/products" exact>
          <Products />
        </Route>
        <Route path="/products/add-product">
          <AddProduct />
        </Route>
        <Route path="/payment">
          <Payment />
        </Route>
        <Route path="/promotions">
          <Promotion />
        </Route>
        <Route path="/setting">
          <Setting />
        </Route>
      </Switch>
    </div>
  );
};

export default App;

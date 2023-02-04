import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";
import "react-toastify/dist/ReactToastify.css";
import BasketPage from "../../features/basket/BasketPage";
import LoadingComponent from "./LoadingComponent";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import { useAppDispatch } from "../redux/ConfigureStore";
import { fetchBasketAsync } from "../redux/slices/basketSlice";

import { Login } from "../../features/account/Login";
import { fetchCurrentUser } from "../redux/slices/accountSlice";

import Register from "../../features/register/Register";
import PrivateRoute from "./PrivateRoute";

function App() {
  const dispatch = useAppDispatch();
  const [loading, SetLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => SetLoading(false));
  }, [initApp]);

  const [darkMode, setDarkmode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  function handleThemeChange() {
    setDarkmode(!darkMode);
  }

  if (loading) return <LoadingComponent message="Initialising app..." />;
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<ProductDetails />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/basket" element={<BasketPage />} />
          {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
          <Route
            path="/checkout"
            element={<PrivateRoute component={CheckoutPage} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Login />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;

import { Container, createTheme, CssBaseline, Switch, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css'
import BasketPage from "../../features/basket/BasketPage";
import { getCookie } from "../util/Util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import { useAppDispatch } from "../redux/ConfigureStore";
import { setBasket } from "../redux/slices/basketSlice";



function App() {
 const dispatch = useAppDispatch();
 const [loading, SetLoading] = useState(true);

 useEffect(() => {
  const buyerId = getCookie('buyerId');
  if(buyerId) {
    agent.Basket.get()
    .then(basket => dispatch(setBasket(basket)))
    .catch(error => console.log(error))
    .finally(() => SetLoading(false)); 
  }else{
    SetLoading(false);
  }
 },[dispatch])



  const [darkMode, setDarkmode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange(){
    setDarkmode(!darkMode);
  }

   
  if(loading) return <LoadingComponent message='Initialising app...'/>
  return (
    <ThemeProvider theme = {theme}>
      <ToastContainer position='bottom-right' hideProgressBar />
      <CssBaseline/>
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:id" element={<ProductDetails />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/basket" element={<BasketPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
      </Container>
      
    </ThemeProvider>
  );
}

export default App;
 
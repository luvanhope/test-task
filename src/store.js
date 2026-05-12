import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./components/Features/FormBlock1/FormBlockSlice";
import clientReducer from "../src/components/Features/SearchClients/SearchClientsSlice";
import formDetailsReducer from "./components/Features/FormBlock2/FormBlockSlice";
import ProductsReducer from "./components/Features/Products/ProductsSlice";
import cartReducer from "./components/Features/Cart/CartSlice";
import SaleReducer from "./components/Features/CreateSale/CreateSaleSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      Token: tokenReducer,
      Clients: clientReducer,
      formDetails: formDetailsReducer,
      Products: ProductsReducer,
      CartProducts: cartReducer,
      Sales: SaleReducer,
    },
  });
};

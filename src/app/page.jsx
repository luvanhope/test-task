"use client";
import React, { useEffect } from "react"; // Добавили useEffect
import FormBlock1 from "@/components/Features/FormBlock1/FormBlock1";
import Header from "@/components/Features/Header/Header";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ВАЖНО: импортируй стили!
import SearchClients from "@/components/Features/SearchClients/SearchClients";
import FormBlock2 from "@/components/Features/FormBlock2/FormBlock2";
import Products from "@/components/Features/Products/Products";
import Cart from "@/components/Features/Cart/Cart";
import CreateSale from "@/components/Features/CreateSale/CreateSale";

export default function Home() {
  const confirmToken = useSelector((state) => state.Token.confirmToken);

  useEffect(() => {
    if (confirmToken) {
      toast.success("Касса успешно подключена!");
    }
  }, [confirmToken]);

  return (
    <>
      <Header />
      <FormBlock1 />
      <SearchClients />
      <FormBlock2 />
      <Products />
      <Cart />
      <CreateSale />
      <ToastContainer position="top-center" />
    </>
  );
}

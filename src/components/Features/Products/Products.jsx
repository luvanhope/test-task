"use client";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setText } from "./ProductsSlice";
import { Input } from "@/components/ui/input";
import { addToCart } from "../Cart/CartSlice";

const Products = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.Token.token);
  const isConfirmed = useSelector((state) => state.Token.confirmToken);

  const searchedText = useSelector((state) => state.Products.searchedText);
  const productsData = useSelector((state) => state.Products.products);
  const loading = useSelector((state) => state.Products.loading);

  useEffect(() => {
    if (isConfirmed && token) {
      dispatch(fetchProducts(token));
    }
  }, [dispatch, token, isConfirmed]);

  if (!isConfirmed) return null;

  const filtered = (productsData || []).filter((product) =>
    product.name?.toString().toLowerCase().includes(searchedText.toLowerCase()),
  );

  return (
    <div className="flex w-full justify-center p-4">
      <div className="flex w-[600px] flex-col items-start bg-white border-gray-200 border rounded-[15px] p-[20px] shadow-sm">
        <h1 className="text-[22px] font-bold text-black">4. Товары</h1>
        <p className="text-gray-500 mb-[20px] text-[18px] font-[400]">
          Поиск и добавление номенклатуры
        </p>

        <Input
          className="mb-4"
          value={searchedText}
          onChange={(e) => dispatch(setText(e.target.value))}
          placeholder="поиск по названию"
        />

        <Card className="w-full overflow-hidden">
          <CardContent className="max-h-[400px] overflow-y-auto p-0 custom-scrollbar">
            {loading ? (
              <div className="p-10 text-center text-gray-400">
                Загрузка товаров...
              </div>
            ) : filtered.length > 0 ? (
              filtered.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col gap-1">
                    <h1 className="font-bold text-black text-[16px]">
                      {product.name}
                    </h1>
                    <span className="text-gray-400 text-[14px]">
                      {product.prices
                        ? `${product.prices} ₽`
                        : "цена не указана"}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      dispatch(
                        addToCart({
                          productId: product.id,
                          productPrice: product.prices,
                          productName: product.name,
                          count: 1,
                        }),
                      )
                    }
                    className="text-sky-600 font-semibold hover:text-sky-800 transition-colors"
                  >
                    Добавить
                  </button>
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-gray-400">
                Товары не найдены
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Products;

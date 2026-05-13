"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setText } from "./ProductsSlice";
import { addToCart } from "../Cart/CartSlice";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiSearch, FiPlus } from "react-icons/fi";

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
      <Card className="w-full max-w-[600px] shadow-sm overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl">4. Товары</CardTitle>
          <CardDescription className="text-base">
            Поиск и добавление номенклатуры в заказ
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-10 h-12 text-base rounded-xl"
              value={searchedText}
              onChange={(e) => dispatch(setText(e.target.value))}
              placeholder="Поиск по названию..."
            />
          </div>

          <div className="rounded-xl border border-muted-foreground/10 overflow-hidden bg-muted/5">
            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {loading ? (
                <div className="p-12 text-center text-muted-foreground">
                  <div className="animate-spin inline-block size-6 border-2 border-primary border-t-transparent rounded-full mb-2" />
                  <p>Загрузка товаров...</p>
                </div>
              ) : filtered.length > 0 ? (
                filtered.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-muted/50 transition-all group"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">
                        {product.name}
                      </span>
                      <span className="text-muted-foreground font-medium">
                        {product.prices
                          ? `${Number(product.prices).toLocaleString()} ₽`
                          : "Цена не указана"}
                      </span>
                    </div>

                    <Button
                      variant="secondary"
                      size="sm"
                      className="rounded-full font-bold text-primary hover:bg-primary hover:text-white transition-all"
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
                    >
                      <FiPlus className="mr-1" />
                      Добавить
                    </Button>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-muted-foreground">
                  Товары не найдены
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Products;

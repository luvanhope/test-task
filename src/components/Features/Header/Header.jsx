"use client";
import React from "react";
import { useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { FiCheckCircle, FiAlertCircle, FiGlobe } from "react-icons/fi";

const Header = () => {
  const { error, confirmToken } = useSelector((state) => state.Token);

  return (
    <div className="flex w-full justify-center p-4 pb-2">
      <Card className="w-full max-w-[600px] border-none shadow-sm bg-white rounded-[20px] overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 text-primary/60 mb-2">
            <FiGlobe size={14} />
            <span className="text-sm font-medium tracking-widest uppercase">
              tablecrm.com
            </span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-foreground">
            Мобильный заказ
          </h1>
          <p className="mt-1 text-muted-foreground text-base leading-relaxed">
            Система быстрого оформления продаж и печати чеков.
          </p>

          <div className="mt-6 flex items-center gap-3 py-2 px-4 bg-muted/30 rounded-xl w-fit">
            <div className="relative flex h-3 w-3">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${confirmToken ? "bg-green-400" : error ? "bg-red-400" : "bg-slate-400"}`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-3 w-3 ${confirmToken ? "bg-green-500" : error ? "bg-red-500" : "bg-slate-300"}`}
              ></span>
            </div>

            {confirmToken ? (
              <div className="flex items-center gap-1.5 text-green-600 font-bold">
                <FiCheckCircle size={18} />
                <span>Касса подключена</span>
              </div>
            ) : (
              <div
                className={`flex items-center gap-1.5 font-bold ${error ? "text-red-500" : "text-muted-foreground"}`}
              >
                {error ? <FiAlertCircle size={18} /> : null}
                <span>
                  {error ? `Ошибка: ${error}` : "Касса не подключена"}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Header;

"use client";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClients,
  setSearchNumber,
  setSelectedClient,
} from "./SearchClientsSlice";
import { Phone } from "lucide-react";

const SearchClients = () => {
  const dispatch = useDispatch();

  const searchedNumber = useSelector((state) => state.Clients.searchedNumber);
  const clients = useSelector((state) => state.Clients.clients);
  const selectedClient = useSelector((state) => state.Clients.selectedClient);
  const token = useSelector((state) => state.Token.token);
  const confirmToken = useSelector((state) => state.Token.confirmToken);

  const searchedClients = clients.filter((client) =>
    client?.phone?.includes(searchedNumber),
  );

  useEffect(() => {
    if (confirmToken && token) {
      dispatch(fetchClients(token));
    }
  }, [confirmToken, token, dispatch]);

  const handleSelectClient = (value) => {
    const client = clients.find((c) => c.id.toString() === value);
    if (client) {
      dispatch(setSelectedClient(client));
    }
  };

  return (
    <div className="flex w-full justify-center p-4">
      <div className="flex w-[600px] flex-col items-start bg-white border border-gray-200 rounded-[25px] p-[30px] shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Phone size={20} className="text-black" />
          <h1 className="text-[22px] font-bold text-black">2. Клиент</h1>
        </div>

        <p className="text-gray-500 mb-[30px] text-[18px] font-[400]">
          Поиск клиента по телефону
        </p>

        <Label className="text-black text-[18px] font-medium mb-2">
          Телефон
        </Label>
        <Input
          value={searchedNumber}
          onChange={(e) => dispatch(setSearchNumber(e.target.value))}
          placeholder="Введите номер телефона"
          className="h-[50px] rounded-[15px] border-[#E8E4DE] bg-white mb-6 focus-visible:ring-2 focus-visible:ring-gray-200 text-[16px]"
        />

        <Label className="text-black text-[18px] font-medium mb-2">
          Найденный клиент
        </Label>

        <Select
          value={selectedClient?.id?.toString() || ""}
          onValueChange={handleSelectClient}
        >
          <SelectTrigger className="w-full sm:w-fit min-w-[200px] h-[45px] rounded-[15px] border-[#E8E4DE] bg-white gap-3 px-4">
            <SelectValue placeholder="Выберите клиента" />
          </SelectTrigger>

          <SelectContent className="rounded-[15px] max-h-[300px]">
            {searchedNumber.length > 0 ? (
              searchedClients.length > 0 ? (
                searchedClients.map((client) => (
                  <SelectItem key={client.id} value={client.id.toString()}>
                    {client.name}{" "}
                    <span className="text-gray-400 ml-1">({client.phone})</span>
                  </SelectItem>
                ))
              ) : (
                <div className="p-4 text-sm text-gray-500 text-center">
                  Клиенты не найдены
                </div>
              )
            ) : (
              <div className="p-4 text-sm text-gray-400 text-center">
                Введите номер для поиска
              </div>
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchClients;

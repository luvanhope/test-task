"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClients,
  setSearchNumber,
  setSelectedClient,
} from "./SearchClientsSlice";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, User } from "lucide-react";

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
      <Card className="w-full max-w-[600px] shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Phone size={20} className="text-primary" />
            </div>
            <CardTitle className="text-2xl">2. Клиент</CardTitle>
          </div>
          <CardDescription className="text-base">
            Поиск клиента по номеру телефона в базе данных
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground ml-1">
              Телефон
            </Label>
            <Input
              value={searchedNumber}
              onChange={(e) => dispatch(setSearchNumber(e.target.value))}
              placeholder="+7 (___) ___-__-__"
              className="h-12 text-lg rounded-xl focus-visible:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground ml-1">
              Результат поиска
            </Label>
            <Select
              value={selectedClient?.id?.toString() || ""}
              onValueChange={handleSelectClient}
            >
              <SelectTrigger className="h-12 rounded-xl bg-muted/30 border-none hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <User size={18} className="text-muted-foreground" />
                  <SelectValue placeholder="Выберите найденного клиента" />
                </div>
              </SelectTrigger>

              <SelectContent className="rounded-xl shadow-xl">
                {searchedNumber.length > 0 ? (
                  searchedClients.length > 0 ? (
                    searchedClients.map((client) => (
                      <SelectItem
                        key={client.id}
                        value={client.id.toString()}
                        className="py-3 cursor-pointer"
                      >
                        <span className="font-medium">{client.name}</span>
                        <span className="text-muted-foreground ml-2 text-xs">
                          ({client.phone})
                        </span>
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-6 text-sm text-muted-foreground text-center">
                      Клиенты не найдены
                    </div>
                  )
                ) : (
                  <div className="p-6 text-sm text-muted-foreground text-center">
                    Начните вводить номер
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchClients;

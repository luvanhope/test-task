import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { chekToken, setToken } from "./FormBlockSlice";

const FormBlock1 = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.Token.token);

  return (
    <div className="flex w-full justify-center p-4">
      <Card className="w-full max-w-[600px] shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">1. Подключение кассы</CardTitle>
          <CardDescription className="text-base">
            Введите токен и загрузите справочники
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="token" className="text-base">Ваш Token</Label>
            <Input
              id="token"
              className="h-12 text-base"
              value={token}
              onChange={(e) => dispatch(setToken(e.target.value))}
              placeholder="00000000-0000-0000-0000-000000000000"
            />
          </div>
          <Button 
            size="lg"
            className="w-full text-lg font-semibold h-12"
            onClick={() => dispatch(chekToken(token))}
          >
            Подключить кассу
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
export default FormBlock1;

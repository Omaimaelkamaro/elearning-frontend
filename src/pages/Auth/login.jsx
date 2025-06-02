import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthContext } from "@/context/AuthContext";
import api from "@/service/api";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    if (!loginInput.email || !loginInput.password) {
      toast.error(t("login.fillAllFields"));
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post("/login", loginInput);
      const data = response.data;

      toast.success(data.message || t("login.success"));
      dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
      localStorage.setItem("user", JSON.stringify(data.user));
      if (data.user.role === "administrateur") {
      navigate("/admin/dashboard");
    }else if(data.user.role=="formateur")
{
  navigate("/formateur/dashboard");
}else{
  navigate("/user/profile");
}
    } catch (error) {
      toast.error(error.response?.data?.message || t("login.failed"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center w-full justify-center mt-20 mb-20">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>{t("login.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">{t("login.email")}</Label>
                <Input
                  type="email"
                  name="email"
                  value={loginInput.email}
                  onChange={handleChange}
                  placeholder={t("login.emailPlaceholder")}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">{t("login.password")}</Label>
                <Input
                  type="password"
                  name="password"
                  value={loginInput.password}
                  onChange={handleChange}
                  placeholder={t("login.passwordPlaceholder")}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={isLoading} onClick={handleLogin}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("login.loading")}
                  </>
                ) : (
                  t("login.button")
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
     
    </div>
  );
};

export default Login;

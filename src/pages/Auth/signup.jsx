import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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

const Signup = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const { t } = useTranslation();
  const { dispatch } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegistration = async () => {
    setIsLoading(true);
    try {
      const response = await api.post("/register", signupInput);
      const data = response.data;

      toast.success(data.message || t("signup.success"));

      dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || t("signup.failed"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center w-full justify-center mt-20 mb-20">
      <Tabs defaultValue="signup" className="w-[400px]">
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>{t("signup.title")}</CardTitle>
              <CardDescription>{t("signup.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">{t("signup.name")}</Label>
                <Input
                  type="text"
                  name="name"
                  value={signupInput.name}
                  onChange={handleChange}
                  placeholder={t("signup.namePlaceholder")}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">{t("signup.email")}</Label>
                <Input
                  type="email"
                  name="email"
                  value={signupInput.email}
                  onChange={handleChange}
                  placeholder={t("signup.emailPlaceholder")}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">{t("signup.password")}</Label>
                <Input
                  type="password"
                  name="password"
                  value={signupInput.password}
                  onChange={handleChange}
                  placeholder={t("signup.passwordPlaceholder")}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password_confirmation">{t("signup.confirmPassword")}</Label>
                <Input
                  type="password"
                  name="password_confirmation"
                  value={signupInput.password_confirmation}
                  onChange={handleChange}
                  placeholder={t("signup.confirmPasswordPlaceholder")}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={isLoading} onClick={handleRegistration}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("signup.loading")}
                  </>
                ) : (
                  t("signup.button")
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Signup;

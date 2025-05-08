// McgPr7oX7v1mMcbN
import { Button } from "@/components/ui/button";
import { Card, CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent} from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext"; 
import api from "@/services/api"; 

const Login = () => {
 
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInput((prev) => ({ ...prev, [name]: value }));
  };
    

const handleLogin  = async () => {
    if (!loginInput.email || !loginInput.password) {
        toast.error("Please fill in both email and password");
        return;
      }
    
      setIsLoading(true);
    setIsLoading(true);
    try {
      const response = await api.post("/user/login", loginInput); // URL relative ici
      const data = response.data;
  
      toast.success(data.message || "Login successful");
  
      dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex items-center w-full justify-center mt-20">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={loginInput.email}
                  onChange={handleChange}
                  placeholder="Eg. patel@gmail.com"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={loginInput.password}
                  onChange={handleChange}
                  placeholder="Eg. xyz"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={isLoading}
                onClick={ handleLogin }
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  "Login"
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
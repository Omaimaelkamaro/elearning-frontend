// McgPr7oX7v1mMcbN
import { Button } from "@/components/ui/button";
import { Card, CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext"; 
import api from "@/service/api"; 
const Signup = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
 
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
      
          toast.success(data.message || "Signup successful");
      
          dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/dashboard");
        } catch (error) {
          toast.error(error.response?.data?.message || "Signup failed");
        } finally {
          setIsLoading(false);
        }
      };
  
  
  
    
  

  return (
    <div className="flex items-center w-full justify-center mt-20">
      <Tabs defaultValue="signup" className="w-[400px]">
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create a new account and click signup when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={signupInput.name}
                  onChange={handleChange}
                  placeholder="Eg. patel"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="Email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signupInput.email}
                  onChange={handleChange}
                  placeholder="Eg. patel@gmail.com"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="Password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={signupInput.password}
                  onChange={handleChange}
                  placeholder="Eg. xyz"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="Password Confirmation">Confirm Password</Label>
                <Input
                 type="password"
                 name="password_confirmation"
                 value={signupInput.password_confirmation}
                 onChange={handleChange}
                 placeholder="Confirm your password"
                required
               />
             </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={isLoading}
                onClick={handleRegistration}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  "Signup"
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
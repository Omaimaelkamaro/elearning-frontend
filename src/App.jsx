import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/login";
import Signup from "./pages/Auth/signup";
import Layout from "./layouts/Layout";
import Profile from './pages/etudiant/profil/MonCompte';
import Unauthorized from "@/pages/Unauthorized";
import AdminLayout from "@/layouts/AdminLayout";
import AdminRoute from "@/routes/AdminRoute";
import PrivateRoute from "@/routes/PrivateRoute";


function App() {

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
        <Route path="/" element={<Login />} /> 
       <Route element={<PrivateRoute />}>
            <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
     <Route path="profile" element={<Profile />} />
        </Route>
          </Route>
        <Route path="/signup" element={<Signup />} />
         <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>

       
       
      </Routes>
    </Router>
  );
}

export default App

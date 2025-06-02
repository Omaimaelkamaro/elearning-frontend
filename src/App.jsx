import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/login";
import Signup from "./pages/Auth/signup";
import Layout from "./layouts/Layout";
import Profile from './pages/etudiant/profil/MonCompte';
import Unauthorized from "@/pages/Unauthorized";
import About from "@/pages/About";
import ContactUs from "@/pages/Contact";
import AdminLayout from "@/layouts/AdminLayout";
import AdminRoute from "@/routes/AdminRoute";
import PrivateRoute from "@/routes/PrivateRoute";
import DevenirFormateur from './pages/etudiant/DevenirFormateur';
import { FormateurDProvider } from './context/FormateurRequestContext';
import EtudiantRoute from './routes/EtudiantRoute';
import EtudiantLayout from './layouts/EtudiantLayout';
import { MonApprentissageProvider } from "@/context/MonApprentissageContext";
import { CourseProvider } from "@/context/Course/CourseContext"; 
import MonApprentissage from "@/pages/etudiant/MonApprentissage";
import AccueilCours from "@/pages/etudiant/AccueilCours";

function App() {
  const token = localStorage.getItem('token');
  const etudiantId = localStorage.getItem('etudiant_id');

  return (
    <Router>
      <FormateurDProvider>
         <CourseProvider>
                      <MonApprentissageProvider>
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
                {/* <Route path="dashboard" element={<Dashboard />} /> */}
              </Route>

              <Route
                path="/etudiant"
                element={
                  <EtudiantRoute>
                    <EtudiantLayout />
                  </EtudiantRoute>
                }
              >
                <Route path="profile" element={<Profile />} />
                {/* <Route path="dashboard" element={<Dashboard />} /> */}
                <Route path="devenir-formateur" element={<DevenirFormateur />} />
                   <Route path="my-learning" element={ <MonApprentissage />
 }
/>

                {/* Ici on englobe uniquement la page MonApprentissage avec ses contextes */}
             
              </Route>
            </Route>

            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route
              path="/devenir-formateur"
              element={<DevenirFormateur etudiantId={etudiantId} token={token} />}
            />

            <Route path="/homeSudent" element={<AccueilCours />} />

            <Route path="/unauthorized" element={<Unauthorized />} />
          </Route>
        </Routes>
         </MonApprentissageProvider>
                    </CourseProvider>
      </FormateurDProvider>
    </Router>
  );
}

export default App;

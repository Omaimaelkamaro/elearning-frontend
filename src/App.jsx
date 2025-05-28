import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/login";
import Signup from "./pages/Auth/signup";
import Layout from "./layouts/Layout";
import Profile from './pages/etudiant/profil/MonCompte';
import Unauthorized from "@/pages/Unauthorized";
import About from "@/pages/About";
import ContactUs from "@/pages/Contact";
import AdminLayout from "@/layouts/AdminLayout";
import FormateurLayout from "@/layouts/FormateurLayout";
import AdminRoute from "@/routes/AdminRoute";
import FormateurRoute from "@/routes/FormateurRoute";
import PrivateRoute from "@/routes/PrivateRoute";
import Dashboard from './pages/admin/Dashboard';
import CourseTable from './pages/admin/Course/CourseTable';
import CourseTableF from './pages/formateur/Course/CourseTable';
import AddCourse from './pages/admin/Course/AddCourse';
import AddCourseF from './pages/formateur/Course/AddCourse';
import EditCourse from './pages/admin/Course/EditCourse';
import EditCourseF from './pages/formateur/Course/EditCourse';
import { CourseProvider } from './context/Course/CourseContext';  
import { CategoryProvider } from './context/Category/CategoryContext';
import { FormateurProvider } from './context/Formateur/FormateurContext';
import { ModuleProvider } from './context/Module/ModuleContext';
import CreateModule from './pages/formateur/module/CreateModule';
import EditModule from './pages/formateur/module/EditModule';


function App() {
  return (
    <CategoryProvider>
    <ModuleProvider>
    <FormateurProvider >
    <CourseProvider>
       {/* Ajout ici */}
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
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="cours"element={<CourseTable />}/>
                <Route path="cours/create"element={<AddCourse />}/>
                <Route path="cours/:id"element={<EditCourse />}/>
              </Route>
              <Route
                path="/formateur"
                element={
                  <FormateurRoute>
                    <FormateurLayout />
                  </FormateurRoute>
                }
              >
                <Route path="profile" element={<Profile />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="cours"element={<CourseTableF />}/>
                <Route path="cours/create"element={<AddCourseF />}/>
                <Route path="cours/:id"element={<EditCourseF />}/>
                <Route path="cours/:id/module"element={<CreateModule />}/>
                <Route path="cours/:id/module/:moduleId"element={<EditModule />}/>
              </Route>
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Route>
        </Routes>
      </Router>
    </CourseProvider>
    </FormateurProvider >
    </ModuleProvider >
    </CategoryProvider>
  );
}

export default App;

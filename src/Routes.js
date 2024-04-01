import { Route, Routes } from "react-router-dom";
import CompanyDetail from "./CompanyDetail";
import CompanyList from "./CompanyList";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Profile from "./Profile";
import Home from "./Home";

function AppRoutes() {
    return (
      <Routes>
        <Route exact path="/companies" element={<CompanyList />} />
        <Route exact path="/companies/:handle" element={<CompanyDetail />} />
        <Route exact path="/jobs" element={<JobList />} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/signup" element={<SignupForm />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/" element={<Home />} />
        <Route path="*" />
      </Routes>
    );
  }

export default AppRoutes;
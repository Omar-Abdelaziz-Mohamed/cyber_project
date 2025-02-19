// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './page/dashboard/Dashboard';
import Team from './page/team/Team';
import Contacts from './page/contacts/Contacts';
import Form from './page/form/Form';
import Geography from './page/geography/Geography';
import Invoices from './page/invoices/Invoices';
import Calendar from './page/calendar/Calendar';
import FAQ from './page/faq/FAQ';
import Bar from './page/barChart/BarChart';
import PieChart from './page/pieChart/PieChart';
import LineChart from './page/lineChart/LineChart';
import NotFound from './page/notFound/NotFound';
import SignIn from './page/sign-in/SignIn';
import SignUp from './page/sign-up/SignUp';
import Home from './page/home/Home';
import Platform from './page/platform/Platform';
import ProtectedRoute from './components/ProtectedRoute';
import { Helmet, HelmetProvider } from 'react-helmet-async';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="sign_in" element={<SignIn />} />
      <Route path="sign_up" element={<SignUp />} />
      <Route path="home" element={<Home />} />
      <Route path="/platform" element={<Platform />} />



      {/* <Route element={<ProtectedRoute />}> */}
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="team" element={<Team />} />
    <Route path="contacts" element={<Contacts />} />
    <Route path="bar" element={<Bar />} />
    <Route path="calendar" element={<Calendar />} />
    <Route path="faq" element={<FAQ />} />
    <Route path="form" element={<Form />} />
    <Route path="geography" element={<Geography />} />
    <Route path="invoices" element={<Invoices />} />
    <Route path="line" element={<LineChart />} />
    <Route path="pie" element={<PieChart />} />
{/* </Route> */}

    </Route>
  )
);

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <AuthProvider>
    <HelmetProvider>
      <RouterProvider router={router} />
      </HelmetProvider>
    </AuthProvider>
  </StrictMode>
);

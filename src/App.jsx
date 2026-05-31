import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollProgress from './components/ScrollProgress';
import { AuthProvider, useAuth } from './context/AuthContext';

const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Resume = lazy(() => import('./components/Resume'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const BackToTop = lazy(() => import('./components/BackToTop'));
const AIChat = lazy(() => import('./components/AIChat'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

const SectionFallback = () => (
  <div className="h-64 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
  </div>
);

/* Protected Route */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/admin" replace />;
};

/* Portfolio page */
const Portfolio = () => (
  <ReactLenis root>
    <div className="relative min-h-screen font-sans selection:bg-accent/30 selection:text-primary">
      <div className="grain-overlay" aria-hidden="true" />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}><About /></Suspense>
        <Suspense fallback={<SectionFallback />}><Skills /></Suspense>
        <Suspense fallback={<SectionFallback />}><Resume /></Suspense>
        <Suspense fallback={<SectionFallback />}><Projects /></Suspense>
        <Suspense fallback={<SectionFallback />}><Contact /></Suspense>
      </main>
      <Suspense fallback={null}><Footer /></Suspense>
      <Suspense fallback={null}><BackToTop /></Suspense>
      <Suspense fallback={null}><AIChat /></Suspense>
    </div>
  </ReactLenis>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin" element={
            <Suspense fallback={<SectionFallback />}><AdminLogin /></Suspense>
          } />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <Suspense fallback={<SectionFallback />}><AdminDashboard /></Suspense>
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

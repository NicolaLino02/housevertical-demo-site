import React, { useState } from 'react';
import { AppStep, ReportData } from './types';
import HeroSection from './components/HeroSection';
import ReportView from './components/ReportView';
import { MOCK_REPORT } from './data/mockReportData';
import { motion, AnimatePresence } from 'framer-motion';
import { TypewriterText } from './components/TypewriterText';
import AboutPage from './components/AboutPage';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.LANDING);

  // PLACEHOLDER: Sostituisci questo link con il tuo link reale di HubSpot
  const HUBSPOT_FORM_URL = "https://share.hsforms.com/YOUR_FORM_ID_HERE";

  // Use mock data directly
  const [reportData] = useState<ReportData>(MOCK_REPORT);

  const handleStartDemo = () => {
    // Simulate a very short loading to make it feel like "processing" (UX trick)
    setStep(AppStep.LOADING);
    setTimeout(() => {
      setStep(AppStep.REPORT);
    }, 1500);
  };

  const handleOpenSurvey = () => {
    window.open(HUBSPOT_FORM_URL, '_blank');
  };

  return (
    <main className="w-full min-h-screen bg-[#0f172a] text-white font-sans selection:bg-blue-500/30">
      <AnimatePresence mode="wait">

        {step === AppStep.LANDING && (
          <motion.div key="landing" exit={{ opacity: 0 }} className="absolute inset-0">
            <HeroSection
              onStart={handleStartDemo}
              onOpenAbout={() => setStep(AppStep.ABOUT)}
            />
          </motion.div>
        )}

        {step === AppStep.ABOUT && (
          <motion.div key="about" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <AboutPage onBack={() => setStep(AppStep.LANDING)} />
          </motion.div>
        )}

        {step === AppStep.LOADING && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen bg-[#0f172a] relative overflow-hidden"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-blue-600/5 blur-[100px] animate-pulse" />

            <div className="w-full max-w-md px-6 relative z-10 text-center">
              {/* Logo Loader */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 mx-auto mb-10 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)]"
              >
                <div className="w-8 h-8 bg-[#0f172a] rounded-lg" />
              </motion.div>

              {/* Simulated Steps Text */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 h-10"
              >
                <TypewriterText text="Analisi Parametri di Zona..." />
              </motion.div>

              {/* Progress Bar */}
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                />
              </div>

              <div className="mt-4 flex justify-between text-xs text-gray-500 font-mono">
                <span>DATA PROCESSING</span>
                <span>SECURE CONNECTION</span>
              </div>
            </div>
          </motion.div>
        )}

        {step === AppStep.REPORT && reportData && (
          <motion.div key="report" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <ReportView
              data={reportData}
              onOpenSurvey={handleOpenSurvey}
              onBack={() => setStep(AppStep.LANDING)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="fixed bottom-0 w-full py-2 z-50 pointer-events-none flex justify-center">
        <a
          href="/privacy.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-gray-500 hover:text-gray-300 transition-colors pointer-events-auto backdrop-blur-md bg-black/20 px-3 py-1 rounded-full border border-white/5"
        >
          Privacy Policy
        </a>
      </footer>
    </main>
  );
};

export default App;
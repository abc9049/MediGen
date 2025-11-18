'use client';

import { useState, useCallback } from 'react';
import { AppView, MeditationInput, MeditationScript } from '@/lib/types';
import { buildMeditationScript } from '@/lib/buildScript';
import QuestionnaireForm from './QuestionnaireForm';
import SessionPlayer from './SessionPlayer';
import LoadingScreen from './LoadingScreen';
import CompletionScreen from './CompletionScreen';

export default function MediGenApp() {
  const [currentView, setCurrentView] = useState<AppView>('questionnaire');
  const [meditationScript, setMeditationScript] = useState<MeditationScript | null>(null);
  const [userInput, setUserInput] = useState<MeditationInput | null>(null);

  const handleStartMeditation = useCallback((input: MeditationInput) => {
    setUserInput(input);
    setCurrentView('generating');
    
    // Simulate script generation with a brief delay for UX
    setTimeout(() => {
      const script = buildMeditationScript(input);
      setMeditationScript(script);
      setCurrentView('session');
    }, 2000);
  }, []);

  const handleSessionComplete = useCallback(() => {
    setCurrentView('completed');
  }, []);

  const handleStartOver = useCallback(() => {
    setCurrentView('questionnaire');
    setMeditationScript(null);
    setUserInput(null);
  }, []);

  const handleReplay = useCallback(() => {
    if (meditationScript) {
      setCurrentView('session');
    }
  }, [meditationScript]);

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating orbs for ambient effect */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-indigo-500/15 rounded-full blur-lg animate-pulse" />
        <div className="absolute top-1/2 right-1/3 w-40 h-40 bg-violet-500/10 rounded-full blur-2xl animate-pulse" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {/* Header */}
        {currentView !== 'session' && (
          <header className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-light text-slate-100 mb-4">
              Medi<span className="text-purple-400">Gen</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-md mx-auto">
              Personalized guided meditations tailored to your inner world
            </p>
          </header>
        )}

        {/* Dynamic Content Based on Current View */}
        {currentView === 'questionnaire' && (
          <QuestionnaireForm onSubmit={handleStartMeditation} />
        )}

        {currentView === 'generating' && (
          <LoadingScreen />
        )}

        {currentView === 'session' && meditationScript && (
          <SessionPlayer 
            script={meditationScript}
            onComplete={handleSessionComplete}
            onBackToQuestionnaire={handleStartOver}
          />
        )}

        {currentView === 'completed' && (
          <CompletionScreen 
            onStartOver={handleStartOver}
            onReplay={handleReplay}
          />
        )}
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MeditationInput } from '@/lib/types';

interface QuestionnaireFormProps {
  onSubmit: (input: MeditationInput) => void;
}

export default function QuestionnaireForm({ onSubmit }: QuestionnaireFormProps) {
  const [formData, setFormData] = useState<MeditationInput>({
    goal: '',
    currentMood: '',
    desiredOutcome: '',
    visualizationTheme: '',
    duration: 10,
    voicePreference: '',
  });

  const [currentStep, setCurrentStep] = useState(0);
  
  const questions = [
    {
      id: 'goal',
      title: 'What brings you here today?',
      subtitle: 'Share your intention or goal for this meditation',
      placeholder: 'e.g., "I want to feel more confident" or "I need to reduce stress"',
      options: [
        'Reduce stress and anxiety',
        'Boost confidence and self-esteem',
        'Improve focus and clarity',
        'Cultivate inner peace',
        'Heal emotional wounds',
        'Manifest my dreams',
      ]
    },
    {
      id: 'currentMood',
      title: 'How are you feeling right now?',
      subtitle: 'Describe your current emotional state',
      placeholder: 'e.g., "anxious and overwhelmed" or "tired but hopeful"',
      options: [
        'Anxious and restless',
        'Sad or melancholy',
        'Frustrated or angry',
        'Tired and drained',
        'Neutral but seeking peace',
        'Excited but need grounding',
      ]
    },
    {
      id: 'desiredOutcome',
      title: 'How do you want to feel afterward?',
      subtitle: 'Envision your desired emotional state',
      placeholder: 'e.g., "calm and centered" or "energized and inspired"',
      options: [
        'Calm and centered',
        'Confident and empowered',
        'Peaceful and serene',
        'Energized and motivated',
        'Grateful and content',
        'Clear and focused',
      ]
    },
    {
      id: 'visualizationTheme',
      title: 'What setting calls to you?',
      subtitle: 'Choose a visualization environment that resonates',
      placeholder: 'e.g., "peaceful forest" or "cosmic starfield"',
      options: [
        'Serene ocean waves',
        'Peaceful forest glade',
        'Mountain summit at sunrise',
        'Cosmic starfield',
        'Healing light sanctuary',
        'Inner temple of wisdom',
      ]
    },
    {
      id: 'preferences',
      title: 'Meditation Preferences',
      subtitle: 'Customize your meditation experience',
      placeholder: '',
      isPreferencesStep: true,
      options: []
    },
  ];

  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;
  
  // Special validation for preferences step
  const canProceed = currentQuestion.isPreferencesStep 
    ? formData.duration && formData.voicePreference
    : (formData[currentQuestion.id as keyof MeditationInput] as string)?.trim().length > 0;

  const handleInputChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (isLastStep) {
      onSubmit(formData);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleOptionSelect = (option: string) => {
    handleInputChange(option);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-text-secondary">
            Step {currentStep + 1} of {questions.length}
          </span>
          <span className="text-sm text-text-secondary">
            {Math.round(((currentStep + 1) / questions.length) * 100)}% complete
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2 backdrop-blur-sm">
          <motion.div
            className="h-2 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Question Card */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8 shadow-2xl shadow-purple-500/20"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-medium text-text-primary mb-3">
            {currentQuestion.title}
          </h2>
          <p className="text-text-secondary">
            {currentQuestion.subtitle}
          </p>
        </div>

        {/* Content - Regular Options or Preferences */}
        {currentQuestion.isPreferencesStep ? (
          <div className="space-y-8">
            {/* Duration Selection */}
            <div>
              <label className="block text-lg text-text-primary mb-4 font-medium">
                How long would you like to meditate?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[2, 5, 10].map((duration) => (
                  <motion.button
                    key={duration}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => setFormData(prev => ({ ...prev, duration }))}
                    className={`p-4 rounded-xl border text-center transition-all duration-300 ${
                      formData.duration === duration
                        ? 'bg-gradient-to-r from-violet-500 to-indigo-500 border-violet-400 text-white'
                        : 'bg-glass-bg border-glass-border text-text-secondary hover:border-primary-indigo/50'
                    }`}
                  >
                    <div className="text-xl font-medium">{duration}</div>
                    <div className="text-sm">minute{duration > 1 ? 's' : ''}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Voice Preference */}
            <div>
              <label className="block text-lg text-text-primary mb-4 font-medium">
                Voice preference
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['Calm female voice', 'Gentle male voice', 'System default', 'Let me choose during session'].map((voice, index) => (
                  <motion.button
                    key={voice}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    onClick={() => setFormData(prev => ({ ...prev, voicePreference: voice }))}
                    className={`p-3 text-left rounded-xl transition-all duration-300 ${
                      formData.voicePreference === voice
                        ? 'bg-gradient-to-r from-violet-500 to-indigo-500 border-violet-400 text-white border'
                        : 'bg-glass-bg border border-glass-border text-text-secondary hover:border-primary-indigo/50'
                    }`}
                  >
                    {voice}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Quick Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={option}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleOptionSelect(option)}
                  className="p-3 text-left rounded-xl bg-glass-bg border border-glass-border 
                             hover:bg-gradient-button hover:border-primary-indigo/50
                             transition-all duration-300 text-text-secondary hover:text-white
                             text-sm"
                >
                  {option}
                </motion.button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="mb-6">
              <label className="block text-sm text-text-secondary mb-2">
                Or write your own:
              </label>
              <textarea
                value={formData[currentQuestion.id as keyof MeditationInput]}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={currentQuestion.placeholder}
                className="w-full p-4 rounded-xl bg-glass-bg border border-glass-border
                           text-text-primary placeholder-text-muted
                           focus:border-primary-indigo/50 focus:outline-none
                           resize-none transition-colors duration-300"
                rows={3}
              />
            </div>
          </>
        )}
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className="px-6 py-3 rounded-xl bg-glass-bg border border-glass-border
                     text-text-secondary hover:text-text-primary
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors duration-300"
        >
          Back
        </button>

        <button
          onClick={handleNext}
          disabled={!canProceed}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 border border-violet-400
                     text-white hover:from-violet-400 hover:to-indigo-400 hover:border-violet-300
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors duration-300"
        >
          {isLastStep ? 'Create My Meditation' : 'Next'}
        </button>
      </div>
    </div>
  );
}
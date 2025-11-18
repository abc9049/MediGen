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
  ];

  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;
  const canProceed = (formData[currentQuestion.id as keyof MeditationInput] as string)?.trim().length > 0;

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
          className="px-8 py-3 rounded-xl glass-button text-white font-medium
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-300"
        >
          {isLastStep ? 'Create My Meditation' : 'Next'}
        </button>
      </div>
    </div>
  );
}
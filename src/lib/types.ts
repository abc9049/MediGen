// MediGen TypeScript Definitions

export interface MeditationInput {
  goal: string;
  currentMood: string;
  desiredOutcome: string;
  visualizationTheme: string;
  duration?: number; // minutes, default 10
}

export interface MeditationScript {
  title: string;
  introduction: string;
  mainVisualization: string;
  affirmations: string[];
  conclusion: string;
  totalWords: number;
  estimatedDuration: number; // minutes
}

export interface AudioSettings {
  backgroundVolume: number; // 0-1
  voiceVolume: number; // 0-1
  voiceRate: number; // 0.5-2
  voicePitch: number; // 0-2
  selectedVoice?: string;
}

export interface SessionState {
  isPlaying: boolean;
  isPaused: boolean;
  isLoading: boolean;
  currentTime: number;
  totalDuration: number;
  showBreathingAnimation: boolean;
}

export type AppView = 'questionnaire' | 'generating' | 'session' | 'completed';
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MeditationScript, AudioSettings, SessionState } from '@/lib/types';
import { formatForSpeech } from '@/lib/buildScript';
import BreathingAnimation from './BreathingAnimation';
import AudioControls from './AudioControls';
import { ArrowLeft, Pause, Play, VolumeX, Volume2 } from 'lucide-react';

interface SessionPlayerProps {
  script: MeditationScript;
  onComplete: () => void;
  onBackToQuestionnaire: () => void;
}

export default function SessionPlayer({ script, onComplete, onBackToQuestionnaire }: SessionPlayerProps) {
  const [sessionState, setSessionState] = useState<SessionState>({
    isPlaying: false,
    isPaused: false,
    isLoading: true,
    currentTime: 0,
    totalDuration: 0,
    showBreathingAnimation: true,
  });

  const [audioSettings, setAudioSettings] = useState<AudioSettings>({
    backgroundVolume: 0.3,
    voiceVolume: 0.7,
    voiceRate: 0.8,
    voicePitch: 0.8,
  });

  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [showControls, setShowControls] = useState(false);
  
  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);

  // Initialize voices
  useEffect(() => {
    const loadVoices = () => {
      // Check TTS support
      if (!('speechSynthesis' in window)) {
        console.error('Text-to-Speech not supported');
        return;
      }

      const voices = speechSynthesis.getVoices();
      console.log('Loading voices:', voices.length, 'available');
      setAvailableVoices(voices);
      
      if (voices.length === 0) {
        console.log('No voices loaded yet, will retry...');
        return;
      }
      
      // Auto-select a calm, female voice if available
      const preferredVoices = [
        'Google UK English Female',
        'Microsoft Zira Desktop', 
        'Samantha',
        'Karen',
        'Moira',
        'Fiona',
        'Victoria'
      ];
      
      let selectedVoice = null;
      
      // Try preferred voices first
      for (const prefName of preferredVoices) {
        const voice = voices.find(v => v.name.includes(prefName));
        if (voice) {
          selectedVoice = voice;
          break;
        }
      }
      
      // Fallback to any English female voice
      if (!selectedVoice) {
        selectedVoice = voices.find(v => 
          v.lang.includes('en') && 
          (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('woman'))
        );
      }
      
      // Final fallback to any English voice
      if (!selectedVoice) {
        selectedVoice = voices.find(v => v.lang.includes('en'));
      }
      
      // Ultimate fallback to first available
      if (!selectedVoice && voices.length > 0) {
        selectedVoice = voices[0];
      }
      
      if (selectedVoice) {
        console.log('Auto-selected voice:', selectedVoice.name);
        setAudioSettings(prev => ({ ...prev, selectedVoice: selectedVoice.name }));
      }
    };

    // Initial load
    loadVoices();
    
    // Listen for voice changes (important on some browsers)
    speechSynthesis.onvoiceschanged = () => {
      console.log('Voices changed event fired');
      loadVoices();
    };
    
    // Also try loading after a short delay (browser compatibility)
    const timeout = setTimeout(loadVoices, 500);
    
    return () => {
      speechSynthesis.onvoiceschanged = null;
      clearTimeout(timeout);
    };
  }, []);

  // Initialize audio
  useEffect(() => {
    const initializeAudio = async () => {
      try {
        // Load background audio
        const audio = new Audio('/audio/pure-theta-4-7hz-with-417hz-639hz-music-351389.mp3');
        audio.loop = true;
        audio.volume = 0;
        backgroundAudioRef.current = audio;

        // Prepare speech
        const speechText = formatForSpeech(script);
        console.log('Preparing speech synthesis:', {
          textLength: speechText.length,
          firstWords: speechText.substring(0, 50) + '...'
        });
        
        const utterance = new SpeechSynthesisUtterance(speechText);
        utterance.rate = audioSettings.voiceRate;
        utterance.pitch = audioSettings.voicePitch;
        utterance.volume = audioSettings.voiceVolume;

        // Find and set preferred voice
        const voices = speechSynthesis.getVoices();
        console.log('Available voices:', voices.map(v => v.name));
        
        if (audioSettings.selectedVoice && voices.length > 0) {
          const voice = voices.find(v => v.name === audioSettings.selectedVoice);
          if (voice) {
            utterance.voice = voice;
            console.log('Selected voice:', voice.name);
          }
        } else if (voices.length > 0) {
          // Fallback to first available voice
          const femaleVoices = voices.filter(v => 
            v.name.toLowerCase().includes('female') ||
            v.name.toLowerCase().includes('samantha') ||
            v.name.toLowerCase().includes('karen') ||
            v.name.toLowerCase().includes('zira')
          );
          const selectedVoice = femaleVoices.length > 0 ? femaleVoices[0] : voices[0];
          utterance.voice = selectedVoice;
          console.log('Using fallback voice:', selectedVoice.name);
        }

        // Set up speech events
        utterance.onstart = () => {
          startTimeRef.current = Date.now();
          setSessionState(prev => ({ 
            ...prev, 
            isPlaying: true, 
            isLoading: false,
            totalDuration: script.estimatedDuration * 60 // Convert to seconds
          }));
        };

        utterance.onend = () => {
          handleSessionEnd();
        };

        utterance.onerror = (event) => {
          console.error('Speech synthesis error:', event);
          setSessionState(prev => ({ ...prev, isLoading: false }));
        };

        speechUtteranceRef.current = utterance;

        setSessionState(prev => ({ ...prev, isLoading: false }));
      } catch (error) {
        console.error('Audio initialization error:', error);
        setSessionState(prev => ({ ...prev, isLoading: false }));
      }
    };

    if (availableVoices.length > 0) {
      initializeAudio();
    }

    return () => {
      if (backgroundAudioRef.current) {
        backgroundAudioRef.current.pause();
      }
      if (speechUtteranceRef.current) {
        speechSynthesis.cancel();
      }
    };
  }, [script, audioSettings, availableVoices]);

  // Update timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (sessionState.isPlaying && !sessionState.isPaused) {
      interval = setInterval(() => {
        const elapsed = (Date.now() - startTimeRef.current + pausedTimeRef.current) / 1000;
        setSessionState(prev => ({ ...prev, currentTime: elapsed }));
        
        // Hide breathing animation after 3 minutes
        if (elapsed > 180 && sessionState.showBreathingAnimation) {
          setSessionState(prev => ({ ...prev, showBreathingAnimation: false }));
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [sessionState.isPlaying, sessionState.isPaused, sessionState.showBreathingAnimation]);

  const handleSessionEnd = useCallback(() => {
    if (backgroundAudioRef.current) {
      // Fade out background audio
      const audio = backgroundAudioRef.current;
      let volume = audio.volume;
      const fadeOut = setInterval(() => {
        volume -= 0.05;
        if (volume <= 0) {
          audio.pause();
          clearInterval(fadeOut);
        } else {
          audio.volume = volume;
        }
      }, 100);
    }
    
    setTimeout(() => {
      onComplete();
    }, 2000); // Brief delay before transitioning
  }, [onComplete]);

  const handlePlayPause = async () => {
    if (!speechUtteranceRef.current || !backgroundAudioRef.current) {
      console.error('Audio not initialized:', {
        speechUtterance: !!speechUtteranceRef.current,
        backgroundAudio: !!backgroundAudioRef.current
      });
      return;
    }

    try {
      if (!sessionState.isPlaying) {
        // Start session
        console.log('Starting meditation session...');
        
        // Start background audio first
        try {
          await backgroundAudioRef.current.play();
          console.log('Background audio started');
        } catch (audioError) {
          console.warn('Background audio failed to start:', audioError);
        }
        
        // Fade in background audio
        let volume = 0;
        const fadeIn = setInterval(() => {
          if (volume < audioSettings.backgroundVolume) {
            volume += 0.02;
            backgroundAudioRef.current!.volume = Math.min(volume, audioSettings.backgroundVolume);
          } else {
            clearInterval(fadeIn);
          }
        }, 100);

        // Start speech synthesis
        console.log('Starting speech synthesis...', {
          text: speechUtteranceRef.current.text.substring(0, 100) + '...',
          voice: speechUtteranceRef.current.voice?.name || 'default',
          rate: speechUtteranceRef.current.rate,
          volume: speechUtteranceRef.current.volume
        });
        
        speechSynthesis.speak(speechUtteranceRef.current);
        
      } else if (sessionState.isPaused) {
        // Resume
        speechSynthesis.resume();
        if (backgroundAudioRef.current.paused) {
          await backgroundAudioRef.current.play();
        }
        
        const pauseDuration = Date.now() - (startTimeRef.current + pausedTimeRef.current * 1000);
        startTimeRef.current += pauseDuration;
        
        setSessionState(prev => ({ ...prev, isPaused: false }));
      } else {
        // Pause
        speechSynthesis.pause();
        backgroundAudioRef.current.pause();
        pausedTimeRef.current = sessionState.currentTime;
        setSessionState(prev => ({ ...prev, isPaused: true }));
      }
    } catch (error) {
      console.error('Playback error:', error);
    }
  };

  const handleVolumeChange = (type: 'voice' | 'background', value: number) => {
    setAudioSettings(prev => {
      const newSettings = { ...prev, [`${type}Volume`]: value };
      
      if (type === 'background' && backgroundAudioRef.current) {
        backgroundAudioRef.current.volume = value;
      }
      
      return newSettings;
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Test TTS function for debugging
  const testTTS = () => {
    console.log('Testing TTS...');
    
    // Check if TTS is supported
    if (!('speechSynthesis' in window)) {
      alert('Text-to-Speech is not supported in this browser. Please try Chrome, Safari, or Edge.');
      return;
    }

    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    // Wait a bit for cleanup
    setTimeout(() => {
      const testUtterance = new SpeechSynthesisUtterance('Hello! This is a test of the meditation voice system.');
      testUtterance.rate = 0.8;
      testUtterance.pitch = 1;
      testUtterance.volume = 1;
      
      // Get available voices
      const voices = speechSynthesis.getVoices();
      console.log('Available voices for test:', voices.map(v => ({ name: v.name, lang: v.lang })));
      
      if (voices.length > 0) {
        // Try to use a good voice
        const goodVoice = voices.find(v => 
          v.lang.includes('en') && (
            v.name.toLowerCase().includes('female') ||
            v.name.toLowerCase().includes('samantha') ||
            v.name.toLowerCase().includes('karen') ||
            v.name.toLowerCase().includes('zira')
          )
        ) || voices.find(v => v.lang.includes('en')) || voices[0];
        
        testUtterance.voice = goodVoice;
        console.log('Using voice for test:', goodVoice.name);
      }
      
      testUtterance.onstart = () => {
        console.log('Test TTS started successfully');
        alert('Voice test started! You should hear: "Hello! This is a test..."');
      };
      
      testUtterance.onend = () => {
        console.log('Test TTS completed');
        alert('Voice test completed. Did you hear the voice?');
      };
      
      testUtterance.onerror = (e) => {
        console.error('Test TTS error:', e);
        alert(`Voice test failed: ${e.error}. Check console for details.`);
      };
      
      console.log('Speaking test utterance...');
      speechSynthesis.speak(testUtterance);
    }, 100);
  };

  if (sessionState.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-slate-300">Preparing your meditation...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col relative">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none" />

      {/* Header with Back Button */}
      <header className="relative z-10 p-6 flex items-center justify-between">
        <button
          onClick={onBackToQuestionnaire}
          className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>New Meditation</span>
        </button>
        
        <h1 className="text-2xl md:text-3xl font-bold text-white text-center absolute left-1/2 transform -translate-x-1/2">
          {script.title}
        </h1>
        
        <button
          onClick={() => setShowControls(!showControls)}
          className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/20 
                     text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          {showControls ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </header>

      {/* Session Instruction Text - Below Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 px-6"
      >
        <p className="text-lg text-slate-300 max-w-md mx-auto leading-relaxed">
          {sessionState.showBreathingAnimation ? 
            "Breathe deeply and let your body relax" : 
            "Continue to rest in this peaceful state"
          }
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-start pt-4 pb-24 px-6">
        {/* Breathing Animation */}
        <AnimatePresence>
          {sessionState.showBreathingAnimation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mb-16"
              style={{ marginTop: '20px' }}
            >
              <BreathingAnimation isActive={sessionState.isPlaying && !sessionState.isPaused} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Timer Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-slate-400 text-sm">
            {formatTime(sessionState.currentTime)} / {formatTime(sessionState.totalDuration)}
          </div>
        </motion.div>

        {/* Play/Pause Button */}
        <div className="flex flex-col items-center space-y-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayPause}
            className="w-20 h-20 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 
                       backdrop-blur-xl border border-white/30 shadow-lg shadow-purple-500/40
                       flex items-center justify-center hover:shadow-purple-500/60 
                       hover:-translate-y-1 transition-all duration-300"
          >
            {sessionState.isPlaying && !sessionState.isPaused ? (
              <Pause size={32} className="text-white" />
            ) : (
              <Play size={32} className="text-white ml-1" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Audio Controls Panel */}
      <AnimatePresence>
        {showControls && (
          <AudioControls
            audioSettings={audioSettings}
            onVolumeChange={handleVolumeChange}
            availableVoices={availableVoices}
            onVoiceChange={(voiceName: string) => 
              setAudioSettings(prev => ({ ...prev, selectedVoice: voiceName }))
            }
            onClose={() => setShowControls(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
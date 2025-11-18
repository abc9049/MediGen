'use client';

import { motion } from 'framer-motion';
import { AudioSettings } from '@/lib/types';
import { X, Volume2, Mic } from 'lucide-react';

interface AudioControlsProps {
  audioSettings: AudioSettings;
  onVolumeChange: (type: 'voice' | 'background', value: number) => void;
  availableVoices: SpeechSynthesisVoice[];
  onVoiceChange: (voiceName: string) => void;
  onClose: () => void;
}

export default function AudioControls({ 
  audioSettings, 
  onVolumeChange, 
  availableVoices, 
  onVoiceChange, 
  onClose 
}: AudioControlsProps) {
  const femaleVoices = availableVoices.filter(voice => 
    voice.name.toLowerCase().includes('female') ||
    voice.name.toLowerCase().includes('woman') ||
    ['samantha', 'karen', 'moira', 'zira'].some(name => 
      voice.name.toLowerCase().includes(name)
    )
  );

  const displayVoices = femaleVoices.length > 0 ? femaleVoices : availableVoices.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className="fixed bottom-0 left-0 right-0 z-50 p-4"
    >
      <div className="glass rounded-t-3xl p-6 mx-auto max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-text-primary">Audio Settings</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-glass-bg transition-colors"
          >
            <X size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Volume Controls */}
        <div className="space-y-6">
          {/* Voice Volume */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Mic size={16} className="text-text-secondary" />
              <span className="text-sm text-text-secondary">Voice Volume</span>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={audioSettings.voiceVolume}
                onChange={(e) => onVolumeChange('voice', parseFloat(e.target.value))}
                className="flex-1 h-2 bg-glass-bg rounded-lg appearance-none cursor-pointer
                          [&::-webkit-slider-thumb]:appearance-none
                          [&::-webkit-slider-thumb]:w-4
                          [&::-webkit-slider-thumb]:h-4
                          [&::-webkit-slider-thumb]:rounded-full
                          [&::-webkit-slider-thumb]:bg-primary-indigo
                          [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <span className="text-xs text-text-muted w-8">
                {Math.round(audioSettings.voiceVolume * 100)}%
              </span>
            </div>
          </div>

          {/* Background Volume */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Volume2 size={16} className="text-text-secondary" />
              <span className="text-sm text-text-secondary">Background Volume</span>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0"
                max="0.5"
                step="0.05"
                value={audioSettings.backgroundVolume}
                onChange={(e) => onVolumeChange('background', parseFloat(e.target.value))}
                className="flex-1 h-2 bg-glass-bg rounded-lg appearance-none cursor-pointer
                          [&::-webkit-slider-thumb]:appearance-none
                          [&::-webkit-slider-thumb]:w-4
                          [&::-webkit-slider-thumb]:h-4
                          [&::-webkit-slider-thumb]:rounded-full
                          [&::-webkit-slider-thumb]:bg-primary-lavender
                          [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <span className="text-xs text-text-muted w-8">
                {Math.round(audioSettings.backgroundVolume * 200)}%
              </span>
            </div>
          </div>

          {/* Voice Selection */}
          {displayVoices.length > 0 && (
            <div className="space-y-2">
              <span className="text-sm text-text-secondary">Voice Selection</span>
              <select
                value={audioSettings.selectedVoice || ''}
                onChange={(e) => onVoiceChange(e.target.value)}
                className="w-full p-2 rounded-lg bg-glass-bg border border-glass-border
                           text-text-primary focus:border-primary-indigo/50 focus:outline-none
                           text-sm"
              >
                <option value="">System Default</option>
                {displayVoices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Preset Buttons */}
        <div className="mt-6 pt-4 border-t border-glass-border">
          <div className="flex space-x-2">
            <button
              onClick={() => {
                onVolumeChange('voice', 0.9);
                onVolumeChange('background', 0.2);
              }}
              className="flex-1 py-2 px-3 rounded-lg bg-glass-bg border border-glass-border
                         text-text-secondary hover:text-text-primary hover:border-primary-indigo/50
                         transition-colors text-xs"
            >
              Voice Focus
            </button>
            <button
              onClick={() => {
                onVolumeChange('voice', 0.6);
                onVolumeChange('background', 0.4);
              }}
              className="flex-1 py-2 px-3 rounded-lg bg-glass-bg border border-glass-border
                         text-text-secondary hover:text-text-primary hover:border-primary-indigo/50
                         transition-colors text-xs"
            >
              Balanced
            </button>
            <button
              onClick={() => {
                onVolumeChange('voice', 0.4);
                onVolumeChange('background', 0.4);
              }}
              className="flex-1 py-2 px-3 rounded-lg bg-glass-bg border border-glass-border
                         text-text-secondary hover:text-text-primary hover:border-primary-indigo/50
                         transition-colors text-xs"
            >
              Ambient
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
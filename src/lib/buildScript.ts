import { MeditationInput, MeditationScript } from './types';

/**
 * Template-based meditation script generator
 * Creates personalized 10-minute guided meditation scripts
 */
export function buildMeditationScript(input: MeditationInput): MeditationScript {
  const { goal, currentMood, desiredOutcome, visualizationTheme } = input;
  
  // Script templates with placeholders
  const templates = {
    introduction: [
      `Welcome to your personal meditation journey. As you settle into this moment, allow yourself to find comfort and ease. Today, we're focusing on ${goal.toLowerCase()}, transforming ${currentMood.toLowerCase()} into ${desiredOutcome.toLowerCase()}.`,
      `Take a deep breath with me now. In this sacred space, you have the power to reshape your inner landscape. We'll be exploring ${visualizationTheme.toLowerCase()}, helping you move from ${currentMood.toLowerCase()} toward ${desiredOutcome.toLowerCase()}.`,
      `Close your eyes gently, and let your body relax completely. This meditation is designed specifically for ${goal.toLowerCase()}, guiding you from ${currentMood.toLowerCase()} into a state of ${desiredOutcome.toLowerCase()}.`
    ],
    
    mainVisualization: {
      nature: `Imagine yourself in a peaceful ${visualizationTheme.toLowerCase()} setting. Feel the gentle breeze carrying away your ${currentMood.toLowerCase()}, replacing it with ${desiredOutcome.toLowerCase()}. With each breath, you move closer to ${goal.toLowerCase()}.`,
      healing: `Visualize warm, healing light surrounding your entire being. This light understands your journey from ${currentMood.toLowerCase()} to ${desiredOutcome.toLowerCase()}. Let it guide you toward ${goal.toLowerCase()}.`,
      cosmic: `Picture yourself floating in infinite space, surrounded by stars that pulse with ${desiredOutcome.toLowerCase()}. The vastness helps put your ${currentMood.toLowerCase()} into perspective as you focus on ${goal.toLowerCase()}.`,
      inner: `Journey into your inner sanctuary, a place where ${goal.toLowerCase()} feels natural and effortless. Here, ${currentMood.toLowerCase()} transforms into ${desiredOutcome.toLowerCase()} with each mindful breath.`
    },
    
    affirmations: [
      `I am capable of achieving ${goal.toLowerCase()}`,
      `${desiredOutcome} flows through me naturally`,
      `I release ${currentMood.toLowerCase()} and embrace positive change`,
      `Every breath brings me closer to ${desiredOutcome.toLowerCase()}`,
      `I trust in my ability to transform and grow`
    ],
    
    conclusion: [
      `As we complete this journey together, carry this sense of ${desiredOutcome.toLowerCase()} with you. Remember that ${goal.toLowerCase()} is within your reach, and you have the power to transform any ${currentMood.toLowerCase()} into something beautiful.`,
      `Take a moment to appreciate how you've shifted from ${currentMood.toLowerCase()} toward ${desiredOutcome.toLowerCase()}. This feeling is available to you whenever you need it. You are capable of ${goal.toLowerCase()}.`,
      `Slowly bring your awareness back to the present moment, carrying with you this new sense of ${desiredOutcome.toLowerCase()}. You have everything within you to achieve ${goal.toLowerCase()}.`
    ]
  };

  // Select random templates
  const introduction = templates.introduction[Math.floor(Math.random() * templates.introduction.length)];
  const conclusion = templates.conclusion[Math.floor(Math.random() * templates.conclusion.length)];
  
  // Determine visualization type based on theme
  let visualizationType: keyof typeof templates.mainVisualization = 'inner';
  const theme = visualizationTheme.toLowerCase();
  if (theme.includes('nature') || theme.includes('forest') || theme.includes('ocean')) {
    visualizationType = 'nature';
  } else if (theme.includes('healing') || theme.includes('light') || theme.includes('energy')) {
    visualizationType = 'healing';
  } else if (theme.includes('space') || theme.includes('universe') || theme.includes('cosmic')) {
    visualizationType = 'cosmic';
  }
  
  const mainVisualization = templates.mainVisualization[visualizationType];
  
  // Create expanded visualization with breathing guidance
  const fullVisualization = `
    ${mainVisualization}
    
    Now, let's synchronize your breathing with your intention. Breathe in deeply for four counts... hold for four... and release for six counts. With each inhale, you draw in ${desiredOutcome.toLowerCase()}. With each exhale, you release ${currentMood.toLowerCase()}.
    
    Continue this rhythmic breathing as you deepen into your visualization. See yourself already achieving ${goal.toLowerCase()}. Feel what it's like to embody ${desiredOutcome.toLowerCase()}. Notice how your body feels different, how your mind feels clearer, how your heart feels lighter.
    
    For the next few minutes, simply rest in this state of being. You don't need to force anything. Just allow ${desiredOutcome.toLowerCase()} to permeate every cell of your being. Trust that your subconscious mind is absorbing this new blueprint for ${goal.toLowerCase()}.
    
    If your mind wanders, gently return to your breath and your vision. Each return is a victory, each moment of presence is rewiring your neural pathways toward ${desiredOutcome.toLowerCase()}.
  `;

  const script: MeditationScript = {
    title: `Meditation for ${goal}`,
    introduction: `${introduction}\n\nLet's begin by taking three deep, calming breaths together...`,
    mainVisualization: fullVisualization,
    affirmations: templates.affirmations,
    conclusion: `${conclusion}\n\nWhen you're ready, gently open your eyes and return to your day with renewed purpose.`,
    totalWords: countWords(introduction + fullVisualization + conclusion + templates.affirmations.join(' ')),
    estimatedDuration: 10 // Fixed at 10 minutes for MVP
  };

  return script;
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Convert meditation script to speech-ready text
 * Adds pauses and emphasis for better TTS delivery
 */
export function formatForSpeech(script: MeditationScript): string {
  const pauseShort = '... '; // Short pause
  const pauseLong = '...... '; // Long pause
  const pauseBreath = '............ '; // Breathing space
  
  const speechText = `
    ${script.introduction}
    ${pauseLong}
    
    ${script.mainVisualization}
    ${pauseBreath}
    
    Now, let's embrace these affirmations together${pauseShort}
    ${script.affirmations.join(`${pauseShort} `)}
    ${pauseLong}
    
    ${script.conclusion}
    ${pauseLong}
  `.replace(/\n\s+/g, ' ').trim();
  
  return speechText;
}
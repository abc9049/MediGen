# Product Requirements — MediGen

## Problem
Meditation apps are often rigid, repetitive, and costly.  
People seek personalized meditations that align with their goals, but most options require subscriptions or limited libraries.

## Solution
MediGen auto-generates a guided meditation from user input, combining a soft AI voice with 432 Hz ambient frequencies.  
It focuses on *personal* mental imagery and relaxation rather than generic content.

## Goals
1. Let users create a personalized 10-minute voice-guided meditation in under 2 minutes.
2. Keep everything free, private, and client-side.
3. Evoke deep calm and imagination (measured via user feedback).
4. Provide an instantly playable meditation with background sound.

## Success Criteria
- ✅ User completes the flow (questionnaire → play meditation) without errors.
- ✅ Audio playback runs smoothly with no lag.
- ✅ Session feels calming and personal.
- ✅ Users report a sense of relaxation or improved mood.

## Constraints
- No external APIs with costs (use browser TTS + free sounds).
- Audio files ≤ 10 MB.
- All code deployable on Vercel Free Tier.

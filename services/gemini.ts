import { GoogleGenAI } from "@google/genai";
import { PlayerProfile } from "../types";

export const getScoutInsight = async (players: PlayerProfile[]): Promise<string> => {
  if (!process.env.API_KEY) {
    console.error("Gemini API Key is missing in environment.");
    return "Configuration error: Missing API Key.";
  }

  try {
    // Create instance inside function to ensure fresh key access
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      Act as a world-class football scout advisor. 
      I am comparing the following Egyptian talents:
      ${players.map(p => `${p.name} (${p.position}): Pace ${p.stats.pace}, Shooting ${p.stats.shooting}, Passing ${p.stats.passing}, Dribbling ${p.stats.dribbling}`).join(' | ')}
      
      Provide a brief, tactical summary (max 100 words) of who has the highest potential for a European club and why.
    `;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    if (!response || !response.text) {
      throw new Error("Empty response from Gemini");
    }

    return response.text;
  } catch (error: any) {
    console.error("Gemini API Detailed Error:", error);
    
    // Check for specific error patterns
    if (error.message?.includes("Internal error")) {
      return "The AI scout encountered an internal server error. This usually happens during high load. Please try again in a moment.";
    }
    
    return "The AI scout is currently reviewing films and is unavailable. Please analyze the stats manually.";
  }
};
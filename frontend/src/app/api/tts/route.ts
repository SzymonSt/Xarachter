// pages/api/text-to-speech.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from "next/server";
import { ElevenLabsClient } from "elevenlabs";

interface RequestBody {
  text: string;
  character: "michael" | "dwight";
}

export async function POST(req: Request) {

    const voiceId = {
      "michael": "gM5Q4TjXJ8Eh1ajxg3qw",
      "dwight": "OvCntLX9CcwKDPjREcKi"
    }
    try {
      const { text, character }: RequestBody = await req.json();
      if (!text) {
        return NextResponse.json({ error: "Text is required" }, { status: 400 });
      }
  
      const client = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY || "" });
  
      const audioStream = await client.textToSpeech.convertAsStream(voiceId[character], {
        optimize_streaming_latency: "0",
        output_format: "mp3_22050_32",
        text: text,
        voice_settings: {
          stability: 0.1,
          similarity_boost: 0.3,
          style: 0.2,
        },
      });
  
      const headers = new Headers();
      headers.set("Content-Type", "audio/mpeg");
  
      return new NextResponse(audioStream as any, {
        headers,
      });
    } catch (error) {
      console.error("Error converting text to speech:", error);
      return NextResponse.json({ error: "Failed to convert text to speech" }, { status: 500 });
    }
  }

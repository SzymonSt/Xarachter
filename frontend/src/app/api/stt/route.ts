// app/api/stt/route.ts
import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const groq = new Groq();

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get("audio") as Blob;

    if (!audioFile) {
      return NextResponse.json({ error: "Audio file is required" }, { status: 400 });
    }

    // Convert the Blob to a buffer and save it as a temporary file
    const buffer = Buffer.from(await audioFile.arrayBuffer());
    const tempFilePath = path.join("/tmp", `${uuidv4()}.m4a`);
    fs.writeFileSync(tempFilePath, buffer);

    const transcription = await groq.audio.transcriptions.create({
      file: fs.createReadStream(tempFilePath), // Use the audio file's stream
      model: "whisper-large-v3-turbo",
      response_format: "json",
      language: "en",
      temperature: 0.0,
    });
    fs.unlinkSync(tempFilePath);

    return NextResponse.json({ text: transcription.text });
  } catch (error) {
    console.error("Error transcribing audio:", error);
    return NextResponse.json({ error: "Failed to transcribe audio" }, { status: 500 });
  }
}

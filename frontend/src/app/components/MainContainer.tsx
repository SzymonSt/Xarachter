// src/app/components/MainContainer.tsx
'use client'

import React, { FC, ReactNode, useState, useRef } from 'react';
import SidebarHeader from './SidebarHeader';
import MessageBox from './MessageBox';
import CharacterBox from './CharacterBox'; // Import CharacterBox component
import StartLesson from './StartLesson';
import styles from './MainContainer.module.css';

interface MainContainerProps {
  children?: ReactNode;
}

interface Message {
  id: number;
  content: string;
  sender: string;
  align: 'left' | 'right';
  color: string;
}

// Dummy initial messages
const initialMessages: Message[] = [
  {
    id: 1,
    content: "Hello! How can I assist you today?",
    sender: "Michael",
    align: "left",
    color: "#DFF4FF",
  },
  {
    id: 2,
    content: "I need help with my project.",
    sender: "User",
    align: "right",
    color: "#F6F6F6",
  },
  {
    id: 3,
    content: "Sure, I'd be happy to help! Could you give me more details?",
    sender: "Dwight",
    align: "left",
    color: "#DFFFED",
  },
];



const MainContainer: FC<MainContainerProps> = ({ children }) => {
  // State
  const [startLesson, setStartLesson] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [currentPlayingMessageId, setCurrentPlayingMessageId] = useState<number>(0);

  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [transcription, setTranscription] = useState<string | null>(null);


  const startRecording = async () => {
    console.log('Recording started');
    setIsRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    const chunks: Blob[] = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      chunks.push(event.data);
    };

    mediaRecorderRef.current.onstop = async () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      await sendAudioToApi(blob); // Send audio to backend when recording stops
    };

    mediaRecorderRef.current.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorderRef.current?.stop(); // Use optional chaining to ensure mediaRecorderRef is not null
  };

  const sendAudioToApi = async (blob: Blob) => {
    const formData = new FormData();
    formData.append('audio', blob, 'audio.webm');

    try {
      const response = await fetch('/api/stt', {
        method: 'POST',
        body: formData,
      });
      console.log(response);
      const data = await response.json();
      if (response.ok) {
        setTranscription(data.text);
        console.log('Transcription:', data.text);
        setMessages((prevMessages) => {
          const newMessage: Message = {
            id: currentPlayingMessageId + 1,
            content: data.text,
            sender: 'User',
            align: 'right',
            color: '#F6F6F6',
          };
          return [...prevMessages.slice(0, currentPlayingMessageId), newMessage];
        })
      } else {
        console.error('Transcription error:', data.error);
      }
    } catch (error) {
      console.error('Error sending audio to API:', error);
    }
  };


  return (
    <div className={styles.mainContainer}>
      <div className={styles.innerWrapper}>
        {startLesson ? (
          <>
            <div className={styles.leftContainer}>
              <SidebarHeader />
              <MessageBox messages={messages} />
            </div>
            <div className={styles.rightContainer}>
              <CharacterBox
                isRecording={isRecording}
                startRecording={startRecording}
                stopRecording={stopRecording}
              /> {/* Add CharacterBox to the right side */}
            </div>
          </>) :
            <StartLesson 
              setStartLesson={setStartLesson}
            />
        }
      </div>
    </div>
  );
};

export default MainContainer;

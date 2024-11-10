// src/app/components/MainContainer.tsx
'use client'

import React, { FC, ReactNode, useState, useRef, useEffect } from 'react';
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

interface WebSocketMessage {
  sender: string;
  message: string;
}

// Dummy initial messages
const initialMessages: Message[] = [
  // {
  //   id: 1,
  //   content: "Hello! How can I assist you today?",
  //   sender: "Michael",
  //   align: "left",
  //   color: "#DFF4FF",
  // },
  // {
  //   id: 2,
  //   content: "I need help with my project.",
  //   sender: "User",
  //   align: "right",
  //   color: "#F6F6F6",
  // },
  // {
  //   id: 3,
  //   content: "Sure, I'd be happy to help! Could you give me more details?",
  //   sender: "Dwight",
  //   align: "left",
  //   color: "#DFFFED",
  // },
];

let recentMessage = "";
let recentSender = "";

const MainContainer: FC<MainContainerProps> = ({ children }) => {
  // State
  const [startLesson, setStartLesson] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [currentPlayingMessageId, setCurrentPlayingMessageId] = useState<number>(0);

  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [transcription, setTranscription] = useState<string | null>(null);

  const [WSmessages, setWSMessages] = useState<WebSocketMessage[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<string>('Disconnected');
  const [currentMessage, setCurrentMessage] = useState<WebSocketMessage>({ sender: '', message: '' });
  const ws = useRef<WebSocket | null>(null); // WebSocket instance stored in a ref with type


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
        console.log('data', data.text);
        sendMessage(data.text);
        setCurrentPlayingMessageId((prevNumber) => prevNumber + 1);
      } else {
        console.error('Transcription error:', data.error);
      }
    } catch (error) {
      console.error('Error sending audio to API:', error);
    }
  };

  async function playTextToSpeech(text: string, character: string) {
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, character }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      // Get the audio data as a blob
      const audioBlob = await response.blob();
      
      // Create a URL for the audio blob
      const audioUrl = URL.createObjectURL(audioBlob);
  
      // Play the audio using the Audio class
      const audio = new Audio(audioUrl);
      audio.play();
  
      // Clean up the URL after the audio ends
      audio.onended = () => URL.revokeObjectURL(audioUrl);
  
    } catch (error) {
      console.error("Error playing text-to-speech audio:", error);
    }
  }
  

  useEffect(() => {
    // Initialize WebSocket connection

    ws.current = new WebSocket("ws://localhost:8765?user_id=me&characters=dwight,michael");


    ws.current.onopen = () => {
      setConnectionStatus('Connected');
      console.log('WebSocket connection established');
    };

    ws.current.onmessage = (event: MessageEvent) => {
      const data: WebSocketMessage = JSON.parse(event.data);
      const { sender, message } = data;

      // if (currentMessage.sender && sender !== currentMessage.sender) {
      //   setWSMessages((prevMessages) => [...prevMessages, currentMessage]);
      //   setCurrentMessage({ sender, message });
      // } else {
      //   setCurrentMessage((prevMessage) => ({
      //     sender,
      //     message: prevMessage.message + message,
      //   }));
      // }
      if (message.startsWith(';') && message.endsWith(';')) {
        recentSender = sender;
        recentMessage = "";

        setMessages((prevMessages) => {
            const newMessage: Message = {
              id: currentPlayingMessageId + 1,
              content: "",
              sender: sender,
              align: 'left',
              color: sender === 'dwight' ? '#DFFFED' : '#DFF4FF',
            };
            return [...prevMessages, newMessage];
        });
          setCurrentPlayingMessageId((prevNumber) => prevNumber + 1);
      }
      

      if (message === ('###')) {
        // invoke 11labs api
        console.log(currentPlayingMessageId);
        console.log(messages);
        playTextToSpeech(recentMessage, recentSender);
      } else {
        recentMessage += message;
        setMessages((prevMessages) => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          const updatedLastMessage = {
            ...lastMessage,
            content: lastMessage.content + message,
          };
          return [...prevMessages.slice(0, prevMessages.length - 1), updatedLastMessage];
        });
      }
    }

    ws.current.onclose = () => {
      setConnectionStatus('Disconnected');
      console.log('WebSocket connection closed');
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnectionStatus('Error');
    };

    // Cleanup WebSocket connection on component unmount
    return () => {
      if (currentMessage.sender) {
        setWSMessages((prevMessages) => [...prevMessages, currentMessage]);
      }
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [currentMessage]);

  const sendMessage = (message: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const messageData = message;
      ws.current.send(messageData);
      console.log('Sent message:', messageData);
    } else {
      console.log('WebSocket is not open');
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

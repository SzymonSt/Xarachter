// src/app/components/MessageBox.tsx

"use client"; // Marks this component as a client component

import React, { FC, useState, useEffect } from 'react';
import styles from './MessageBox.module.css';

interface Message {
  id: string;
  content: string;
  sender: string;
  align: 'left' | 'right';
  color: string;
}

interface MessageBoxProps {
  initialMessages: Message[]; // Initial messages passed as props
  onNewMessage?: (message: Message) => void; // Optional callback for new messages
}

const MessageBox: FC<MessageBoxProps> = ({ initialMessages, onNewMessage }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  // Example: Simulating message streaming with useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        content: "This is a streamed message.",
        sender: "StreamBot",
        align: "left",
        color: "#DFF4FF",
      };
      
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Trigger callback if provided (useful for parent component to handle new messages)
      if (onNewMessage) {
        onNewMessage(newMessage);
      }
    }, 5000); // New message every 5 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, [onNewMessage]);

  return (
    <div className={styles.sidebarFooterBox}>
      <p className={styles.conversationTitle}>Conversation</p>
      <div className={styles.whiteBox}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.messageBubble} ${
              message.align === 'right' ? styles.rightAlign : styles.leftAlign
            }`}
            style={{ backgroundColor: message.color }}
          >
            <p className={styles.messageTitle}>{message.sender}</p>
            <p className={styles.messageContent}>{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageBox;

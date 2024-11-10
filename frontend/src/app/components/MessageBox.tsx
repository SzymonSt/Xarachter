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
  messages: Message[]; // Initial messages passed as props
}

const MessageBox: FC<MessageBoxProps> = ({ messages }) => {

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

// src/app/components/MainContainer.tsx

import React, { FC, ReactNode } from 'react';
import SidebarHeader from './SidebarHeader';
import MessageBox from './MessageBox';
import CharacterBox from './CharacterBox'; // Import CharacterBox component
import styles from './MainContainer.module.css';

interface MainContainerProps {
  children?: ReactNode;
}

// Dummy initial messages
const initialMessages = [
  {
    id: '1',
    content: "Hello! How can I assist you today?",
    sender: "Michael",
    align: "left",
    color: "#DFF4FF",
  },
  {
    id: '2',
    content: "I need help with my project.",
    sender: "User",
    align: "right",
    color: "#F6F6F6",
  },
  {
    id: '3',
    content: "Sure, I'd be happy to help! Could you give me more details?",
    sender: "Jim",
    align: "left",
    color: "#DFFFED",
  },
];

const MainContainer: FC<MainContainerProps> = ({ children }) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.innerWrapper}>
        <div className={styles.leftContainer}>
          <SidebarHeader />
          <MessageBox initialMessages={initialMessages} />
        </div>
        <div className={styles.rightContainer}>
          <CharacterBox /> {/* Add CharacterBox to the right side */}
        </div>
      </div>
    </div>
  );
};

export default MainContainer;

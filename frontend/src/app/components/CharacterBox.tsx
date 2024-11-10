// src/app/components/CharacterBox.tsx

import React from 'react';
import styles from './CharacterBox.module.css';
import { FaMicrophone, FaStop } from "react-icons/fa";

type CharacterBoxProps = {
  isRecording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
};

const CharacterBox: React.FC<CharacterBoxProps> = ({isRecording, startRecording, stopRecording}) => {
  return (
    <div className={styles.characterBox}>
      <h2 className={styles.title}>Characters</h2>
      {/* Future content for character images or other elements can go here */}
      <div>
        {
          isRecording ?
            <button
              className={styles.recordingButton}
              onClick={stopRecording}
            >
              <FaStop />
            </button> :
            <button
              className={styles.recordingButton}
              onClick={startRecording}
            >
              <FaMicrophone />
            </button>
        }
      </div>
    </div>
  );
};

export default CharacterBox;

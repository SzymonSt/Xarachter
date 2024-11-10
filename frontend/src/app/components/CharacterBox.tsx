// src/app/components/CharacterBox.tsx

import React from 'react';
import styles from './CharacterBox.module.css';
import AudioVisualizer from './AudioVisualizer';

const characters = [
  {
    name: 'Dwight',
    color: '#DFFFED', 
    imageSrc: 'dwight.png', 
  },
  {
    name: 'Michael',
    color: '#DFF4FF', 
    imageSrc: 'michael.png',
  },
];
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
      <div className={styles.characterContainer}>
        {characters.map((character, index) => (
          <div
            key={index}
            className={styles.avatar}
            style={{
              borderColor: character.color,
            }}
          >
            <img
              src={character.imageSrc}
              alt={character.name}
              className={styles.avatarImage}
            />
          </div>
        ))}
      </div>
      {/*<AudioVisualizer />  AudioVisualizer positioned at the bottom */}
      <div className={styles.recordingButtonBox}>
        {
          isRecording ?
            <button
              className={styles.recordingButton}
              onClick={stopRecording}
            >
              <FaStop 
                size={50}
              />
            </button> :
            <button
              className={styles.recordingButton}
              onClick={startRecording}
            >
              <FaMicrophone 
                size={50}
              />
            </button>
        }
      </div>
    </div>
  );
};

export default CharacterBox;

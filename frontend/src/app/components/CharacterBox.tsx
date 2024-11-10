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

const CharacterBox: React.FC = () => {
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
      <AudioVisualizer /> {/* AudioVisualizer positioned at the bottom */}
    </div>
  );
};

export default CharacterBox;

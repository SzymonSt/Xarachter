// src/app/components/CharacterBox.tsx

import React from 'react';
import styles from './CharacterBox.module.css';

const CharacterBox: React.FC = () => {
  return (
    <div className={styles.characterBox}>
      <h2 className={styles.title}>Characters</h2>
      {/* Future content for character images or other elements can go here */}
    </div>
  );
};

export default CharacterBox;

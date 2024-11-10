import React, { FC, useState, useEffect } from 'react';
import styles from './StartLesson.module.css';

interface StartLessonProps {
    setStartLesson: (startLesson: boolean) => void;
}


const StartLesson: FC<StartLessonProps> = ({setStartLesson}) => {
  
    return (
            <div className={styles.mainContainer}>
                <h2>Choose your desired characters to teach you sales</h2>
                <div className={styles.cardBox}>
                    <div className={styles.card}>
                        <img
                        src={'dwight.png'}
                        alt={'Dwight Schrute'}
                        className={styles.avatarImage}
                        />
                        <div className={styles.text}>
                            Dwight Schrute
                        </div>
                    </div>
                    <div className={styles.card}>
                        <img
                        src={'michael.png'}
                        alt={'Michael Scott'}
                        className={styles.avatarImage}
                        />
                        <div className={styles.text}>
                            Michael Scott
                        </div>
                    </div>
                </div>

                <button
                    // className={styles.startLessonButton}
                    onClick={() => setStartLesson(true)}
                >
                    Start Lesson
                </button>
                </div>

    );
  };
  
  export default StartLesson;
  
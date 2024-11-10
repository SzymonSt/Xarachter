import React, { FC, useState, useEffect } from 'react';

interface StartLessonProps {
    setStartLesson: (startLesson: boolean) => void;
}


const StartLesson: FC<StartLessonProps> = ({setStartLesson}) => {
  
    return (
        <div>
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
  
// src/app/components/AudioVisualizer.tsx

"use client";

import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import styles from './AudioVisualizer.module.css';

const AudioVisualizer: React.FC = () => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (waveformRef.current) {
      // Initialize WaveSurfer
      waveSurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#ADD8E6', // Light blue color for the waveform
        progressColor: '#ADD8E6',
        responsive: true,
        height: 100,
        backgroundColor: 'transparent',
      });

      // Load the audio file
      waveSurferRef.current.load('office_kevin.mp3');

      // Attempt to play audio once it's ready, with context resumption and a delay
      waveSurferRef.current.on('ready', () => {
        // Resume the audio context, which can help with autoplay
        waveSurferRef.current?.backend?.ac.resume();

        // Try to play the audio with a small delay
        setTimeout(() => {
          waveSurferRef.current?.play().catch((error) => {
            console.warn('Autoplay was prevented by the browser. Interaction required.', error);
          });
        }, 300); // Small delay before attempting play to improve reliability
      });
    }

    // Cleanup when component is unmounted
    return () => {
      waveSurferRef.current?.destroy();
    };
  }, []);

  return <div className={styles.audioVisualization} ref={waveformRef}></div>;
};

export default AudioVisualizer;

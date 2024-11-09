import React from 'react';
import Image from 'next/image';
import styles from './SidebarHeader.module.css';

const SidebarHeader = () => {
  return (
    <header className={styles.sidebarHeader}>
      {/* Logo on the left */}
      <div className={styles.logoContainer}>
        <Image src="/container_header.png" alt="Logo" width={30} height={30} />
      </div>
      {/* Text beside the logo */}
      <h1 className={styles.title}>Personalized Path Tool</h1>
    </header>
  );
};

export default SidebarHeader;

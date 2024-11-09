import React, { FC, ReactNode } from 'react';
import SidebarHeader from './SidebarHeader'; // Import SidebarHeader
import styles from './MainContainer.module.css';

interface MainContainerProps {
  children?: ReactNode;
}

const MainContainer: FC<MainContainerProps> = ({ children }) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.innerWrapper}>
        <div className={styles.leftContainer}>
          <SidebarHeader /> {/* Insert SidebarHeader at the top */}
          <h2>Sidebar</h2>
          <p>This is the fixed-width sidebar content.</p>
        </div>
        <div className={styles.rightContainer}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainContainer;

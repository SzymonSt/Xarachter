// src/app/components/Header.tsx

import Image from "next/image";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.appHeader}>
      <div className={styles.headerContent}>
        <Image
          src="/header_logo.jpg"
          alt="Company Logo"
          width={1034}
          height={216}
          className={styles.companyLogo}
        />
        <div className={styles.doctorInfo}>
          <span className={styles.doctorName}>
            John Doe
          </span>
          <Image
            src="/expand-doctor-profile.png"
            alt="Doctor Profile"
            width={15}
            height={15}
            className={styles.doctorProfileButton}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

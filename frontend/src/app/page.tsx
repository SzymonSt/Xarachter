// src/app/page.tsx

import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <MainContainer>
        {/* Add your main page content here */}
        <h1>Welcome to the Home Page</h1>
      </MainContainer>
    </div>
  );
}

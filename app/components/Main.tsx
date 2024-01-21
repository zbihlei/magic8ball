"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/main.module.scss';
import useRandomAnswer from '../hooks/useRandom';

function Main() {
  const [clicked, setClicked] = useState<boolean>(false);
  const [isLogoShifted, setIsLogoShifted] = useState<boolean>(false);
  const [isTriangleShifted, setTriangleShifted] = useState<boolean>(false);
  const [text, setShowText] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>('');
  const getRandomAnswer = useRandomAnswer();

  useEffect(()=>{
    setAnswer(getRandomAnswer());
  },[text]); 

 const handleToggleClass = () => {
  setClicked(true);
  setTimeout(()=>{
    setIsLogoShifted(!isLogoShifted);
    setTriangleShifted(true);
      setTimeout(() => {
        setShowText(true);
      }, 800);
  },1000)
  };

  const handleSpaceKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code === 'Space') {
      if (clicked) {
        handleResetStyles();
      } else {
        handleToggleClass();
      }
    }
  };
  const handleResetStyles = () => {
    setIsLogoShifted(false);
    setTriangleShifted(false);
    setClicked(false);
    setTimeout(() => {``
      setShowText(false);
    }, 800);
  };

  return (
    <div className={styles.wrapp} onKeyDown={handleSpaceKeyPress} tabIndex={0} role="button">
      <div className={styles.stars}></div>
      <div className={styles.twinkling}></div>
        <div className={`${styles.ball} ${clicked ? styles.shakeAnimation : ''}`}>
          <div className={`${styles.logo} ${isLogoShifted ? styles.logoShifted : styles.logoShiftedBack}`}>
          <div className={`${styles.stroke} ${isLogoShifted ? styles.strokeShifted : styles.strokeShiftedBack}`}>
            <div className={`${styles.triangle} ${isTriangleShifted ? styles.triangleShifted : styles.triangleShiftedBack}`}>
              <span className={`${styles.text} ${text ? styles.text : styles.hide}`}>{answer}</span>
            </div>
        </div>
      </div>
    </div>
    <span className={styles.info}>press space</span>
    {clicked ? 
    <button onClick={handleResetStyles} className={styles.shake} style={{color: 'white'}}>Again</button> 
    : 
    <button onClick={handleToggleClass} className={styles.shake} style={{color: 'white'}}>Shake</button>}
    <span className={styles.dev}>Developed by <Link href={'https://github.com/zbihlei'}>zbihlei</Link></span>
  </div>
  );
}

export default Main


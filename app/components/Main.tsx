"use client"
import { useEffect, useState } from 'react';
import styles from '../styles/main.module.scss';
import useRandomAnswer from '../hooks/useRandom';
import useShakeDetection from '../hooks/useShakeDetection';

function Main() {
  const [clicked, setClicked] = useState(false);
  const [isLogoShifted, setIsLogoShifted] = useState(false);
  const [isTriangleShifted, setTriangleShifted] = useState(false);
  const [text, setShowText] = useState(false);
  const [answer, setAnswer] = useState('');
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

  useShakeDetection(handleToggleClass, { threshold: 15 });

  const handleResetStyles = () => {
    setIsLogoShifted(false);
    setTriangleShifted(false);
    setClicked(false);
    setTimeout(() => {
      setShowText(false);
    }, 800);
  };

  return (
    <div className={styles.wrapp}>
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
    {clicked ? 
    <button onClick={handleResetStyles} className={styles.shake}>Again</button> 
    : 
    <button onClick={handleToggleClass} className={styles.shake}>Shake</button>}
  </div>
  );
}

export default Main


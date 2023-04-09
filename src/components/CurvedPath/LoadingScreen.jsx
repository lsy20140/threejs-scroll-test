import { useProgress } from '@react-three/drei'
import React from 'react'
import styles from '../../LoadingScreen.module.css'

export default function LoadingScreen({started, onStarted, text}) {
  const { progress } = useProgress()
  return (
    <>
      {!started && 
        <div className={styles.loadingScreen}>
          <div className={styles.progress}>
            <div className={styles.progress_value} style={{width: `${progress}`}}/>
          </div>
          <div className={styles.board}>
            <h1 className={styles.title}>{text}</h1>
            <button 
              className={styles.start_btn}
              disabled={progress < 100}
              onClick={onStarted}
            >
              시작하기
            </button>
          </div>    
        </div>
      }
    </>

  )
}

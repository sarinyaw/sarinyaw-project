import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Layout from '../components/layout'

export default function Home() {
  const [isOpen, setOpen] = useState(false)
  const [userScore, setUserScore] = useState(0)
  const [userPicked, setUserPicked] = useState()
  const [housePicked, setHousePicked] = useState()
  const [isStartGame, setStartGame] = useState(true)
  const [waitHousePick, setWaitHousePick] = useState(true)
  const [result, setResult] = useState('')
  const [userPickedColor, setUserPickedColor] = useState('')
  const [housePickedColor, setHousePickedColor] = useState('')

  const openModal = () => {
    setOpen(!isOpen)
  }

  const checkRule = (userPick, housePick) => {
    const choices = {
      1: 'paper',
      2: 'scissors',
      3: 'rock'
    }
    setTimeout(
      () => setWaitHousePick(false),
      500
    );
    const colors = {
      paper: styles.paper,
      scissors: styles.scissors,
      rock: styles.rock
    }
    setUserPickedColor(colors[choices[userPick]])
    setHousePickedColor(colors[choices[housePick]])
    setUserPicked(choices[userPick])
    setHousePicked(choices[housePick])

    if (choices[userPick] === choices[housePick]) {
      setWaitHousePick(true)
      return "You Draw"
    }
    if ((choices[userPick] == 'paper' && choices[housePick] == 'rock') ||
      (choices[userPick] == 'scissors' && choices[housePick] == 'paper') ||
      (choices[userPick] == 'rock' && choices[housePick] == 'scissors')) {
      setTimeout(
        () => {
          setUserScore(userScore + 1)
        },
        500
      );
      setWaitHousePick(true)
      return "You Win"
    } else {
      if (userScore > 0) {
        setTimeout(
          () => {
            setUserScore(userScore - 1)
          },
          500
        );
      }
      setWaitHousePick(true)
      return "You Lose"
    }
  }

  const playAgain = () => {
    setStartGame(true)
  }
  const youPick = (event) => {
    setStartGame(false)
    let userPick = parseInt(event.target.getAttribute('value'))
    let housePick = Math.floor(Math.random() * 3) + 1
    let message = checkRule(userPick, housePick)
    setResult(message)
  }

  const flashPulse = keyframes`
  0% {
    padding: 0%;
    opacity: 100%;
  }
  20% {
    padding: 50%;
    opacity: 90%;
  }
  40% {
    padding: 60%;
    opacity: 80%;
  }
  50% {
    padding: 70%;
    opacity: 70%;
  }
  60% {
    padding: 80%;
    opacity: 60%;
  }
  80% {
    padding: 90%;
    opacity: 20%;
  }
  100% {
    padding: 100%;
    opacity: 0%;
  }
`;

  const fade = keyframes`
  from {opacity: 0;}
  to {opacity: 100%;}
  `;

  const FlashPulse = styled.div`
  animation: ${flashPulse} 2s linear;`;

  const Fade = styled.div`
  animation: ${fade} .5s linear;`;

  return (
    <Layout home>
      <Head>
        <title>Rock Paper Scissors</title>
      </Head>
      <div className={styles.scoreBoard}>
        <img className={styles.logo} src="/images/logo.svg" alt="rock-paper-scissors-logo" />
        <div className={styles.scoreBox}>
          <p className={styles.scoreLabel}>score</p>
          <p className={styles.scoreCount}>{userScore}</p>
        </div>
      </div>
      { isStartGame ? (
        <div className={styles.gameBoard}>
          <div className={styles.paper}>
            <img src="/images/icon-paper.svg" onClick={youPick} alt="paper" value={1} />
          </div>
          <div className={styles.scissors}>
            <img src="/images/icon-scissors.svg" onClick={youPick} alt="scissors" value={2} />
          </div>
          <div className={styles.rock}>
            <img src="/images/icon-rock.svg" onClick={youPick} alt="rock" value={3} />
          </div>
        </div>
      ) : (
          <div className={styles.gameResult}>
            <span className={styles.youPick}>
              <div className={userPickedColor}>
                <img src={`/images/icon-${userPicked}.svg`} alt={userPicked} />
              </div>
              <p>You Picked</p>
              {!waitHousePick && (<FlashPulse className={styles.resultDone}></FlashPulse>)}
            </span>
            <span className={styles.housePick}>
              {waitHousePick ? (
                <div className={styles.blankPick}>
                </div>
              ) : (
                  <Fade className={housePickedColor}>
                    <img src={`/images/icon-${housePicked}.svg`} alt={housePicked} />
                  </Fade>
                )}
              <p>The House Picked</p>
            </span>

            {waitHousePick ? (
              <div className={styles.result}></div>
            ) : (
                <Fade className={styles.result}>
                  <h2 className={styles.resultMessage}>{result}</h2>
                  <button onClick={playAgain} className={styles.playAgainButton}>Play Again</button>
                </Fade>
              )}

          </div>
        )
      }
      <div className={styles.rules}>
        <button onClick={openModal} className={styles.rulesButton}>Rules</button>
      </div>
      {
        isOpen && <div className={styles.rulesModal}>
          <h1>Rules</h1>
          <img className={styles.rulesImage} src="/images/image-rules.svg" alt="rules" />
          <img className={styles.closeButton} onClick={openModal} src="/images/icon-close.svg" alt="close-modal" />
        </div>
      }
    </Layout >
  )
}

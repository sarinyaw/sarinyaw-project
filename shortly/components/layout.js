import React, { useState } from 'react';
import Head from 'next/head'
import styles from '../styles/layout.module.scss'
import Link from 'next/link'

export const siteTitle = 'Shortly'

export default function Layout({ children }) {
  const [open, setOpen] = useState(false)
  const openMenu = () => {
    setOpen(!open)
    console.log(open)
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta charset="UTF-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta name="author" content="Sarinya Wongmueng"></meta>
        <link rel="icon" href="/images/favicon-32x32.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      </Head>
      <nav className={styles.navbar}>
        <div className={styles.navbarStart}>
          <img src="/images/logo.svg" alt="logo" />
          <Link href={`/`}>
            <a>Feature</a>
          </Link>
          <Link href={`/`}>
            <a>Pricing</a>
          </Link>
          <Link href={`/`}>
            <a>Resources</a>
          </Link>
        </div>
        <div className={styles.navbarEnd}>
          <Link href={`/`}>
            <a>Login</a>
          </Link>
          <Link href={`/`}>
            <a className={styles.button}>Sign Up</a>
          </Link>
          <img className={styles.hamburger} onClick={openMenu} src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Hamburger_icon.svg" alt="hamburger" />
        </div>
        {!open ? ('') : (
          <div className={styles.navbarLink}>
            <Link href={`/`}>
              <a>Feature</a>
            </Link>
            <Link href={`/`}>
              <a>Pricing</a>
            </Link>
            <Link href={`/`}>
              <a>Resources</a>
            </Link>
            <hr></hr>
            <Link href={`/`}>
              <a>Login</a>
            </Link>
            <Link href={`/`}>
              <a className={styles.button}>Sign Up</a>
            </Link>
          </div>
        )}
      </nav>
      <main className={styles.main}>{children}</main>
    </div >
  )
}
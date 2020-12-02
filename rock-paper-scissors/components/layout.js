import React, { useState } from 'react';
import Head from 'next/head'
import styles from '../styles/layout.module.scss'

export default function Layout({ children }) {
  return (
    <main className={styles.main}>
      <Head>
        <title>Create Next App</title>
        <meta charset="UTF-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta name="author" content="Sarinya Wongmueng"></meta>
        <link rel="icon" href="/images/favicon-32x32.png" />
      </Head>
      <div className={styles.container}>
        {children}
      </div>
    </main>
  )
}
import React, { useState } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Layout from '../components/layout'
import useCopyToClipboard from "../utils/useCopyToClipboard";
import { useForm } from "react-hook-form";
import Link from 'next/link'

export default function Home() {
  const { register, handleSubmit, errors } = useForm();
  const [shortLinks, setShortLinks] = useState([])
  const getShortLink = (data, e) => {
    fetch(`https://api.shrtco.de/v2/shorten?url=${data.link}`)
      .then((res) => res.json())
      .then((data) => {
        setShortLinks([...shortLinks, data.result])
        e.target.reset();
        console.log(data.result)
      })

  }
  const [isCopied, handleCopy] = useCopyToClipboard(3000);
  let formClass = errors.link ? `${styles.shorten} ${styles.errors}` : styles.shorten;
  return (
    <Layout home>
      <Head>
        <title>Shortly Link</title>
      </Head>
      <div className={styles.container}>
        <section className={styles.mainContent}>
          <img src="/images/illustration-working.svg" alt="main-image" />
          <div className={styles.grid}>
            <h1>More than just shorter links</h1>
            <p>
              Build your brand’s recognition and get detailed insights
              on how your links are performing.
            </p>
            <Link href={`/`}>
              <a className={styles.getStarted}>
                Get Started
              </a>
            </Link>
          </div>
        </section>
        <form className={formClass} onSubmit={handleSubmit(getShortLink)}>
          <input type="text" name="link" placeholder="Shorten a link here..." ref={register({ required: true })} />
          {errors.link && <span className={styles.errorsMessage}>Please add a link</span>}
          <button type="submit">Shorten It!</button>
        </form>
        <section className={styles.middleContent}>
          {
            shortLinks.map((value, i) => {
              return (<div key={i} className={styles.shortLinks}>
                <p>
                  {value.original_link}
                </p>
                <p>
                  {value.full_short_link}
                </p>
                { isCopied[i] ? (
                  <button key={i} onClick={() => handleCopy(value.full_short_link, i)} className={styles.copied}>
                    Copied!
                  </button>
                ) : (
                    <button key={i} onClick={() => handleCopy(value.full_short_link, i)} className={styles.copy}>
                      Copy
                    </button>
                  )}
              </div>)
            })
          }
          <div className={styles.grid}>
            <h2>Advanced Statistics</h2>
            <p>Track how your links are performing across the web with our
          advanced statistics dashboard.</p>
          </div>
          <div className={styles.cardWrapper}>
            <div className={styles.card}>
              <span className={styles.icon}>
                <img src="/images/icon-brand-recognition.svg" alt="logo" />
              </span>
              <h3>Brand Recognition</h3>
              <p>Boost your brand recognition with each click. Generic links don’t
          mean a thing. Branded links help instil confidence in your content.</p>
            </div>
            <div className={styles.card}>
              <span className={styles.icon}>
                <img src="/images/icon-detailed-records.svg" alt="logo" />
              </span>
              <h3>Detailed Records</h3>
              <p>Gain insights into who is clicking your links. Knowing when and where
          people engage with your content helps inform better decisions.</p>
            </div>
            <div className={styles.card}>
              <span className={styles.icon}>
                <img src="/images/icon-fully-customizable.svg" alt="logo" />
              </span>
              <h3>Fully Customizable</h3>
              <p>Improve brand awareness and content discoverability through customizable
          links, supercharging audience engagement.</p>
            </div>
          </div>
        </section>
        <section className={styles.bottomContent}>
          <h4>
            Boost your links today
          </h4>
          <Link href={`/`}>
            <a className={styles.getStarted}>
              Get Started
            </a>
          </Link>
        </section>
      </div>
      <footer className={styles.footer}>
        <p className={styles.topic}>Shortly</p>
        <div className={styles.linkWrapper}>
          <span>
            <p>Features</p>
            <ul className={styles.links}>
              <li><a href="" target="_blank">Link Shortening</a></li>
              <li><a href="" target="_blank">Branded Links</a></li>
              <li><a href="" target="_blank">Analytics</a></li>
            </ul>
          </span>
          <span>
            <p>Resources</p>
            <ul className={styles.links}>
              <li><a href="" target="_blank">Blog</a></li>
              <li><a href="" target="_blank">Developers</a></li>
              <li><a href="" target="_blank">Support</a></li>
            </ul>
          </span>
          <span>
            <p>Company</p>
            <ul className={styles.links}>
              <li><a href="" target="_blank">About</a></li>
              <li><a href="" target="_blank">Our Team</a></li>
              <li><a href="" target="_blank">Careers</a></li>
              <li><a href="" target="_blank">Contact</a></li>
            </ul>
          </span>
        </div>
        <div className={styles.icons}>
          <a href="" target="_blank"><i className="fa fa-facebook-official" aria-hidden="true"></i></a>
          <a href="" target="_blank"><i className="fa fa-twitter" aria-hidden="true"></i></a>
          <a href="" target="_blank"><i className="fa fa-pinterest" aria-hidden="true"></i></a>
          <a href="" target="_blank"><i className="fa fa-instagram" aria-hidden="true"></i></a>
        </div>
      </footer>

    </Layout>
  )
}

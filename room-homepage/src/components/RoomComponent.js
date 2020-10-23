import React, { useState, useEffect } from 'react'
import '../styles/room.scss'

const RoomComponent = () => {
  const content = [
    {
      topic: 'Discover innovative ways to decorate',
      desc: "We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form andnfunction in bringing your vision to life.Create a room in your own style with our collection and make your property a reflection of you and what you love.",
      img: {
        desktop: 'images/desktop-image-hero-1.jpg',
        mobile: 'images/mobile-image-hero-1.jpg'
      }
    },
    {
      topic: 'We are available all across the globe',
      desc: "With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we’re in most major cities throughout the country.Find the branch nearest you using ourstore locator.Any questions? Don't hesitate to contact us today.",
      img: {
        desktop: 'images/desktop-image-hero-2.jpg',
        mobile: 'images/mobile-image-hero-2.jpg'
      }
    },
    {
      topic: 'Manufactured with the best materials',
      desc: "Our modern furniture store provide a high level of quality.Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible.With three decades of experience in this industry, we understand what customers want for their home and office.",
      img: {
        desktop: 'images/desktop-image-hero-3.jpg',
        mobile: 'images/mobile-image-hero-3.jpg'
      }
    },
  ];

  const [contentIndex, setContentId] = useState(0);

  const isMobileFirst = (window.innerWidth <= 375) ? true : false;

  const [isMobile, setMobile] = useState(isMobileFirst);

  function prevContent() {
    if (contentIndex === 0) return contentIndex;
    setContentId(contentIndex - 1);
  }

  function nextContent() {
    if (contentIndex === content.length - 1) return contentIndex;
    setContentId(contentIndex + 1);
  }

  console.log('size :', window.innerWidth)

  useEffect(() => {
    function handleResize() {
      if ((isMobile && window.innerWidth <= 375) || (!isMobile && window.innerWidth > 375)) return;
      if (window.innerWidth <= 375) {
        setMobile(true)
      } else {
        setMobile(false)
      }
    }
    window.addEventListener('resize', handleResize)
  })

  return (
    <div className="container">
      {
        content && (
          <div className="cover">
            { isMobile && (<img src={`${process.env.PUBLIC_URL}/assets/${content[contentIndex].img.mobile}`} alt="cover-desktop" />)}
            { !isMobile && (<img src={`${process.env.PUBLIC_URL}/assets/${content[contentIndex].img.desktop}`} alt="cover-mobile" />)}
            <div className="slide">
              <span className='button' onClick={prevContent}><img src={`${process.env.PUBLIC_URL}/assets/images/icon-angle-left.svg`} alt="prev-slide" /></span>
              <span className='button' onClick={nextContent}><img src={`${process.env.PUBLIC_URL}/assets/images/icon-angle-right.svg`} alt="next-slide" /></span>
            </div>
          </div>
        )
      }
      {
        content && (
          <div id="shop" className="content">
            <h1>{content[contentIndex].topic}</h1>
            <p>{content[contentIndex].desc}</p>
            <a className='text-space-5' href="#">SHOW NOW <img src={`${process.env.PUBLIC_URL}/assets/images/icon-arrow.svg`} alt="arrow" /></a>
          </div>
        )
      }
      <div class="image">
        <img src={`${process.env.PUBLIC_URL}/assets/images/image-about-dark.jpg`} alt="furniture-dark" />
      </div>
      <div id='about' className="content">
        <h4 className='text-space-25 uppercase'>About our furniture</h4>
        <p>
          Our multifunctional collection blends design and function to suit your individual taste.
          Make each room unique, or pick a cohesive theme that best express your interests and what
          inspires you. Find the furniture pieces you need, from traditional to contemporary styles
          or anything in between. Product specialists are available to help you create your dream space.
        </p>
      </div>
      <div class="image">
        <img src={`${process.env.PUBLIC_URL}/assets/images/image-about-light.jpg`} alt="furniture-light"  />
      </div>
    </div>);
}

export default RoomComponent;
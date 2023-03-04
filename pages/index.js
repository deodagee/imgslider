import React from 'react';
import { useState, useRef, useEffect } from 'react';
import styles from "/styles/Home.module.css"

const images = [

  'images/image1.jpg',
  'images/image2.jpg',
  'images/image3.jpg',
  'images/image4.jpg',
  'images/image5.jpg',
  'images/image6.jpg',
  'images/image7.jpg',
  'images/image8.jpg',
  'images/image9.jpg',
  'images/image10.jpg',

];

function ImageSlider() {

  const outerContainerRef = useRef(null);
  const redSquareRef = useRef(null);
  const audioRef = useRef(null);
    const [outerContainerWidth, setOuterContainerWidth] = useState(0);
  const [visibleImageIndex, setVisibleImageIndex] = useState(0);
  const [visibleImageCount, setVisibleImageCount] = useState(0);
  const [audioPlayer, setAudioPlayer] = useState(null);

  const containerStyles = { 
    width: `${100 * images.length}%`,
    maxWidth: `${outerContainerWidth}px`
  };

  useEffect(() => {
    const handleResize = () => {
      if (outerContainerRef.current) {
        setOuterContainerWidth(outerContainerRef.current.offsetWidth);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  let offPercentage = 0;
  const [offPercentages, setOffPercentages] = useState(Array(images.length).fill(0));


  useEffect(() => {
    const handleScroll = () => {
      const redSquare = redSquareRef.current;
      if (redSquare) {
        const imagesContainer = outerContainerRef.current;
        const imagesContainerBounds = imagesContainer.getBoundingClientRect();
        const firstImage = imagesContainer.querySelector('img');
        const imageWidth = firstImage ? firstImage.getBoundingClientRect().width : 0;
        const visibleIndex = Math.round((redSquare.scrollLeft - imagesContainerBounds.left) / imageWidth);
        setVisibleImageIndex(visibleIndex);
        setVisibleImageCount(Math.ceil(redSquare.clientWidth / imageWidth));
  
        // Get the audio file name for the visible image index
        const audioFileName = `/audio/audio${visibleImageIndex + 1}.mp3`;
  
        // Create a new audio player and set its source to the corresponding audio file
        const audioPlayer = new Audio(audioFileName);
        audioPlayer.play();
  
        const newOffPercentages = Array(images.length).fill(0);
        images.forEach((_, index) => {
          newOffPercentages[index] = ((redSquare.scrollLeft - (index * imageWidth + imagesContainerBounds.left)) / imageWidth) * 100;
        });
        setOffPercentages(newOffPercentages);
      }
    };
  
    const redSquare = redSquareRef.current;
    if (redSquare) {
      redSquare.addEventListener('scroll', handleScroll);
    }
  
    return () => {
      if (redSquare) {
        redSquare.removeEventListener('scroll', handleScroll);
      }
    };
  }, [redSquareRef, outerContainerRef]);
  
  


  useEffect(() => {

    const audio = audioRef.current;
    const handleScroll = () => {


      if (redSquare) {
        const imagesContainer = outerContainerRef.current;
        const imagesContainerBounds = imagesContainer.getBoundingClientRect();
        const firstImage = imagesContainer.querySelector('img');
        const imageWidth = firstImage ? firstImage.getBoundingClientRect().width : 0;
        const visibleIndex = Math.round((redSquare.scrollLeft - imagesContainerBounds.left) / imageWidth);
        setVisibleImageIndex(visibleIndex);
        setVisibleImageCount(Math.ceil(redSquare.clientWidth / imageWidth));
  
        const newOffPercentages = Array(images.length).fill(0);
        images.forEach((_, index) => {
          newOffPercentages[index] = ((redSquare.scrollLeft - (index * imageWidth + imagesContainerBounds.left)) / imageWidth) * 100;
        });
        setOffPercentages(newOffPercentages);
      }
    };
  
    const redSquare = redSquareRef.current;
    if (redSquare) {
      redSquare.addEventListener('scroll', handleScroll);
    }
  
    return () => {
      if (redSquare) {
        redSquare.removeEventListener('scroll', handleScroll);
      }
    };
  }, [redSquareRef, outerContainerRef]);
  
  return (
    <div className={styles.container} ref={outerContainerRef}>
      <div className={styles.imagesContainer} style={containerStyles}>
        {images.map((image, index) => (
          <img key={index} className={styles.image} src={image} alt={`Image ${index + 1}`} />
        ))}
      </div>
  
      <div className={styles.redSquare} ref={redSquareRef} style={{border: '10px solid red', width: '100%', height: '50vh', position: 'absolute', top: 0, left: 0, overflow: 'scroll'}}>
        <div style={{width: `${100 * images.length}%`}}>
          {images.map((image, index) => (
            <img key={index} className={styles.image} src={image} alt={`Image ${index + 1}`} style={{width: `${100 / images.length}%`}} />
          ))}
        </div>
      </div>
  
      <p>The currently visible image is: {visibleImageIndex + 1}</p>
      <p>The number of visible images is: {visibleImageCount}</p>
      {offPercentages.map((percentage, index) => (
        <p key={index}>Image {index + 1} is off by: {percentage.toFixed(2)}%</p>
      ))}
    </div>
  );
  
}

export default ImageSlider;

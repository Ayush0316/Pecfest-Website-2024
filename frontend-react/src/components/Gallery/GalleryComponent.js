import React, { useState, useEffect, Suspense, lazy, useRef } from 'react';
import styles from './Gallery.module.css';

const LazyVideo = lazy(() => import('../LazyVideo/LazyVideo')); // Lazy load video component

const GalleryComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ src: '', type: '', alt: '' });
  const galleryRefs = useRef([]); // Store references for gallery items

  // Gallery items (images and videos)
  const galleryItems = [
    
  ];

  // Intersection Observer callback to load images/videos
  const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const { index } = entry.target.dataset;
        const item = galleryItems[index];

        if (item.type === 'image') {
          entry.target.src = item.src;
        } else if (item.type === 'video') {
          entry.target.querySelector('source').src = item.src;
          entry.target.load(); // Load video when in view
        }
        observer.unobserve(entry.target); // Stop observing once loaded
      }
    });
  };

  // Setup Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });

    galleryRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect(); // Clean up observer on unmount
    };
  }, []);

  // Function to show the modal
  const showModal = (item) => {
    setModalContent(item);
    setModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
    setModalContent({ src: '', type: '', alt: '' });
  };

  return (
    <div>
      {/* <div className={styles.gallery}>
        {galleryItems.map((item, index) => (
          <div
            key={index}
            className={styles['gallery-item']}
            onClick={() => showModal(item)}
          >
            {item.type === 'image' ? (
              <img
                data-index={index}
                ref={(el) => (galleryRefs.current[index] = el)}
                alt={item.alt}
                style={{ width: '100%', maxWidth: '300px' }}
                loading="lazy"
              />
            ) : (
              <Suspense fallback={<div>Loading video...</div>}>
                <LazyVideo
                  data-index={index}
                  ref={(el) => (galleryRefs.current[index] = el)}
                />
              </Suspense>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {/* {modalVisible && (
        <div className={styles.modal} onClick={closeModal}>
          <span className={styles.close} onClick={closeModal}>&times;</span>
          {modalContent.type === 'image' ? (
            <img
              className={styles['modal-content']}
              src={modalContent.src}
              alt={modalContent.alt}
            />
          ) : (
            <video className={styles['modal-content']} controls>
              <source src={modalContent.src} type="video/mp4" />
            </video>
          )}
          <div className={styles.caption}>{modalContent.alt}</div>
        </div>
      )}  */}
    </div>
  );
};

export default GalleryComponent;
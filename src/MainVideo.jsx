import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import Quiz from './Quiz';

const MainVideo = ({ videoUrl,videoName, videoDescription, discountStart, setDiscountStart, setPlayingVideo, index }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [pausedTime, setPausedTime] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const playerRef = useRef(null);

  const handleVideoEnd = () => {
    setShowQuiz(true);
  };

  const handleVideoPause = () => {
    setPausedTime(playerRef.current.getCurrentTime());
    setShowPopup(true);
  };

  const handleVideoPlay = () => {
    setShowPopup(false);
  };

  const handleSeeButtonClick = () => {
    if (playerRef.current) {
      setShowPopup(false);
      playerRef.current.seekTo(pausedTime, 'seconds');
      playerRef.current.getInternalPlayer().playVideo();
    }
  };

  const toggleFullDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const getDescriptionText = () => {
    if (showFullDescription) {
      return videoDescription;
    } else {
      const truncatedDescription = videoDescription.split(' ').slice(0, 30).join(' ');
      return truncatedDescription + '....';
    }
  };

  const seeMoreLessButton = () => {
    if (showFullDescription) {
      return (
        <button className=" ml-1 text-secondary" onClick={toggleFullDescription}>
          ...see less
        </button>
      );
    } else {
      return (
        <button className=" ml-1 text-secondary" onClick={toggleFullDescription}>
          see more
        </button>
      );
    }
  };

  return (
    <div className="relative">
      <div className="card w-full  shadow-xl">
        <div className="card-body w-full">
          <div style={{ height: '100%', width: '100%', minHeight: '225px' }}>
            <ReactPlayer
              ref={playerRef}
              url={videoUrl}
              controls={true}
              onStart={() => setPlayingVideo(index)}
              rel={0}
              config={{
                youtube: {
                  playerVars: {
                    modestbranding: 1,
                    showinfo: 0,
                  },
                },
              }}
              onEnded={handleVideoEnd}
              onPause={handleVideoPause}
              onPlay={handleVideoPlay}
              width="100%"
              height="320px"
            />
          </div>
        <h3 className="text-2xl italic font-semibold text-left text-black">{videoName}</h3>
        <p className=" px-4 text-left mt-8 text-black italic mr-auto">
            {getDescriptionText()}
            {videoDescription.length > 50 && seeMoreLessButton()}
          </p>
        </div>
       
      </div>

      {showQuiz && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <div>
            <Quiz discountStart={discountStart} setDiscountStart={setDiscountStart} />
          </div>
        </div>
      )}

      {showPopup && (
        <div className="absolute bottom-64 left-0 w-full h-full flex justify-center items-center">
          <div className="alert  bg-yellow-300 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div>
              <h3 className="font-bold">Don't skip the video!</h3>
              <div className="text-xs">Watch the video till the end and participate in the quiz to win a prize.</div>
            </div>
            <button className="btn hover:bg-orange-500 btn-sm" onClick={handleSeeButtonClick}>
              See Video
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainVideo;

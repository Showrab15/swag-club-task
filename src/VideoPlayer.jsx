import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import Quiz from './Quiz';
const VideoPlayer = ({ videoUrl , discountStart, setDiscountStart,setPlayingVideo, index}) => {
  const [showQuiz, setShowQuiz] = useState(false);

  const handleVideoEnd = () => {
    setShowQuiz(true);
  };

  return (
    <div className="relative">
      <div className="card w-full bg-red-100 shadow-xl">
        <div className="card-body w-full">
        <div style={{
           height:' 100%',
 width: '100%',
 minHeight:' 225px'
 }}>
      <ReactPlayer
        url={videoUrl}
        controls={true}
        onStart={()=>setPlayingVideo(index)}
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
        // style={{ position: 'absolute', top: 0, left: 0 }}
        width="100%"
        height="255px"
      />
    </div>
        </div>
      </div>

      {showQuiz && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <div className="">
            <Quiz 
            discountStart={discountStart}
            setDiscountStart={setDiscountStart}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;

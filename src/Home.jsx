import React, { useEffect, useState } from 'react';
import VideoPlayer from './VideoPlayer';
import Product from './Product';

const Home = () => {

    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
  const [playingVideo,setPlayingVideo] = useState(0)
  const [discountStart, setDiscountStart] = useState(false)
    useEffect(() => {
      fetch('https://swag-club-second-task-server.vercel.app/videos')
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setVideos(data);
          setLoading(false)
        });
    }, []);


    return (
        <div className=" ml-2 md:flex gap-12">

        <div className="md:w-1/2 mt-12 ">
          {loading ? (
            // Display spinner while videos are being loaded
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
            </div>
          ) : (
            // Display video player once videos are loaded
            videos.length > 0 && <>
            <VideoPlayer
            setDiscountStart={setDiscountStart}
            discountStart={discountStart}
            index={playingVideo}
            setPlayingVideo={setPlayingVideo}
            videoUrl={videos[playingVideo].videoUrl} />
            <Product
                                setDiscountStart={setDiscountStart}

discountStart={discountStart}></Product>
            </> 
          )}
          
         
        </div>

        <div className="md:w-1/2  block">
          {loading ? (
            // Display spinner while videos are being loaded
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
            </div>
          ) : (
            <div className=" border   h-full overflow-y-auto md:fixed">
            <div className="flex gap-12 flex-col p-4 object-contain w-full h-full">
              {/* List of sidebar videos */}
              {videos.map((video , index)=> (
             
                    <VideoPlayer key={video.id}
                    index={index}
                    setDiscountStart={setDiscountStart}
                    discountStart={discountStart}
                    setPlayingVideo={setPlayingVideo}
                    videoUrl={video.videoUrl} />

              ))}
            </div>
          </div>
          )
              }
        </div>

              
      </div>
    );
};

export default Home;
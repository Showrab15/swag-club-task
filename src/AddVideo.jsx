import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import useAuthContext from './hooks/useAuthCOntext';

const AddVideo = () => {


    //user for get the name of user 
    const { user } = useAuthContext()

    const handleAddVideo = event => {
        event.preventDefault()
        const form = event.target;
        const publisherName = form.publisherName.value;
        const publisherEmail = user?.email;
        const videoName = form.videoName.value;
        const videoDescription = form.videoDescription.value;
        const videoURL = form.videoURL.value;
        const addedvideos = {
            publisherName: publisherName,
            publisherEmail: publisherEmail,
            videoName: videoName,
            videoUrl: videoURL,
            videoDescription:videoDescription
        }
        console.log(addedvideos)
        fetch('https://swag-club-second-task-server.vercel.app/videos',
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(addedvideos)


            })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'video Added Successful  ',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                    form.reset()
                }
            }
            )

    }

    return (
        <div>
            <div className="card-body mt-8 rounded-lg bg-[#F3F3F3]">
                <form onSubmit={handleAddVideo}>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-6  ">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Publisher Name</span>
                            </label>
                            <input type="text" name='publisherName' value={user?.displayName} placeholder="publisher Name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Publisher Email</span>
                            </label>
                            <input type="email" name='publisherEmail' value={user?.email} placeholder="publisher Email" className="input input-bordered" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Video Title</span>
                            </label>
                            <input type="text" name='videoName' required placeholder="video Name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Video Description</span>
                            </label>
                            <textarea name="videoDescription" className="textarea textarea-info" placeholder="type video description here....."></textarea>                        </div>

                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text font-semibold">Video  URL</span>
                            </label>
                            <input name="videoURL" type="text" accept='video' placeholder="video Photo URL" className="input input-bordered" />
                        </div>

                    


                
                     
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-[#FF3811]">  Add Video</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddVideo;
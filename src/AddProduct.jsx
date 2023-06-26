import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import useAuthContext from './hooks/useAuthCOntext';

const AddProduct = () => {


    //user for get the name of user 
    const { user } = useAuthContext()

    const handleAddProduct = event => {
        event.preventDefault()
        const form = event.target;
        const sellerName = form.sellerName.value;
        const sellerEmail = user?.email;
        const productName = form.productName.value;
        const productPhoto = form.productPhoto.value;
        const productPrice = parseFloat(form.productPrice.value)
        const addedproducts = {
            sellerName: sellerName,
            sellerEmail: sellerEmail,
            productName: productName,
            productPhoto: productPhoto,
            productPrice: productPrice,
        }
        console.log(addedproducts)
        fetch('https://swag-club-second-task-server.vercel.app/products',
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(addedproducts)


            })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'product Added Successful  ',
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
                <form onSubmit={handleAddProduct}>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-6  ">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Seller Name</span>
                            </label>
                            <input type="text" name='sellerName' value={user?.displayName} placeholder="Seller Name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Seller Email</span>
                            </label>
                            <input type="email" name='sellerEmail' value={user?.email} placeholder="Seller Email" className="input input-bordered" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input type="text" name='productName' required placeholder="product Name" className="input input-bordered" />
                        </div>

                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text font-semibold">Product Photo URL</span>
                            </label>
                            <input name="productPhoto" type="text" placeholder="product Photo URL" className="input input-bordered" />
                        </div>

                    


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Price</span>
                            </label>
                            <input type="text" name='productPrice' placeholder="$ Price" required className="input input-bordered" />

                        </div>
                
                     
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-[#FF3811]">Add Product</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
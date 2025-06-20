import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Nav from './Nav';
import Footer from './Footer';
import { Cart_action, cart_get_Acation, single_action } from '../Redux/action';
import { useParams } from 'react-router-dom';

const SinglePage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const product = useSelector(state => state.singelpage_combine.data || {})
    // console.log(product);

    useEffect(() => {
        dispatch(single_action(id))
    }, [dispatch, id])

    const handleCart = (product) => {
        dispatch(Cart_action(product)).then(() => {

            dispatch(cart_get_Acation())
        })
    }

    return (
        <div>
            <Nav />
            <div className="grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 my-3 gap-4 px-4">

                <div className='xl:col-span-1 lg:col-span-1 md:col-span-1' data-aos="fade-right">
                    <div className='w-full bg-[#F8F8FB] rounded-2xl shadow-lg'>
                        <div className='w-auto p-4 border-b-2'>
                            <h1 className='font-semibold text-xl p-1 text-text'>Category</h1>
                            {["Clothes", "Bags", "Shoes", "Cosmetics", "Electrics", "Phone", "Watch"].map((el, index) => (
                                <div key={index} className='flex justify-start gap-3 ms-3'>
                                    <input type="checkbox" />
                                    <h3 className='text-text'>{el}</h3>
                                </div>
                            ))}
                        </div>

                        <div className='w-auto p-4 border-b-2'>
                            <h1 className='font-semibold text-xl p-1 text-text'>Weight</h1>
                            {["200gm pack", "500gm pack", "1kg pack", "2kg pack", "5kg pack", "10kg pack"].map((el, index) => (
                                <div key={index} className='flex justify-start gap-3 ms-3'>
                                    <input type="checkbox" />
                                    <h3 className='text-text'>{el}</h3>
                                </div>
                            ))}
                        </div>

                        <div className='w-auto p-4 border-b-2'>
                            <h1 className='font-semibold text-xl p-1 text-text'>Color</h1>
                            <div className='flex gap-4 ms-2 flex-wrap'>
                                {[
                                    "#FF5733", "#33FF57", "#3357FF",
                                    "#FF33A6", "#33FFF3", "#A633FF",
                                    "#FFD433", "#FF8C33", "#4CAF50"
                                ].map((el, index) => (
                                    <span
                                        key={index}
                                        className="w-[22px] h-[22px] block rounded-[20px]"
                                        style={{ backgroundColor: el }}
                                    ></span>
                                ))}
                            </div>
                        </div>

                        <div className='w-auto p-4 border-b-2'>
                            <h1 className='font-semibold text-xl p-1 text-text'>Price</h1>
                            <div>
                                <p className='p-3 bg-white flex justify-center rounded-lg'>$130 - $315</p>
                            </div>
                        </div>

                        <div className='w-auto p-4'>
                            <h1 className='font-semibold text-xl p-1 text-text'>Tag</h1>
                            {["Clothes", "Bags", "Shoes", "Cosmetics", "Electrics", "Phone", "Watch"].map((el, index) => (
                                <button
                                    key={index}
                                    className='border bg-transparent p-2 rounded-lg m-1 text-text hover:bg-them hover:text-white transition-all'
                                >
                                    {el}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="xl:col-span-4 lg:col-span-4 md:col-span-1 h-auto py-3" data-aos="fade-left">
                    <div className="w-full h-auto min-h-screen mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="flex flex-col lg:flex-row gap-6 p-6">
                            {/* Image Section - Comes first on mobile */}
                            <div className="w-full lg:w-1/2 flex-shrink-0">
                                <div className="w-full h-64 md:h-80 lg:h-96 flex items-center justify-center bg-gray-100 rounded-xl overflow-hidden relative">
                                    <div className="group relative h-full w-full overflow-hidden bg-gray-100">
                                        {product?.image?.length > 0 && (
                                            <img
                                                src={product.image[0]}
                                                alt={product.name || "Product"}
                                                className="absolute top-0 left-0 object-cover w-full h-full rounded-lg transition-transform duration-500 ease-in-out group-hover:-translate-x-full"
                                            />
                                        )}
                                        {product?.image?.length > 0 && (
                                            <img
                                                src={product.image[1]}
                                                alt={product.name || "Product"}
                                                className="absolute top-0 left-0 object-cover w-full h-full rounded-lg transition-transform duration-500 ease-in-out group-hover:translate-x-0 translate-x-full"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Details Section */}
                            <div className="w-full lg:w-1/2 flex flex-col">
                                {/* Title & Description */}
                                <div className="space-y-4">
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                                            {product.des}
                                        </h2>
                                        <p className="text-gray-500 text-sm md:text-base">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. In, iure minus error doloribus saepe natus?
                                        </p>
                                    </div>

                                    {/* Ratings */}
                                    <div className="flex items-center">
                                        <div className="text-yellow-500 text-lg">
                                            {"★".repeat(5)}
                                        </div>
                                        <span className="ml-2 text-sm text-gray-400">(75 Reviews)</span>
                                    </div>

                                    {/* Product Info */}
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-700 text-sm md:text-base">
                                        <p className="font-medium">Brand:</p>
                                        <p className="text-gray-500">{product.name}</p>

                                        <p className="font-medium">Description:</p>
                                        <p className="text-gray-500">{product.des}</p>

                                        <p className="font-medium">Diet Type:</p>
                                        <p className="text-gray-500">Vegetarian</p>

                                        <p className="font-medium">Weight:</p>
                                        <p className="text-gray-500">{product.weight}</p>

                                        <p className="font-medium">Speciality:</p>
                                        <p className="text-gray-500">Gluten Free, Sugar Free</p>

                                        <p className="font-medium">Info:</p>
                                        <p className="text-gray-500">Egg Free, Allergen-Free</p>

                                        <p className="font-medium">Items:</p>
                                        <p className="text-gray-500">1</p>
                                    </div>
                                </div>

                                {/* Price, Sizes, and Cart Button */}
                                <div className="mt-6 space-y-4">
                                    {/* Price */}
                                    <h2 className="text-2xl md:text-3xl font-extrabold text-text">
                                        ${product.price}
                                    </h2>

                                    {/* Size Selection */}
                                    <div>
                                        <p className="text-gray-700 font-medium mb-2">Size / Weight:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {["50kg", "80kg", "120kg", "200kg"].map((size, idx) => (
                                                <button
                                                    key={idx}
                                                    className="px-3 py-1.5 bg-gray-100 rounded-md text-sm font-medium hover:bg-them hover:text-white transition-colors"
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Add to Cart Button */}
                                    <button
                                        onClick={() => handleCart(product)}
                                        className="w-full bg-text hover:bg-them text-white font-semibold py-3 rounded-md shadow hover:shadow-md transition-all"
                                    >
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>

    )
}

export default SinglePage
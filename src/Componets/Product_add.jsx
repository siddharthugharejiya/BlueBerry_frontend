import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { product_add_action, product_edite_action } from '../Redux/action';
import { XIcon, PhotographIcon, LinkIcon, PlusIcon, TrashIcon } from '@heroicons/react/outline';
import AdminPanel from './AdminPanel';
import { useNavigate } from 'react-router-dom';

const Product_add = () => {
    const dispatch = useDispatch();
    const product_edite = useSelector(state => state.Product_Edite_getting?.data || {});

    const [update, setupdate] = useState(false);
    const [state, setstate] = useState({
        id: "",
        name: "",
        image: [],
        rating: "",
        des: "",
        category: "",
        price: "",
        strike: "",
        quantity: "",
        weight: "",
        tag: "",
    });
    const [imageLink, setImageLink] = useState("");
    const [activeTab, setActiveTab] = useState("upload")

    // Clean up object URLs when component unmounts
    useEffect(() => {
        return () => {
            state.image.forEach(img => {
                if (img.startsWith('blob:')) {
                    URL.revokeObjectURL(img);
                }
            });
        };
    }, [state.image]);


    useEffect(() => {
        if (product_edite?.message) {
            setstate({
                id: product_edite.message._id || "",
                name: product_edite.message.name || "",
                image: product_edite.message.image || [],
                rating: product_edite.message.rating || "",
                des: product_edite.message.des || "",
                category: product_edite.message.category || "",
                price: product_edite.message.price || "",
                strike: product_edite.message.strike || "",
                weight: product_edite.message.weight || "",
                tag: product_edite.message.tag || "",
            });
            setupdate(true);
        }
    }, [product_edite]);

    const handlechange = (e) => {
        const { name, value } = e.target;
        setstate(prev => ({ ...prev, [name]: value }));
    };

    const handleImageLink = (e) => {
        e.preventDefault();
        if (imageLink.trim() !== "") {
            setstate(prev => ({
                ...prev,
                image: [...prev.image, imageLink.trim()],
            }));
            setImageLink("");
        }
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const urls = files.map(file => URL.createObjectURL(file));
        setstate(prev => ({
            ...prev,
            image: [...prev.image, ...urls],
        }));
    };

    const removeImage = (index) => {
        const newImages = [...state.image];
        const removed = newImages.splice(index, 1);


        if (removed[0].startsWith('blob:')) {
            URL.revokeObjectURL(removed[0]);
        }

        setstate(prev => ({
            ...prev,
            image: newImages,
        }));
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        if (!state.name || state.image.length === 0) {
            alert("Please provide at least a name and one image");
            return;
        }


        if (update) {
            dispatch(product_edite_action(state.id, state))
            setstate({
                id: "",
                name: "",
                image: [],
                rating: "",
                des: "",
                category: "",
                price: "",
                strike: "",
                quantity: "",
                weight: "",
                tag: "",
            })
        } else {
            dispatch(product_add_action(state));
            setstate({
                id: "",
                name: "",
                image: [],
                rating: "",
                des: "",
                category: "",
                price: "",
                strike: "",
                quantity: "",
                weight: "",
                tag: "",
            })
        }
    };

    return (
        <>

            <div className="max-w-4xl mx-auto p-6 bg-white  rounded-xl mt-8 mb-10">
                <form onSubmit={handlesubmit} className="space-y-6">
                    <div className="border-b border-gray-200 pb-4">
                        <h2 className="text-3xl font-bold text-gray-800 text-center">
                            {update ? "Update Product" : "Add New Product"}
                        </h2>
                    </div>

                    {/* Product Name */}
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Product Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={state.name}
                            onChange={handlechange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="Enter product name"
                            required
                        />
                    </div>

                    {/* Images Section */}
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Product Images <span className="text-red-500">*</span>
                        </label>

                        {/* Tab Navigation */}
                        <div className="flex border-b border-gray-200">
                            <button
                                type="button"
                                className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === 'upload' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                                onClick={() => setActiveTab('upload')}
                            >
                                <PhotographIcon className="h-5 w-5 mr-2" />
                                Upload Images
                            </button>
                            <button
                                type="button"
                                className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === 'link' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                                onClick={() => setActiveTab('link')}
                            >
                                <LinkIcon className="h-5 w-5 mr-2" />
                                Add Image Links
                            </button>
                        </div>

                        {/* Upload Tab */}
                        {activeTab === 'upload' && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <PhotographIcon className="h-10 w-10 text-gray-400 mb-2" />
                                            <p className="text-sm text-gray-500">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 5MB each)</p>
                                        </div>
                                        <input
                                            type="file"
                                            multiple
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* Link Tab */}
                        {activeTab === 'link' && (
                            <div className="space-y-4">
                                <div className="flex">
                                    <input
                                        type="text"
                                        value={imageLink}
                                        onChange={(e) => setImageLink(e.target.value)}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        placeholder="Paste image URL"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleImageLink}
                                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
                                    >
                                        <PlusIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Image Previews */}
                        {state.image.length > 0 && (
                            <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Images ({state.image.length})</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {state.image.map((img, i) => (
                                        <div key={i} className="relative group">
                                            <img
                                                src={img}
                                                alt={`preview-${i}`}
                                                className="w-full h-24 object-cover rounded-lg border border-gray-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(i)}
                                                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Rating */}
                    <div className="space-y-2">
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                            Rating
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                id="rating"
                                name="rating"
                                value={state.rating}
                                onChange={handlechange}
                                min="1"
                                max="5"
                                step="0.1"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                placeholder="1-5"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <select
                            id="category"
                            onChange={handlechange}
                            value={state.category}
                            name="category"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        >
                            <option value="">Select a category</option>
                            <option value="all">All</option>
                            <option value="snack">Snack & Spices</option>
                            <option value="vegetable">Vegetable</option>
                            <option value="fruit">Fruit</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label htmlFor="des" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="des"
                            name="des"
                            value={state.des}
                            onChange={handlechange}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="Enter product description"
                        />
                    </div>

                    {/* Pricing */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                Price <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={state.price}
                                    onChange={handlechange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                    required
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                                    $
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="strike" className="block text-sm font-medium text-gray-700">
                                Original Price (for discount)
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    id="strike"
                                    name="strike"
                                    value={state.strike}
                                    onChange={handlechange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                                    $
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                                Weight/Size
                            </label>
                            <input
                                type="text"
                                id="weight"
                                name="weight"
                                value={state.weight}
                                onChange={handlechange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                placeholder="e.g., 500g, 1kg"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="tag" className="block text-sm font-medium text-gray-700">
                                Tag
                            </label>
                            <input
                                type="text"
                                id="tag"
                                name="tag"
                                value={state.tag}
                                onChange={handlechange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                placeholder="e.g., Organic, Gluten-free"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                        >
                            {update ? "Update Product" : "Add Product"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Product_add;
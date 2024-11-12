"use client"
import React from "react";

export default function ProductPage({ params }) {
    // Unwrap the Promise is now a promise

    const unwrappedParams = React.use(params);
    const { id } = unwrappedParams;

    const myproducts = JSON.parse(localStorage.getItem('productdetails')) || [];

    const checkProduct = myproducts.find((product) => product.id === parseInt(id));

    if (!checkProduct) {
        return <div className="text-center">Product not found</div>;
    }
    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Image */}
                <div className="flex justify-center">
                    <img src={checkProduct.image} alt={checkProduct.category} className="w-full h-auto rounded-lg shadow-lg" />
                </div>

                {/* Product Details */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">{checkProduct.category}</h1>
                    <p className="text-gray-600 mb-4">{checkProduct.description}</p>
                    <span className="text-xl font-semibold text-green-600">${checkProduct.price}</span>

                    {/* Add to Cart Button */}
                    <button className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-[4px] hover:bg-white hover:text-black transition duration-200 ml-4">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
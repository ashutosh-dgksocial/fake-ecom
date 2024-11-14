"use client"
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
export default function ProductPage({ params }) {
    // Unwrap the Promise is now a promise

    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem("cartStore");
        if (storedCart) {
            setCartData(JSON.parse(storedCart));
        }
    }, []);
    useEffect(() => {
        if (cartData.length > 0) {
            localStorage.setItem("cartStore", JSON.stringify(cartData));
        }
    }, [cartData]);

    const handleAddToCart = (item) => {
        const itemExists = cartData.some(
            (alreadyInCart) => alreadyInCart.id === item.id
        );
        if (!itemExists) {
            setCartData([...cartData, item]);
            toast.success("Item added to the cart successfully", { autoClose: 1000 });
        } else {
            toast.error("Item is already in the cart", { autoClose: 1000 });
        }
    };


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
                    <button className="border p-2 hover:bg-white hover:text-black ml-4"
                        onClick={() => handleAddToCart(checkProduct)}
                    >add to cart
                    </button>
                </div>
            </div>
        </div>
    );
}
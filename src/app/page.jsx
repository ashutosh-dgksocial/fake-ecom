"use client";
import { useEffect, useState } from "react";
import { REACT_APP_PRODUCTS_API } from "./utils/utils";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const fetchProduct = () => {
      try {
        fetch(REACT_APP_PRODUCTS_API)
          .then((res) => res.json())
          .then((json) => {
            // console.log("json", json);
            setProducts(json);
          });
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProduct();

    // const storeCart = localStorage.setItem('cartData',)
  }, []);


  useEffect(() => {
    if (cartData.length > 0) {
      localStorage.setItem('cartStore', JSON.stringify(cartData));
    }
  }, [cartData]);

  const handleAddTocard = (item) => {
    const itemExists = cartData.some(alreadyInCart => alreadyInCart.id === item.id);
    // console.log("somecheck", itemExists)
    if (!itemExists) {
      setCartData([...cartData, item]);
      // console.log("there is only one item", item);
      // alert('added added successfully ✔')
    } else {
      alert('already in the cart ❌');
    }

  }

  if (!products.length) {
    return <p className="text-center">FakeAPI is slow it will take some time count 4321...</p>;
  }
  return (
    <div className="p-4 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border-2 rounded-lg p-4 shadow-lg shadow-slate-600 bg-[#0e0e0e]">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="font-semibold text-lg h-[60px] line-clamp-2">{product.title}</h2>
            <p className="text-gray-700 text-sm mt-2">${product.price.toFixed(2)}</p>
            <p className="text-gray-500 text-xs mt-1">{product.category}</p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500">⭐</span>
              <p className="ml-1 text-sm">{product.rating.rate} ({product.rating.count} reviews)</p>
            </div>
            <button onClick={() => handleAddTocard(product)} type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-[5px] text-sm px-5 py-2.5 mt-3 disabled:bg-gray-400">
              AddToCart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
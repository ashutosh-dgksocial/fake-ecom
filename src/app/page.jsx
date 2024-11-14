"use client";
import { useEffect, useState } from "react";
import { REACT_APP_PRODUCTS_API } from "./utils/utils";
import Link from "next/link";
import { toast } from "react-toastify";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [wishList, setWishlist] = useState(() => {
    const checkLocalwishlist =
      JSON.parse(localStorage.getItem("wishlist")) ?? [];
    return checkLocalwishlist ? checkLocalwishlist : [];
  });

  useEffect(() => {
    if (wishList.length < 0) {
      return;
    }
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  useEffect(() => {
    const fetchProduct = () => {
      try {
        fetch(REACT_APP_PRODUCTS_API)
          .then((res) => res.json())
          .then((json) => {
            setProducts(json);
            localStorage.setItem("productdetails", JSON.stringify(json));
          });
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProduct();
  }, []);

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

  const handleInput = (event) => {
    setSearchQuery(event.target.value);
  };

  const filterProducts = products.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (item) => {
    const itemExists = cartData.some(
      (alreadyInCart) => alreadyInCart.id === item.id
    );
    if (!itemExists) {
      setCartData([...cartData, item]);
      toast.success("Item added to the cart successfully", { autoClose: 1000 });
    } else {
      alert("already in the cart ❌");
    }
  };

  const handleWishlist = (item) => {
    const mywish = wishList.some((localWish) => localWish.id === item.id);
    if (!mywish) {
      // Add to wishlist
      setWishlist([...wishList, item]);
      toast.success("Item added to the WishList successfully", {
        autoClose: 1000,
      });
    } else {
      // Remove from wishlist
      const updatedWishlist = wishList.filter((localWish) => localWish.id !== item.id);
      setWishlist(updatedWishlist);
      toast.info("Item removed from the WishList", { autoClose: 1000 });
    }
  };

  return (
    <div className="p-4 ">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex mb-4 ">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInput}
            placeholder="Search for products..."
            className="border border-gray-300 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
          />
          <button className="bg-orange-700 text-white rounded-r-md p-2 hover:bg-orange-600 ">
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filterProducts.map((product) => {
          const isAddedToCart = cartData.some(
            (cartItem) => cartItem.id === product.id
          );
          return (
            <div
              key={product.id}
              className="border-2 rounded-lg p-4 shadow-lg shadow-slate-600 bg-[#0e0e0e]"
            >
              <Link href={`/product-details/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover mb-4"
                />
              </Link>

              <Link href={`/product-details/${product.id}`}>
                <h2 className="font-semibold text-lg h-[60px] line-clamp-2">
                  {product.title}
                </h2>
              </Link>
              <p className="text-green-700 text-sm mt-2">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-gray-500 text-xs mt-1">{product.category}</p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-500">⭐</span>
                <p className="ml-1 text-sm">
                  {product.rating.rate} ({product.rating.count} reviews)
                </p>
              </div>
              {/* wishlist button */}
              <button
                onClick={() => handleWishlist(product)}
                className={`rounded-full h-10 w-10 flex justify-center items-center border cursor-pointer 
                 ${wishList.some((localWish) => localWish.id === product.id)
                    ? "bg-red-500 cursor-not-allowed border-2 border-yellow-600"
                    : "border-red hover:bg-red-500 hover:border-white"
                  }
                  duration-300`}
              >
                ❤
              </button>

              <button
                onClick={() => handleAddToCart(product)}
                type="button"
                className={`focus:outline-none text-white font-medium rounded-[5px] text-sm px-5 py-2.5 mt-3 ${isAddedToCart
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300"
                  }`}
                disabled={isAddedToCart}
              >
                {isAddedToCart ? "Already Added" : "Add to Cart"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

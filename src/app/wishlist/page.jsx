"use client"
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const wishlist = () => {
  const [wishList, setWishlist] = useState(() => {
    const checkLocalwishlist = JSON.parse(localStorage.getItem('wishlist')) ?? [];
    return checkLocalwishlist ? checkLocalwishlist : []
  });
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

  // console.log('wishList', wishList)

  const handleRemove = (pId) => {
    const filterItem = wishList.filter(Product => Product.id !== pId)
    setWishlist(filterItem)
    localStorage.setItem('wishlist', JSON.stringify(filterItem));
    toast.error("Item remove from cart", { autoClose: 1000 })
  }

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

  return (
    <div className="">
      <h2 className="text-center text-2xl">My Wish list ({wishList.length})</h2>
      <br />
      <div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>

                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Unit Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Stock status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
                <th scope="col" className="px-6 py-3">
                  Remove
                </th>
              </tr>
            </thead>
            {/* api assign here */}
            <tbody>
              {wishList.map((item, index) => (
                <tr key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    !{item.title}
                  </th>
                  <td className="px-6 py-4">${item.price}</td>
                  <td className="px-6 py-4">In stock</td>
                  <td className="px-6 py-4">
                    <button className="border p-2 hover:bg-white hover:text-black ml-4"
                      onClick={() => handleAddToCart(item)}
                    >add to cart</button>
                  </td>
                  <td className="px-6 py-4"><button onClick={() => handleRemove(item.id)}>❌</button></td>

                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default wishlist;

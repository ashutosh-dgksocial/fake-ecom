"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";

const Cart = () => {
  const [localItem, setLocalItem] = useState([]);

  useEffect(() => {
    const dataLocal = localStorage.getItem('cartStore') ?? "[]";
    if (dataLocal) {
      const parseData = JSON.parse(dataLocal);
      // quantity property
      const itemsWithQuantity = parseData.map(item => ({
        ...item,
        quantity: item.quantity || 1 // if quanittyyy empty
      }));
      setLocalItem(itemsWithQuantity);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartCount', JSON.stringify(localItem.length));
  }, [localItem]);

  // so quantity is not exist on the LocalItem but we are here concatenating quantity here and also access the quantity with prevItems. quantity
  const handleIncrease = (productId) => {
    setLocalItem((Local) => (Local.map((prevItems) => (
      prevItems.id === productId ? { ...prevItems, quantity: prevItems.quantity + 1 } : prevItems
    )))
    );
  };

  const handleDecrease = (pId) => {
    setLocalItem((items) => {
      const a = items.map((product) => {
        const b = product.id === pId &&
          product.quantity > 1 ?
          { ...product, quantity: product.quantity - 1 } : product
        return b;
      })
      return a
    })
  }
  const handleRemove = (pId) => {
    const filterItem = localItem.filter(Product => Product.id !== pId)
    setLocalItem(filterItem)
    localStorage.setItem('cartStore', JSON.stringify(filterItem));
    toast.error("Item remove from cart", { autoClose: 1000 })

  }
  // Calculate total 
  const calculateTotalPrice = () => {
    let total = 0;
    localItem.forEach(i => {
      total += i.price * i.quantity;
      console.log(i.quantity);
    })
    return total.toFixed(2);
  };
  if (localItem.length <= 0) {
    return (
      <div>
        <h1 className='text-center text-2xl'>Your card is empty Go Home</h1>
        <br />
        <Link href={'/'}
          className="bg-white rounded-[2px] hover:text-black text-black px-4 p-2 border cursor-pointer mt-4 border-black hover:bg-orange-500 hover:border-orange-500 duration-300 text-center flex justify-center mx-auto w-[20%]">
          ⬅ HOME
        </Link>
      </div>
    )
  }
  return (
    <div className=''>
      <h2 className='text-center text-2xl'>My Cart ({localItem.length} Items)</h2>
      <br />
      <div className='flex gap-5'>
        <div className='w-[70%]'>
          <table className='min-w-full border-collapse'>
            <thead>
              <tr className='bg-gray-200 text-black'>
                <th className='border px-4 py-2'>Item</th>
                <th className='border px-4 py-2'>Price</th>
                <th className='border px-4 py-2'>Quantity</th>
                <th className='border px-4 py-2'>Total-price</th>
                <th className='border px-4 py-2'>Remove</th>
              </tr>
            </thead>
            <tbody>

              {
                localItem.length > 0 &&
                localItem.map((product) => {
                  return (
                    <tr key={product.id} className='text-center'>
                      {/* Item-title */}
                      <td className='border px-4 py-2 text-start'>{product.title}</td>
                      {/* Item-price */}
                      <td className='border px-4 py-2'>
                        ${product.price.toFixed(2)}</td>
                      <td className='border px-4 py-2'>
                        {/* Quantity */}
                        <div className='flex justify-between'>
                          <button className='cursor-pointer' onClick={() => handleDecrease(product.id)}>➖</button>
                          <p className='border px-2 py-1 mx-2 w-[30px]'>
                            {product.quantity}
                          </p>
                          <button className='cursor-pointer' onClick={() => handleIncrease(product.id)}>➕</button>
                        </div>
                      </td>
                      {/* perProduct price */}
                      <td className='border px-4 py-2 w-[100px]'>
                        ${product.price ? (product.price * product.quantity).toFixed(2) : '0.00'}
                      </td>
                      <td className='border px-4 py-2'>
                        <span className='cursor-pointer'
                          onClick={() => handleRemove(product.id)}
                        >❌</span>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        {/* checkout */}
        <div className='w-[30%] h-[150px] border-2 px-4'>
          <p className='flex justify-between'>
            <span className='text-2xl'>Grand Total:</span>
            <span className='text-2xl'>
              ${calculateTotalPrice()}
            </span>
          </p>
          <br />
          <button
            className="bg-white rounded-[2px] hover:text-black text-black px-4 p-2 border cursor-pointer mt-4 border-black hover:bg-orange-500 hover:border-orange-500 duration-300 text-center flex justify-center mx-auto">
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
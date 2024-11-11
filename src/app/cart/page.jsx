"use client"
import React, { useEffect, useState } from 'react';

const Cart = () => {
  const [localItem, setLocalItem] = useState([]);

  useEffect(() => {
    const dataLocal = localStorage.getItem('cartStore') ?? "[]"
    if (dataLocal) {
      console.log("localItem", localItem)
      const parseData = JSON.parse(dataLocal)

      console.log("parseData", parseData)
      setLocalItem(...localItem, parseData)
    }
  }, [])

  useEffect(() => {
    console.log('checkingLocalItem', localItem)
  }, [localItem])
  return (
    <div className=''>
      <h2 className='text-center text-2xl'>My Cart ({localItem.length} Items)</h2>
      <br />
      <table className='min-w-full border-collapse'>
        <thead>
          <tr className='bg-gray-200 text-black'>
            <th className='border px-4 py-2'>Item</th>
            <th className='border px-4 py-2'>Price</th>
            <th className='border px-4 py-2'>Quantity</th>
            <th className='border px-4 py-2'>Total</th>
          </tr>
        </thead>
        <tbody>
          {/* MAP CART */}

          {
            localItem &&
            localItem.map((product, index) => (
              <tr key={index} className='text-center'>
                <td className='border px-4 py-2 text-start'>{product.title}</td>
                <td className='border px-4 py-2'>${product.price}</td>
                <td className='border px-4 py-2'>{1}</td>
                <td className='border px-4 py-2'>$10.00</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Cart;
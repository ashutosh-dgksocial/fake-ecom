// "use client"
// // components/SearchComponent.js
// import { useEffect, useState } from 'react';
// // import Link from 'next/link';

// export default function SearchComponent({ products }) {
//     const [value, setValue] = useState("")

//     const handleInput = (event) => {
//         setValue(event.target.value)
//         console.log(event.target.value)
//     }
//     const handleSearch = () => {
//         alert(value)
//         setValue('')
//     }
//     useEffect(() => {
//         console.log('products', products)
//     }, [])

//     return (
//         <div className="flex flex-col items-center">
//             <div className="flex mb-4">
//                 <input
//                     type="text"
//                     value={value}
//                     onChange={handleInput}
//                     placeholder="Search for products..."
//                     className="border border-gray-300 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
//                 />
//                 <button
//                     onClick={handleSearch}
//                     className="bg-orange-700 text-white rounded-r-md p-2 hover:bg-orange-600"
//                 >
//                     Search
//                 </button>
//             </div>

//         </div>
//     );
// }
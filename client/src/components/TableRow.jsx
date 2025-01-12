import React from 'react';

function TableRow({ index, subCode, mainItem, quantity, location, condition, price, lifespan, reason }) {
  return (
    <tr className="font-prompt hover:bg-gray-100 odd:bg-white even:bg-gray-50 transition duration-200 ease-in-out">
      <td className="p-2 border border-gray-300 rounded-l-lg">{index}</td>
      <td className="p-2 border border-gray-300">{subCode}</td>
      <td className="p-2 border border-gray-300">{mainItem}</td>
      <td className="p-2 border border-gray-300">{quantity}</td>
      <td className="p-2 border border-gray-300">{location}</td>
      <td className="p-2 border border-gray-300">{condition}</td>
      <td className="p-2 border border-gray-300">{price}</td>
      <td className="p-2 border border-gray-300">{lifespan}</td>
      <td className="p-2 border border-gray-300 rounded-r-lg">{reason}</td>
    </tr>
  );
}

export default TableRow;

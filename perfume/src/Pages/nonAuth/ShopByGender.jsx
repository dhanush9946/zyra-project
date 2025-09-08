import React from 'react'

function ShopByGender({ onSelect }) {
  return (
    <div className="mt-12">
      {/* Heading */}
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-8">
        Shop By Gender
      </h1>

      {/* All Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => onSelect('All')}
          className="px-6 py-2 rounded-full bg-pink-600 text-white font-semibold shadow-md hover:bg-pink-700 transition"
        >
          Show All Perfumes
        </button>
      </div>

      {/* Grid */}
      <div className="max-w-3xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Women */}
          <div
            onClick={() => onSelect('Women')}
            className="relative group overflow-hidden rounded-xl shadow-md bg-gray-100 flex items-center justify-center cursor-pointer"
          >
            <img
              src="https://images-static.nykaa.com/uploads/8ca1ac3d-4f4f-4909-bc08-ec11ea8b7127.jpg?tr=cm-pad_resize,w-450"
              alt="shop by women"
              className="w-full h-[140px] md:h-[160px] lg:h-[180px] object-cover transform group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
              <h2 className="text-white text-base md:text-lg font-semibold">
                Shop Women
              </h2>
            </div>
          </div>

          {/* Men */}
          <div
            onClick={() => onSelect('Men')}
            className="relative group overflow-hidden rounded-xl shadow-md bg-gray-100 flex items-center justify-center cursor-pointer"
          >
            <img
              src="https://images-static.nykaa.com/uploads/092848b8-7935-434d-8a71-ee88701577a7.jpg?tr=cm-pad_resize,w-450"
              alt="shop by men"
              className="w-full h-[140px] md:h-[160px] lg:h-[180px] object-cover transform group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
              <h2 className="text-white text-base md:text-lg font-semibold">
                Shop Men
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopByGender

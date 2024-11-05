import React from "react";
import Image from "next/image";

const RecommendProducts = () => {
  return (
    <div className="bg-gray-50 mt-10 w-full h-full py-10">
      <h1 className="text-3xl text-gray-800 text-center pb-4 font-bold">
        Gợi ý sản phẩm
      </h1>

      <div className="grid grid-cols-4 gap-4 container mt-2">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="flex flex-col gap-3">
            <div>
              <Image
                alt="product images"
                src={
                  "https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/August2022/DSC00703_copy.jpg"
                }
                className="w-full rounded-lg"
                sizes="100vw"
                width={0}
                height={0}
              />
            </div>
            <div className="flex flex-col text-sm">
              <p>Áo Polo Nam Excool Woven</p>
              <p className="font-bold">109.000đ</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendProducts;

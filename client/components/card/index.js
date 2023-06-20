import Image from "next/image";
import React from "react";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export default function Card({ title, overView, genres, score, poster, size }) {
  return (
    <div className={`relative ${size} rounded-2xl overflow-hidden shadow-card cursor-pointer card`}>
      <div className="poster">
        <Image
          src={publicRuntimeConfig.posterUrl + poster}
          alt={title}
          layout="fill"
          objectFit="contain"
          className="relative w-full h-full"
        />
      </div>
    </div>
  );
}

import { useState } from "react";
import Image from "next/image";
// svg
import placeHolder from "assets/images/placeholder.jpg";

export default function CustomCarouselImage({ src, alt, className, ...props }) {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {loading && (
        <Image className={`${className}`} src={placeHolder} alt="placeholder" priority {...props} />
      )}
      <Image
        className={`duration-700 ease-in-out ${
          loading ? "grayscale blur-2xl scale-110" : "grayscale-0 blur-0 scale-100"
        } ${className}`}
        src={src}
        alt={alt}
        onLoadingComplete={() => setLoading(false)}
        {...props}
      />
    </>
  );
}

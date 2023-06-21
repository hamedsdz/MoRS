import { useRouter } from "next/router";
// components
import Image from "next/image";
import getConfig from "next/config";
import Caption from "components/caption";
import { FaStar } from "react-icons/fa";
import { Tag } from "antd";
import Link from "next/link";
import CustomButton from "components/button";

const { publicRuntimeConfig } = getConfig();

export default function Card({ id, title, overView, genres, score, poster, size }) {
  const router = useRouter();
  return (
    <div
      className={`relative ${size} rounded-2xl overflow-hidden shadow-card cursor-pointer mx-2 card`}
    >
      <div className="poster">
        <Image
          src={publicRuntimeConfig.posterUrl + poster}
          alt={title}
          layout="fill"
          objectFit="contain"
          className="relative w-full h-full"
          quality={100}
        />
      </div>
      <div className="details">
        <Caption text doTranslate={false}>
          {title ? (title.length > 40 ? `${title.slice(0, 40)}...` : title) : null}
        </Caption>
        {score && (
          <div className="rating flex gap-1 items-start">
            <FaStar className="text-yellow-500" />
            <Caption text doTranslate={false}>
              {score}
            </Caption>
          </div>
        )}
        {genres && genres.length
          ? genres.slice(0, 2).map((genre, key) => (
              <Link href={`/movies?genre=${genre}`}>
                <Tag key={key} color="#2db7f5" className="text-[.5rem]">
                  {genre}
                </Tag>
              </Link>
            ))
          : null}
        <span className="overview mt-3">
          {overView && (
            <Caption
              paragraph
              ellipsis={{
                rows: 3,
                expandable: false,
              }}
              doTranslate={false}
            >
              {overView}
            </Caption>
          )}
          <CustomButton
            className="w-full items-center justify-center"
            onClick={() => router.push(`/movies/${id}`)}
          >
            more
          </CustomButton>
        </span>
      </div>
    </div>
  );
}

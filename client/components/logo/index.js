import Image from "next/image";

export default function Logo({ LogoFile, alt = "logo", className, ...props }) {
  return <Image src={LogoFile} alt={alt} className={className} {...props} />;
}

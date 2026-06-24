import Image from "next/image";

type CountryFlagProps = {
  countryName: string;
  flagEmoji?: string;
  flagImageUrl?: string;
  className?: string;
  imageClassName?: string;
  emojiClassName?: string;
};

export function CountryFlag({
  countryName,
  flagEmoji,
  flagImageUrl,
  className = "h-12 w-16",
  imageClassName = "object-contain",
  emojiClassName = "text-5xl",
}: CountryFlagProps) {
  if (flagImageUrl) {
    return (
      <span className={`relative block overflow-hidden ${className}`}>
        <Image src={flagImageUrl} alt={`${countryName} flag`} fill className={imageClassName} />
      </span>
    );
  }

  if (flagEmoji) {
    return <span className={emojiClassName}>{flagEmoji}</span>;
  }

  return null;
}

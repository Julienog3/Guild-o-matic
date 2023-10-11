import React from 'react';

interface BannerProps {
  url: string;
  alt?: string;
}

const Banner = ({ url, alt }: BannerProps) => {
  return (
    <div className="absolute overflow-hidden rounded-lg z-0 top-0 left-0 w-full h-full guild-card__image">
      <img
        className="absolute h-full object-cover w-full"
        loading="lazy"
        src={url}
        alt={alt}
      />
    </div>
  );
};

export default Banner;

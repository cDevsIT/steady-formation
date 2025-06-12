'use client';

import NextImage from 'next/image';
import React from 'react';

interface CustomImageProps {
  url: string;
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
}

const Image: React.FC<CustomImageProps> = ({
    url,
    className = '',
    style = {},
    alt = 'image',
    width = 1000,
    height = 1000,
    fill = false,
    priority = false,
}) => {
    return (
        <NextImage
                className={className} 
                style={style}
                src={url}
                alt={alt}
                width={fill ? undefined : width}
                height={fill ? undefined : height}
                fill={fill}
                priority={priority}
            />
    );
};

export default Image;

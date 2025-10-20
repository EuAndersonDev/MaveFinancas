import React from "react";

type IconProps = {
  src: string;
  size?: number;
  color?: string;
  alt?: string;
};

export default function Icon({ src, size = 20, color = "#ffffff", alt = "" }: IconProps) {
  const style: React.CSSProperties = {
    width: size,
    height: size,
    backgroundColor: color,
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    display: "inline-block",
  };
  return <span style={style} role="img" aria-label={alt} />;
}

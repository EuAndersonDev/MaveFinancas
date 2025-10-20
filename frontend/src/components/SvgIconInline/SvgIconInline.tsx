"use client";
import React from "react";

type SvgIconInlineProps = {
  src: string;
  size?: number;
  color?: string;
  alt?: string;
  className?: string;
};

export default function SvgIconInline({ src, size = 20, color = "currentColor", alt = "", className }: SvgIconInlineProps) {
  const [svg, setSvg] = React.useState<string | null>(null);

  React.useEffect(() => {
    let active = true;
    fetch(src)
      .then((r) => r.text())
      .then((text) => {
        if (!active) return;
        // Forçar stroke/fill para currentColor, preservando 'none'
        let patched = text
          .replace(/(stroke)="(?!none)[^"]*"/g, 'stroke="currentColor"')
          .replace(/(fill)="(?!none)[^"]*"/g, 'fill="currentColor"');
        // Garantir width/height conforme size mantendo viewBox
        patched = patched.replace(
          /<svg(\s[^>]*?)?>/,
          (match) => {
            const hasWidth = /\swidth=/.test(match);
            const hasHeight = /\sheight=/.test(match);
            let tag = match.replace(/>$/, "");
            if (!hasWidth) tag += ` width=\"${size}\"`;
            if (!hasHeight) tag += ` height=\"${size}\"`;
            return tag + ">";
          }
        );
        setSvg(patched);
      })
      .catch(() => setSvg(null));
    return () => {
      active = false;
    };
  }, [src, size]);

  return (
    <span
      className={className}
      style={{ display: "inline-flex", color, lineHeight: 0, width: size, height: size }}
      role="img"
      aria-label={alt}
      dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
    />
  );
}

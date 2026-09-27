import * as React from "react";

type StaticImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> & {
  readonly src: string;
  readonly alt: string;
};

export function StaticImage({ decoding = "async", loading = "lazy", ...props }: StaticImageProps) {
  return React.createElement("img", { decoding, loading, ...props });
}

import Image from "deco-sites/std/components/Image.tsx";

// import {} from '$live/std/commerce/types.ts'
import { useState } from "preact/hooks";

export type IProps = {
  url?: string;
  alternateName?: string;
};

export interface IThumbnail {
  images: Array<{
    url?: string;
    alternateName?: string;
  }>;
}

const Thumbnail = (images: IThumbnail) => {
  const [front] = images?.images ?? [];
  const [imageState, setImageState] = useState<IProps>(front as IProps);

  const handleClick = (img: IProps) => {
    setImageState(img);
  };

  return (
    <div class="flex flex-col px-4  sm:px-0">
      <Image
        style={{ aspectRatio: "360 / 500" }}
        class="snap-center h-[400px] sm:h-[500px] md:h-[600px] "
        sizes="(max-width: 640px) 100vw, 30vw"
        src={imageState.url!}
        alt={imageState.alternateName}
        width={620}
        height={640}
        // Preload LCP image for better web vitals
        preload={false}
        loading={"lazy"}
      />

      <div class="flex mt-2 gap-1">
        {images?.images?.map((img: IProps, index: number) => (
          <button onClick={() => handleClick(img)}>
            <Image
              style={{ aspectRatio: "360 / 500" }}
              class="snap-center min-w-[100vw] min-w-0 w-auto"
              sizes="70px"
              src={img.url!}
              alt={img.alternateName}
              width={70}
              height={70}
              // Preload LCP image for better web vitals
              preload={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Thumbnail;

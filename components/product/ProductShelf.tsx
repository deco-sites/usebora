import ProductCard from "$store/islands/ProductCard.tsx";
import Container from "$store/components/ui/Container.tsx";
import Text from "$store/components/ui/Text.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderControllerJS from "$store/islands/SliderJS.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useId } from "preact/hooks";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

export interface Props {
  title: string;
  products: LoaderReturnType<Product[] | null>;
  itemsPerPage?: number;
}

function ProductShelf({
  title,
  products,
}: Props) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <Container
      id={id}
      class="grid grid-cols-[48px_1fr_48px] grid-rows-[48px_1fr_48px_1fr] py-10 px-0 sm:px-5"
    >
      <h2 class="row-start-1 col-span-full text-base font-bold px-4 sm:px-0">
        <Text variant="heading-2">{title}</Text>
      </h2>

      <Slider
        class="gap-6 col-span-full row-start-2 row-end-5 overflow-x-hidden"
        snap="snap-center sm:snap-start block first:ml-6 sm:first:ml-0 last:mr-6 sm:last:mr-0"
      >
        {products?.map((product) => (
          <div class="min-w-[270px] max-w-[270px] sm:min-w-[292px] sm:max-w-[292px]">
            <ProductCard product={product} />
          </div>
        ))}
      </Slider>

      <>
        <div class=" relative block z-10 col-start-1 row-start-3">
          <div class="absolute md:right-12 rounded-none border-none bg-transparent">
            <Button
              variant="icon"
              data-slide="prev"
              aria-label="Previous item"
              class="bg-transparent rounded-none border-none"
            >
              <Icon
                size={24}
                id="ChevronLeft2"
                strokeWidth={3}
                class="text-2xl"
              />
            </Button>
          </div>
        </div>
        <div class=" relative block z-10 col-start-3 row-start-3">
          <div class="absolute md:left-12 rounded-none border-none bg-transparent">
            <Button
              variant="icon"
              data-slide="next"
              aria-label="Next item"
              class="bg-transparent rounded-none border-none"
            >
              <Icon
                size={24}
                id="ChevronRight2"
                strokeWidth={3}
                class="text-2xl"
              />
            </Button>
          </div>
        </div>
      </>

      <SliderControllerJS rootId={id} />
    </Container>
  );
}

export default ProductShelf;

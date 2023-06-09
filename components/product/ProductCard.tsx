import Image from "deco-sites/std/components/Image.tsx";
import Text from "$store/components/ui/Text.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

import VariantSelectorShelf from "$store/islands/ProductVariantShelf.tsx";
/**
 * A simple, inplace sku selector to be displayed once the user hovers the product card
 * It takes the user to the pdp once the user clicks on a given sku. This is interesting to
 * remove JS from the frontend
 */
function Sizes(product: Product) {
  const possibilities = useVariantPossibilities(product);
  const options = Object.entries(
    possibilities["TAMANHO"] ?? possibilities["Tamanho"] ?? {},
  );

  return (
    <ul class="flex justify-center items-center gap-2">
      {options.map(([url, value]) => (
        <a href={url}>
          <Avatar
            class="bg-default"
            variant="abbreviation"
            content={value}
            disabled={url === product.url}
          />
        </a>
      ))}
    </ul>
  );
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;
}

function ProductCard({ product, preload }: Props) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
  } = product;
  const [front, back] = images ?? [];
  const { listPrice, price, seller } = useOffer(offers);

  return (
    <div
      id={`product-card-${productID}`}
      class="w-full group"
    >
      <a aria-label="product link">
        <div class="relative w-full">
          <a href={url}>
            <Image
              src={front.url!}
              alt={front.alternateName}
              width={200}
              height={279}
              class="rounded w-full group-hover:hidden"
              preload={preload}
              loading={preload ? "eager" : "lazy"}
              sizes="(max-width: 640px) 50vw, 20vw"
            />
            <Image
              src={back?.url ?? front.url!}
              alt={back?.alternateName ?? front.alternateName}
              width={200}
              height={279}
              class="rounded w-full hidden group-hover:block"
              sizes="(max-width: 640px) 50vw, 20vw"
            />
          </a>
          {seller && (
            <div
              class="absolute bottom-0 hidden sm:group-hover:flex flex-col gap-2 w-full p-2 bg-opacity-10"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(2px)",
              }}
            >
              {/* <Sizes {...product} /> */}
              <VariantSelectorShelf
                product={product}
              />
              {/* <Button as="a" href={product.url}>Visualizar Produto</Button> */}
            </div>
          )}
        </div>

        <div class="flex flex-col gap-1 py-2">
          <Text
            class="overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-gray-500 mb-2.5 mt-3 text-center"
            variant="caption"
          >
            {name}
          </Text>
          <div class="flex items-center gap-2 justify-center">
            {
              /* <Text
              class="line-through"
              variant="list-price"
              tone="subdued"
            >
              {formatPrice(listPrice, offers!.priceCurrency!)}
            </Text> */
            }
            <Text
              variant="caption"
              tone="price"
              class="text-base text-color-primary-green"
            >
              {formatPrice(price, offers!.priceCurrency!)}
            </Text>
          </div>
        </div>
      </a>
    </div>
  );
}

export default ProductCard;

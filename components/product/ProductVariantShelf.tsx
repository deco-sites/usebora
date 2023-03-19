import Text from "$store/components/ui/Text.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import AddToCartButton from "$store/islands/AddToCartButton.tsx";
import { useState } from "preact/hooks";

interface Props {
  product: Product;
}

function VariantSelectorShelf({ product }: Props) {
  const possibilities = useVariantPossibilities(product);
  const [state, setState] = useState(product.productID);
  const { url: currentUrl } = product;

  const getSkuId = (url: string): string => {
    return url.split("skuId=")[1];
  };
  const hancleClick = (url: string) => {
    const id = getSkuId(url);
    setState(id);
  };

  const { seller } = useOffer(product.offers);

  return (
    <ul class="flex flex-col gap-4">
      {Object.keys(possibilities).map((name) => (
        <li class="flex flex-col gap-2">
          {/* <Text variant="caption">{name}</Text> */}
          <ul class="flex flex-row gap-2 items-center justify-center">
            {Object.entries(possibilities[name]).map(([url, value]) => (
              <li>
                <button
                  onClick={() => hancleClick(url)}
                  data-selected={state == getSkuId(url) ? "true" : "false"}
                >
                  <Avatar
                    // deno-lint-ignore no-explicit-any
                    content={value as any}
                    disabled={state == getSkuId(url) ? true : false}
                    variant={name === "COR" ? "color" : "abbreviation"}
                  />
                </button>
              </li>
            ))}
          </ul>
        </li>
      ))}
      <AddToCartButton
        skuId={state}
        sellerId={seller as string}
      />
    </ul>
  );
}

export default VariantSelectorShelf;

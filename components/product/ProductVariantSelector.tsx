import Text from "$store/components/ui/Text.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import AddToCartButton from '$store/islands/AddToCartButton.tsx'
import {useState} from 'preact/hooks'
interface Props {
  product: Product;

}

function VariantSelector({ product }: Props) {
  const possibilities = useVariantPossibilities(product);
  const [state, setState] = useState(product.productID)
  const { url: currentUrl} = product;

  const hancleClick = (url:string)=>{
    const text = url
    const id = text.split("skuId=")[1]

    console.log('id', id)
    setState(id)

  }
  const {seller } = useOffer(product.offers);

  return (
    <ul class="flex flex-col gap-4">
      {Object.keys(possibilities).map((name) => (
        <li class="flex flex-col gap-2">
          <Text variant="caption">{name}</Text>
          <ul class="flex flex-row gap-2">
            {Object.entries(possibilities[name]).map(([url, value]) => (
              <li>
                <button onClick={()=> hancleClick(url)}>
                  <Avatar
                      // deno-lint-ignore no-explicit-any
                      content={value as any}
                      disabled={url === currentUrl}
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

export default VariantSelector;

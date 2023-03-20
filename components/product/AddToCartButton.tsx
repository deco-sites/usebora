import Button from "$store/components/ui/Button.tsx";
import { useAddToCart } from "$store/sdk/useAddToCart.ts";
import { useUI } from "$store/sdk/useUI.ts";
interface Props {
  skuId: string;
  sellerId: string;
}

function AddToCartButton({ skuId, sellerId }: Props) {
  const { quantityProduct } = useUI();
  const props = useAddToCart({
    skuId,
    sellerId,
    quantityProduct,
  });

  return (
    <Button
      {...props}
      class={`w-full bg-color-primary-green py-6 hover:bg-color-primary-green-hover hover:border-none hover:text-white active:border-none active:bg-color-primary-green-hover
    focus-visible:outline-none focus:outline-none border-none rounded-none`}
    >
      Adicionar à Sacola
    </Button>
  );
}

export default AddToCartButton;

import { useUI } from "$store/sdk/useUI.ts";

const Quantity = () => {
  const { quantityProduct } = useUI();
  const handleQuantity = (qdt: number) => {
    if (quantityProduct.value + qdt < 1) {
      return;
    }
    quantityProduct.value = quantityProduct.value + qdt;
  };

  return (
    <>
      <div
        class={`flex h-auto items-center justify-between border-solid border border-gray-700 rounded-sm p-1 min-w-[70px]
            max-w-[70px]`}
      >
        <span
          class="cursor-pointer p-1 text-sm"
          onClick={() => handleQuantity(-1)}
        >
          -
        </span>
        <span class="text-sm">{quantityProduct.value}</span>
        <span
          class="cursor-pointer p-1 text-sm"
          onClick={() => handleQuantity(+1)}
        >
          +
        </span>
      </div>
    </>
  );
};

export default Quantity;

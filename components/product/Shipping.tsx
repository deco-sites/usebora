import { useRef, useState } from "preact/hooks";
import { useUI } from "$store/sdk/useUI.ts";

const Shipping = () => {
  const { quantityProduct } = useUI();
  const [state, setState] = useState();
  const inputRef = useRef<HTMLInputElement>(null);
  // deno-lint-ignore no-explicit-any
  const handleKeyUp = (e: any) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    value = value.slice(0, 8);
    value = value.replace(/^(\d{5})(\d{0,3})?$/, "$1-$2");
    e.target.value = value;
  };

  const handleClick = async () => {
    console.log("entrou");
    const cep = inputRef!.current!.value.replace("-", "");
    const qdt = quantityProduct.value;
    const DataToSend = {
      "items": [{
        "id": 788213576,
        "quantity": qdt,
        "seller": "1",
      }],
      "postalCode": cep,
      "country": "BRA",
    };

    const data = await fetch(
      `https://usebora.myvtex.com/frete/calcula/788213576?shippinCep=27998000&quantity=1`,
      {
        method: "GET",
        mode: "no-cors",
        headers: {
          "content-type": "text/html",
          "Accept": "text/html",
        },
      },
    );
    const res = await data.json();
    console.log("res", res);
    //setState(res)
  };
  return (
    <div class="mt-4 mb-1">
      <h3 class="mb-2 uppercase text-base">frete</h3>
      <div class="flex">
        <input
          class={`border-solid border-black border-t border-b border-l rounded-sm py-1.5 pl-2.5 w-full max-w-[280px] 
                placeholder-gray-400 text-sm focus-visible:outline-none focus:outline-none`}
          onKeyUp={handleKeyUp}
          ref={inputRef}
          placeholder="CALCULAR FRETE"
        />
        <button
          onClick={() => handleClick()}
          class="h-auto text-center bg-color-primary-green text-white uppercase text-sm px-3 rounded-sm ml-[-4px] hover:bg-color-primary-green-hover"
        >
          Calcular
        </button>
      </div>
      {state && <div dangerouslySetInnerHTML={{ __html: `${state}` }} />}
    </div>
  );
};
export default Shipping;

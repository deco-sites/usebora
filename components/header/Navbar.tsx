import HeaderButton from "$store/islands/HeaderButton.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";

import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import HeaderSearchMenu from "$store/islands/HeaderSearchMenu.tsx";
import Searchbar from "$store/components/search/Searchbar.tsx";


function Navbar({ items, searchbar }: {
  items: INavItem[];
  searchbar: SearchbarProps;
}) {
  return (
    <>
      {/* Mobile Version */}
      <div
        class={`md:hidden flex flex-row justify-between items-center border-b-1 border-default w-full px-2 gap-2 h-[12vh] bg-black` }
      >
        <HeaderButton variant="menu" />

        <a
          href="/"
          class={`flex-grow inline-flex items-center min-h-[${navbarHeight}] justify-center`}
          aria-label="Store logo"
        >
          {/* <Icon id="Logo" width={126} height={16} /> */}
          <img class="max-w-[60%]" src="https://www.usebora.com.br/arquivos/logositemenu2.png?v=637086444892370000" alt="usebora" />
        </a>

        <div class="flex gap-1">
          <HeaderButton variant="search" />
          <HeaderButton variant="cart" />
        </div>
      </div>

      {/* Desktop Version */}
      <div class="bg-ring-offset-white border-b-1 border-default lg:h-[85px] flex">
        <div class="bg-ring-offset-white max-w-[1220px] mx-auto hidden md:flex flex-row justify-between items-center w-full pl-2 pr-3">
          <div class="flex-none w-44">
            <a href="/" aria-label="Store logo" class="block px-4 py-3 w-[160px]">
              {/* <Icon id="Logo" width={126} height={16} /> */}
             <img src="https://usebora.vteximg.com.br/arquivos/logoborapreto-01.png?v=637502347799730000" alt="usebora" />
            </a>
          </div>
          <Searchbar />
          <div class="flex-none flex items-center gap-2">
            {/* <HeaderButton variant="search" /> */}
            <HeaderSearchMenu searchbar={searchbar} />
            <Button
              as="a"
              variant="icon"
              href="/login"
              aria-label="Log in"
            >
              {/* <Icon id="User" width={20} height={20} strokeWidth={0.4} /> */}
              <span class="font-bold text-black">Minha conta</span>
            </Button>
            <HeaderButton variant="cart" />
          </div>
        </div>
      </div>
      <div class="hidden lg:block ">
        <div class="flex justify-center">
          <div class="flex-auto flex justify-between max-w-[1220px]">
              {items.map((item) => <NavItem item={item} />)}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

import AddToCartButton from "$store/islands/AddToCartButton.tsx";
import Container from "$store/components/ui/Container.tsx";
import Text from "$store/components/ui/Text.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";
import ProductSelector from "$store/islands/VariantSelector.tsx";
import { IProps, IThumbnail } from "$store/components/product/Thumbnail.tsx";
import Thumbnail from "$store/islands/Thumbnail.tsx";
import Quantity from "$store/islands/Quantity.tsx";
import Shipping from "$store/islands/Shipping.tsx";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <Text variant="heading-2">Página não encontrada</Text>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

function Details({ page }: { page: ProductDetailsPage }) {
  const {
    breadcrumbList,
    product,
  } = page;
  const {
    description,
    productID,
    offers,
    image: images,
    name,
    gtin,
  } = product;
  const { price, listPrice, seller, installments } = useOffer(offers);
  const imagem: IProps[] = images as IProps[];
  return (
    <Container class="py-0 sm:py-10">
      <div class="md:hidden my-2 px-4  sm:px-0">
        <Breadcrumb
          itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
        />
      </div>
      <div class="flex flex-col gap-4 sm:flex-row sm:gap-10">
        {/* Image Gallery */}
        <div class="flex flex-row sm:w-[50%] overflow-auto snap-x snap-mandatory scroll-smooth sm:gap-2">
          <Thumbnail images={imagem} />
        </div>
        {/* Product Info */}
        <div class="px-4 sm:w-[50%] sm:px-0">
          {/* Breadcrumb */}
          <div class="hidden md:block">
            <Breadcrumb
              itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
            />
          </div>
          {/* Code and name */}
          <div class="mt-4 sm:mt-8">
            <div>
            </div>
            <h1>
              <Text variant="heading-3" class="text-2xl text-gray-700">
                {name}
              </Text>
            </h1>
          </div>
          {/* Prices */}
          <div class="mt-4">
            <div class="flex flex-row gap-2 items-center">
              {
                /* <Text
                class="line-through"
                tone="subdued"
                variant="list-price"
              >
                {formatPrice(listPrice, offers!.priceCurrency!)}
              </Text> */
              }
              <Text
                tone="price"
                variant="heading-3"
                class="text-color-primary-green text-3xl"
              >
                {formatPrice(price, offers!.priceCurrency!)}
              </Text>
            </div>
            <Text tone="subdued" variant="caption">
              {installments}
            </Text>
          </div>
          {/* Sku Selector */}
          <div class="mt-4 sm:mt-6">
            <ProductSelector product={product} />
          </div>
          {/* Add to Cart and Favorites button */}
          <div class="mt-4 fixed bottom-0 left-0 right-0 z-50 bg-white p-2 md:p-0 md:bg-transparent md:static sm:mt-10 flex gap-2">
            {seller && (
              <>
                <Quantity />
                <AddToCartButton
                  skuId={productID}
                  sellerId={seller}
                />
              </>
            )}
          </div>
          {/* Description card */}
          <div class="mt-4 sm:mt-6">
            <Text variant="caption">
              {description && (
                <details>
                  <summary class="cursor-pointer">Descrição</summary>
                  <div class="ml-2 mt-2">{description}</div>
                </details>
              )}
            </Text>
          </div>
          <div>
            <Shipping />
          </div>
        </div>
      </div>
    </Container>
  );
}

function ProductDetails({ page }: Props) {
  if (page) {
    return <Details page={page} />;
  }

  return <NotFound />;
}

export default ProductDetails;

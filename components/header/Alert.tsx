import Text from "$store/components/ui/Text.tsx";

import { useId } from "preact/hooks";

export interface Props {
  /**
   * @name titulo
   * @href link
   */
  alerts: Array<{ name: string; href?: string; target?: string }>;
}

function Alert({ alerts = [] }: Props) {
  const id = useId();

  return (
    <div
      id={id}
      class="bg-ring-offset-white gap-6 scrollbar-none hidden md:block border-b border-gray-300"
    >
      <div class="bg-ring-offset-white max-w-[1220px] mx-auto">
        <div class="flex  ">
          {alerts.map((alert) => (
            <a
              href={alert.href}
              target={alert.target}
              class="no-underlin px-[20px] py-[8px] leading-[10px]"
            >
              <Text
                class="flex text-black font-bold text-[13px]"
                variant="caption"
                tone="default-inverse"
              >
                {alert.name}
              </Text>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Alert;

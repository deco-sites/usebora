import Text from "$store/components/ui/Text.tsx";

export interface INavItem {
  label: string;
  href: string;
  children?: INavItem[];
}

function NavItem({ item }: { item: INavItem }) {
  const { href, label, children} = item;

  return (
    <li class="group flex items-center">
      <a href={href} class="px-4 py-2 group-hover:bg-black group-hover:text-white font-bold">
        <Text
          class="font-bold group-hover:text-white"
          variant="menu"
        >
          {label}
        </Text>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class={`fixed invisible hover:visible group-hover:visible bg-default z-50 flex items-start justify-center gap-6 border-t-1 border-b-2 border-default w-screen mt-[156px]`}
            style={{ top: "0px", left: "0px" }}
          >
            
            <ul class="flex items-start justify-center gap-6">
              {children.map((node) => (
                <li class="p-6">
                  <a class="hover:underline" href={node.href}>
                    <Text variant="menu">{node.label}</Text>
                  </a>

                  <ul class="flex flex-col gap-1 mt-4">
                    {node.children?.map((leaf) => (
                      <li>
                        <a class="hover:underline" href={leaf.href}>
                          <Text variant="caption">{leaf.label}</Text>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;

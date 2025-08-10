import { usePathname, useRouter, useSearchParams } from "next/navigation";
// MUI
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined";
// GLOBAL CUSTOM COMPONENT
import BazaarMenu from "components/BazaarMenu";
// STYLED COMPONENT
import { DropDownHandler } from "./styles";
// CUSTOM DATA MODEL
import { ICategory } from "models/Product.model";

type Props = { categories: ICategory[] };

export default function CategoryDropdown({ categories }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedSlug = searchParams.get("category") ?? "";

  const handleSelect = (slug: string) => {
    const params = new URLSearchParams(searchParams);
    if (slug === "") params.delete("category");
    else params.set("category", slug);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const selectedName =
    categories.find((c) => c.slug === selectedSlug)?.name || "Todas las categorías";

  return (
    <BazaarMenu
      direction="left"
      sx={{ zIndex: { md: 1502, xs: 99999 } }}
      handler={(e) => (
        <DropDownHandler onClick={e}>
          {selectedName}
          <KeyboardArrowDownOutlined fontSize="small" color="inherit" />
        </DropDownHandler>
      )}
      options={(onClose) => [
        <MenuItem
          key="all-categories"
          onClick={() => {
            handleSelect("");
            onClose();
          }}
        >
          Todas las categorías
        </MenuItem>,
        ...categories.map((item) => (
          <MenuItem
            key={item.slug}
            onClick={() => {
              handleSelect(item.slug);
              onClose();
            }}
          >
            {item.name}
          </MenuItem>
        )),
      ]}
    />

  );
}

import { formatPrice } from "@/shared/lib/PriceFormatters";
import { toggleSearchParams } from "@/shared/lib/ToggleSearchParams";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, ChangeEvent, useEffect, useRef, useMemo } from "react";
import { useDebouncedCallback } from "use-debounce";

export const useProductFilters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const defaultValues = useRef({
    category: searchParams.get("category") ?? categories[0] ?? "",
    brand: searchParams.get("brand") ?? brands[0] ?? "",
    minPrice: searchParams.get("minPrice") ?? "",
    maxPrice: searchParams.get("maxPrice") ?? "",
    minRate: searchParams.get("minRate") ?? 0,
    maxRate: searchParams.get("maxRate") ?? 5,
  });

  const [selectedCategory, setSelectedCategory] = useState(
    defaultValues.current.category,
  );
  const [selectedBrand, setSelectedBrand] = useState(
    defaultValues.current.brand,
  );
  const [selectedPriceMin, setSelectedPriceMin] = useState(
    defaultValues.current.minPrice,
  );
  const [selectedPriceMax, setSelectedPriceMax] = useState(
    defaultValues.current.maxPrice,
  );
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>();
  const [selectedRateRange, setSelectedRateRange] = useState<number[]>([
    Number(defaultValues.current.minRate),
    Number(defaultValues.current.maxRate),
  ]);

  const setParams = (params: Record<string, string | number | null>) => {
    const newParams = toggleSearchParams(params,searchParams)
    const newPathname = `${pathname}?${newParams.toString()}`;
    router.push(newPathname);
  };

  const onChangeMinPrice = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSelectedPriceMin(e.target.value);
  };

  const onChangeMaxPrice = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSelectedPriceMax(e.target.value);
  };

  const onChangeRate = (e: Event, value: number | number[]) => {
    if (Array.isArray(value)) {
      setSelectedRateRange(value);
    } else {
      setSelectedRateRange([value, 5]);
    }
  };

  const onChangeBrand = (e: React.SyntheticEvent, value: string | null) => {
    setSelectedBrand(value ?? "");
  };

  const onChangeCategory = (e: React.SyntheticEvent, value: string | null) => {
    setSelectedCategory(value ?? "");
  };

  const minPricePlaceholder = useMemo(() => {
    if (priceRange?.min === undefined) return "";

    return formatPrice(priceRange.min).toString();
  }, [priceRange?.min]);

  const maxPricePlaceholder = useMemo(() => {
    if (priceRange?.max === undefined) return "";

    return formatPrice(priceRange.max).toString();
  }, [priceRange?.max]);

  const clearFilters = () => {
    setSelectedBrand("");
    setSelectedCategory("");
    setSelectedPriceMax("");
    setSelectedPriceMin("");
    setSelectedRateRange([0, 5]);

    setParams({
      offset: null,
      category: null,
      brand: null,
      minPrice: null,
      maxPrice: null,
      minRate: null,
      maxRate: null,
    });
  };

  const updateParams = useDebouncedCallback(() => {
    setParams({
      offset: null,
      category: selectedCategory,
      brand: selectedBrand,
      minPrice: selectedPriceMin,
      maxPrice: selectedPriceMax,
      minRate: selectedRateRange[0] === 0 ? null : selectedRateRange[0],
      maxRate: selectedRateRange[1] === 5 ? null : selectedRateRange[1],
    });
  }, 500);

  useEffect(() => {
    updateParams();
  }, [
    selectedCategory,
    selectedBrand,
    selectedPriceMin,
    selectedPriceMax,
    selectedRateRange,
    updateParams,
  ]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/product/filters", { method: "GET" });
        const data = await response.json();

        const { categories, brands, priceRange } = data as {
          categories: { category: string }[];
          brands: { brand: string }[];
          priceRange: { min: number; max: number }[];
        };
        setCategories(categories.map((item) => item.category));
        setPriceRange(priceRange[0]);
        setBrands(brands.map((item) => item.brand));
      } catch (error) {
        console.log(error);
      } finally {
        setInitialLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return {
    categories,
    brands,
    selectedCategory,
    selectedBrand,
    selectedPriceMin,
    selectedPriceMax,
    priceRange,
    selectedRateRange,
    onChangeMinPrice,
    onChangeMaxPrice,
    onChangeRate,
    onChangeBrand,
    onChangeCategory,
    clearFilters,
    initialLoading,
    minPricePlaceholder,
    maxPricePlaceholder,
  };
};

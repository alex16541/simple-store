import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, ChangeEvent, useEffect, useRef, useMemo } from "react";
import { useDebouncedCallback } from "use-debounce";

export const useProductFilters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [initialLoading, setInitialLoading] = useState(true);
  const { replace } = useRouter();
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

  const setParams = (param: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams);

    for (const [key, value] of Object.entries(param)) {
      if (value) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    }

    const newPathname = `${pathname}?${params.toString()}`;
    replace(newPathname);
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
    console.log(value);
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

    return Number(priceRange.min).toFixed(0).toString();
  }, [priceRange?.min]);

  const maxPricePlaceholder = useMemo(() => {
    if (priceRange?.max === undefined) return "";

    return Number(priceRange.max).toFixed(0).toString();
  }, [priceRange?.max]);

  const clearFilters = () => {
    setSelectedBrand("");
    setSelectedCategory("");
    setSelectedPriceMax("");
    setSelectedPriceMin("");
    setSelectedRateRange([0, 5]);

    setParams({
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

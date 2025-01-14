"use client";
import { toggleSearchParams } from "@/shared/lib/ToggleSearchParams";
import { Button, Stack } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
interface LoadNextPageButtonProps {
  pageSize?: number;
  totalItems?: number;
}

export const LoadNextPageButton = (props: LoadNextPageButtonProps) => {
  const { pageSize = 9, totalItems } = props;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const setParams = (params: string) => {
    router.push(`${pathname}?${params}`);
  };

  const loadNext = () => {
    const limit = Number(searchParams.get("limit")) ?? pageSize;
    const offset = Number(searchParams.get("offset")) ?? pageSize;

    const params = toggleSearchParams(
      { limit: limit, offset: offset + pageSize },
      searchParams,
    );

    setParams(params.toString());
  };

  const loadBack = () => {
    const limit = Number(searchParams.get("limit")) ?? pageSize;
    const offset = Number(searchParams.get("offset")) ?? pageSize;

    const params = toggleSearchParams(
      { limit: limit, offset: offset - pageSize },
      searchParams,
    );

    setParams(params.toString());
  };

  return (
    <Stack gap={2} direction="row" justifyContent="space-between">
      <Button
        startIcon={<ArrowBackIosNewRoundedIcon />}
        onClick={loadBack}
        color="success"
        disabled={(searchParams.get("offset") ?? 0) === 0}
      >
        Предыдущая страница
      </Button>
      <Button
        onClick={loadNext}
        color="success"
        endIcon={<ArrowForwardIosRoundedIcon />}
        disabled={
          !!totalItems &&
          totalItems <= +(searchParams.get("offset") ?? pageSize) + pageSize
        }
      >
        Следующая страница
      </Button>
    </Stack>
  );
};

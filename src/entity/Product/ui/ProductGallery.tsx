"use client";
import { Box, IconButton, Stack, SxProps } from "@mui/material";
import { useMemo, useState } from "react";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { ImageNotFound } from "@/shared/ui/ImageNotFound";

interface ProductGalleryProps {
  images?: string[];
  scrollLength?: number;
  sx?: SxProps;
}

export const ProductGallery = (props: ProductGalleryProps) => {
  const { images = [], scrollLength = 4, sx } = props;

  const [selectedImage, setSelectedImage] = useState(0);
  const [offset, setOffset] = useState(0);

  const isScrollUpDisabled = useMemo(() => {
    return offset <= 0;
  }, [offset]);

  const isScrollDownDisabled = useMemo(() => {
    return offset + scrollLength >= images.length;
  }, [offset, scrollLength, images]);

  const decreaseOffset = () =>
    setOffset((offset) => (isScrollUpDisabled ? offset : offset - 1));

  const increaseOffset = () =>
    setOffset((offset) => (isScrollDownDisabled ? offset : offset + 1));

  return (
    <Stack
      sx={{
        flexDirection: "row",
        gap: 1,
        height: "520px",
        alignItems: "center",
        boxSizing: "content-box",
        ...sx,
      }}
    >
      {!!images.length && (
        <Stack gap={1} alignItems="center" sx={{ width: "100px" }}>
          <IconButton
            color="success"
            sx={{
              borderRadius: 4,
              width: "100%",
              opacity: isScrollUpDisabled ? 0 : 1,
            }}
            onClick={decreaseOffset}
            disabled={isScrollUpDisabled}
          >
            <KeyboardArrowUpRoundedIcon />
          </IconButton>
          {images.slice(offset, offset + scrollLength).map((image, i) => (
            <Box
              key={i}
              sx={{
                width: "100%",
                overflow: "hidden",
                aspectRatio: "1/1",
                border: 3,
                borderColor: i === selectedImage ? "success.main" : "#00000000",
                borderRadius: 4,
                cursor: "pointer",
                boxSizing: "border-box",
              }}
            >
              <Box
                component="img"
                src={image}
                alt="bananas"
                onClick={() => setSelectedImage(i)}
                sx={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          ))}
          <IconButton
            color="success"
            sx={{
              borderRadius: 4,
              width: "100%",
              opacity: isScrollDownDisabled ? 0 : 1,
            }}
            onClick={increaseOffset}
            disabled={isScrollDownDisabled}
          >
            <KeyboardArrowDownRoundedIcon />
          </IconButton>
        </Stack>
      )}

      <Box
        height="100%"
        sx={{ aspectRatio: "1/1" }}
        borderRadius={6}
        overflow="hidden"
      >
        {images[selectedImage] ? (
          <Box
            component="img"
            src={images[selectedImage]}
            alt="Product preview"
            height="100%"
            sx={{ objectFit: "contain", borderRadius: 6, overflow: "hidden" }}
          />
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            gap={1}
            alignItems="center"
            justifyContent="center"
            height="100%"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <ImageNotFound />
          </Box>
        )}
      </Box>
    </Stack>
  );
};

"use client";
import { Box, IconButton, Stack, SxProps } from "@mui/material";
import { useMemo, useState } from "react";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { ImageNotFound } from "@/shared/ui/ImageNotFound";

interface ProductGalleryProps {
  images?: string[];
  scrollLength?: number;
  sx?: SxProps;
  imagesSx?: SxProps;
  orientation?: "vertical" | "horizontal";
}

const horizontalRootSx: SxProps = {
  height: "520px",
  flexDirection: "row",
  alignItems: "center",
};

const verticalRootSx: SxProps = {
  width: "100%",
  flexDirection: "column-reverse",
  alignItems: "center",
  boxSizing: "border-box",
  overflow: "hidden"
};

const horizontalImageListSx: SxProps = {
  width: "100px",
  flexDirection: "column",
  flexShrink: 0
};

const verticalImageListSx: SxProps = {
  height: "100px",
  flexDirection: "row",
};

const horizontalImageSx: SxProps = {
  width: "100%",
};

const verticalImageSx: SxProps = {
  width: "100px",
};

const horizontalControlsSx: SxProps = {
  width: "100%",
};

const verticalControlsSx: SxProps = {
  width: "50px",
  height: "100%",
};

export const ProductGallery = (props: ProductGalleryProps) => {
  const {
    images = [],
    scrollLength = 4,
    sx,
    imagesSx,
    orientation = "horizontal",
  } = props;

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
        gap: 1,
        boxSizing: "content-box",
        ...(orientation === "horizontal" ? horizontalRootSx : verticalRootSx),
        ...sx,
      }}
    >
      {!!images.length && (
        <Stack
          gap={1}
          alignItems="center"
          sx={{
            ...(orientation === "horizontal"
              ? horizontalImageListSx
              : verticalImageListSx),
            ...imagesSx,
          }}
        >
          <IconButton
            color="success"
            sx={{
              borderRadius: 4,
              opacity: isScrollUpDisabled ? 0 : 1,
              ...(orientation === "horizontal"
                ? horizontalControlsSx
                : verticalControlsSx),
            }}
            onClick={decreaseOffset}
            disabled={isScrollUpDisabled}
          >
            {orientation == "horizontal" ? (
              <KeyboardArrowUpRoundedIcon />
            ) : (
              <KeyboardArrowLeftRoundedIcon />
            )}
          </IconButton>
          {images.slice(offset, offset + scrollLength).map((image, i) => (
            <Box
              key={i}
              sx={{
                overflow: "hidden",
                aspectRatio: "1/1",
                border: 3,
                borderColor: i === selectedImage ? "success.main" : "#00000000",
                borderRadius: 4,
                cursor: "pointer",
                boxSizing: "border-box",
                ...(orientation === "horizontal"
                  ? horizontalImageSx
                  : verticalImageSx),
              }}
            >
              <Box
                component="img"
                src={image}
                alt="image"
                onClick={() => setSelectedImage(i)}
                sx={{
                  display: "block",
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
              opacity: isScrollDownDisabled ? 0 : 1,
              ...(orientation === "horizontal"
                ? horizontalControlsSx
                : verticalControlsSx),
            }}
            onClick={increaseOffset}
            disabled={isScrollDownDisabled}
          >
            {orientation == "horizontal" ? (
              <KeyboardArrowDownRoundedIcon />
            ) : (
              <KeyboardArrowRightRoundedIcon />
            )}
          </IconButton>
        </Stack>
      )}

      <Box
        height="100%"
        width="100%"
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
            width={orientation === "horizontal" ? "auto" : "100%"}
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

"use client";

import CloseIcon from "@mui/icons-material/Close";
import { Stack, Typography, IconButton } from "@mui/material";
interface ModalHeaderProps {
  title?: string;
  onClose?: () => void;
}
export const ModalHeader = (props: ModalHeaderProps) => {
  const { title = "Title", onClose } = props;
  return (
    <Stack direction="row" justifyContent="space-between" gap={2} mb={1}>
      <Typography variant="h5" fontWeight="bold">{title}</Typography>
      {onClose && (
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      )}
    </Stack>
  );
};

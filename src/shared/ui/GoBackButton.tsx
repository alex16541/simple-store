"use client";
import { Button, ButtonProps } from "@mui/material";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";

interface GoBackButtonProps extends ButtonProps {
  text?: string;
}

export const GoBackButton = (props: GoBackButtonProps) => {
  const { text = 'Назад', variant = "outlined", color = "success" } = props;

  const onGoBack = () => {
    window.history.back();
  };

  return (
    <Button
      onClick={onGoBack}
      variant={variant}
      color={color}
      startIcon={<KeyboardBackspaceRoundedIcon />}
    >
      {text} 
    </Button>
  );
};

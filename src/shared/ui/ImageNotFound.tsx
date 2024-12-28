import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";
import { Typography } from "@mui/material";
interface ImageNotFoundProps {
  text?: string;
}

export const ImageNotFound = (props: ImageNotFoundProps) => {
  const { text = "Картинка не найдена" } = props;

  return (
    <>
      <ImageNotSupportedOutlinedIcon color="disabled" fontSize="large" />
      <Typography color="textSecondary">{text}</Typography>
    </>
  );
};

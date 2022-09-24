import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

export interface IImage{
  id: string;
  url: string;
  name: string;
}

interface ICardProps {
  image: IImage;
}

export default function ProductCardImage({ image }: ICardProps) {
  const { url, name } = image;
  return (
    <CardActionArea
      sx={{
        width: 300,
        height: 400,
      }}
    >
      <CardMedia component="img" height="400" image={url} alt={name} />
    </CardActionArea>
  );
}

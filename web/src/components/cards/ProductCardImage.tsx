import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, Card, Box } from '@mui/material';
import Img from '../Img/Img';

export interface IImage {
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
    <Card
      sx={{
        width: 400,
        height: 450,
        position: 'relative',
      }}
    >
        <Img src={url} alt={name} />
    </Card>
  );
}

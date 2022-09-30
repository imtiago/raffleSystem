import CardMedia from '@mui/material/CardMedia';

interface IImgProps {
  alt?: string;
  src: string;
}

const Img = ({ alt, src }: IImgProps) => {
  return (
    <CardMedia
      style={{ objectFit: 'cover', top: '0', position: 'absolute', height: '100%', widows: '100%' }}
      component="img"
      image={src}
      alt={alt}
    />
  );
};

export default Img;

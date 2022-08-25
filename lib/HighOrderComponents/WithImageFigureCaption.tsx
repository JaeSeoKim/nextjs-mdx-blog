import { ImageProps } from "../../components/Image";

const WithImageFigureCaption = (ImageComponent: React.FC<ImageProps>) => {
  const ImageFigureCaption: React.FC<ImageProps> = ({ alt, ...props }) => {
    if (alt) {
      return (
        <span data-tailwind-camouflage="figure">
          <ImageComponent {...props} />
          <span data-tailwind-camouflage="figcaption">{alt}</span>
        </span>
      );
    }

    return <ImageComponent {...props} />;
  };
  return ImageFigureCaption;
};

export default WithImageFigureCaption;

import { ImageProps } from "../../components/Image";

const withImageFigureCaption = (ImageComponent: React.FC<ImageProps>) => {
  const ImageFigureCaption: React.FC<ImageProps> = ({ alt, ...props }) => {
    if (alt) {
      return (
        <span data-tailwind-camouflage="figure">
          <span className="flex justify-center items-center">
            <ImageComponent {...props} alt={alt} />
          </span>
          <span aria-hidden={true} data-tailwind-camouflage="figcaption">
            {alt}
          </span>
        </span>
      );
    }

    return <ImageComponent {...props} />;
  };
  return ImageFigureCaption;
};

export default withImageFigureCaption;

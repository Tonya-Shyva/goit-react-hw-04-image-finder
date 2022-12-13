import PropTypes from 'prop-types';
import { ImageItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image, onSelect }) => {
  return (
    <ImageItem
      src={image.webformatURL}
      alt={image.tags}
      onClick={() => onSelect(image.largeImageURL, image.tags)}
      loading="lazy"
    />
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};

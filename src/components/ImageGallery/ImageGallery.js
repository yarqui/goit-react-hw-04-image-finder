import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';
import GalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ pictures }) => {
  return (
    <Gallery>
      <GalleryItem pictures={pictures}></GalleryItem>
    </Gallery>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.object.isRequired),
};

export default ImageGallery;

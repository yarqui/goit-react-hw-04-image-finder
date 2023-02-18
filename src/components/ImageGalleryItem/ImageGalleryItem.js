import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import { ItemImage } from './ImageGalleryItem.styled';
import { Item } from './ImageGalleryItem.styled';
import { useState } from 'react';

const GalleryItem = ({ pictures }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImg, setLargeImg] = useState('');

  const showModal = largeImageURL => {
    setIsModalOpen(true);
    setLargeImg(largeImageURL);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {pictures.map(({ id, webformatURL, tags, largeImageURL }) => {
        return (
          <Item key={id}>
            <ItemImage
              id={id}
              src={webformatURL}
              alt={tags}
              loading="lazy"
              onClick={() => {
                showModal(largeImageURL);
              }}
            />
            {isModalOpen && (
              <Modal url={largeImg} tags={tags} onClose={closeModal}></Modal>
            )}
          </Item>
        );
      })}
    </>
  );
};

GalleryItem.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.object.isRequired),
};

export default GalleryItem;

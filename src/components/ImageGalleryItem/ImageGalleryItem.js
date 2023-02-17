import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import { PureComponent } from 'react';
import { ItemImage } from './ImageGalleryItem.styled';
import { Item } from './ImageGalleryItem.styled';

class GalleryItem extends PureComponent {
  state = {
    isModalOpen: false,
    largeImg: '',
  };

  showModal = largeImageURL => {
    this.setState({ isModalOpen: true, largeImg: largeImageURL });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { pictures } = this.props;
    const { isModalOpen, largeImg } = this.state;
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
                  this.showModal(largeImageURL);
                }}
              />
              {isModalOpen && (
                <Modal
                  url={largeImg}
                  tags={tags}
                  onClose={this.closeModal}
                ></Modal>
              )}
            </Item>
          );
        })}
      </>
    );
  }
}

GalleryItem.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.object.isRequired),
};

export default GalleryItem;

import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ Images, openModal }) => {
  return (
    <ul className={s.ImageGallery}>
      {Images.map(item => (
        <li
          key={item.id}
          className={s.ImageGalleryItem}
          onClick={() =>
            openModal({
              largeScr: item.largeImageURL,
              largeAlt: item.webformatURL,
            })
          }
        >
          <img
            src={item.webformatURL}
            alt={item.webformatURLtags}
            className={s.ImageGalleryItem_image}
          />
        </li>
      ))}
    </ul>
  );
};

ImageGalleryItem.propTypes = {
  Images: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;

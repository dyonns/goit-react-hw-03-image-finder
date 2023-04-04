import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { Component } from 'react';
import { getSearchPhoto } from '../../servises/hpotoAPI';
// import Images from '../../data/Images.json';

class ImageGallery extends Component {
  state = {
    Images: [],
    isLoadding: false,
    page: 1,
    query: '',
    error: null,
    isMofalOpet: false,
    modalData: null,
  };

  static getDerivedStateFromProps(props, state) {
    if (state.query !== props.query) {
      return { page: 1, query: props.query };
    }
    return null;
  }

  async componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    const { page } = this.state;
    if (
      (prevProps.query !== query && query !== ' ') ||
      (prevState.page !== page && page !== 1)
    ) {
      this.setImages();
    }
  }

  setImages = async () => {
    const { page } = this.state;
    const { query } = this.props;
    this.setState({ isLoadding: true, error: null });
    try {
      const data = await getSearchPhoto(query, page);
      if (data.hits.length === 0) {
        throw new Error('No photos data');
      }
      this.setState(prev => ({
        Images: page === 1 ? data.hits : [...prev.Images, ...data.hits],
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoadding: false });
    }
  };

  changePage = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  openModal = modalData => {
    this.setState({ modalData });
  };

  closeModal = modalData => {
    this.setState({ modalData: null });
  };

  render() {
    const { Images, error, modalData } = this.state;
    return (
      <>
        {this.state.isLoadding && <Loader />}
        {error ? (
          <h1>{error}</h1>
        ) : (
          <>
            <ImageGalleryItem Images={Images} openModal={this.openModal} />

            {Images.length > 0 && <Button onClick={this.changePage} />}
          </>
        )}
        {modalData && <Modal {...modalData} closeModal={this.closeModal} />}
      </>
    );
  }
}

export default ImageGallery;

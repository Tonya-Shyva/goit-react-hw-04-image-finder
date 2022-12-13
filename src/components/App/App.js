import React, { Component } from 'react';

// контейнер для error повідомлень--------------------
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// --------------------------------------------------
import { getImagesApi } from 'components/utils/getImagesApi';
import AppContainer from './App.styled';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import SearchBar from 'components/Searchbar/Searchbar';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';

export class App extends Component {
  state = {
    searchValue: '',
    pageNumber: 1,
    images: [],
    isLoading: false,
    selectedImg: null,
    modalImgAlt: '',
    hide: true,
  };

  handleSubmit = async e => {
    // console.log(e);
    this.setState({ isLoading: true, images: [], hide: true, pageNumber: 1 });
    if (e.trim() === '') {
      return;
    }
    const response = await getImagesApi(e, 1);
    // console.log(response);
    if (response.hits.length === 0) {
      toast.info('Please, enter another search value!');
      return this.setState({ hide: true, isLoading: false });
    } else {
      this.setState({
        images: response.hits,
        isLoading: false,
        pageNumber: 1,
        hide: false,
      });
      if (response.hits.length < 12) {
        return this.setState({ hide: true });
      }
    }

    this.setState({
      images: response.hits,
      isLoading: false,
      searchValue: e,
      pageNumber: 1,
      hide: false,
    });
  };

  handleLoadMore = async () => {
    const { searchValue, pageNumber, images } = this.state;

    this.setState({ isLoading: true });
    const response = await getImagesApi(searchValue, pageNumber + 1);

    this.setState(prevState => ({
      images: [...prevState.images, ...response.hits],
      pageNumber: pageNumber + 1,
      isLoading: false,
    }));

    if (images.length === response.totalHits) {
      this.setState({ hide: true });
    }

    if (response.hits.length < 12) {
      this.setState({ hide: true });
    }
  };

  selectImg = (imgUrl, altTag) => {
    this.setState({ selectedImg: imgUrl, modalImgAlt: altTag });
  };

  closeModal = () => {
    this.setState({
      selectedImg: '',
      modalImgAlt: '',
    });
  };

  render() {
    const { images, selectedImg, modalImgAlt, isLoading, hide } = this.state;
    return (
      <AppContainer>
        <SearchBar onFormSubmit={this.handleSubmit}></SearchBar>

        {images !== [] ? (
          <React.Fragment>
            <ImageGallery
              images={images}
              onSelect={this.selectImg}
            ></ImageGallery>
            {isLoading && <Loader />}
            {!hide && <Button onClick={this.handleLoadMore} />}
          </React.Fragment>
        ) : null}

        {selectedImg && (
          <Modal onClose={this.closeModal}>
            <img src={selectedImg} alt={modalImgAlt} />
          </Modal>
        )}
        <ToastContainer autoClose={2000} position="top-left" theme="dark" />
      </AppContainer>
    );
  }
}

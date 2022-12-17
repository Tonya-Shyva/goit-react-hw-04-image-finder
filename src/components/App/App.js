import React, { useState } from 'react';

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

export function App() {
  const [searchValue, setSearchValue] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [images, setImages] = useState([]);
  const [modalImgAlt, setModalImgAlt] = useState('');
  const [selectedImg, setSelectedImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHide, setIsHide] = useState(true);

  const handleSubmit = async e => {
    // console.log(e);
    setImages([]);
    setPageNumber(1);
    setSearchValue('');

    setIsHide(true);
    setIsLoading(true);

    const response = await getImagesApi(e, 1);
    toast.success(`We found ${response.totalHits} images and photos`);
    setImages(response.hits);
    setSearchValue(e);
    setPageNumber(2);
    setIsHide(false);
    setIsLoading(false);
    // console.log(response);
    if (response.totalHits === 0) {
      toast.info('Please, enter another search value!');
      setIsHide(true);
      setSearchValue('');
    }
    if (
      response.totalHits < 12 &&
      response.totalHits > 0 &&
      response.totalHits === response.total
    ) {
      setIsHide(true);
    }
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    setImages([...images]);

    const response = await getImagesApi(searchValue, pageNumber);

    setImages([...images, ...response.hits]);
    setPageNumber(prevPage => prevPage + 1);
    setIsLoading(false);
    setIsHide(false);

    if (images.length === response.totalHits || response.hits.length < 12) {
      setIsHide(true);
    }
  };

  const selectImg = (imgUrl, altTag) => {
    setSelectedImg(imgUrl);
    setModalImgAlt(altTag);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImg('');
    setModalImgAlt('');
    document.body.style.overflow = 'scroll';
  };

  return (
    <AppContainer>
      <SearchBar onFormSubmit={handleSubmit}></SearchBar>
      {searchValue === '' && isLoading && pageNumber === 1 ? (
        <Loader />
      ) : (
        <React.Fragment>
          {searchValue !== '' && (
            <ImageGallery images={images} onSelect={selectImg}></ImageGallery>
          )}
          {isLoading && pageNumber > 1 && <Loader />}
          {!isHide && <Button onClick={handleLoadMore} />}
        </React.Fragment>
      )}

      {selectedImg && (
        <Modal onClose={closeModal}>
          <img src={selectedImg} alt={modalImgAlt} />
        </Modal>
      )}
      <ToastContainer autoClose={3000} position="top-left" theme="dark" />
    </AppContainer>
  );
}

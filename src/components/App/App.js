import React, { useState, useRef } from 'react';

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
  const isLoading = useRef(false);
  const isHide = useRef(true);

  const handleSubmit = async e => {
    // console.log(e);
    setImages([]);
    setPageNumber(1);
    setSearchValue('');

    isHide.current = true;
    isLoading.current = true;

    const response = await getImagesApi(e, 1);
    toast.success(`We found ${response.totalHits} images and photos`);
    setImages(response.hits);
    setSearchValue(e);
    setPageNumber(2);
    isHide.current = false;
    isLoading.current = false;
    // console.log(response);
    if (response.totalHits === 0) {
      toast.info('Please, enter another search value!');
      isHide.current = true;
      setSearchValue('');
    }
    if (
      response.totalHits < 12 &&
      response.totalHits > 0 &&
      response.totalHits === response.total
    ) {
      isHide.current = true;
    }
  };

  const handleLoadMore = async () => {
    isLoading.current = true;
    setImages([...images]);

    const response = await getImagesApi(searchValue, pageNumber);

    setImages([...images, ...response.hits]);
    setPageNumber(pageNumber + 1);
    isLoading.current = false;
    isHide.current = false;

    if (images.length === response.totalHits ?? response.hits.length < 12) {
      isHide.current = true;
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
      {searchValue === '' && isLoading.current && pageNumber === 1 ? (
        <Loader />
      ) : (
        <React.Fragment>
          {searchValue !== '' && (
            <ImageGallery images={images} onSelect={selectImg}></ImageGallery>
          )}
          {isLoading.current && pageNumber > 1 && <Loader />}
          {!isHide.current && <Button onClick={handleLoadMore} />}
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

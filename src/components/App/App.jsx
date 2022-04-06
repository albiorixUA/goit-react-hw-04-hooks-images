import { useState, useEffect } from 'react';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import ImageGalleryItem from '../ImageGalleryItem';
import LoaderSpiner from '../Loader';
import Modal from '../Modal';
import LoadMore from '../Button';
import api from 'servises/api';
import s from './App.module.css';

const Status = {
  LOADING: 'loading',
  LOADED: 'loaded',
};

export default function App() {
  const [{ pictureName }, setPictureName] = useState('');
  const [pictureData, setPictureData] = useState('');
  const [pictureModal, setPictureModal] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState('');

  useEffect(() => {
    if (!pictureName) {
      return;
    }

    setStatus(Status.LOADING);
    api
      .fetchPicture(pictureName, page)
      .then(res => {
        setPictureData(state => [...state, ...res.data.hits]);
        setStatus(Status.LOADED);
      })
      .catch(error => console.log(error))
      .finally(scrollToBottom);
  }, [page, pictureName]);

  const handleFormSubmit = pictureName => {
    setPage(1);
    setPictureName({ pictureName });
    setPictureData('');
  };

  const pictureModalClick = picture => {
    setPictureModal(picture);
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      {status === Status.LOADING && <LoaderSpiner />}
      {pictureData.length > 0 && (
        <ImageGallery>
          <ImageGalleryItem
            pictureData={pictureData}
            onClick={pictureModalClick}
          />
        </ImageGallery>
      )}
      {status === Status.LOADED && (
        <LoadMore onClick={() => setPage(state => state + 1)} />
      )}
      {pictureModal.length > 0 && (
        <Modal onClose={() => setPictureModal('')}>
          <img src={pictureModal} alt="" />
        </Modal>
      )}
    </div>
  );
}

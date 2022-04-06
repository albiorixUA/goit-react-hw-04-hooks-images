import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [pictureName, setPictureName] = useState('');

  const handleSearchChange = e => {
    setPictureName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (pictureName.trim() === '') {
      return toast.error('Enter a search query');
    }
    onSubmit(pictureName);
    setPictureName('');
  };

  return (
    <header className={s.Searchbar}>
      <Toaster />
      <form onSubmit={handleSubmit} className={s.SearchForm}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>
        <input
          className={s.SearchFormInput}
          value={pictureName}
          onChange={handleSearchChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

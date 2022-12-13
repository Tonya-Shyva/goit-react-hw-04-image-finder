import PropTypes from 'prop-types';
import { useState } from 'react';

// бібліотека для повідомлень  $npm install --save react-toastify------------
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// --------------------------------------------

import { IconButton } from 'components/Button/IconButton';
import {
  SearchBarHeader,
  SearchBarInput,
  SearchForm,
} from './Searchbar.styled';
import { ReactComponent as SearchIcon } from '../icons/search.svg';

function SearchBar({ onFormSubmit }) {
  const [searchValue, setSearchValue] = useState('');

  const handleValueChange = event => {
    setSearchValue(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchValue.trim() === '') {
      toast.error('Please, enter search value!');
      return;
    }

    onFormSubmit(searchValue);
    // setSearchValue('');
  };

  return (
    <SearchBarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <IconButton type="submit" aria-label="search button">
          <SearchIcon />
        </IconButton>

        <SearchBarInput
          type="text"
          name="searchValue"
          value={searchValue}
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleValueChange}
        />
      </SearchForm>
    </SearchBarHeader>
  );
}

export default SearchBar;

SearchBar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

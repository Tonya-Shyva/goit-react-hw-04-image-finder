import PropTypes from 'prop-types';
import { Component } from 'react';

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

class SearchBar extends Component {
  state = {
    searchValue: '',
  };

  handleValueChange = event => {
    this.setState({
      searchValue: event.currentTarget.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchValue.trim() === '') {
      // alert('Please, enter search value!');
      toast.error('Please, enter search value!');
      return;
    }

    this.props.onFormSubmit(this.state.searchValue);
    this.setState({ searchValue: '' });
  };

  render() {
    return (
      <SearchBarHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <IconButton type="submit" aria-label="search button">
            <SearchIcon />
          </IconButton>

          <SearchBarInput
            type="text"
            name="searchValue"
            value={this.state.searchValue}
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleValueChange}
          />
        </SearchForm>
      </SearchBarHeader>
    );
  }
}

export default SearchBar;

SearchBar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

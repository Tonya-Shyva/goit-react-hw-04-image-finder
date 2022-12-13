// import { MagnifyingGlass } from 'react-loader-spinner';
import PropTypes from 'prop-types';
import { ButtonStyled } from './Button.styled';

export default function Button({ onClick }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <ButtonStyled onClick={onClick} type="button">
        Load more
      </ButtonStyled>
    </div>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

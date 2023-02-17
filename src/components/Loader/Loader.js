import { LoaderStyled } from './Loader.styled';

const Loader = () => {
  return (
    <LoaderStyled height="300" width="350" viewBox="0 0 350 350">
      <rect x="15" y="15" rx="4" ry="4" width="300" height="25" />
      <rect x="15" y="50" rx="4" ry="4" width="300" height="150" />
    </LoaderStyled>
  );
};

export default Loader;

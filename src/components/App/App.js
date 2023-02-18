import { useEffect, useState } from 'react';
import { Box } from 'components/App/App.styled';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import * as API from 'services/api';
import Loader from 'components/Loader';

const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [pictures, setPictures] = useState([]);
  const [status, setStatus] = useState('idle');
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!query) {
      return;
    }

    API.getPics(page, query)
      .then(({ data, status }) => {
        const { hits, totalHits } = data;

        if (status !== 200) {
          setStatus('rejected');
          return toast.error(`Sorry, something went wrong. Try again later`);
        }

        if (totalHits === 0) {
          toast.error(`Sorry, there are no pictures with search "${query}"`);

          setTimeout(() => {
            setStatus('rejected');
          }, 2500);
        }

        if (totalHits > 0) {
          const roundedTotalPages = Math.ceil(totalHits / 12);
          setStatus('resolved');
          setTotalPages(roundedTotalPages);
          setPictures(prevState => [...prevState, ...hits]);
        }

        if (page > 1) {
          scrollToNextResult();
        }
      })
      .catch(error => {
        console.log(error.name, error.message);
      });
  }, [page, query]);

  useEffect(() => {
    if (page >= totalPages && totalPages !== 0) {
      toast.info("You've reached the end of the search", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }, [page, totalPages]);

  useEffect(() => {
    if (page > 1) {
      scrollToNextResult();
    }
  }, [page, pictures]);

  const onSubmit = searchQuery => {
    if (!searchQuery) {
      return toast.warn('Please type something in the searchbox');
    }

    if (searchQuery === query) {
      return toast.warn('It seems to be the same search');
    }

    setPage(1);
    setQuery(searchQuery);
    setPictures([]);
    setStatus('pending');
  };

  const scrollToNextResult = () => {
    const { clientHeight } = document.documentElement;

    window.scrollBy({
      top: clientHeight - 150,
      behavior: 'smooth',
    });
  };

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  if (status === 'pending') {
    return (
      <Box>
        <Searchbar onSubmit={onSubmit}></Searchbar>
        <Loader></Loader>
        <ToastContainer theme="colored" autoClose={1500} position="top-left" />
      </Box>
    );
  }

  if (status === 'resolved') {
    return (
      <Box>
        <Searchbar onSubmit={onSubmit}></Searchbar>
        <ImageGallery pictures={pictures}></ImageGallery>
        {page !== totalPages && <Button loadMore={onLoadMore} />}

        <ToastContainer theme="colored" autoClose={1500} position="top-left" />
      </Box>
    );
  }

  if (status === 'idle' || status === 'rejected') {
    return (
      <Box>
        <Searchbar onSubmit={onSubmit}></Searchbar>
        <ToastContainer theme="colored" autoClose={1500} position="top-left" />
      </Box>
    );
  }
};

export default App;

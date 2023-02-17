import { PureComponent } from 'react';
import { Box } from 'components/App/App.styled';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import * as API from 'services/api';
import Loader from 'components/Loader';

export default class App extends PureComponent {
  state = {
    page: 1,
    query: '',
    pictures: [],
    status: 'idle',
    totalPages: 0,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page, totalPages } = this.state;

    if (prevState.page !== page || prevState.query !== query) {
      await API.getPics(page, query)
        .then(({ data, status }) => {
          const { hits, totalHits } = data;

          if (status !== 200) {
            this.setState({ status: 'rejected' });

            return toast.error(`Sorry, something went wrong. Try again later`);
          }

          if (totalHits === 0) {
            toast.error(`Sorry, there are no pictures with search "${query}"`);

            setTimeout(() => {
              this.setState(prevState => {
                return { status: 'rejected' };
              });
            }, 2500);
          }

          if (totalHits > 0) {
            const totalPages = Math.ceil(totalHits / 12);

            this.setState(prevState => {
              return {
                pictures: [...prevState.pictures, ...hits],
                status: 'resolved',
                totalPages: totalPages,
              };
            });
          }

          if (page >= totalPages && totalPages !== 0) {
            toast.info("You've reached the end of the search", {
              position: toast.POSITION.BOTTOM_CENTER,
            });
          }
        })
        .catch(error => {
          console.log(error.name, error.message);
        });
    }
    if (page > 1) {
      this.scrollToNextResult();
    }
  }

  onSubmit = searchQuery => {
    const { query } = this.state;

    if (!searchQuery) {
      return toast.warn('Please type something in the searchbox');
    }

    if (searchQuery === query) {
      return toast.warn('It seems to be the same search');
    }

    this.setState({
      page: 1,
      query: searchQuery,
      pictures: [],
      status: 'pending',
    });
  };

  scrollToNextResult = () => {
    window.scrollBy({
      top: 600,
      behavior: 'smooth',
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { pictures, status, page, totalPages } = this.state;

    if (status === 'pending') {
      return (
        <Box>
          <Searchbar onSubmit={this.onSubmit}></Searchbar>
          <Loader></Loader>
          <ToastContainer
            theme="colored"
            autoClose={1500}
            position="top-left"
          />
        </Box>
      );
    }

    if (status === 'resolved') {
      return (
        <Box>
          <Searchbar onSubmit={this.onSubmit}></Searchbar>
          <ImageGallery pictures={pictures}></ImageGallery>
          {page !== totalPages && <Button loadMore={this.onLoadMore} />}

          <ToastContainer
            theme="colored"
            autoClose={1500}
            position="top-left"
          />
        </Box>
      );
    }

    if (status === 'idle' || status === 'rejected') {
      return (
        <Box>
          <Searchbar onSubmit={this.onSubmit}></Searchbar>
          <ToastContainer
            theme="colored"
            autoClose={1500}
            position="top-left"
          />
        </Box>
      );
    }
  }
}

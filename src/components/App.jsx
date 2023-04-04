import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import s from './App.module.css';
import { Component } from 'react';

class App extends Component {
  state = { query: ' ' };

  changeQuery = query => {
    this.setState({ query });
  };

  render() {
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.changeQuery} />

        <ImageGallery query={this.state.query} />
      </div>
    );
  }
}

export default App;

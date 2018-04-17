import * as React from 'react';
import Link from 'next/link';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import debounce from 'lodash.debounce';
import Router from 'next/router';

const SearchWrapper = styled.div``;
const Input = styled.input`
  font-size: 3rem;
  color: white;
  border: 0;
  border-bottom: 1px solid gray;
  box-shadow: none !important;
  background: none;
  outline-style: none;

  :focus {
    border-bottom: 1px solid white;
  }
`;

const getPlaylistLink = playlistId => `/cities?playlistId=${playlistId}`;
class SearchInput extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange = e => {
    console.log(e);
    e.preventDefault();
    const input = e.currentTarget.value;
    this.props.onChange(input);
  };

  itemToString = i => `${i.city}, ${i.country}`;

  onSelect = selectedItem => {
    Router.push(`/cities?playlistId=${selectedItem.id}`);
  };

  render() {
    return (
      <Input
        placeholder={'Search for city'}
        onChange={this.onChange}
        innerRef={this.handleInputRender}
      />
    );
  }
}

const SuggestionList = ({ children }) => (
  <div style={{ position: 'absolute' }} className="w-50 o-70 bg-black-90">
    {children}
  </div>
);

const SuggestionItem = ({ getItemProps, item, isSelected, isHighlighted }) => (
  <div
    {...getItemProps({ item })}
    className={isHighlighted ? 'white f2 pa2 fwb ba' : 'white f3 pa2'}
    key={item.id}
  >
    {`${item.city}, ${item.state}`}
  </div>
);

class Result extends React.Component {
  render() {
    const { link, coverImgUrl, city, country } = this.props;
    return (
      <div className="fl w-50 w-25-m w-20-l pa2">
        <Link href={link}>
          <a className="db link dim tc">
            <img src={coverImgUrl} />
            <dl className="mt2 f6 lh-copy near-white">
              <dt className="clip">City</dt>
              <dd className="ml0 near-white truncate w-100">{city}</dd>
              <dt className="clip">Country</dt>
              <dd className="ml0 light-silver truncate w-100">{country}</dd>
            </dl>
          </a>
        </Link>
      </div>
    );
  }
}

const trending = [
  {
    link: '/cities?playlistId=san-francisco-ca-usa',
    coverimgurl:
      'http://farm3.staticflickr.com/2059/2484530708_d40219ff5b_z.jpg',
    city: 'San Francisco',
    country: 'California, USA',
  },
  {
    link: '/cities?playlistId=new-york-new-york-usa',
    coverimgurl:
      'https://farm5.staticflickr.com/4565/38937430371_f237316ee4_z.jpg',
    city: 'New York',
    country: 'New York, USA',
  },
];

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }

  handleOnChange = debounce(query => {
    console.log(query);
    this.setState({ query });
    this.props.data.refetch({
      query,
    });
  }, 150);

  handleInputRender = r => {
    this.input = r;
  };

  render() {
    const { loading, error, playlists } = this.props.data;
    const items = loading || error ? [] : playlists;
    return (
      <main>
        <form className="measure center mt4">
          <SearchInput items={items} onChange={this.handleOnChange} />
        </form>
        {this.state.query.length > 0
          ? this.renderResults(playlists)
          : this.renderTrending()}
      </main>
    );
  }

  playPlaylist(playlistUri) {
    this.props.mutate({
      variables: {
        spotifyUri: playlistUri,
      },
    });
  }

  renderTrending() {
    return (
      <article>
        <h2 className="f2 fw4 pa3 mv4 near-white">Trending</h2>
        <div className="cf pa2 mt3">
          {trending.map(city => (
            <Result
              link={city.link}
              coverImgUrl={city.coverimgurl}
              city={city.city}
              country={city.country}
            />
          ))}
        </div>
      </article>
    );
  }

  renderResults(playlists) {
    console.log(playlists);
    return (
      <article>
        <h2 className="f2 fw4 pa3 mv4 near-white">Results</h2>
        <div className="cf pa2 mt3">
          {playlists.map(playlist => (
            <Result
              link={getPlaylistLink(playlist.id)}
              coverImgUrl={
                'http://farm3.staticflickr.com/2059/2484530708_d40219ff5b_z.jpg'
              }
              city={playlist.city}
              country={`${playlist.state} ${playlist.country}`}
            />
          ))}
        </div>
      </article>
    );
  }
}

const getPlaylistsQuery = gql`
  query GetPlaylists($query: String!) {
    playlists(query: $query) {
      id
      city
      state
      country
      playlistUri
    }
  }
`;

const playPlaylistMutation = gql`
  mutation PlayPlaylist($spotifyUri: String!) {
    play(spotifyUri: $spotifyUri) {
      status
    }
  }
`;
export default compose(
  graphql(playPlaylistMutation),
  graphql(getPlaylistsQuery, {
    options: {
      variables: {
        query: '',
      },
    },
  })
)(Search);

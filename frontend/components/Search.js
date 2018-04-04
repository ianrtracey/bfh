import * as React from 'react';
import Link from 'next/link';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import debounce from 'lodash.debounce';

const SearchWrapper = styled.div``;
const Input = styled.input`
  font-size: 6rem;
  width: 100%;
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

const ResultList = styled.div`
  background: none;
  color: white;
`;

const Result = styled.div`
  color: grey;
  font-size: 2rem;

  :hover {
    color: white;
  }
`;

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange = e => {
    const input = e.currentTarget.value;
    this.props.onChange(input);
  };

  render() {
    const { onChange } = this.props;

    return (
      <Input
        innerRef={this.handleInputRender}
        placeholder={'Search for city'}
        onChange={this.onChange}
      />
    );
  }
}

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }

  handleOnChange = debounce(query => {
    this.props.data.refetch({
      query,
    });
  }, 150);

  handleInputRender = r => {
    this.input = r;
  };

  render() {
    return (
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12-lg col-5-md col-3-sm">
            <p>401 Cities</p>
            <SearchInput onChange={this.handleOnChange} />
            {this.renderResults()}
          </div>
        </div>
      </div>
    );
  }

  playPlaylist(playlistUri) {
    this.props.mutate({
      variables: {
        spotifyUri: playlistUri,
      },
    });
  }

  renderResults() {
    const { loading, error, playlists } = this.props.data;

    if (loading) return null;
    if (error) return `Error: ${error}`;

    return (
      <ResultList>
        {playlists.map(playlist => (
          <Link href={`/cities?${playlist.id}`}>
            <Result onClick={() => this.playPlaylist(playlist.playlistUri)}>
              {playlist.city} {playlist.state}
            </Result>
          </Link>
        ))}
      </ResultList>
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

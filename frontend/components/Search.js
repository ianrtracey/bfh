import * as React from 'react';
import Link from 'next/link';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 10em;
`;
const Input = styled.input``;

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: 'arizona',
    };
  }

  handleOnChange = e => {
    const query = e.target.value;
    this.props.data.refetch({ query });
  };

  render() {
    return (
      <SearchWrapper>
        <Input onChange={this.handleOnChange} />
        {this.renderResults()}
      </SearchWrapper>
    );
  }

  renderResults() {
    const { loading, error, playlists } = this.props.data;

    if (loading) return null;
    if (error) return `Error: ${error}`;

    return (
      <ul>
        {playlists.map(playlist => (
          <div>
            <Link href={`/playlist?${playlist.playlistUri}`}>
              <a>
                {playlist.city} {playlist.state}
              </a>
            </Link>
          </div>
        ))}
      </ul>
    );
  }
}

const getPlaylistsQuery = gql`
  query GetPlaylists($query: String!) {
    playlists(query: $query) {
      city
      state
      country
      playlistUri
    }
  }
`;
export default graphql(getPlaylistsQuery, {
  options: {
    variables: {
      query: 'arizona',
    },
  },
})(Search);

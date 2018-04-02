
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Player extends React.Component {
  render() {
    const { data: { loading, error, playing } } = this.props;
    if (loading || error) {
      return null;
      console.log(data)
    }
    return (
      <div>
        <h2>Current Playing</h2>
        <p>{playing.name}</p>
        <p>{playing.artists.map(a => a.name)}</p>
      </div>
    );
  }
}

export const getPlaying = gql`
query getPlaying {
  playing {
    name
    artists {
      name
    }
  }
}
`;

export default graphql(getPlaying)(Player)
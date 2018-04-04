import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

const PlayerWrapper = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100vw;
  height: 100vh;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`;

const PlayerInnerWrapper = styled.div`
  background: #fffbfe;
  width: 20em;
  height: 14em;
`;
class Player extends React.Component {
  render() {
    const { data: { loading, error, playing } } = this.props;
    if (!this.props.data) {
      return null;
    }

    if (loading || error) {
      return null;
      console.log(data);
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

export default graphql(getPlaying)(Player);

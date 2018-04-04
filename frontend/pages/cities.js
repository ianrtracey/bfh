import Page from '../layouts/main';
import withData from '../lib/withData';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 5%;
`;

const SpotifyButton = styled.div`
  color: #fff;
  cursor: pointer;
  margin-bottom: 0 !important;
  margin-top: 1em;
  display: inline-block;
  font-size: 0.82em;
  font-weight: 500;
  text-align: center;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  border: 0;
  border-radius: 500px;
  padding: 13px;
  -webkit-transition: all 0.15s ease;
  transition: all 0.15s ease;
  letter-spacing: 2px;
  min-width: 130px;
  white-space: normal;
  will-change: transform;
  text-transform: uppercase;
  line-height: 1.3;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: #2ebd59;
  padding: 13px 44px;
  font-family: sans-serif;

  &:hover {
    transform: scale(1.035);
    background-color: #1ed760;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export default withData(() => (
  <Page>
    <Wrapper>
      <div className="container align-middle">
        <div className="row align-items-center">
          <div className="col-12 text-center">
            <h4 className="display-4 text-muted">Bands from</h4>
            <h6 className="display-4">San Francisco, California USA</h6>
            <ul className="list-inline">
              <li className="list-inline-item">37.7749° N, 122.4194° W</li>
            </ul>
            <SpotifyButton>Listen on Spotify</SpotifyButton>
          </div>
        </div>
      </div>
    </Wrapper>
  </Page>
));

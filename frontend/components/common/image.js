import * as React from 'react';
import FadeIn from 'react-lazyload-fadein';
import PropTypes from 'prop-types';

const PlaceHolder = ({ height }) => (
  <div className="ba white b--dotted" style={{ height }} />
);

export const Image = ({ imgUrl, height }) => (
  <FadeIn height={height} placeholder={<PlaceHolder height={height} />}>
    {onload => (
      <img className="ba white b--dotted" src={imgUrl} onLoad={onload} />
    )}
  </FadeIn>
);

Image.propTypes = {
  imgUrl: PropTypes.string,
  height: PropTypes.number,
};

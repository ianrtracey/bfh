import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Image } from '../common/image';

const PlaceHolder = () => (
  <div className="ba white b--dotted" style={{ height: 200 }} />
);

export class Result extends React.Component {
  render() {
    const { link, coverImgUrl, city, country } = this.props;
    return (
      <div className="fl w-50 w-25-m w-20-l pa2">
        <Link href={link}>
          <a className="db link dim tc">
            <Image imgUrl={coverImgUrl} height={200} />
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

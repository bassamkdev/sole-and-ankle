import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';


const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const VARIANT = {
    'on-sale': {
      '--background-color': COLORS.primary,
      '--color': COLORS.gray[700],
      '--text-decoration': 'line-through'
    },
    'new-release': {
      '--background-color': COLORS.secondary,
      '--color': 'inherit'
    }
  }

  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

      const styles = VARIANT[variant]
  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        {
          variant === 'default' ? null : <Flag style={styles}>{variant === 'new-release' ? 'just released' : 'sale' }</Flag>
        }
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price style={styles}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' ? <SalePrice >{formatPrice(salePrice)}</SalePrice>: null}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
  border-radius: 16px 16px 4px 4px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 340px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: var(--color);
  text-decoration: var(--text-decoration)
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const Flag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  padding: 7px 11px;
  border-radius: 2px;
  color: ${COLORS.white};
  background-color: var(--background-color);
  font-size: ${14/16}rem;
  font-weight: 700;
  text-transform: capitalize;
`

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;

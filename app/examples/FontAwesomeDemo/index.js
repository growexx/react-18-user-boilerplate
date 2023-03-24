/**
 *
 * FontAwesomeDemo
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { library } from '@fortawesome/fontawesome-svg-core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';

library.add(fab, far, fas);

const Item = styled.span`
  margin: 4px;
`;

const Container = styled.span`
  display: flex;
  justify-content: center;
  @media screen and (max-width: 400px) {
    flex-direction: column;
    align-items: center;
  }
`;

export function FontAwesomeDemo() {
  return (
    <div>
      <Helmet>
        <title>Font Awesome Demo</title>
        <meta name="description" content="Description of FontAwesomeDemo" />
      </Helmet>
      <Container>
        {/* Solid */}
        <Item>
          <FontAwesomeIcon icon={['fas', 'coffee']} />
        </Item>

        {/* ...or, omit as FontAwesome defaults to solid, so no need to prefix: */}
        <Item>
          <FontAwesomeIcon icon="coffee" color="brown" />
        </Item>
        {/* Brand: */}

        <Item>
          <FontAwesomeIcon icon={['fab', 'github']} spin />
        </Item>

        <Item>
          <FontAwesomeIcon icon={['fab', 'apple']} />
        </Item>
        <Item>
          <FontAwesomeIcon icon={['fab', 'microsoft']} />
        </Item>
        <Item>
          <FontAwesomeIcon icon={['fab', 'google']} size="10x" />
        </Item>
        <Item>
          <FontAwesomeIcon icon={faHome} />
        </Item>
      </Container>
    </div>
  );
}

export default FontAwesomeDemo;

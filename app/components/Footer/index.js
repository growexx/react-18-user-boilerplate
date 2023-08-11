import React from 'react';
import { FormattedMessage } from 'react-intl';
import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';
import messages from './messages';

function Footer() {
  return (
    <Wrapper>
      <section>
        <FormattedMessage {...messages.copyRightMessage} />
        <section>
          <FormattedMessage {...messages.copyRightSubMessage} />
        </section>
      </section>
      <section>
        <LocaleToggle />
      </section>
    </Wrapper>
  );
}

export default Footer;

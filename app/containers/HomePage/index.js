/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { useLazyGetReposQuery } from './reposApiSlice';

export function HomePage() {
  const [username, setUsername] = useState('mxstbr');

  // Example for getting data from store
  // const reposData = useSelector(state =>
  //   makeSelectGetReposData()(state, username),
  // );

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (username && username.trim().length > 0) onSubmitForm();
  }, []);

  const [trigger, result] = useLazyGetReposQuery(username);
  const { isError, data: repos, isUninitialized, isFetching } = result;

  const onSubmitForm = (e = { preventDefault: () => {} }) => {
    e.preventDefault();
    trigger(username);
  };

  const onChangeUsername = e => setUsername(e.target.value);

  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <div>
        <Section>
          <h2>
            <FormattedMessage {...messages.trymeHeader} />
          </h2>
          <Form onSubmit={onSubmitForm} role="form">
            <label htmlFor="username">
              <FormattedMessage {...messages.trymeMessage} />
              <AtPrefix>
                <FormattedMessage {...messages.trymeAtPrefix} />
              </AtPrefix>
              <Input
                id="username"
                type="text"
                placeholder="mxstbr"
                value={username}
                onChange={onChangeUsername}
              />
            </label>
          </Form>
          {!isUninitialized && (
            <ReposList
              loading={isFetching}
              error={isError}
              repos={repos}
              currentUser={username}
            />
          )}
        </Section>
      </div>
    </article>
  );
}

export default HomePage;

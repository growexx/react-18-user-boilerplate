/**
 *
 * Profile
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Card } from 'antd';
import ImageUpload from 'components/ImageUpload/Loadable';
import { StyledProfile } from './StyledProfile';
import ProfileForm from './ProfileForm';

export function Profile() {
  return (
    <div>
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Description of Profile" />
      </Helmet>
      <Card>
        <StyledProfile>
          <ImageUpload />
          <ProfileForm />
        </StyledProfile>
      </Card>
    </div>
  );
}

export default Profile;

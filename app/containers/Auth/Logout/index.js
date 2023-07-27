import React from 'react';
import StorageService from 'utils/StorageService';

const Logout = () => {
  StorageService.clear();
  window.location.reload();
  return <React.Fragment />;
};

export default Logout;

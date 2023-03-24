/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';

import ReactHtmlParser from 'react-html-parser';
import features from '../../../docs/general/features.md';
import { StyledFeaturePage } from './StyledFeatures';

export default function FeaturePage() {
  return (
    <StyledFeaturePage>{ReactHtmlParser(`${features}`)}</StyledFeaturePage>
  );
}

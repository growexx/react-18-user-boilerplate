/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';

import parse from 'html-react-parser';
import features from '../../../docs/general/features.md';
import { StyledFeaturePage } from './StyledFeatures';

export default function FeaturePage() {
  return (
    <StyledFeaturePage>{parse(`${features}`)}</StyledFeaturePage>
  );
}

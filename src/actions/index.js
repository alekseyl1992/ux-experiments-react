import config from 'config';
import _ from 'lodash';
import { createActions } from 'redux-actions';
import { push } from 'react-router-redux';

export const { startExperiment, addScheme, removeScheme } = createActions({
  START_EXPERIMENT: () => push('/sheet'),
  ADD_SCHEME: (colorsCount) => ({
    key: _.uniqueId(),
    colors: _.fill(Array(colorsCount), 'white'),
  }),
  REMOVE_SCHEME: (scheme) => scheme
});

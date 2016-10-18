import config from 'config';
import _ from 'lodash';


export class Experiment {
  static start(params) {

    return {
      type: Experiment.START,
      data: {}
    }
  }
}

Experiment.START = 'START';

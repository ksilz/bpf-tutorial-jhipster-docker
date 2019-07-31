import { Route } from '@angular/router';

import { BpfTrackerComponent } from './tracker.component';

export const trackerRoute: Route = {
  path: 'bpf-tracker',
  component: BpfTrackerComponent,
  data: {
    pageTitle: 'tracker.title'
  }
};

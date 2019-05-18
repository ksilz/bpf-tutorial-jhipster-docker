import { Route } from '@angular/router';

import { BpfHealthCheckComponent } from './health.component';

export const healthRoute: Route = {
  path: 'bpf-health',
  component: BpfHealthCheckComponent,
  data: {
    pageTitle: 'health.title'
  }
};

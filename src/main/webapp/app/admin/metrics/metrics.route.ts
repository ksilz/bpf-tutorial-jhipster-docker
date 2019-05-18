import { Route } from '@angular/router';

import { BpfMetricsMonitoringComponent } from './metrics.component';

export const metricsRoute: Route = {
  path: 'bpf-metrics',
  component: BpfMetricsMonitoringComponent,
  data: {
    pageTitle: 'metrics.title'
  }
};

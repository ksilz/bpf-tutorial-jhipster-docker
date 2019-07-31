import { Route } from '@angular/router';

import { BpfConfigurationComponent } from './configuration.component';

export const configurationRoute: Route = {
  path: 'bpf-configuration',
  component: BpfConfigurationComponent,
  data: {
    pageTitle: 'configuration.title'
  }
};

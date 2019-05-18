import { Route } from '@angular/router';

import { BpfDocsComponent } from './docs.component';

export const docsRoute: Route = {
  path: 'docs',
  component: BpfDocsComponent,
  data: {
    pageTitle: 'global.menu.admin.apidocs'
  }
};

import { SpyObject } from './spyobject';
import { BpfTrackerService } from 'app/core/tracker/tracker.service';

export class MockTrackerService extends SpyObject {
  constructor() {
    super(BpfTrackerService);
  }

  connect() {}
}

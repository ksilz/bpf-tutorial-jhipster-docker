import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { MySimpleShopTestModule } from '../../../test.module';
import { BpfMetricsMonitoringComponent } from 'app/admin/metrics/metrics.component';
import { BpfMetricsService } from 'app/admin/metrics/metrics.service';

describe('Component Tests', () => {
  describe('BpfMetricsMonitoringComponent', () => {
    let comp: BpfMetricsMonitoringComponent;
    let fixture: ComponentFixture<BpfMetricsMonitoringComponent>;
    let service: BpfMetricsService;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [MySimpleShopTestModule],
        declarations: [BpfMetricsMonitoringComponent]
      })
        .overrideTemplate(BpfMetricsMonitoringComponent, '')
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(BpfMetricsMonitoringComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BpfMetricsService);
    });

    describe('refresh', () => {
      it('should call refresh on init', () => {
        // GIVEN
        const response = {
          timers: {
            service: 'test',
            unrelatedKey: 'test'
          },
          gauges: {
            'jcache.statistics': {
              value: 2
            },
            unrelatedKey: 'test'
          }
        };
        spyOn(service, 'getMetrics').and.returnValue(of(response));

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(service.getMetrics).toHaveBeenCalled();
      });
    });
  });
});

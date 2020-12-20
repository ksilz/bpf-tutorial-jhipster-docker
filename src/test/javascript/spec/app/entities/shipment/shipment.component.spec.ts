import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MySimpleShopTestModule } from '../../../test.module';
import { ShipmentComponent } from 'app/entities/shipment/shipment.component';
import { ShipmentService } from 'app/entities/shipment/shipment.service';
import { Shipment } from 'app/shared/model/shipment.model';

describe('Component Tests', () => {
  describe('Shipment Management Component', () => {
    let comp: ShipmentComponent;
    let fixture: ComponentFixture<ShipmentComponent>;
    let service: ShipmentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MySimpleShopTestModule],
        declarations: [ShipmentComponent],
      })
        .overrideTemplate(ShipmentComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ShipmentComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ShipmentService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Shipment(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.shipments && comp.shipments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

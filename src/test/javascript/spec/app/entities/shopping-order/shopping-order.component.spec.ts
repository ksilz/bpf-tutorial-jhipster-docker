/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MySimpleShopTestModule } from '../../../test.module';
import { ShoppingOrderComponent } from 'app/entities/shopping-order/shopping-order.component';
import { ShoppingOrderService } from 'app/entities/shopping-order/shopping-order.service';
import { ShoppingOrder } from 'app/shared/model/shopping-order.model';

describe('Component Tests', () => {
  describe('ShoppingOrder Management Component', () => {
    let comp: ShoppingOrderComponent;
    let fixture: ComponentFixture<ShoppingOrderComponent>;
    let service: ShoppingOrderService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MySimpleShopTestModule],
        declarations: [ShoppingOrderComponent],
        providers: []
      })
        .overrideTemplate(ShoppingOrderComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ShoppingOrderComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ShoppingOrderService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ShoppingOrder(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.shoppingOrders[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

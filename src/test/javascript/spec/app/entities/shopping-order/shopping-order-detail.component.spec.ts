/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MySimpleShopTestModule } from '../../../test.module';
import { ShoppingOrderDetailComponent } from 'app/entities/shopping-order/shopping-order-detail.component';
import { ShoppingOrder } from 'app/shared/model/shopping-order.model';

describe('Component Tests', () => {
  describe('ShoppingOrder Management Detail Component', () => {
    let comp: ShoppingOrderDetailComponent;
    let fixture: ComponentFixture<ShoppingOrderDetailComponent>;
    const route = ({ data: of({ shoppingOrder: new ShoppingOrder(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MySimpleShopTestModule],
        declarations: [ShoppingOrderDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ShoppingOrderDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ShoppingOrderDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.shoppingOrder).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

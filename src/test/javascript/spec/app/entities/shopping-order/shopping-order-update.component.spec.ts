/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { MySimpleShopTestModule } from '../../../test.module';
import { ShoppingOrderUpdateComponent } from 'app/entities/shopping-order/shopping-order-update.component';
import { ShoppingOrderService } from 'app/entities/shopping-order/shopping-order.service';
import { ShoppingOrder } from 'app/shared/model/shopping-order.model';

describe('Component Tests', () => {
  describe('ShoppingOrder Management Update Component', () => {
    let comp: ShoppingOrderUpdateComponent;
    let fixture: ComponentFixture<ShoppingOrderUpdateComponent>;
    let service: ShoppingOrderService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MySimpleShopTestModule],
        declarations: [ShoppingOrderUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ShoppingOrderUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ShoppingOrderUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ShoppingOrderService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ShoppingOrder(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ShoppingOrder();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});

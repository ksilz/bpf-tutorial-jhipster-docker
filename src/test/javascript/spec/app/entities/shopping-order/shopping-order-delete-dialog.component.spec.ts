/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MySimpleShopTestModule } from '../../../test.module';
import { ShoppingOrderDeleteDialogComponent } from 'app/entities/shopping-order/shopping-order-delete-dialog.component';
import { ShoppingOrderService } from 'app/entities/shopping-order/shopping-order.service';

describe('Component Tests', () => {
  describe('ShoppingOrder Management Delete Component', () => {
    let comp: ShoppingOrderDeleteDialogComponent;
    let fixture: ComponentFixture<ShoppingOrderDeleteDialogComponent>;
    let service: ShoppingOrderService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MySimpleShopTestModule],
        declarations: [ShoppingOrderDeleteDialogComponent]
      })
        .overrideTemplate(ShoppingOrderDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ShoppingOrderDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ShoppingOrderService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});

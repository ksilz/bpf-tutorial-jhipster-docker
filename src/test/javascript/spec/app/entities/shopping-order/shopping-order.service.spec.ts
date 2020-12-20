import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ShoppingOrderService } from 'app/entities/shopping-order/shopping-order.service';
import { IShoppingOrder, ShoppingOrder } from 'app/shared/model/shopping-order.model';

describe('Service Tests', () => {
  describe('ShoppingOrder Service', () => {
    let injector: TestBed;
    let service: ShoppingOrderService;
    let httpMock: HttpTestingController;
    let elemDefault: IShoppingOrder;
    let expectedResult: IShoppingOrder | IShoppingOrder[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ShoppingOrderService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ShoppingOrder(0, 'AAAAAAA', 0, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            ordered: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ShoppingOrder', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            ordered: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            ordered: currentDate,
          },
          returnedFromService
        );

        service.create(new ShoppingOrder()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ShoppingOrder', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            totalAmount: 1,
            ordered: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            ordered: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ShoppingOrder', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            totalAmount: 1,
            ordered: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            ordered: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ShoppingOrder', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});

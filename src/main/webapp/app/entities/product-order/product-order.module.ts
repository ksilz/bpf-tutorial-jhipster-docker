import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { MySimpleShopSharedModule } from 'app/shared';
import {
  ProductOrderComponent,
  ProductOrderDetailComponent,
  ProductOrderUpdateComponent,
  ProductOrderDeletePopupComponent,
  ProductOrderDeleteDialogComponent,
  productOrderRoute,
  productOrderPopupRoute
} from './';

const ENTITY_STATES = [...productOrderRoute, ...productOrderPopupRoute];

@NgModule({
  imports: [MySimpleShopSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ProductOrderComponent,
    ProductOrderDetailComponent,
    ProductOrderUpdateComponent,
    ProductOrderDeleteDialogComponent,
    ProductOrderDeletePopupComponent
  ],
  entryComponents: [
    ProductOrderComponent,
    ProductOrderUpdateComponent,
    ProductOrderDeleteDialogComponent,
    ProductOrderDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MySimpleShopProductOrderModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { MySimpleShopSharedModule } from 'app/shared';
import {
  ShoppingOrderComponent,
  ShoppingOrderDetailComponent,
  ShoppingOrderUpdateComponent,
  ShoppingOrderDeletePopupComponent,
  ShoppingOrderDeleteDialogComponent,
  shoppingOrderRoute,
  shoppingOrderPopupRoute
} from './';

const ENTITY_STATES = [...shoppingOrderRoute, ...shoppingOrderPopupRoute];

@NgModule({
  imports: [MySimpleShopSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ShoppingOrderComponent,
    ShoppingOrderDetailComponent,
    ShoppingOrderUpdateComponent,
    ShoppingOrderDeleteDialogComponent,
    ShoppingOrderDeletePopupComponent
  ],
  entryComponents: [
    ShoppingOrderComponent,
    ShoppingOrderUpdateComponent,
    ShoppingOrderDeleteDialogComponent,
    ShoppingOrderDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MySimpleShopShoppingOrderModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}

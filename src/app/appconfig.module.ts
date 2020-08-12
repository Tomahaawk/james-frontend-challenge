import { NgModule, APP_INITIALIZER } from '@angular/core';
import { IdbService } from './services/idb.service';

export function initApp(idbService: IdbService) {
  return async () => await idbService.openDatabase();
}

@NgModule({
  imports: [],
  providers: [
    IdbService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [IdbService],
      multi: true,
    },
  ],
})
export class AppConfigModule {}

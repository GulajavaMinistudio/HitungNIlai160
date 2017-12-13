import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoresOpsiSetelanService } from './sharedsmodule/stores-opsi-setelan.service';
import { KalkulasiNilaiModule } from './kalkulasi-nilai/kalkulasi-nilai.module';
import { SetelanKalkulasiModule } from './setelan-kalkulasi/setelan-kalkulasi.module';
import { AppRoutingsModule } from './app-routings/app-routings.module';
import { SharedsmoduleModule } from './sharedsmodule/sharedsmodule.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    KalkulasiNilaiModule,
    SetelanKalkulasiModule,
    SharedsmoduleModule,
    AppRoutingsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

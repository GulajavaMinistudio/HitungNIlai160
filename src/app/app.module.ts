import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoresLocalDataService } from './sharedsmodule/stores-data.service';
import { KalkulasiNilaiModule } from './kalkulasi-nilai/kalkulasi-nilai.module';
import { SetelanKalkulasiModule } from './setelan-kalkulasi/setelan-kalkulasi.module';
import { AppRoutingsModule } from './app-routings/app-routings.module';
import { SharedsmoduleModule } from './sharedsmodule/sharedsmodule.module';
import { StateCommunicationKomponenService } from './sharedsmodule/busdata/state-communication-komponen.service';
import { DataNilaiPenghitungService } from './sharedsmodule/data-nilai-penghitung.service';


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
  providers: [StateCommunicationKomponenService,
    StoresLocalDataService, DataNilaiPenghitungService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

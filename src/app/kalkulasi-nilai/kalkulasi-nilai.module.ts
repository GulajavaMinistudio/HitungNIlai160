import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { KalkulatorNilaiComponent } from './kalkulator-nilai/kalkulator-nilai.component';
import { RouteKalkulatorNilaiModule } from './route-kalkulator-nilai/route-kalkulator-nilai.module';
import { KalkulasiNilaiService } from './kalkulasi-nilai.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouteKalkulatorNilaiModule
  ],
  declarations: [
    KalkulatorNilaiComponent
  ],
  providers: [
    KalkulasiNilaiService
  ]
})
export class KalkulasiNilaiModule {
}

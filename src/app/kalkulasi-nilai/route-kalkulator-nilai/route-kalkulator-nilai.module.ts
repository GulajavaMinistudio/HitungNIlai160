import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { KalkulatorNilaiComponent } from '../kalkulator-nilai/kalkulator-nilai.component';

const kalkulatorRoutes: Routes = [
  {path: 'kalkulator-nilai', component: KalkulatorNilaiComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(kalkulatorRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RouteKalkulatorNilaiModule {

}

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const appRoutingRoot: Routes = [
  {path: '', redirectTo: 'kalkulator-nilai', pathMatch: 'full'},
  {path: 'kalkulator-nilai', loadChildren: 'app/kalkulasi-nilai/kalkulasi-nilai.module#KalkulasiNilaiModule'},
  {path: 'setelan-kalkulator', loadChildren: 'app/setelan-kalkulasi/setelan-kalkulasi.module#SetelanKalkulasiModule'},
  {path: '**', redirectTo: 'kalkulator-nilai'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutingRoot)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingsModule {
}

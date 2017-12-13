import { Component, OnInit } from '@angular/core';
import { KalkulasiNilaiService } from '../kalkulasi-nilai.service';

@Component({
  selector: 'app-kalkulator-nilai',
  templateUrl: './kalkulator-nilai.component.html',
  styleUrls: ['./kalkulator-nilai.component.css']
})
export class KalkulatorNilaiComponent implements OnInit {

  nilaiTugas = '';
  nilaiUTS = '';
  nilaiUAS = '';
  nilaiAkhir = '';
  nilaiHuruf = '';
  nilaiPredikatKategori = '';

  constructor(kalkulator: KalkulasiNilaiService) {
  }

  ngOnInit() {
    this.nilaiUAS = 0 + '';
  }

}

import { Component, OnInit } from '@angular/core';
import { KalkulasiNilaiService } from '../kalkulasi-nilai.service';
import { Subscription } from 'rxjs/Subscription';
import { StateCommunicationKomponenService } from '../../sharedsmodule/busdata/state-communication-komponen.service';

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

  subscriber: Subscription;

  constructor(private kalkulator: KalkulasiNilaiService,
              private stateService: StateCommunicationKomponenService) {

  }

  ngOnInit() {
    this.nilaiUAS = 0 + '';
  }

}

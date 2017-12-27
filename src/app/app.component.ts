import { Component, OnInit } from '@angular/core';
import { DataNilaiPenghitungService } from './sharedsmodule/data-nilai-penghitung.service';
import { DataNilai } from './sharedsmodule/localstorages/data-nilai';
import { isNullOrUndefined } from 'util';
import { StateCommunicationKomponenService } from './sharedsmodule/busdata/state-communication-komponen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  dataNilaiStorage: DataNilai;

  constructor(private initAwalService: DataNilaiPenghitungService,
              private busServiceToComp: StateCommunicationKomponenService) {

  }

  ngOnInit(): void {

    // cek data awal tersedia
    this.checkDataAwalTersedia();
  }

  // cek apakah local storage tersimpan
  checkDataAwalTersedia() {

    // cek status data awal tersedia
    this.initAwalService.checkNilaiAwalTersedia()
      .then(
        (isDataTersedia) => {
          if (isDataTersedia) {
            this.getDataAwalLocalStorage();
          } else {
            this.initDataAwalLocalStorage();
          }
        }
      )
      .catch(
        error => {
          console.log(error);
        }
      );
  }

  // inisialisasi local storage data default
  initDataAwalLocalStorage() {

    this.initAwalService.initDataAwalPengaliKalkulasi()
      .then(
        (isbooleanSukses) => {

          if (isbooleanSukses) {
            this.getDataAwalLocalStorage();
          }
        }
      )
      .catch(
        (error) => {
          console.log(error);
        }
      );
  }

  // ambil data local storage
  getDataAwalLocalStorage() {

    this.initAwalService.getDataLocalStorageSemua()
      .then(
        (dataNilai: DataNilai) => {

          if (!isNullOrUndefined(dataNilai)) {
            this.dataNilaiStorage = dataNilai;
            this.sendBusKeKomponen();
          }
        }
      )
      .catch(
        (err) => {
          console.log(err);
        }
      );
  }

  // kirim ke komponen anak
  sendBusKeKomponen() {
    console.log('data ' + JSON.stringify(this.dataNilaiStorage));
    this.busServiceToComp.sendBusDataNilaiToKomponen(this.dataNilaiStorage);
  }
}

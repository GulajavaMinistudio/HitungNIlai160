import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataNilaiPenghitungService } from './sharedsmodule/data-nilai-penghitung.service';
import { DataNilaiPengali } from './sharedsmodule/localstorages/data-nilai';
import { isNullOrUndefined } from 'util';
import { StateCommunicationKomponenService } from './sharedsmodule/busdata/state-communication-komponen.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  dataNilaiStorage: DataNilaiPengali;
  subscriptions: Subscription;

  constructor(private initAwalService: DataNilaiPenghitungService,
              private busServiceToComp: StateCommunicationKomponenService) {

    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {

    if (this.subscriptions.closed) {
      this.subscriptions = new Subscription();
    }

    this.initSubscriberFromSettings();

    // cek data awal tersedia
    this.checkDataAwalTersedia();
  }

  ngOnDestroy(): void {

    this.subscriptions.unsubscribe();
  }

  initSubscriberFromSettings() {

    this.busServiceToComp.notifRefreshData$.subscribe(
      () => {
        this.getDataAwalLocalStorageFromSettings();
      },
      (err) => {
        console.log(err);
      }
    );
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
        (dataNilai: DataNilaiPengali) => {

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
    setTimeout(
      () => {
        this.busServiceToComp.sendBusDataNilaiToKomponen(this.dataNilaiStorage);
      }, 500
    );
  }


  getDataAwalLocalStorageFromSettings() {

    this.initAwalService.getDataLocalStorageSemua()
      .then(
        (dataNilai: DataNilaiPengali) => {

          if (!isNullOrUndefined(dataNilai)) {
            this.dataNilaiStorage = dataNilai;
            this.sendBusKeKomponenHomeFromSettings();
          }
        }
      )
      .catch(
        (err) => {
          console.log(err);
        }
      );
  }


  // kirim ke komponen kalkulator dengan data yang baru
  sendBusKeKomponenHomeFromSettings() {
    setTimeout(
      () => {
        this.busServiceToComp.sendBusDataNilaiToKomponen(this.dataNilaiStorage);
      }, 2000
    );
  }
}

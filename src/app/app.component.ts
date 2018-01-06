import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataNilaiPenghitungService } from './sharedsmodule/data-nilai-penghitung.service';
import { StateCommunicationKomponenService } from './sharedsmodule/busdata/state-communication-komponen.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

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
    this.initAwalService.checkNilaiPengaliTersedia()
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

    this.initAwalService.initDataNilaiPengaliKalkulasi()
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

    this.initAwalService.getDataPengaliLocalStorageSemua()
      .then(
        (isSukses) => {

          if (isSukses) {
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
        this.busServiceToComp.sendBusDataNilaiToKomponen(true);
      }, 600
    );
  }


  /**
   * Ambil data awal kembali setelah setelan diperbarui di menu setelan
   */
  getDataAwalLocalStorageFromSettings() {

    this.initAwalService.getDataPengaliLocalStorageSemua()
      .then(
        (isSukses) => {

          if (isSukses) {
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


  /**
   * Kirim data awal kembali ke halaman bus komponen service
   */
  sendBusKeKomponenHomeFromSettings() {
    setTimeout(
      () => {
        this.busServiceToComp.sendBusRefreshDataFromSettings();
      }, 2000
    );
  }
}

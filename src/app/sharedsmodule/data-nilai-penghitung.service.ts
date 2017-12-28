import { Injectable } from '@angular/core';
import { StoresLocalDataService } from './stores-data.service';
import {
  DATA_PENGALI_TUGAS, DATA_PENGALI_UAS, DATA_PENGALI_UTS, DEFAULT_PENGALI_TUGAS, DEFAULT_PENGALI_UAS,
  DEFAULT_PENGALI_UTS
} from './konstan-app';
import { UtilanPelengkap } from './utils-pelengkap';
import { DataNilaiPengali } from './localstorages/data-nilai';

@Injectable()
export class DataNilaiPenghitungService {

  utilPelengkap: UtilanPelengkap;

  constructor(private storesLocal: StoresLocalDataService) {
    this.utilPelengkap = new UtilanPelengkap();
  }

  // cek apakah sudah diinisialisasi atau belum
  checkNilaiAwalTersedia(): any {

    return new Promise(
      (resolve, reject) => {

        let isDataAwalTersedia = false;

        try {
          const mstringDefaultPengaliTugas = this.storesLocal.getDataWithKey(DATA_PENGALI_TUGAS);
          const mstringDefaultPengaliUTS = this.storesLocal.getDataWithKey(DATA_PENGALI_UTS);
          const mstringDefaultPengaliUAS = this.storesLocal.getDataWithKey(DATA_PENGALI_UAS);

          isDataAwalTersedia = this.utilPelengkap.isValidNumberFloatBenar(mstringDefaultPengaliTugas) &&
            this.utilPelengkap.isValidNumberFloatBenar(mstringDefaultPengaliUTS) &&
            this.utilPelengkap.isValidNumberFloatBenar(mstringDefaultPengaliUAS);
        } catch (e) {
          console.log(e);
          isDataAwalTersedia = false;
        }
        resolve(isDataAwalTersedia);
      },
    );
  }

  // inisialisasi data awal untuk penghitung
  initDataAwalPengaliKalkulasi(): any {

    return new Promise(
      (resolve, reject) => {
        this.storesLocal.addDataLocalStorage(DATA_PENGALI_TUGAS, DEFAULT_PENGALI_TUGAS);
        this.storesLocal.addDataLocalStorage(DATA_PENGALI_UTS, DEFAULT_PENGALI_UTS);
        this.storesLocal.addDataLocalStorage(DATA_PENGALI_UAS, DEFAULT_PENGALI_UAS);
        resolve(true);
      }
    );
  }

  // ambil data kembali dari local storage untuk penghitungnya
  getDataLocalStorageSemua(): any {

    return new Promise(
      (resolve, reject) => {
        const mstringDefaultPengaliTugas = this.storesLocal.getDataWithKey(DATA_PENGALI_TUGAS);
        const mstringDefaultPengaliUTS = this.storesLocal.getDataWithKey(DATA_PENGALI_UTS);
        const mstringDefaultPengaliUAS = this.storesLocal.getDataWithKey(DATA_PENGALI_UAS);

        const dataNilai = new DataNilaiPengali(mstringDefaultPengaliTugas, mstringDefaultPengaliUTS,
          mstringDefaultPengaliUAS);

        resolve(dataNilai);
      }
    );
  }

}

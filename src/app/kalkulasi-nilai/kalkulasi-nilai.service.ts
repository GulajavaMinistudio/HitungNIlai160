import { Injectable } from '@angular/core';
import { StoresLocalDataService } from '../sharedsmodule/stores-data.service';
import { DataNilaiPengali, DataNilaiKonversi } from '../sharedsmodule/localstorages/data-nilai';
import { isNullOrUndefined } from 'util';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/map';
import {
  DATA_PENGALI_TUGAS, DATA_PENGALI_UAS, DATA_PENGALI_UTS, DEFAULT_PENGALI_TUGAS, DEFAULT_PENGALI_UAS,
  DEFAULT_PENGALI_UTS
} from '../sharedsmodule/konstan-app';
import * as Predikat from '../sharedsmodule/localstorages/predikat-nilai';
import { UtilanPelengkap } from '../sharedsmodule/utils-pelengkap';

@Injectable()
export class KalkulasiNilaiService {

  stringDefaultPengaliTugas = DEFAULT_PENGALI_TUGAS;
  stringDefaultPengaliUTS = DEFAULT_PENGALI_UTS;
  stringDefaultPengaliUAS = DEFAULT_PENGALI_UAS;

  numberDefaultPengaliTugas = 0;
  numberDefaultPengaliUTS = 0;
  numberDefaultPengaliUAS = 0;

  utilPelengkap: UtilanPelengkap;

  constructor(private storeSetelan: StoresLocalDataService) {

    this.utilPelengkap = new UtilanPelengkap();
  }


  /**
   * kalkulasi nilai pelajaran berdasarkan data nilai yang dimasukkan pengguna
   * @param {DataNilaiKonversi} dataNilaiKonversi
   * @return {Observable<DataNilaiKonversi>}
   */
  kalkulasiNilaiPelajaranAkhir(dataNilaiKonversi: DataNilaiKonversi): Observable<DataNilaiKonversi> {

    return Observable.create(
      observer => {

        // ambil dari local storage
        try {
          const mstringDefaultPengaliTugas = this.storeSetelan.getDataWithKey(DATA_PENGALI_TUGAS);
          const mstringDefaultPengaliUTS = this.storeSetelan.getDataWithKey(DATA_PENGALI_UTS);
          const mstringDefaultPengaliUAS = this.storeSetelan.getDataWithKey(DATA_PENGALI_UAS);

          if (!isNullOrUndefined(mstringDefaultPengaliTugas)
            && !isNullOrUndefined(mstringDefaultPengaliUTS)
            && !isNullOrUndefined(mstringDefaultPengaliUAS)) {

            if (this.utilPelengkap.isEmptyStringsNulls(mstringDefaultPengaliTugas)
              && this.utilPelengkap.isEmptyStringsNulls(mstringDefaultPengaliUTS) &&
              this.utilPelengkap.isEmptyStringsNulls(mstringDefaultPengaliUAS)) {

              this.stringDefaultPengaliTugas = mstringDefaultPengaliTugas;
              this.stringDefaultPengaliUTS = mstringDefaultPengaliUTS;
              this.stringDefaultPengaliUAS = mstringDefaultPengaliUAS;

              dataNilaiKonversi.numberNilaiTugas = parseFloat(dataNilaiKonversi.stringNilaiTugas);
              dataNilaiKonversi.numberNilaiUTS = parseFloat(dataNilaiKonversi.stringNilaiUTS);
              dataNilaiKonversi.numberNilaiUAS = parseFloat(dataNilaiKonversi.stringNilaiUAS);
            }
          }
        } catch (e) {
          console.log(e);
        }

        this.numberDefaultPengaliTugas = parseFloat(this.stringDefaultPengaliTugas);
        this.numberDefaultPengaliUTS = parseFloat(this.stringDefaultPengaliUTS);
        this.numberDefaultPengaliUAS = parseFloat(this.stringDefaultPengaliUAS);

        observer.onNext(dataNilaiKonversi);
      }
    ).map(
      datanilaikonversi => {

        let nilaiAkhir = 0;
        const numberNilaiTugas = datanilaikonversi.numberNilaiTugas;
        const numberNilaiUTS = datanilaikonversi.numberNilaiUTS;
        const numberNilaiUAS = datanilaikonversi.numberNilaiUAS;

        // const nilaiAkhir = (nilaiTugas * 20 / 100) + (nilaiUTS * 35 / 100) + (nilaiUAS * 45 / 100);
        try {
          nilaiAkhir = (numberNilaiTugas * this.numberDefaultPengaliTugas / 100)
            + (numberNilaiUTS * this.numberDefaultPengaliUTS / 100)
            + (numberNilaiUAS * this.numberDefaultPengaliUAS / 100);
          datanilaikonversi.numberNilaiAkhir = nilaiAkhir;
        } catch (e) {
          console.log(e);
        }

        return datanilaikonversi;
      }
    ).catch(
      error => {
        console.log(error);
        console.log(error.message);
        return Observable.of(error);
      }
    );
  }

  /**
   * Ambil predikat nilai akhir dan keluarkan hasil dalam bentuk alphabet
   * @param {number} nilaiAkhir
   * @return {string}
   */
  getPredikatNilai(nilaiAkhir: number): string {

    let stringPredikatNilai = '-';

    if (nilaiAkhir > 80) {
      stringPredikatNilai = Predikat.PREDIKAT_NILAI_A;
    } else if (nilaiAkhir > 70) {
      stringPredikatNilai = Predikat.PREDIKAT_NILAI_B;
    } else if (nilaiAkhir > 60) {
      stringPredikatNilai = Predikat.PREDIKAT_NILAI_C;
    } else if (nilaiAkhir > 40) {
      stringPredikatNilai = Predikat.PREDIKAT_NILAI_D;
    } else {
      stringPredikatNilai = Predikat.PREDIKAT_NILAI_E;
    }

    return stringPredikatNilai;
  }

  /**
   * get predikat nama nilai berdasarkan nilai akhir
   * @param {number} nilaiAkhir
   * @return {string}
   */
  getPredikatNamaNilai(nilaiAkhir: number): string {

    let stringPredikatNilai = '-';

    if (nilaiAkhir > 80) {
      stringPredikatNilai = Predikat.PREDIKAT_NAMA_A;
    } else if (nilaiAkhir > 70) {
      stringPredikatNilai = Predikat.PREDIKAT_NAMA_B;
    } else if (nilaiAkhir > 60) {
      stringPredikatNilai = Predikat.PREDIKAT_NAMA_C;
    } else if (nilaiAkhir > 40) {
      stringPredikatNilai = Predikat.PREDIKAT_NAMA_D;
    } else {
      stringPredikatNilai = Predikat.PREDIKAT_NAMA_E;
    }

    return stringPredikatNilai;
  }
}

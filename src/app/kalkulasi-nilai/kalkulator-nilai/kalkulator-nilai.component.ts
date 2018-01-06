import { Component, OnDestroy, OnInit } from '@angular/core';
import { KalkulasiNilaiService } from '../kalkulasi-nilai.service';
import { Subscription } from 'rxjs/Subscription';
import { StateCommunicationKomponenService } from '../../sharedsmodule/busdata/state-communication-komponen.service';
import { UtilanPelengkap } from '../../sharedsmodule/utils-pelengkap';
import { DataNilaiKonversi } from '../../sharedsmodule/localstorages/data-nilai';
import { singletonInstanceDataNilai as instanceNilai } from '../../sharedsmodule/localstorages/singleton-data-nilai';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-kalkulator-nilai',
  templateUrl: './kalkulator-nilai.component.html',
  styleUrls: ['./kalkulator-nilai.component.css']
})
export class KalkulatorNilaiComponent implements OnInit, OnDestroy {

  nilaiTugas = '';
  nilaiUTS = '';
  nilaiUAS = '';
  nilaiAkhir = '0';
  nilaiHuruf = '-';
  nilaiPredikatKategori = '-';

  isNilaiTugasValid = true;
  isNilaiUTSValid = true;
  isNilaiUASValid = true;

  nilaiTugasKet = '0%';
  nilaiUTSKet = '0%';
  nilaiUASKet = '0%';

  dataNilaiKonversi: DataNilaiKonversi;
  dataNilaiHasil: DataNilaiKonversi;
  utilanPelengkap: UtilanPelengkap;

  compositeSubscriber: Subscription;

  constructor(private kalkulatorNilai: KalkulasiNilaiService,
              private stateComService: StateCommunicationKomponenService) {

    this.compositeSubscriber = new Subscription();
    this.subscribeDataBusKomponen();
    this.utilanPelengkap = new UtilanPelengkap();
  }

  ngOnInit(): void {
    if (this.compositeSubscriber.closed) {
      this.compositeSubscriber = new Subscription();
      this.subscribeDataBusKomponen();
    }
  }

  ngOnDestroy(): void {
    this.compositeSubscriber.unsubscribe();
  }

  subscribeDataBusKomponen() {

    this.compositeSubscriber.add(
      this.stateComService.dataNilaiBusSendHomeComponent$.subscribe(
        isSukses => {

          // set data
          if (isSukses) {
            this.nilaiTugasKet = instanceNilai.stringPengaliNilaiTugas + ' %';
            this.nilaiUTSKet = instanceNilai.stringPengaliNilaiUTS + ' %';
            this.nilaiUASKet = instanceNilai.stringPengaliNilaiUAS + ' %';
          }
        },
        errors => {
          console.log(errors);
        }
      )
    );
  }

  getDataHitunganNilai() {

    this.isNilaiTugasValid = true;
    this.isNilaiUTSValid = true;
    this.isNilaiUASValid = true;

    // cek nilai yang dimasukkan
    if (this.utilanPelengkap.isValidNumberFloatBenar(this.nilaiTugas)) {

      if (this.utilanPelengkap.isValidNumberFloatBenar(this.nilaiUTS)) {

        if (this.utilanPelengkap.isValidNumberFloatBenar(this.nilaiUAS)) {

          this.dataNilaiKonversi = new DataNilaiKonversi();
          this.dataNilaiKonversi.stringNilaiTugas = this.nilaiTugas;
          this.dataNilaiKonversi.stringNilaiUTS = this.nilaiUTS;
          this.dataNilaiKonversi.stringNilaiUAS = this.nilaiUAS;

          // hitung nilai sekolah
          this.hitungNilaiMataPelajaran();
        } else {
          this.isNilaiUASValid = false;
        }
      } else {
        this.isNilaiUTSValid = false;
      }
    } else {
      this.isNilaiTugasValid = false;
    }
  }

  hitungNilaiMataPelajaran() {

    const subscribtions = this.kalkulatorNilai.kalkulasiNilaiPelajaranAkhir(this.dataNilaiKonversi)
      .subscribe(
        (datahasil) => {
          this.dataNilaiHasil = datahasil;
          this.getKategoriPredikatNilai();
        },
        (err) => {
          console.log(err);
        }
      );

    this.compositeSubscriber.add(subscribtions);
  }

  getKategoriPredikatNilai() {

    try {
      this.nilaiAkhir = this.dataNilaiHasil.numberNilaiAkhir + '';
      this.nilaiHuruf = this.kalkulatorNilai.getPredikatNilai(this.dataNilaiHasil.numberNilaiAkhir);
      this.nilaiPredikatKategori = this.kalkulatorNilai.getPredikatNamaNilai(this.dataNilaiHasil.numberNilaiAkhir);
    } catch (e) {
      console.log(e);
    }
  }

  clickCloseDialog() {

    $('.message .close')
      .closest('.message')
      .transition('fade');

    // reset status dialog ke true semua
    setTimeout(
      () => {
        this.isNilaiTugasValid = true;
        this.isNilaiUTSValid = true;
        this.isNilaiUASValid = true;
      }, 500
    );
  }

}

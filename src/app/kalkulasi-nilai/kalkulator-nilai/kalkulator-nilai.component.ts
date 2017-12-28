import { Component, OnDestroy, OnInit } from '@angular/core';
import { KalkulasiNilaiService } from '../kalkulasi-nilai.service';
import { Subscription } from 'rxjs/Subscription';
import { StateCommunicationKomponenService } from '../../sharedsmodule/busdata/state-communication-komponen.service';
import { DataNilaiKonversi, DataNilaiPengali } from '../../sharedsmodule/localstorages/data-nilai';
import { UtilanPelengkap } from '../../sharedsmodule/utils-pelengkap';

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

  dataNilaiVal: DataNilaiPengali;
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
    }
    this.subscribeDataBusKomponen();
  }

  ngOnDestroy(): void {
    this.compositeSubscriber.unsubscribe();
  }

  subscribeDataBusKomponen() {

    this.compositeSubscriber.add(
      this.stateComService.dataNilaiBusSendHomeComponent$.subscribe(
        datanilaiPengali => {
          console.log('data json komponen ' + JSON.stringify(datanilaiPengali));

          // set data
          this.dataNilaiVal = datanilaiPengali;
          this.nilaiTugasKet = this.dataNilaiVal.stringNilaiTugas + ' %';
          this.nilaiUTSKet = this.dataNilaiVal.stringNilaiUTS + ' %';
          this.nilaiUASKet = this.dataNilaiVal.stringNilaiUAS + ' %';
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

          console.log('semua nilai benar');
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
        console.log('isi data UTS dengan benar');
        this.isNilaiUTSValid = false;
      }
    } else {
      console.log('isi data tugas dengan benar');
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

}

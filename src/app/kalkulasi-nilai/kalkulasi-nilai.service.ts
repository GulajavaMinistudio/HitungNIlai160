import { Injectable } from '@angular/core';
import { StoresOpsiSetelanService } from '../sharedsmodule/stores-opsi-setelan.service';

@Injectable()
export class KalkulasiNilaiService {

  constructor(storeSetelan: StoresOpsiSetelanService) {
  }

  hitungNilaiAkhir(nilaiTugas: number, nilaiUTS: number, nilaiUAS: number): string {

    const nilaiAkhir = (nilaiTugas * 20 / 100) + (nilaiUTS * 35 / 100) + (nilaiUAS * 45 / 100);

    return '';
  }
}

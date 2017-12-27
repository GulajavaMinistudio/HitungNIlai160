class DataNilai {

  public stringNilaiTugas = '0';
  public stringNilaiUTS = '0';
  public stringNilaiUAS = '0';

  constructor(stringNilaiTugas: string, stringNilaiUTS: string, stringNilaiUAS: string) {
    this.stringNilaiTugas = stringNilaiTugas;
    this.stringNilaiUTS = stringNilaiUTS;
    this.stringNilaiUAS = stringNilaiUAS;
  }
}

class DataNilaiKonversi {

  public stringNilaiTugas = '';
  public stringNilaiUTS = '';
  public stringNilaiUAS = '';

  public numberNilaiTugas = 0;
  public numberNilaiUTS = 0;
  public numberNilaiUAS = 0;
  public numberNilaiAkhir = 0;

  constructor() {
  }
}

export { DataNilai, DataNilaiKonversi };

/**
 * kelas Hello Item untuk sampel data kelas
 */
export class HelloItems {

  key: string;
  value: any;

  /**
   * @description kelas Hello Items untuk sampel return array
   * @param {string} datakey nilai data untuk kunci
   * @param nilaiVal nilai di dalam kata kunci
   */
  constructor(datakey: string, nilaiVal: any) {
    this.key = datakey;
    this.value = nilaiVal;
  }
}

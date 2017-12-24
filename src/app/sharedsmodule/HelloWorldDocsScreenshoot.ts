import { HelloItems } from './HelloItems';

class HelloWorldDocs {

  private stringDataHello: string;
  private numberBilanganJumlah: number;

  /**
   * @description konstruktor kelas hello world dokumentasi
   * @param strDataHello kata untuk inisialisasi awal
   * @param numBilanganJumlah bilangan untuk inisialisasi awal
   */
  constructor(strDataHello: string, numBilanganJumlah: number) {
    this.stringDataHello = strDataHello;
    this.numberBilanganJumlah = numBilanganJumlah;
  }


  /**
   * @description Munculkan kata untuk hello world sesuai dengan jumlah pengali
   * Selengkapnya tentang constructor dan kelas dapat dilihat di
   * halaman ini {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes| MDN Web Docs}
   * @param {string} kataHello kata hello world yang ingin dikalikan
   * @param {number} jumlahPengali jumlah pengali untuk memunculkan kata hello world Untuk snippet code lainnya,
   * dapat dilihat di {@link https://30secondsofcode.org}
   * @see https://googlechrome.github.io/samples/classes-es6/
   * @see <a href="https://googlechrome.github.io/samples/classes-es6/">Dokumentasi Chrome ES6</a> untuk keterangan lebih lanjut
   */
  getHelloWorld(kataHello: string, jumlahPengali: number) {

    this.stringDataHello = kataHello;
    this.numberBilanganJumlah = jumlahPengali;

    const kataHelloReturn = this.stringDataHello + ' ' + this.numberBilanganJumlah;
  }


  /**
   * @description get hello world dengan nilai balikan string
   * @param {string} kataHello kata hello world yang ingin dikembalikan
   * @return {string} data balikan berupa baris kalimat
   */
  getHelloWorldReturn(kataHello: string): string {

    this.stringDataHello = kataHello;
    return 'hello world dengan return ' + kataHello;
  }


  /**
   * @description get hello world dengan nilai balikan array
   * @param {string} kataHello kata hello world yang ingin dikembalikan
   * @return {string[]} data balikan berupa array string
   */
  getHelloWorldReturnArray(kataHello: string): string[] {

    this.stringDataHello = kataHello;
    const arrayString: string[] = ['hello world', kataHello, 'return array'];
    return arrayString;
  }


  /**
   * @description get hello world dengan nilai balikan array kelas
   * @param {string} kataHello kata hello world yang ingin dikembalikan
   * @return {HelloItems[]} Array dari kelas {@link HelloItems} hasil diolah
   */
  getHelloWorldReturnArrayClass(kataHello: string): HelloItems[] {

    this.stringDataHello = kataHello;
    const keySampel = 'hello world key';

    const arrayString: HelloItems[] = [];
    const helloItem = new HelloItems(this.stringDataHello, keySampel);
    arrayString.push(helloItem);

    return arrayString;
  }

}

export { HelloWorldDocs as HelloWorldDocument };
















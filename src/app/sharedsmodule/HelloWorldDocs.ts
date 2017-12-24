/**
 * Kelas latihan untuk hello world
**/
class HelloWorldDocs {

  private stringDataHello: string;
  private numberBilanganJumlah: number;

  /**
   * @constructor
   * @external classes-es6
   * @description Membuat kelas hello world untuk dokumentasi
   * @class HelloWorldDokumentasi
   * @param strDataHello data string awalan untuk kata hello world
   * @param numBilanganJumlah data string awalan untuk
   * Selengkapnya tentang constructor dan kelas dapat dilihat di
   * halaman ini {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes|MDN Web Docs}
   * atau halaman ini tanpa alias {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes}
   * @see https://googlechrome.github.io/samples/classes-es6/
   * @see <a href="https://googlechrome.github.io/samples/classes-es6/">Chrome ES6</a> untuk keterangan lebih lanjut
   */
  constructor(strDataHello: string, numBilanganJumlah: number) {
    this.stringDataHello = strDataHello;
    this.numberBilanganJumlah = numBilanganJumlah;
  }


  /**
   * @description Munculkan kata untuk hello world sesuai dengan jumlah pengali
   * @param {string} kataHello string kata dalam bentuk string yang akan dikalikan
   * @param {number} jumlahPengali number  untuk menampilkan jumlah dari kata untuk hello world
   * @return {string} nilai balikan string berbentuk kata hello world sesuai jumlah pengali dalam bentuk string
   **/
  kalkulasiHelloWorld(kataHello: string, jumlahPengali: number): string {

    let kataHelloReturn = '';
    this.stringDataHello = kataHello;
    this.numberBilanganJumlah = jumlahPengali;

    for (let i = 0; i < jumlahPengali; i += 1) {
      kataHelloReturn = this.stringDataHello + ' ' + kataHelloReturn;
    }
    return kataHelloReturn;
  }

  /**
   * @description Munculkan kata untuk hello world sesuai dengan jumlah pengali
   * @param {string} kataHello kataHello kata dalam bentuk string yang akan dikalikan
   * @param {number} jumlahPengali untuk menampilkan jumlah dari kata untuk hello world
   */
  getHelloWorld(kataHello: string, jumlahPengali: number) {

    this.stringDataHello = kataHello;
    this.numberBilanganJumlah = jumlahPengali;

    const kataHelloReturn = this.stringDataHello + ' ' + this.numberBilanganJumlah;
  }



  /***
   * @description Ambil karakter satu sampai kedua dari kata yang diberikan
   * @param kataHello {string} yang akan dioperasikan
   * @return {string} nilai balikan berupa kata yang telah dipecah
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
   */
  operasiKataHelloWorld(kataHello: string): string {

    this.stringDataHello = kataHello;
    let kataHelloReturn = '';
    if (this.stringDataHello.length > 3) {
      kataHelloReturn = this.stringDataHello.substring(0, 2);
    } else {
      kataHelloReturn = this.stringDataHello;
    }
    return kataHelloReturn;
  }

  /**
   * @description reset data kata kelas kembali ke nilai awalan
   * sehingga kelas menjadi normal kembali
   **/
  resetKataHello() {

    this.stringDataHello = '';
    this.numberBilanganJumlah = 0;
  }
}

export { HelloWorldDocs as HelloWorldDocsFull};

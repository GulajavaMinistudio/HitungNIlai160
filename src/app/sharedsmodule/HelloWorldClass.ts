import { HelloWorldDocsFull } from './HelloWorldDocs';

export class HelloWorldClass {

  helloWord: HelloWorldDocsFull;

  constructor() {
    this.helloWord = new HelloWorldDocsFull('hello', 5);
  }

  testOperasiKataHello() {

    const hasilHello = this.helloWord.operasiKataHelloWorld('hello world');
    this.helloWord.operasiKataHelloWorld('hello saja');
    console.log(hasilHello);
  }

  testKalkulasiHelloDocs() {
    const hasil = this.helloWord.kalkulasiHelloWorld('hello kali', 10);
    console.log(hasil);
  }

  testResetHelloDocs() {

    this.helloWord.resetKataHello();
  }
}

import { HelloWorldDocument } from './HelloWorldDocsScreenshoot';

export class TesHelloDocs {

  helloDoc: HelloWorldDocument;

  constructor() {
    this.helloDoc = new HelloWorldDocument('hello', 5);
  }

  /* panggil fungsi pertama*/
  tesGetHelloWorld() {
    this.helloDoc.getHelloWorld('hello documentasi', 8);
  }

  tesGetHelloWorldReturn() {

    const dataString = this.helloDoc.getHelloWorldReturn('hello kata string balik');
    const dataStringArray = this.helloDoc.getHelloWorldReturnArray('hello array');
    const dataStringClass = this.helloDoc.getHelloWorldReturnArrayClass('hello class');
  }
































}

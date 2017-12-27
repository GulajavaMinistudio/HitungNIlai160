import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DataNilai } from '../localstorages/data-nilai';

@Injectable()
export class StateCommunicationKomponenService {

  // observable any sources
  dataNilaiBusSendHomeComponent = new Subject<any>();
  // observable string streams
  dataNilaiBusSendHomeComponent$ = this.dataNilaiBusSendHomeComponent.asObservable();

  constructor() { }

  sendBusDataNilaiToKomponen(dataNilai: DataNilai) {
    this.dataNilaiBusSendHomeComponent.next(dataNilai);
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DataNilaiPengali } from '../localstorages/data-nilai';

@Injectable()
export class StateCommunicationKomponenService {

  // observable any sources untuk komunikasi parent component ke component kalkulator
  dataNilaiBusSendHomeComponent = new Subject<any>();
  // observable string streams
  dataNilaiBusSendHomeComponent$ = this.dataNilaiBusSendHomeComponent.asObservable();

  // observable any untuk komunikasi dari settings component ke parent component
  notifRefreshData = new Subject<any>();
  notifRefreshData$ = this.notifRefreshData.asObservable();


  constructor() { }

  sendBusDataNilaiToKomponen(dataNilai: DataNilaiPengali) {
    this.dataNilaiBusSendHomeComponent.next(dataNilai);
  }

  sendBusDataNotifikasiToKomponen() {
    this.notifRefreshData.next(true);
  }
}

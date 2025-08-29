import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarserviceService {

  constructor() { }

  private isSidebarOpenSubject = new BehaviorSubject<boolean>(false);
  isSidebarOpen$ = this.isSidebarOpenSubject.asObservable();

  openSidebar() {
    this.isSidebarOpenSubject.next(true);
  }

  closeSidebar() {
    this.isSidebarOpenSubject.next(false);
  }
}

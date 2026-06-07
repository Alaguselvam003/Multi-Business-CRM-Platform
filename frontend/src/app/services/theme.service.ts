import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeSub = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkModeSub.asObservable();

  toggleDarkMode() {
    this.darkModeSub.next(!this.darkModeSub.value);
  }

  get isDarkMode() {
    return this.darkModeSub.value;
  }
}

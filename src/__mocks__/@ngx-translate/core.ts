import { Injectable, Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "translate" })
export class TranslatePipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

@Injectable()
export class TranslateService {
  setDefaultLang = jest.fn();
  use = jest.fn();
  getBrowserLang = jest.fn();
}

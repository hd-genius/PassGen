import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'translate'})
export class TranslatePipe implements PipeTransform {
    transform(value: any): any {
        return value;
    }
}
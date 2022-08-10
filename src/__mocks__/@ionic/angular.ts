import { Injectable } from "@angular/core";

export const { IonicModule } = jest.requireActual('@ionic/angular');

@Injectable()
export class Platform {
    ready = jest.fn();

    constructor() {
        this.ready.mockReturnValue(Promise.resolve());
    }
}

@Injectable()
export class ToastController {
    create = jest.fn();

    constructor() {
        this.create.mockReturnValue(Promise.resolve());
    }
}

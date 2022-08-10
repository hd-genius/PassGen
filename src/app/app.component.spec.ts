import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';

import 'jest';

jest.mock('@ionic/angular');
jest.mock('@ionic-native/splash-screen/ngx');
jest.mock('@ionic-native/status-bar/ngx');

describe('AppComponent', () => {

  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        StatusBar,
        SplashScreen,
        Platform,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  });

  it('should initialize the app', async () => {
    const statusBar = TestBed.get(StatusBar);
    const splashScreen = TestBed.get(SplashScreen);
    const platform = TestBed.get(Platform);
    TestBed.createComponent(AppComponent);
    expect(platform.ready).toHaveBeenCalled();
    expect(statusBar.styleDefault).toHaveBeenCalled();
    expect(splashScreen.hide).toHaveBeenCalled();
  });

  it('should generate a password with the correct length', () => {
    const testLength = 3;

    app.criteriaForm.controls.length.setValue(testLength);
    app.getNewPassword();

    expect(app.output.length).toEqual(testLength);
  });

  it('should use lower case letters when lower case is enabled', () => {
    let result: string;
    app.criteriaForm.controls.lowerUsage.setValue(true);
    app.getNewPassword();
    result = app.output;
    expect(result).toMatch(/^[a-z]{5}$/);
    app.criteriaForm.controls.lowerUsage.setValue(false);
  });

  it('should use upper case letters when upper case is enabled', () => {
    app.criteriaForm.controls.lowerUsage.setValue(false);
    app.criteriaForm.controls.upperUsage.setValue(true);
    app.getNewPassword();
    const result = app.output;
    expect(result).toMatch(/^[A-Z]{5}$/);
  });

  it('should use numbers when numbers are enabled', () => {
    app.criteriaForm.controls.lowerUsage.setValue(false);
    app.criteriaForm.controls.numberUssage.setValue(true);
    app.getNewPassword();
    const result = app.output;
    expect(result).toMatch(/^[0-9]{5}$/);
  });

  it('should use the provided special characters when the special toggle is enabled', () => {
    app.criteriaForm.controls.lowerUsage.setValue(false);
    app.criteriaForm.controls.specialUsage.setValue(true);
    app.criteriaForm.controls.specialCharacters.setValue('!-_');
    app.getNewPassword();
    const result = app.output;
    expect(result).toMatch(/^[!-_]{5}$/);
  });

});

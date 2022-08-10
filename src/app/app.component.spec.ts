import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";

import { IonicModule, Platform, ToastController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { TranslatePipe, TranslateService } from "@ngx-translate/core";

import { AppComponent } from "./app.component";

import "jest";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UsageSelectorComponent } from "./usage-selector/usage-selector.component";

jest.mock("@ionic/angular");
jest.mock("@ionic-native/splash-screen/ngx");
jest.mock("@ionic-native/status-bar/ngx");
jest.mock("@ngx-translate/core");

describe("AppComponent", () => {
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, IonicModule.forRoot()],
      declarations: [AppComponent, TranslatePipe, UsageSelectorComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        StatusBar,
        SplashScreen,
        Platform,
        ToastController,
        TranslateService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    // app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it("should initialize the app", async () => {
    const statusBar = TestBed.get(StatusBar);
    const splashScreen = TestBed.get(SplashScreen);
    const platform = TestBed.get(Platform);
    const readyPromise = Promise.resolve();
    platform.ready.mockReturnValue(readyPromise);
    TestBed.createComponent(AppComponent);
    expect(platform.ready).toHaveBeenCalled();
    await readyPromise;
    expect(statusBar.styleDefault).toHaveBeenCalled();
    expect(splashScreen.hide).toHaveBeenCalled();
  });

  it("should generate a password with the correct length", () => {
    const testLength = 3;

    app.criteriaForm.controls.length.setValue(testLength);
    app.getNewPassword();

    expect(app.output.length).toEqual(testLength);
  });

  it.skip("should use lower case letters when lower case is enabled", () => {
    let result: string;
    app.criteriaForm.controls.lowerUsage.setValue(true);
    app.getNewPassword();
    result = app.output;
    expect(result).toMatch(/^[a-z]{5}$/);
    app.criteriaForm.controls.lowerUsage.setValue(false);
  });

  it.skip("should use upper case letters when upper case is enabled", () => {
    app.criteriaForm.controls.lowerUsage.setValue(false);
    app.criteriaForm.controls.upperUsage.setValue(true);
    app.getNewPassword();
    const result = app.output;
    expect(result).toMatch(/^[A-Z]{5}$/);
  });

  it.skip("should use numbers when numbers are enabled", () => {
    app.criteriaForm.controls.lowerUsage.setValue(false);
    app.criteriaForm.controls.numberUsage.setValue(true);
    app.getNewPassword();
    const result = app.output;
    expect(result).toMatch(/^[0-9]{5}$/);
  });

  it.skip("should use the provided special characters when the special toggle is enabled", () => {
    app.criteriaForm.controls.lowerUsage.setValue(false);
    app.criteriaForm.controls.specialUsage.setValue(true);
    app.criteriaForm.controls.specialCharacters.setValue("!-_");
    app.getNewPassword();
    const result = app.output;
    expect(result).toMatch(/^[!-_]{5}$/);
  });
});

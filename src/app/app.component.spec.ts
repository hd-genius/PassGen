import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";

import { IonicModule, Platform, ToastController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { TranslatePipe, TranslateService } from "@ngx-translate/core";

import { AppComponent } from "./app.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UsageSelectorComponent } from "./usage-selector/usage-selector.component";
import { CriteriaUsageState } from "./criteria-usage-state.enum";

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

  it("should use only lower case letters when only lower case is enabled", () => {
    let result: string;
    app.criteriaForm.controls.lowerUsage.setValue(CriteriaUsageState.CAN_USE);
    app.getNewPassword();
    result = app.output;
    expect(result).toMatch(/^[a-z]*$/);
  });

  it.todo(
    "should include at least 1 lower case letter when lower case letters are required"
  );

  it("should use only upper case letters when only upper case is enabled", () => {
    app.criteriaForm.controls.lowerUsage.setValue(
      CriteriaUsageState.DO_NOT_USE
    );
    app.criteriaForm.controls.upperUsage.setValue(CriteriaUsageState.CAN_USE);
    app.getNewPassword();
    const result = app.output;
    expect(result).toMatch(/^[A-Z]*$/);
  });

  it.todo(
    "should include at least 1 upper case letter when upper case letters are required"
  );

  it("should use only numbers when only numbers are enabled", () => {
    app.criteriaForm.controls.lowerUsage.setValue(
      CriteriaUsageState.DO_NOT_USE
    );
    app.criteriaForm.controls.numberUsage.setValue(CriteriaUsageState.CAN_USE);
    app.getNewPassword();
    const result = app.output;
    expect(result).toMatch(/^[0-9]*$/);
  });

  it.todo("should include at least 1 number when numbers are required");

  it("should use only the provided special characters when only the special characters are enabled", () => {
    app.criteriaForm.controls.lowerUsage.setValue(
      CriteriaUsageState.DO_NOT_USE
    );
    app.criteriaForm.controls.specialUsage.setValue(CriteriaUsageState.CAN_USE);
    app.criteriaForm.controls.specialCharacters.setValue("!-_");
    app.getNewPassword();
    const result = app.output;
    expect(result).toMatch(/^[!-_]*$/);
  });

  it.todo(
    "should include at least 1 special character when special characters are required"
  );
});

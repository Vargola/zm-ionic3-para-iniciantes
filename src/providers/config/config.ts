import { Injectable } from '@angular/core';

let CONFIG_KEY_NAME = "config";

@Injectable()
export class ConfigProvider {

  constructor() {
  }

  setConfigData(showSlide?: boolean, name?: string, userName?: string) {
    let config = {
      showSlide: false,
      name: "",
      userName: ""
    }
    if (showSlide != null) {
      config.showSlide = showSlide;
    }
    if (name != null) {
      config.name = name;
    }
    if (userName != null) {
      config.userName = userName;
    }
    localStorage.setItem(CONFIG_KEY_NAME, JSON.stringify(config));
  }

  getConfigData(): any {
    return localStorage.getItem(CONFIG_KEY_NAME);
  }

}

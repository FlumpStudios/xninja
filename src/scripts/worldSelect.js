import * as config from "./config.js";

let menuIndex = 0;

export const updateMenu = (runtime) => {
    const inst = runtime.objects.MenuBorder.getAllInstances();
    for (let i = 0; i < inst.length; i++) {
        if (i === menuIndex) {
            runtime.objects.MenuBorder.getAllInstances()[i].behaviors.Sine.isEnabled = true;
        }
        else {
            runtime.objects.MenuBorder.getAllInstances()[i].behaviors.Sine.isEnabled = false;
        }

    }
}

export const selectUp = (runtime) => {
    menuIndex--;
    if (menuIndex < 0) {
        menuIndex = runtime.objects.MenuBorder.getAllInstances().length - 1;
    }
}

export const selectDown = (runtime) => {
    menuIndex++;
    if(menuIndex >= runtime.objects.MenuBorder.getAllInstances().length) {
        menuIndex = 0;
    }
}

export const confirm = (runtime) => {
    config.setCurrentWorld("Level_" + (menuIndex + 1).toString());
    console.log(config.getCurrentWorld());
    runtime.goToLayout(config.LEVEL_SELECT_NAME);
}

export const back = (runtime) => {
    runtime.goToLayout(config.MAIN_MENU_NAME);
}
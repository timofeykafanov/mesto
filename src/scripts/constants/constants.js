import { popupConfig } from "./popupConfig.js";
import { userConfig } from "./userConfig.js";

export const editButton = document.querySelector(popupConfig.editButtonSelector);
export const addButton = document.querySelector(popupConfig.addButtonSelector);
export const avatarButton = document.querySelector(popupConfig.avatarButtonSelector);
export const editForm = document.querySelector(popupConfig.editFormSelector);
export const addForm = document.querySelector(popupConfig.addFormSelector);
export const avatarForm = document.querySelector(popupConfig.avatarFormSelector);
export const nameField = document.querySelector(popupConfig.nameFieldSelector);
export const aboutField = document.querySelector(popupConfig.aboutFieldSelector);

export const userNameSelector = userConfig.userNameSelector;
export const userAboutSelector = userConfig.userAboutSelector;
export const userAvatarSelector = userConfig.userAvatarSelector;
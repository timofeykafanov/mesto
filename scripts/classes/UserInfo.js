class UserInfo {
    constructor(userConfig) {
        this._config = userConfig;
        this._nameField = document.querySelector(userConfig.nameFieldSelector);
        this._postField = document.querySelector(userConfig.postFieldSelector);
        this._profileName = document.querySelector(userConfig.profileNameSelector);
        this._profilePost = document.querySelector(userConfig.profilePostSelector);
    }

    getUserInfo() {
        this._nameField.value = this._profileName.textContent;
        this._postField.value = this._profilePost.textContent;
    }

    setUserInfo() {
        this._profileName.textContent = this._nameField.value;
        this._profilePost.textContent = this._postField.value;
    }
}

export default UserInfo;
class UserInfo {
    constructor({userNameSelector, userAboutSelector, userAvatarSelector}) {
        this._userName = document.querySelector(userNameSelector);
        this._userAbout = document.querySelector(userAboutSelector);
        this._userAvatar = document.querySelector(userAvatarSelector);
    }

    getUserInfo() {
        return this._userInfo = {
            name: this._userName.textContent,
            about: this._userAbout.textContent
        };
    }

    getUserId(data) {
        const userId = data._id;
        return userId;
    }

    setUserInfo({name, about}) {
        this._userName.textContent = name;
        this._userAbout.textContent = about;
    }

    setUserAvatar(inputValues) {
        this._userAvatar.style.backgroundImage = `url('${inputValues.avatar}')`;
    }
}

export default UserInfo;
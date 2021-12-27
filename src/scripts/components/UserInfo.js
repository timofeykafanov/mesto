class UserInfo {
    constructor({userNameSelector, userPostSelector}) {
        this._userName = document.querySelector(userNameSelector);
        this._userPost = document.querySelector(userPostSelector);
    }

    getUserInfo() {
        return this._userInfo = {
            name: this._userName.textContent,
            post: this._userPost.textContent
        };
    }

    setUserInfo({name: nameValue, post: postValue}) {
        this._userName.textContent = nameValue;
        this._userPost.textContent = postValue;
    }
}

export default UserInfo;
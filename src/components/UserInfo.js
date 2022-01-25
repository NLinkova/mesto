export default class UserInfo {
    constructor(userNameSelector, userAboutSelector) {
        this._userNameSelector = userNameSelector;
        this._userAboutSelector = userAboutSelector;

        this._userName = document.querySelector('.profile__name');
        this._userAbout = document.querySelector('.profile__description');
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            about: this._userAbout.textContent
        };
    }

    setUserInfo({ name, about }) {
        this._userName.textContent = name;
        this._userAbout.textContent = about;
    }
}

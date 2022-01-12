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
            desc: this._userAbout.textContent
        };
    }

    setUserInfo({ name, desc }) {
        this._userName.textContent = name;
        this._userAbout.textContent = desc;
    }
}

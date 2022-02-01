export default class UserInfo {
    constructor(userNameSelector, userAboutSelector, userAvatarSelector) {
        this._userNameSelector = userNameSelector;
        this._userAboutSelector = userAboutSelector;
        this._userAvatarSelector = userAvatarSelector;
        this._userName = document.querySelector('.profile__name');
        this._userAbout = document.querySelector('.profile__description');
        this._userAvatar = document.querySelector('.profile__avatar');
    }

    getUserInfo() {
        this._profileFields = {}
        this._profileFields.name = this._userName.textContent;
        this._profileFields.about = this._userAbout.textContent;
        return this._profileFields;
    }

    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userAbout.textContent = data.about;
        this._userAvatar.src = data.avatar;
    }

}

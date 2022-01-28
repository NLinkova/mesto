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
        return {
            name: this._userName.textContent,
            about: this._userAbout.textContent
        };
    }

    getUserAvatar() {
		return {
			avatar: this._userAvatar.src,
		};
	}

    setUserInfo({ name, about }) {
        this._userName.textContent = name;
        this._userAbout.textContent = about;
    }

    setUserAvatar(avatar) {
		this._userAvatar.src = avatar;
	}
}

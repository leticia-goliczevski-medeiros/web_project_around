export default class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector, user }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileDescription = document.querySelector(
      profileDescriptionSelector
    );
  }
  setUserInfo(user) {
    this._profileName.textContent = user.name;
    this._profileDescription.textContent = user.about;
  }
}

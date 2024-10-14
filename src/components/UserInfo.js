export default class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector, user }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileDescription = document.querySelector(
      profileDescriptionSelector
    );
    this._profilePicture = document.querySelector(".profile__picture");
  }
  getUserInfo() {
    return {
      userName: this._profileName.textContent,
      userDescription: this._profileDescription.textContent,
    };
  }
  setUserInfo(user) {
    this._profileName.textContent = user.name;
    this._profileDescription.textContent = user.about;
    this._profilePicture.setAttribute("src", user.avatar);
  }
}

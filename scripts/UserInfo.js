class UserInfo {
  constructor({ name, job }) {
    this._userName = name;
    this._userDescription = job;
  }
  getUserInfo() {
    return { userName: this._userName, userDescription: this._userDescription };
  }
  setUserInfo() {
    this._profileName = document.querySelector(".profile__name");
    this._profileDescription = document.querySelector(".profile__description");

    this._profileName.textContent = this._userName;
    this._profileDescription.textContent = this._userDescription;
  }
}

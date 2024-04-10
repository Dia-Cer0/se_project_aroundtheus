import Popup from "./Popup";

export default class popupWithImage extends Popup {
  constructor({ popupSelector }, cardData) {
    super({ popupClassSelector: popupSelector });
    //console.log(this._popupElement);
    this._setImageEventListeners();
  }

  _setImageEventListeners() {
    this._popupElement.firstChild.addEventListener("click", super.open());
  }
}

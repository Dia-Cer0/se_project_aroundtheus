import jquery from "jquery";
import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }, cardData) {
    super({ popupClassSelector: popupSelector });
    this._popupImage = this._popupElement.querySelector("img");
    this._popupImageName = this._popupElement.querySelector("figcaption");
  }

  //BULLET POINT #9 RESOLUTION
  open({ _cardImage: { alt, src }, _name: name }) {
    this._popupImage.alt = alt;
    this._popupImage.src = src;
    this._popupImageName.textContent = name;

    super.open();
  }
}

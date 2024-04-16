export default class UserInfo {
  constructor({ name, job }) {
    this.nameElement = document.querySelector(name);
    this.jobElement = document.querySelector(job);
    //console.log(`this.name value: ${this.nameElement.textContent}`);
  }

  getUserInfo() {
    const nameUpdated = this.nameElement.textContent;
    const jobUpdated = this.jobElement.textContent;

    return { profile_title: nameUpdated, profile_description: jobUpdated };
  }

  setUserInfo(formData) {
    const { input1: nameFormVal, input2: jobFormVal } = formData;

    this.nameElement.textContent = nameFormVal;
    this.jobElement.textContent = jobFormVal;
  }
}

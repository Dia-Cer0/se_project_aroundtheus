export default class UserInfo {
  constructor(
    { name, job, avatar },
    pullServerProfileData,
    updateServerProfileData
  ) {
    this.nameElement = document.querySelector(name);
    this.jobElement = document.querySelector(job);
    this.avatarElement = document.querySelector(avatar);
    this.pullServerProfileData = pullServerProfileData;
    this.updateServerProfileData = updateServerProfileData;

    pullServerProfileData()
      .then((res) => {
        res.input1 = res.name;
        delete res.name;
        res.input2 = res.about;
        delete res.about;
        console.log(res);
        return res;
      })
      .then((res) => {
        this.setUserInfo(res);
      });
    //console.log(`this.name value: ${this.nameElement.textContent}`);
  }

  getUserInfo() {
    const serverData = this.pullServerProfileData().then((res) => {
      this.nameElement.textContent = res.name;
      this.jobElement.textContent = res.about;
      const nameUpdated = this.nameElement.textContent;
      const jobUpdated = this.jobElement.textContent;
      return { profile_title: nameUpdated, profile_description: jobUpdated };
    });
    return serverData;
  }

  setUserInfo(formData) {
    var { input1: nameFormVal, input2: jobFormVal } = formData;

    this.nameElement.textContent = nameFormVal;
    this.jobElement.textContent = jobFormVal;
    formData.name = formData.input1;
    formData.about = formData.input2;
    this.avatarElement.src = formData.avatar;
    this.updateServerProfileData(formData);
  }
}

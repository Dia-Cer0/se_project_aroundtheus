export default class UserInfo {
  constructor(
    { name, job, avatar },
    pullServerProfileData,
    updateServerProfileData
  ) {
    this.nameElement = document.querySelector(name);
    this.jobElement = document.querySelector(job);
    this.avatarElement = document.querySelector(avatar);
  }

  getUserInfo() {
    // const serverData = this.pullServerProfileData().then((res) => {
    console.log("assign the name element to the value from the server");
    //this.nameElement.textContent = res.name;

    console.log("assign the job element to the value from the server");
    //this.jobElement.textContent = res.about;

    const nameUpdated = this.nameElement.textContent;
    const jobUpdated = this.jobElement.textContent;
    const serverData = {
      profile_title: nameUpdated,
      profile_description: jobUpdated,
    };
    return serverData;
    //});
    //return serverData;
  }

  setUserInfo(formData) {
    if (formData.input1) {
      var { input1: nameFormVal, input2: jobFormVal } = formData;

      this.nameElement.textContent = nameFormVal;
      this.jobElement.textContent = jobFormVal;
      formData.name = formData.input1;
      formData.about = formData.input2;
      //this.updateServerProfileData(formData);
    }
    if (formData.avatar) {
      this.avatarElement.src = formData.avatar;
      //this.updateServerProfileData(formData);
    }
  }
}

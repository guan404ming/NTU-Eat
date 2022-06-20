<template>
  <div>
    <ne-header></ne-header>
    <div class="container">
      <h1>編輯個人檔案</h1>

      <img :src="avatar" :class="{ 'no-pic': user.removeAvatar }" />
      <a @click="this.handleUploadAvatar()">更換您的頭貼</a>

      <div class="inputsection">
        <h2>使用者名稱</h2>
        <input :placeholder="username" v-model="username" />
      </div>

      <div class="inputsection">
        <h2>暱稱</h2>
        <input :placeholder="user.displayName" v-model="user.displayName" />
      </div>

      <div class="inputsection">
        <h2>自我介紹</h2>
        <textarea
          placeholder="請輸入內文"
          v-model="user.description"
        ></textarea>
      </div>

      <ne-go-button
        @click="
          handleUpdateProfile();
          handleUpdateUsername();
        "
      ></ne-go-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  margin: 20px;
  border: 1px solid #707070;
  border-radius: 20px;
  text-align: center;
  h1 {
    text-align: center;
    margin-top: 38px auto 28px auto;
  }
  img {
    display: inline-block;
    margin-top: 10px;
    border-radius: 50%;
    height: 16vw;
    width: 16vw;
    max-height: 300px;
    max-height: 300px;
    object-fit: cover;
    vertical-align: middle;
    &.no-pic {
      display: none;
    }
  }
  a {
    display: block;
    margin: 14px auto 5vw auto;
    text-align: center;
    text-decoration: underline;
    font-size: 14px;
    color: #707070;
    &:hover {
      cursor: pointer;
    }
  }
  h2 {
    margin: 0px auto 6px 11vw;
    text-align: left;
    font-size: 16px;
    line-height: 19px;
    color: #707070;
  }
  .inputsection {
    display: block;
    input,
    textarea {
      margin: 0 auto 16px auto;
      padding: 0 18px;
      height: 48px;
      width: 76vw;
      border: none;
      border-radius: 24px;
      background-color: #f4f4f4;
      font-size: 14px;
      &::placeholder {
        line-height: 20px;
        letter-spacing: 0px;
        color: #707070;
      }
    }
    textarea {
      height: 16vh;
      padding-top: 12px;
    }
  }
}
</style>

<script>
import NeHeader from "@/components/NeHeader.vue";
import NeGoButton from "@/components/NeGoButton.vue";
import { getApi, popup, getData } from "@/GlobalSettings.js";

export default {
  name: "UpdateProfile",
  components: {
    NeHeader,
    NeGoButton,
  },

  setup() {
    const api = getApi();
    const data = getData();
    return {
      api,
      popup,
      data
    };
  },

  created() {
    this.getUserInfo();
  },

  data() {
    return {
      user: {
        targetUserId: null,
        avatar: null,
        removeAvatar: false,
        displayName: "",
        description: "",
      },
      username: null,
      avatar: null,
    };
  },

  methods: {
    getUserInfo() {
      const _this = this;
      _this.axios
        .get(_this.api + "user/info/", { withCredentials: true })
        .then((res) => {
          if (res.data.state === "success") {
            this.username = res.data.data.user.username;
            this.user.targetUserId = res.data.data.user.id;
            this.avatar =
              this.data + "user/" +
              res.data.data.superUser.avatar[0].filename;
            this.user.description = res.data.data.superUser.description;
            this.user.displayName = res.data.data.superUser.displayName;
          } else {
            const errorMsg = res.data.error;
            console.log(errorMsg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    handleUpdateUsername() {
      const _this = this;
      const usernameformdata = new FormData();
      usernameformdata.append("username", _this.username);

      _this.axios
        .post(_this.api + "user/update/username/", usernameformdata, {
          withCredentials: true,
        })
        .then((res) => {
          if (!res.data.state === "success") {
            const errorMsg = res.data.error;
            this.checkError(errorMsg);
          } else {
            console.log(res);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    checkError(errorMsg) {
      // check username error
      if (errorMsg.username === "noInput") {
        _this.popup("請輸入新用戶名稱", "確認", "question");
      }
      if (errorMsg.username === "formatError") {
        _this.popup("用戶名稱格式錯誤", "確認", "error");
      }
      if (errorMsg.username === "used") {
        _this.popup("用戶名稱已被使用", "確認", "error");
      }

      // check general error
      if (errorMsg.general === "ServerError") {
        _this.popup("伺服器錯誤", "請洽客服", "question");
      }
      if (errorMsg.general === "unauthorised") {
        _this.popup("請先登入", "確認", "error");
      }
    },

    handleUpdateProfile() {
      const _this = this;
      const profileformdata = new FormData();
      // profileformdata.append('targetUserId', _this.user.targetUserId)
      if (!_this.user.removeAvatar) {
        profileformdata.append("avatar", _this.user.avatar);
      } else {
        profileformdata.append("removeAvatar", _this.user.removeAvatar);
      }
      profileformdata.append("displayName", _this.user.displayName);
      profileformdata.append("description", _this.user.description);

      _this.axios
        .post(_this.api + "user/update/profile/", profileformdata, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.state === "success") {
            _this.popup("個人檔案已成功編輯", "返回", "success");
            this.setRedirection();
          } else {
            const errorMsg = res.data.error;
            console.log(errorMsg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    setRedirection() {
      var checkbutton = this.$swal.getConfirmButton();
      checkbutton.addEventListener("click", () => {
        this.$router.push("/profile");
      });
    },

    handleUploadAvatar() {
      this.$swal
        .fire({
          text: "更換你的頭貼",
          showDenyButton: true,
          confirmButtonText: "上傳圖片",
          denyButtonText: "移除圖片",
          icon: "info",
          customClass: {
            icon: "popup-icon",
            confirmButton: "popup-button",
            denyButton: "popup-button",
            text: "popup-text",
            popup: "popup",
          },
        })
        .then((result) => {
          if (result.isDenied) {
            this.photo = "";
            this.removeAvatar = true;
          } else if (result.isConfirmed) {
            this.$swal
              .fire({
                text: "選擇頭貼",
                input: "file",
                customClass: {
                  icon: "popup-icon",
                  confirmButton: "popup-button",
                  denyButton: "popup-button",
                  text: "popup-text",
                  popup: "popup",
                },
                inputAttributes: {
                  accept: "image/*",
                },
              })
              .then((res) => {
                const link = URL.createObjectURL(res.value);
                this.user.avatar = res.value;
                this.avatarLink = link;
                this.user.removeAvatar = false;
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },
  },
};
</script>


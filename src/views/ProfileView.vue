<template>
  <ne-header></ne-header>
  <div class="container">
    <h1>{{ username }}</h1>

    <img :src="avatar" v-if="userRole > 3 && avatar !== null" />

    <router-link to="/updateprofile" v-if="userRole > 3">
      <span class="material-symbols-outlined">edit</span>
      <button>編輯個人檔案</button>
    </router-link>

    <router-link :to="'/authorpostlist/' + userId" v-if="userRole > 3">
      <span class="material-symbols-outlined">sticky_note_2</span>
      <button>您的貼文們</button>
    </router-link>

    <router-link to="/updatepassword">
      <span class="material-symbols-outlined">lock</span>
      <button>更改密碼</button>
    </router-link>

    <router-link to="/updateusername" v-if="userRole <= 3">
      <span class="material-symbols-outlined">lock</span>
      <button>更改用戶名稱</button>
    </router-link>

    <button @click="handleSignout()" class="signout">登出</button>
  </div>
</template>

<style scoped lang="scss">
.container {
  margin: 20px;
  border: 1px solid #707070;
  border-radius: 20px;
  h1 {
    text-align: center;
    margin: 38px auto 54px auto;
  }
  img {
    margin-left: calc(50% - 8vw);
    margin-top: -24px;
    margin-bottom: 36px;
    border-radius: 50%;
    height: 16vw;
    width: 16vw;
    object-fit: cover;
  }
  a {
    margin: 0px auto 26px auto;
    border: 1px solid #707070;
    display: block;
    border-radius: 24px;
    width: 60%;
    span {
      vertical-align: middle;
      margin: auto 7% auto 18%;
      color: #707070;
      font-size: 20px;
      font-variation-settings: "FILL" 1;
    }
    button {
      text-decoration: none;
      font-size: 14px;
      color: #707070;
      border-style: none;
      padding: 14px 0px;
      margin: 0px;
      vertical-align: middle;
      background: #fff;
      cursor: pointer;
    }
  }
  .signout {
    text-align: center;
    color: #707070;
    margin: 0px auto 60px auto;
    border: 1px solid #707070;
    display: block;
    border-radius: 24px;
    width: 60%;
    font-size: 14px;
    padding: 14px 0px;
    background: #fff;
    cursor: pointer;
  }
}
</style>

<script>
import NeHeader from "@/components/NeHeader.vue";
import NeInputbar from "@/components/NeInputbar.vue";
import NeGoButton from "@/components/NeGoButton.vue";
import { getApi, getData, popup } from "@/GlobalSettings.js";

export default {
  name: "ProfileView",
  components: {
    NeHeader,
    NeInputbar,
    NeGoButton,
  },

  setup() {
    const api = getApi();
    const data = getData();
    return {
      api,
      data,
      popup,
    };
  },

  created() {
    this.getUserInfo();
  },

  data() {
    return {
      username: "",
      userRole: null,
      avatar: 'none',
      userId: null
    };
  },

  methods: {
    getUserInfo() {
      let loader = this.$loading.show()
      const _this = this;
      _this.axios
        .get(_this.api + "user/info/", { withCredentials: true })
        .then((res) => {
          if (res.data.state === "success") {
            this.username = res.data.data.user.username;
            this.userRole = res.data.data.user.userRole.num;
            if (res.data.data.superUser.avatar[0].filename == null) {
              this.avatar = null
            } else {
              this.avatar =
              this.data + "user/" +
              res.data.data.superUser.avatar[0].filename;
            }
            this.userId = res.data.data.user.id
            loader.hide()
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
        this.$router.push("/");
      });
    },

    handleSignout() {
      const _this = this;
      _this.axios
        .get(_this.api + "user/logout/", { withCredentials: true })
        .then((res) => {
          if (res.data.state === "success") {
            localStorage.clear();
            _this.popup("成功登出", "返回首頁", "success");
            _this.setRedirection();
          } else {
            const errorMsg = res.data.error;
            console.log(errorMsg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>


<template>
  <ne-header></ne-header>
  <div class="container">

    <h1>註冊新帳號</h1>
    
    <div>
      <ne-inputbar icon="email" placeholder="請輸入您的電子郵件" v-model="email" />
      <p>{{usernameError.errorMsg}}</p>
    </div>

    <div :class="{ 'error': usernameError.state }">
      <ne-inputbar icon="account_circle" placeholder="請設定您的用戶名稱" v-model="username" />
      <p>{{usernameError.errorMsg}}</p>
    </div>

    <div :class="{ 'error': passwordError.state }">
      <ne-inputbar icon="password" placeholder="請設定您的密碼" type="password" v-model="password" />
      <p>{{passwordError.errorMsg}}</p>
    </div>
    
    <div :class="{ 'error': passwordError.state }">
      <ne-inputbar icon="password" placeholder="再輸入一次您的密碼" type="password" v-model="passwordConfirm" />
      <p>{{passwordError.errorMsg}}</p>
    </div>

    <span>我們將寄出一封驗證信到您的信箱</span>
    <ne-go-button @click="handleSignup()"></ne-go-button>

  </div> 
</template>

<style scoped lang="scss">
  .container{
    margin: 20px;
    border: 1px solid #707070;
    border-radius: 20px;
    text-align: center ;
    h1{
      text-align: center;
      margin: 38px auto 54px auto;
    }
    span{
      color: #707070;
      font-size: 12px;
      margin: 0px auto 24px auto;
      text-align: center;
    }
    p{
      margin: -22px auto 10px auto;
      margin-left: calc((100vw - 40px - 76%) / 2 + 15px);
      font-size: 12px;
      text-align: left;
      color: #EF4E4E;
      display: block;
      visibility: hidden;
      height: 17px;
    }
    .inputbar{
      :deep input{
        border: 1px solid transparent;
      }
    }
    .error{
      p{
        visibility: visible;
      }
      :deep input{
        border: 1px solid #EF4E4E;
      }
    }
  }
</style>

<script>

  import NeHeader from '@/components/NeHeader.vue'
  import NeInputbar from '@/components/NeInputbar.vue'
  import NeGoButton from '@/components/NeGoButton.vue'
  import { getApi, popup } from '@/GlobalSettings.js'

  export default {
    name: 'SignUpView',
    components: {
      NeHeader,
      NeInputbar,
      NeGoButton
    },
    
    data() {
      return{
        email: '',
        username: '',
        password: '',
        passwordConfirm: '',
        passwordError: false,
        usernameError: {
          state: false,
          errorMsg: 'NO ERROR',
        },
        passwordError: {
          state: false,
          errorMsg: 'NO ERROR',
        }
      }
    },

    setup(){
      const api = getApi()
      return{
        api, popup
      }
    },

    methods: {
      
      checkError(errorMsg) {
        // check passwordConfirm error
        if (errorMsg.passwordConfirm === "noInput"){
          this.popup("請輸入密碼", "確認", "question")
        }
        if (errorMsg.passwordConfirm === "notMatch"){
          this.popup("密碼不一致", "確認", "error")
        }

        // check password error
        if (errorMsg.password === "noInput"){
          this.popup("請輸入密碼", "確認", "question")
        }
        if (errorMsg.password === "formatError"){
          this.popup("密碼格式錯誤", "確認", "error")
        }

        // check username error
        if (errorMsg.username === "noInput"){
          this.popup("請輸入用戶名稱", "確認", "question")
        }
        if (errorMsg.username === "used"){
          this.popup("用戶名稱已被使用", "確認", "warning")
        }
        if (errorMsg.username === "formatError"){
          this.popup("用戶名稱格式錯誤", "確認", "error")
        }

        // check email error
        if (errorMsg.email === "noInput"){
          this.popup("請輸入電子郵件", "確認", "question")
        }
        if (errorMsg.email === "used"){
          this.popup("電子郵件已被使用", "確認", "warning")
        }
        if (errorMsg.email === "formatError"){
          this.popup("電子郵件格式錯誤", "確認", "error")
        }
      },

      handleSignup() {
        const _this = this
        const signupformdata = new FormData()
        signupformdata.append('email', _this.email)
        signupformdata.append('username', _this.username)
        signupformdata.append('password', _this.password)
        signupformdata.append('passwordConfirm', _this.passwordConfirm)

        _this.axios.post(_this.api + "user/register/", signupformdata, {withCredentials: true})
        .then((res) => {
          if (res.data.state === 'success'){
            _this.popup("註冊成功", "驗證您的帳號", "success")
            _this.setRedirection()
          }else{
            const errorMsg = res.data.error
            _this.checkError(errorMsg)
          }
        })
        .catch(function(error) {
          console.log(error)
        })
      },

      checkPassword() {
        var errorTime = 0

        if (this.password !== this.passwordConfirm && this.passwordConfirm !== ''){
          errorTime += 1
          this.passwordError.errorMsg = "密碼不一致"
        }

        if (this.password.length < 8) {
          errorTime += 1
          this.passwordError.errorMsg = "密碼長度需要介於8~30"
        }

        if (!(this.password.match(/[A-Z]{1,}[a-z]{1,}/gm) || this.password.match(/[a-z]{1,}[A-Z]{1,}/gm))) {
          errorTime += 1
          this.passwordError.errorMsg = "密碼必須包含大小寫英文"
        }
        
        if (errorTime > 0 && (this.usernameConfirm !== '' && this.password !== '')) {
          this.passwordError.state = true
        } else {
          this.passwordError.state = false
        }
      },

      checkUsername() {
        var errorTime = 0

        if (!this.username.match(/^[A-Za-z0-9_.]{1,}$/)) {
          errorTime += 1
          this.usernameError.errorMsg = "用戶名稱包含非法字元"
        }

        if (this.username.length < 6) {
          errorTime += 1
          this.usernameError.errorMsg = "用戶名稱長度需要介於6~18位"
        }

        if (this.username.match(/^[0-9]/)){
          errorTime += 1
          this.usernameError.errorMsg = "用戶名稱不能以數字開頭"
        }
        
        if (errorTime > 0 && this.username != '') {
          this.usernameError.state = true
        } else {
          this.usernameError.state = false
        }
      },

      requestActivationCode() {
        const _this = this
        this.axios.get(_this.api + 'user/activate/request/', {withCredentials: true})
        .then((res) => {
          if (res.data.error.general === 'tooOften'){
            console.log(res.data.error.general)
          }
          if (res.data.error.general === 'noUser'){
            console.log(res.data.error.general)
          }
        })
        .catch(function(error) {
          console.log(error)
        })
      },
    
      setRedirection() {
        var checkbutton = this.$swal.getConfirmButton()
        checkbutton.addEventListener('click', () => { this.$router.push('/activation') })
        checkbutton.addEventListener('click', () => { this.requestActivationCode() })
      }
    },

    watch: {
      "password": function(){
        this.checkPassword()
      },
      "passwordConfirm": function(){
        this.checkPassword()
      },
      "username": function() {
        this.checkUsername()
      },
    }
  }
</script>
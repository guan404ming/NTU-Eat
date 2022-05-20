<template>
  <ne-header></ne-header>
  <div class="container">

    <h1>註冊新帳號</h1>
    
    <ne-inputbar icon="email" placeholder="請輸入您的電子郵件" v-model="email" />
    <ne-inputbar icon="account_circle" placeholder="請設定您的用戶名稱" v-model="username" />
    
    <div :class="{ 'error': hasError }">
      <ne-inputbar icon="password" placeholder="請設定您的密碼" type="password" v-model="password" />
      <p>密碼不一致，請重新輸入</p>
    </div>
    
    <div :class="{ 'error': hasError }">
      <ne-inputbar icon="password" placeholder="再輸入一次您的密碼" type="password" v-model="password_confirm" />
      <p>密碼不一致，請重新輸入</p>
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
        password_confirm: '',
        hasError: false,
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
        signupformdata.append('passwordConfirm', _this.password_confirm)

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
        if (this.password === this.password_confirm || this.password_confirm === ''){
          this.hasError = false
        }else{
          this.hasError = true
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
      "password_confirm": function(){
        this.checkPassword()
      }
    }
  }
</script>
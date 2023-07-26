<template>
  <ne-header></ne-header>
  <div class="container">
    
    <h1>歡迎回來</h1>
    
    <ne-inputbar icon="email" placeholder="請輸入您的電子郵件" v-model="usrnmail"></ne-inputbar>
    <ne-inputbar icon="password" placeholder="請輸入您的密碼" type="password" v-model="password"></ne-inputbar>
    
    <ne-go-button @click="handleSignin()"></ne-go-button>
    
    <router-link to="/forgetpassword">忘記密碼</router-link>
    <span>&nbsp;・&nbsp;</span>
    <router-link to="/signup">現在註冊</router-link>

  </div>
</template>

<style scoped lang="scss">
  .container{
    margin: 20px;
    border: 1px solid #707070;
    border-radius: 20px;
    text-align: center;
    h1{
      text-align: center;
      margin: 38px auto 54px auto;
    }
    a{
      color: #707070;
      font-size: 14px;
      margin: 0px auto 20px auto;
      display: inline-block;
    }
  }
</style>

<script>

import NeHeader from '@/components/NeHeader.vue'
import NeInputbar from '@/components/NeInputbar.vue'
import NeGoButton from '@/components/NeGoButton.vue'
import { getApi, getData, popup } from '@/GlobalSettings.js'

export default {
  name: 'SignInView',
  components: {
    NeHeader,
    NeInputbar,
    NeGoButton
  },

  setup() {
    const api = getApi();
    const data = getData();
    return{
      api,
      data,
      popup
    }
  },

  data() {
    return{
      usrnmail: '',
      password: '',
    } 
  },

  methods: {
    
    setRedirection() {
      var checkbutton = this.$swal.getConfirmButton()
      checkbutton.addEventListener('click', () => { this.$router.push('/') })
    },

    checkError(errorMsg) {
      
      //check password error
      if (errorMsg.password === 'noInput'){
        this.popup('請輸入密碼', '確認', 'question')
      }
      if (errorMsg.password === 'incorrect'){
        this.popup('密碼錯誤', '確認', 'error')
      }
      
      //check usrnmail error
      if (errorMsg.usrnmail === 'noInput'){
        this.popup('請輸入電子郵件或用戶名稱', '確認', 'question')
      }
      if (errorMsg.usrnmail === 'notFound'){
        this.popup('使用者不存在', '確認', 'error')
      }

      //check general error
      if (errorMsg.general === 'notActivated'){
        this.popup('帳號尚未驗證', '現在驗證', 'warning')
        var checkbutton = this.$swal.getConfirmButton()
        checkbutton.addEventListener('click', () => { this.$router.push('/activation') })
      }
      if (errorMsg.general === 'loggedIn'){
        this.popup('此用戶已登入', '確認', 'warning')
      }

    },

    handleSignin() {
      let loader = this.$loading.show()
      const _this = this
      const signinformdata = new FormData()
      signinformdata.append('usrnmail', _this.usrnmail)
      signinformdata.append('password', _this.password)

      _this.axios.post(_this.api + 'user/login/', signinformdata, {withCredentials: true})
      .then((res) => {
        if (res.data.state === 'success'){
          this.getInfo()
          loader.hide()
          localStorage.setItem('loginState', true)
          _this.popup('成功登入', '進入首頁', 'success')
          _this.setRedirection()
        } else{
          loader.hide()
          const errorMsg = res.data.error
          _this.checkError(errorMsg)
        }
      })
      .catch(function(error) {
          console.log(error)
      })
    },

    getInfo() {
      const _this = this
      this.axios.get(_this.api + "user/info/", {withCredentials: true})
      .then((res) => {
        if (res.data.data.user.userRole.num > 3){
          if (res.data.data.superUser.avatar[4].filename != null) {
            localStorage.setItem('avatar', this.data + 'user/' + res.data.data.superUser.avatar[4].filename)
          }
          localStorage.setItem('userRole', res.data.data.user.userRole.num)
        } 
      })
      .catch(function(error) {
        console.log(error)
      })
    },
  },
}
</script>


<template>
  <ne-header></ne-header>
  <div class="container">
    
    <h1>更改您的帳號</h1>
    
    <ne-inputbar icon="password" placeholder="請輸入您原先的密碼" v-model="oriPassword" type="password"></ne-inputbar>
    <ne-inputbar icon="password" placeholder="請輸入您的新密碼" v-model="password" type="password"></ne-inputbar>
    <ne-inputbar icon="password" placeholder="再次輸入您的新密碼" v-model="passwordConfirm" type="password"></ne-inputbar> 
    
    <ne-go-button @click.prevent="handleUpdatePassword()"></ne-go-button>
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
      font-size: 16px;
      color: #707070;
      margin-top: -4px;
      text-decoration: underline;
      cursor: pointer;
    }
    button{
      margin: 24px auto 40px auto;
    }
  }
</style>

<script>

import NeHeader from '@/components/NeHeader.vue'
import NeInputbar from '@/components/NeInputbar.vue'
import NeGoButton from '@/components/NeGoButton.vue'
import { getApi, popup } from '@/GlobalSettings.js'

export default {
  name: 'UpdatePasswordView',
  components: {
    NeHeader,
    NeInputbar,
    NeGoButton
  },

  setup(){
    const api = getApi()
    return{
      api, popup
    }
  },

  data(){
    return{
      oriPassword: '',
      password: '',
      passwordConfirm: '',
    }
  },

  methods:{
    
    handleUpdatePassword() {
      const _this = this
      const passwordformdata = new FormData()
      passwordformdata.append('oriPassword', this.oriPassword)
      passwordformdata.append('password', this.password)
      passwordformdata.append('passwordConfirm', this.passwordConfirm)
      
      this.axios.post(_this.api + 'user/update/password/', passwordformdata, {withCredentials: true})
      .then((res) => {
        if (res.data.state === 'success'){
          this.popup('成功更改密碼', '返回', 'success')
          this.setRedirection()
        } else{
          const errorMsg = res.data.error
          this.checkError(errorMsg)
        }
      })
      .catch(function(error) {
        console.log(error)
      })
    },

    checkError(errorMsg) {
      
      // check passwordConfirm error
      if (errorMsg.passwordConfirm === 'noInput'){
        this.popup('請輸入新密碼', '確認', 'question')
      }
      if (errorMsg.passwordConfirm === 'noMatch'){
        this.popup('密碼不一致', '確認', 'error')
      }
      
      // check password error
      if (errorMsg.password === 'noInput'){
        this.popup('請再次輸入新密碼', '確認', 'question')
      }
      if (errorMsg.password === 'formatError'){
        this.popup('密碼格式不正確', '確認', 'error')
      }

      // check origin password error
      if (errorMsg.oriPassword === 'noInput'){
        this.popup('請再次輸入密碼', '確認', 'question')
      }
      if (errorMsg.oriPassword === 'incorrect'){
        this.popup('密碼不正確', '確認', 'error')
      }

      // check general error
      if (errorMsg.general === 'ServerError'){
        this.popup('伺服器錯誤', '請洽客服', 'question')
      }
      if (errorMsg.general === 'unauthorised'){
        this.popup('請先登入', '確認', 'warning')
      }
    },

    setRedirection() {
      var checkbutton = this.$swal.getConfirmButton()
      checkbutton.addEventListener('click', () => { this.$router.push('/profile') })
    }
  }
}
</script>


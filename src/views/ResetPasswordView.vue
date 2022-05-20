<template>
  <ne-header></ne-header>
  <div class='container'>
    
    <h1>重設您的密碼</h1>
    
    <ne-inputbar icon="password" placeholder="請輸入您的新密碼" v-model="password" type="password"></ne-inputbar>
    <ne-inputbar icon="password" placeholder="再次輸入您的新密碼" v-model="confirm" type="password"></ne-inputbar> 
    
    <ne-go-button @click.prevent="handleResetPassword()"></ne-go-button>
  
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
  name: 'ResetView',
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
      password: '',
      confirm: '',
    }
  },

  methods:{

    handleResetPassword() {
        const _this = this
        const passwordformdata = new FormData()
        passwordformdata.append('password', this.password)
        passwordformdata.append('passwordConfirm', this.confirm)

        this.axios.post(_this.api + 'user/resetpw/reset/', passwordformdata, {withCredentials: true})
        .then((res) => {
          if (res.data.state === 'success'){
            this.popup('成功更改密碼', '重新登入', 'success')
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

      // check password error
      if (errorMsg.password === 'noInput'){
        this.popup('請輸入新密碼', '確認', 'question')
      }
      if (errorMsg.password === 'formatError'){
        this.popup('密碼格式錯誤', '確認', 'error')
      }

      // check passwordConfirm error
      if (errorMsg.passwordConfirm === 'noInput'){
        this.popup('請再次輸入密碼', '確認', 'question')
      }
      if (errorMsg.passwordConfirm === 'notMatch'){
        this.popup('密碼不一致', '確認', 'error')
      }

      // check general error
      if (errorMsg.general === 'ServerError'){
        this.popup('伺服器錯誤', '請洽客服', 'question')
      }
      if (errorMsg.general === 'noUser'){
        this.popup('此用戶不存在', '確認', 'error')
      }

    },

    setRedirection() {
      var checkbutton = this.$swal.getConfirmButton()
      checkbutton.addEventListener('click', () => { this.$router.push('/signin') })
    }
  }
}
</script>


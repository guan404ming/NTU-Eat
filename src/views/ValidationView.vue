<template>
  <ne-header></ne-header>
  <div class='container'>
    
    <h1>驗證您的帳號</h1>
    
    <ne-inputbar icon="password" placeholder="請輸入您的驗證碼" v-model="code"></ne-inputbar>
    <a @click.prevent="getValidationCode()">點擊此處重新發送驗證碼</a>
    
    <ne-go-button @click.prevent="handleValidate()"></ne-go-button>

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
      border: 0px;
    }
  }
</style>

<script>

import NeHeader from '@/components/NeHeader.vue'
import NeInputbar from '@/components/NeInputbar.vue'
import NeGoButton from '@/components/NeGoButton.vue'
import { getApi, popup } from '@/GlobalSettings.js'

export default {
  name: 'ValidationView',
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
      code: ''
    }
  },

  methods:{

    handleValidate() {
        const _this = this
        const codeformdata = new FormData()
        codeformdata.append('code', this.code)

        this.axios.post(_this.api + 'user/resetpw/validate/', codeformdata, {withCredentials: true})
        .then((res) => {
          if (res.data.state === 'success'){
            this.popup('成功驗證', '現在更改密碼', 'success')
            this.setRedirection()
          } else{
            const errorMsg = res.data.error
            this.checkValidationError(errorMsg)
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },

    checkValidationError(errorMsg) {

      // check code error
      if (errorMsg.code === 'noInput'){
        this.popup('請輸入驗證碼', '確認', 'question')
      }
      if (errorMsg.code === 'formatError'){
        this.popup('驗證碼格式錯誤', '確認', 'error')
      }
      if (errorMsg.code === 'noMatch'){
        this.popup('驗證碼錯誤', '確認', 'error')
      }

      // check general error
      if (errorMsg.general == 'noUser'){
        this.popup('此用戶不存在', '確認', 'error')
      }
    },

    setRedirection() {
      var checkbutton = this.$swal.getConfirmButton()
      checkbutton.addEventListener('click', () => { this.$router.push('/reset') })
    },

    getValidationCode() {
        const _this = this
        const emailformdata = new FormData()
        emailformdata.append('email', this.email)

        this.axios.post(_this.api + 'user/resetpw/request/', emailformdata, {withCredentials: true})
        .then((res) => {
          if (res.data.state === 'success'){
            this.popup('驗證碼已寄到信箱', '現在驗證', 'success')
          } else{
            const errorMsg = res.data.error
            this.checkGetCodeError(errorMsg)
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },

    checkGetCodeError(errorMsg) {

      // check password error
      if (errorMsg.email === 'noInput'){
        this.popup('請輸入信箱', '確認', 'question')
      }
      if (errorMsg.email === 'formatError'){
        this.popup('信箱格式錯誤', '確認', 'error')
      }
      if (errorMsg.email === 'noUser'){
        this.popup('此用戶不存在', '確認', 'error')
      }

      // check general error
      if (errorMsg.general == 'tooOften'){
        this.popup('要求太過頻繁', '稍後再試一次', 'warning')
      }
    },
  }
}
</script>


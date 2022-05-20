<template>
  <ne-header></ne-header>
  <div class='container'>
    
    <h1>忘記密碼</h1>
    
    <ne-inputbar icon="mail" placeholder="請輸入您的信箱" v-model="email"></ne-inputbar>
    
    <p>我們將寄一封驗證信到您的信箱</p>
    <ne-go-button @click.prevent="getValidationCode()"></ne-go-button>

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
    p{
      font-size: 16px;
      color: #707070;
      margin-top: 6px;
    }
    a{
      text-decoration: none;
      margin: 0px;
    }
    button{
      margin-bottom: 40px;
    }
  }
</style>

<script>

import NeHeader from '@/components/NeHeader.vue'
import NeInputbar from '@/components/NeInputbar.vue'
import NeGoButton from '@/components/NeGoButton.vue'
import { getApi, popup } from '@/GlobalSettings.js'

export default {
  name: 'ForgetPasswordView',
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
      email: ''
    }
  },

  methods:{

    getValidationCode() {
        const _this = this
        const emailformdata = new FormData()
        emailformdata.append('email', this.email)

        this.axios.post(_this.api + 'user/resetpw/request/', emailformdata, {withCredentials: true})
        .then((res) => {
          if (res.data.state === 'success'){
            this.popup('驗證碼已寄到信箱', '現在驗證', 'success')
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

    setRedirection() {
      var checkbutton = this.$swal.getConfirmButton()
      checkbutton.addEventListener('click', () => { this.$router.push('/validate') })
    }
  }
}
</script>


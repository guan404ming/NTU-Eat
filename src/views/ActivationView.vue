<template>
  <ne-header></ne-header>
  <div class="container">
    <h1>驗證您的帳號</h1>
    
    <ne-inputbar icon="password" placeholder="請輸入您的驗證碼" v-model="code"></ne-inputbar>
    
    <a @click="getActivationCode()">點擊此處重新發送驗證碼</a>
    
    <ne-go-button @click.prevent="handleActivate()"></ne-go-button>
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
      margin-bottom: 54px;
      margin-top: 38px;
    }
    a{
      font-size: 16px;
      color: #707070;
      margin-top: -4px;
      text-decoration: underline;
      cursor: pointer;
    }
  }
</style>

<script>

import NeHeader from '@/components/NeHeader.vue'
import NeInputbar from '@/components/NeInputbar.vue'
import NeGoButton from '@/components/NeGoButton.vue'
import { getApi, popup } from '@/GlobalSettings.js'

export default {
  name: 'ActivationView',
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
    handleActivate() {
        const _this = this
        const codeformdata = new FormData()
        codeformdata.append('code', this.code)
        this.axios.post(_this.api + 'user/activate/validate/', codeformdata, {withCredentials: true})
        .then((res) => {
          if (res.data.state === 'success'){
            this.popup('成功驗證', '返回首頁', 'success')
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
      if (errorMsg.general === 'noUser'){
        this.popup('此用戶不存在', '確認', 'error')
      }
    },

    setRedirection() {
      var checkbutton = this.$swal.getConfirmButton()
      checkbutton.addEventListener('click', () => { this.$router.push('/') })
    },

    getActivationCode() {
      const _this = this
      this.axios.get(_this.api + 'user/activate/request/', {withCredentials: true})
      .then((res) => {
        if (res.data.error.general === 'tooOften'){
          this.popup('要求太過頻繁', '確認', 'warning')
        }
        if (res.data.error.general === 'noUser'){
          this.popup('請先登入', '確認', 'warning')
        }
      })
      .catch(function(error) {
        console.log(error)
      })
    },
  }
}
</script>


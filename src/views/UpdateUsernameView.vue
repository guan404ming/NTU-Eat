<template>
  <ne-header></ne-header>
  <div class='container'>
    
    <h1>更改用戶名稱</h1>
    
    <ne-inputbar icon="password" placeholder="請輸入您的新名稱" v-model="username" ></ne-inputbar>
    <ne-go-button @click.prevent="handleUpdateUsername()"></ne-go-button>
  
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
  name: 'UpdateUsernameView',
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

  created(){
    this.username = this.getUsername()
  },

  data(){
    return{
      username: ''
    }
  },

  methods:{

    getUsername() {
      const _this = this
      _this.axios.get(_this.api + 'user/info/', {withCredentials: true})
      .then((res) => {
        _this.username = res.data.data.user.username
      })
      .catch(function(error) {
        console.log(error)
      })
    },
    
    handleUpdateUsername() {
        const _this = this
        const usernameformdata = new FormData()
        usernameformdata.append('username', this.username)

        this.axios.post(_this.api + "user/update/username/", usernameformdata, {withCredentials: true})
        .then((res) => {
          if (res.data.state === 'success'){
            if (res.data.data.noChange){
              this.$router.push('/profile')
            }else{
              this.popup("成功更改用戶名稱", "返回", "success")
              this.setRedirection()
            }  
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

      // check username error
      if (errorMsg.username === "noInput"){
        this.popup("請輸入新用戶名稱", "確認", "question")
      }
      if (errorMsg.username === "formatError"){
        this.popup("用戶名稱格式錯誤", "確認", "error")
      }
      if (errorMsg.username === "used"){
        this.popup("用戶名稱已被使用", "確認", "error")
      }

      // check general error
      if (errorMsg.general === "ServerError"){
        this.popup("伺服器錯誤", "請洽客服", "question")
      }
      if (errorMsg.general === "unauthorised"){
        this.popup("請先登入", "確認", "error")
      }
    },

    setRedirection() {
      var checkbutton = this.$swal.getConfirmButton()
      checkbutton.addEventListener("click", () => { this.$router.push('/profile') })
    },
  }
}
</script>


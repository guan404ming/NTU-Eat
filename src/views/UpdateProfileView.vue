<template>
  <div>
    <ne-header></ne-header> 
    <div class='container'>
      
      <h1>編輯個人檔案</h1>
      
      <div class="kkk">
        <img :src="avatarLink" :class="{'no-pic': removeAvatar}">
      </div>

      <a @click="this.handleUploadAvatar()">更換您的頭貼</a>
      
      <div class="inputsection">
        <h2>使用者名稱</h2>
        <input :placeholder= "username" v-model="username">
      </div>

      <div class="inputsection">
        <h2>暱稱</h2>
        <input :placeholder= "displayName" v-model="displayName">
      </div>

      <div class="inputsection">
        <h2>自我介紹</h2>
        <textarea placeholder="請輸入內文" v-model="description"></textarea>
      </div>

      <ne-go-button @click="handleUpdateProfile()"></ne-go-button>
    </div>
  
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
      margin-top: 38px auto 28px auto;
    }
    .kkk{
      img{
        display: inline-block;
        margin-top: 10px;
        border-radius: 50%;
        height: 16vw;
        width: 16vw;
        max-height: 300px;
        max-height: 300px;
        object-fit: cover;
        vertical-align: middle;
        &.no-pic{
          display: none;
        }
      }
    }
    a{
      display: block;
      margin: 14px auto 5vw auto;
      text-align: center;
      text-decoration: underline;
      font-size: 14px;
      color: #707070;
      &:hover{
        cursor: pointer;
      }
    }
    h2{
      margin: 0px auto 6px 11vw;
      text-align: left;
      font-size: 16px;
      line-height: 19px;
      color: #707070;
    }
    .inputsection{
      display: block;
      input, textarea{
        margin: 0 auto 16px auto;
        padding: 0 18px;
        height: 48px;
        width: 76vw;
        border: none;
        border-radius: 24px;
        background-color: #F4F4F4;  
        font-size: 14px;
        &::placeholder{
          line-height: 20px;
          letter-spacing: 0px;
          color: #707070;
        }
      }
      textarea{
        height: 16vh;
        padding-top: 12px;
      }
    }
  }
</style>

<script>

import NeHeader from '@/components/NeHeader.vue'
import NeGoButton from '@/components/NeGoButton.vue'
import { getApi, popup } from '@/GlobalSettings.js'

export default {
  name: 'UpdateProfile',
  components: {
    NeHeader,
    NeGoButton
  },
  
  setup(){
    const api = getApi()
    return{
      api, popup
    }
  },

  created(){
    this.getUserInfo()
  },

  data() {
    return{
      username: null,
      avatarLink: 'https://pse.is/45tncj',
      targetUserId: null,
      avatar: null,
      removeAvatar: false,
      displayName: '',
      description: '',
    }
  },

  methods: {

    getUserInfo() {
      const _this = this
      _this.axios.get(_this.api + 'user/info/', {withCredentials: true})
      .then((res) => {
        if (res.data.state === 'success'){
          _this.username = res.data.data.user.username
          _this.targetUserId = res.data.data.user.id
        } else{
          const errorMsg = res.data.error
          console.log(errorMsg)
        }
      })
      .catch(function(error) {
        console.log(error)
      })
    },

    handleUpdateProfile (){
      const _this = this
      const profileformdata = new FormData()
      // profileformdata.append('targetUserId', _this.targetUserId)
      if(!_this.removeAvatar){
        profileformdata.append('avatar', _this.avatar)
      }else{
        profileformdata.append('removeAvatar', _this.removeAvatar)
      }
      profileformdata.append('displayName', _this.displayName)
      profileformdata.append('description', _this.description)
      
      
      _this.axios.post(_this.api + 'update/profile/', profileformdata, {withCredentials: true})
      .then((res) => {
        if (res.data.state === 'success'){
          console.log(res)
          _this.popup('個人檔案已成功編輯', '返回', 'success')
          this.setRedirection()
        } else{
          const errorMsg = res.data.error
          console.log(errorMsg)
        }
      })
      .catch(function(error) {
        console.log(error)
      })
    },

    setRedirection() {
      var checkbutton = this.$swal.getConfirmButton()
      checkbutton.addEventListener('click', () => { this.$router.push('/profile') })
    },

    handleUploadAvatar(){
      this.$swal.fire({
        text: '更換你的頭貼',
        showDenyButton: true,
        confirmButtonText: '上傳圖片',
        denyButtonText: '移除圖片',
        icon: 'info',
        customClass: {
          icon: 'popup-icon',
          confirmButton: 'popup-button',
          denyButton: 'popup-button',
          text: 'popup-text',
          popup: 'popup',
        }
      }).then((result) => {  
        if (result.isDenied) {
          this.photo = ''
          this.removeAvatar = true
        }
        else if (result.isConfirmed){
          this.$swal.fire({
            text: '選擇頭貼',
            input: 'file',
            customClass: {
              icon: 'popup-icon',
              confirmButton: 'popup-button',
              denyButton: 'popup-button',
              text: 'popup-text',
              popup: 'popup',
            },
            inputAttributes: {
              'accept': 'image/*',
            }
          }).then((res) => {
            const link = URL.createObjectURL(res.value)
            this.avatar = res.value
            this.avatarLink = link
            this.removeAvatar = false
          }).catch((error) => {
            console.log(error)
          })
        }
      })
    }
  },
}
</script>


<template>
  <div class="inputbar">
    <span class="material-symbols-outlined">{{icon}}</span>
    <input :placeholder="placeholder" :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"> 
  </div>
</template>

<script>
  export default {
    name: 'NeInputbar',
    props: {
      icon: String,
      placeholder: String,
      type: {
        type: String,
        default: 'text'
      },
      modelValue: String
    },
  }
</script>

<style scoped lang="scss">
  .inputbar{
    display: block;
    input{
      margin: 0 auto 26px auto;
      padding-left: 52px;
      border-radius: 24px;
      height: 48px;
      width: 76%;
      background-color: #F4F4F4;
      border: 0px solid #fff;
      transform: translateX(-12px);
      position: relative;
      font-size: 14px;
      &::placeholder{
        line-height: 20px;
        letter-spacing: 0px;
        color: #707070;
      }
    }
    span{
      color: #707070;
      transform: translate(28px, 6.5px);
      position: relative;
      z-index: 20;
    }
  } 
</style>

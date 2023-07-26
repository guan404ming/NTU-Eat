<template>
    <button>GO</button>
</template>

<script>
export default {
    name: 'NeGoButton',
    props: {
        click: Text
    }
}
</script>

<style scoped lang="scss">
button {
    background-color: #EBDECE;
    margin: 28px auto 24px auto;
    display: block;
    width: 28%;
    border: none;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 20px;
    text-align: center;
    line-height: 30px;
    color: #000000;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    &:active{
      box-shadow: none;
      filter: brightness(0.8);
    }
  }
</style>

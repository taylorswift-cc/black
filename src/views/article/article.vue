<template>
  <div>article</div>
</template>

<script>
export default {
  created () {
    this.$http
      .get('http://ttapi.research.itcast.cn/mp/v1_0/followers')
      .then(result => {
        console.log(result)
      })
  }
}
</script>

<style>
</style>

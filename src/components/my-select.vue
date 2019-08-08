<template>
  <el-select :value="value" placeholder="请选择" clearable @change="fn">
    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-select',
  data () {
    return {
      options: []
    }
  },
  props: ['value'],
  methods: {
    async getOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.options = data.channels
    },
    fn (val) {
      if (val === '') val = null
      this.$emit('input', val)
    }
  },
  created () {
    this.getOptions()
  }
}
</script>

<style>
</style>

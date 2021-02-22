<template>
  <div>
    <h1>权限列表</h1>
    <h3>{{ $store.state.count }}</h3>
    <button @click="handleAddClick(10)">增加</button>
    <button @click="handleReduceClick(10)">减少</button>
    <button @click="handleActionsAdd(10)">异步增加</button>
    <button @click="handleActionsReduce(10)">异步减少</button>
    <h1>{{ count }}</h1>
  </div>
</template>

<script>
export default {
  methods: {
    handleAddClick(n) {
      this.$store.commit("mutationsAddCount", n);
    },
    handleReduceClick(n) {
      this.$store.commit("mutationsReduceCount", n);
    },

    //异步
    handleActionsAdd(n) {
      this.$store.dispatch("actionsAddCount", n);
    },
    handleActionsReduce(n) {
      this.$store.dispatch("actionsReduceCount", n);
    }
  },
  computed: {
    count() {
      return this.$store.getters.getterCount;
    }
  }
};
</script>

<style lang="less" scoped></style>

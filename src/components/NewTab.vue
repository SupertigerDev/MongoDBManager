<template>
  <div class="new-tab">
    Open a collection on the side bar.
  </div>
</template>


<script>
export default {
    props: {
        collection: String
    }
}
</script>

<style lang="scss" scoped>
.new-tab {
  display: flex;
  margin: auto;

  font-size: 20px;
}
</style>
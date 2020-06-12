<template>
  <new-tab v-if="!collection"/>
  <div v-else>
    {{collection}}
  </div>
</template>


<script>
import NewTab from "./NewTab";
export default {
    components: {NewTab},
    props: {
        collection: String
    }
}
</script>
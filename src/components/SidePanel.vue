<template>
  <div class="side-panel">
    <div class="database-list" v-if="databaseArr">
      <div class="item" v-for="(db, i) in databaseArr" :key="i">
        <div class="item-inner">
          <div class="material-icons">storage</div>
          {{db.name}}
        </div>
        <div class="sub-items">
          <div
            class="name"
            v-for="(collection, i) in collectionObj[db.name]"
            :key="i"
            @click="onCollectionClicked(collection, db)"
          >
            <div class="material-icons">radio_button_checked</div>
            {{collection.name}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
const { ipcRenderer } = window.require("electron");
export default {
  data() {
    return {};
  },
  methods: {
    onDatabaseList(client, [dbArr, collectionObj]) {
      this.$store.dispatch("setCollectionObj", collectionObj);
      this.$store.dispatch("setDatabaseArr", dbArr.databases);
    },
    onCollectionClicked(collection) {
      const ns = collection.idIndex.ns;
      this.$store.dispatch("addTab", ns)
    }
  },
  mounted() {
    ipcRenderer.on("mongo-database-list", this.onDatabaseList);
    // requests for database list.
    ipcRenderer.send("mongo-get-database-list");
  },
  computed: {
    databaseArr() {
      return this.$store.getters.databaseArr;
    },
    collectionObj() {
      return this.$store.getters.collectionObj;
    },
    selectedTab() {
      return this.$store.getters.selectedTab;
    },
  },
  destroyed() {
    ipcRenderer.off("mongo-database-list", this.onDatabaseList);
  }
};
</script>

<style lang="scss" scoped>
.side-panel {
  display: flex;
  flex-shrink: 0;
  background: #005a96;
  width: 200px;
  overflow: auto;
  overflow-x: hidden;
}
.item {
  .name {
    display: inline;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  display: flex;
  flex-direction: column;
  transition: 0.2s;
  cursor: pointer;
  color: rgba($color: white, $alpha: 0.7);
  .item-inner {
    height: 30px;
    display: flex;
    align-content: center;
    padding-left: 5px;
    align-items: center;
    .material-icons {
      font-size: 17px;
      margin-right: 5px;
    }
  }
  .item-inner:hover {
    color: white;
    background: rgba($color: black, $alpha: 0.2);
  }
}
.sub-items {
  user-select: none;
  position: relative;
  .name {
    display: flex;
    align-content: center;
    align-items: center;
    padding-left: 20px;
    height: 25px;
    .material-icons {
      font-size: 21px;
      margin-right: 5px;
    }
    &:hover {
      color: white;
      background: rgba($color: black, $alpha: 0.2);
    }
  }
  &::before {
    content: "";
    position: absolute;
    height: 100%;
    width: 1px;
    margin-left: 13px;
    background: rgba($color: white, $alpha: 0.3);
  }
}
</style>
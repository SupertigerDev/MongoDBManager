<template>
  <div class="main">
    <side-panel />
    <div class="main-panel">
      <div class="tabs">
        <div
          class="tab"
          :class="{selected: i === selectedTab}"
          v-for="(collection, i) in tabs"
          :key="i"
          @click="selectTab($event, i)"
        >
          {{collection ? collection.split(".")[1] : "New Tab"}}
          <div class="close material-icons" @click="closeTab(i)">close</div>
        </div>
        <div class="tab add material-icons" @click="addTab">add</div>
      </div>
      <div class="ribbon" v-if="tabs[selectedTab]">{{tabs[selectedTab].split(".")[0]}} > {{tabs[selectedTab].split(".")[1]}}</div>
      <div class="outer-view">
        <tab
          v-for="(collection, i) in tabs"
          :key="i"
          :collection="collection"
          v-show="selectedTab === i"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Tab from "../components/Tab";
import SidePanel from "../components/SidePanel";
export default {
  components: { Tab, SidePanel },
  methods: {
    selectTab(event, index) {
      if (!event.target.closest(".close")) {
        this.$store.dispatch("setSelectedTab", index)
      }
    },
    closeTab(index) {
      if (this.selectedTab >= index) {
        this.$store.dispatch("setSelectedTab", this.selectedTab - 1)
      }
      this.$store.dispatch("removeTab", index)
      if (!this.tabs.length) {
        this.$store.dispatch("addTab", undefined)
        this.$store.dispatch("setSelectedTab", this.tabs.length - 1)
      }
    },
    addTab() {
      this.$store.dispatch("addTab", undefined)
      this.$store.dispatch("setSelectedTab", this.tabs.length - 1)
    }
  },
  computed: {
    tabs() {
      return this.$store.getters.tabs;
    },
    selectedTab() {
      return this.$store.getters.selectedTab;
    },
  }
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.main-panel {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.outer-view {
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;
}
.view {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.tabs {
  display: flex;
  align-content: center;
  align-items: center;
  background: rgb(0, 153, 255);
  height: 30px;
  flex-shrink: 0;
  overflow: hidden;
  border-left: 1px solid #0099ff;

  .tab {
    display: flex;
    align-items: center;
    align-content: center;
    height: 100%;
    padding-left: 5px;
    padding-right: 5px;
    border-bottom: none;
    border-left: none;
    border-top: solid 1px transparent;
    user-select: none;
    background: rgba(0, 0, 0, 0.2);
    flex-shrink: 0;
    margin-left: 1px;
    color: rgba(255, 255, 255, 0.7);
    .material-icons {
      font-size: 16px;
      opacity: 0;
      margin-left: 5px;
    }
    cursor: pointer;
    &:first-child {
      margin-left: 0;
    }
    &.selected {
      border-top: solid 1px white;
      background: rgba(0, 0, 0, 0.4);
      color: white;
    }
    &:hover {
      .material-icons {
        opacity: 0.7;
      }
    }
    &.add {
      transition: 0.2s;
      &:hover {
        color: white;
      }
    }
  }
}
.ribbon {
  // border-left: 1px solid #0099ff;
  background: #165d97;
  height: 25px;
  display: flex;
  align-content: center;
  align-items: center;
  padding-left: 5px;
}
</style>


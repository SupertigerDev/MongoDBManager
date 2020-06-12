<template>
  <div id="app">
    <div class="status-bar">
      <div class="draggable-region">
        <div class="title">{{title}}</div>
      </div>
      <div class="nav-buttons">
        <div class="button material-icons">remove</div>
        <div class="button material-icons">check_box_outline_blank</div>
        <div class="button material-icons">close</div>
      </div>
    </div>
    <router-view />
  </div>
</template>


<script>
import { EventBus } from "./event-bus";
export default {
  data() {
    return {
      title: "MongoDB Manager"
    };
  },
  methods: {
    changeTitle(title) {
      this.title = title;
    }
  },
  mounted() {
    EventBus.$on("change-title", this.changeTitle);
  },
  destroyed() {
    EventBus.$off("change-title", this.changeTitle);
  }
};
</script>

<style lang="scss">
body,
html,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  color: white;
}

#app {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
}

.status-bar {
  user-select: none;
  display: flex;
  background: rgb(0, 153, 255);
  height: 26px;
  flex-shrink: 0;

  .draggable-region {
    display: flex;
    width: 100%;
    -webkit-app-region: drag;
    .title {
      color: white;
      align-self: center;
      margin-left: 10px;
      opacity: 0.9;
    }
  }
  .nav-buttons {
    display: flex;
    .button {
      display: flex;
      align-content: center;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.7);
      width: 40px;
      transition: 0.2s;
      font-size: 19px;
      &:hover {
        color: white;
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent
}

/* Handle */
::-webkit-scrollbar-thumb {
  transition: 0.2s;
  background: rgba(255, 255, 255, 0.5);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.8);
}
</style>

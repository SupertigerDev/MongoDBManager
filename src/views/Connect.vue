<template>
  <div class="connect">
    <div class="title">MongoDB Manager</div>
    <div class="sub-title">Enter your MongoDB connection string</div>
    <input
      class="input-string"
      :class="{invalid: invalidMessage}"
      type="text"
      placeholder="Connection String"
      v-model="url"
    />
    <div class="error-message" v-if="invalidMessage">{{invalidMessage}}</div>
    <div class="valid-message" v-if="validMessage">{{validMessage}}</div>
    <div class="button" @click="connect" v-if="!connecting">
      Connect
      <span class="material-icons">navigate_next</span>
    </div>
    <div class="button connecting"  v-if="connecting">
      Connecting...
    </div>
  </div>
</template>

<script>
const { ipcRenderer } = window.require("electron")
export default {
  data() {
    return {
      url: "",
      invalidMessage: null,
      validMessage: null,
      connecting: false,
    };
  },
  methods: {
    onConnectionInput(url) {
      if (!url) {
        this.invalidMessage = null;
        return;
      }
      if (!url.startsWith("mongodb")) {
        this.invalidMessage = "Connection string must start with 'mongodb'";
        return;
      }
      this.invalidMessage = null;
    },
    connect() {
      this.connecting = true;
      this.invalidMessage = null;
      this.validMessage = null;
      ipcRenderer.send('mongo-connect', this.url)
    },
    onConnected() {
      this.validMessage = "Connected!";
      console.log("connected")
      setTimeout(() => {
        this.$router.push('/main')
      }, 2000);
    },
    onConnectionError(client, err) {
      this.connecting = false;
      this.invalidMessage = err.message
      console.error("Connection Error", err.message)
    }
  },
  watch: {
    url(val) {
      this.onConnectionInput(val);
    }
  },
  mounted() {
    ipcRenderer.on('mongo-connect:connected', this.onConnected)
    ipcRenderer.on('mongo-connect:error', this.onConnectionError)
  },
  destroyed() {
    ipcRenderer.off('mongo-connect:connected', this.onConnected)
    ipcRenderer.off('mongo-connect:error', this.onConnectionError)
  }

};
</script>

<style lang="scss" scoped>
.connect {
  display: flex;
  margin: auto;
  flex-direction: column;
  padding: 10px;
}

.title {
  font-size: 60px;
  text-align: center;
  margin-bottom: 10px;
  user-select: none;
}
.sub-title {
  text-align: center;
  margin-bottom: 20px;
  opacity: 0.7;
  user-select: none;
}
.input-string {
  padding: 10px;
  max-width: 500px;
  background: rgb(48, 48, 48);
  outline: none;
  border: none;
  box-shadow: 0px 0px 15px 5px #0606065b;
  color: white;
  border-radius: 15px;
  transition: 0.2s;
  user-select: none;
  &:focus {
    box-shadow: 0px 0px 15px 5px #060606;
  }
  &.invalid {
    border: solid 1px red;
  }
}
.button {
  background: rgb(0, 153, 255);
  align-self: center;
  padding: 5px;
  margin-top: 20px;
  cursor: pointer;
  user-select: none;
  border-radius: 5px;

  display: flex;
  align-items: center;
  align-content: center;
  padding-left: 11px;
  transition: 0.2s;
  color: rgba(255, 255, 255, 0.8);
  &.connecting {
    background: orange;
    &:hover {
      box-shadow: none;
      color: rgba(255, 255, 255, 0.8);
    }
  }
  &:hover {
    color: white;
    box-shadow: 0px 0px 15px 5px #060606;
  }
}

.error-message {
  background: rgba(255, 0, 0, 0.1);
  border-radius: 5px;
  padding: 5px;
  border: solid 1px red;
  margin-top: 10px;
  color: rgb(255, 75, 75);
}

.valid-message {
  background: rgba(0, 153, 255, 0.1);
  border-radius: 5px;
  padding: 5px;
  border: solid 1px rgb(0, 153, 255);
  margin-top: 10px;
  color: rgb(0, 153, 255);
}
</style>
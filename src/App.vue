<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome this is Javid's Assessment" />
    <div class="link-container">
      <h2>
        Here are my previous project link that I have involve, you can view it
        as a portfolio
      </h2>
      <div class="link">
        <a href="https://wlrngwar.93connect.com/demo/" target="_blank"
          >RNGWar</a
        >
        <a href="https://wlkeno.93connect.com/demo/" target="_blank">Keno</a>
        <a href="https://wlatom.93connect.com/demo/" target="_blank">Atom</a>
        <a href="https://www.simedarbyproperty.com/" target="_blank"
          >Sime Darby</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.link a {
  font-size: 16px;
  font-weight: bold;
}
.link {
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
  width: 50%;
}
.link-container {
  margin-top: 20px;
}
</style>

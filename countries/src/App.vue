<template>
  <div :class="{ mode: true, dark: isDarkmode }">
    <div id="nav">
      <div class="nav-start">
        <router-link class="link" to="/">Where in the world?</router-link>
      </div>
      <div class="nav-end">
        <button v-on:click="changeMode(isDarkmode)">
          <ion-icon v-if="isDarkmode" class="icon" name="moon"></ion-icon>
          <ion-icon v-else class="icon" name="moon-outline"></ion-icon>
          Dark Mode</button>
      </div>
    </div>
    <router-view class="container" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      isDarkmode: false
    }
  },
  methods: {
    changeMode: function (mode) {
      this.isDarkmode = !mode
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Nunito Sans", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  * {
    font-family: "Nunito Sans", Avenir, Helvetica, Arial, sans-serif;
  }
  .card {
    border-radius: 8px;
    img {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
  }
}

.mode {
  background-color: hsl(0, 0%, 98%);
  a, h1, h2, h3, h4, button, p, li, input, select {
    color:black;
  }

  #nav, .border {
    color: hsl(0, 0%, 93%);
  }
  ion-icon {
    color:black;
    font-weight: 800;
  }
  .card {
    background-color: hsl(0, 0%, 100%);
    box-shadow: 0px 0px 2px 2px hsl(0, 0%, 93%);
  }
  .search-field, input, select, .filter-button, .filter-option {
    background-color: white;
  }
}

.dark {
  background-color: hsl(207, 26%, 17%);
  color: white;
  a, h1, h2, h3, h4, button, p, li, input, select {
    color:white;
  }
  #nav, .border {
    color: hsl(209, 37%, 12%);
  }
  ion-icon {
    color:white;
    font-weight: 800;
  }
  .card {
    background-color: hsl(209, 23%, 22%);
    box-shadow: 0px 0px 2px 2px hsl(209, 37%, 12%);
  }
  .search-field, input, select, .filter-button, .filter-option {
    background-color: hsl(209, 23%, 22%);
  }
}

#nav {
  display: grid;
  grid-template-areas: 'nav-start nav-end';
  grid-template-columns: minmax(120px, 360px) minmax(80px, 1000px);
  justify-content: center;
  box-shadow: 0px 0px 4px 2px;
  transition: all .2s ease-in-out;
  .nav-start {
    grid-area: nav-start;
    justify-self: start;
    .link {
      text-transform: capitalize;
      text-decoration: none;
    }
  }
  .nav-end {
    grid-area: nav-end;
    justify-self: end;
    align-items: center;
    display: flex;
  }
  a {
    font-weight: bold;
  }
}

.container {
  margin: auto;
  display: flex;
  flex-direction: column;
}

@media screen and (min-width: 769px) {
  #nav {
    padding: 30px 60px;
    font-size: 20px;
  }
  .container {
    max-width: 1360px;
    padding: 0 60px;
    min-height: calc(100vh - 87px);
  }
}
@media screen and (max-width: 768px) {
  #nav {
    padding: 30px 30px;
    font-size: 20px;
  }
  .container {
    padding: 0 30px;
    min-height: calc(100vh - 87px);
  }
}
@media screen and (max-width: 600px) {
  #nav {
    padding: 30px 15px;
    font-size: 14px;
  }
  .container {
    padding: 0 15px;
    min-height: calc(100vh - 80px);
  }
}

</style>

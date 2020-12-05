<template>
  <div class="country">
    <span class="btn border back">
      <router-link to="/">
        <ion-icon name="arrow-back-outline"></ion-icon>Back
      </router-link>
    </span>
    <div class="detail" v-if="country">
      <div class="flag">
        <img :src="country.flag" width="300" />
      </div>
      <div class="info">
        <h1>{{ $route.params.country }}</h1>
        <div>
          <li><b>Native Name:</b> {{ country.nativeName }}</li>
          <li><b>Population:</b> {{ country.population }}</li>
          <li><b>Region:</b> {{ country.region }}</li>
          <li><b>Sub Region:</b> {{ country.subregion }}</li>
          <li><b>Capital:</b> {{ country.capital }}</li>
        </div>
        <div>
          <li><b>Top Level Domain:</b> {{ country.topLevelDomain }}</li>
          <li><b>Currencies:</b> {{ country.currencies }}</li>
          <li><b>Languages:</b> {{ country.languages }}</li>
        </div>
      </div>
      <div class="borderland">
        <h2>Border Countries:</h2>

        <span
          class="border"
          v-for="(value, index) in country.borders"
          :key="index"
        >
          <router-link v-bind:to="value">
            <p>{{ value }}</p>
          </router-link>
        </span>
      </div>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: this.$route.params.country,
      country: null
    }
  },
  updated () {
    if (this.name !== this.$route.params.country) {
      this.name = this.$route.params.country
      this.fetchCountry()
    }
  },
  created () {
    this.fetchCountry()
  },
  methods: {
    fetchCountry () {
      fetch('https://restcountries.eu/rest/v2/name/' + this.name)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 404) {
            return
          }
          data = data[0]
          data.topLevelDomain = data.topLevelDomain.join()
          data.currencies = data.currencies.map((x) => x.name).join(', ')
          data.languages = data.languages.map((x) => x.name).join(', ')
          data.population = data.population
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          this.country = data
          data.borders.map((border, index) => {
            fetch('https://restcountries.eu/rest/v2/alpha/' + border)
              .then((response) => response.json())
              .then((data2) => {
                if (data2.status === 404) {
                  return
                }
                this.country.borders[index] = data2.name
              })
          })
          console.log(this.country)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  box-shadow: 0px 0px 2px 2px;
  border-radius: 4px;
  display: flex;
  width: max-content;
  grid-gap: 5px;
  align-items: center;
  transition: all 0.2s ease-in-out;
  a {
    padding: 5px 20px;
  }
}

.detail {
  padding: 0;
  text-align: left;
  display: grid;
  div {
    width: 100%;
    margin: 15px auto;
    * {
      transition: all 0.2s ease-in-out;
    }
  }
  b {
    font-weight: 600;
  }
  li {
    list-style-type: none;
    line-height: 2;
  }
}

.flag {
  grid-area: flag;
  display: flex;
  justify-content: center;
  img {
    width: 100%;
    height: initial;
  }
}

.info {
  grid-area: info;
  display: flex;
  flex-wrap: wrap;
  div {
    margin-top: 30px;
  }
  h1 {
    width: 100%;
    text-transform: capitalize;
  }
}

.borderland {
  grid-area: borderland;
  display: flex;
  flex-wrap: wrap;
  align-content: baseline;
  align-items: baseline;
  h2 {
    margin: 0;
    margin-right: 10px;
    margin-bottom: 10px;
    width: 100%;
    text-transform: capitalize;
    font-weight: 600;
  }
  p {
    margin: 0;
  }
  span {
    display: flex;
    text-align: center;
    justify-content: center;
    min-width: 60px;
    height: max-content;
    padding: 5px;
    margin: 5px 10px;
    margin-left: 0;
    box-shadow: 0px 0px 2px 2px;
    border-radius: 4px;
    user-select: none;
  }
}
@media screen and (min-width: 1201px) {
  .back {
    margin: 60px 0;
  }
  .detail {
    grid-template-areas: "flag info" "flag borderland";
    grid-template-columns: 480px 1fr;
    margin-bottom: 60px;
    h1 {
      font-size: 30px;
    }
    h2 {
      font-size: 16px;
      width: max-content;
    }
    li,
    p {
      font-size: 16px;
    }
    div:nth-child(1) {
      max-width: 460px;
      margin: 0;
    }
    div:not(:nth-child(1)) {
      max-width: 600px;
    }
  }
  .info {
    div {
      width: 50%;
      margin: 0;
    }
  }
}
@media screen and (min-width: 769px) and (max-width: 1200px) {
  .back {
    margin: 60px 0;
  }
  .detail {
    grid-template-areas: "flag" "info" "borderland";
    grid-template-columns: 1fr;
    margin-bottom: 60px;
    h1 {
      font-size: 22px;
    }
    h2 {
      font-size: 16px;
    }
    li,
    p {
      font-size: 14px;
    }
    div:nth-child(1) {
      max-width: 460px;
    }
    div:not(:nth-child(1)) {
      max-width: 600px;
    }
  }
  .info {
    div {
      width: 50%;
    }
  }
}
@media screen and (max-width: 768px) {
  .back {
    margin: 45px 0;
  }
  .detail {
    grid-template-areas: "flag" "info" "borderland";
    grid-template-columns: 1fr;
    margin-bottom: 30px;
    h1 {
      font-size: 22px;
    }
    h2 {
      font-size: 16px;
    }
    li,
    p {
      font-size: 14px;
    }
    div {
      max-width: 460px;
    }
  }
}
</style>

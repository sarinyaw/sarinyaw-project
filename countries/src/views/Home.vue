<template>
  <div class="home">
    <div class="search-field border">
      <ion-icon name="search-outline"></ion-icon>
      <input
        v-model="search"
        v-on:input="changeCountry()"
        placeholder="Search for a country..."
      />
    </div>
    <div class="filter-field">
      <span class="filter-button border" @click="openFilter()">
        <p v-if="selected">{{ selected }}</p>
        <p v-else>Filter By Region</p>
        <ion-icon name="chevron-down-outline"></ion-icon>
      </span>
      <ul class="filter-option border" v-if="isOpenFilter">
        <li v-if="selected" @click="changeRegion()">All Regions</li>
        <li
          v-for="(value, index) in region"
          :key="index"
          @click="changeRegion(value)"
        >
          {{ value }}
        </li>
      </ul>
    </div>
    <div class="countries">
      <div class="card" v-for="(value, index) in resultCountry" :key="index">
        <router-link v-bind:to="value.name">
          <img :src="value.flag" width="300" :alt="value.name" />
          <div>
            <h1>{{ value.name }}</h1>
            <li>
              <b>Population:</b>
              {{
                value.population
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}
            </li>
            <li><b>Region:</b> {{ value.region }}</li>
            <li><b>Capital:</b> {{ value.capital }}</li>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      title: 'My Title',
      region: ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'],
      country: null,
      searchCountry: null,
      filterCountry: null,
      resultCountry: null,
      isOpenFilter: false,
      search: '',
      selected: ''
    }
  },
  created () {
    document.title = 'Where In The World?'
    fetch('https://restcountries.eu/rest/v2/all/')
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 404) {
          return
        }
        this.resultCountry = this.country = data
      })
  },
  methods: {
    openFilter () {
      this.isOpenFilter = !this.isOpenFilter
    },
    changeCountry () {
      if (this.selected) {
        this.searchCountry = this.filterCountry.filter((x) =>
          x.name.toLowerCase().startsWith(this.search.toLowerCase())
        )
      } else {
        this.searchCountry = this.country.filter((x) =>
          x.name.toLowerCase().startsWith(this.search.toLowerCase())
        )
      }
      this.resultCountry = this.searchCountry
    },
    changeRegion (value) {
      this.selected = value
      if (this.selected) {
        this.filterCountry = this.country.filter(
          (x) => x.region === this.selected
        )
      } else {
        this.filterCountry = this.country
      }
      this.resultCountry = this.filterCountry
      this.changeCountry()
      this.isOpenFilter = !this.isOpenFilter
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-content: baseline;
}
.search-field,
.filter-field {
  border-radius: 6px;
  width: max-content;
  height: max-content;
}
.search-field,
.filter-button {
  box-shadow: 0px 2px 8px 1px;
}
.search-field {
  display: flex;
  align-items: center;
  padding: 15px;
  input {
    margin-left: 10px;
    outline: none;
    border: 0;
  }
}
.filter-field {
  align-self: center;
  text-align: left;
  position: relative;
  z-index: 3;
  .filter-button,
  .filter-option {
    border-radius: 6px;
    width: 150px;
    margin: 0;
    cursor: pointer;
    user-select: none;
  }
  .filter-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5px 25px;
    font-size: 14px;
    margin-bottom: 5px;
  }
  .filter-option {
    position: absolute;
    font-size: 14px;
    padding: 15px 25px;
    transition: all 0.5s ease-in-out;
  }
  li {
    list-style-type: none;
    line-height: 2;
    &:hover {
      color: rgb(45, 164, 204);
    }
  }
}
.countries {
  width: 100%;
  padding: 0;
  text-align: left;
  display: grid;
  grid-gap: 40px;
  .card {
    width: 100%;
    margin: 0;
    transition: all 0.4s ease-in-out;
    &:hover {
      transform: scale(1.025);
    }
    a {
      width: 100%;
      display: grid;
      h1 {
        margin-top: 0;
      }
      div {
        width: auto;
        padding: 25px 25px 40px 25px;
      }
    }
  }
  h1 {
    font-size: 22px;
  }
  li {
    font-size: 16px;
  }
  b {
    font-weight: 600;
  }
  li {
    list-style-type: none;
    line-height: 2;
  }
  img {
    width: 100%;
    object-fit: cover;
  }
}

@media screen and (max-width: 600px) {
  .filter-field {
    margin-bottom: 30px;
  }
  .search-field {
    margin: 30px 0;
    width: calc(100% - 30px);
    input {
      width: 100%;
    }
  }
  .countries {
    grid-template-columns: repeat(1, minmax(250px, 400px));
    justify-content: center;
    .card {
      width: 90%;
      margin: auto;
    }
    img {
      height: 200px;
    }
  }
}

@media screen and (min-width: 601px) {
  .filter-field {
    margin-bottom: 30px;
  }
  .search-field {
    margin: 30px 0;
    width: calc(100% - 30px);
    input {
      width: 100%;
    }
  }
  .countries {
    grid-template-columns: repeat(2, 1fr);
    img {
      height: 180px;
    }
  }
}

@media screen and (min-width: 769px) {
  .search-field,
  .filter-field {
    margin: 30px 0;
  }
  .search-field {
    max-width: 360px;
    margin-right: 15px;
    input {
      width: 100%;
    }
  }
  .countries {
    grid-template-columns: repeat(2, 1fr);
    img {
      height: 180px;
    }
  }
}

@media screen and (min-width: 900px) {
  .search-field,
  .filter-field {
    margin: 30px 0;
  }
  .countries {
    grid-template-columns: repeat(3, 1fr);
    img {
      height: 200px;
    }
  }
}

@media screen and (min-width: 1360px) {
  .countries {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>

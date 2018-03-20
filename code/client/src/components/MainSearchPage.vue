<template>
  <div>
    <img id="logo" src="http://res.cloudinary.com/trashio/image/upload/v1520801907/28536874_1856489427709331_1450964457_n.jpg">
    <br>
    <form>
      <input v-model="item_name" placeholder="What waste is it?" autofocus>
      <br>
      <select v-model="selected_area">
        <option disabled value="">Please select city</option>
        <option>Toronto</option>
        <option>Beijing</option>
        <option>New York</option>
      </select>
      <button v-on:click="searchItem">Search</button>
    </form>
  </div>
</template>

<script>
import ItemSearchService from '@/services/ItemSearchService'
export default {
  name: 'MainSearchPage',
  data () {
    return {
      item_name: '',
      selected_area: '',
      selected_language: 'en',
      error: null
    }
  },
  methods: {
    async searchItem () {
      try {
        const response = await ItemSearchService.searchItemWithLocation({
          item: this.item_name,
          location: this.selected_area,
          language: this.selected_language
        })
        console.log(response.data)
      } catch (err) {
        this.error = err.response.data.error
      }
    }
  }
}
</script>

<style scoped>
#logo {
  width: 400px;
  height: auto;
}

</style>

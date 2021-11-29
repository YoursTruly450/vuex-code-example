<template>
  <div v-if="computedItems && computedItems.length > 0">
    <div v-for="(item, index) in computedItems" :key="index">
      {{item}}
    </div>
  </div>
</template>

<script>
  
  import {mapGetters, mapActions} from 'vuex';
  
  export default {
    components: {},
    computed: {
      ...mapGetters(['rating']),
      computedItems() {
        let arr = new Array();
        if (this.rating && this.rating.results && this.rating.results.length > 0) {
          arr = this.rating.results;
        }
        return arr;
      }
    },
    methods: {
      ...mapActions(['getRating']),
    },
    mounted() {
      this.getRating({page_size: 4, page: 1, level_slug: '', search: ''});
    },
    watch: {
    },
    data: () => ({
    })
  }
</script>

<style>
  
</style>

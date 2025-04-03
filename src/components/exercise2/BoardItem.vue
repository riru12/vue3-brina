<template>
    <li class="board-item" :class="{'highlight': matched}"><span>{{ title }}</span> <span>{{ user }}</span> <span>{{ date }}</span></li>
</template>

<style scoped>
    .board-item {
        padding: 10px 15px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-around;
    }
    .highlight {
      background-color: yellow;
  }
</style>

<script>
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    name: 'BoardItem',
    props: {
      title: {
        type: String,
        required: true
      },
      user: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      }
    },
    inject: ['search'],
    computed: {
      matched() {
        return this.search && 
            ((this.title.toLowerCase().includes(this.search.toLowerCase())) ||
             (this.user.toLowerCase().includes(this.search.toLowerCase())) ||
             (this.date.toLowerCase().includes(this.search.toLowerCase())));
      }
    }
  })
</script>
  
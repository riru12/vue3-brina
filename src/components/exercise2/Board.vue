<template>
  <div>
    <div class="board-header">
      <h6 class="board-title" :class="{'highlight': matched}" :style="{color: color}">{{ title }}</h6>
      <select class="board-color" @change="updateColor($event)">
        <option value="#000000" disabled selected>Select a color</option>
        <option value="#000000">Black</option>
        <option value="#ff8585">Red</option>
        <option value="#7a97ff">Blue</option>
        <option value="#63cc5a">Green</option>
      </select>
    </div>
    <ul class="board" :style="{ borderColor: color === '#000000' ? '#ddd' : color }">
      <li v-for="(item, index) in items" :key="index"><BoardItem :title="item.title" :user="item.user" :date="item.date" /></li>
    </ul>
  </div>
</template>

<style scoped>
  .board {
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 0;
      margin: 0;
      list-style-type: none;
  }
  .board-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .board-title {
      margin: 1rem 0 0.5rem 0;
      font-weight: bold;
      max-width: fit-content;
      padding-left: 0.2rem;
      padding-right: 0.2rem;
  }
  .board-color {
    max-height: fit-content;
  }
  .highlight {
      background-color: rgb(250, 250, 174);
  }
</style>
  
<script>
  import BoardItem from 'components/exercise2/BoardItem.vue'
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    components: {
      BoardItem
    },
    name: 'Board',
    props: {
      id: {
        type: Number,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      color: {
        type: String,
        default: "black"
      },
      items: {
        type: Array,
        default: () => []
      }
    },
    inject: ['search'],
    computed: {
      matched() {
        return this.search && this.title.toLowerCase().includes(this.search.toLowerCase());
      }
    },
    methods: {
      updateColor(event) {
        const newColor = event.target.value;
        this.$emit('update-color', { id: this.id, color: newColor });
      }
    }
  })
</script>
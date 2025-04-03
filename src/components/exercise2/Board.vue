<template>
  <div>
    <div class="board-header">
      <div class="board-subheader">
        <h6 class="board-title" :class="{'highlight': matched}" :style="{color: color}">
          <input v-if="isEditing" v-model="newTitle" @keyup.enter="updateTitle"/>
          <span v-else @click="startEditing">{{ newTitle }}</span>
        </h6>
        <button class="del-button" @click="deleteBoard">Delete Board</button>
      </div>
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
    margin: 1rem 0 0.5rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .board-subheader {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .board-subheader button {
    max-height: fit-content;
  }
  .board-title {
      margin: 0;
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
  .del-button {
    padding: 2px 10px;
    font-size: 14px;
    color: white;
    background-color: #f07676;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .del-button:hover {
    background-color: #c24545;
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
    data() {
      return {
        isEditing: false,
        newTitle: this.title
      }
    },
    computed: {
      matched() {
        return this.search && this.title.toLowerCase().includes(this.search.toLowerCase());
      }
    },
    methods: {
      updateColor(event) {
        const newColor = event.target.value;
        this.$emit('update-color', { id: this.id, color: newColor });
      },

      startEditing() {
        this.isEditing = true;
      },

      updateTitle() {
        if (this.newTitle !== this.title) {
          // Check if the new title is unique
          const isTitleUnique = this.$parent.boards.every(board => board.title !== this.newTitle || board.id === this.id);
          
          if (isTitleUnique) {
            this.$emit('update-title', { id: this.id, title: this.newTitle });
            this.isEditing = false;
          } else {
            alert("Board titles must be unique.");
          }
        } else {
          this.isEditing = false;
        }
      },

      deleteBoard() {
        console.log(this.id);
        this.$emit('delete-board', { id: this.id });
      }
    }
  })
</script>

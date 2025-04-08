<template>
  <div>
    <div class="input-group">
      <label for="search">Search</label>
      <input id="search" type="text" v-model="search">
    </div>
    <div id="board-container">
      <div v-for="(board) in boards" :key="board.id">
        <Board :id="board.id" :title="board.title" :color="board.color" :items="board.items" @update-color="handleColorUpdate" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .input-group {
      display: flex;
      flex-direction: column;
      min-width: 200px;
  }
  .input-group label {
      margin-bottom: 5px;
      font-weight: bold;
  }
  .input-group input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
  }
</style>
  
<script>
  import Board from '../../components/exercise2/Board.vue'
  import { computed } from 'vue';

  export default {
    components: {
      Board
    },
    data() {
      return {
        search: "",
        // hardcoded boards
        boards: [
          {
            id: 1,
            title: "Board 1",
            color: "#000000",
            items: [
              { title: 'Post 1', user: 'User1', date: '2025-04-01' },
              { title: 'Post 2', user: 'User2', date: '2025-04-02' },
              { title: 'Post 3', user: 'User3', date: '2025-04-03' }
            ]
          },
          {
            id: 2,
            title: "Board 2",
            color: "#000000",
            items: [
              { title: 'Post 1', user: 'User1', date: '2025-04-01' },
              { title: 'Post 2', user: 'User2', date: '2025-04-02' },
              { title: 'Post 3', user: 'User3', date: '2025-04-03' }
            ]
          }
        ]
      }
    },
    provide() {
      return {
        search: computed(() => this.search)
      }
    },
    methods: {
      handleColorUpdate({ id, color }) {
        const boardToUpdate = this.boards.find(board => board.id === id);
        if (boardToUpdate) {
          boardToUpdate.color = color;
        }
      }
    }
  }
</script>

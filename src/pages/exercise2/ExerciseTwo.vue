<template>
  <div>
    <div class="input-row">
      <div class="input-group">
        <label for="search">Search</label>
        <input id="search" type="text" v-model="search">
      </div>
      <div class="input-group">
        <label for="newBoardTitle">New Board Title</label>
        <input id="newBoardTitle" type="text" v-model="newBoardTitle">
      </div>
      <div>
        <button class="add-button" @click="addBoard">Add Board</button>
      </div>
    </div>
    <div v-for="(board) in boards" :key="board.id">
      <Board :id="board.id" :title="board.title" :color="board.color" :items="board.items" 
        @update-color="handleColorUpdate" 
        @update-title="handleTitleUpdate"
        @delete-board="handleDeleteBoard"
      />
    </div>
  </div>
</template>

<style scoped>
  .input-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
    align-items: end;
  }
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
  .add-button {
    padding: 8px 15px;
    font-size: 14px;
    color: white;
    background-color: #8bbf57;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .add-button:hover {
    background-color: #4a794d;
  }
</style>
  
<script>
  import Board from 'components/exercise2/Board.vue'
  import { computed } from 'vue';

  export default {
    components: {
      Board
    },
    data() {
      return {
        search: "",
        newBoardTitle: "",
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
      },

      handleTitleUpdate({ id, title }) {
        const boardToUpdate = this.boards.find(board => board.id === id);
        if (boardToUpdate) {
          boardToUpdate.title = title;
        }
      },

      handleDeleteBoard({ id }) {
        const index = this.boards.findIndex(board => board.id === id);
        if (index >= 0) {
          this.boards.splice(index, 1); // Remove the board at the found index
        }
      },

      addBoard() {
        if (this.newBoardTitle.trim() === "") {
          alert("Please enter a board name.");
          return;
        }

        // Check if the title is unique
        const isTitleUnique = !this.boards.some(board => board.title === this.newBoardTitle);
        if (!isTitleUnique) {
          alert("Board title must be unique.");
          return;
        }

        const newBoardId = Math.max(...this.boards.map(board => board.id), 0) + 1;
        const newBoard = {
          id: newBoardId,
          title: this.newBoardTitle,
          color: "#000000",
          items: []
        };
        this.boards.push(newBoard);

        // Clear the input after adding the board
        this.newBoardTitle = "";
      }
    }
  }
</script>

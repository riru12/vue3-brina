<template>
  <div>
    <div class="input-row">
      <div class="input-group">
        <label for="search">Search</label>
        <input id="search" type="text" v-model="search" />
      </div>

      <vee-form ref="boardForm" @submit="addBoard">
        <div class="row-subgroup">
          <div class="input-group" style="position: relative;">
            <label for="new-board-title">New Board Title</label>
            <field
              id="new-board-title"
              name="newBoardTitle"
              v-model="newBoardTitle"
              :rules="validateUniqueBoardTitle"
              v-slot="{ field, errors }"
            >
              <input v-bind="field" type="text" />
              <span class="error-message" v-if="errors.length">{{ errors[0] }}</span>
            </field>
          </div>
          <button class="add-button" type="submit">Add Board </button>
        </div>
      </vee-form>
    </div>

    <div class="board-container" v-for="(board, index) in boards" :key="board.id">
      <div class="sort-buttons">
        <button @click="moveBoard(index, -1)" :disabled="index === 0">▲</button>
        <button @click="moveBoard(index, 1)" :disabled="index === boards.length - 1">▼</button>
      </div>
      <Board
        :id="board.id"
        :title="board.title"
        :color="board.color"
        :items="board.items"
        :validateUniqueBoardTitle="validateUniqueBoardTitle"
        @update-color="handleColorUpdate"
        @delete-board="handleBoardDelete"
        @add-item="handleItemAdd"
        @edit-board-title="handleBoardTitleEdit"
        @edit-board-item="handleItemUpdate"
        @delete-board-item="handleItemDelete"
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
  .row-subgroup {
      display: flex;
      flex-direction: row;
      min-width: 200px;
      gap: 0.5rem;
      align-items: end;
  }
  .input-group {
      display: flex;
      flex-direction: column;
      min-width: 200px;
      margin-bottom: 10px;
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
     background-color: rgb(42, 215, 126);
     border: none;
     border-radius: 4px;
     cursor: pointer;
     max-height: fit-content;
     margin-bottom: 10px;
   }
  .error-message {
      color: red;
      font-size: 12px;
      position: absolute;
      bottom: -25%;
  }
  .board-container {
    display:flex;
    width: 100%;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  .sort-buttons {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .sort-buttons button {
    padding: 5px;
    font-size: 14px;
    cursor: pointer;
    border: none;
    background-color: #ddd;
    border-radius: 4px;
  }
  .sort-buttons button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>

<script>
import Board from 'components/exercise2/Board.vue';
import { computed } from 'vue';
import { Field, Form as VeeForm } from 'vee-validate';

export default {
  components: {
    Board,
    Field,
    VeeForm
  },
  data() {
    return {
      search: "",
      newBoardTitle: "",
      boards: []
    };
  },
  provide() {
    return {
      search: computed(() => this.search),
    };
  },
  methods: {
    validateUniqueBoardTitle(value) {
      if (!value.trim()) {
        return "Board title is mandatory.";
      }
      if (this.boards.some(board => board.title.toLowerCase() === value.toLowerCase())) {
        return "Board title must be unique!";
      }
      return true;
    },
    addBoard() {
      if (!this.newBoardTitle.trim()) return;

      const newBoard = {
        id: this.boards.length + 1,
        title: this.newBoardTitle,
        color: "#000000",
        items: [],
      };

      this.boards.push(newBoard);
      this.newBoardTitle = "";
      this.$refs.boardForm.resetForm();
    },
    moveBoard(index, direction) {
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= this.boards.length) return;
      [this.boards[index], this.boards[newIndex]] = [this.boards[newIndex], this.boards[index]];
    },
    handleColorUpdate({ id, color }) {
      const boardToUpdate = this.boards.find(board => board.id === id);
      if (boardToUpdate) boardToUpdate.color = color;
    },
    handleBoardDelete({ id }) {
      this.boards = this.boards.filter(board => board.id !== id);
    },
    handleBoardTitleEdit({ id, title }) {
      const boardToUpdate = this.boards.find(board => board.id === id);
      if (boardToUpdate) boardToUpdate.title = title;
    },
    handleItemAdd({ id, title, user, date }) {
      const boardToUpdate = this.boards.find(board => board.id === id);
      if (boardToUpdate) {
        boardToUpdate.items.push({ title, user, date });
      }
    },
    handleItemUpdate({ id, oldTitle, title, user, date }) {
      const boardToUpdate = this.boards.find(board => board.id === id);
      if (boardToUpdate) {
        const itemToUpdate = boardToUpdate.items.find(item => item.title === oldTitle);
        if (itemToUpdate) Object.assign(itemToUpdate, { title, user, date });
      }
    },
    handleItemDelete({ id, title }) {
      const boardToUpdate = this.boards.find(board => board.id === id);
      if (boardToUpdate) {
        boardToUpdate.items = boardToUpdate.items.filter(item => item.title !== title);
      }
    }
  }
};
</script>

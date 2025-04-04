<template>
  <div style="flex-grow: 1;">
    <div class="board-header">
      <div class="board-subheader">
        <h6 class="board-title" :class="{'highlight': matched}" :style="{color: color}" @click="editTitle">
          <span v-if="!isEditing">{{ newBoardTitle }}</span>
          <input v-else v-model="newBoardTitle" type="text" @keyup.enter="saveTitle" />
        </h6>
        <button class="del-button" @click="deleteBoard">Delete Board</button>
      </div>

      <div class="board-subheader">
        <Field
          id="new-item-title"
          name="newItemTitle"
          v-model="newItemTitle"
          :rules="validateUniqueItemTitle"
          validateOnMount="false"
          v-slot="{ field, errors }"
        >
          <input v-bind="field" type="text" placeholder="Title">
          <span class="error-message" v-if="errors.length">{{ errors[0] }}</span>
        </Field>

        <input v-model="newItemUser" placeholder="User">
        <button class="add-item-button" @click="addItem" :disabled="newItemTitle === ''">Add Board Item</button>
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
      <li v-for="(item, index) in items" :key="index">
        <BoardItem 
          :title="item.title" 
          :user="item.user" 
          :date="item.date" 
          :validateUniqueItemTitle="validateUniqueItemTitle"
          @edit-board-item="handleItemUpdate"
          @delete-board-item="handleItemDelete"
         />
      </li>
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
   .add-item-button {
     padding: 2px 10px;
     font-size: 14px;
     color: white;
     background-color: #4e62e8;
     border: none;
     border-radius: 4px;
     cursor: pointer;
   }
   .add-item-button:hover {
     background-color: #0320a2b0;
   }
  .highlight {
      background-color: rgb(250, 250, 174);
  }
  .error-message {
      color: red;
      font-size: 12px;
  }
</style>
  
<script>
  import BoardItem from 'components/exercise2/BoardItem.vue'
  import { defineComponent } from 'vue'
  import { Field } from 'vee-validate';
  
  export default defineComponent({
    components: {
      BoardItem,
      Field
    },
    data() {
      return {
        newItemTitle: "",
        newItemUser: "",
        isEditing: false,
        oldBoardTitle: "",
        newBoardTitle: this.title
      }
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
      },
      validateUniqueBoardTitle: {
        type: Function,
        required: true
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
      },

      deleteBoard() {
        this.$emit('delete-board', { id: this.id });
      },

      addItem() {
        const validationResult = this.validateUniqueItemTitle(this.newItemTitle);
        if (typeof validationResult === "string") {
          return alert(validationResult);
        }
        
        this.$emit('add-item', { id: this.id, title: this.newItemTitle, user: this.newItemUser, date: new Date().toISOString().split('T')[0]});

        this.newItemTitle = ""; // Reset input after adding
        this.newItemUser = ""; // Reset input after adding
      },

      validateUniqueItemTitle(value) {
        if (this.items.some(item => item.title.toLowerCase() === value.toLowerCase())) {
          return "Item title must be unique!";
        }
        return true;
      },

      editTitle() {
        this.oldBoardTitle = this.newBoardTitle;
        this.isEditing = true;
      },

      saveTitle() {
        const validationResult = this.validateUniqueBoardTitle(this.newBoardTitle);
        if (typeof validationResult === "string") {
          this.newBoardTitle = this.oldBoardTitle;
          this.isEditing = false;
          return alert(validationResult);
        }
        this.isEditing = false;
        this.$emit('edit-board-title', { id: this.id, title: this.newBoardTitle });
      },

      handleItemUpdate({ oldTitle, title, user, date }) {
        this.$emit('edit-board-item', { id: this.id, oldTitle: oldTitle, title: title, user: user, date: date });
      },
      handleItemDelete({ title }) {
        this.$emit('delete-board-item', { id: this.id, title: title });
      }
    }
  })
</script>
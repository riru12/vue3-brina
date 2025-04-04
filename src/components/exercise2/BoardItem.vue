<template>
    <li class="board-item" :class="{'highlight': matched}">
        <div class="board-subgroup" v-if="!isEditing">
            <span>{{ newItemTitle }}</span>
            <span>{{ newItemUser }}</span>
            <span>{{ date }}</span>
            <div class="button-subgroup">
                <button class="maintenance-button" @click="editItem">Edit</button>
                <button class="maintenance-button" @click="deleteItem">Delete</button>
            </div>
        </div>

        <div class="board-subgroup" v-else>
            <input v-model="newItemTitle" @keyup.enter="saveItem" type="text" />
            <input v-model="newItemUser" @keyup.enter="saveItem" type="text" />
            <span>{{ date }}</span>
            <button class="maintenance-button" @click="saveItem">Save</button>
        </div>
    </li>
</template>

<style scoped>
    .board-subgroup {
        padding: 10px 15px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-around;
    }
    .highlight {
      background-color: yellow;
    }
    .maintenance-button {
        padding: 2px 10px;
        font-size: 14px;
        color: white;
        background-color: #a7a7a7;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    .maintenance-button:hover {
        background-color: #7b7b7b;
    }
    .button-subgroup {
        display:flex;
        gap: 0.5rem;
        padding: 0;
    }
</style>

<script>
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    name: 'BoardItem',
    data() {
      return {
        isEditing: false,
        newItemTitle: this.title,
        oldItemTitle: "",
        newItemUser: this.user
      }
    },
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
      },
      validateUniqueItemTitle: {
        type: Function,
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
    },
    methods: {
      editItem() {
        this.oldItemTitle = this.newItemTitle;
        this.isEditing = true;
      },

      saveItem() {
        if (this.oldItemTitle !== this.newItemTitle) {  // only validate the new item title if it changed
            const validationResult = this.validateUniqueItemTitle(this.newItemTitle);
            if (typeof validationResult === "string") { // if validation failed
                this.newItemTitle = this.oldItemTitle;  // revert back the item title
                this.oldItemTitle = "";
                this.isEditing = false;
                return alert(validationResult);
            }
        }
        this.isEditing = false;
        this.$emit('edit-board-item', { oldTitle: this.oldItemTitle, title: this.newItemTitle, user: this.newItemUser, date: new Date().toISOString().split('T')[0] });
      },

      deleteItem() {
        this.$emit('delete-board-item', { title: this.newItemTitle });
      }
    }
  })
</script>
  
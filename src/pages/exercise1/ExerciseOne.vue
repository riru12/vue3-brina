<template>
    <div>
        <div class="input-row"> 
        <div class="input-group">
            <label for="firstName">First Name</label>
            <input id="firstName" type="text" v-model="firstName">
        </div>
        <div class="input-group">
            <label for="lastName">Last Name</label>
            <input id="lastName" type="text" v-model="lastName">
        </div>
        <div class="input-group">
            <label for="minAge">Minimum Age</label>
            <input id="minAge" type="number" v-model="minAge">
        </div>
        <div class="input-group">
            <label for="maxAge">Maximum Age</label>
            <input id="maxAge" type="number" v-model="maxAge">
        </div>
        </div>

        <ul class="user-list">
            <template v-if="filteredUsers.length > 0">
                <li v-for="(user, index) in filteredUsers" :key="index" class="user-item">
                    {{ user.firstName }} {{ user.lastName }} ({{ user.age }} y/o)
                </li>
            </template>
            <li v-else class="no-results">
                No Users Retrieved
            </li>
        </ul>
    </div>
</template>

<style scoped>
    .input-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
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
    .user-list {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0;
    margin: 0;
    list-style-type: none;
    }
    .user-item {
    padding: 10px 15px;
    border-bottom: 1px solid #eee;
    }
    .no-results {
    padding: 10px 15px;
    color: #888;
    font-style: italic;
    }
</style>
  
<script>
export default {
    data() {
        return {
        firstName: "",
        lastName: "",
        minAge: null,
        maxAge: null,
        users: [
            { lastName: "Riña", firstName: "Brill", age: 23 },
            { lastName: "Doe", firstName: "John", age: 24 },
            { lastName: "Parker", firstName: "Peter", age: 20 },
            { lastName: "User", firstName: "Test", age: 999 }
        ]
        };
    },
    computed: {
        filteredUsers() {
        return this.users.filter(user => {
            const nameMatch = user.firstName.toLowerCase().includes(this.firstName.toLowerCase()) &&
            user.lastName.toLowerCase().includes(this.lastName.toLowerCase());

            const ageMatch = (this.minAge === null || this.minAge === '' || user.age >= parseInt(this.minAge)) && 
            (this.maxAge === null || this.maxAge === '' || user.age <= parseInt(this.maxAge));

            return nameMatch && ageMatch;
        });
        }
    }
};
</script>
  
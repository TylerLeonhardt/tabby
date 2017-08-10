;(function() {
  Vue.component("todo-cmp", {
    data() {
      return {
        title: "Home Pages",
        todos: [],
        todoForm: {
          todo: {
            todoMessage: ""
          }
        }
      }
    },
    template: `
      <div class="todo-container">
        <form class="todo-form"
              @submit.prevent="add(todoForm.todo)">

          <h1 class="todo-title">{{title}}</h1>

          <input type="text"
                 v-model="todoForm.todo.todoMessage"
                 v-bind:class="{'todo-error': !todoForm.todo.todoMessage}"
                 placeholder="What do you have todo?"
                 autofocus />

          <button type="submit"
                  :disabled="!todoForm.todo.todoMessage.length">+</button>
        </form>

        <div class="todo-list">
          <div v-for="todo in todos"
              class="todo-item"
              @click="remove(todo._id);">
            <p>{{todo.todoMessage}}</p>
          </div>
        </div>
      </div>
    `,
    mounted() {
      this.getAll();
    },
    methods: {
      getAll() {
        let todos = localStorage.getItem("todos");
        try {
          this.todos = JSON.parse(todos);
        }catch(err) {
          console.error(err);
          this.todos = [];
        };
      },
      add(message) {
        this.todos.push({
          _id: Math.random() * 2000 + "" + Date.now(),
          todoMessage: message.todoMessage
        });
        localStorage.setItem("todos", JSON.stringify(this.todos));
        this.todoForm.todo.todoMessage = "";
      },
      remove(id) {
        this.todos.forEach((todo, index) => {
          if (todo._id === id) {
            this.todos.splice(index, 1);
          }
        });
        localStorage.setItem("todos", JSON.stringify(this.todos));
      }
    }
  });
}());

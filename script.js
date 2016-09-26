var todoList = {
  todos: [],
  addTodo: function(todoText){
    this.todos.push({
      todoText: todoText,
      completed: false
    })
  },
  changeTodo: function(position, todoText){
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position){
    this.todos.splice(position,1);
  },
  toggleCompleted: function(position){
    this.todos[position].completed = !this.todos[position].completed;
  },
  toggleAll: function(){
    let count = 0;
    let len = this.todos.length;
    this.todos.forEach(function(todo){
      if(todo.completed === true){
        count ++;
      }
    });
    this.todos.forEach(function(todo){
      if(count === len){
        todo.completed = false;
      }else{
        todo.completed = true;
      }
    })
  }
};

var handlers = {
  addTodo: function(){
    let addTodoText = document.getElementById('addTodoText');
    todoList.addTodo(addTodoText.value);
    addTodoText.value = '';
    view.displayTodos();
  },
  changeTodo: function(){
    let changePosition = document.getElementById('changePosition');
    let changeText = document.getElementById('changeText');
    todoList.changeTodo(changePosition.valueAsNumber, changeText.value);
    changePosition.value = '';
    changeText.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position){
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function(){
    let toggleCompletedTodo = document.getElementById('toggleCompletedTodo');
    todoList.toggleCompleted(toggleCompletedTodo.valueAsNumber);
    toggleCompletedTodo.value = '';
    view.displayTodos();
  },
  toggleAll: function(){
    todoList.toggleAll();
    view.displayTodos();
  }
};

var view = {
  displayTodos: function(){
    let query = document.querySelector('ul');
    query.innerHTML = '';
    todoList.todos.forEach(function(todo, position){
      let liElement = document.createElement('li');
      let text = '';
      if(todo.completed === true){
        text = '(x) ' + todo.todoText;
      }else{
        text = '( ) ' + todo.todoText;
      }
      
      liElement.id = position;
      liElement.textContent = text;
      liElement.appendChild(this.createDeleteButton());
      query.appendChild(liElement);
      
    },this);
    
  },
  createDeleteButton: function(){
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    
    return deleteButton;
  },
  setUpEventListeners: function(){
    let query = document.querySelector('ul');
    query.addEventListener('click', function(event){
      let target = event.target;
      
      if(target.className === 'deleteButton'){
        handlers.deleteTodo(parseInt(target.parentNode.id));
      }
    })
  }
};

view.setUpEventListeners();































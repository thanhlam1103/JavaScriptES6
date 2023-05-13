export class TodoList {
    constructor()
    {
        this.TodoList = [];
    }
    // Add 
    addTodo(todo)
    {
        this.TodoList.push(todo);
    }
    // Render UI
    renderTodo()
    {
        let content = "";
        content = this.TodoList.reduceRight((tdContent,item,index)=>{
            tdContent +=`
                <li>
                    <span>${item.textTodo}</span>
                    <div class="buttons">
                        <button class="remove" data-index="${index}" onclick="removeTodo(event)" data-status="${item.status}">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button class="complete" data-index="${index}" data-status="${item.status}" onclick = "CompleteTodo(event)">
                            <i class="far fa-check-circle"></i>
                            <i class="fas fa-check-circle"></i>
                        </button>
                    </div>
                </li>
            `
            return tdContent;
        },"");
        return content;
    }
    // Remove
    removeTodo(index)
    {
        this.TodoList.splice(index, 1);
    }
    //sort
    sortTodoList(isDES)
    {
        this.TodoList.sort((todo,nextTodo)=>{
            let textA = todo.textTodo.toLowerCase();
            let textB = nextTodo.textTodo.toLowerCase();

            return textB.localeCompare(textA);
        });
        if(isDES == true) {
            return this.TodoList.reverse(); 
        }
    }
}
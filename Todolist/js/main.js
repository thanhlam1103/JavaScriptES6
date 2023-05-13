import { Todo } from "./todo.js";
import { TodoList } from "./todoList.js";

const getEle = id => {
    return document.getElementById(id);
}
let listTodo = new TodoList();
let compleList = new TodoList();
// Add todo list
const addTodo = () => {
    let txtTodo = getEle("newTask").value;
    if (txtTodo != "") {
        let todo = new Todo(txtTodo, "todo");
        //add vào list
        listTodo.addTodo(todo);
        showTodo();
    }
}
getEle("addItem").addEventListener("click", () => {
    addTodo();
})

// Show todo list
const showTodo = () => {
    let ulTodo = getEle("todo");
    ulTodo.innerHTML = listTodo.renderTodo();
}
// Show todo list
const showTodoCompleted = () => {
    let ulTodoCompleted = getEle("completed");
    ulTodoCompleted.innerHTML = compleList.renderTodo();
}
// Remove Function
const removeTodo = (e) => {
    let tdIndex = e.currentTarget.getAttribute("data-index");
    let status = e.currentTarget.getAttribute("data-status");
    
    if(status == "todo")
    {
        listTodo.removeTodo(tdIndex);
         // show ui 
        showTodo();
    }
    else if(status=="completed")
    {
        compleList.removeTodo(tdIndex);
        showTodoCompleted();
    }
   
}

window.removeTodo = removeTodo;

// Completed list => tạo ra một đối tượng đã hoàn thành
const CompleteTodo = (e) => {
    let tdIndex = e.currentTarget.getAttribute("data-index");
    // Cách 1
    /**
     * let TodoObject = {};
        TodoObject = listTodo.TodoList[tdIndex];
        let ulComplete = getEle("completed");
        if(TodoObject.status == "todo")
            {
                removeTodo(e);

                    //add vào Completed
                compleList.addTodo(TodoObject);
                ulComplete.innerHTML = compleList.renderTodo();
             }
     * 
     */
    //Cách 2        
    let tdStatus = e.currentTarget.getAttribute("data-status");
    if(tdStatus == "todo")
    {
       
        //lấy phần tử tại đó từ mảng ra
        let itemCompleted = listTodo.TodoList.slice(tdIndex,tdIndex+1);
        let ObjTodo = new Todo(itemCompleted[0].textTodo,"completed");
        let ulTodo = getEle("todo");
        let ulCompleted = getEle("completed");
        //
        moveItem(listTodo,compleList,ObjTodo,tdIndex);
        ulTodo.innerHTML = listTodo.renderTodo();
        ulCompleted.innerHTML = compleList.renderTodo();
    }
    else if(tdStatus == "completed")
    {
        let itemUndo = compleList.TodoList.slice(tdIndex,tdIndex+1);
        let ObjTodoUndo = new Todo(itemUndo[0].textTodo,"todo");
        let ulTodo = getEle("todo");
        let ulCompleted = getEle("completed");
        //
        moveItem(compleList,listTodo,ObjTodoUndo,tdIndex);
        ulTodo.innerHTML = listTodo.renderTodo();
        ulCompleted.innerHTML = compleList.renderTodo();
    }
}
//Move item
const moveItem = (depart,arrival,obj,index) => {
    //remove list chưa hoàn Thành
    depart.removeTodo(index);
    //add vào list đã hoàn Thành
    arrival.addTodo(obj);
}
window.CompleteTodo = CompleteTodo;

//Sort
const sortASC = (e)=> {
    
    listTodo.sortTodoList(false);
    showTodo();
}
const sortDES = (e) => {
    listTodo.sortTodoList(true);
    showTodo();
}
window.sortASC = sortASC;
window.sortDES = sortDES;
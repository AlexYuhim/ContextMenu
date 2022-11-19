import {Module} from "../core/module";

export  class  DragDropModule extends Module{
  constructor(type,text) {
    super(type,text);
    this.wrapperForDragDrop = document.createElement('div');
  }
  trigger() {

    this.wrapperForDragDrop.classList.add('wrapper-drag-drop');
    this.wrapperForDragDrop.innerHTML = ` 
       <div class="tasks">
      
            <form class="create-task-block">
              <input
                name="taskName"
                class="create-task-block__input default-text-input"
                type="text"
                placeholder="Создайте новую задачу"
                value=""
              >
              <button
                type="submit"
                class="create-task-block__button default-button"
              >
              +
              </button>
            </form>
      
      
        </div>
        <div class="body">
          <div>
            <div class="row">
                <div class="col-header start">Начать</div>
                <div class="col-header progress">В процессе</div>
                <div class="col-header done">Готовы</div>
            </div>
      
            <div class="row">
              <div class="placeholder"></div>
              <div class="placeholder"></div>
              <div class="placeholder"></div>
            </div>
            
          </div>
        </div>
        `;
    document.body.append(this.wrapperForDragDrop)
  }
  jsDragDrop(){

    const placeholders = document.querySelectorAll(".placeholder");
    const taskForm = document.querySelector('.create-task-block');
    const taskFormInput = taskForm.querySelector('.create-task-block__input');


    taskForm.addEventListener('submit',(evt)=>{
      evt.preventDefault();

      const newTask = document.createElement('div');
      newTask.id = new Date().getTime();
      newTask.classList.add('item');
      newTask.draggable = true;

      const buttonCloseTask = document.createElement('button');
      buttonCloseTask.type='button'
      buttonCloseTask.classList.add('button-close-task');

      const spanCloseTask = document.createElement('span');
      spanCloseTask.classList.add('span-close-task');

      buttonCloseTask.append(spanCloseTask);

      const buttonCorrectTask = document.createElement('button');
      buttonCorrectTask.type='button'
      buttonCorrectTask.classList.add('button-correct-task');

      const spanCorrectTask = document.createElement('span');
      spanCorrectTask.classList.add('span-correct-task');
      spanCorrectTask.textContent='...';

      buttonCorrectTask.append(spanCorrectTask);

      setTimeout(()=>newTask.append(buttonCloseTask,buttonCorrectTask),0);

      if(taskFormInput.value.trim()){
        newTask.textContent =taskFormInput.value;
      }else{
        alert('Заполните поле ввода');
        taskFormInput.value='';
        return
      }

      buttonCloseTask.addEventListener('click',(evt)=>{
        if (evt) {
          if(confirm('данная задача будет удалена! Продолжить?')) buttonCloseTask.parentElement.remove()
        }
      })

      buttonCorrectTask.addEventListener('click', (evt)=>{
        if(evt){
          // if(!correctText)  return
          newTask.innerText=prompt('введите изминения', newTask.textContent.slice(0, -3));
        }

        setTimeout(()=>newTask.append(buttonCloseTask,buttonCorrectTask),0);

      })

      placeholders[0].append(newTask)
      taskFormInput.value='';

      newTask.addEventListener("dragstart", dragStart);
      newTask.addEventListener("dragend", dragEnd);
    })

    for (let placeholder of placeholders) {
      placeholder.addEventListener( 'dragover',  dragOver) ;
      placeholder.addEventListener('drop', drop);
    }

    function dragOver(evt){
      if(evt.target.className ==='placeholder')  evt.preventDefault()
    }

    function dragStart(evt) {
      evt.dataTransfer.setData('id', evt.target.id);
      evt.target.classList.add("hold");
      setTimeout(() => evt.target.classList.add("hide"), 0);
    }

    function drop(evt) {
      let taskId = evt.dataTransfer.getData('id');
      if(evt.target.className === 'item') return
      evt.target.append(document.getElementById(taskId));
    }

    function dragEnd(evt) {
      evt.target.className = "item";
    }



  }

  deleteModuleForDragDrop(){
    this.wrapperForDragDrop.remove();
  }

}
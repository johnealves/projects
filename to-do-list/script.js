function onloadPge() {
  const numberOfTask = parseFloat(localStorage.getItem('numero de tarefas'));
  const list = document.querySelector('#lista-tarefas');
  for (let index = 0; index < numberOfTask; index += 1) {
    const mt = localStorage.getItem(`tarefas${index}`);
    const newli = document.createElement('li');
    newli.innerHTML = mt;
    newli.className = localStorage.getItem(`addClass${index}`);
    list.appendChild(newli);
  }
}
onloadPge();

function saveStorage() {
  const storage = [];
  const line = document.querySelectorAll('.item-list');
  for (let index = 0; index < line.length; index += 1) {
    localStorage.setItem(`tarefas${index}`, line[index].innerHTML);
    localStorage.setItem(`addClass${index}`, line[index].className);
  }
  localStorage.setItem('numero de tarefas', (line.length));
  localStorage.setItem('tarefas', (storage));
}

// function saveAll() {
//   const saveButton = document.querySelector('#salvar-tarefas');
//   saveButton.addEventListener('click', saveStorage);
// }
// saveAll();

function newTask() {
  const list = document.querySelector('#lista-tarefas');
  const mt = document.querySelector('#texto-tarefa');
  const newli = document.createElement('li');
  newli.className = 'item-list';
  newli.innerText = mt.value;
  list.appendChild(newli);
  mt.value = '';
  saveStorage()
}

function makeTask() {
  const button = document.getElementById('criar-tarefa');
  const inputText = document.getElementById('texto-tarefa');
  button.addEventListener('click', function() {
    if (inputText.value !== "") {
      newTask();
    } else {
      alert('Digite uma tarefa para adicionar.')
    }
  }); 
  inputText.addEventListener('keyup', function () {
    if (event.keyCode === 13) {
      newTask();
    }
  });
}
makeTask();

function backgroundItemlist() {
  const fullList = document.querySelector('#lista-tarefas');
  fullList.addEventListener('click', function (event) {
    const listOfItem = document.querySelectorAll('.item-list');
    if (event.target === fullList) {
      return;
    }
    for (let index = 0; index < listOfItem.length; index += 1) {
      listOfItem[index].classList.remove('selected');
      listOfItem[index].style.textDecoration = 'none';
    }
    event.target.style.textDecoration = 'underline';
    event.target.className += ' selected';
  });
  fullList.addEventListener('dblclick', function (event) {
    event.target.classList.toggle('completed');
  });
}
backgroundItemlist();

function erasedAll() {
  const eraserButton = document.getElementById('apaga-tudo');
  const listOfItem = document.querySelector('#lista-tarefas');
  const line = document.querySelectorAll('.item-list');
  eraserButton.addEventListener('click', function () {
  let itensSelected = 0;
    if (confirm('Você está prestes a excluir todas a tarefas, tem certeza que quer fazer isso?') === true) {
      for (let index = 0; index < line.length; index += 1) {
        listOfItem.removeChild(line[index]);
      }
      saveStorage()
    }
  });
}
erasedAll();

function buttonMoveTop() {
  const buttonTop = document.getElementById('mover-cima');
  buttonTop.addEventListener('click', function () {
    const ol = document.querySelector('#lista-tarefas');
    const listOfItem = document.querySelectorAll('.item-list');
    for (let index = 0; index < listOfItem.length; index += 1) {
      if (index !== 0) {
        if (listOfItem[index].classList.contains('selected')) {
          const aux = listOfItem[index - 1];
          ol.replaceChild(listOfItem[index], listOfItem[index - 1]);
          listOfItem[index].after(aux);
        }
      }
    }
    saveStorage()
    // randomBackgroundColor()
  });
}
buttonMoveTop();

function buttonMoveDown() {
  const buttonDown = document.getElementById('mover-baixo');
  buttonDown.addEventListener('click', function () {
    const ol = document.querySelector('#lista-tarefas');
    const listOfItem = document.querySelectorAll('.item-list');
    for (let index = 0; index < listOfItem.length; index += 1) {
      if (index !== (listOfItem.length - 1)) {
        if (listOfItem[index].classList.contains('selected')) {
          const aux = listOfItem[index + 1];
          ol.replaceChild(listOfItem[index], listOfItem[index + 1]);
          listOfItem[index].before(aux);
        }
      }
    }
    saveStorage()
    // randomBackgroundColor();
  });
}
buttonMoveDown();

function checkSelected() {
  const eraserButton = document.getElementById('remover-selecionado');
  eraserButton.addEventListener('click', function () {
    const line = document.querySelectorAll('.item-list');
    let itensSelected = 0;
    for (let index = 0; index < line.length; index += 1) {
      if (line[index].classList.contains('selected')) {
        itensSelected += 1;
      }
    }
    console.log(itensSelected)
    if (itensSelected > 0) {
      askConfirmRemove();
    } else {
      alert('Nenhum item selecionado')
    }
  })
}
checkSelected();

function askConfirmRemove() {
  if (confirm('Tem certeza que deseja remover o item selecionado') === true) {
    removeItemSelected()
  }
}

function removeItemSelected() {
  const listOfItem = document.querySelector('#lista-tarefas');
  const line = document.querySelectorAll('.item-list');
  for (let index = 0; index < line.length; index += 1) {
    if (line[index].classList.contains('selected')) {
      listOfItem.removeChild(line[index]);
    }
  }
  saveStorage();
}

function ramdonNumber(num) {
  return Math.floor(Math.random() * num)
}

function randomBackgroundColor() {
  document.body.style.backgroundColor = `rgb(${ramdonNumber(256)}, ${ramdonNumber(256)}, ${ramdonNumber(256)})`
}


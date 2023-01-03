const btnAdd = document.getElementById('btnAdd');
const btnDelete = document.getElementById('btnDelete');
const txtItem = document.getElementById('txtItem');
const txtFilter = document.getElementById('txtFilter');
const list = document.getElementById('list');

const key = "list";

document.addEventListener('DOMContentLoaded', onLoad);

function onLoad() {
    btnAdd.addEventListener('click', addTask);
    btnDelete.addEventListener('click', deleteList);
    list.addEventListener('click', onListClick);
    txtFilter.addEventListener('keyup', onKeyUp);

    readFromLocalStorage().forEach(x => {
        addItem(x.text, x.isDone);
    });

}

function addTask(e) {
    if (!txtItem.value || txtItem.value == '') {
        alert('You have to add an item!');
        return;
    } 

    addItem(txtItem.value);
    txtItem.value = '';
    writeInLocalStorage({ isDone: false, text: txtItem.value});  
    txtItem.focus(); 
}

function addItem(value, isDone = false) {
    let el = document.createElement('li');
    el.innerHTML = `<input type="checkbox" ${isDone ? "checked" : ""}><span>${value}</span><i>X</i>`;
    list.appendChild(el);
}

function deleteList(e) {
    if (!confirm('Are you sure?')) {
        return;
    }
    list.innerHTML = '';
    localStorage.clear();
}

function onListClick(e) {
    let tg = e.target,
        li = tg.closest('li');
    if (tg.nodeName == 'I') {
        if (!confirm('Are you sure you want to delete the item?')) {
            return;
        }
        let span = li.querySelector('span');
        deleteFromLocalStorage(span.textContent);
        li.remove();
    } else {
        const chk = li.querySelector('input[type="checkbox"]');
        chk.checked = !chk.checked;
        writeInLocalStorage({ isDone: chk.checked, text: chk.nextElementSibling.textContent });
    }
}



let time;
function onKeyUp(e) {
    clearTimeout(time);
    time = setTimeout(onFilter(e), 400);
}

function onFilter(e) {
    let filter = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(i => {
        const txt = i.children[1].textContent.toLowerCase();
        if (txt.indexOf(filter) > -1) {
            i.style.display = "flex";
        } else {
            i.style.display = "none";
        }
    });
}

function writeInLocalStorage(obj) {
    if (!obj)
        return;
    let items;
    if (localStorage.getItem(key) === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem(key));
    }
    let item = items.find(x => x.text == obj.text);
    if (item) {
        Object.assign(item, obj);
    } else {
        item.push(obj);
    }
    locatStorage.setItem(key, JSON.stringify(items));
}

function deleteFromLocalStorage(text) {
    let items;
    if (localStorage.getItem(key) === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem(key));
    }
    items = items.filter(x => x.text !== text);
    localStorage.setItem(key, JSON.stringify(items));
}

function readFromLocalStorage() {
    let items;
    let raw = localStorage.getItem(key);
    if (raw) {
        items = JSON.parse(raw);
    } else {
        items = [];
    }
    return items;
}

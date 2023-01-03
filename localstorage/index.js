// localStorage.setItem() -save values
// localStorage.getItem() -read values
// localStorage.removeItem() -delete values

const txtKey = document.getElementById('txtKey');
const txtValue = document.getElementById('txtValue');
const btn = document.getElementById('btn');
const list = document.getElementById('list');

showLocalStorage();

btn.addEventListener('click', (e) => {
    let key = txtKey.value;
    let value = txtValue.value;
    localStorage.setItem(key, value);
    showLocalStorage();
});

// localStorage.getItem('name);
// localStorage.key(1);

function showLocalStorage() {
    let cnt = localStorage.length;
    let c;
    list.innerHTML = ``;
    if (cnt == 0) {
        const li = document.createElement('li');
        li.textContent = 'Empty list...';
        list.appendChild(li);
        return;
    }

    let html = ``;

    for (let i = 0; i < cnt; i++) {
        c = localStorage.key(i);
        // console.log(c, localStorage.getItem(c));
        html += `<li k="${c}">${c}: ${localStorage.getItem(c)} <button>Delete</button> </li>`;
    }
    list.innerHTML = html;
}

// localStorage.clear() - delete all the items

list.addEventListener('click', (e)=>{
    if(e.target.nodeName != "BUTTON") return;
    let parent = e.target.closest('li');
    let k = parent.getAttribute('k');
    localStorage.removeItem(k);
    parent.remove();
    if(localStorage.length == 0){
        showLocalStorage();
    }
});
const table = document.getElementById("list_body");

fetch("/getToDos", {})
  .then(res => res.json())
  .then(response => {
    response.forEach(row => {
      fillList([row.id, row.title, row.date]);
    });
  });

  var ToDos = [];

const fillList = ToDos => {

  if(ToDos.length != 0) {
    var row = table.insertRow();

    var id = row.insertCell(0);
    var title = row.insertCell(1);
    var date = row.insertCell(2);
    var actions = row.insertCell(3);

    id.innerHTML = table.rows.length;
    title.innerHTML = ToDos[1];
    date.innerHTML = ToDos[2];

    // Edit Button
    let editButton = document.createElement("a");
    editButton.className = "btn-primary btn btn-xs";
    editButton.setAttribute('href', '/show/' + ToDos[0]);
  
    editButton.appendChild(document.createTextNode("Edit"));
    actions.appendChild(editButton);

    // Delete Button
    let deleteButton = document.createElement("a");
    deleteButton.className = "btn-danger btn btn-xs";
    deleteButton.setAttribute('href', '/deleteToDo/' + ToDos[0]);
  
    deleteButton.appendChild(document.createTextNode("Delete"));
    actions.appendChild(deleteButton);
    
  }
}

fillList(ToDos);

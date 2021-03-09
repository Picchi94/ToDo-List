var id = id;
var title = document.getElementById("title");
var description = document.getElementById("description");
var status = document.getElementById("status");


fetch("/getToDo/" + id, {})
  .then(res => res.json())
  .then(response => {
    response.forEach(row => {
      setValues(row);
    });
  });

const setValues = ToDos => {
  $('#title').val(ToDos.title);
  $('#description').val(ToDos.description);
  $('#status').val(ToDos.status);
  $('#date').val(ToDos.date);
}

var form = document.getElementsByTagName("form")[0];

form.setAttribute('action', '/updateToDo/' + id);

$(document).ready(function() {
  let todos = [];
  let input = $('#todoInput');

  // retrive or create local storage
  if (localStorage.getItem('todos')) {
    todos = JSON.parse(localStorage.getItem('todos'));
  } else {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  //add the todos form the local storage to the html
  for (const todo of todos) {
    $('ul').append(`<li>${todo}<span><i class="fa fa-trash"></i></span> </li>`);
  }

  //add todo from the input field if the input field not empty
  //and not already exis in the todo list
  input.keypress(function(event) {
    //event 13 = enter key
    if (event.which == 13) {
      if (input.val().trim() === '') {
        $('ul').after(
          ` <div class="alert alert-warning alert-dismissible fade show"> 
              <button type="button" class="close" data-dismiss="alert">&times;</button>
              <strong>Warning! <br></strong>Cannot add empty todo.
            </div>
          `
        );

        $('.alert').fadeOut(3000);
      } else if (todos.indexOf(input.val().trim()) >= 0) {
        $('ul').after(
          ` <div class="alert alert-warning alert-dismissible fade show">
              <button type="button" class="close" data-dismiss="alert">&times;</button>
              <strong>Warning! <br></strong>"${input.val()}" already exist.
            </div>
          `
        );

        $('.alert').fadeOut(3000);
        input.val('');
      } else {
        $('ul')
          .append(`<li>${input.val().trim()}<span><i class="fa fa-trash"></i></span> </li>`)
          .find('li:last')
          .addClass('');
        todos.push(input.val());
        localStorage.setItem('todos', JSON.stringify(todos));
        input.val('');
      }
    }
  });

  //mark as done
  $('ul').on('click', 'li', function() {
    $(this).toggleClass('done');
  });

  // trash bbutton to remove a todo
  $('ul').on('click', 'span', function(event) {
    $(this)
      .parent()
      .fadeOut(400, function() {
        todos = todos.filter(
          todo =>
            todo !==
            $(this)
              .text()
              .trim()
        );
        localStorage.setItem('todos', JSON.stringify(todos));
        $(this).remove();
      });
    event.stopPropagation();
  });

  //search in the todo list
  $('#todoSearch').on('keyup', function() {
    var value = $(this)
      .val()
      .toLowerCase()
      .trim();
    $('ul li').filter(function() {
      $(this).toggle(
        $(this)
          .text()
          .toLowerCase()
          .indexOf(value) > -1
      );
    });
  });
});

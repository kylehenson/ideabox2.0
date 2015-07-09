$(document).ready(function() {
  fetchIdeas();
  createIdea();
})

function fetchIdeas() {
  $.getJSON('/ideas').then(function (ideas) {
    var renderedIdeas = ideas.map(renderIdea);
    renderedIdeas.forEach(deleteIdea);
    renderedIdeas.forEach(editIdea);
    renderedIdeas.forEach(updateIdea);
    $('#ideas').html(renderedIdeas);
    $('.thumbs_Up').on('click', thumbsUpIdea);
    $('.thumbs_Down').on('click', thumbsDownIdea);
  });
};

function renderIdea(idea) {
  return $('<div class="idea" data-id="' + idea.id + '">' +
      '<h4>' + idea.title + '</h4>' +
      '<h5>' + idea.body + '</h5>' +
      '<p>' + idea.quality + '</p>' +
      '<div class="buttons">' +
        '<button class="edit">Edit</button>' +
        '<button class="delete">Delete</button>' +
        '<button class="thumbsUp">Thumbs Up</button>' +
        '<button class="thumbsDown">Thumbs Down</button>' +
        '<form class="edit-idea-form">' +
          '<label>Title</label>' +
          '<input type="text" placeholder="Title" class="idea-title">' +
          '<label>Body</label>' +
          '<input type="text" placeholder="Body" class="idea-body">' +
          '<input type="submit" class="update" value="Update Idea">' +
        '</form>' +
      '</div>' +
    '</div>');
}

function createIdea() {
  var $title = $('div').find('#title');
  var $body = $('div').find('#body');

  var $submit = $('input[type="submit"]');
  $submit.on('click', function (event) {
    event.preventDefault();
    $.post('/ideas', {
      title: $title.val(),
      body: $body.val()
    }).then(appendIdea);
  });
}

function appendIdea(data) {
  var ideaToAdd = renderIdea(data);
  deleteIdea(ideaToAdd);
  editIdea(ideaToAdd);
  updateIdea(ideaToAdd);
  $(ideaToAdd).appendTo('#ideas');
}

function deleteIdea(idea) {
  $(idea).find('.delete').on('click',function () {
    var $idea = $(this).parents('.idea');
    var id = $idea.data('id');
    $.ajax('/ideas/' + id, { method: 'delete'} ).then(function () {
      idea.remove();
    });
  });
}

function editIdea(idea) {
  $(idea).find('.edit').on('click', function () {
    var $idea = $(this).parents('.idea')
    var $form = $(this).siblings('.edit-idea-form');

    if ($form.is(':hidden')) {
      var title = $idea.find('h4').text();
      var body = $idea.find('h5').text();
      $form.find('.idea-title').val(title);
      $form.find('.idea-body').val(body);
    }
    $form.toggle()
  });
}

function updateIdea(idea) {
  $(idea).find('.update').on('click', function (event) {
    event.preventDefault();

    var $idea = $(this).parents('.idea');
    var id = $idea.data('id');
    var $title = $(this).siblings('.idea-title').val();
    var $body = $(this).siblings('.idea-body').val();

    $.ajax('/ideas/' + id, {
      method: 'put',
      data: {
        title: $title,
        body: $body
      }
    }).then(function (idea) {
      $idea.find('h4').text(idea.title);
      $idea.find('h5').text(idea.body);
      $idea.find('form').hide();
    });
  });
}

function thumbsUpIdea() {
  $(idea).find('.thumbsUp').on('click', function (event) {
    event.preventDefault();

    // var $idea = $(this).parents('.idea');
    // var id = $idea.data('id');
    // var $title = $(this).siblings('.idea-title').val();
    // var $body = $(this).siblings('.idea-body').val();
    //
    // $.ajax('/ideas/' + id, {
    //   method: 'put',
    //   data: {
    //     title: $title,
    //     body: $body
    //   }
    // }).then(function (idea) {
    //   $idea.find('h4').text(idea.title);
    //   $idea.find('h5').text(idea.body);
    //   $idea.find('form').hide();
    // });
  // });

}

function thumbsDownIdea() {
  var $idea = $(this).parents('.idea');
  var id = $idea.data('id');
}

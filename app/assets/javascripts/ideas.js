$(document).ready(function() {
  fetchIdeas();
  createIdea();
})

function fetchIdeas() {
  $.ajax({
    type: 'GET',
    url: '/ideas',
    success: function(ideas) {
      for(var i = 0; i < ideas.length; i++) {
        $("#ideas-list").append(
          '<div class="idea">' +
            '<h4>' + ideas[i].title + '</h4>' +
            '<h5>' + ideas[i].body + '</h5>' +
            '<p>' + ideas[i].quality + '</p>' +
            '<button class="edit">Edit</button>' +
            '<button class="delete">Delete</button>' +
          '</div>');
      }
    }
  })
};

function createIdea() {
  $("#create_button").on('click', function() {
    var ideaParams = { idea: { title: $("#title").val(), body: $("#body").val() } }
    $.ajax({
      type: 'POST',
      url: '/ideas.json',
      data: ideaParams,
      success: function(newIdea) {
        renderIdea(newIdea)
      }
    })
  });
}

function renderIdea(idea) {
  $("#ideas-list").append(
    '<div class="idea">' +
      '<h4>' + idea.title + '</h4>' +
      '<h5>' + idea.body + '</h5>' +
      '<p>' + idea.quality + '</p>' +
      '<button class="edit">Edit</button>' +
      '<button class="delete">Delete</button>' +
    '</div>'
  )
}

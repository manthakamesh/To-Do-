

var $searchesList = $('#searches-list');
var $todo-form = $('#todo-form');
var searches = window.localStorage.getItem('searches');

function buildSearchesList(searches, $searchesList, $todo-form) {
   for (var i = 0; i < searches.length; i++) {
      var params = JSON.parse('{"' +
         decodeURIComponent(
            searches[i]
               .replace(/&/g, '","')
               .replace(/=/g, '":"')
               .replace(/\+/g, ' ')
         ) +
         '"}'
      );
     var text = '<dl>';
      for (var key in params) {
         text += '<dt>' + key + ':</dt><dd> ' + params[key] + '</dd>';
      }
      text += '</dl>';
      (function(searchData) {
         $searchesList.append(
            $('<li tabindex="0">')
               .text(params['search'])
               .on('click keypress', function(event) {
                  if (
                     event.type !== 'keypress' ||
                     event.keyCode === 13 ||
                     event.keyCode === 32
                  ) {
                     $todo-form
                        .trigger('reset')
                        .deserialize(searchData);
                  }
               })
               .append(text)
         );
      })(searches[i]);
   }
}

searches = (searches === null) ? [] : JSON.parse(searches);
buildSearchesList(searches, $searchesList, $todo-form);

$todo-form.submit(function(event) {
   event.preventDefault();
  var currentSearch = $(this).serialize();
   searches.unshift(currentSearch);
  
   for(var i = 1; i < searches.length; i++) {
      if (searches[0] === searches[i]) {
         searches.splice(i, 1);
      }
   }
   if (i === searches.length && searches.length > 10) {
      searches.pop();
   }

   window.localStorage.setItem('searches', JSON.stringify(searches));

   
});



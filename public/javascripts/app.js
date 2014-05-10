(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("scripts/album", function(exports, require, module) {

// Example Album 1
var albumPicasso = {
  name: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: '/images/album-placeholder.png',

  songs: [
      { name: 'Blue', length: '4:26' },
      { name: 'Green', length: '3:14' },
      { name: 'Red', length: '5:01' },
      { name: 'Pink', length: '3:21'},
      { name: 'Magenta', length: '2:15'}
    ]
};

// Example Album 2
var albumMarconi = {
  name: 'The Telephone',
  artist: 'Guglielmo Marconi',
  label: 'EM',
  year: '1909',
  albumArtUrl: '/images/album-placeholder2.png',

  songs: [
      { name: 'Hello, Operator?', length: '1:01' },
      { name: 'Ring, ring, ring', length: '5:01' },
      { name: 'Fits in your pocket', length: '3:21'},
      { name: 'Can you hear me now?', length: '3:14' },
      { name: 'Wrong phone number', length: '2:15'}
    ]
};

//Create song rows
var createSongRow = function(songNumber, songName, songLength) {

  var $newSongRow = $('<tr>');

  $newSongRow.append('<td class="col-md-1">' + songNumber + '<a href="#" class="hidden glyphicon"></a></td>');
  $newSongRow.append('<td class="col-md-9">' + songName + '</td>');
  $newSongRow.append('<td class="col-md-2">' + songLength + '</td>');

  return $newSongRow;
};

// Helper function to change album view
var changeAlbumView = function(album) {

  var $albumTitle = $('.album-title');
  $albumTitle.text(album.name);

  var $albumArtist = $('.album-artist');
  $albumArtist.text(album.artist);

  var $albumMeta = $('.album-meta-info');
  $albumMeta.text(album.year + " on " + album.label);

  var $albumImage = $('.album-image img');
  $albumImage.attr('src', album.albumArtUrl);

  // Update the Song List
  var $songList = $(".album-song-listing");
  $songList.empty();
  var songs = album.songs;
  for (var i = 0; i < songs.length; i++) {
    var songData = songs[i];
    var $newRow = createSongRow(i, songData.name, songData.length);
    $songList.append($newRow);
  }

};

var playSong = function() {
  // body...
}


if (document.URL.match(/\/album/)) {

  $(document).ready(function() {

    var albums = [albumPicasso, albumMarconi];
    changeAlbumView(albumPicasso);

    var albumIndex = 0;
    var $albumImage = $('.album-image img');

    $albumImage.click(function(event) {
     
      albumIndex = (albumIndex + 1) % albums.length;
      changeAlbumView(albums[albumIndex]);

    });

    // event delegation (.album-song-listing)
    var $songHovered = $('.album-song-listing');
    $songHovered.on('hover', 'tr', function(){
      $(this).find('td:first').append('<a href="#" class="play-button glphicon glyphicon-play"></a>');
    }, function(){
      //hover off
    });

  });
}

});

;require.register("scripts/album_collection", function(exports, require, module) {

if (document.URL.match(/\/collection/)) {
  // Wait until the HTML is fully processed.
  $(document).ready(function() {
  });
}

});

;require.register("scripts/app", function(exports, require, module) {
require('./album');
require('./album_collection');
require('./user_profile');
require('./practice');
require('./controllers');
require('./models');
require('./services');

// Top level application module for our website.
angular.module('BlocJams', [
  'Models',
  'Controllers'
]).config(function ($compileProvider) {
  // Prevent angular from marking links with a variety of protocols "unsafe"
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|webcal|mailto|file|tel):/);
});


});

;require.register("scripts/controllers/album_collection_controller", function(exports, require, module) {

});

;require.register("scripts/controllers/album_controller", function(exports, require, module) {

// Example Album 1
var albumPicasso = {
  name: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: '/images/album-placeholder.png',

  songs: [
      { name: 'Blue', length: '4:26' },
      { name: 'Green', length: '3:14' },
      { name: 'Red', length: '5:01' },
      { name: 'Pink', length: '3:21'},
      { name: 'Magenta', length: '2:15'}
    ]
};

// Example Album 2
var albumMarconi = {
  name: 'The Telephone',
  artist: 'Guglielmo Marconi',
  label: 'EM',
  year: '1909',
  albumArtUrl: '/images/album-placeholder2.png',

  songs: [
      { name: 'Hello, Operator?', length: '1:01' },
      { name: 'Ring, ring, ring', length: '5:01' },
      { name: 'Fits in your pocket', length: '3:21'},
      { name: 'Can you hear me now?', length: '3:14' },
      { name: 'Wrong phone number', length: '2:15'}
    ]
};

angular.module("Controllers").controller('Album.controller', ['$scope', function($scope) {
}]);


});

;require.register("scripts/controllers/index", function(exports, require, module) {

angular.module('Controllers', []);
require("./album_controller");
require("./album_collection_controller");
require("./user_controller");

});

;require.register("scripts/controllers/user_controller", function(exports, require, module) {

});

;require.register("scripts/models/album", function(exports, require, module) {

angular.module('Models').factory('Album', function() {
});

});

;require.register("scripts/models/index", function(exports, require, module) {

angular.module('Models', []);
require('./album');
require('./user');

});

;require.register("scripts/models/user", function(exports, require, module) {


});

;require.register("scripts/practice", function(exports, require, module) {

});

;require.register("scripts/services/current_user", function(exports, require, module) {


});

;require.register("scripts/services/index", function(exports, require, module) {

angular.module('Services', []);
require('./current_user')

});

;require.register("scripts/user_profile", function(exports, require, module) {

if (document.URL.match(/\/user/)) {
  $(document).ready(function() {
  });
}

});

;
//# sourceMappingURL=app.js.map
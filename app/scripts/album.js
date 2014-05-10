
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

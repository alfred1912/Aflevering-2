// Funktion der henter JSON-data og lave det til JavaScript-objekter
fetch('albums.json')
    .then(function(response) {
        
        return response.json();
    })
    .then(function(data) {
        // Kald funktion til at vise albummer, når dataene er hentet
        displayAlbums(data);
    })
    .catch(function(error) {
        // Viser en fejlmeddelelse i konsol, hvis der sker en fejl ved indlæsning af JSON-filen
        console.error('Fejl ved indlæsning af JSON:', error);
    });

// Funktion til at vise albummerne på siden
function displayAlbums(albums) {
    // Finder HTML-elementet, hvor albummerne skal vises
    const container = document.getElementById('album-container');

    // Gennemgår hvert album i albums-listen
    albums.forEach(function(album) {
        // Opretter et nyt div-element der indeholder albumoplysningerne
        const albumDiv = document.createElement('div');
        albumDiv.className = 'album';

        // Indsætter albuminformation som navn, kunstner, år og en knap til tracklisten
        const albumInfo = 
            '<h2>' + album.albumName + '</h2>' +
            '<p>Artist: <a href="' + album.artistWebsite + '" target="_blank">' + album.artistName + '</a></p>' +
            '<p>Udgivelsesår: ' + album.productionYear + '</p>' +
            '<button>Vis/Skjul Trackliste</button>' +
            // Tracklisten er skjult som udgangspunkt (display: none)
            '<ul class="track-list" id="track-list-' + album.id + '" style="display: none;">' +
                album.trackList.map(function(track) {
                    // Viser hvert track med nummer, titel og tid i sekunder
                    return '<li>' + track.trackNumber + '. ' + track.trackTitle + ' (' + track.trackTimeInSeconds + ' sek)</li>';
                }).join('') +
            '</ul>';

        
        albumDiv.innerHTML = albumInfo;

        // Tilføjer en knap for at vise/skjule tracklisten
        const button = albumDiv.querySelector('button');
        button.addEventListener('click', function() {
            toggleTrackList(album.id); 
        });

        
        container.appendChild(albumDiv);
    });
}

// Funktion til at vise/skjule tracklisten for et bestemt album
function toggleTrackList(id) {
    // Finder det specifikke trackliste-element ved hjælp af albummets ID
    const trackListElement = document.getElementById('track-list-' + id);
    
    // Skifter mellem at vise og skjule tracklisten
    if (trackListElement.style.display === 'none') {
        trackListElement.style.display = 'block'; // Viser tracklisten
    } else {
        trackListElement.style.display = 'none'; // Skjuler tracklisten
    }
}

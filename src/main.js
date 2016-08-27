import _ from 'underscore';
import {Events} from 'backbone';
import SearchCollection from './collections/SearchCollection';
import TopTracksCollection from './collections/TopTracksCollection';
import RelatedArtistsCollection from './collections/RelatedArtistsCollection';
import ArtistForm from './views/ArtistForm';
import ArtistsSearch from './views/ArtistsSearch';
import ArtistView from './views/Artist';
import Artist from './models/Artist';
import TopTracks from "./views/TopTracks";
import RelatedArtists from "./views/RelatedArtists";

(function ()
{
    let setGlobalVariables = function ()
    {
        window.App = {};
        App.events = _.clone(Events);
    };

    /**
     * Run after dom is ready
     */
    let init = function ()
    {
        setGlobalVariables();

        let searchCollection = new SearchCollection();
        let topTracksCollection = new TopTracksCollection();
        let relatedArtistsCollection = new RelatedArtistsCollection();
        let artist = new Artist();

        new ArtistForm({el: "#search"});
        new ArtistsSearch({el: "#search-results", collection: searchCollection});
        new ArtistView({el: "#artist-info", model: artist});
        new TopTracks({el: "#top-tracks", collection: topTracksCollection});
        new RelatedArtists({el: "#related-artists", collection: relatedArtistsCollection});


        Backbone.history.start({pushState: true, root: '/spotifinder/'});
    };

    window.addEventListener('load', init);
})();

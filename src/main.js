import _ from 'underscore';
import {Events} from 'backbone';
import SearchCollection from './collections/SearchCollection';
import ArtistCollection from './collections/ArtistCollection';
import ArtistForm from './views/ArtistForm';
import ArtistsSearch from './views/ArtistsSearch';
import ArtistView from './views/Artist'

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
        let artistCollection = new ArtistCollection();

        new ArtistForm({el: "#search"});
        new ArtistsSearch({el: "#search-results", collection: searchCollection});
        new ArtistView({el: "#artist", collection: artistCollection});

        Backbone.history.start({pushState: true, root: '/spotifinder/'});
    };

    window.addEventListener('load', init);
})();

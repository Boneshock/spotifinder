import _ from 'underscore';
import {Events} from 'backbone';
import SearchCollection from './collections/SearchCollection';
import ArtistForm from './views/ArtistForm';
import ArtistsSearch from './views/ArtistsSearch';
import ArtistView from './views/Artist';
import Artist from './models/Artist';

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
        let artist = new Artist();

        new ArtistForm({el: "#search"});
        new ArtistsSearch({el: "#search-results", collection: searchCollection});
        new ArtistView({el: "#artist", model: artist});

        Backbone.history.start({pushState: true, root: '/spotifinder/'});
    };

    window.addEventListener('load', init);
})();

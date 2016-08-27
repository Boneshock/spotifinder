import {Router} from 'backbone';

/**
 * Router for the matches URL's
 *
 * @constructor
 */
const ArtistsSearchRouter = Router.extend({
    routes: {
        'search/:type/:query': 'searchAction',
        'artist/:id': 'artistAction'
    },

    /**
     * Route callback, used to trigger global event
     *
     * @param type
     * @param query
     */
    searchAction: function (type, query)
    {
        App.events.trigger('newSearch', {
            type: type,
            query: query
        });
    },

    artistAction: function(id){
        App.events.trigger('getArtist', {
            id: id
        });
    }
});

export default ArtistsSearchRouter;

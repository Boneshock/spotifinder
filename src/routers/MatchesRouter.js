import {Router} from 'backbone';

/**
 * Router for the matches URL's
 *
 * @constructor
 */
const MatchesRouter = Router.extend({
    routes: {
        'search/:type/:query': 'clubAction'
    },

    /**
     * Route callback, used to trigger global event
     *
     * @param type
     * @param query
     */
    clubAction: function (type, query)
    {
        App.events.trigger('newClub', {
            type: type,
            query: query
        });
    }
});

export default MatchesRouter;

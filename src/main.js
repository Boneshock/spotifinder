import _ from 'underscore';
import {Events} from 'backbone';
import Matches from './collections/Matches';
import TeamLinks from './views/TeamLinks';
import TeamMatches from './views/TeamMatches';

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

        let matchesCollection = new Matches();
        new TeamLinks({el: "#team-links"});
        new TeamMatches({el: "#team-matches", collection: matchesCollection});

        Backbone.history.start({pushState: true, root: '/spotifinder/'});
    };

    window.addEventListener('load', init);
})();

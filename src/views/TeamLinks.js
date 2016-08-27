import {View} from 'backbone';
import MatchesRouter from '../routers/MatchesRouter';

/**
 * Object representing the TeamLinks element
 *
 * @constructor
 */
const TeamLinks = View.extend({
    router: null,

    events: {
        'click a': 'clickHandler',
        'submit form': 'submitHandler'
    },

    initialize: function ()
    {
        //Initialize the matches router to activate navigation
        this.router = new MatchesRouter();
    },

    /**
     * Click handler for links, retrieve data attributes and navigate router
     *
     * @param e
     */
    clickHandler: function (e)
    {
        e.preventDefault();

        //Get target the retrieve data properties
        let target = e.currentTarget;
        let url = 'search/' + target.dataset['type'] + '/' + target.dataset['query'];

        //Use trigger & replace to update URL and make the router listen to change
        this.router.navigate(url, {trigger: true, replace: true});
    },
    submitHandler: function(e) {
        e.preventDefault();
        console.log("form was submitted");
    }
});

export default TeamLinks;

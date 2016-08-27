import {View} from 'backbone';
import _ from 'underscore';
import ArtistsSearchRouter from '../routers/ArtistsSearchRouter';
import $ from 'jquery';

/**
 * Object representing the ArtistForm element
 *
 * @constructor
 */
const ArtistForm = View.extend({
    router: null,

    events: {
        'click a': 'clickHandler',
        'change input#query': 'submitHandler',
        'submit form': 'submitHandler',
        'keyup input#query': 'submitHandler'
    },

    initialize: function ()
    {
        _.bindAll(this, "submitHandler");

        //Initialize the search router to activate navigation
        this.router = new ArtistsSearchRouter();
    },

    /**
     * Click handler for links, retrieve data attributes and navigate router
     *
     * @param e
     */
    clickHandler: function (e)
    {
        e.preventDefault();

        //Get target to retrieve data properties
        let target = e.currentTarget;
        let url = 'search/' + target.dataset['type'] + '/' + target.dataset['query'];

        //Use trigger & replace to update URL and make the router listen to change
        this.router.navigate(url, {trigger: true, replace: true});
    },

    submitHandler: function(e) {
        e.preventDefault();

        //Get result element and show it
        let resultshtml = $('#search-results');
        resultshtml.show();

        let queryValue = document.getElementById("query").value;
        let url = 'search/' + 'artist' + '/' + queryValue;

        //Use trigger & replace to update URL and make the router listen to change
        this.router.navigate(url, {trigger: true, replace: true});
    }
});

export default ArtistForm;

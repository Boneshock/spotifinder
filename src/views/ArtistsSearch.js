import {View} from 'backbone';
import _ from 'underscore';
import ArtistsSearchRouter from '../routers/ArtistsSearchRouter';

/**
 * Object representing the ArtistForm element
 *
 * @constructor
 */
const ArtistsSearch = View.extend({
    templateMatches: '',
    templateError: '',
    router: null,

    events: {
        'click div.artist': 'artistClickHandler',
    },

    initialize: function ()
    {
        //Set templates to use later on
        this.templateMatches = _.template(this.$('#template-matches').html());
        this.templateError = _.template(this.$('#template-error').html());

        //Listen to global events for change of new club
        App.events.on('newSearch', this.loadSearchResults, this);

        //Initialize the search router to activate navigation
        this.router = new ArtistsSearchRouter();
    },

    /**
     * Wrapper function to load the searches through the collection
     *
     * @param data
     */
    loadSearchResults: function (data)
    {
        this.collection.fetch({
            success: (collection) => this.loadSearchSuccessHandler(collection),
            error: (collection, response) => this.loadSearchErrorHandler(collection, response),
            data: {
                type: data.type,
                q: data.query
            }
        });
    },

    /**
     * Success Handler will add HTML of searches to this $el
     *
     * @param collection
     */
    loadSearchSuccessHandler: function (collection)
    {
        let data = Object.create(collection.toJSON());
        let artists = data[0].artists.items;
        this.$el.html(this.templateMatches({artists: artists}));
    },

    /**
     * On error, show error message in this $el
     *
     * @param collection
     * @param response
     */
    loadSearchErrorHandler: function (collection, response)
    {
        this.$el.html(this.templateError({message: response.responseJSON.error}));
    },

    artistClickHandler: function(e) {
        e.preventDefault();

        //Get target the retrieve data properties
        let target = e.currentTarget;
        let url = 'artist/' + target.dataset['id'];

        //Use trigger & replace to update URL and make the router listen to change
        this.router.navigate(url, {trigger: true, replace: true});
    }
});

export default ArtistsSearch;

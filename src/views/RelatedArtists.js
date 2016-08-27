import {View} from 'backbone';
import _ from 'underscore';
import ArtistsSearchRouter from '../routers/ArtistsSearchRouter';

/**
 * Object representing the ArtistForm element
 *
 * @constructor
 */
const TopTracks = View.extend({
    templateTopTracks: '',
    router: null,

    events: {
        'click .artist': 'clickHandler',
    },

    initialize: function ()
    {
        //Set templates to use later on
        this.templateTopTracks = _.template(this.$('#template-related').html());

        //Listen to global events for change of new club
        App.events.on('getArtist', this.loadSearchResults, this);

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
            success: (collection) => this.loadRelatedArtistsSuccessHandler(collection),
            error: (collection, response) => this.loadRelatedArtistsErrorHandler(collection, response),
            url: this.collection.url + data.id + '/related-artists'
        });
    },

    /**
     * Success Handler will add HTML of Related Artist Search to this $el
     *
     * @param collection
     */
    loadRelatedArtistsSuccessHandler: function (collection)
    {
        let data = Object.create(collection.toJSON());
        let artists = data[0].artists;
        this.$el.html(this.templateTopTracks({artists: artists}));
    },

    /**
     * On error, show error message in this $el
     *
     * @param collection
     * @param response
     */
    loadRelatedArtistsErrorHandler: function (collection, response)
    {
        this.$el.html(this.templateError({message: response.responseJSON.error}));
    },


    /**
     * Click handler for related-artists, retrieve data attributes and navigate router
     *
     * @param e
     */
    clickHandler: function (e)
    {
        e.preventDefault();

        //Get target the retrieve data properties
        let target = e.currentTarget;
        let url = 'artist/' + target.dataset['id'];

        //Use trigger & replace to update URL and make the router listen to change
        this.router.navigate(url, {trigger: true, replace: true});
    },
});

export default TopTracks;

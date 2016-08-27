import {View} from 'backbone';
import _ from 'underscore';
import ArtistsSearchRouter from '../routers/ArtistsSearchRouter';

/**
 * Object representing the ArtistForm element
 *
 * @constructor
 */
const Artist = View.extend({
    templateMatches: '',
    templateError: '',
    router: null,

    initialize: function ()
    {
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
        console.log("ARTIST!!!");
        this.collection.fetch({
            success: (collection) => this.loadSearchSuccessHandler(collection),
            error: (collection, response) => this.loadSearchErrorHandler(collection, response),
            url: this.collection.url + data.id
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
    }
});

export default Artist;

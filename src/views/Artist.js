import {View} from 'backbone';
import _ from 'underscore';
import ArtistsSearchRouter from '../routers/ArtistsSearchRouter';

/**
 * Object representing the ArtistForm element
 *
 * @constructor
 */
const Artist = View.extend({
    templateArtist: '',
    router: null,

    initialize: function ()
    {
        //Set templates to use later on
        this.templateArtist = _.template(this.$('#template-artist').html());

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
        this.model.fetch({
            success: (model) => this.loadSearchSuccessHandler(model),
            error: (collection, response) => this.loadSearchErrorHandler(collection, response),
            url: this.model.url + data.id
        });
    },

    /**
     * Success Handler will add HTML of searches to this $el
     *
     * @param model
     */
    loadSearchSuccessHandler: function (model)
    {
        let artist = Object.create(model.toJSON());
        this.$el.html(this.templateArtist({artist: artist}));
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

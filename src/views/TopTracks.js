import {View} from 'backbone';
import _ from 'underscore';
import ArtistsSearchRouter from '../routers/ArtistsSearchRouter';
import $ from 'jquery';

/**
 * Object representing the ArtistForm element
 *
 * @constructor
 */
const TopTracks = View.extend({
    templateTopTracks: '',
    router: null,
    audio: {},

    events: {
        'click .track': 'clickHandler',
    },

    initialize: function ()
    {
        this.audio = new Audio();

        //Set templates to use later on
        this.templateTopTracks = _.template(this.$('#template-top-tracks').html());

        //Listen to global events for change of new club
        App.events.on('getArtist', this.loadSearchResults, this);

        //Initialize the search router to activate navigation
        this.router = new ArtistsSearchRouter();
    },

    /**
     * Wrapper function to load the Top Tracks through the collection
     *
     * @param data
     */
    loadSearchResults: function (data)
    {
        this.collection.fetch({
            success: (collection) => this.loadTopTracksSuccessHandler(collection),
            error: (collection, response) => this.loadTopTracksErrorHandler(collection, response),
            url: this.collection.url + data.id + '/top-tracks?country=NL'
        });
    },

    /**
     * Success Handler will add HTML of Top Tracks Searches to this $el
     *
     * @param collection
     */
    loadTopTracksSuccessHandler: function (collection)
    {
        let data = Object.create(collection.toJSON());
        let tracks = data[0].tracks;
        this.$el.html(this.templateTopTracks({tracks: tracks}));
    },

    /**
     * On error, show error message in this $el
     *
     * @param collection
     * @param response
     */
    loadTopTracksErrorHandler: function (collection, response)
    {
        this.$el.html(this.templateError({message: response.responseJSON.error}));
    },


    /**
     * Click handler for tracks, play/pause audio object and apply/remove class
     *
     * @param e
     */
    clickHandler: function (e)
    {
        e.preventDefault();
        let audio = this.audio;
        audio.pause();

        //Get target to retrieve data properties
        let target = e.currentTarget;

        //Get all top-tracks in list and remove "playing" class
        let children = document.querySelectorAll('#top-tracks .track');
        $.each(children, function(index, element){
            $(element).removeClass("playing");
        });

        //Check if audio is the same
        if (audio.src == target.dataset['preview']){
            audio.src = "";
        } else {
            audio.currentTime = 0;
            audio.setAttribute('src', target.dataset['preview']);
            audio.play();
            $(target).addClass("playing"); //add class to indicate playing status
        }
    },
});

export default TopTracks;

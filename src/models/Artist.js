import {Model} from 'backbone';

/**
 * Model for every match in the collection
 *
 * @constructor
 */
const Artist = Model.extend({
    url: 'https://api.spotify.com/v1/artists/'
});

export default Artist;

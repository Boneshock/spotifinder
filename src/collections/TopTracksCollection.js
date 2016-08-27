import {Collection} from 'backbone';
import Track from '../models/Track';

/**
 * Collection for the matches endpoint
 *
 * @constructor
 */
const TopTracksCollection = Collection.extend({
    model: Track,
    url: 'https://api.spotify.com/v1/artists/'
});

export default TopTracksCollection;

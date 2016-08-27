import {Collection} from 'backbone';
import Artist from '../models/Artist';

/**
 * Collection for the matches endpoint
 *
 * @constructor
 */
const ArtistCollection = Collection.extend({
    model: Artist,
    url: 'https://api.spotify.com/v1/artists/'
});

export default ArtistCollection;

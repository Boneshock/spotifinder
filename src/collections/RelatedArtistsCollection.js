import {Collection} from 'backbone';
import Artist from '../models/Artist';

/**
 * Collection for the matches endpoint
 *
 * @constructor
 */
const RelatedArtistsCollection = Collection.extend({
    model: Artist,
    url: 'https://api.spotify.com/v1/artists/'
});

export default RelatedArtistsCollection;

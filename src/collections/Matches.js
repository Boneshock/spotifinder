import {Collection} from 'backbone';
import Match from '../models/Match';

/**
 * Collection for the matches endpoint
 *
 * @constructor
 */
const Matches = Collection.extend({
    model: Match,
    url: 'https://api.spotify.com/v1/search'
});

export default Matches;

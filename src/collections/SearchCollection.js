import {Collection} from 'backbone';
import Search from '../models/Search';

/**
 * Collection for the matches endpoint
 *
 * @constructor
 */
const SearchCollection = Collection.extend({
    model: Search,
    url: 'https://api.spotify.com/v1/search'
});

export default SearchCollection;

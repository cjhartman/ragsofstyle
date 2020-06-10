import axios from 'axios'
import flickr from '../../config/flickr'

export default function getPhotos (method, params) {
  return axios({
    method: 'get',
    url: 'https://www.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=' + flickr.api_key + '&user_id=187577558%40N07&format=json&nojsoncallback=1',
    params: {
      method: 'flickr.people.getPublicPhotos',
      api_key: flickr.api_key,
      page: 1,
      privacy_filter: 5,
      extras: 'url_n, description',
      format: 'json',
      nojsoncallback: 1,
      per_page: 30
    }
  })
}

import axios from 'axios'

export default function getDBPhotosFromFlickr (farmId, serverId, uid, secret) {
  return axios({
    method: 'get',
    url: 'https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + uid + '_' + secret + '.jpg'
  })
}

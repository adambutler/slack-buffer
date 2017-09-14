var ApiBuilder = require('claudia-api-builder')
var fetch = require('node-fetch')

var api = new ApiBuilder()

var config = require('./config')

api.get('/', function (request) {
  if (request.queryString.token != config.slack_token) {
    return new api.ApiResponse('Unauthorized - Bad token', { 'Content-Type': 'text/plain' }, 401)
  }

  if (request.queryString.channel_name != config.channel_name) {
    return new api.ApiResponse('Unauthorized - Wrong channel_name', { 'Content-Type': 'text/plain' }, 401)
  }

  if (request.queryString.token != config.slack_token) {
    return new api.ApiResponse('Unauthorized', { 'Content-Type': 'text/plain' }, 401)
  }

  return new Promise((resolve, reject) => {
    fetch('https://api.bufferapp.com/1/updates/create.json?access_token=' + encodeURI(config.buffer_access_token), {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'text=' + encodeURIComponent(request.queryString.text) + '&profile_ids[]=' + config.buffer_twitter_profile
    })
    .then(function(response) { return response.json() })
    .then(function(payload) {
      if(payload.success) {
        var message = 'This message by '+ request.queryString.user_name +' will be posted ' + payload.updates[0].day + ' at ' + payload.updates[0].due_time + ' to ' + payload.updates[0].profile_service

        resolve({
          "response_type": "in_channel",
          "text": payload.updates[0].text,
          "attachments": [{ "text": message }]
        })

      } else {
        resolve(new api.ApiResponse(payload.message, { 'Content-Type': 'text/plain' }, 200))
      }
    })
    .catch(function (e) { reject('Something went wrong - ' + e) })
  })
})

module.exports = api

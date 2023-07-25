# API Notes

There's actually 2 platforms that utilize APIs in Pinepods. I will make documents going over the details on both of them. 

## Database API

The database portion of the API is the interaction that Pinepods client or web has with the database. Both version interact using the same 

API Documentation
Overview

This API is used to manage and interact with data in a podcast application. The API requires authentication via an API key, which should be provided in the header with the name "pinepods_api".
Endpoints
GET /api/data

This endpoint returns the data associated with a client, identified by the API key.

Request Headers

    pinepods_api : string

Response

    status : string
    data : string

Example usage with curl:

bash

curl -H "pinepods_api: YOUR_API_KEY" http://localhost:8000/api/data

GET /api/pinepods_check

This endpoint is used for a simple health check of the service.

Response

    status_code : int
    pinepods_instance : bool

Example usage with curl:

bash

curl http://localhost:8000/api/pinepods_check

POST /api/data/clean_expired_sessions/

This endpoint is used to clean up expired sessions in the database. Requires API key for authentication.

Request Headers

    Api-Key : string

Response

    status : string

Example usage with curl:

bash

curl -X POST -H "Api-Key: YOUR_API_KEY" http://localhost:8000/api/data/clean_expired_sessions/

GET /api/data/check_saved_session/{session_value}

This endpoint checks if a session with the specified value exists in the database. Requires API key for authentication.

Request Headers

    Api-Key : string

Response

    status : int

Example usage with curl:

bash

curl -H "Api-Key: YOUR_API_KEY" http://localhost:8000/api/data/check_saved_session/YOUR_SESSION_VALUE

GET /api/data/config

This endpoint returns configuration details about the API. Requires API key for authentication.

Request Headers

    Api-Key : string

Response

    api_url : string
    proxy_url : string
    proxy_host : string
    proxy_port : string
    proxy_protocol : string
    reverse_proxy : string

Example usage with curl:

bash

curl -H "Api-Key: YOUR_API_KEY" http://localhost:8000/api/data/config


POST /api/data/enable_disable_guest

This endpoint enables or disables the guest access. Requires API key for authentication.

Headers

vbnet

Api-Key : string

Response

arduino

success : boolean

Example usage with curl:

bash

curl -X POST -H "Api-Key: YOUR_API_KEY" http://localhost:8000/api/data/enable_disable_guest

POST /api/data/enable_disable_downloads

This endpoint enables or disables the downloads. Requires API key for authentication.

Headers

vbnet

Api-Key : string

Response

arduino

success : boolean

Example usage with curl:

bash

curl -X POST -H "Api-Key: YOUR_API_KEY" http://localhost:8000/api/data/enable_disable_downloads

POST /api/data/enable_disable_self_service

This endpoint enables or disables the self service. Requires API key for authentication.

Headers

vbnet

Api-Key : string

Response

arduino

success : boolean

Example usage with curl:

bash

curl -X POST -H "Api-Key: YOUR_API_KEY" http://localhost:8000/api/data/enable_disable_self_service

GET /api/data/self_service_status

This endpoint gets the current status of the self service. Requires API key for authentication.

Headers

vbnet

Api-Key : string

Response

lua

status : string

Example usage with curl:

bash

curl -H "Api-Key: YOUR_API_KEY" http://localhost:8000/api/data/self_service_status

PUT /api/data/increment_listen_time/{user_id}

This endpoint increments the listen time for a given user_id. Requires API key for authentication.

Headers

vbnet

Api-Key : string

Response

c

detail : string

Example usage with curl:

bash

curl -X PUT -H "Api-Key: YOUR_API_KEY" http://localhost:8000/api/data/increment_listen_time/USER_ID

PUT /api/data/increment_played/{user_id}

This endpoint increments the play count for a given user_id. Requires API key for authentication.

Headers

vbnet

Api-Key : string

Response

c

detail : string

Example usage with curl:

bash

curl -X PUT -H "Api-Key: YOUR_API_KEY" http://localhost:8000/api/data/increment_played/USER_ID

POST /api/data/record_podcast_history

This endpoint records the podcast history. Requires API key for authentication.

Headers

vbnet

Api-Key : string

Body

vbnet

episode_title: string
user_id: int
episode_pos: float

Response

c

detail : string

Example usage with curl:

bash

curl -X POST -H "Api-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"episode_title":"EPISODE_TITLE", "user_id": USER_ID, "episode_pos": EPISODE_POS}' http://localhost:8000/api/data/record_podcast_history

GET /api/data/guest_status

This endpoint returns the guest status. Requires API key for authentication.

Request Headers

    Api-Key : string

Response

    guest_status : bool

Example usage with curl:

bash

curl -H "Api-Key: YOUR_API_KEY" http://localhost:8000/api/data/guest_status

GET /api/data/download_status

This endpoint returns the download status. Requires API key for authentication.

Request Headers

    Api-Key : string

Response

    download_status : bool

Example usage with curl:

bash

curl -H "Api-Key: YOUR_API_KEY" http://localhost:8000/api/data/download_status

GET /api/data/user_details/{username}

This endpoint returns details of a user with the specified username. Requires API key for authentication.

Request Headers

    Api-Key : string

Response

    user_details : dictionary

Example usage with curl:

bash

curl -H "Api-Key: YOUR_API_KEY" http://localhost:8000/api/data/user_details/USERNAME

POST /api/data/create_session/{user_id}

This endpoint is used to create a session for a user with the given user_id. Requires API key for authentication.

Request Headers

    Api-Key : string

Request Body

    session_token : string

Response

    status : string

Example usage with curl:

bash

curl -X POST -H "Api-Key: YOUR_API_KEY" -d '{"session_token":"YOUR_SESSION_TOKEN"}' http://localhost:8000/api/data/create_session/USER_ID

POST /api/data/verify_password/

This endpoint is used to verify a user's password. Requires API key for authentication.

Request Headers

    Api-Key : string

Request Body

    username : string
    password : string

Response

    is_password_valid : bool

Example usage with curl:

bash

curl -X POST -H "Api-Key: YOUR_API_KEY" -d '{"username":"USERNAME", "password":"PASSWORD"}' http://localhost:8000/api/data/verify_password/

GET /api/data/return_episodes/{user_id}

This endpoint returns all episodes related to the user with the given user_id. Requires API key for authentication.

Request Headers

    Api-Key : string

Response

    episodes : list

Example usage with curl:

bash

curl -H "Api-Key: YOUR_API_KEY" http://localhost:8000/api/data/return_episodes/USER_ID

POST /api/data/check_episode_playback

This endpoint checks if an episode was played back. Requires API key for authentication.

Request Headers

    Api-Key : string

Request Body

    user_id : int
    episode_title : string (optional)
    episode_url : string (optional)

Response

    has_playback : bool
    listen_duration : int

Example usage with curl:

bash

curl -X POST -H "Api-Key: YOUR_API_KEY" -d '{"user_id":USER_ID, "episode_title":"EPISODE_TITLE", "episode_url":"EPISODE_URL"}' http://localhost:8000/api/data/check_episode_playback

GET /api/data/user_details_id/{user_id}

This endpoint returns the details of a user with the given user_id. Requires API key for authentication.

Request Headers

    Api-Key : string

Response

    user_details : dictionary

Example usage with curl:

bash

curl -H "Api-Key: YOUR_API_KEY" http://localhost:8000/api/data/user_details_id/USER_ID

GET /api/data/get_theme/{user_id}

This endpoint returns the theme settings of a user with the given user_id. Requires API key for authentication.

Request Headers

    Api-Key : string

Response

    theme : string

Example usage with curl:

bash

curl -H "Api-Key: YOUR_API_KEY" http://localhost:8000/api/data/get_theme/USER_ID

POST /api/data/add_podcast

This endpoint adds a podcast for a user. Requires API key for authentication.

Request Headers

    Api-Key : string

Request Body

    podcast_values : string (JSON string)
    user_id : int

Response

    success : bool

Example usage with curl:

bash

curl -X POST -H "Api-Key: YOUR_API_KEY" -d '{"podcast_values":"PODCAST_VALUES_JSON", "user_id":USER_ID}' http://localhost:8000/api/data/add_podcast

NOTE: Replace YOUR_API_KEY, USERNAME, USER_ID, YOUR_SESSION_TOKEN, PASSWORD, EPISODE_TITLE, EPISODE_URL, PODCAST_VALUES_JSON with actual values in the above curl commands.


:

    GET /api/data/get_user_info

    This endpoint returns the user info from the database. Requires API key for authentication.

    Request Headers

    vbnet

Api-Key : string

Response

yaml

user_info : dictionary

Example usage with curl:

bash

curl -H "Api-Key: YOUR_API_KEY" http://localhost:8000/api/data/get_user_info

POST /api/data/check_podcast

This endpoint checks if a podcast exists for a given user_id and podcast_name. Requires API key for authentication. The request must include a CheckPodcastData model in the request body.

Request Headers

vbnet

Api-Key : string

Request Body

php

{
    "user_id": integer,
    "podcast_name": string
}

Response

arduino

{
    "exists": boolean
}

Example usage with curl:

bash

curl -X POST -H "Api-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"user_id":1, "podcast_name":"Podcast Name"}' http://localhost:8000/api/data/check_podcast


GET /api/data/user_admin_check/{user_id}

This endpoint checks if the user is an admin. Requires API key for authentication.

Request Headers

vbnet

Api-Key : string

Path Parameters

bash

user_id : integer

Response

arduino

{
    "is_admin": boolean
}

Example usage with curl:

bash

curl -H "Api-Key: YOUR_API_KEY" http://localhost:8000/api/data/user_admin_check/1

POST /api/data/remove_podcast

This endpoint removes a podcast. Requires API key for authentication. The request must include a RemovePodcastData model in the request body.

Request Headers

vbnet

Api-Key : string

Request Body

php

{
    "user_id": integer,
    "podcast_name": string
}

Response

c

{
    "status": string
}

Example usage with curl:

bash

curl -X POST -H "Api-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"user_id":1, "podcast_name":"Podcast Name"}' http://localhost:8000/api/data/remove_podcast

GET /api/data/return_pods/{user_id}

This endpoint returns the list of podcasts for a user. Requires API key for authentication.

Request Headers

vbnet

Api-Key : string

Path Parameters

bash

user_id : integer

Response

json

{
    "pods": list
}

Example usage with curl:

bash

curl -H "Api-Key: YOUR_API_KEY" http://localhost:8000/api/data/return_pods/1

GET /api/data/user_history/{user_id}

This endpoint returns the user's history. Requires API key for authentication.

Request Headers

vbnet

Api-Key : string

Path Parameters

bash

user_id : integer

Response

json

{
    "history": list
}

Example usage with curl:

bash

curl -H "Api-Key: YOUR_API_KEY" http://localhost:8000/api/data/user_history/1


GET /api/data/saved_episode_list/{user_id}

This endpoint retrieves a list of episodes saved by a specific user. Requires API key for authentication.

Request Headers

vbnet

Api-Key : string

Path Parameters

bash

user_id : integer

Response

json

{
    "saved_episodes": list
}

Example usage with curl:

bash

curl -H "Api-Key: YOUR_API_KEY" http://localhost:8000/api/data/saved_episode_list/1

POST /api/data/download_episode_list

This endpoint allows a user to download a list of episodes. Requires API key for authentication. The request must include a user id in the request body.

Request Headers

vbnet

Api-Key : string

Request Body

bash

{
    "user_id": integer
}

Response

json

{
    "downloaded_episodes": list
}

Example usage with curl:

bash

curl -X POST -H "Api-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"user_id":1}' http://localhost:8000/api/data/download_episode_list

POST /api/data/get_queue_list

This endpoint retrieves a list of episodes in the user's queue. Requires API key for authentication. The request must include a Queue model in the request body.

Request Headers

vbnet

Api-Key : string

Request Body

json

{
    "queue_urls": list of strings
}

Response

json

{
    "queue_list": list
}

Example usage with curl:

bash

curl -X POST -H "Api-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"queue_urls":["url1", "url2"]}' http://localhost:8000/api/data/get_queue_list

POST /api/data/return_selected_episode

This endpoint retrieves information about a selected episode. Requires API key for authentication. The request must include a user id, title, and url in the request body.

Request Headers

vbnet

Api-Key : string

Request Body

php

{
    "user_id": integer,
    "title": string,
    "url": string
}

Response

csharp

{
    "episode_info": object
}

Example usage with curl:

bash

curl -X POST -H "Api-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"user_id":1, "title":"Episode Title", "url":"Episode URL"}' http://localhost:8000/api/data/return_selected_episode



POST /api/data/check_usernames

This endpoint checks if a username already exists in the database.

Request Headers

vbnet

Api-Key : string

Request Body

c

{
    "username": string
}

Response

arduino

{
    "username_exists": boolean
}

Example usage with curl:

bash

curl -X POST -H "Api-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"username":"sampleuser"}' http://localhost:8000/api/data/check_usernames

POST /api/data/add_user

This endpoint adds a new user to the database. User information includes full name, username, email, hashed password and salt. Hashed password and salt should be Base64 encoded.

Request Headers

vbnet

Api-Key : string

Request Body (UserValues model)

c

{
    "fullname": string,
    "username": string,
    "email": string,
    "hash_pw": Base64 string,
    "salt": Base64 string
}

Response

c

{
    "detail": string
}

Example usage with curl:

bash

curl -X POST -H "Api-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"fullname":"John Doe", "username":"johndoe", "email":"johndoe@example.com", "hash_pw":"SGVsbG8gd29ybGQ=", "salt":"SGVsbG8gd29ybGQ="}' http://localhost:8000/api/data/add_user

PUT /api/data/set_fullname/{user_id}

This endpoint updates the full name of a user based on the user ID.

Request Headers

vbnet

Api-Key : string

Path Parameters

bash

user_id : integer

Query Parameters

c

new_name : string

Response

c

{
    "detail": string
}

Example usage with curl:

bash

curl -X PUT -H "Api-Key: YOUR_API_KEY" "http://localhost:8000/api/data/set_fullname/1?new_name=John%20Doe"

PUT /api/data/set_password/{user_id}

This endpoint updates the password of a user. The new password's hash and salt should be included in the body as a Base64 string.

Request Headers

vbnet

Api-Key : string

Path Parameters

bash

user_id : integer

Request Body

c

{
    "salt": Base64 string,
    "hash_pw": Base64 string
}

Response

c

{
    "detail": string
}

Example usage with curl:

bash

curl -X PUT -H "Api-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"salt":"SGVsbG8gd29ybGQ=", "hash_pw":"SGVsbG8gd29ybGQ="}' http://localhost:8000/api/data/set_password/1

PUT /api/data/user/set_email

This endpoint updates the email of a user. User ID and new email should be included in the request body.

Request Headers

vbnet

Api-Key : string

Request Body

php

{
    "user_id": integer,
    "new_email": string
}

Response

c

{
    "detail": string
}

Example usage with curl:

bash

    curl -X PUT -H "Api-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"user_id":1, "new_email":"newemail@example.com"}' http://localhost:8000/api/data/user/set_email


PUT /api/data/user/set_username

This endpoint updates the username of a user. User ID and new username should be included in the request body.

Request Headers

vbnet

Api-Key : string

Request Body

php

{
    "user_id": integer,
    "new_username": string
}

Response

c

{
    "detail": string
}

Example usage with curl:

bash

curl -X PUT -H "Api-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"user_id":1, "new_username":"newusername"}' http://localhost:8000/api/data/user/set_username

PUT /api/data/user/set_isadmin

This endpoint updates the admin status of a user. User ID and new admin status should be included in the request body.

Request Headers

vbnet

Api-Key : string

Request Body

php

{
    "user_id": integer,
    "isadmin": boolean
}

Response

c

{
    "detail": string
}

Example usage with curl:

bash

curl -X PUT -H "Api-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"user_id":1, "isadmin":true}' http://localhost:8000/api/data/user/set_isadmin

GET /api/data/user/final_admin/{user_id}

This endpoint checks if the specified user is the last remaining admin.

Request Headers

vbnet

Api-Key : string

Path Parameters

bash

user_id : integer

Response

arduino

{
    "final_admin": boolean
}

Example usage with curl:

bash

curl -X GET -H "Api-Key: YOUR_API_KEY" http://localhost:8000/api/data/user/final_admin/1

DELETE /api/data/user/delete/{user_id}

This endpoint deletes a user by their ID.

Request Headers

vbnet

Api-Key : string

Path Parameters

bash

user_id : integer

Response

c

{
    "status": string
}

Example usage with curl:

bash

curl -X DELETE -H "Api-Key: YOUR_API_KEY" http://localhost:8000/api/data/user/delete/1

PUT /api/data/user/set_theme

This endpoint updates the theme for a user. User ID and new theme should be included in the request body.

Request Headers

vbnet

Api-Key : string

Request Body

php

{
    "user_id": integer,
    "new_theme": string
}

Response

c

{
    "message": string
}

Example usage with curl:

bash

    curl -X PUT -H "Api-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"user_id":1, "new_theme":"dark"}' http://localhost:8000/api/data/user/set_theme

GET /api/data/user/check_downloaded

This endpoint checks if a specific episode has been downloaded by the user.

Request Headers

vbnet

Api-Key : string

Query Parameters

php

user_id : integer
title : string
url : string

Response

arduino

{
    "is_downloaded": boolean
}

Example usage with curl:

bash

curl -X GET -H "Api-Key: YOUR_API_KEY" "http://localhost:8000/api/data/user/check_downloaded?user_id=1&title=episodeTitle&url=episodeUrl"

GET /api/data/user/check_saved

This endpoint checks if a specific episode has been saved by the user.

Request Headers

vbnet

Api-Key : string

Query Parameters

php

user_id : integer
title : string
url : string

Response

arduino

{
    "is_saved": boolean
}

Example usage with curl:

bash

curl -X GET -H "Api-Key: YOUR_API_KEY" "http://localhost:8000/api/data/user/check_saved?user_id=1&title=episodeTitle&url=episodeUrl"

POST /api/data/create_api_key

This endpoint creates a new API key for the user.

Request Headers

vbnet

Api-Key : string

Request Body

bash

{
    "user_id": integer
}

Response

c

{
    "api_key": string
}

Example usage with curl:

bash

curl -X POST -H "Api-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"user_id":1}' http://localhost:8000/api/data/create_api_key

POST /api/data/save_email_settings

This endpoint allows the user to save their email settings.

Request Headers

vbnet

Api-Key : string

Request Body

json

{
    "email_settings": {
        // The specific keys and their types depend on what the email settings are.
    }
}

Response

c

{
    "message": string
}

Example usage with curl:

bash

curl -X POST -H "Api-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"email_settings":{...}}' http://localhost:8000/api/data/save_email_settings

GET /api/data/get_encryption_key

This endpoint retrieves the encryption key.

Request Headers

vbnet

Api-Key : string

Response

c

{
    "encryption_key": string
}

Example usage with curl:

bash

    curl -X GET -H "Api-Key: YOUR_API_KEY" http://localhost:8000/api/data/get_encryption_key


GET /api/data/get_email_settings

This endpoint retrieves the email settings of the user.

Request Headers

vbnet

Api-Key : string

Response

arduino

{
    // The keys and their types in the response body depend on what the email settings are.
}

Example usage with curl:

bash

curl -X GET -H "Api-Key: YOUR_API_KEY" http://localhost:8000/api/data/get_email_settings

DELETE /api/data/delete_api_key/{api_id}

This endpoint deletes a specific API key.

Request Headers

vbnet

Api-Key : string

Path Parameters

bash

api_id : integer

Response

json

{
    "detail": "API key deleted."
}

Example usage with curl:

bash

curl -X DELETE -H "Api-Key: YOUR_API_KEY" http://localhost:8000/api/data/delete_api_key/1

GET /api/data/get_api_info

This endpoint retrieves information about the API.

Request Headers

vbnet

Api-Key : string

Response

json

{
    "api_info": {
        // The specific keys and their types in the response body depend on what the API information is.
    }
}

Example usage with curl:

bash

curl -X GET -H "Api-Key: YOUR_API_KEY" http://localhost:8000/api/data/get_api_info

POST /api/data/reset_password_create_code

This endpoint creates a reset password code for a user.

Request Headers

vbnet

Api-Key : string

Request Body

c

{
    "email": string,
    "reset_code": string
}

Response

arduino

{
    "user_exists": boolean
}

Example usage with curl:

bash

curl -X POST -H "Api-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"email":"user@email.com","reset_code":"123456"}' http://localhost:8000/api/data/reset_password_create_code

POST /api/data/verify_reset_code

This endpoint verifies a reset password code.

Request Headers

vbnet

Api-Key : string

Request Body

c

{
    "email": string,
    "reset_code": string
}

Response

arduino

{
    "code_valid": boolean
}

Example usage with curl:

bash

    curl -X POST -H "Api-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"email":"user@email.com","reset_code":"123456"}' http://localhost:8000/api/data/verify_reset_code

POST /api/data/reset_password_prompt

This endpoint verifies the reset password process.

Request Headers

vbnet

Api-Key : string

Request Body

c

{
    "email": string,
    "salt": string,
    "hashed_pw": string
}

Response

c

{
    "message": string
}

Example usage with curl:

bash

curl -X POST -H "Api-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"email":"user@email.com","salt":"your_salt","hashed_pw":"your_hashed_password"}' http://localhost:8000/api/data/reset_password_prompt

POST /api/data/clear_guest_data

This endpoint clears guest data.

Request Headers

vbnet

Api-Key : string

Response

c

{
    "message": string
}

Example usage with curl:

bash

curl -X POST -H "Api-Key: YOUR_API_KEY" http://localhost:8000/api/data/clear_guest_data

POST /api/data/get_episode_metadata

This endpoint retrieves metadata for a specific episode.

Request Headers

vbnet

Api-Key : string

Request Body

php

{
    "episode_url": string,
    "episode_title": string,
    "user_id": integer
}

Response

json

{
    "episode": {
        // The specific keys and their types in the response body depend on what the episode metadata is.
    }
}

Example usage with curl:

bash

curl -X POST -H "Api-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"episode_url":"http://episode_url","episode_title":"episode_title","user_id":1}' http://localhost:8000/api/data/get_episode_metadata

POST /api/data/save_mfa_secret

This endpoint saves the multi-factor authentication (MFA) secret for a user.

Request Headers

vbnet

Api-Key : string

Request Body

php

{
    "user_id": integer,
    "mfa_secret": string
}

Response

lua

{
    "status": string // "success" or "error"
}

Example usage with curl:

bash

    curl -X POST -H "Api-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"user_id":1,"mfa_secret":"your_mfa_secret"}' http://localhost:8000/api/data/save_mfa_secret


GET /api/data/check_mfa_enabled/{user_id}

This endpoint checks if MFA (Multi-Factor Authentication) is enabled for a given user ID.

Request Headers

vbnet

Api-Key : string

Response

arduino

{
    "mfa_enabled": boolean
}

Example usage with curl:

bash

curl -X GET -H "Api-Key: YOUR_API_KEY" http://localhost:8000/api/data/check_mfa_enabled/1

POST /api/data/verify_mfa

This endpoint verifies the MFA code for a given user.

Request Headers

vbnet

Api-Key : string

Request Body

php

{
    "user_id": integer,
    "mfa_code": string
}

Response

arduino

{
    "verified": boolean
}

Example usage with curl:

bash

curl -X POST -H "Api-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"user_id":1,"mfa_code":"123456"}' http://localhost:8000/api/data/verify_mfa

DELETE /api/data/delete_mfa

This endpoint deletes the MFA secret for a given user ID.

Request Headers

vbnet

Api-Key : string

Request Body

bash

{
    "user_id": integer
}

Response

arduino

{
    "deleted": boolean
}

Example usage with curl:

bash

curl -X DELETE -H "Api-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"user_id":1}' http://localhost:8000/api/data/delete_mfa

POST /api/data/get_all_episodes

This endpoint retrieves all episodes for a given podcast feed.

Request Headers

vbnet

Api-Key : string

Request Body

c

{
    "pod_feed": string
}

Response

json

{
    "episodes": [
        // The specific keys and their types in the response body depend on what the episode metadata is.
    ]
}

Example usage with curl:

bash

curl -X POST -H "Api-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"pod_feed":"http://podcast_feed"}' http://localhost:8000/api/data/get_all_episodes

POST /api/data/remove_episode_history

This endpoint removes an episode from the user's history.

Request Headers

vbnet

Api-Key : string

Request Body

php

{
    "url": string,
    "title": string,
    "user_id": integer
}

Response

arduino

{
    "success": boolean
}

Example usage with curl:

bash

curl -X POST -H "Api-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"url":"http://episode_url","title":"Episode Title","user_id":1}' http://localhost:8000/api/data/remove_episode_history

POST /api/data/setup_time_info

This endpoint sets up timezone information for a user.

Request Headers

vbnet

Api-Key : string

Request Body

php

{
    "user_id": integer,
    "timezone": string,
    "hour_pref": integer
}

Response

arduino

{
    "success": boolean
}

Example usage with curl:

bash

curl -X POST -H "Api-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"user_id":1,"timezone":"GMT","hour_pref":12}' http://localhost:8000/api/data/setup_time_info

GET /api/data/get_time_info

This endpoint retrieves the timezone information for a user.

Request Headers

vbnet

Api-Key : string

Response

php

{
    "timezone": string,
    "hour_pref": integer
}

Example usage with curl:

bash

    curl -X GET -H "Api-Key: YOUR_API_KEY" http://localhost:8000/api/data/get_time_info/1

POST /api/data/first_login_done

This endpoint updates a user's first login status in the database.

Request Headers

vbnet

Api-Key : string

Request Body

bash

{
    "user_id": integer
}

Response

arduino

{
    "FirstLogin": boolean
}

Example usage with curl:

bash

curl -X POST -H "Api-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"user_id":1}' http://localhost:8000/api/data/first_login_done

POST /api/data/delete_selected_episodes

This endpoint deletes the selected episodes from the user's list.

Request Headers

vbnet

Api-Key : string

Request Body

bash

{
    "selected_episodes": [integer, integer, ...],
    "user_id": integer
}

Response

arduino

{
    "status": boolean
}

Example usage with curl:

bash

curl -X POST -H "Api-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"selected_episodes":[1,2,3],"user_id":1}' http://localhost:8000/api/data/delete_selected_episodes

POST /api/data/delete_selected_podcasts

This endpoint deletes the selected podcasts from the user's list.

Request Headers

vbnet

Api-Key : string

Request Body

bash

{
    "delete_list": [integer, integer, ...],
    "user_id": integer
}

Response

arduino

{
    "status": boolean
}

Example usage with curl:

bash

    curl -X POST -H "Api-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"delete_list":[1,2,3],"user_id":1}' http://localhost:8000/api/data/delete_selected_podcasts


## Search API
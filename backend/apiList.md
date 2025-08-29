# Api List

## AuthRoute
- POST /signup
- POST /login
- POST /logout

## ProfileRourte
- Get /profile/view
- Patch /profile/edit
- Patch /profile/password

## ConnectionRequestRoute
- Post /request/send/like/:userId
- Post /request/send/pass/:userId
- Post /request/review/accepted/:reqeustId
- Post /request/review/rejected/:reqeustId

## UserRoute
- Get /user/feed - get you the profile of the other users on platform
- Get /user/requests
- Get /user/connections
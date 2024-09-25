##DevTinder 


# authRouter
POST /signup
POST /login
POST /logout

# profileRouter
GET /profile/view
PATCH /profile/edit
PATCH /profile/password

# connectionRequestRouter
POST /request/send/:status/:toUserId     //status : intrested,ignored
POST /request/review/accepted/:requestId
POST /request/review/rejected/:requestId

# userRouter
GET /user/connections
GET /user/feed
GET /user/requests


status - ignored, intrested, accepted, rejected



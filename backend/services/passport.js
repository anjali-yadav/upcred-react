const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/User') // getting Schema

/* =================== Handeling Infinite run: Start ===================  */
// passport.serializeUser((user, done) => {
// 	done(null, user.id)
// })

// passport.deserializeUser((id, done) => {
// 	User.findById(id).then((user) => {
// 		done(null, user)
// 	})
// })

passport.use(User.createStrategy())
passport.serializeUser(function (user, done) {
	done(null, user.id)
})
passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user)
	})
})
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: 'http://localhost:4000/auth/google/callback',
			userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
		},
		function (accessToken, refreshToken, profile, cb) {
			const name = profile.name.givenName + profile.name.familyName
			User.findOrCreate(
				{
					googleId: profile.id,
					username: name,
					email: profile.email,
					login_type: 'google',
				},
				function (err, user) {
					return cb(err, user)
				}
			)
		}
	)
)

// For Google
// passport.use(
// 	new GoogleStrategy(
// 		{
// 			clientID: process.env.CLIENT_ID,
// 			clientSecret: process.env.CLIENT_SECRET,
// 			callbackURL: '/auth/google/callback',
// 		},
// 		(accessToken, refreshToken, profile, done) => {
// 			console.log(profile)
// 			// profile has all google login data
// 			/* ========= DATABASE CHECK PRE EXIST AND INSERT QUERY: START =========  */

// 			// check if user id already inserted
// 			User.findOne({ userId: profile.id }).then((existingUser) => {
// 				if (existingUser) {
// 					done(null, existingUser)
// 				} else {
// 					// new user case
// 					// insert new user id
// 					new User({
// 						userId: profile.id,
// 						username: profile.displayName,
// 						picture: profile._json.picture,
// 					})
// 						.save()
// 						.then((user) => {
// 							done(null, user)
// 						})
// 				}
// 			})
// 			/* ========= DATABASE CHECK PRE EXIST AND INSERT QUERY: END =========  */
// 		}
// 	)
// )

// For facebook
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: keys.FACEBOOK_APP_ID,
//       clientSecret: keys.FACEBOOK_APP_SECRET,
//       callbackURL: "/auth/facebook/callback"
//     },
//     (accessToken, refreshToken, profile, done) => {
//       console.log(profile);
//       /* ========= DATABASE CHECK PRE EXIST AND INSERT QUERY: START =========  */
//       // check if user id already inserted
//       User.findOne({ userId: profile.id }).then(existingUser => {
//         if (existingUser) {
//           done(null, existingUser);
//         } else {
//           // new user case
//           // insert new user id
//           new User({
//             userId: profile.id,
//             username: profile.displayName,
//             picture: profile._json.picture
//           })
//             .save()
//             .then(user => {
//               done(null, user);
//             });
//         }
//       });
//       /* ========= DATABASE CHECK PRE EXIST AND INSERT QUERY: END =========  */
//     }
//   )
// );

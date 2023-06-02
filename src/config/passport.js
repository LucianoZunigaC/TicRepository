const passport = require('passport');
const dbCtrl = require('../database/webQuery.database.js');
const LocalStrategy = require('passport-local').Strategy;




passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {


        console.log('Email:' + email + ' Password:' + password);

        const user = await dbCtrl.getUser(email, password);

        if(!user){
            return done(null, false, { message: "User not found or incorrect password."});
        }

        return done(null, user);
}));


passport.serializeUser((user, done) => {

    done(null, user.id);
});

passport.deserializeUser( async (id, done) => {

    const user = await dbCtrl.getUserId(id);

    done(null, user);
})
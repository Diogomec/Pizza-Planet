  const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
      return res.redirect('/auth/login');
    }
    next();
  };
   
  // if an already logged in user tries to access the login page it
  // redirects the user to the home page
  const isLoggedOut = (req, res, next) => {
    if (req.session.currentUser) {
      return res.redirect('/');
    }
    next();
  };

  const isLoggedInAndAdmin = (req, res, next) => {
    if (req.session.currentUser && req.session.currentUser.role === 'Admin' ) {
      return res.redirect('/auth/login');
    }
    next();
  };
   
  module.exports = {
    isLoggedIn,
    isLoggedOut
  };
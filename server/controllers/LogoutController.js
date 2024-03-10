
const Logout = async (req, res, next) => {
  try {
    
    res.clearCookie('jwt', { path: '/' });


    res.status(200).json({ success: true, message: 'User logged out' });
  } catch (error) {

    next(error);
  }
}

module.exports = { Logout };
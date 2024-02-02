const { authenticateUser } = require('../config/middleware/auth');


router.get('/dashboard', authenticateUser, (req, res) => {
    // need to complete this block of code
})
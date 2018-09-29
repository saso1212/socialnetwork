const express = require('express');
const router = express.Router();

const userRoutes = require('./users.router.js');
const postsRoutes = require('./posts.router.js');
const meRoutes = require('./me.router.js');
const loginRoutes = require('./login.router.js');
const registerRoutes = require('./register.router.js');
const timelineRoutes = require('./timeline.router.js');
const searchRoutes = require('./search.router.js');
const friendsRoutes = require('./friends.router.js');
const messagesRoutes = require('./messages.router.js');


router.use('/users', userRoutes);
router.use('/posts', postsRoutes);
router.use('/me', meRoutes);
router.use('/login', loginRoutes);
router.use('/register', registerRoutes);
router.use('/timeline', timelineRoutes);
router.use('/search', searchRoutes);
router.use('/friends', friendsRoutes);
router.use('/messages', messagesRoutes);

module.exports = router;
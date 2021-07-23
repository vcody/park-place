const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User'); 
const Post = require('../../models/Post');

// @route  GET api/profile/me
// @desc   Get current user's profile
// @access Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile
        .findOne({ user: req.user.id })
        .populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user.' });
        }

        res.json(profile);
    } catch(error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route  POST api/profile
// @desc   Create or update user profile
// @access Private
router.post('/', [ auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('interests', 'Interests are required').not().isEmpty()
 ]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        location,
        status,
        interests,
        bio,
        // visited_parks,
        twitter,
        facebook,
        instagram
    } = req.body; 

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;

    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if (bio) profileFields.bio = bio;

    if (interests) {
        profileFields.interests = interests.split(',').map(interest => interest.trim());
    }

    // Build social object
    profileFields.social = {};
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;

    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            // Update profile
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id }, 
                { $set: profileFields }, 
                { new: true }
            );

            return res.json(profile); 
        }

        // Create
        profile = new Profile(profileFields);

        await profile.save();
        res.json(profile);
    } catch(error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route  GET api/profile
// @desc   Get all profiles
// @access Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch(error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route  GET api/profile/user/:user_id
// @desc   Get profile by user ID
// @access Public
router.get('/user/:user_id', async (req, res) => { 
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found' });
        }

        res.json(profile);
    } catch (error) {
        console.error(error.message);

        if (error.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server error');
    }
});

// @route  DELETE api/profile
// @desc   Delete profile, user, and posts
// @access Private
router.delete('/', auth, async (req, res) => {
    try {
        // Remove user's posts
        await Post.deleteMany({ user: req.user.id });

        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        // Remove user
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User deleted'});
    } catch(error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route  PUT api/profile/parkExperience
// @desc   Add profile park experience
// @access Private
router.put('/parkExperience', [auth, [
    check('name', 'Name is required').not().isEmpty(),
    check('location', 'Location is required').not().isEmpty(),
    // check('image', 'Image is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { 
        name,
        location,
        image,
        from,
        to,
    } = req.body;

    const newParkExperience = {
        name,
        location,
        image,
        from,
        to,
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.visited_parks.unshift(newParkExperience);
        await profile.save();

        res.json(profile);
    } catch(error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route  DELETE api/profile/experience/:exp_id
// @desc   Delete parkExperience by ID
// @access Private
router.delete('/parkExperience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // Get remove index
        const removeIndex = profile.visited_parks.map(item => item.id).indexOf(req.params.exp_id);
        profile.visited_parks.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch(error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
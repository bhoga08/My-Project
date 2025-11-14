const Session = require('../models/session.model');


exports.getAllSessions = async (req, res) => {
   try {
      const userId = req.user._id;
        const sessions = await Session.find({ owner: userId }).sort({ createdAt: -1 });
    if(sessions.length === 0) {
      return res.status(404).json({ message: 'No sessions found' });
    }
    res.status(200).json(sessions);
   } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
    
   }
}

exports.getSessionById = async (req, res) => {
     try {

        const sessionId = req.params.id;
        const session = await Session.findOne({ _id: sessionId, owner: req.user._id });
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }
        res.status(200).json(session);
        
     } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
        
     }
}


exports.createSession = async (req, res) => {

    const { programmingLanguage, topic, duration } = req.body;
    
    if (!programmingLanguage || !topic || !duration) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    
    if (duration < 1) {
        return res.status(400).json({ message: 'Duration must be at least 1 minute' });
    }
    
    
    try {
        const session = await Session.create({
        owner: req.user._id,
        programmingLanguage,
        topic,
        duration,
        });
        console.log("Session created:", session);
    
        res.status(201).json(session);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }

}

exports.updateSession = async (req, res) => {

    const { id } = req.params;
    const { programmingLanguage, topic, duration } = req.body;

    if (!programmingLanguage || !topic || !duration) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (duration < 1) {
        return res.status(400).json({ message: 'Duration must be at least 1 minute' });
    }

    try {
        const session = await Session.findOneAndUpdate(
            { _id: id, owner: req.user._id },
            { programmingLanguage, topic, duration },
            { new: true }
        );

        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        res.status(200).json(session);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }

}

exports.deleteSession = async (req, res) => {

    const { id } = req.params;

    try {
        const session = await Session.findOneAndDelete({ _id: id, owner: req.user._id });

        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        res.status(200).json({ message: 'Session deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
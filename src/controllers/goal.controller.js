const Goal = require('../models/goal.model');


exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
    console.error("Error fetching goals:", error);
  }
};


exports.createGoal = async (req, res) => {
  const { title } = req.body;
console.log("Creating goal with title:", title);
  if (!title || title.trim() === '') {
    return res.status(400).json({ message: 'Title is required' });
    
  }
  

  try {
    const goal = await Goal.create({
      user: req.user.id,
      title: title.trim(),
      status: 'incomplete',
    });console.log("Goal created:", goal);

    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.updateGoal = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['complete', 'incomplete'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const goal = await Goal.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { status },
      { new: true }
    );

    if (!goal) return res.status(404).json({ message: 'Goal not found' });

    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.deleteGoal = async (req, res) => {
  const { id } = req.params;

  try {
    const goal = await Goal.findOneAndDelete({ _id: id, user: req.user.id });

    if (!goal) return res.status(404).json({ message: 'Goal not found' });

    res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

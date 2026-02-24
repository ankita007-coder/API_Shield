import RateRule from "../models/RateRule.js"

/**
 * Create Rule
 */
export const createRule = async (req, res) => {
  try {
    const rule = await RateRule.create(req.body);
    res.status(201).json(rule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Get All Rules
 */
export const getRules = async (req, res) => {
  try {
    const rules = await RateRule.find().sort({ createdAt: -1 });
    res.json(rules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update Rule
 */
export const updateRule = async (req, res) => {
  try {
    const rule = await RateRule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!rule) {
      return res.status(404).json({ message: "Rule not found" });
    }

    res.json(rule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Delete Rule
 */
export const deleteRule = async (req, res) => {
  try {
    const rule = await RateRule.findByIdAndDelete(req.params.id);

    if (!rule) {
      return res.status(404).json({ message: "Rule not found" });
    }

    res.json({ message: "Rule deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
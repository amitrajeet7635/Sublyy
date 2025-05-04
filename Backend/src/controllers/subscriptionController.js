import Subscription from "../models/subscription.js";

export const addSubscription = async (req, res) => {
  try {
    const userId = req.user.userId;
    // Validate required fields
    const { name, price, nextPaymentDate, category, billingCycle, paymentMethod } = req.body;
    if (!name || !price || !nextPaymentDate || !category || !billingCycle || !paymentMethod) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const sub = new Subscription({ ...req.body, user: userId });
    await sub.save();
    res.status(201).json({ message: "Subscription added", subscription: sub });
  } catch (err) {
    console.error("Add subscription error:", err.message, err.stack);
    res.status(500).json({ message: "Failed to add subscription", error: err.message });
  }
};

export const getSubscriptions = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log("Fetching subscriptions for user:", userId); // Add logging
    const subs = await Subscription.find({ user: userId }).sort({ nextPaymentDate: 1 });
    console.log(`Found ${subs.length} subscriptions`); // Add logging
    res.json({ subscriptions: subs });
  } catch (err) {
    console.error("Error fetching subscriptions:", err);
    res.status(500).json({ message: "Failed to fetch subscriptions", error: err.message });
  }
};

export const getSubscriptionAnalytics = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log("Fetching analytics for user:", userId); // Add logging
    
    // Get all subscriptions for the user, not just this month's
    // This ensures we capture all recurring payments
    const allSubs = await Subscription.find({ user: userId });
    console.log(`Found ${allSubs.length} total subscriptions for analytics`);
    
    // Calculate monthly total based on all subscriptions
    let total = 0;
    allSubs.forEach(sub => {
      // Consider billing cycle for monthly calculation
      if (sub.billingCycle === "monthly") {
        total += (sub.price || 0);
      } else if (sub.billingCycle === "yearly") {
        total += (sub.price || 0) / 12; // Convert yearly to monthly
      } else if (sub.billingCycle === "weekly") {
        total += (sub.price || 0) * 4.33; // Approx 4.33 weeks per month
      } else {
        // Default/custom billing - assume monthly
        total += (sub.price || 0);
      }
    });

    // Category-wise spend - now designed for bar chart
    const categoryMap = {};
    allSubs.forEach(sub => {
      const cat = sub.category || "Other";
      if (!categoryMap[cat]) categoryMap[cat] = 0;
      
      // Apply same billing cycle logic
      let categoryAmount = 0;
      if (sub.billingCycle === "monthly") {
        categoryAmount = sub.price || 0;
      } else if (sub.billingCycle === "yearly") {
        categoryAmount = (sub.price || 0) / 12;
      } else if (sub.billingCycle === "weekly") {
        categoryAmount = (sub.price || 0) * 4.33;
      } else {
        categoryAmount = sub.price || 0;
      }
      
      categoryMap[cat] += categoryAmount;
    });

    // Format for frontend bar chart
    const categoryDistribution = Object.entries(categoryMap).map(([category, value]) => ({
      category,
      amount: parseFloat(value.toFixed(2))
    }));

    res.json({
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      total: parseFloat(total.toFixed(2)),
      categoryDistribution
    });
  } catch (err) {
    console.error("Error fetching analytics:", err);
    res.status(500).json({ message: "Failed to fetch analytics", error: err.message });
  }
};

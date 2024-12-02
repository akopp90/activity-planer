
import { connectToDatabase } from '@/lib/db';
import Activity from '@/Models/Activity';
import Rating from '@/Models/Rating';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectToDatabase();

    const { activityId, rating, comment, userId } = req.body;
    console.log('Request body:', { activityId, rating, comment, userId });

    if (!activityId) {
      return res.status(400).json({ message: 'Activity ID is required' });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const activity = await Activity.findById(activityId);
    console.log('Found activity:', activity);

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    console.log('User ID:', userId);

    if (!userId) {
      return res.status(400).json({ 
        message: 'User ID not found in request',
      });
    }

    // Try to find existing rating
    let existingRating = await Rating.findOne({ userId, activityId });
    console.log('Existing rating:', existingRating);

    if (existingRating) {
      // Update existing rating
      existingRating.rating = rating;
      existingRating.comment = comment || '';
      await existingRating.save();
    } else {
      // Create new rating
      existingRating = await Rating.create({
        userId,
        activityId,
        rating,
        comment: comment || '',
      });

      // Add rating reference to activity
      activity.ratings = activity.ratings || [];
      activity.ratings.push(existingRating._id);
    }

       // Update activity rating statistics
       const allRatings = await Rating.find({ activityId });
       const totalRating = allRatings.reduce((sum, r) => sum + r.rating, 0);
       const newAverageRating = totalRating / allRatings.length;
       
       // Use findByIdAndUpdate to avoid validation issues
       await Activity.findByIdAndUpdate(
         activityId,
         {
           $set: {
             averageRating: newAverageRating,
             totalRatings: allRatings.length
           }
         },
         { 
           new: true,
           runValidators: false
         }
       );


    return res.status(200).json({
      averageRating: activity.averageRating,
      totalRatings: activity.totalRatings
    });
  } catch (error) {
    console.error('Rating error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });

    if (error.code === 11000) {
      return res.status(400).json({
        message: 'You have already rated this activity',
      });
    }

    return res.status(500).json({ 
      message: 'Internal server error',
      error: error.message,
      type: error.name
    });
  }
}

export const filterActivities = (activities, category) => {
    const filters = {
      'water-sports': activity => {
        const text = (activity.title + activity.description).toLowerCase();
        return text.includes('water') || text.includes('sport');
      },
      'winter-sports': activity => {
        const text = (activity.title + activity.description).toLowerCase();
        return text.includes('winter') || text.includes('sport');
      },
      'aerial-adventure': activity => {
        const text = (activity.title + activity.description).toLowerCase();
        return text.includes('adventure');
      },
      'outdoor-adventure': activity => {
        const text = (activity.title + activity.description).toLowerCase();
        return text.includes('outdoor') && text.includes('adventure');
      }
    };
    return filters[category] ? activities.filter(filters[category]) : [];
  }
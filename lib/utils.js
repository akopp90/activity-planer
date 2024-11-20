export function filterActivities(activities, filter) {
  if (filter.length === 0) return activities;
  return activities.filter(({ categories }) =>
    categories.some((category) => filter.includes(category))
  );
}

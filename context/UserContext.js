import { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userPreferences, setUserPreferences] = useState(null);

  useEffect(() => {
    // Load user preferences from localStorage on mount
    const loadPreferences = () => {
      const savedPreferences = localStorage.getItem('userPreferences');
      if (savedPreferences) {
        setUserPreferences(JSON.parse(savedPreferences));
      } else {
        // Set default preferences
        const defaultPreferences = {
          categories: [],
          location: '',
          lastUpdated: new Date().toISOString()
        };
        setUserPreferences(defaultPreferences);
        localStorage.setItem('userPreferences', JSON.stringify(defaultPreferences));
      }
    };

    loadPreferences();
  }, []);

  const updatePreferences = (newPreferences) => {
    const updatedPreferences = {
      ...userPreferences,
      ...newPreferences,
      lastUpdated: new Date().toISOString()
    };
    setUserPreferences(updatedPreferences);
    localStorage.setItem('userPreferences', JSON.stringify(updatedPreferences));
  };

  return (
    <UserContext.Provider value={{ userPreferences, updatePreferences }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;

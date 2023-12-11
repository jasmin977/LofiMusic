import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppState {
  [key: string]: {
    isVisible: boolean;
    toggleVisibility: () => void;
    zindex: number;
    setZindex: (value: number) => void;
    bringToFront: () => void;
  };
}

const initialState: AppState = {
  musicCard: {
    isVisible: false,
    toggleVisibility: () => {},
    zindex: 1,
    setZindex: () => {},
    bringToFront: () => {},
  },
  mixerCard: {
    isVisible: false,
    toggleVisibility: () => {},
    zindex: 1,
    setZindex: () => {},
    bringToFront: () => {},
  },
  playlistCard: {
    isVisible: false,
    toggleVisibility: () => {},
    zindex: 1,
    setZindex: () => {},
    bringToFront: () => {},
  },
  chatCard: {
    isVisible: false,
    toggleVisibility: () => {},
    zindex: 1,
    setZindex: () => {},
    bringToFront: () => {},
  },
  pomodoroCard: {
    isVisible: false,
    toggleVisibility: () => {},
    zindex: 1,
    setZindex: () => {},
    bringToFront: () => {},
  },
  inviteUsersCard: {
    isVisible: false,
    toggleVisibility: () => {},
    zindex: 1,
    setZindex: () => {},
    bringToFront: () => {},
  },
};

const AppStateContext = createContext<AppState | undefined>(undefined);

interface AppStateProviderProps {
  children: ReactNode;
}

export const AppuStatuProvidu: React.FC<AppStateProviderProps> = ({
  children,
}) => {
  const [state, setState] = useState(initialState);

  const createToggleVisibilityHandler = (key: string) => {
    return () => {
      setState((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          isVisible: !prev[key].isVisible,
        },
      }));
    };
  };

  const createSetVolumeHandler = (key: string) => {
    return (value: number) => {
      setState((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          zindex: value,
        },
      }));
    };
  };

  const bringToFront = (key: string) => {
    const maxZindex = Object.keys(state).length;

    setState((prev) => {
      const newState = { ...prev };
      // Set the Z-Index of the selected card to the maximum
      newState[key] = { ...newState[key], zindex: maxZindex };

      // Decrease the Z-Index of other cards by one
      Object.keys(newState).forEach((cardKey) => {
        if (cardKey !== key) {
          newState[cardKey] = {
            ...newState[cardKey],
            zindex: Math.max(1, newState[cardKey].zindex - 1),
          };
        }
      });

      return newState;
    });
  };

  const contextValue: AppState = Object.keys(state).reduce((acc, key) => {
    acc[key] = {
      isVisible: state[key].isVisible,
      toggleVisibility: createToggleVisibilityHandler(key),
      zindex: state[key].zindex,
      setZindex: createSetVolumeHandler(key),
      bringToFront: () => bringToFront(key),
    };
    return acc;
  }, {} as AppState);

  return (
    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppuStatu = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
};

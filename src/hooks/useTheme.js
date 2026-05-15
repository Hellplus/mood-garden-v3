function useTheme() {
  return {
    theme: 'system',
    availableThemes: ['system', 'light', 'dark'],
    setTheme: () => {},
  }
}

export default useTheme

export const STORAGE_KEYS = {
  bookmarks: 'se-roadmap:bookmarks',
  notes: 'se-roadmap:notes',
  progress: 'se-roadmap:progress',
  // Unused: next-themes keeps the theme under its default key "theme", and visitors'
  // saved themes live there. Passing this as `storageKey` would reset them all.
  theme: 'se-roadmap:theme',
} as const;

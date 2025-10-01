// Category IDs for different types of racing as defined by the Neds API
export const GREYHOUND_CATEGORY_ID = '9daef0d7-bf3c-4f50-921d-8e818c60fe61'
export const HARNESS_CATEGORY_ID = '161d9be2-e909-4326-8c2c-35ed71fb460b'
export const HORSE_RACING_CATEGORY_ID = '4a2788f8-e825-4d36-9894-efd4baf1cfae'

// Maximum number of races to display at any time (as per requirements)
export const MAX_RACES_TO_SHOW = 5

// Grace period in seconds - races remain visible for this long after they start
// Set to 60 seconds (1 minute) as per technical requirements
export const GRACE_VISIBILITY_PERIOD_IN_SECONDS = 60

// Dictionary mapping category IDs to human-readable names
export const categoryNameDictionary = {
  [GREYHOUND_CATEGORY_ID]: 'Greyhound',
  [HARNESS_CATEGORY_ID]: 'Harness',
  [HORSE_RACING_CATEGORY_ID]: 'Horses',
}

// Type definition for category keys
export type CategoryKeyType = keyof typeof categoryNameDictionary

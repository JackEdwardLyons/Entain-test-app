export interface IRaceSummary {
  race_id: string
  race_name: string
  race_number: number
  meeting_id: string
  meeting_name: string
  category_id: string
  advertised_start: {
    seconds: number
  }
  race_form: IRaceForm
  venue_id: string
  venue_name: string
  venue_state: string
  venue_country: string
}

export interface IRaceForm {
  distance: number
  distance_type: IDistanceType
  distance_type_id: string
  track_condition: ITrackCondition
  track_condition_id: string
  weather: IWeather
  weather_id: string
  race_comment: string
  additional_data: string // JSON string that can be parsed to IAdditionalData
  generated: number
  silk_base_url: string
  race_comment_alternative: string
}

// Helper type for parsed additional data
export interface IRaceFormWithParsedData extends Omit<IRaceForm, 'additional_data'> {
  additional_data: IAdditionalData
}

export interface IWeather {
  id: string
  name: string
  short_name: string
  icon_uri: string
}

export interface ITrackCondition {
  id: string
  name: string
  short_name: string
}

export interface IDistanceType {
  id: string
  name: string
  short_name: string
}

export interface IAdditionalData {
  revealed_race_info: {
    track_name: string
    state: string
    country: string
    number: number
    race_name: string
    time: string
    class: string
    start_type: string
    prizemonies: {
      [key: string]: number
    }
    localised_prizemonies: {
      [currency: string]: {
        [key: string]: number
      }
    }
    rail_position: string
    track_direction: string
    track_surface: string
    group: string
    gait: string
    track_home_straight_metres: number
    track_circumference: number
    race_comment_provider: string
  }
}

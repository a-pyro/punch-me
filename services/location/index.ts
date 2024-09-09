import axios from 'axios'
import { useCallback, useRef, useState } from 'react'

export type GoogleMapsPlace = {
  place_id: string
  formatted_address: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
    viewport: {
      northeast: {
        lat: number
        lng: number
      }
      southwest: {
        lat: number
        lng: number
      }
    }
  }
  name: string
  rating: number
  user_ratings_total: number
  types: string[]
  opening_hours?: {
    open_now: boolean
    weekday_text: string[]
  }
  photos?: {
    height: number
    width: number
    photo_reference: string
    html_attributions: string[]
  }[]
  icon: string
  icon_background_color: string
  icon_mask_base_uri: string
  plus_code?: {
    compound_code: string
    global_code: string
  }
  price_level?: number
  reference: string
  scope: string
  vicinity: string
  permanently_closed?: boolean
  business_status?: string
  // Add other fields as needed
}

export type GoogleMapsResponse = {
  results: GoogleMapsPlace[]
  status: string
}

const baseUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json'

export const searchAddress = async (
  text: string,
): Promise<GoogleMapsPlace[]> => {
  if (text.length < 3) return []
  try {
    const response = await axios.get<GoogleMapsResponse>(baseUrl, {
      params: {
        key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
        query: text,
      },
    })
    return response.data.results.slice(0, 3)
  } catch (error) {
    console.error('Error fetching address suggestions:', error)
    return []
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- fix this
const useDebounceFn = <T>(fn: (...args: any[]) => T, delay = 500) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  return useCallback(
    (...args: unknown[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => fn(...args), delay)
    },
    [fn, delay],
  )
}

export const useAddressSuggestions = () => {
  const [addressSuggestions, setAddressSuggestions] = useState<
    GoogleMapsPlace[]
  >([])

  const handleSearch = useCallback((text: string) => {
    return searchAddress(text).then(setAddressSuggestions)
  }, [])

  const debouncedSearch: (text: string) => void = useDebounceFn(handleSearch)

  return {
    searchAddress: debouncedSearch,
    addressSuggestions,
    setAddressSuggestions,
  }
}

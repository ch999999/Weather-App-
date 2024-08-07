import React, {useEffect, useState} from 'react'
import * as Location from 'expo-location'
import {WEATHER_API_KEY} from '@env'

export function useGetWeather(){
    const [loading, setLoading] = useState(true)
    const [error, setError]:any = useState(null)
    const [weather, setWeather] = useState([])
    const [lat, setLat]:any = useState([])
    const [lon, setLon]:any = useState([])

    const fetchWeatherData = async() => {
        try{
          const res = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
          const data = await res.json()
          setWeather(data)
        }catch(error){
          setError("Could not fetch weather")
        }finally{
          setLoading(false)
        }
      }

    useEffect(()=>{
    (async() => {
        let { status} = await Location.requestForegroundPermissionsAsync()
        if(status !== 'granted'){
        setError("Permission to access location was denied");
        return
        }
        let location = await Location.getCurrentPositionAsync({})
        setLat(location.coords.latitude)
        setLon(location.coords.longitude)
        await fetchWeatherData()
    })()
    }, [lat, lon])
    return [loading, error, weather]
}
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const useFecth = (url) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await axios.get(url)
        setData(res.data)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const reFetch = async () => {
    try {
      setLoading(true)
      const res = await axios.get(url)
      setData(res.data)
      setLoading(false)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }
  
  return { data, loading, error, reFetch }
}

export default useFecth
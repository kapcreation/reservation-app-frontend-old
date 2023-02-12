import React, { useState } from 'react'
import './roomSelect.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../hooks/useFetch'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RoomSelect = ({ hotelId, onClose }) => {
  const [selectedRooms, setSelectedRooms] = useState([])
  const { data, loading, error } = useFetch(`${process.env.REACT_APP_API_URL}/hotels/${hotelId}/rooms`)
  const { dates } = useSelector(state=>state.search)
  const navigate = useNavigate()

  function getDatesInRange(startDate, endDate) {
    const start = new Date(startDate)
    const end = new Date(endDate)

    const date = new Date(start.getTime())

    const dates = []

    while (date <= end) {
      dates.push(new Date(date))
      date.setDate(date.getDate() + 1)
    }

    return dates
  }

  const allDates = getDatesInRange(dates.startDate, dates.endDate)
 
  const isAvailable = (roomNumber) => {
    const unavailable = roomNumber.unavailableDates.some((date) => {

      const timestamps = allDates.map(date=>date.getTime())

      return timestamps.includes(new Date(date).getTime())
    })

    return !unavailable
  }

  const handleSelect = (e) => {
    const checked = e.target.checked
    const value = e.target.value

    setSelectedRooms(
      checked ? [...selectedRooms, value] : selectedRooms.filter(item=> item !== value)
    )
  }
  
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/rooms/roomNumbers/setAvailable?ids=${selectedRooms.toString()}`, { dates: allDates })

      onClose()
      navigate("/")
    } catch (error) {
      console.error(error)
    }
  }
  
  if (loading) return <>Loading...</>
  return (
    <div className='room-select'>
      <form onSubmit={handleSubmit}>
        <FontAwesomeIcon 
          icon={faCircleXmark}
          className="close"
          onClick={onClose}
        />
        <span>Select your rooms:</span>
        {data.map((item, i)=>(
          <div className="item" key={i}>
            <div className="info">
              <div className="r-title"><b>{item.title}</b></div>
              <div className="r-desc">{item.desc}</div>
              <div className="r-max">Max people: {item.maxPeople}</div>
              <div className="r-price">Price: ${item.price}</div>
            </div>
            {item.roomNumbers.map((roomNumber, i)=> (
              <div className="input" key={i}>
                <label>{roomNumber.number}</label>
                <input 
                  type="checkbox" 
                  value={roomNumber._id} 
                  onChange={handleSelect} 
                  disabled={!isAvailable(roomNumber)} 
                />
              </div>
            ))}
          </div>
        ))}
        <button>Reserve Now!</button>
      </form>
    </div>
  )
}

export default RoomSelect
import React from 'react'
import axios from 'axios';
import classes from '../../css/admin_event_manager_page.module.css';

import { useDispatch } from "react-redux"
import { setDataForChange } from "../../store/userSlice"

export default function Event({ event }) {

  var username = 'sport';
  var password = '123';

  const dispatch = useDispatch()

  const deleteEvent = () => {
    axios.delete(`https://sportbox.up.railway.app/api/event/delete?id=${event.id}`,
      {
        auth: {
          username: username,
          password: password
        }
      }).then(res => {
        if (res.data.status === true) {
          console.log(res.data);
          alert(res.data.message)
          window.location.reload()
        } else {
          alert(res.data.message)
        }
      }).catch(() => {
        alert("An error occurred on the server")
      })
  }

  const changeEvent = () => {
    dispatch(setDataForChange(event))
    window.location.href = "/admin/events/change"
  }

  return (
    <div className={classes.row}>

      <div className={classes.eventIdRow}>
        {event.id}
      </div>

      <div className={classes.eventNameRow}>
        <div className={classes.fullnameCell}>
          {event.name}
        </div>
      </div>

      <div className={classes.eventEquipmentTypeRow}>
        <div className={classes.eventEquipmentTypeCell}>
          {event.inventoryType.type}
        </div>
      </div>

      <div className={classes.eventPriceRow}>
        {event.price}
      </div>

      <div className={classes.eventDataFromRow}>
        {event.startDate}
      </div>

      <div className={classes.eventDataToRow}>
        {event.endDate}
      </div>

      <div className={classes.orderActionRow}>
        <div className={classes.buttonCancel}>
          <button className={classes.cancelButton} type="button" onClick={() => deleteEvent()}>
            <div className={classes.cancelButtonText}>
              Удалить
            </div>
          </button>
        </div>
      </div>

      <div className={classes.orderActionRow}>
        <div className={classes.buttonCancel}>
          <button className={classes.cancelButton} type="button" onClick={() => changeEvent()}>
            <div className={classes.cancelButtonText}>
              Изменить
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
import React, { useState, useEffect } from 'react'
import AdminEquipmentFilterField from "./AdminEquipmentFilterField"
import AdminEquipmentList from "./AdminEquipmentList"

import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios';

export default function AdminEquipmentManagerPage() {

    var username = 'sport';
    var password = '123';
  
    const [equipments, setEquipments] = useState([])
    const [currentEquipments, setCurrentEquipments] = useState(equipments)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        axios.post("https://sportbox.up.railway.app/api/inventory/filter", {},
          {
            auth: {
              username: username,
              password: password
            }
          }).then(res => {
            console.log(res.data);
            setEquipments(res.data)
            setCurrentEquipments(res.data)
            setLoading(false)
          }).catch(() => {
            alert("An error occurred on the server")
          })
      }, [])

      const changeFilter = (equipments) => {
        setCurrentEquipments(equipments)
      }

  return (
    <div className="manager-wrapper">
    {
      loading ?
        <ClipLoader
          color={"#1C62CD"}
          loading={loading}
          size={100}
        />
        :
        <>
          <AdminEquipmentFilterField changeFilter={changeFilter} ></AdminEquipmentFilterField>
          <AdminEquipmentList equipments={currentEquipments}></AdminEquipmentList>
        </>
    }
  </div>
  )
}
import React from 'react'
import axios from 'axios';

import {useDispatch} from "react-redux"
import {setDataForChange} from "../../store/userSlice"

import classes from '../../css/admin_equipment_manager_page.module.css';

export default function Equipment({ equipment }) {

    var username = 'sport';
    var password = '123';

    const dispatch = useDispatch()

    const deleteUser = () => {
        axios.delete(`https://sportbox.up.railway.app/api/inventory/delete?id=${equipment.id}`,
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

    const changeUser = () => {
        dispatch(setDataForChange(equipment))
        window.location.href = "/admin/equipments/change"
    }

    return (
        <div className={classes.row}>

            <div className={classes.orderNumberRow}>
                {equipment.id}
            </div>

            <div className={classes.orderEquipmentRow}>

                {equipment.name}

            </div>
            <div className={classes.orderPriceRow}>
                {equipment.inventoryType.type}
            </div>

            <div className={classes.orderDataRow}>
                {equipment.inventoryType.isSizable ? equipment.size : "-"}
            </div>
            <div className={classes.orderDataFromRow}>
                {equipment.inventoryType.price}
            </div>
            <div className={classes.orderActionRow}>
                <div className={classes.buttonCancel}>
                    <button className={classes.cancelButton} type="submit" onClick={() => deleteUser()}>
                        <div className={classes.cancelButtonText}>
                            Удалить
                        </div>
                    </button>
                </div>
            </div>
            <div className={classes.orderActionRow}>
                <div className={classes.buttonCancel}>
                    <button className={classes.cancelButton} type="submit" onClick={() => changeUser()}>
                        <div className={classes.cancelButtonText}>
                            Изменить
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

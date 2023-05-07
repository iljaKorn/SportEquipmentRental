import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';

function FilterEventField({ changeFilter }) {

    var username = 'sport';
    var password = '123';

    const [typesForEvent, setTypesForEvent] = useState([])
    const [filterForEvent, setFilterForEvent] = useState({
        inventoryType: "",
        startDate: "",
        endDate: "",
    })

    useEffect(() => {
        axios.get("http://localhost:8080/api/inventory_type/get_all",
            {
                auth: {
                    username: username,
                    password: password
                }
            }).then(res => {
                setTypesForEvent(res.data)
            }).catch(() => {
                alert("An error occurred on the server")
            })
    }, [])

    const sendFilter = () => {
        axios.post("http://localhost:8080/api/event/filter", filterForEvent,
            {
                auth: {
                    username: username,
                    password: password
                }
            }).then(res => {
                console.log(res.data);
                changeFilter(res.data)
            }).catch(() => {
                alert("An error occurred on the server")
            })
    }

    const filtredInput = (event) => {
        setFilterForEvent((prev) => {
            return {
                ...prev,
                [event.target.id]: event.target.value
            }
        })

    }

    const getTypes = () => {
        return typesForEvent.map((type) => {
            return <option key={type.id} value={type.type}>{type.type}</option>;
        });
    }

    return (

        <div className="left-column-filters">
            <div className="filter-panel">

                <div className="filters-label">
                    Фильтры поиска
                </div>

                <div className="type-equipment-box">

                    <div className="label-type-equipment-box">
                        Тип оборудования:
                    </div>

                    <div className="field-type-equipment-box">
                        <select id="inventoryType" name="type-equipment" onChange={(e) => filtredInput(e)}>
                            <option key="-" value="">
                                Выберите тип
                            </option>
                            {getTypes()}
                        </select>
                    </div>
                </div>

                <div className="start-data-box">

                    <div className="label-start-data-box">
                        Дата начала:
                    </div>

                    <div className="field-start-data-box">
                        <input id="startDate" type="date" name="fullName" placeholder="гггг-мм--дд" onChange={e => filtredInput(e)}
                            minLength="4" maxLength="35" size="20"></input>
                    </div>

                </div>

                <div className="end-data-box">

                    <div className="label-end-data-box">
                        Дата окончания:
                    </div>

                    <div className="field-end-data-box">
                        <input id="endDate" type="date" name="fullName" placeholder="гггг-мм--дд" onChange={e => filtredInput(e)}
                            minLength="4" maxLength="35" size="20"></input>
                    </div>

                </div>

                <div className="button-find">
                    <button className="find-button" type="submit" onClick={sendFilter}>
                        <div className="find-button-text">
                            Найти
                        </div>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default FilterEventField;
import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function EventPage({ setIsLogged }) {

  var username = 'sport';
  var password = '123';

  const [booking, setBooking] = useState([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    axios.get(`http://localhost:8080/api/person/profile?id=${localStorage.getItem("userId")}`,
      {
        auth: {
          username: username,
          password: password
        }
      }).then(res => {
        console.log(res.data);
        setBooking(res.data.person.bookings)
        setName(res.data.person.name)
        setEmail(res.data.person.email)

      }).catch(() => {
        alert("An error occurred on the server")
      })
  }, [])

  const logOut = () => {
    localStorage.setItem("isLogged", false)
    setIsLogged(false)
    localStorage.setItem("userId", -1)
    window.location.href = "/"
  }

  const getHistory = () => {
    return booking?.map((el) => {
      return (<div className="row" key={el.id}>

        <div className="order-number-row">
          {el.id}
        </div>

        <div className="order-equipment-row">
          {el.inventory.name}
        </div>

        <div className="order-price-row">
          {el.price}
        </div>

        <div className="order-data-row">
          {el.date}
        </div>

        <div className="order-data-from-row">
          {el.startDate}
        </div>

        <div className="order-data-to-row">
          {el.endDate}
        </div>

        <div className="order-debt-row">
          {el.debt}
        </div>

        <div className="order-action-row">
          <div className="button-cancel">
            <button className="cancel-button" type="submit">
              <div className="cancel-button-text">
                Отменить
              </div>
            </button>
          </div>
        </div>

      </div>)
    });
  }

  return (
    <div className="profile-wrapper">

      <div className="information-about-user-lable">
        <p>Информация о пользователе:</p>
      </div>

      <div className="information-about-user-wrapper">

        <div className="full-name-user-lable">
          ФИО:
        </div>
        <div className="full-name-user">
          {name}
        </div>

        <div className="email-user-lable">
          Алрес эл. почты:
        </div>

        <div className="email-user">
          {email}
        </div>

      </div>

      <div className="information-about-orders-wrapper">

        <div className="information-about-orders-lable">
          История заказов:
        </div>

        <div className="column-lables">

          <div className="order-number-lable">
            №
          </div>

          <div className="order-equipment-lable">
            Оборудование
          </div>

          <div className="order-price-lable">
            Цена, руб.
          </div>

          <div className="order-data-lable">
            Дата заказа
          </div>

          <div className="order-data-from-lable">
            Дата начала
          </div>

          <div className="order-data-to-lable">
            Дата окончания
          </div>

          <div className="order-debt-lable">
            Долг, руб.
          </div>

          <div className="order-action-lable">

          </div>
        </div>

        <div className="information-about-orders-table-wrapper">
          <div className="table-rows">
            {booking?.length === 0 ? <h3>Пусто</h3> : getHistory()}
          </div>
        </div>

      </div>

      <div className="button-exit">
            <button className="exit-button" type="submit" onClick={logOut}>
                <div className="exit-button-text">
                    Выйти
                </div>
            </button>
        </div>

    </div>
  );
};
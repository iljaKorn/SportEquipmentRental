package ru.vsu.cs.sportbox.Data.Model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @Column(name = "id", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "price")
    private Double price;

    @CreationTimestamp
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "date")
    private Date date;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "start_date")
    private Date startDate;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "end_date")
    private Date endDate;

    @ManyToOne(optional = false, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "person_id")
    @JsonIgnore
    private Person person;

    @ManyToOne(optional = false, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "inventory_id")
    @JsonIgnore
    private Inventory inventory;

    @Column(name = "debt")
    private Double debt = 0.0;

    @ManyToMany(mappedBy="bookings", fetch = FetchType.EAGER)
    private List<Event> events;


    @PrePersist
    public void addBooking() {
        person.getBookings().add(this);
        inventory.getBookings().add(this);
    }

    @PreRemove
    public void removeBooking() {
        person.getBookings().remove(this);
        inventory.getBookings().remove(this);
    }

}

package ru.vsu.cs.sportbox.Controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.vsu.cs.sportbox.Responses.BookingDeleteResponse;
import ru.vsu.cs.sportbox.Service.BookingService;

@RestController
@RequestMapping("/api/booking")
@AllArgsConstructor
public class BookingController {
    private BookingService bookingService;

    @DeleteMapping("/cancel")
    public ResponseEntity<BookingDeleteResponse> deleteBookingById(@RequestParam(value="id") int id) {
        HttpStatus httpStatus;
        BookingDeleteResponse bookingDeleteResponse = bookingService.deleteBookingById(id);
        if (bookingDeleteResponse.isStatus()) {
            httpStatus = HttpStatus.OK;
        } else {
            httpStatus = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<>(bookingDeleteResponse, httpStatus);
    }
}

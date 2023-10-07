import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const numRows = 9;
const numCols = 9;

//list of booked seats
const bookedSeats = [
  { row: 1, col: 2 },
  { row: 3, col: 4 },
  { row: 4, col: 6 },
];

function SeatLayout2() {
  const [ticketType, setTicketType] = useState("");
  const [ticketCount, setTicketCount] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [message, setMessage] = useState("");
  const [availableSeats, setAvailableSeats] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ]);

  const handleSeatClick = (seat) => {
    if (availableSeats.includes(seat) && !selectedSeats.includes(seat)) {
      setSelectedSeats([...selectedSeats, seat]);
    } else if (selectedSeats.includes(seat)) {
      const updatedSelectedSeats = selectedSeats.filter(
        (selectedSeat) => selectedSeat !== seat
      );
      setSelectedSeats(updatedSelectedSeats);
    }
  };
  const seatClickHandler = (row, col) => {
    const seat = { row, col };
    const isSeatSelected = selectedSeats.some(
      (s) => s.row === row && s.col === col
    );
    const isSeatBooked = bookedSeats.some(
      (s) => s.row === row && s.col === col
    );

    if (isSeatSelected) {
      setSelectedSeats(
        selectedSeats.filter((s) => s.row !== row || s.col !== col)
      );
    } else if (!isSeatBooked) {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const isSeatAvailable = (row, col) => {
    return !bookedSeats.some((s) => s.row === row && s.col === col);
  };

  const renderSeat = (row, col) => {
    const isSeatSelected = selectedSeats.some(
      (seat) => seat.row === row && seat.col === col
    );
    const isSeatBooked = bookedSeats.some(
      (seat) => seat.row === row && seat.col === col
    );

    let seatClass = "seat";
    if (isSeatSelected) {
      seatClass += " selected";
    } else if (isSeatBooked) {
      seatClass += " booked";
    } else {
      seatClass += " available";
    }

    return (
      <span
        key={`${row}-${col}`}
        className={seatClass}
        onClick={() => {
          if (!isSeatBooked) {
            seatClickHandler(row, col);
          }
        }}
      >
        {row}
      </span>
    );
  };

  const handleProceedClick = () => {
    const updatedAvailableSeats = availableSeats.filter(
      (seat) => !selectedSeats.includes(seat)
    );
    setAvailableSeats(updatedAvailableSeats);
    setTicketType("");
    setTicketCount(0);
    setSelectedSeats([]);
  };

  return (
    <div className="App">
      <div>
        <label htmlFor="ticketType">Ticket Type:</label>
        <select
          id="ticketType"
          value={ticketType}
          onChange={(e) => setTicketType(e.target.value)}
        >
          <option value="">Select Ticket Type</option>
          <option value="First-Class">First-Class</option>
          <option value="Premium">Premium</option>
          <option value="Gold">Gold</option>
        </select>
      </div>
      <div>
        <label htmlFor="ticketCount">Ticket Count:</label>
        <input
          id="ticketCount"
          type="number"
          min="1"
          value={ticketCount}
          onChange={(e) => setTicketCount(parseInt(e.target.value))}
        />
      </div>
      <h1 className="Select-seat">[This Side Screen]</h1>

      <div className="seat-container">
        <div>
          <div className="Seat-type">First Class (A B C)</div>
          <div className="Seat-type">Premium(D E F G)</div>
          <div className="Seat-type">Gold Class(H I J)</div>
        </div>
        <div>
          <div className="order">A</div>
          <div className="order">B</div>
          <div className="order">C</div>
          <div className="order">D</div>
          <div className="order">E</div>
          <div className="order">F</div>
          <div className="order">G</div>
          <div className="order">H</div>
          <div className="order">I</div>
          <div className="order">J</div>
        </div>

        {Array.from({ length: numRows }).map((_, row) => (
          <div key={row} className="row1">
            {Array.from({ length: numCols }).map((_, col) =>
              renderSeat(row + 1, col + 1)
            )}
          </div>
        ))}
        <div className="seat-map">
          {availableSeats.map((seat) => (
            <div
              key={seat}
              className={`seat ${
                selectedSeats.includes(seat) ? "selected" : ""
              }`}
              onClick={() => handleSeatClick(seat)}
            >
              {seat}
            </div>
          ))}
        </div>

        <div className="Seat-Layout">
          <div className="available1"></div>
          <span className="key-layout">Unavailble</span>
          <div className="unavailable1"></div>
          <span className="key-layout">Availble</span>
          <div className="My-seats"></div>
          <span className="key-layout">Your-Seats</span>
        </div>
      </div>

      <div className="controls">
        <button className="btn btn-primary" onClick={handleProceedClick}>
          Proceed
        </button>
        <p className="message">{message}</p>
      </div>
    </div>
  );
}

export default SeatLayout2;

document.addEventListener('DOMContentLoaded', function () {
    const allRooms = [
        { number: 1, status: 'booked', img: 'vip-room.jpg' },
        { number: 2, status: 'booked', img: 'vip-room1.jpg' },
        { number: 3, status: 'booked', img: 'vip-room.jpg' },
        { number: 4, status: 'booked', img: 'vip-room1.jpg' },
        { number: 5, status: 'available', img: 'general.jpeg' },
        { number: 6, status: 'available', img: 'general1.jpg' },
        { number: 7, status: 'available', img: 'general.jpeg' },
        { number: 8, status: 'available', img: 'general1.jpg' },
        { number: 9, status: 'reserved', img: 'suite-room.jpg' },
        { number: 10, status: 'reserved', img: 'suite-room1.jpg' }
    ];

    // Initially render all rooms
    renderRoomCards(allRooms);

    // Event listener for filter buttons
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function () {
            const filterType = this.getAttribute('data-filter');
            filterRooms(filterType);

            // Change the button color when active
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Function to render room cards with status color and button behavior
    function renderRoomCards(rooms) {
        const roomCardsContainer = document.getElementById('room-cards');
        roomCardsContainer.innerHTML = ''; // Clear previous cards

        rooms.forEach(room => {
            const roomCard = document.createElement('div');
            roomCard.classList.add('room-card', room.status);

            // Set the status display with colors or icons
            let statusDisplay = '';
            if (room.status === 'available') {
                statusDisplay = `<span class="status available">Available</span>`;
            } else if (room.status === 'booked') {
                statusDisplay = `<span class="status booked">Booked</span>`;
            } else if (room.status === 'reserved') {
                statusDisplay = `<span class="status reserved">Reserved &#128274;</span>`; // Lock emoji
            }

            // Create the room card HTML
            roomCard.innerHTML = `
                <img src="${room.img}" alt="Room ${room.number}" class="room-img" />
                <h4>Room ${room.number}</h4>
                <p> ${statusDisplay}</p>
                <button class="btn-book" data-room-id="${room.number}" ${room.status !== 'available' ? 'disabled' : ''} 
                    onmouseover="this.style.backgroundColor='darkblue'" 
                    onmouseout="this.style.backgroundColor=''"
                    onclick="openModal(this)">
                    Book Now
                </button>
            `;
            roomCardsContainer.appendChild(roomCard);
        });
    }

    // Function to filter rooms based on status
    function filterRooms(status) {
        let filteredRooms = allRooms;

        if (status !== 'all') {
            filteredRooms = allRooms.filter(room => room.status === status);
        }

        renderRoomCards(filteredRooms);
    }
});


document.addEventListener('DOMContentLoaded', function() {
    // Initially hide the room availability section
    document.querySelector('.room-availability').style.display = 'none';

    // Event listener for the search button
    document.getElementById('search-rooms').addEventListener('click', function() {
        const checkinDate = new Date(document.getElementById('checkin').value);
        const checkoutDate = new Date(document.getElementById('checkout').value);
        const today = new Date();
        
        // Validate if dates are for the next week
        if (checkinDate > today && checkinDate <= new Date(today.setDate(today.getDate() + 7)) && checkoutDate > checkinDate) {
            updateRoomAvailability(checkinDate, checkoutDate);
            // Show the room availability section
            document.querySelector('.room-availability').style.display = 'block';
        } else {
            alert("Please select valid dates for next week.");
        }
    });

    // Event listener for filter buttons
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            const filterType = this.getAttribute('data-filter');
            filterRooms(filterType);
        });
    });

    // Function to update the room availability table
    function updateRoomAvailability(checkinDate, checkoutDate) {
        const rooms = [
            { number: 1, status: 'available' },
            { number: 2, status: 'reserved' },
            { number: 3, status: 'reserved' },
            { number: 4, status: 'available' },
            { number: 5, status: 'available' },
            { number: 6, status: 'reserved' },
            { number: 7, status: 'booked' },
            { number: 8, status: 'available' },
            { number: 9, status: 'available' },
            { number: 10, status: 'reserved' },
        ];

        renderRoomTable(rooms, checkinDate, checkoutDate);
    }

    // Function to render the table
    function renderRoomTable(rooms, checkinDate, checkoutDate) {
        let availabilityHtml = `
            <table>
                <tr>
                    <th>Room Number</th>
                    <th>Status</th>
                    <th>Check-in Date</th>
                    <th>Check-out Date</th>
                    <th>Timing</th>
                </tr>`;
        
        rooms.forEach(room => {
            let statusSymbol = '';
            if (room.status === 'available') {
                statusSymbol = '<span style="color: green;">●</span>';
            } else if (room.status === 'booked') {
                statusSymbol = '<span style="color: red;">●</span>';
            } else if (room.status === 'reserved') {
                statusSymbol = '🔒';
            }
            
            availabilityHtml += `
                <tr data-room-status="${room.status}">
                    <td>Room ${room.number}</td>
                    <td>${statusSymbol}</td>
                    <td>${checkinDate.toLocaleDateString()}</td>
                    <td>${checkoutDate.toLocaleDateString()}</td>
                    <td>${checkinDate.getHours()}:${checkinDate.getMinutes().toString().padStart(2, '0')} - ${checkoutDate.getHours()}:${checkoutDate.getMinutes().toString().padStart(2, '0')}</td>
                </tr>`;
        });
        
        availabilityHtml += '</table>';
        
        document.getElementById('room-availability').innerHTML = availabilityHtml;

        // Display the check-in and check-out dates
        document.getElementById('dates-display').innerHTML = `
            <p>Check-in Date: ${checkinDate.toLocaleDateString()}</p>
            <p>Check-out Date: ${checkoutDate.toLocaleDateString()}</p>
        `;
    }

    // Function to filter rooms based on status
    function filterRooms(status) {
        console.log(`Filtering rooms by status: ${status}`); // Log the filter type

        // Retrieve the check-in and check-out dates from the displayed table
        const checkinDate = new Date(document.getElementById('checkin').value);
        const checkoutDate = new Date(document.getElementById('checkout').value);
        
        const allRooms = [
            { number: 1, status: 'available' },
            { number: 2, status: 'reserved' },
            { number: 3, status: 'reserved' },
            { number: 4, status: 'available' },
            { number: 5, status: 'available' },
            { number: 6, status: 'reserved' },
            { number: 7, status: 'booked' },
            { number: 8, status: 'available' },
            { number: 9, status: 'available' },
            { number: 10, status: 'reserved' },
        ];

        const filteredRooms = allRooms.filter(room => status === 'all' || room.status === status);
        renderRoomTable(filteredRooms, checkinDate, checkoutDate);
    }
});

// // Function to open the booking modal and auto-fill room details
// function openModal(button) {
//     const roomId = button.getAttribute('data-room-id');
//     const modal = document.getElementById('bookingModal');
//     const roomIdField = document.getElementById('roomId');

//     // Set the room ID in the form
//     roomIdField.value = roomId;

//     // Display the modal
//     modal.style.display = 'block';
// }

// // Close the modal
// document.getElementById('closeModal').addEventListener('click', function() {
//     document.getElementById('bookingModal').style.display = 'none';
// });

// // Close modal if user clicks outside of it
// window.onclick = function(event) {
//     const modal = document.getElementById('bookingModal');
//     if (event.target == modal) {
//         modal.style.display = 'none';
//     }
// };

// Function to open the booking modal and auto-fill room details
function openModal(button) {
    const roomId = button.getAttribute('data-room-id');
    const modal = document.getElementById('bookingModal');
    const roomIdField = document.getElementById('roomId');

    // Set the room ID in the form
    roomIdField.value = roomId;

    // Display the modal
    modal.style.display = 'block';
}

// Close the modal
document.getElementById('closeModal').addEventListener('click', function () {
    document.getElementById('bookingModal').style.display = 'none';
});

// Close modal if user clicks outside of it
window.onclick = function (event) {
    const modal = document.getElementById('bookingModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

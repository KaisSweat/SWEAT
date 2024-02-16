// src/data/mockData.js

const mockData = {
  venues: [
    {
      id: 'venue1',
      name: 'Raach Gym',
      type: ['Gym', 'Yoga'],
      rating: 4.9,
      distance: 340,
      description: 'Private Gym, Strength & Cardio, Gym, Yoga',
      address: '11 rue des palmiers',
      area: 'Bardo',
      latitude: 59.9139,
      longitude: 10.7522,
      image: 'https://www.dropbox.com/scl/fi/wqm6t2mw938janw39rq9u/salle-de-sport2.jpg?rlkey=vjsu0hsc6nubpzvbikfedpk0u&dl=1',
    },
    // Add more venues as needed...
  ],
  classes: [
    {
      id: 'class1',
      venueId: 'venue1',
      name: 'Morning Yoga',
      startTime: '2024-02-13T08:00:00Z',
      endTime: '2024-02-13T09:00:00Z',
      coach: 'Alice Johnson',
      description: 'Energize your body and mind with our morning yoga session.',
      availableSpots: 10,
      bookingDeadline: '2024-02-13T07:00:00Z',
      checkInStart: '2024-02-13T07:30:00Z',
      checkInEnd: '2024-02-13T08:15:00Z',
      cancellationDeadline: '2024-02-12T20:00:00Z',
    },
    {
      id: 'class2',
      venueId: 'venue1',
      name: 'HIIT Circuit',
      startTime: '2024-02-14T010:00:00Z',
      endTime: '2024-02-14T011:00:00Z',
      coach: 'Bob Smith',
      description: 'High-intensity interval training to boost your metabolism.',
      availableSpots: 5,
      bookingDeadline: '2024-02-14T09:00:00Z',
      checkInStart: '2024-02-13T09:30:00Z',
      checkInEnd: '2024-02-13T10:15:00Z',
      cancellationDeadline: '2024-02-13T20:00:00Z',
    },


    // Add more classes as needed...
  ],
  users: [
    {
      id: 'user1',
      name: 'John Doe',
      email: 'john@example.com',
      // Assuming bookings will be filled later as references to 'bookings' collection
    },
    // Add more users as needed...
  ],
  bookings: [
    {
      id: 'booking1',
      classId: 'class1',
      userId: 'user1',
      status: 'booked',
      bookingTime: '2024-02-12T15:00:00Z',
      // userCheckInTime can be updated later when the user checks in
    },
    // Add more bookings as needed...
  ],
};

export default mockData;

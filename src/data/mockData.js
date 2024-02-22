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
      area: 'Ensjø',
      latitude: 59.9139,
      longitude: 10.7522,
      image: 'https://www.dropbox.com/scl/fi/wqm6t2mw938janw39rq9u/salle-de-sport2.jpg?rlkey=vjsu0hsc6nubpzvbikfedpk0u&dl=1',
    },
  
    {
      id: 'venue2',
      name: 'Urban Wellness',
      type: ['Wellness', 'Meditation'],
      rating: 4.8,
      distance: 600,
      description: 'A serene space for meditation and wellness workshops.',
      address: '22 Peace Avenue',
      area: 'Downtown',
      latitude: 59.9250,
      longitude: 10.7600,
      image: 'https://www.dropbox.com/scl/fi/qy1dhmnrrk50hj7xfy3wo/salle-de-sport3.jpg?rlkey=cg018ft0bn6aeifde1s0y83f7&dl=1',

    },

    {
    id: 'venue3',
    name: 'Zen Yoga Studio',
    type: ['Yoga', 'Pilates'],
    rating: 5.0,
    distance: 300,
    description: 'A tranquil space for yoga and Pilates enthusiasts.',
    address: '5 Harmony Way',
    area: 'Serenity',
    latitude: 59.9150,
    longitude: 10.7450,
    image: 'https://www.dropbox.com/scl/fi/j8pfuwaqbh7mcajcj2k1c/salle-de-sport6.jpg?rlkey=0ytsm8j5m76r5ekf3ple0uw2d&dl=1',
    },

    {
    id: 'venue4',
    name: 'Peak Performance',
    type: ['Climbing', 'Fitness'],
    rating: 4.9,
    distance: 450,
    description: 'Climbing gym and fitness center for all skill levels.',
    address: '88 Summit St.',
    area: 'Highland',
    latitude: 59.9300,
    longitude: 10.7400,
    image: 'https://www.dropbox.com/scl/fi/2gdqujtx6dnlm77tyyz3j/salle-de-sport5.jpg?rlkey=f45yktixz9roxi8ekpbtoh6p6&dl=1',
    },
    // Add more venues as needed...
  ],
  classes: [
    {
      id: 'class1',
      venueId: 'venue1',
      name: 'Morning Yoga',
      startTime: '2024-02-20T11:00:00Z',
      endTime: '2024-02-20T12:00:00Z',
      coach: 'Alice Johnson',
      description: 'Energize your body and mind with our morning yoga session.',
      availableSpots: 10,
      bookingDeadline: '2024-02-20T07:00:00Z',
      checkInStart: '2024-02-20T10:30:00Z',
      checkInEnd: '2024-02-20T08:15:00Z',
      cancellationDeadline: '2024-02-19T20:00:00Z',
    },
    {
      id: 'class2',
      venueId: 'venue1',
      name: 'HIIT Circuit',
      startTime: '2024-02-21T010:00:00Z',
      endTime: '2024-02-21T011:00:00Z',
      coach: 'Bob Smith',
      description: 'High-intensity interval training to boost your metabolism.',
      availableSpots: 5,
      bookingDeadline: '2024-02-11T09:00:00Z',
      checkInStart: '2024-02-21T09:30:00Z',
      checkInEnd: '2024-02-21T10:15:00Z',
      cancellationDeadline: '2024-02-21T20:00:00Z',
    },

    {
      id:'class3',
      venueId:'venue2',
      name: 'Vinyasa Flow',
      startTime: '2024-02-22T010:00:00Z',
      endTime: '2024-02-22T011:00:00Z',
      coach: 'Yogi Anna',
      description: 'Fluid yoga sequences to enhance flexibility and strength.',
      availableSpots: 18,
      bookingDeadline: '2024-02-22T09:00:00Z',
      checkInStart: '2024-02-22T09:30:00Z',
      checkInEnd: '2024-02-22T10:15:00Z',
      cancellationDeadline: '2024-02-22T20:00:00Z',
    },
    
    {
      id:'class4',
      venueId:'venue3',
      name: 'Mat Pilates',
      startTime: '2024-02-23T010:00:00Z',
      endTime: '2024-02-23T011:00:00Z',
      coach: 'Pilates Master Kim',
      description: 'Core-strengthening Pilates on the mat for all levels.',
      availableSpots: 15,
      bookingDeadline: '2024-02-23T09:00:00Z',
      checkInStart: '2024-02-23T09:30:00Z',
      checkInEnd: '2024-02-23T10:15:00Z',
      cancellationDeadline: '2024-02-23T20:00:00Z',
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
      venueId: 'venue1',
      userId: 'user1',
      status: 'booked',
      bookingTime: '2024-02-22T15:00:00Z',
      // userCheckInTime can be updated later when the user checks in
    },
    // Add more bookings as needed...
  ],
};

export default mockData;

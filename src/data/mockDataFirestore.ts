const mockData = [
  {
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
    classes: [
      {
        name: 'Morning Yoga',
        startTime: new Date('2024-02-13T08:00:00'),
        endTime: new Date('2024-02-13T09:00:00'),
        coach: 'Alice Johnson',
        description: 'Energize your body and mind with our morning yoga session.',
        availableSpots: 10,
        bookingDeadline: new Date('2024-02-13T07:00:00'), // 1 hour before start
        checkInStart: new Date('2024-02-13T07:30:00'), // 30 minutes before start
        checkInEnd: new Date('2024-02-13T08:15:00'), // 15 minutes after start
        cancellationDeadline: new Date('2024-02-12T20:00:00'), // Day before at 8 PM
      },
      {
        name: 'HIIT Circuit',
        startTime: new Date('2024-02-14T08:00:00'),
        endTime: new Date('2024-02-14T09:00:00'),
        coach: 'Bob Smith',
        description: 'High-intensity interval training to boost your metabolism.',
        availableSpots: 8,
        bookingDeadline: new Date('2024-02-14T07:00:00'), // 1 hour before start
        checkInStart: new Date('2024-02-14T07:30:00'), // 30 minutes before start
        checkInEnd: new Date('2024-02-14T08:15:00'), // 15 minutes after start
        cancellationDeadline: new Date('2024-02-13T20:00:00'), // Day before at 8 PM
      },
    ],
  },
  {
    name: 'Downtown Fitness',
    type: ['Fitness', 'Wellness'],
    rating: 4.7,
    distance: 520,
    description: 'Downtown Fitness, your go-to place for wellness and strength training.',
    address: 'Malerhaugveien 34B',
    area: 'Ensjø',
    latitude: 59.9140,
    longitude: 10.7530,
    image: 'https://www.dropbox.com/scl/fi/wqm6t2mw938janw39rq9u/salle-de-sport2.jpg?rlkey=vjsu0hsc6nubpzvbikfedpk0u&dl=1',
    classes: [
      {
        name: 'Powerlifting 101',
        startTime: new Date('2024-02-15T09:00:00'),
        endTime: new Date('2024-02-15T10:00:00'),
        coach: 'Carlton Banks',
        description: 'Learn the basics of powerlifting with our expert coach.',
        availableSpots: 6,
        bookingDeadline: new Date('2024-02-15T08:00:00'), // 1 hour before start
        checkInStart: new Date('2024-02-15T08:30:00'), // 30 minutes before start
        checkInEnd: new Date('2024-02-15T08:15:00'), // 15 minutes after start
        cancellationDeadline: new Date('2024-02-14T20:00:00'), // Day before at 8 PM
      },
      {
        name: 'Evening Pilates',
        startTime: new Date('2024-02-13T06:00:00'),
        endTime: new Date('2024-02-13T07:00:00'),
        coach: 'Janet Hubert',
        description: 'Unwind after a long day with a session of pilates.',
        availableSpots: 12,
        bookingDeadline: new Date('2024-02-13T05:00:00'), // 1 hour before start
        checkInStart: new Date('2024-02-13T05:30:00'), // 30 minutes before start
        checkInEnd: new Date('2024-02-13T06:15:00'), // 15 minutes after start
        cancellationDeadline: new Date('2024-02-12T20:00:00'), // Day before at 8 PM
      },
    ],
  },
  // Additional venues
  {
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
    classes: [
      {
        name: 'Guided Meditation',
        startTime: new Date('2024-02-16T06:00:00'),
        endTime: new Date('2024-02-16T07:00:00'),
        coach: 'Guru Dave',
        description: 'Start your day with peace and mindfulness with our guided meditation.',
        availableSpots: 15,
        bookingDeadline: new Date('2024-02-16T05:00:00'), // 1 hour before start
        checkInStart: new Date('2024-02-16T05:30:00'), // 30 minutes before start
        checkInEnd: new Date('2024-02-16T06:15:00'), // 15 minutes after start
        cancellationDeadline: new Date('2024-02-15T20:00:00'), // Day before at 8 PM
      },
      {
        name: 'Wellness Workshop',
        startTime: new Date('2024-02-16T09:00:00'),
        endTime: new Date('2024-02-16T10:00:00'),
        coach: 'Dr. Linda',
        description: 'Learn wellness techniques to improve your daily life.',
        availableSpots: 20,
        bookingDeadline: new Date('2024-02-16T08:00:00'), // 1 hour before start
        checkInStart: new Date('2024-02-16T07:30:00'), // 30 minutes before start
        checkInEnd: new Date('2024-02-16T09:15:00'), // 15 minutes after start
        cancellationDeadline: new Date('2024-02-15T20:00:00'), // Day before at 8 PM
      },
    ],
  },
  {
    name: 'City Sports Club',
    type: ['Gym', 'Swimming'],
    rating: 4.6,
    distance: 400,
    description: 'All-in-one sports facility with a gym and indoor swimming pool.',
    address: '47 Sporty Lane',
    area: 'Midtown',
    latitude: 59.9200,
    longitude: 10.7500,
    image: 'https://www.dropbox.com/scl/fi/0inn4s83zjazhh8r26vkt/salle-de-sport4.jpg?rlkey=uzgqm02cjaiw8zp8jldpgrebq&dl=1',
    classes: [
      {
        name: 'Aqua Aerobics',
        startTime: new Date('2024-02-17T09:00:00'),
        endTime: new Date('2024-02-17T10:00:00'),
        coach: 'Aqua Jane',
        description: 'Energize your body with low-impact aquatic exercises.',
        availableSpots: 12,
        bookingDeadline: new Date('2024-02-17T08:00:00'), // 1 hour before start
        checkInStart: new Date('2024-02-17T07:30:00'), // 30 minutes before start
        checkInEnd: new Date('2024-02-17T09:15:00'), // 15 minutes after start
        cancellationDeadline: new Date('2024-02-16T20:00:00'), // Day before at 8 PM
      },
      {
        name: 'Total Body Workout',
        startTime: new Date('2024-02-18T09:00:00'),
        endTime: new Date('2024-02-18T10:00:00'),
        coach: 'Coach Mike',
        description: 'A full-body workout to tone and strengthen.',
        availableSpots: 10,
        bookingDeadline: new Date('2024-02-18T08:00:00'), // 1 hour before start
        checkInStart: new Date('2024-02-18T07:30:00'), // 30 minutes before start
        checkInEnd: new Date('2024-02-18T09:15:00'), // 15 minutes after start
        cancellationDeadline: new Date('2024-02-17T20:00:00'), // Day before at 8 PM
      },
    ],
  },
  {
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
    classes: [
      {
        name: 'Beginner Climbing',
        startTime: new Date('2024-02-19T09:00:00'),
        endTime: new Date('2024-02-19T10:00:00'),
        coach: 'Climber Joe',
        description: 'Learn the basics of rock climbing in a safe and fun environment.',
        availableSpots: 8,
        bookingDeadline: new Date('2024-02-19T08:00:00'), // 1 hour before start
        checkInStart: new Date('2024-02-19T07:30:00'), // 30 minutes before start
        checkInEnd: new Date('2024-02-19T09:15:00'), // 15 minutes after start
        cancellationDeadline: new Date('2024-02-18T20:00:00'), // Day before at 8 PM
      },
      {
        name: 'Advanced Fitness Training',
        startTime: new Date('2024-02-20T09:00:00'),
        endTime: new Date('2024-02-20T10:00:00'),
        coach: 'Trainer Max',
        description: 'Push your limits with high-intensity training.',
        availableSpots: 10,
        bookingDeadline: new Date('2024-02-20T08:00:00'), // 1 hour before start
        checkInStart: new Date('2024-02-20T07:30:00'), // 30 minutes before start
        checkInEnd: new Date('2024-02-20T09:15:00'), // 15 minutes after start
        cancellationDeadline: new Date('2024-02-18T20:00:00'), // Day before at 8 PM
      },
    ],
  },
  {
    name: 'Zen Yoga Studio',
    type: ['Yoga', 'Pilates'],
    rating: 5.0,
    distance: 300,
    description: 'A tranquil space for yoga and Pilates enthusiasts.',
    address: '5 Harmony Way',
    area: 'Serenity',
    latitude: 59.9150,
    longitude: 10.7450,
    image: 'https://www.dropbox.com/scl/fi/qy1dhmnrrk50hj7xfy3wo/salle-de-sport3.jpg?rlkey=cg018ft0bn6aeifde1s0y83f7&dl=1',
    classes: [
      {
        name: 'Vinyasa Flow',
        startTime: new Date('2024-02-21T09:00:00'),
        endTime: new Date('2024-02-21T10:00:00'),
        coach: 'Yogi Anna',
        description: 'Fluid yoga sequences to enhance flexibility and strength.',
        availableSpots: 18,
        bookingDeadline: new Date('2024-02-21T08:00:00'), // 1 hour before start
        checkInStart: new Date('2024-02-21T07:30:00'), // 30 minutes before start
        checkInEnd: new Date('2024-02-21T09:15:00'), // 15 minutes after start
        cancellationDeadline: new Date('2024-02-20T20:00:00'), // Day before at 8 PM
      },
      {
        name: 'Mat Pilates',
        startTime: new Date('2024-02-22T09:00:00'),
        endTime: new Date('2024-02-22T10:00:00'),
        coach: 'Pilates Master Kim',
        description: 'Core-strengthening Pilates on the mat for all levels.',
        availableSpots: 15,
        bookingDeadline: new Date('2024-02-22T08:00:00'), // 1 hour before start
        checkInStart: new Date('2024-02-22T07:30:00'), // 30 minutes before start
        checkInEnd: new Date('2024-02-22T09:15:00'), // 15 minutes after start
        cancellationDeadline: new Date('2024-02-21T20:00:00'), // Day before at 8 PM
      },
    ],
  }
];

export default mockData;
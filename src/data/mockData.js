

const mockData = [
  {
    id: '1',
    name: 'Raach Gym',
    type: ['Gym', 'Yoga'],
    rating: 4.9,
    distance: 340,
    description: 'Private Gym, Strength & Cardio, Gym, Yoga',
    address: '11 rue des palmiers',
    area:'Bardo',
    latitude: 59.9139,
    longitude: 10.7522,
    image: require('../assets/images/salle-de-sport.jpg'), // Update the path as necessary
    classes: [
      {
        id: 'c1',
        name: 'Morning Yoga',
        startTime: '08:00 AM',
        endTime: '09:00 AM',
        duration: '60 min',
        coach: 'Alice Johnson',
        description: 'Energize your body and mind with our morning yoga session.',
        availableSpots: 10,
      },
      {
        id: 'c2',
        name: 'HIIT Circuit',
        startTime: '05:00 PM',
        endTime: '06:00 PM',
        duration: '60 min',
        coach: 'Bob Smith',
        description: 'High-intensity interval training to boost your metabolism.',
        availableSpots: 8,
      }
    ]
  },
  {
    id: '2',
    name: 'Downtown Fitness',
    type: ['Fitness', 'Wellness'],
    rating: 4.7,
    distance: 520,
    address: 'Malerhaugveien 34B',
    area:'Ensjø',
    description: 'Downtown Fitness, your go-to place for wellness and strength training.',
    latitude: 59.9140,
    longitude: 10.7530,
    image: require('../assets/images/salle-de-sport2.jpg'), // Update the path as necessary
    classes: [
      {
        id: 'c3',
        name: 'Powerlifting 101',
        startTime: '07:00 AM',
        endTime: '08:00 AM',
        duration: '60 min',
        coach: 'Carlton Banks',
        description: 'Learn the basics of powerlifting with our expert coach.',
        availableSpots: 6,
      },
      {
        id: 'c4',
        name: 'Evening Pilates',
        startTime: '06:00 PM',
        endTime: '07:00 PM',
        duration: '60 min',
        coach: 'Janet Hubert',
        description: 'Unwind after a long day with a session of pilates.',
        availableSpots: 12,
      }
    ]
  }
];

export default mockData;




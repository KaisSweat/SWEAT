// Assuming this file is located at src/data/mockData.ts
// Remove the image requires and id fields from your mock data

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
      // Assume that you have URLs for the images or remove the field if not needed
      image: 'https://www.dropbox.com/scl/fi/qdol4d9k0c01g95jf29pq/salle-de-sport.jpg?rlkey=wlg9bt1ek4080ejuw5hjbzq0j&dl=1', 
      classes: [
        {
          name: 'Morning Yoga',
          startTime: '08:00 AM',
          endTime: '09:00 AM',
          duration: '60 min',
          coach: 'Alice Johnson',
          description: 'Energize your body and mind with our morning yoga session.',
          availableSpots: 10,
        },
        {
          name: 'HIIT Circuit',
          startTime: '05:00 PM',
          endTime: '06:00 PM',
          duration: '60 min',
          coach: 'Bob Smith',
          description: 'High-intensity interval training to boost your metabolism.',
          availableSpots: 8,
        },
      ],
    },
    {
      name: 'Downtown Fitness',
      type: ['Fitness', 'Wellness'],
      rating: 4.7,
      distance: 520,
      address: 'Malerhaugveien 34B',
      area: 'Ensjø',
      description: 'Downtown Fitness, your go-to place for wellness and strength training.',
      latitude: 59.9140,
      longitude: 10.7530,
      image: 'https://www.dropbox.com/scl/fi/wqm6t2mw938janw39rq9u/salle-de-sport2.jpg?rlkey=vjsu0hsc6nubpzvbikfedpk0u&dl=1',
      classes: [
        {
          name: 'Powerlifting 101',
          startTime: '07:00 AM',
          endTime: '08:00 AM',
          duration: '60 min',
          coach: 'Carlton Banks',
          description: 'Learn the basics of powerlifting with our expert coach.',
          availableSpots: 6,
        },
        {
          name: 'Evening Pilates',
          startTime: '06:00 PM',
          endTime: '07:00 PM',
          duration: '60 min',
          coach: 'Janet Hubert',
          description: 'Unwind after a long day with a session of pilates.',
          availableSpots: 12,
        },
      ],
    },
  ];
  
  export default mockData;
  
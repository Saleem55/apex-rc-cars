import rcCar1 from '../assets/rc_car_1.jpg';
import rcCar2 from '../assets/rc_car_2.jpg';
import rcCar3 from '../assets/rc_car_3.jpg';
import rcCar4 from '../assets/rc_car_4.jpg';
import rcCar5 from '../assets/rc_car_5.jpg';
import rcCarHero from '../assets/rc_car_hero.png';

export const products = [
  {
    id: 'pretender-24',
    name: 'Pretender 24 RC Buggy',
    tagline: 'High-Speed LED-Suspended Off-Road Racer',
    price: 1499,
    currencySymbol: '₹',
    currency: 'INR',
    rating: 4.9,
    reviewsCount: 128,
    description: 'Dominate any terrain with the Pretender 24. Featuring a high-torque motor, advanced 4WD drivetrain, and an independent suspension system illuminated by vibrant blue LED shocks, this buggy is designed to perform day or night. The package includes an ergonomic 2.4GHz remote control, high-capacity rechargeable battery, charging cable, and water filler.',
    images: [
      rcCarHero,
      rcCar1,
      rcCar2,
      rcCar3,
      rcCar4,
      rcCar5
    ],
    imageCaptions: [
      'Pretender 24 Action Shot',
      'Top-down view of the red buggy with transmitter, charging cable, and water dropper',
      'Close-up of the rear dual shock absorbers with glowing blue LED coils',
      'Front-facing profile showing aggressive wheel stance and suspension springs',
      'Close-up view of the rear wing chassis and LED wiring system',
      'Wide angle photo showcasing the buggy on a wooden table setup'
    ],
    specs: [
      {
        icon: 'Zap',
        title: 'Drive System',
        value: '4-Wheel Drive (4WD)',
        description: 'Maximum traction and power delivery to all four rugged rubber tires.'
      },
      {
        icon: 'Sparkles',
        title: 'LED Suspension',
        value: 'Illuminated Independent Shocks',
        description: 'Vibrant blue LED-lit suspension springs for night racing and off-road stability.'
      },
      {
        icon: 'Radio',
        title: 'Remote Control',
        value: '2.4GHz Ergonomic Transmitter',
        description: 'Interference-free control with long range and precise throttle/steering response.'
      },
      {
        icon: 'BatteryCharging',
        title: 'Power Source',
        value: 'USB Quick-Rechargeable',
        description: 'Easy charging with the included USB cable and rechargeable Li-Po battery pack.'
      }
    ],
    details: [
      { name: 'Model Scale', value: '1:16 Scale' },
      { name: 'Top Speed', value: '25 km/h' },
      { name: 'Control Range', value: 'Over 50 meters' },
      { name: 'Run Time', value: '20-25 minutes per charge' },
      { name: 'Chassis Material', value: 'Heavy-Duty ABS & Metal Reinforcements' },
      { name: 'Special Features', value: 'Suspension-integrated LED glow, Water-mist exhaust simulator' }
    ],
    reviews: [
      {
        id: 1,
        author: 'Marcus K.',
        rating: 5,
        date: '2026-06-15',
        comment: 'This buggy is absolutely insane! The LED shocks look amazing when racing in the dark. It is fast, handles bumps like a champ, and has taken some hard crashes without a scratch. Highly recommend!',
      },
      {
        id: 2,
        author: 'Sarah T.',
        rating: 5,
        date: '2026-06-20',
        comment: 'Bought this as a gift for my son, and we both love playing with it. The battery charges pretty fast and the remote is really easy to hold and control. The headlights and blue lights are a huge plus.',
      },
      {
        id: 3,
        author: 'Alex D.',
        rating: 4,
        date: '2026-06-25',
        comment: 'Really solid build quality. The 4WD handles grass and gravel easily. The suspension works perfectly. Battery life is around 22 minutes. Great value for the price.',
      }
    ]
  }
];

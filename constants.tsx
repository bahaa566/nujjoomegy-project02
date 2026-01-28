
import { PlayerPosition, PlayerProfile } from './types';

export const MOCK_PLAYERS: PlayerProfile[] = [
  {
    id: 'p1',
    name: 'Mohamed Zaki',
    age: 19,
    position: PlayerPosition.ST,
    club: 'Al Ahly Youth',
    location: 'Cairo',
    image: 'https://picsum.photos/seed/p1/400/400',
    stats: { pace: 92, shooting: 88, passing: 75, dribbling: 85, defending: 30, physical: 78 }
  },
  {
    id: 'p2',
    name: 'Ahmed Hassan',
    age: 21,
    position: PlayerPosition.CM,
    club: 'Zamalek SC',
    location: 'Giza',
    image: 'https://picsum.photos/seed/p2/400/400',
    stats: { pace: 78, shooting: 72, passing: 89, dribbling: 82, defending: 65, physical: 75 }
  },
  {
    id: 'p3',
    name: 'Omar Marmoush Jr.',
    age: 18,
    position: PlayerPosition.LW,
    club: 'Pyramids FC',
    location: 'New Cairo',
    image: 'https://picsum.photos/seed/p3/400/400',
    stats: { pace: 95, shooting: 81, passing: 79, dribbling: 90, defending: 25, physical: 70 }
  },
  {
    id: 'p4',
    name: 'Youssef Ibrahim',
    age: 20,
    position: PlayerPosition.CB,
    club: 'Al Ittihad',
    location: 'Alexandria',
    image: 'https://picsum.photos/seed/p4/400/400',
    stats: { pace: 72, shooting: 45, passing: 68, dribbling: 60, defending: 88, physical: 92 }
  },
  {
    id: 'p5',
    name: 'Kareem Fouad',
    age: 17,
    position: PlayerPosition.RW,
    club: 'Wadi Degla',
    location: 'Maadi',
    image: 'https://picsum.photos/seed/p5/400/400',
    stats: { pace: 88, shooting: 76, passing: 82, dribbling: 87, defending: 45, physical: 65 }
  },
  {
    id: 'p6',
    name: 'Hossam Ashour II',
    age: 22,
    position: PlayerPosition.CM,
    club: 'ENPPI',
    location: 'Cairo',
    image: 'https://picsum.photos/seed/p6/400/400',
    stats: { pace: 70, shooting: 65, passing: 85, dribbling: 78, defending: 82, physical: 80 }
  }
];

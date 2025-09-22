
export type Language = 'en' | 'hi' | 'ta' | 'te' | 'bn' | 'mr' | 'kn';

export interface User {
  id: string;
  phone: string;
  name: string;
  avatar: string;
}

export interface GameState {
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  badges: string[]; // array of badge IDs
  wallet: number;
  inventory: {
    itemId: string;
    nameKey: string;
    icon: string;
    quantity: number;
    category: 'Crops' | 'Tools' | 'Services';
  }[];
  completedGuideTasks: string[];
}

export interface Badge {
  id: string;
  nameKey: string;
  descriptionKey: string;
  icon: string;
}

export interface DailyTask {
  id:string;
  titleKey: string;
  xp: number;
  completed: boolean;
}

export interface SustainableQuestTask {
  day: number;
  titleKey: string;
  descriptionKey: string;
  xp: number;
}

export interface Crop {
  id: string;
  nameKey: string;
  icon: string;
  growthDays: number;
  questTasks: SustainableQuestTask[];
  harvestBonus: number;
}

export interface PlantedCropState {
  cropId: string;
  plantedDate: string; // ISO String
  completedTasks: Record<number, boolean>; // Key is the day
}


export interface QuizQuestion {
  id: string;
  questionKey: string;
  optionsKey: string[];
  correctOptionIndex: number;
}

export interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  contentKey: string;
  timestamp: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  village: string;
  district: string;
  state: string;
}

export interface MarketplaceListing {
    id: string;
    sellerName: string;
    itemNameKey: string;
    itemIcon: string;
    category: 'Crops' | 'Tools' | 'Services';
    price: number;
    quantity: number;
}

export interface GuideTask {
  id: string;
  titleKey: string;
  xp: number;
}

export interface Guide {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  tasks: GuideTask[];
}

export interface FarmingTip {
  id: string;
  titleKey: string;
  causeKey: string;
  tipsKey: string; // "tip1|tip2|tip3"
}
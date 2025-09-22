
import { User, GameState, DailyTask, Crop, QuizQuestion, CommunityPost, LeaderboardUser, Badge, MarketplaceListing, Guide, FarmingTip } from './types';

// Mock Data
const MOCK_USER: User = {
  id: 'user-1',
  phone: '9876543210',
  name: 'Alex Farmer',
  avatar: `https://i.pravatar.cc/150?u=alexfarmer`,
};

const MOCK_GAME_STATE: GameState = {
  level: 5,
  xp: 120,
  xpToNextLevel: 500,
  streak: 12,
  badges: ['newbie', 'green-thumb'],
  wallet: 1000,
  inventory: [
    { itemId: 'tomato', nameKey: 'crop_tomato', icon: '🍅', quantity: 20, category: 'Crops' },
    { itemId: 'wheat', nameKey: 'crop_wheat', icon: '🌾', quantity: 50, category: 'Crops' },
  ],
  completedGuideTasks: ['wc_task_1'],
};

const MOCK_ALL_BADGES: Badge[] = [
    { id: 'newbie', nameKey: 'badge_newbie_name', descriptionKey: 'badge_newbie_desc', icon: '🔰' },
    { id: 'green-thumb', nameKey: 'badge_green_thumb_name', descriptionKey: 'badge_green_thumb_desc', icon: '👍' },
    { id: 'first-harvest', nameKey: 'badge_first_harvest_name', descriptionKey: 'badge_first_harvest_desc', icon: '🎉' },
    { id: 'quiz-master', nameKey: 'badge_quiz_master_name', descriptionKey: 'badge_quiz_master_desc', icon: '🧠' },
    { id: 'streaker', nameKey: 'badge_streaker_name', descriptionKey: 'badge_streaker_desc', icon: '🔥' },
    { id: 'community-helper', nameKey: 'badge_community_helper_name', descriptionKey: 'badge_community_helper_desc', icon: '🧑‍🤝‍🧑' },
];

const MOCK_DAILY_TASKS: DailyTask[] = [
  { id: 'task-1', titleKey: 'task_water_plants', xp: 20, completed: false },
  { id: 'task-2', titleKey: 'task_check_soil', xp: 15, completed: true },
  { id: 'task-3', titleKey: 'task_read_article', xp: 30, completed: false },
];

const MOCK_CROPS: Crop[] = [
  {
    id: 'crop-1',
    nameKey: 'crop_tomato',
    icon: '🍅',
    growthDays: 60,
    harvestBonus: 20,
    questTasks: [
      { day: 1, titleKey: 'tomato_quest_day1_title', descriptionKey: 'tomato_quest_day1_desc', xp: 15 },
      { day: 2, titleKey: 'tomato_quest_day2_title', descriptionKey: 'tomato_quest_day2_desc', xp: 10 },
      { day: 7, titleKey: 'tomato_quest_day7_title', descriptionKey: 'tomato_quest_day7_desc', xp: 10 },
      { day: 12, titleKey: 'tomato_quest_day12_title', descriptionKey: 'tomato_quest_day12_desc', xp: 5 },
      { day: 18, titleKey: 'tomato_quest_day18_title', descriptionKey: 'tomato_quest_day18_desc', xp: 10 },
      { day: 25, titleKey: 'tomato_quest_day25_title', descriptionKey: 'tomato_quest_day25_desc', xp: 15 },
      { day: 30, titleKey: 'tomato_quest_day30_title', descriptionKey: 'tomato_quest_day30_desc', xp: 10 },
      { day: 35, titleKey: 'tomato_quest_day35_title', descriptionKey: 'tomato_quest_day35_desc', xp: 20 },
      { day: 40, titleKey: 'tomato_quest_day40_title', descriptionKey: 'tomato_quest_day40_desc', xp: 15 },
      { day: 45, titleKey: 'tomato_quest_day45_title', descriptionKey: 'tomato_quest_day45_desc', xp: 20 },
      { day: 52, titleKey: 'tomato_quest_day52_title', descriptionKey: 'tomato_quest_day52_desc', xp: 15 },
      { day: 60, titleKey: 'tomato_quest_day60_title', descriptionKey: 'tomato_quest_day60_desc', xp: 100 },
    ],
  },
   {
    id: 'crop-2',
    nameKey: 'crop_wheat',
    icon: '🌾',
    growthDays: 120,
    harvestBonus: 100,
    questTasks: [
        { day: 1, titleKey: 'wheat_quest_day1_title', descriptionKey: 'wheat_quest_day1_desc', xp: 15 },
        { day: 15, titleKey: 'wheat_quest_day15_title', descriptionKey: 'wheat_quest_day15_desc', xp: 20 },
        { day: 30, titleKey: 'wheat_quest_day30_title', descriptionKey: 'wheat_quest_day30_desc', xp: 15 },
        { day: 45, titleKey: 'wheat_quest_day45_title', descriptionKey: 'wheat_quest_day45_desc', xp: 25 },
        { day: 60, titleKey: 'wheat_quest_day60_title', descriptionKey: 'wheat_quest_day60_desc', xp: 20 },
        { day: 75, titleKey: 'wheat_quest_day75_title', descriptionKey: 'wheat_quest_day75_desc', xp: 25 },
        { day: 90, titleKey: 'wheat_quest_day90_title', descriptionKey: 'wheat_quest_day90_desc', xp: 20 },
        { day: 120, titleKey: 'wheat_quest_day120_title', descriptionKey: 'wheat_quest_day120_desc', xp: 150 },
    ],
  },
  {
    id: 'crop-3',
    nameKey: 'crop_corn',
    icon: '🌽',
    growthDays: 90,
    harvestBonus: 30,
    questTasks: [
        { day: 1, titleKey: 'corn_quest_day1_title', descriptionKey: 'corn_quest_day1_desc', xp: 20 },
        { day: 10, titleKey: 'corn_quest_day10_title', descriptionKey: 'corn_quest_day10_desc', xp: 15 },
        { day: 25, titleKey: 'corn_quest_day25_title', descriptionKey: 'corn_quest_day25_desc', xp: 20 },
        { day: 40, titleKey: 'corn_quest_day40_title', descriptionKey: 'corn_quest_day40_desc', xp: 25 },
        { day: 60, titleKey: 'corn_quest_day60_title', descriptionKey: 'corn_quest_day60_desc', xp: 15 },
        { day: 75, titleKey: 'corn_quest_day75_title', descriptionKey: 'corn_quest_day75_desc', xp: 10 },
        { day: 90, titleKey: 'corn_quest_day90_title', descriptionKey: 'corn_quest_day90_desc', xp: 120 },
    ]
  },
  {
    id: 'crop-4',
    nameKey: 'crop_potato',
    icon: '🥔',
    growthDays: 100,
    harvestBonus: 50,
    questTasks: [
      { day: 1, titleKey: 'potato_quest_day1_title', descriptionKey: 'potato_quest_day1_desc', xp: 15 },
      { day: 10, titleKey: 'potato_quest_day10_title', descriptionKey: 'potato_quest_day10_desc', xp: 20 },
      { day: 25, titleKey: 'potato_quest_day25_title', descriptionKey: 'potato_quest_day25_desc', xp: 20 },
      { day: 40, titleKey: 'potato_quest_day40_title', descriptionKey: 'potato_quest_day40_desc', xp: 25 },
      { day: 55, titleKey: 'potato_quest_day55_title', descriptionKey: 'potato_quest_day55_desc', xp: 20 },
      { day: 70, titleKey: 'potato_quest_day70_title', descriptionKey: 'potato_quest_day70_desc', xp: 15 },
      { day: 90, titleKey: 'potato_quest_day90_title', descriptionKey: 'potato_quest_day90_desc', xp: 10 },
      { day: 100, titleKey: 'potato_quest_day100_title', descriptionKey: 'potato_quest_day100_desc', xp: 130 },
    ],
  },
  {
    id: 'crop-5',
    nameKey: 'crop_carrot',
    icon: '🥕',
    growthDays: 75,
    harvestBonus: 40,
    questTasks: [
      { day: 1, titleKey: 'carrot_quest_day1_title', descriptionKey: 'carrot_quest_day1_desc', xp: 20 },
      { day: 15, titleKey: 'carrot_quest_day15_title', descriptionKey: 'carrot_quest_day15_desc', xp: 15 },
      { day: 30, titleKey: 'carrot_quest_day30_title', descriptionKey: 'carrot_quest_day30_desc', xp: 15 },
      { day: 45, titleKey: 'carrot_quest_day45_title', descriptionKey: 'carrot_quest_day45_desc', xp: 25 },
      { day: 60, titleKey: 'carrot_quest_day60_title', descriptionKey: 'carrot_quest_day60_desc', xp: 10 },
      { day: 75, titleKey: 'carrot_quest_day75_title', descriptionKey: 'carrot_quest_day75_desc', xp: 110 },
    ],
  },
  {
    id: 'crop-6',
    nameKey: 'crop_spinach',
    icon: '🥬',
    growthDays: 45,
    harvestBonus: 60,
    questTasks: [
      { day: 1, titleKey: 'spinach_quest_day1_title', descriptionKey: 'spinach_quest_day1_desc', xp: 15 },
      { day: 10, titleKey: 'spinach_quest_day10_title', descriptionKey: 'spinach_quest_day10_desc', xp: 10 },
      { day: 20, titleKey: 'spinach_quest_day20_title', descriptionKey: 'spinach_quest_day20_desc', xp: 20 },
      { day: 30, titleKey: 'spinach_quest_day30_title', descriptionKey: 'spinach_quest_day30_desc', xp: 20 },
      { day: 45, titleKey: 'spinach_quest_day45_title', descriptionKey: 'spinach_quest_day45_desc', xp: 90 },
    ],
  },
];

const MOCK_QUIZ: QuizQuestion[] = [
    {
        id: 'q1',
        questionKey: 'quiz_q1',
        optionsKey: 'quiz_q1_opts'.split(','),
        correctOptionIndex: 0,
    },
    {
        id: 'q2',
        questionKey: 'quiz_q2',
        optionsKey: 'quiz_q2_opts'.split(','),
        correctOptionIndex: 0,
    },
];

const MOCK_POSTS: CommunityPost[] = [
    { id: 'post-1', author: 'Jane Doe', avatar: 'https://i.pravatar.cc/150?u=janedoe', contentKey: 'post_1', timestamp: '2 hours ago' },
    { id: 'post-2', author: 'John Smith', avatar: 'https://i.pravatar.cc/150?u=johnsmith', contentKey: 'post_2', timestamp: '5 hours ago' },
    { id: 'post-3', author: 'Alex Farmer', avatar: `https://i.pravatar.cc/150?u=alexfarmer`, contentKey: 'post_3', timestamp: '1 day ago' },
];

const MOCK_LEADERBOARD: LeaderboardUser[] = [
    { rank: 1, name: 'EcoWarrior', avatar: 'https://i.pravatar.cc/150?u=ecowarrior', level: 15, xp: 15200, state: 'Maharashtra', district: 'Pune', village: 'Khed' },
    { rank: 2, name: 'CropMaster', avatar: 'https://i.pravatar.cc/150?u=cropmaster', level: 14, xp: 14800, state: 'Karnataka', district: 'Bengaluru Urban', village: 'Anekal' },
    { rank: 3, name: 'Jane Doe', avatar: 'https://i.pravatar.cc/150?u=janedoe', level: 12, xp: 12300, state: 'Maharashtra', district: 'Pune', village: 'Manchar' },
    { rank: 4, name: 'John Smith', avatar: 'https://i.pravatar.cc/150?u=johnsmith', level: 10, xp: 10500, state: 'Karnataka', district: 'Bengaluru Urban', village: 'Yelahanka' },
    { rank: 5, name: 'Alex Farmer', avatar: `https://i.pravatar.cc/150?u=alexfarmer`, level: 5, xp: 5120, state: 'Maharashtra', district: 'Satara', village: 'Wai' },
    { rank: 6, name: 'Terra Grower', avatar: 'https://i.pravatar.cc/150?u=terragrower', level: 9, xp: 9500, state: 'Karnataka', district: 'Mysuru', village: 'Hunsur' },
];

const MOCK_MARKETPLACE_LISTINGS: MarketplaceListing[] = [
    { id: 'm-1', sellerName: 'CropMaster', itemNameKey: 'crop_corn', itemIcon: '🌽', category: 'Crops', price: 25, quantity: 100 },
    { id: 'm-2', sellerName: 'EcoWarrior', itemNameKey: 'item_shovel', itemIcon: '⛏️', category: 'Tools', price: 250, quantity: 5 },
    { id: 'm-3', sellerName: 'Terra Grower', itemNameKey: 'service_soil_test', itemIcon: '🧪', category: 'Services', price: 500, quantity: 10 },
    { id: 'm-4', sellerName: 'Jane Doe', itemNameKey: 'item_watering_can', itemIcon: '💧', category: 'Tools', price: 120, quantity: 8 },
    { id: 'm-5', sellerName: 'John Smith', itemNameKey: 'item_seeds_tomato', itemIcon: '🍅', category: 'Crops', price: 20, quantity: 200 },
];

const MOCK_GUIDES: Guide[] = [
    {
        id: 'water-conservation',
        titleKey: 'guide_water_conservation_title',
        descriptionKey: 'guide_water_conservation_desc',
        icon: '💧',
        tasks: [
            { id: 'wc_task_1', titleKey: 'guide_water_conservation_task_1_title', xp: 30 },
            { id: 'wc_task_2', titleKey: 'guide_water_conservation_task_2_title', xp: 20 },
            { id: 'wc_task_3', titleKey: 'guide_water_conservation_task_3_title', xp: 15 },
            { id: 'wc_task_4', titleKey: 'guide_water_conservation_task_4_title', xp: 40 },
            { id: 'wc_task_5', titleKey: 'guide_water_conservation_task_5_title', xp: 25 },
        ],
    },
    {
        id: 'crop-rotation',
        titleKey: 'guide_crop_rotation_title',
        descriptionKey: 'guide_crop_rotation_desc',
        icon: '♻️',
        tasks: [
            { id: 'cr_task_1', titleKey: 'guide_crop_rotation_task_1_title', xp: 35 },
            { id: 'cr_task_2', titleKey: 'guide_crop_rotation_task_2_title', xp: 25 },
            { id: 'cr_task_3', titleKey: 'guide_crop_rotation_task_3_title', xp: 20 },
            { id: 'cr_task_4', titleKey: 'guide_crop_rotation_task_4_title', xp: 30 },
            { id: 'cr_task_5', titleKey: 'guide_crop_rotation_task_5_title', xp: 15 },
        ],
    },
    {
        id: 'composting-101',
        titleKey: 'guide_composting_101_title',
        descriptionKey: 'guide_composting_101_desc',
        icon: '🍂',
        tasks: [
            { id: 'c1_task_1', titleKey: 'guide_composting_101_task_1_title', xp: 20 },
            { id: 'c1_task_2', titleKey: 'guide_composting_101_task_2_title', xp: 25 },
            { id: 'c1_task_3', titleKey: 'guide_composting_101_task_3_title', xp: 25 },
            { id: 'c1_task_4', titleKey: 'guide_composting_101_task_4_title', xp: 15 },
            { id: 'c1_task_5', titleKey: 'guide_composting_101_task_5_title', xp: 30 },
        ],
    },
    {
        id: 'natural-pest-control',
        titleKey: 'guide_natural_pest_control_title',
        descriptionKey: 'guide_natural_pest_control_desc',
        icon: '🐞',
        tasks: [
            { id: 'npc_task_1', titleKey: 'guide_natural_pest_control_task_1_title', xp: 30 },
            { id: 'npc_task_2', titleKey: 'guide_natural_pest_control_task_2_title', xp: 20 },
            { id: 'npc_task_3', titleKey: 'guide_natural_pest_control_task_3_title', xp: 25 },
            { id: 'npc_task_4', titleKey: 'guide_natural_pest_control_task_4_title', xp: 20 },
            { id: 'npc_task_5', titleKey: 'guide_natural_pest_control_task_5_title', xp: 15 },
        ],
    },
];

const MOCK_FARMING_TIPS: FarmingTip[] = [
    {
        id: 'tip-drought',
        titleKey: 'tip_drought_title',
        causeKey: 'tip_drought_cause',
        tipsKey: 'tip_drought_tips'
    },
    {
        id: 'tip-flood',
        titleKey: 'tip_flood_title',
        causeKey: 'tip_flood_cause',
        tipsKey: 'tip_flood_tips'
    },
    {
        id: 'tip-fertilizer',
        titleKey: 'tip_fertilizer_shortage_title',
        causeKey: 'tip_fertilizer_shortage_cause',
        tipsKey: 'tip_fertilizer_shortage_tips'
    },
    {
        id: 'tip-seed',
        titleKey: 'tip_seed_shortage_title',
        causeKey: 'tip_seed_shortage_cause',
        tipsKey: 'tip_seed_shortage_tips'
    },
];


// Mock API Functions
const sleep = <T,>(ms: number, data: T): Promise<T> => new Promise(resolve => setTimeout(() => resolve(data), ms));

export const loginWithPhone = async (phone: string, otp: string): Promise<{ user: User }> => {
    console.log(`Logging in with phone: ${phone}, otp: ${otp}`);
    if (otp === '1234') { // Dummy OTP check
        return sleep(500, { user: MOCK_USER });
    }
    throw new Error('Invalid OTP');
};

export const guestLogin = async (): Promise<{ user: User }> => {
    return sleep(300, { user: { ...MOCK_USER, name: 'Guest Farmer' }});
}

export const fetchGameState = async (): Promise<GameState> => sleep(500, MOCK_GAME_STATE);
export const fetchAllBadges = async (): Promise<Badge[]> => sleep(500, MOCK_ALL_BADGES);
export const fetchDailyTasks = async (): Promise<DailyTask[]> => sleep(500, MOCK_DAILY_TASKS);
export const fetchCrops = async (): Promise<Crop[]> => sleep(500, MOCK_CROPS);
export const fetchQuiz = async (): Promise<QuizQuestion[]> => sleep(500, MOCK_QUIZ);
export const fetchCommunityPosts = async (): Promise<CommunityPost[]> => sleep(500, MOCK_POSTS);
export const fetchLeaderboard = async (): Promise<LeaderboardUser[]> => sleep(500, MOCK_LEADERBOARD);
export const fetchMarketplaceListings = async (): Promise<MarketplaceListing[]> => sleep(500, MOCK_MARKETPLACE_LISTINGS);
export const fetchGuides = async (): Promise<Guide[]> => sleep(500, MOCK_GUIDES);
export const fetchFarmingTips = async (): Promise<FarmingTip[]> => sleep(500, MOCK_FARMING_TIPS);
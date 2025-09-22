# AgriPlay — Gamified Sustainable Farming

**Short description:** AgriPlay is a gamified system designed to promote sustainable farming practices by engaging users with quests, points, levels, and social features. This README section summarizes the implemented features (excluding the unimplemented weather API and AI chatbot) and where to find them in the codebase.

## Implemented features

### Phone authentication (UI-only demo)

- **What it is:** Phone authentication (UI-only demo).
- **Where to find it:**
  - `AgriPlay-main/App.tsx`
  - `AgriPlay-main/locales/bn.json`
  - `AgriPlay-main/locales/en.json`
  - `AgriPlay-main/locales/hi.json`
  - `AgriPlay-main/locales/kn.json`
  - `AgriPlay-main/locales/mr.json`
  - `AgriPlay-main/locales/ta.json`
  - `AgriPlay-main/locales/te.json`
  - `AgriPlay-main/services.ts`
- **Example code snippets (for quick lookup):**
  - `... journey.","phonelabel":"phone number","otplabel":"enter otp","loginbutton":"login","sendotpbutton":"send otp","guestlog...`
  - `... loginwithphone = async (phone: string, otp: string): promise<{ user: user }> => {     console.log(`logging in with phon...`
  - `...িখুন।",   "phonelabel": "ফোন নম্বর",   "otplabel": "ওটিপি লিখুন",   "loginbutton": "লগইন",   "sendotpbutton": "ওটিপি পাঠ...`

### User authentication (login/signup)

- **What it is:** User authentication (login/signup).
- **Where to find it:**
  - `AgriPlay-main/App.tsx`
  - `AgriPlay-main/locales/bn.json`
  - `AgriPlay-main/locales/en.json`
  - `AgriPlay-main/locales/hi.json`
  - `AgriPlay-main/locales/kn.json`
  - `AgriPlay-main/locales/mr.json`
  - `AgriPlay-main/locales/ta.json`
  - `AgriPlay-main/locales/te.json`
  - `AgriPlay-main/services.ts`
  - `AgriPlay-main/types.ts`
- **Example code snippets (for quick lookup):**
  - `...t --- const en = {"appname":"agriplay","logintitle":"welcome to the farm!","loginsubtitle":"enter your phone to start yo...`
  - `...) => resolve(data), ms));  export const loginwithphone = async (phone: string, otp: string): promise<{ user: user }> => ...`
  - `... {   "appname": "এগ্রিপ্লে",   "logintitle": "খামারে স্বাগতম!",   "loginsubtitle": "আপনার যাত্রা শুরু করতে আপনার...`

### Leaderboard / Competitive scoring

- **What it is:** Leaderboard / Competitive scoring.
- **Where to find it:**
  - `AgriPlay-main/App.tsx`
  - `AgriPlay-main/locales/bn.json`
  - `AgriPlay-main/locales/en.json`
  - `AgriPlay-main/locales/hi.json`
  - `AgriPlay-main/locales/kn.json`
  - `AgriPlay-main/locales/mr.json`
  - `AgriPlay-main/locales/ta.json`
  - `AgriPlay-main/locales/te.json`
  - `AgriPlay-main/metadata.json`
  - `AgriPlay-main/services.ts`
  - and 1 more files.
- **Example code snippets (for quick lookup):**
  - `...ask, crop, quizquestion, communitypost, leaderboarduser, badge, plantedcropstate, sustainablequesttask, marketplacelisti...`
  - `..., crop guides, quizzes, and a community leaderboard to make learning about agriculture fun and engaging.",   "requestfra...`
  - `...ask, crop, quizquestion, communitypost, leaderboarduser, badge, marketplacelisting, guide, farmingtip } from './types'; ...`

### Quests / Tasks system

- **What it is:** Quests / Tasks system.
- **Where to find it:**
  - `AgriPlay-main/App.tsx`
  - `AgriPlay-main/locales/bn.json`
  - `AgriPlay-main/locales/en.json`
  - `AgriPlay-main/locales/hi.json`
  - `AgriPlay-main/locales/kn.json`
  - `AgriPlay-main/locales/mr.json`
  - `AgriPlay-main/locales/ta.json`
  - `AgriPlay-main/locales/te.json`
  - `AgriPlay-main/metadata.json`
  - `AgriPlay-main/services.ts`
  - and 1 more files.
- **Example code snippets (for quick lookup):**
  - `..., user, gamestate, dailytask, crop, quizquestion, communitypost, leaderboarduser, badge, plantedcropstate, sustainablequ...`
  - `...ut agriculture fun and engaging.",   "requestframepermissions": [] }...`
  - `...{ user, gamestate, dailytask, crop, quizquestion, communitypost, leaderboarduser, badge, marketplacelisting, guide, farm...`

### Points & Badges (reward system)

- **What it is:** Points & Badges (reward system).
- **Where to find it:**
  - `AgriPlay-main/App.tsx`
  - `AgriPlay-main/locales/bn.json`
  - `AgriPlay-main/locales/en.json`
  - `AgriPlay-main/locales/hi.json`
  - `AgriPlay-main/locales/kn.json`
  - `AgriPlay-main/locales/mr.json`
  - `AgriPlay-main/locales/ta.json`
  - `AgriPlay-main/locales/te.json`
  - `AgriPlay-main/services.ts`
  - `AgriPlay-main/types.ts`
- **Example code snippets (for quick lookup):**
  - `...estion, communitypost, leaderboarduser, badge, plantedcropstate, sustainablequesttask, marketplacelisting, guide, guidet...`
  - `...estion, communitypost, leaderboarduser, badge, marketplacelisting, guide, farmingtip } from './types';  // mock data con...`
  - `...onextlevel: number;   streak: number;   badges: string[]; // array of badge ids   wallet: number;   inventory: {     ite...`

### Levels & Progression

- **What it is:** Levels & Progression.
- **Where to find it:**
  - `AgriPlay-main/App.tsx`
  - `AgriPlay-main/locales/bn.json`
  - `AgriPlay-main/locales/en.json`
  - `AgriPlay-main/locales/hi.json`
  - `AgriPlay-main/locales/kn.json`
  - `AgriPlay-main/locales/mr.json`
  - `AgriPlay-main/locales/ta.json`
  - `AgriPlay-main/locales/te.json`
  - `AgriPlay-main/services.ts`
  - `AgriPlay-main/types.ts`
- **Example code snippets (for quick lookup):**
  - `...ervillage":"village","filterall":"all","level":"level","streak":"day streak","dailytaskstitle":"daily missions","dashboa...`
  - `... const mock_game_state: gamestate = {   level: 5,   xp: 120,   xptonextlevel: 500,   streak: 12,   badges: ['newbie', 'g...`
  - `...ring; }  export interface gamestate {   level: number;   xp: number;   xptonextlevel: number;   streak: number;   badges...`

### Profiles / User dashboard

- **What it is:** Profiles / User dashboard.
- **Where to find it:**
  - `AgriPlay-main/App.tsx`
  - `AgriPlay-main/locales/bn.json`
  - `AgriPlay-main/locales/en.json`
  - `AgriPlay-main/locales/hi.json`
  - `AgriPlay-main/locales/kn.json`
  - `AgriPlay-main/locales/mr.json`
  - `AgriPlay-main/locales/ta.json`
  - `AgriPlay-main/locales/te.json`
- **Example code snippets (for quick lookup):**
  - `...estloginbutton":"continue as guest","navdashboard":"dashboard","navcrops":"my crops","navlearn":"learn & grow","navcommu...`
  - `...ton": "অতিথি হিসাবে চালিয়ে যান",   "navdashboard": "ড্যাশবোর্ড",   "navcrops": "আমার ফসল",   "navlearn": "শিখুন ও বাড়ু...`
  - `...oginbutton": "continue as guest",   "navdashboard": "dashboard",   "navcrops": "my crops",   "navlearn": "learn & grow",...`

### Plant / Crop management & logging

- **What it is:** Plant / Crop management & logging.
- **Where to find it:**
  - `AgriPlay-main/App.tsx`
  - `AgriPlay-main/locales/bn.json`
  - `AgriPlay-main/locales/en.json`
  - `AgriPlay-main/locales/hi.json`
  - `AgriPlay-main/locales/kn.json`
  - `AgriPlay-main/locales/mr.json`
  - `AgriPlay-main/locales/ta.json`
  - `AgriPlay-main/locales/te.json`
  - `AgriPlay-main/metadata.json`
  - `AgriPlay-main/services.ts`
  - and 1 more files.
- **Example code snippets (for quick lookup):**
  - `... communitypost, leaderboarduser, badge, plantedcropstate, sustainablequesttask, marketplacelisting, guide, guidetask, fa...`
  - `...  { id: 'task-1', titlekey: 'task_water_plants', xp: 20, completed: false },   { id: 'task-2', titlekey: 'task_check_soi...`
  - `...rvestbonus: number; }  export interface plantedcropstate {   cropid: string;   planteddate: string; // iso string   comp...`

### Plans / Subscriptions / Plans listing

- **What it is:** Plans / Subscriptions / Plans listing.
- **Where to find it:**
  - `AgriPlay-main/App.tsx`
  - `AgriPlay-main/locales/bn.json`
  - `AgriPlay-main/locales/en.json`
  - `AgriPlay-main/locales/hi.json`
  - `AgriPlay-main/locales/kn.json`
  - `AgriPlay-main/locales/mr.json`
  - `AgriPlay-main/locales/ta.json`
  - `AgriPlay-main/locales/te.json`
  - `AgriPlay-main/services.ts`
  - `AgriPlay-main/types.ts`
- **Example code snippets (for quick lookup):**
  - `... communitypost, leaderboarduser, badge, plantedcropstate, sustainablequesttask, marketplacelisting, guide, guidetask, fa...`
  - `...  { id: 'task-1', titlekey: 'task_water_plants', xp: 20, completed: false },   { id: 'task-2', titlekey: 'task_check_soi...`
  - `...rvestbonus: number; }  export interface plantedcropstate {   cropid: string;   planteddate: string; // iso string   comp...`

### Community / Forum / Comments

- **What it is:** Community / Forum / Comments.
- **Where to find it:**
  - `AgriPlay-main/App.tsx`
  - `AgriPlay-main/locales/bn.json`
  - `AgriPlay-main/locales/en.json`
  - `AgriPlay-main/locales/hi.json`
  - `AgriPlay-main/locales/kn.json`
  - `AgriPlay-main/locales/mr.json`
  - `AgriPlay-main/locales/ta.json`
  - `AgriPlay-main/locales/te.json`
  - `AgriPlay-main/metadata.json`
  - `AgriPlay-main/package-lock.json`
  - and 2 more files.
- **Example code snippets (for quick lookup):**
  - `...mestate, dailytask, crop, quizquestion, communitypost, leaderboarduser, badge, plantedcropstate, sustainablequesttask, m...`
  - `...fied tasks, crop guides, quizzes, and a community leaderboard to make learning about agriculture fun and engaging.",   "...`
  - `...mestate, dailytask, crop, quizquestion, communitypost, leaderboarduser, badge, marketplacelisting, guide, farmingtip } f...`

### Recommendations & Tips (static)

- **What it is:** Recommendations & Tips (static).
- **Where to find it:**
  - `AgriPlay-main/App.tsx`
  - `AgriPlay-main/locales/bn.json`
  - `AgriPlay-main/locales/en.json`
  - `AgriPlay-main/locales/hi.json`
  - `AgriPlay-main/locales/kn.json`
  - `AgriPlay-main/locales/mr.json`
  - `AgriPlay-main/locales/ta.json`
  - `AgriPlay-main/locales/te.json`
  - `AgriPlay-main/services.ts`
  - `AgriPlay-main/types.ts`
- **Example code snippets (for quick lookup):**
  - `...e":"encourage birds to visit","dashboardtipstitle":"farming tips & solutions","tip_drought_title":"sudden drought","tip_...`
  - `...       ],     }, ];  const mock_farming_tips: farmingtip[] = [     {         id: 'tip-drought',         titlekey: 'tip_d...`
  - `...titlekey: string;   causekey: string;   tipskey: string; // "tip1|tip2|tip3" }...`

### Image upload / Gallery

- **What it is:** Image upload / Gallery.
- **Where to find it:**
  - `AgriPlay-main/index.html`
- **Example code snippets (for quick lookup):**
  - `...f-g" />     <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewbox=%220 0 100 100...`

### Store / Inventory / Market

- **What it is:** Store / Inventory / Market.
- **Where to find it:**
  - `AgriPlay-main/.gitignore`
  - `AgriPlay-main/App.tsx`
  - `AgriPlay-main/locales/bn.json`
  - `AgriPlay-main/locales/en.json`
  - `AgriPlay-main/locales/hi.json`
  - `AgriPlay-main/locales/kn.json`
  - `AgriPlay-main/locales/mr.json`
  - `AgriPlay-main/locales/ta.json`
  - `AgriPlay-main/locales/te.json`
  - `AgriPlay-main/services.ts`
  - and 1 more files.
- **Example code snippets (for quick lookup):**
  - `...de/* !.vscode/extensions.json .idea .ds_store *.suo *.ntvs* *.njsproj *.sln *.sw? ...`
  - `...plantedcropstate, sustainablequesttask, marketplacelisting, guide, guidetask, farmingtip } from './types'; import * as a...`
  - `... communitypost, leaderboarduser, badge, marketplacelisting, guide, farmingtip } from './types';  // mock data const mock...`

### Backend APIs (express / REST / firebase)

- **What it is:** Backend APIs (express / REST / firebase).
- **Where to find it:**
  - `AgriPlay-main/App.tsx`
  - `AgriPlay-main/index.html`
  - `AgriPlay-main/services.ts`
  - `AgriPlay-main/vite.config.ts`
- **Example code snippets (for quick lookup):**
  - `...armingtip } from './types'; import * as api from './services';  // --- i18n data & context --- const en = {"appname":"ag...`
  - `...="preconnect" href="https://fonts.googleapis.com">     <link rel="preconnect" href="https://fonts.gstatic.com" crossorig...`
  - `...seed_shortage_tips'     }, ];   // mock api functions const sleep = <t,>(ms: number, data: t): promise<t> => new promise...`

### Static demo pages (landing, about, contact)

- **What it is:** Static demo pages (landing, about, contact).
- **Where to find it:**
  - `AgriPlay-main/App.tsx`
  - `AgriPlay-main/locales/bn.json`
  - `AgriPlay-main/locales/en.json`
  - `AgriPlay-main/locales/hi.json`
  - `AgriPlay-main/locales/kn.json`
  - `AgriPlay-main/locales/mr.json`
  - `AgriPlay-main/locales/ta.json`
  - `AgriPlay-main/locales/te.json`
  - `AgriPlay-main/metadata.json`
  - `AgriPlay-main/services.ts`
- **Example code snippets (for quick lookup):**
  - `...to_quest_day2_desc":"plant tomato seeds about 1/4 inch deep in the prepared soil.","tomato_quest_day7_title":"gentle wat...`
  - `... community leaderboard to make learning about agriculture fun and engaging.",   "requestframepermissions": [] }...`
  - `...o_quest_day2_desc": "plant tomato seeds about 1/4 inch deep in the prepared soil.",   "tomato_quest_day7_title": "gentle...`

### Export/Import (csv etc.)

- **What it is:** Export/Import (csv etc.).
- **Where to find it:**
  - `AgriPlay-main/App.tsx`
  - `AgriPlay-main/index.html`
  - `AgriPlay-main/index.tsx`
  - `AgriPlay-main/locales/en.json`
  - `AgriPlay-main/services.ts`
  - `AgriPlay-main/tsconfig.json`
  - `AgriPlay-main/types.ts`
  - `AgriPlay-main/vite.config.ts`
- **Example code snippets (for quick lookup):**
  - `.../>       </route>     </routes>   ); }; export const root: fc = () => {   return (     <authprovider>       <i18nprovide...`
  - `... settimeout(() => resolve(data), ms));  export const loginwithphone = async (phone: string, otp: string): promise<{ user...`
  - `... export type language = 'en' | 'hi' | 'ta' | 'te' | 'bn' | 'mr' | 'kn';  export i...`

## Quick start (from project root)

```bash
npm install
npm run dev
```

## Notes

- The automated scan looked for common keywords and file locations. It may miss features that are implemented under less-obvious names or in binary files.
- The README intentionally excludes the **weather API** and the **AI chatbot** because they are not implemented.

If you'd like, I can:
- expand any feature entry into a longer description with example screenshots (if present),
- produce a TOC,
- or convert this into a full `README.md` and save it inside the repository for you.

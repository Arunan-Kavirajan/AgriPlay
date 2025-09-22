
import React, { useState, useEffect, createContext, useContext, useCallback, useMemo, ReactNode, FC } from 'react';
import { HashRouter, Link, Navigate, Route, Routes, useLocation, useParams, useNavigate, Outlet } from 'react-router-dom';
import { Language, User, GameState, DailyTask, Crop, QuizQuestion, CommunityPost, LeaderboardUser, Badge, PlantedCropState, SustainableQuestTask, MarketplaceListing, Guide, GuideTask, FarmingTip } from './types';
import * as api from './services';

// --- I18N DATA & CONTEXT ---
const en = {"appName":"AgriPlay","loginTitle":"Welcome to the Farm!","loginSubtitle":"Enter your phone to start your journey.","phoneLabel":"Phone Number","otpLabel":"Enter OTP","loginButton":"Login","sendOtpButton":"Send OTP","guestLoginButton":"Continue as Guest","navDashboard":"Dashboard","navCrops":"My Crops","navLearn":"Learn & Grow","navCommunity":"Community","navLeaderboard":"Leaderboard","navBadges":"Badges","navMarketplace":"Marketplace","backToDashboard":"← Back to Dashboard","communityTitle":"Community Hub","leaderboardTitle":"Farmer Leaderboard","filterState":"State","filterDistrict":"District","filterVillage":"Village","filterAll":"All","level":"Level","streak":"Day Streak","dailyTasksTitle":"Daily Missions","dashboardQuestTitle":"Active Quest","dashboardQuestNone":"No active crop quest.","dashboardQuestStart":"Start a Quest","dashboardQuestToday":"Today's Task (Day {day})","dashboardQuestView":"View Quest Log","badgesTitle":"My Badges","viewAllBadges":"View All","badgeCollectionTitle":"My Badge Collection","taskCompleteButton":"Claim","levelUpTitle":"LEVEL UP!","levelUpSubtitle":"You've reached level {level}!","levelUpClose":"Awesome!","cropsTitle":"Start a New Farming Quest","plantButton":"Plant This Crop","selectCrop":"Select a Crop","addNewCrop":"Add New Crop","cropQuestTitle":"{cropName} Quest","cropQuestDay":"Day {day}","cropQuestComplete":"Complete","cropQuestCompleted":"Completed","cropQuestLocked":"Locked","quizTitle":"Farming Quiz","quizScore":"You scored {score} out of {total}!","quizXP":"You earned {xp} XP!","quizNext":"Next Question","quizFinish":"Finish Quiz","communityFeed":"Feed","communityLeaderboard":"Leaderboard","postPlaceholder":"Share a tip or update...","postButton":"Post","leaderboardRank":"Rank","leaderboardPlayer":"Player","leaderboardLevel":"Level","leaderboardXP":"Total XP","task_water_plants":"Water Your Plants","task_check_soil":"Check Soil Moisture","task_read_article":"Read a Farming Article","crop_tomato":"Tomato","crop_wheat":"Wheat","crop_corn":"Corn","crop_potato":"Potato","crop_carrot":"Carrot","crop_spinach":"Spinach","post_1":"My tomatoes are growing so well this season! 🍅","post_2":"Quick tip: Use neem oil as a natural pesticide.","post_3":"Just reached Level 10! This is fun! 🎉","quiz_q1":"Which nutrient is most important for leaf growth?","quiz_q1_opts":"Nitrogen,Phosphorus,Potassium,Calcium","quiz_q2":"What is crop rotation?","quiz_q2_opts":"Rotating crops in a field,Watering crops in circles,A type of fertilizer,A harvesting technique","badge_newbie_name":"Newbie Farmer","badge_newbie_desc":"Completed the first task. Welcome!","badge_green_thumb_name":"Green Thumb","badge_green_thumb_desc":"Successfully completed 10 tasks.","badge_first_harvest_name":"First Harvest","badge_first_harvest_desc":"Successfully harvested your first crop.","badge_quiz_master_name":"Quiz Master","badge_quiz_master_desc":"Aced a farming quiz with a perfect score.","badge_streaker_name":"Streaker","badge_streaker_desc":"Maintained a 7-day streak.","badge_community_helper_name":"Community Helper","badge_community_helper_desc":"Shared a helpful tip with the community.","tomato_quest_day1_title":"Prepare Enriched Soil","tomato_quest_day1_desc":"Mix compost into your soil to provide rich nutrients for the seeds.","tomato_quest_day2_title":"Sow the Seeds","tomato_quest_day2_desc":"Plant tomato seeds about 1/4 inch deep in the prepared soil.","tomato_quest_day7_title":"Gentle Watering","tomato_quest_day7_desc":"Mist the soil to keep it moist but not waterlogged, helping germination.","tomato_quest_day12_title":"Check for Sprouts","tomato_quest_day12_desc":"Look for the first signs of green sprouts emerging from the soil.","tomato_quest_day18_title":"Provide Sunlight","tomato_quest_day18_desc":"Ensure the seedlings get at least 6-8 hours of sunlight per day.","tomato_quest_day25_title":"Thin the Seedlings","tomato_quest_day25_desc":"Gently remove weaker seedlings to give the strongest one more space to grow.","tomato_quest_day30_title":"Water Deeply","tomato_quest_day30_desc":"Water deeply and less frequently to encourage strong root development.","tomato_quest_day35_title":"Apply Natural Mulch","tomato_quest_day35_desc":"Add a layer of straw or wood chips to retain soil moisture and prevent weeds.","tomato_quest_day40_title":"Install a Stake","tomato_quest_day40_desc":"Place a stake or cage near the plant to support it as it grows taller.","tomato_quest_day45_title":"Natural Pest Patrol","tomato_quest_day45_desc":"Check leaves for pests. Introduce beneficial insects like ladybugs if possible.","tomato_quest_day52_title":"Prune Lower Leaves","tomato_quest_day52_desc":"Remove the bottom leaves to improve air circulation and prevent disease.","tomato_quest_day60_title":"First Harvest!","tomato_quest_day60_desc":"Harvest the first ripe tomatoes. Enjoy the fruits of your sustainable farming!","dashboardCommunityTitle":"Community & Rankings","dashboardCommunityDesc":"Connect with other farmers!","dashboardCommunityViewFeed":"View Feed","dashboardCommunityViewLeaderboard":"Check Leaderboard","wheat_quest_day1_title":"Test Soil pH","wheat_quest_day1_desc":"Test your soil's pH level. Wheat prefers a pH between 6.0 and 7.0.","wheat_quest_day15_title":"Conservation Tillage","wheat_quest_day15_desc":"Use minimal tilling to prepare the land. This reduces soil erosion and retains moisture.","wheat_quest_day30_title":"Smart Watering","wheat_quest_day30_desc":"Use drip irrigation for the first watering to conserve water and deliver it directly to the roots.","wheat_quest_day45_title":"Manual Weed Control","wheat_quest_day45_desc":"Check for and remove weeds by hand to prevent competition for nutrients without using herbicides.","wheat_quest_day60_title":"Attract Beneficial Insects","wheat_quest_day60_desc":"Plant flowers like clover nearby to attract ladybugs and other insects that prey on pests like aphids.","wheat_quest_day75_title":"Apply Compost Tea","wheat_quest_day75_desc":"Brew and apply compost tea as a natural, nutrient-rich foliar feed for your growing wheat.","wheat_quest_day90_title":"Disease Monitoring","wheat_quest_day90_desc":"Inspect leaves for signs of rust or mildew. Improve air circulation if needed.","wheat_quest_day120_title":"Sustainable Harvest","wheat_quest_day120_desc":"Harvest the golden wheat. Leave the stalks on the field as mulch to enrich the soil.","corn_quest_day1_title":"Companion Planting Prep","corn_quest_day1_desc":"Plan a 'Three Sisters' garden. Corn provides a stalk for beans, which add nitrogen to the soil.","corn_quest_day10_title":"Plant in Blocks","corn_quest_day10_desc":"Sow corn seeds in short, rectangular blocks instead of long rows to improve wind pollination.","corn_quest_day25_title":"Side-Dress with Compost","corn_quest_day25_desc":"Add a layer of rich compost along the base of the stalks to provide a slow-release of nutrients.","corn_quest_day40_title":"Natural Pest Defense","corn_quest_day40_desc":"Scout for corn earworms. Apply a drop of mineral oil to the tip of each ear to deter them.","corn_quest_day60_title":"Pollination Check","corn_quest_day60_desc":"Look for tassels at the top of the stalks shedding yellow pollen. Give them a gentle shake to help.","corn_quest_day75_title":"The Milk Test","corn_quest_day75_desc":"Test for ripeness. Pierce a kernel with your fingernail; if the juice is milky, it's ready to harvest.","corn_quest_day90_title":"Harvest & Mulch","corn_quest_day90_desc":"Harvest the corn ears. Cut the stalks and leave them on the ground to decompose and feed the soil.","potato_quest_day1_title":"Chit Your Potatoes","potato_quest_day1_desc":"Encourage seed potatoes to sprout before planting ('chitting') by placing them in a bright, cool spot.","potato_quest_day10_title":"Plant in Trenches","potato_quest_day10_desc":"Plant the sprouted potatoes in a trench with a layer of compost at the bottom for nutrition.","potato_quest_day25_title":"First Hilling","potato_quest_day25_desc":"Mound soil up around the base of the plant. This protects the new potatoes from sunlight.","potato_quest_day40_title":"Pest Patrol","potato_quest_day40_desc":"Inspect the leaves for Colorado potato beetles and their larvae. Hand-pick them off to protect your plants.","potato_quest_day55_title":"Second Hilling","potato_quest_day55_desc":"Add another layer of soil or straw mulch around the plants as they grow taller.","potato_quest_day70_title":"Consistent Moisture","potato_quest_day70_desc":"Water deeply and regularly to keep the soil evenly moist, which helps prevent scabs on the potatoes.","potato_quest_day90_title":"Wait for Die-Back","potato_quest_day90_desc":"The plant's foliage will turn yellow and die. This is a sign the potatoes are maturing.","potato_quest_day100_title":"Gentle Harvest","potato_quest_day100_desc":"Carefully dig up your potatoes with a garden fork. Let them cure for a few hours before storing.","dashboardStreakTitle":"Daily Streak","marketplaceTitle":"Marketplace","marketplaceTabBuy":"Buy","marketplaceTabSell":"Sell","marketplaceCategoryAll":"All","marketplaceCategoryCrops":"Crops","marketplaceCategoryTools":"Tools","marketplaceCategoryServices":"Services","marketplacePrice":"Price","marketplaceQuantity":"Qty","marketplaceSeller":"Seller","marketplaceBuyButton":"Buy","marketplaceSellTitle":"Sell from Your Inventory","marketplaceSellItemLabel":"Item from your inventory","marketplaceSellQuantityLabel":"Quantity","marketplaceSellPriceLabel":"Set Price per Item (₹)","marketplaceSellCategoryLabel":"Category","marketplaceSellButton":"List Item for Sale","buySuccess":"Purchase successful!","sellSuccess":"Item listed successfully!","notEnoughFunds":"Not enough Rupees!","notEnoughStock":"Not enough stock!","item_shovel":"Shovel","item_watering_can":"Watering Can","item_seeds_tomato":"Tomato Seeds","service_soil_test":"Soil Testing Service","wallet":"Wallet","dashboardMarketplaceTitle":"Marketplace","dashboardMarketplaceDesc":"Buy tools and sell your harvest!","dashboardMarketplaceButton":"Go to Marketplace","marketplaceSellInstruction":"Click an item below to select it for sale.","marketplaceSellYourInventory":"Your Inventory","marketplaceSellNoItems":"You have nothing in your inventory to sell.","marketplaceSellSelected":"Selected Item","marketplaceSellEarnings":"Potential Earnings","dashboardCurrentLevel":"Current Level","dashboardLevelAbbr":"LVL","dashboardGuidesTitle":"Sustainable Guides","dashboardGuidesDesc":"Learn sustainable farming techniques.","dashboardGuidesButton":"View Guides","learnTabGuides":"Guides","learnTabQuizzes":"Quizzes","guide_water_conservation_title":"Water Conservation","guide_water_conservation_desc":"Learn techniques to use water efficiently and conserve this precious resource on your farm.","guide_water_conservation_task_1_title":"Install Drip Irrigation","guide_water_conservation_task_2_title":"Apply Mulch to Soil","guide_water_conservation_task_3_title":"Water Early in the Morning","guide_water_conservation_task_4_title":"Collect Rainwater","guide_water_conservation_task_5_title":"Choose Drought-Resistant Crops","guide_crop_rotation_title":"Crop Rotation","guide_crop_rotation_desc":"Understand the importance of rotating crops to maintain soil health, prevent diseases, and reduce pests.","guide_crop_rotation_task_1_title":"Plan a 3-Year Rotation Cycle","guide_crop_rotation_task_2_title":"Plant Legumes for Nitrogen","guide_crop_rotation_task_3_title":"Avoid Planting the Same Family","guide_crop_rotation_task_4_title":"Incorporate Cover Crops","guide_crop_rotation_task_5_title":"Keep a Record of Your Rotations","guide_composting_101_title":"Composting 101","guide_composting_101_desc":"Learn to turn kitchen scraps and yard waste into nutrient-rich soil for your plants.","guide_composting_101_task_1_title":"Choose a Composting Spot","guide_composting_101_task_2_title":"Gather 'Browns' & 'Greens'","guide_composting_101_task_3_title":"Layer Your Compost Pile","guide_composting_101_task_4_title":"Keep the Pile Moist","guide_composting_101_task_5_title":"Turn Your Compost Regularly","guide_natural_pest_control_title":"Natural Pest Control","guide_natural_pest_control_desc":"Protect your crops from pests without harmful chemicals by encouraging a natural ecosystem.","guide_natural_pest_control_task_1_title":"Introduce Beneficial Insects","guide_natural_pest_control_task_2_title":"Use Companion Planting","guide_natural_pest_control_task_3_title":"Create a Neem Oil Spray","guide_natural_pest_control_task_4_title":"Set Up Physical Barriers (Nets)","guide_natural_pest_control_task_5_title":"Encourage Birds to Visit","dashboardTipsTitle":"Farming Tips & Solutions","tip_drought_title":"Sudden Drought","tip_drought_cause":"Cause: Lack of rainfall and high temperatures are drying out the soil.","tip_drought_tips":"Apply a thick layer of mulch (straw, wood chips) to retain soil moisture.|Water deeply but less frequently, early in the morning to reduce evaporation.|Install a drip irrigation system to deliver water directly to the roots.","tip_flood_title":"Unexpected Floods","tip_flood_cause":"Cause: Heavy, prolonged rainfall has waterlogged the fields.","tip_flood_tips":"Improve drainage by digging shallow trenches to divert excess water.|Avoid compacting wet soil by not walking or using heavy machinery on it.|Check for root rot and apply a fungicide if necessary once the soil dries.","tip_fertilizer_shortage_title":"Fertilizer Shortage","tip_fertilizer_shortage_cause":"Cause: Supply chain issues have made commercial fertilizers unavailable.","tip_fertilizer_shortage_tips":"Start a compost pile to create your own nutrient-rich fertilizer.|Use green manure by planting cover crops like clover and tilling them into the soil.|Brew compost tea to use as a liquid fertilizer for a quick nutrient boost.","tip_seed_shortage_title":"Seed Unavailability","tip_seed_shortage_cause":"Cause: Local suppliers are out of stock for your planned crop seeds.","tip_seed_shortage_tips":"Practice seed saving from your own healthy, open-pollinated plants.|Connect with local farmer networks or community seed banks to trade seeds.|Choose to plant native, locally-adapted crops that may be more readily available.","dashboardStartQuestTitle":"Start a Farming Quest","carrot_quest_day1_title":"Prepare Deep Soil","carrot_quest_day1_desc":"Till soil deeply and remove rocks to ensure carrots grow straight.","carrot_quest_day15_title":"Thin Seedlings","carrot_quest_day15_desc":"Thin seedlings to about 2 inches apart to give roots space to grow.","carrot_quest_day30_title":"Apply Light Mulch","carrot_quest_day30_desc":"Use grass clippings as mulch to retain moisture and suppress weeds.","carrot_quest_day45_title":"Protect from Pests","carrot_quest_day45_desc":"Use row covers to protect against carrot rust flies.","carrot_quest_day60_title":"Check Root Size","carrot_quest_day60_desc":"Gently move soil at the top to check if roots are at least 1/2 inch wide.","carrot_quest_day75_title":"Harvest Your Carrots","carrot_quest_day75_desc":"Loosen the soil with a garden fork and gently pull the carrots.","spinach_quest_day1_title":"Plant in Cool Soil","spinach_quest_day1_desc":"Plant spinach in early spring or fall, as it thrives in cool weather.","spinach_quest_day10_title":"Ensure Consistent Moisture","spinach_quest_day10_desc":"Keep the soil evenly moist to encourage fast growth and prevent bolting.","spinach_quest_day20_title":"Feed with Nitrogen","spinach_quest_day20_desc":"Apply a compost tea or organic nitrogen fertilizer for lush, green leaves.","spinach_quest_day30_title":"Pest Check","spinach_quest_day30_desc":"Inspect leaves for aphids or leaf miners and treat with natural remedies.","spinach_quest_day45_title":"Continuous Harvest","spinach_quest_day45_desc":"Harvest the outer leaves first, allowing the inner leaves to continue growing.","backToGuides":"← Back to Guides","harvestButton":"Harvest","harvestSuccess":"Harvest successful! You received +{quantity} {cropName}.","tts_enable":"Enable Text-to-Speech","tts_disable":"Disable Text-to-Speech","ttsToggleLabel":"Toggle Text to Speech"};
const hi = {"appName":"एग्रीप्ले","loginTitle":"खेत में आपका स्वागत है!","loginSubtitle":"अपनी यात्रा शुरू करने के लिए अपना फोन डालें।","phoneLabel":"फ़ोन नंबर","otpLabel":"ओटीपी दर्ज करें","loginButton":"लॉग इन करें","sendOtpButton":"ओटीपी भेजें","guestLoginButton":"अतिथि के रूप में जारी रखें","navDashboard":"डैशबोर्ड","navCrops":"मेरी फसलें","navLearn":"सीखें और बढ़ें","navCommunity":"समुदाय","navLeaderboard":"लीडरबोर्ड","navBadges":"बैज","navMarketplace":"बाज़ार","backToDashboard":"← डैशबोर्ड पर वापस जाएं","communityTitle":"सामुदायिक केंद्र","leaderboardTitle":"किसान लीडरबोर्ड","filterState":"राज्य","filterDistrict":"ज़िला","filterVillage":"गाँव","filterAll":"सभी","level":"स्तर","streak":"दिन की स्ट्रीक","dailyTasksTitle":"दैनिक मिशन","dashboardQuestTitle":"सक्रिय खोज","dashboardQuestNone":"कोई सक्रिय फसल खोज नहीं।","dashboardQuestStart":"एक खोज शुरू करें","dashboardQuestToday":"आज का कार्य (दिन {day})","dashboardQuestView":"खोज लॉग देखें","badgesTitle":"मेरे बैज","viewAllBadges":"सभी देखें","badgeCollectionTitle":"मेरा बैज संग्रह","taskCompleteButton":"दावा करें","levelUpTitle":"लेवल अप!","levelUpSubtitle":"आप स्तर {level} पर पहुंच गए हैं!","levelUpClose":"बहुत बढ़िया!","cropsTitle":"एक नई खेती खोज शुरू करें","plantButton":"यह फसल लगाएं","selectCrop":"एक फसल चुनें","addNewCrop":"नई फसल जोड़ें","cropQuestTitle":"{cropName} खोज","cropQuestDay":"दिन {day}","cropQuestComplete":"पूरा करें","cropQuestCompleted":"पूरा हुआ","cropQuestLocked":"बंद है","quizTitle":"खेती प्रश्नोत्तरी","quizScore":"आपने {total} में से {score} अंक प्राप्त किए!","quizXP":"आपने {xp} XP अर्जित किए!","quizNext":"अगला प्रश्न","quizFinish":"प्रश्नोत्तरी समाप्त करें","communityFeed":"फ़ीड","communityLeaderboard":"लीडरबोर्ड","postPlaceholder":"कोई टिप या अपडेट साझा करें...","postButton":"पोस्ट","leaderboardRank":"रैंक","leaderboardPlayer":"खिलाड़ी","leaderboardLevel":"स्तर","leaderboardXP":"कुल XP","task_water_plants":"अपने पौधों को पानी दें","task_check_soil":"मिट्टी की नमी जांचें","task_read_article":"खेती पर एक लेख पढ़ें","crop_tomato":"टमाटर","crop_wheat":"गेहूँ","crop_corn":"मक्का","crop_potato":"आलू","crop_carrot":"गाजर","crop_spinach":"पालक","post_1":"इस मौसम में मेरे टमाटर बहुत अच्छे उग रहे हैं! 🍅","post_2":"त्वरित टिप: प्राकृतिक कीटनाशक के रूप में नीम के तेल का उपयोग करें।","post_3":"अभी-अभी लेवल 10 पर पहुंचा हूं! यह मजेदार है! 🎉","quiz_q1":"पत्तियों के विकास के लिए कौन सा पोषक तत्व सबसे महत्वपूर्ण है?","quiz_q1_opts":"नाइट्रोजन,फास्फोरस,पोटेशियम,कैल्शियम","quiz_q2":"फसल चक्र क्या है?","quiz_q2_opts":"खेत में फसलें बदलना,फसलों को गोल-गोल पानी देना,एक प्रकार का उर्वरक,एक कटाई तकनीक","badge_newbie_name":"नौसिखिया किसान","badge_newbie_desc":"पहला कार्य पूरा किया। आपका स्वागत है!","badge_green_thumb_name":"ग्रीन थंब","badge_green_thumb_desc":"10 कार्य सफलतापूर्वक पूरे किए।","badge_first_harvest_name":"पहली फसल","badge_first_harvest_desc":"अपनी पहली फसल सफलतापूर्वक काटी।","badge_quiz_master_name":"क्विज मास्टर","badge_quiz_master_desc":"एक खेती प्रश्नोत्तरी में पूर्ण अंक प्राप्त किए।","badge_streaker_name":"स्ट्रीकर","badge_streaker_desc":"7-दिन की स्ट्रीक बनाए रखी।","badge_community_helper_name":"सामुदायिक सहायक","badge_community_helper_desc":"समुदाय के साथ एक उपयोगी टिप साझा की।","tomato_quest_day1_title":"समृद्ध मिट्टी तैयार करें","tomato_quest_day1_desc":"बीजों के लिए पोषक तत्व प्रदान करने के लिए अपनी मिट्टी में खाद मिलाएं।","tomato_quest_day2_title":"बीज बोएं","tomato_quest_day2_desc":"तैयार मिट्टी में टमाटर के बीज लगभग 1/4 इंच गहरे लगाएं।","tomato_quest_day7_title":"धीरे से पानी देना","tomato_quest_day7_desc":"अंकुरण में मदद के लिए मिट्टी को नम रखें लेकिन जलभराव न करें।","tomato_quest_day12_title":"अंकुरों की जांच करें","tomato_quest_day12_desc":"मिट्टी से निकलने वाले हरे अंकुरों के पहले संकेतों को देखें।","tomato_quest_day18_title":"धूप प्रदान करें","tomato_quest_day18_desc":"सुनिश्चित करें कि अंकुरों को प्रतिदिन कम से कम 6-8 घंटे धूप मिले।","tomato_quest_day25_title":"अंकुरों को पतला करें","tomato_quest_day25_desc":"सबसे मजबूत को बढ़ने के लिए अधिक जगह देने के लिए कमजोर अंकुरों को धीरे से हटा दें।","tomato_quest_day30_title":"गहराई से पानी दें","tomato_quest_day30_desc":"मजबूत जड़ विकास को प्रोत्साहित करने के लिए गहराई से और कम बार पानी दें।","tomato_quest_day35_title":"प्राकृतिक मल्च लगाएं","tomato_quest_day35_desc":"मिट्टी की नमी बनाए रखने और खरपतवारों को रोकने के लिए पुआल या लकड़ी के चिप्स की एक परत डालें।","tomato_quest_day40_title":"एक डंडा लगाएं","tomato_quest_day40_desc":"पौधे के बड़े होने पर उसे सहारा देने के लिए उसके पास एक डंडा या पिंजरा लगाएं।","tomato_quest_day45_title":"प्राकृतिक कीट गश्त","tomato_quest_day45_desc":"कीटों के लिए पत्तियों की जाँच करें। यदि संभव हो तो लेडीबग जैसे लाभकारी कीड़ों को पेश करें।","tomato_quest_day52_title":"निचली पत्तियों की छंटाई करें","tomato_quest_day52_desc":"वायु परिसंचरण में सुधार और बीमारी को रोकने के लिए नीचे की पत्तियों को हटा दें।","tomato_quest_day60_title":"पहली फसल!","tomato_quest_day60_desc":"पहले पके टमाटरों की कटाई करें। अपनी टिकाऊ खेती के फलों का आनंद लें!","dashboardCommunityTitle":"समुदाय और रैंकिंग","dashboardCommunityDesc":"अन्य किसानों से जुड़ें!","dashboardCommunityViewFeed":"फ़ीड देखें","dashboardCommunityViewLeaderboard":"लीडरबोर्ड जांचें","wheat_quest_day1_title":"मिट्टी का पीएच परीक्षण करें","wheat_quest_day1_desc":"अपनी मिट्टी के पीएच स्तर का परीक्षण करें। गेहूं 6.0 और 7.0 के बीच पीएच पसंद करता है।","wheat_quest_day15_title":"संरक्षण जुताई","wheat_quest_day15_desc":"भूमि तैयार करने के लिए न्यूनतम जुताई का उपयोग करें। इससे मिट्टी का कटाव कम होता है और नमी बनी रहती है।","wheat_quest_day30_title":"स्मार्ट सिंचाई","wheat_quest_day30_desc":"पानी बचाने और इसे सीधे जड़ों तक पहुंचाने के लिए पहली सिंचाई के लिए ड्रिप सिंचाई का उपयोग करें।","wheat_quest_day45_title":"मैनुअल खरपतवार नियंत्रण","wheat_quest_day45_desc":"खरपतवारनाशकों का उपयोग किए बिना पोषक तत्वों के लिए प्रतिस्पर्धा को रोकने के लिए खरपतवारों की जांच करें और उन्हें हाथ से हटाएं।","wheat_quest_day60_title":"लाभकारी कीड़ों को आकर्षित करें","wheat_quest_day60_desc":"एफिड्स जैसे कीटों का शिकार करने वाले लेडीबग और अन्य कीड़ों को आकर्षित करने के लिए पास में तिपतिया घास जैसे फूल लगाएं।","wheat_quest_day75_title":"खाद चाय का प्रयोग करें","wheat_quest_day75_desc":"बढ़ते गेहूं के लिए एक प्राकृतिक, पोषक तत्वों से भरपूर पर्ण आहार के रूप में खाद चाय बनाएं और प्रयोग करें।","wheat_quest_day90_title":"रोग की निगरानी","wheat_quest_day90_desc":"जंग या फफूंदी के लक्षणों के लिए पत्तियों का निरीक्षण करें। यदि आवश्यक हो तो वायु परिसंचरण में सुधार करें।","wheat_quest_day120_title":"टिकाऊ फसल","wheat_quest_day120_desc":"सुनहरा गेहूं काटें। मिट्टी को समृद्ध करने के लिए डंठल को खेत में गीली घास के रूप में छोड़ दें।","corn_quest_day1_title":"सहयोगी रोपण की तैयारी","corn_quest_day1_desc":"'थ्री सिस्टर्स' गार्डन की योजना बनाएं। मक्का बीन्स के लिए एक डंठल प्रदान करता है, जो मिट्टी में नाइट्रोजन जोड़ता है।","corn_quest_day10_title":"ब्लॉक में पौधे लगाएं","corn_quest_day10_desc":"हवा परागण में सुधार के लिए लंबी पंक्तियों के बजाय छोटे, आयताकार ब्लॉकों में मकई के बीज बोएं।","corn_quest_day25_title":"खाद के साथ साइड-ड्रेस","corn_quest_day25_desc":"पोषक तत्वों की धीमी गति से रिहाई प्रदान करने के लिए डंठल के आधार के साथ समृद्ध खाद की एक परत जोड़ें।","corn_quest_day40_title":"प्राकृतिक कीट रक्षा","corn_quest_day40_desc":"मकई के ईयरवर्म के लिए स्काउट। उन्हें रोकने के लिए प्रत्येक कान की नोक पर खनिज तेल की एक बूंद डालें।","corn_quest_day60_title":"परागण जांच","corn_quest_day60_desc":"डंठल के शीर्ष पर पीले पराग बहाने वाले टेसल्स की तलाश करें। मदद करने के लिए उन्हें धीरे से हिलाएं।","corn_quest_day75_title":"दूध परीक्षण","corn_quest_day75_desc":"पकने के लिए परीक्षण करें। अपने नाखून से एक दाने को छेदें; यदि रस दूधिया है, तो यह कटाई के लिए तैयार है।","corn_quest_day90_title":"फसल और मल्च","corn_quest_day90_desc":"मकई के कानों की कटाई करें। डंठल को काटें और उन्हें सड़ने और मिट्टी को खिलाने के लिए जमीन पर छोड़ दें।","potato_quest_day1_title":"अपने आलू को चिट करें","potato_quest_day1_desc":"बीज आलू को एक उज्ज्वल, ठंडी जगह पर रखकर रोपण ('चिटिंग') से पहले अंकुरित होने के लिए प्रोत्साहित करें।","potato_quest_day10_title":"खाइयों में पौधे लगाएं","potato_quest_day10_desc":"पोषण के लिए तल पर खाद की एक परत के साथ अंकुरित आलू को एक खाई में लगाएं।","potato_quest_day25_title":"पहली हिलिंग","potato_quest_day25_desc":"पौधे के आधार के चारों ओर मिट्टी का ढेर लगाएं। यह नए आलू को धूप से बचाता है।","potato_quest_day40_title":"कीट गश्त","potato_quest_day40_desc":"कोलोराडो आलू बीटल और उनके लार्वा के लिए पत्तियों का निरीक्षण करें। अपने पौधों की रक्षा के लिए उन्हें हाथ से चुनें।","potato_quest_day55_title":"दूसरी हिलिंग","potato_quest_day55_desc":"जैसे-जैसे पौधे लम्बे होते हैं, उनके चारों ओर मिट्टी या पुआल की गीली घास की एक और परत डालें।","potato_quest_day70_title":"लगातार नमी","potato_quest_day70_desc":"मिट्टी को समान रूप से नम रखने के लिए गहराई से और नियमित रूप से पानी दें, जो आलू पर पपड़ी को रोकने में मदद करता है।","potato_quest_day90_title":"डाई-बैक की प्रतीक्षा करें","potato_quest_day90_desc":"पौधे के पत्ते पीले हो जाएंगे और मर जाएंगे। यह एक संकेत है कि आलू परिपक्व हो रहे हैं।","potato_quest_day100_title":"कोमल फसल","potato_quest_day100_desc":"एक बगीचे के कांटे से अपने आलू को सावधानी से खोदें। भंडारण से पहले उन्हें कुछ घंटों के लिए ठीक होने दें।","dashboardStreakTitle":"दैनिक स्ट्रीक","marketplaceTitle":"बाज़ार","marketplaceTabBuy":"खरीदें","marketplaceTabSell":"बेचें","marketplaceCategoryAll":"सभी","marketplaceCategoryCrops":"फसलें","marketplaceCategoryTools":"उपकरण","marketplaceCategoryServices":"सेवाएं","marketplacePrice":"कीमत","marketplaceQuantity":"मात्रा","marketplaceSeller":"विक्रेता","marketplaceBuyButton":"खरीदें","marketplaceSellTitle":"अपनी इन्वेंट्री से बेचें","marketplaceSellItemLabel":"आपकी इन्वेंट्री से आइटम","marketplaceSellQuantityLabel":"मात्रा","marketplaceSellPriceLabel":"प्रति आइटम मूल्य निर्धारित करें (₹)","marketplaceSellCategoryLabel":"श्रेणी","marketplaceSellButton":"बिक्री के लिए आइटम सूचीबद्ध करें","buySuccess":"खरीद सफल!","sellSuccess":"आइटम सफलतापूर्वक सूचीबद्ध हो गया!","notEnoughFunds":"पर्याप्त रुपये नहीं!","notEnoughStock":"पर्याप्त स्टॉक नहीं!","item_shovel":"फावड़ा","item_watering_can":"पानी देने का कैन","item_seeds_tomato":"टमाटर के बीज","service_soil_test":"मिट्टी परीक्षण सेवा","wallet":"बटुआ","dashboardMarketplaceTitle":"बाज़ार","dashboardMarketplaceDesc":"उपकरण खरीदें और अपनी फसल बेचें!","dashboardMarketplaceButton":"बाज़ार में जाएं","marketplaceSellInstruction":"बिक्री के लिए चयन करने के लिए नीचे एक आइटम पर क्लिक करें।","marketplaceSellYourInventory":"आपकी इन्वेंट्री","marketplaceSellNoItems":"आपकी इन्वेंट्री में बेचने के लिए कुछ भी नहीं है।","marketplaceSellSelected":"चयनित आइटम","marketplaceSellEarnings":"संभावित कमाई","dashboardCurrentLevel":"वर्तमान स्तर","dashboardLevelAbbr":"स्तर","dashboardGuidesTitle":"टिकाऊ गाइड","dashboardGuidesDesc":"टिकाऊ खेती की तकनीकें सीखें।","dashboardGuidesButton":"गाइड देखें","learnTabGuides":"गाइड","learnTabQuizzes":"प्रश्नोत्तरी","guide_water_conservation_title":"जल संरक्षण","guide_water_conservation_desc":"अपने खेत पर पानी का कुशलतापूर्वक उपयोग करने और इस कीमती संसाधन को संरक्षित करने की तकनीकें सीखें।","guide_water_conservation_task_1_title":"ड्रिप सिंचाई स्थापित करें","guide_water_conservation_task_2_title":"मिट्टी पर मल्च लगाएं","guide_water_conservation_task_3_title":"सुबह जल्दी पानी दें","guide_water_conservation_task_4_title":"वर्षा जल एकत्र करें","guide_water_conservation_task_5_title":"सूखा प्रतिरोधी फसलें चुनें","guide_crop_rotation_title":"फसल चक्र","guide_crop_rotation_desc":"मिट्टी के स्वास्थ्य को बनाए रखने, बीमारियों को रोकने और कीटों को कम करने के लिए फसलों को घुमाने के महत्व को समझें।","guide_crop_rotation_task_1_title":"3-वर्षीय रोटेशन चक्र की योजना बनाएं","guide_crop_rotation_task_2_title":"नाइट्रोजन के लिए फलियां लगाएं","guide_crop_rotation_task_3_title":"एक ही परिवार के पौधे लगाने से बचें","guide_crop_rotation_task_4_title":"कवर फसलों को शामिल करें","guide_crop_rotation_task_5_title":"अपने रोटेशन का रिकॉर्ड रखें","guide_composting_101_title":"कम्पोस्टिंग 101","guide_composting_101_desc":"रसोई के कचरे और यार्ड के कचरे को अपने पौधों के लिए पोषक तत्वों से भरपूर मिट्टी में बदलना सीखें।","guide_composting_101_task_1_title":"कम्पोस्टिंग के लिए जगह चुनें","guide_composting_101_task_2_title":"अपनी 'भूरी' और 'हरी' सामग्री इकट्ठा करें","guide_composting_101_task_3_title":"अपने कम्पोस्ट ढेर को परत-दर-परत लगाएं","guide_composting_101_task_4_title":"ढेर को नम रखें","guide_composting_101_task_5_title":"अपने कम्पोस्ट को नियमित रूप से पलटें","guide_natural_pest_control_title":"प्राकृतिक कीट नियंत्रण","guide_natural_pest_control_desc":"एक प्राकृतिक पारिस्थितिकी तंत्र को प्रोत्साहित करके हानिकारक रसायनों के बिना अपनी फसलों को कीटों से बचाएं।","guide_natural_pest_control_task_1_title":"लाभकारी कीड़ों का परिचय दें","guide_natural_pest_control_task_2_title":"सहयोगी रोपण का उपयोग करें","guide_natural_pest_control_task_3_title":"नीम तेल का स्प्रे बनाएं","guide_natural_pest_control_task_4_title":"भौतिक बाधाएं (जाल) स्थापित करें","guide_natural_pest_control_task_5_title":"पक्षियों को आने के लिए प्रोत्साहित करें","dashboardTipsTitle":"खेती टिप्स और समाधान","tip_drought_title":"अचानक सूखा","tip_drought_cause":"कारण: बारिश की कमी और उच्च तापमान के कारण मिट्टी सूख रही है।","tip_drought_tips":"मिट्टी की नमी बनाए रखने के लिए मल्च (पुआल, लकड़ी के चिप्स) की एक मोटी परत लगाएं।|वाष्पीकरण को कम करने के लिए सुबह जल्दी, गहराई से लेकिन कम बार पानी दें।|जड़ों तक सीधे पानी पहुंचाने के लिए एक ड्रिप सिंचाई प्रणाली स्थापित करें।","tip_flood_title":"अप्रत्याशित बाढ़","tip_flood_cause":"कारण: भारी, लंबे समय तक बारिश ने खेतों में पानी भर दिया है।","tip_flood_tips":"अतिरिक्त पानी को मोड़ने के लिए उथली खाइयां खोदकर जल निकासी में सुधार करें।|गीली मिट्टी पर न चलकर या भारी मशीनरी का उपयोग न करके उसे संकुचित करने से बचें।|मिट्टी सूखने पर जड़ सड़न की जांच करें और यदि आवश्यक हो तो कवकनाशी का प्रयोग करें।","tip_fertilizer_shortage_title":"उर्वरक की कमी","tip_fertilizer_shortage_cause":"कारण: आपूर्ति श्रृंखला के मुद्दों ने वाणिज्यिक उर्वरकों को अनुपलब्ध बना दिया है।","tip_fertilizer_shortage_tips":"अपना खुद का पोषक तत्वों से भरपूर उर्वरक बनाने के लिए एक खाद का ढेर शुरू करें।|तिपतिया घास जैसी कवर फसलें लगाकर और उन्हें मिट्टी में जोतकर हरी खाद का उपयोग करें।|त्वरित पोषक तत्व बढ़ाने के लिए तरल उर्वरक के रूप में उपयोग करने के लिए खाद चाय बनाएं।","tip_seed_shortage_title":"बीज की अनुपलब्धता","tip_seed_shortage_cause":"कारण: स्थानीय आपूर्तिकर्ताओं के पास आपकी नियोजित फसल के बीजों का स्टॉक खत्म हो गया है।","tip_seed_shortage_tips":"अपने स्वयं के स्वस्थ, खुले-परागण वाले पौधों से बीज बचाने का अभ्यास करें।|बीजों का व्यापार करने के लिए स्थानीय किसान नेटवर्क या सामुदायिक बीज बैंकों से जुड़ें।|देशी, स्थानीय रूप से अनुकूलित फसलें लगाने का विकल्प चुनें जो अधिक आसानी से उपलब्ध हो सकती हैं।","dashboardStartQuestTitle":"एक खेती खोज शुरू करें","carrot_quest_day1_title":"गहरी मिट्टी तैयार करें","carrot_quest_day1_desc":"गाजर को सीधा उगाने के लिए मिट्टी को गहराई से जोतें और पत्थर हटा दें।","carrot_quest_day15_title":"अंकुरों को पतला करें","carrot_quest_day15_desc":"जड़ों को बढ़ने के लिए जगह देने के लिए अंकुरों को लगभग 2 इंच अलग करें।","carrot_quest_day30_title":"हल्का मल्च लगाएं","carrot_quest_day30_desc":"नमी बनाए रखने और खरपतवारों को दबाने के लिए घास की कतरनों का उपयोग मल्च के रूप में करें।","carrot_quest_day45_title":"कीटों से बचाएं","carrot_quest_day45_desc":"गाजर रस्ट मक्खियों से बचाने के लिए पंक्ति कवर का उपयोग करें।","carrot_quest_day60_title":"जड़ का आकार जांचें","carrot_quest_day60_desc":"जड़ें कम से कम 1/2 इंच चौड़ी हैं यह जांचने के लिए ऊपर से धीरे-धीरे मिट्टी हटाएं।","carrot_quest_day75_title":"अपनी गाजर की कटाई करें","carrot_quest_day75_desc":"एक बगीचे के कांटे से मिट्टी को ढीला करें और धीरे-धीरे गाजर खींचें।","spinach_quest_day1_title":"ठंडी मिट्टी में पौधे लगाएं","spinach_quest_day1_desc":"पालक को शुरुआती वसंत या पतझड़ में लगाएं, क्योंकि यह ठंडे मौसम में पनपता है।","spinach_quest_day10_title":"लगातार नमी सुनिश्चित करें","spinach_quest_day10_desc":"तेजी से विकास को प्रोत्साहित करने और बोल्टिंग को रोकने के लिए मिट्टी को समान रूप से नम रखें।","spinach_quest_day20_title":"नाइट्रोजन से पोषण दें","spinach_quest_day20_desc":"हरे-भरे, हरे पत्तों के लिए खाद चाय या जैविक नाइट्रोजन उर्वरक का प्रयोग करें।","spinach_quest_day30_title":"कीट जांच","spinach_quest_day30_desc":"एफिड्स या लीफ माइनर्स के लिए पत्तियों का निरीक्षण करें और प्राकृतिक उपचारों से उपचार करें।","spinach_quest_day45_title":"लगातार कटाई","spinach_quest_day45_desc":"पहले बाहरी पत्तियों की कटाई करें, जिससे भीतरी पत्तियां बढ़ती रहें।","backToGuides":"← गाइड पर वापस जाएं","harvestButton":"कटाई","harvestSuccess":"कटाई सफल! आपको +{quantity} {cropName} मिला।","tts_enable":"टेक्स्ट-टू-स्पीच सक्षम करें","tts_disable":"टेक्स्ट-टू-स्पीच अक्षम करें","ttsToggleLabel":"टेक्स्ट टू स्पीच टॉगल करें"};
const ta = {"appName":"அக்ரிப்ளே","loginTitle":"பண்ணைக்கு வரவேற்கிறோம்!","loginSubtitle":"உங்கள் பயணத்தைத் தொடங்க உங்கள் தொலைபேசியை உள்ளிடவும்.","phoneLabel":"தொலைபேசி எண்","otpLabel":"OTP ஐ உள்ளிடவும்","loginButton":"உள்நுழையவும்","sendOtpButton":"OTP அனுப்பு","guestLoginButton":"விருந்தினராகத் தொடரவும்","navDashboard":"முகப்பு","navCrops":"என் பயிர்கள்","navLearn":"கற்க & வளர","navCommunity":"சமூகம்","navLeaderboard":"தலைமைப் பலகை","navBadges":"பேட்ஜ்கள்","navMarketplace":"சந்தை","backToDashboard":"← முகப்புக்குத் திரும்பு","communityTitle":"சமூக மையம்","leaderboardTitle":"விவசாயி தலைமைப் பலகை","filterState":"மாநிலம்","filterDistrict":"மாவட்டம்","filterVillage":"கிராமம்","filterAll":"அனைத்தும்","level":"நிலை","streak":"நாள் தொடர்ச்சி","dailyTasksTitle":"தினசரி பணிகள்","dashboardQuestTitle":"செயலில் உள்ள குவெஸ்ட்","dashboardQuestNone":"செயலில் பயிர் குவெஸ்ட் இல்லை.","dashboardQuestStart":"ஒரு குவெஸ்ட்டைத் தொடங்கு","dashboardQuestToday":"இன்றைய பணி (நாள் {day})","dashboardQuestView":"குவெஸ்ட் பதிவைப் காண்க","badgesTitle":"என் பேட்ஜ்கள்","viewAllBadges":"அனைத்தையும் காட்டு","badgeCollectionTitle":"என் பேட்ஜ் சேகரிப்பு","taskCompleteButton":"பெறுக","levelUpTitle":"நிலை உயர்வு!","levelUpSubtitle":"நீங்கள் நிலை {level} ஐ அடைந்துவிட்டீர்கள்!","levelUpClose":"அற்புதம்!","cropsTitle":"ஒரு புதிய விவசாய குவெஸ்ட்டைத் தொடங்கு","plantButton":"இந்தப் பயிரை நடவு செய்","selectCrop":"ஒரு பயிரைத் தேர்ந்தெடு","addNewCrop":"புதிய பயிரைச் சேர்","cropQuestTitle":"{cropName} குவெஸ்ட்","cropQuestDay":"நாள் {day}","cropQuestComplete":"முடி","cropQuestCompleted":"முடிந்தது","cropQuestLocked":"பூட்டப்பட்டது","quizTitle":"விவசாய வினாடி வினா","quizScore":"நீங்கள் {total}க்கு {score} மதிப்பெண்கள் பெற்றுள்ளீர்கள்!","quizXP":"நீங்கள் {xp} XP பெற்றுள்ளீர்கள்!","quizNext":"அடுத்த கேள்வி","quizFinish":"வினாடி வினாவை முடிக்கவும்","communityFeed":"ஊட்டம்","communityLeaderboard":"தலைமைப் பலகை","postPlaceholder":"ஒரு குறிப்பு அல்லது புதுப்பிப்பைப் பகிரவும்...","postButton":"பதிவு","leaderboardRank":"தரம்","leaderboardPlayer":"வீரர்","leaderboardLevel":"நிலை","leaderboardXP":"மொத்த XP","task_water_plants":"உங்கள் செடிகளுக்கு தண்ணீர் பாய்ச்சவும்","task_check_soil":"மண்ணின் ஈரப்பதத்தை சரிபார்க்கவும்","task_read_article":"ஒரு விவசாயக் கட்டுரையைப் படியுங்கள்","crop_tomato":"தக்காளி","crop_wheat":"கோதுமை","crop_corn":"சோளம்","crop_potato":"உருளைக்கிழங்கு","crop_carrot":"கேரட்","crop_spinach":"கீரை","post_1":"இந்த பருவத்தில் என் தக்காளி நன்றாக வளர்கிறது! 🍅","post_2":"விரைவான குறிப்பு: வேப்ப எண்ணெயை இயற்கை பூச்சிக்கொல்லியாகப் பயன்படுத்தவும்.","post_3":"நிலை 10 ஐ அடைந்தேன்! இது வேடிக்கையாக இருக்கிறது! 🎉","quiz_q1":"இலை வளர்ச்சிக்கு எந்த ஊட்டச்சத்து மிகவும் முக்கியமானது?","quiz_q1_opts":"நைட்ரஜன்,பாஸ்பரஸ்,பொட்டாசியம்,கால்சியம்","quiz_q2":"பயிர் சுழற்சி என்றால் என்ன?","quiz_q2_opts":"ஒரு வயலில் பயிர்களை சுழற்றுதல்,வட்டமாக பயிர்களுக்கு தண்ணீர் பாய்ச்சுதல்,ஒரு வகை உரம்,ஒரு அறுவடை நுட்பம்","badge_newbie_name":"புதிய விவசாயி","badge_newbie_desc":"முதல் பணியை முடித்தீர்கள். வரவேற்கிறோம்!","badge_green_thumb_name":"பசுமை விரல்","badge_green_thumb_desc":"10 பணிகளை வெற்றிகரமாக முடித்தீர்கள்.","badge_first_harvest_name":"முதல் அறுவடை","badge_first_harvest_desc":"உங்கள் முதல் பயிரை வெற்றிகரமாக அறுவடை செய்தீர்கள்.","badge_quiz_master_name":"வினாடி வினா மாஸ்டர்","badge_quiz_master_desc":"ஒரு விவசாய வினாடி வினாவில் முழு மதிப்பெண்கள் பெற்றீர்கள்.","badge_streaker_name":"தொடர் நாயகன்","badge_streaker_desc":"7-நாள் தொடர்ச்சியைப் பராமரித்தீர்கள்.","badge_community_helper_name":"சமூக உதவியாளர்","badge_community_helper_desc":"சமூகத்துடன் ஒரு பயனுள்ள குறிப்பைப் பகிர்ந்தீர்கள்.","tomato_quest_day1_title":"செறிவூட்டப்பட்ட மண்ணைத் தயாரிக்கவும்","tomato_quest_day1_desc":"விதைகளுக்கு வளமான ஊட்டச்சத்துக்களை வழங்க உங்கள் மண்ணில் உரத்தை கலக்கவும்.","tomato_quest_day2_title":"விதைகளை விதைக்கவும்","tomato_quest_day2_desc":"தயாரிக்கப்பட்ட மண்ணில் தக்காளி விதைகளை சுமார் 1/4 அங்குல ஆழத்தில் நடவும்.","tomato_quest_day7_title":"மென்மையான நீர்ப்பாசனம்","tomato_quest_day7_desc":"முளைப்பதற்கு உதவ, மண்ணை ஈரப்பதமாக வைத்திருக்கவும், ஆனால் தண்ணீர் தேங்காமல் பார்த்துக் கொள்ளவும்.","tomato_quest_day12_title":"முளைகளை சரிபார்க்கவும்","tomato_quest_day12_desc":"மண்ணிலிருந்து வெளிவரும் பச்சை முளைகளின் முதல் அறிகுறிகளைப் பாருங்கள்.","tomato_quest_day18_title":"சூரிய ஒளி வழங்கவும்","tomato_quest_day18_desc":"நாற்றுகளுக்கு ஒரு நாளைக்கு குறைந்தது 6-8 மணிநேர சூரிய ஒளி கிடைப்பதை உறுதி செய்யவும்.","tomato_quest_day25_title":"நாற்றுகளை மெல்லியதாக்கவும்","tomato_quest_day25_desc":"வலுவான நாற்றுக்கு அதிக இடம் கொடுக்க பலவீனமான நாற்றுகளை மெதுவாக அகற்றவும்.","tomato_quest_day30_title":"ஆழமாக தண்ணீர் பாய்ச்சவும்","tomato_quest_day30_desc":"வலுவான வேர் வளர்ச்சியை ஊக்குவிக்க ஆழமாகவும் குறைவாகவும் தண்ணீர் பாய்ச்சவும்.","tomato_quest_day35_title":"இயற்கை தழைக்கூளம் இடவும்","tomato_quest_day35_desc":"மண்ணின் ஈரப்பதத்தைத் தக்கவைக்கவும், களைகளைத் தடுக்கவும் வைக்கோல் அல்லது மரச் சில்லுகளின் ஒரு அடுக்கைச் சேர்க்கவும்.","tomato_quest_day40_title":"ஒரு குச்சியை நிறுவவும்","tomato_quest_day40_desc":"செடி உயரமாக வளரும்போது அதற்கு ஆதரவளிக்க செடிக்கு அருகில் ஒரு குச்சி அல்லது கூண்டை வைக்கவும்.","tomato_quest_day45_title":"இயற்கை பூச்சி ரோந்து","tomato_quest_day45_desc":"இலைகளில் பூச்சிகள் உள்ளதா என சரிபார்க்கவும். முடிந்தால் பொறிவண்டு போன்ற நன்மை செய்யும் பூச்சிகளை அறிமுகப்படுத்துங்கள்.","tomato_quest_day52_title":"கீழ் இலைகளை கத்தரிக்கவும்","tomato_quest_day52_desc":"காற்றோட்டத்தை மேம்படுத்தவும், நோயைத் தடுக்கவும் கீழ் இலைகளை அகற்றவும்.","tomato_quest_day60_title":"முதல் அறுவடை!","tomato_quest_day60_desc":"முதல் பழுத்த தக்காளியை அறுவடை செய்யுங்கள். உங்கள் நிலையான விவசாயத்தின் பலன்களை அனுபவிக்கவும்!","dashboardCommunityTitle":"சமூகம் & தரவரிசைகள்","dashboardCommunityDesc":"மற்ற விவசாயிகளுடன் இணையுங்கள்!","dashboardCommunityViewFeed":"ஊட்டத்தைக் காண்க","dashboardCommunityViewLeaderboard":"தலைமைப் பலகையைச் சரிபார்க்கவும்","wheat_quest_day1_title":"மண் pH ஐ சோதிக்கவும்","wheat_quest_day1_desc":"உங்கள் மண்ணின் pH அளவை சோதிக்கவும். கோதுமை 6.0 முதல் 7.0 வரை pH ஐ விரும்புகிறது.","wheat_quest_day15_title":"பாதுகாப்பு உழவு","wheat_quest_day15_desc":"நிலத்தை தயாரிக்க குறைந்தபட்ச உழவைப் பயன்படுத்தவும். இது மண் அரிப்பைக் குறைத்து ஈரப்பதத்தைத் தக்கவைக்கிறது.","wheat_quest_day30_title":"திறமையான நீர்ப்பாசனம்","wheat_quest_day30_desc":"தண்ணீரை சேமிக்கவும், வேர்களுக்கு நேரடியாக வழங்கவும் முதல் நீர்ப்பாசனத்திற்கு சொட்டு நீர் பாசனத்தைப் பயன்படுத்தவும்.","wheat_quest_day45_title":"கையேடு களைக் கட்டுப்பாடு","wheat_quest_day45_desc":"களைக்கொல்லிகளைப் பயன்படுத்தாமல் ஊட்டச்சத்துக்களுக்கான போட்டியைத் தடுக்க, களைகளைக் கண்டறிந்து கையால் அகற்றவும்.","wheat_quest_day60_title":"பயனுள்ள பூச்சிகளை ஈர்க்கவும்","wheat_quest_day60_desc":"அருகிலுள்ள தீவனப்புல் போன்ற பூக்களை நட்டு, அசுவினி போன்ற பூச்சிகளை இரையாகக் கொள்ளும் பொறிவண்டுகள் மற்றும் பிற பூச்சிகளை ஈர்க்கவும்.","wheat_quest_day75_title":"உரத் தேநீரைப் பயன்படுத்துங்கள்","wheat_quest_day75_desc":"வளரும் கோதுமைக்கு இயற்கையான, ஊட்டச்சத்து நிறைந்த இலைவழி உணவாக உரத் தேநீரைக் காய்ச்சிப் பயன்படுத்துங்கள்.","wheat_quest_day90_title":"நோய்க் கண்காணிப்பு","wheat_quest_day90_desc":"துரு அல்லது பூஞ்சை காளான் அறிகுறிகளுக்காக இலைகளை ஆய்வு செய்யவும். தேவைப்பட்டால் காற்றோட்டத்தை மேம்படுத்தவும்.","wheat_quest_day120_title":"நிலையான அறுவடை","wheat_quest_day120_desc":"பொன்னிற கோதுமையை அறுவடை செய்யுங்கள். மண்ணை வளப்படுத்த, தட்டைகளை வயலில் தழைக்கூளமாக விட்டு விடுங்கள்.","corn_quest_day1_title":"துணை நடவு தயாரிப்பு","corn_quest_day1_desc":"'மூன்று சகோதரிகள்' தோட்டத்தைத் திட்டமிடுங்கள். சோளம் அவரைக்கு ஒரு தண்டு வழங்குகிறது, இது மண்ணில் நைட்ரஜனைச் சேர்க்கிறது.","corn_quest_day10_title":"தொகுதிகளாக நடவும்","corn_quest_day10_desc":"காற்று மகரந்தச் சேர்க்கையை மேம்படுத்த, நீண்ட வரிசைகளுக்குப் பதிலாக குறுகிய, செவ்வகத் தொகுதிகளில் சோள விதைகளை விதைக்கவும்.","corn_quest_day25_title":"உரத்துடன் பக்க உரம்","corn_quest_day25_desc":"ஊட்டச்சத்துக்களை மெதுவாக வெளியிட, தண்டுகளின் அடிப்பகுதியில் வளமான உரத்தின் ஒரு அடுக்கைச் சேர்க்கவும்.","corn_quest_day40_title":"இயற்கை பூச்சி பாதுகாப்பு","corn_quest_day40_desc":"சோளக் கதிர் புழுக்களுக்காக dozor. அவற்றைத் தடுக்க ஒவ்வொரு கதிரின் நுனியிலும் ஒரு துளி கனிம எண்ணெயைப் பயன்படுத்துங்கள்.","corn_quest_day60_title":"மகரந்தச் சேர்க்கை சரிபார்ப்பு","corn_quest_day60_desc":"தண்டுகளின் மேற்பகுதியில் மஞ்சள் மகரந்தத்தை உதிர்க்கும் குஞ்சங்களைப் பாருங்கள். உதவ, அவற்றை மெதுவாக அசைக்கவும்.","corn_quest_day75_title":"பால் சோதனை","corn_quest_day75_desc":"பழுத்ததை சோதிக்கவும். உங்கள் விரல் நகத்தால் ஒரு விதையைத் துளைக்கவும்; சாறு பால் போல் இருந்தால், அது அறுவடைக்குத் தயாராக உள்ளது.","corn_quest_day90_title":"அறுவடை & தழைக்கூளம்","corn_quest_day90_desc":"சோளக் கதிர்களை அறுவடை செய்யுங்கள். தண்டுகளை வெட்டி, அவை மட்கி மண்ணுக்கு உணவளிக்க தரையில் விட்டு விடுங்கள்.","potato_quest_day1_title":"உங்கள் உருளைக்கிழங்கை முளைக்கட்டவும்","potato_quest_day1_desc":"விதை உருளைக்கிழங்கை நடவு செய்வதற்கு முன் ('முளைக்கட்டுதல்') அவற்றை ஒரு பிரகாசமான, குளிர்ச்சியான இடத்தில் வைத்து முளைக்க ஊக்குவிக்கவும்.","potato_quest_day10_title":"பள்ளங்களில் நடவும்","potato_quest_day10_desc":"ஊட்டச்சத்திற்காக அடியில் ஒரு அடுக்கு உரத்துடன் முளைத்த உருளைக்கிழங்கை ஒரு பள்ளத்தில் நடவும்.","potato_quest_day25_title":"முதல் மண் அணைப்பு","potato_quest_day25_desc":"செடியின் அடிப்பகுதியைச் சுற்றி மண்ணை அணைக்கவும். இது புதிய உருளைக்கிழங்கை சூரிய ஒளியில் இருந்து பாதுகாக்கிறது.","potato_quest_day40_title":"பூச்சி ரோந்து","potato_quest_day40_desc":"கொலராடோ உருளைக்கிழங்கு வண்டுகள் மற்றும் அவற்றின் புழுக்களுக்காக இலைகளை ஆய்வு செய்யவும். உங்கள் செடிகளைப் பாதுகாக்க அவற்றை கையால் எடுத்து விடுங்கள்.","potato_quest_day55_title":"இரண்டாவது மண் அணைப்பு","potato_quest_day55_desc":"செடிகள் உயரமாக வளரும்போது அவற்றைச் சுற்றி மற்றொரு அடுக்கு மண் அல்லது வைக்கோல் தழைக்கூளத்தைச் சேர்க்கவும்.","potato_quest_day70_title":"தொடர்ச்சியான ஈரப்பதம்","potato_quest_day70_desc":"மண்ணை சமமாக ஈரப்பதமாக வைத்திருக்க ஆழமாகவும் தவறாமலும் தண்ணீர் பாய்ச்சவும், இது உருளைக்கிழங்கில் சிரங்கு வராமல் தடுக்க உதவுகிறது.","potato_quest_day90_title":"செடி வாட காத்திருக்கவும்","potato_quest_day90_desc":"செடியின் இலைகள் மஞ்சள் நிறமாக மாறி இறந்துவிடும். இது உருளைக்கிழங்கு முதிர்ச்சியடைவதற்கான அறிகுறியாகும்.","potato_quest_day100_title":"மென்மையான அறுவடை","potato_quest_day100_desc":"ஒரு தோட்டக் கவரியால் உங்கள் உருளைக்கிழங்கை கவனமாக தோண்டி எடுக்கவும். சேமிப்பதற்கு முன் சில மணிநேரங்களுக்கு அவற்றை உலர விடவும்.","dashboardStreakTitle":"தினசரி தொடர்ச்சி","marketplaceTitle":"சந்தை","marketplaceTabBuy":"வாங்க","marketplaceTabSell":"விற்க","marketplaceCategoryAll":"அனைத்தும்","marketplaceCategoryCrops":"பயிர்கள்","marketplaceCategoryTools":"கருவிகள்","marketplaceCategoryServices":"சேவைகள்","marketplacePrice":"விலை","marketplaceQuantity":"அளவு","marketplaceSeller":"விற்பனையாளர்","marketplaceBuyButton":"வாங்க","marketplaceSellTitle":"உங்கள் இருப்பிலிருந்து விற்கவும்","marketplaceSellItemLabel":"உங்கள் இருப்பிலிருந்து பொருள்","marketplaceSellQuantityLabel":"அளவு","marketplaceSellPriceLabel":"ஒரு பொருளின் விலையை அமைக்கவும் (₹)","marketplaceSellCategoryLabel":"வகை","marketplaceSellButton":"விற்பனைக்கு பொருளை பட்டியலிடவும்","buySuccess":"கொள்முதல் வெற்றி!","sellSuccess":"பொருள் வெற்றிகரமாக பட்டியலிடப்பட்டது!","notEnoughFunds":"போதுமான ரூபாய் இல்லை!","notEnoughStock":"போதுமான இருப்பு இல்லை!","item_shovel":" மண்வெட்டி","item_watering_can":"நீர்ப்பாசன கேன்","item_seeds_tomato":"தக்காளி விதைகள்","service_soil_test":"மண் பரிசோதனை சேவை","wallet":"பணப்பை","dashboardMarketplaceTitle":"சந்தை","dashboardMarketplaceDesc":"கருவிகளை வாங்கவும், உங்கள் அறுவடையை விற்கவும்!","dashboardMarketplaceButton":"சந்தைக்குச் செல்லவும்","marketplaceSellInstruction":"விற்பனைக்குத் தேர்ந்தெடுக்க கீழே உள்ள ஒரு பொருளைக் கிளிக் செய்யவும்.","marketplaceSellYourInventory":"உங்கள் இருப்பு","marketplaceSellNoItems":"உங்கள் இருப்பில் விற்க எதுவும் இல்லை.","marketplaceSellSelected":"தேர்ந்தெடுக்கப்பட்ட பொருள்","marketplaceSellEarnings":"சாத்தியமான வருவாய்","dashboardCurrentLevel":"தற்போதைய நிலை","dashboardLevelAbbr":"நிலை","dashboardGuidesTitle":"நிலையான வழிகாட்டிகள்","dashboardGuidesDesc":"நிலையான விவசாய நுட்பங்களைக் கற்றுக்கொள்ளுங்கள்.","dashboardGuidesButton":"வழிகாட்டிகளைக் காண்க","learnTabGuides":"வழிகாட்டிகள்","learnTabQuizzes":"வினாடி வினாக்கள்","guide_water_conservation_title":"நீர் சேமிப்பு","guide_water_conservation_desc":"உங்கள் பண்ணையில் தண்ணீரை திறமையாகப் பயன்படுத்தவும், இந்த விலைமதிப்பற்ற வளத்தை சேமிக்கவும் நுட்பங்களைக் கற்றுக்கொள்ளுங்கள்.","guide_water_conservation_task_1_title":"சொட்டு நீர் பாசனத்தை நிறுவவும்","guide_water_conservation_task_2_title":"மண்ணில் தழைக்கூளம் இடவும்","guide_water_conservation_task_3_title":"அதிகாலையில் தண்ணீர் பாய்ச்சவும்","guide_water_conservation_task_4_title":"மழைநீரை சேகரிக்கவும்","guide_water_conservation_task_5_title":"வறட்சியைத் தாங்கும் பயிர்களைத் தேர்ந்தெடுக்கவும்","guide_crop_rotation_title":"பயிர் சுழற்சி","guide_crop_rotation_desc":"மண் ஆரோக்கியத்தைப் பராமரிக்கவும், நோய்களைத் தடுக்கவும், பூச்சிகளைக் குறைக்கவும் பயிர்களை சுழற்றுவதன் முக்கியத்துவத்தைப் புரிந்து கொள்ளுங்கள்.","guide_crop_rotation_task_1_title":"3 ஆண்டு சுழற்சி சுழற்சியைத் திட்டமிடுங்கள்","guide_crop_rotation_task_2_title":"நைட்ரஜனுக்காக பயறு வகைகளை நடவும்","guide_crop_rotation_task_3_title":"ஒரே குடும்பத்தைச் சேர்ந்த பயிர்களை நடுவதைத் தவிர்க்கவும்","guide_crop_rotation_task_4_title":"மூடு பயிர்களை இணைக்கவும்","guide_crop_rotation_task_5_title":"உங்கள் சுழற்சிகளின் பதிவை வைத்திருங்கள்","guide_composting_101_title":"உரமாக்குதல் 101","guide_composting_101_desc":"சமையலறைக் கழிவுகள் மற்றும் தோட்டக் கழிவுகளை உங்கள் தாவரங்களுக்கு ஊட்டச்சத்து நிறைந்த மண்ணாக மாற்றுவது எப்படி என்று அறிக.","guide_composting_101_task_1_title":"உரமிடுவதற்கு ஒரு இடத்தைத் தேர்ந்தெடுக்கவும்","guide_composting_101_task_2_title":"உங்கள் 'பழுப்பு' & 'பச்சை' பொருட்களை சேகரிக்கவும்","guide_composting_101_task_3_title":"உங்கள் உரக் குவியலை அடுக்கவும்","guide_composting_101_task_4_title":"குவியலை ஈரமாக வைத்திருங்கள்","guide_composting_101_task_5_title":"உங்கள் உரத்தை தவறாமல் திருப்புங்கள்","guide_natural_pest_control_title":"இயற்கை பூச்சிக் கட்டுப்பாடு","guide_natural_pest_control_desc":"ஒரு இயற்கை சூழலை ஊக்குவிப்பதன் மூலம் தீங்கு விளைவிக்கும் இரசாயனங்கள் இல்லாமல் உங்கள் பயிர்களை பூச்சிகளிடமிருந்து பாதுகாக்கவும்.","guide_natural_pest_control_task_1_title":"பயனுள்ள பூச்சிகளை அறிமுகப்படுத்துங்கள்","guide_natural_pest_control_task_2_title":"துணை நடவைப் பயன்படுத்தவும்","guide_natural_pest_control_task_3_title":"ஒரு வேப்ப எண்ணெய் தெளிப்பை உருவாக்கவும்","guide_natural_pest_control_task_4_title":"உடல் தடைகளை (வலைகள்) அமைக்கவும்","guide_natural_pest_control_task_5_title":"பறவைகள் வர ஊக்குவிக்கவும்","dashboardTipsTitle":"விவசாய குறிப்புகள் & தீர்வுகள்","tip_drought_title":"திடீர் வறட்சி","tip_drought_cause":"காரணம்: மழை பற்றாக்குறை மற்றும் அதிக வெப்பநிலை மண்ணை உலர்த்துகிறது.","tip_drought_tips":"மண்ணின் ஈரப்பதத்தைத் தக்கவைக்க தழைக்கூளம் (வைக்கோல், மரச் சில்லுகள்) ஒரு தடிமனான அடுக்கைப் பயன்படுத்துங்கள்.|ஆழமாக ஆனால் குறைவாக அடிக்கடி, ஆவியாதலைக் குறைக்க அதிகாலையில் தண்ணீர் பாய்ச்சவும்.|வேர்களுக்கு நேரடியாக தண்ணீரை வழங்க ஒரு சொட்டு நீர் பாசன முறையை நிறுவவும்.","tip_flood_title":"எதிர்பாராத வெள்ளம்","tip_flood_cause":"காரணம்: கனமழை, நீண்ட நேரம் பெய்ததால் வயல்களில் நீர் தேங்கியுள்ளது.","tip_flood_tips":"அதிகப்படியான நீரைத் திசைதிருப்ப ஆழமற்ற அகழிகளைத் தோண்டி வடிகால் வசதியை மேம்படுத்துங்கள்.|ஈரமான மண்ணில் நடக்காமல் அல்லது கனரக இயந்திரங்களைப் பயன்படுத்தாமல் அதை இறுக்குவதைத் தவிர்க்கவும்.|மண் காய்ந்தவுடன் வேர் அழுகலை சரிபார்த்து, தேவைப்பட்டால் பூஞ்சைக் கொல்லியைப் பயன்படுத்துங்கள்.","tip_fertilizer_shortage_title":"உரப் பற்றாக்குறை","tip_fertilizer_shortage_cause":"காரணம்: விநியோகச் சங்கிலி சிக்கல்களால் வணிக உரங்கள் கிடைக்கவில்லை.","tip_fertilizer_shortage_tips":"உங்கள் சொந்த ஊட்டச்சத்து நிறைந்த உரத்தை உருவாக்க ஒரு உரக் குவியலைத் தொடங்குங்கள்.|தீவனப்பயிர் போன்ற மூடு பயிர்களை நட்டு அவற்றை மண்ணில் உழுது பசுந்தாள் உரத்தைப் பயன்படுத்துங்கள்.|விரைவான ஊட்டச்சத்து ஊக்கத்திற்காக திரவ உரமாகப் பயன்படுத்த உரத் தேநீர் தயாரிக்கவும்.","tip_seed_shortage_title":"விதை பற்றாக்குறை","tip_seed_shortage_cause":"காரணம்: உள்ளூர் சப்ளையர்களிடம் உங்கள் திட்டமிட்ட பயிர் விதைகள் கையிருப்பில் இல்லை.","tip_seed_shortage_tips":"உங்கள் சொந்த ஆரோக்கியமான, திறந்த மகரந்தச் சேர்க்கை செய்யப்பட்ட தாவரங்களிலிருந்து விதை சேமிப்பைப் பயிற்சி செய்யுங்கள்.|விதைகளைப் பரிமாறிக்கொள்ள உள்ளூர் விவசாயி நெட்வொர்க்குகள் அல்லது சமூக விதை வங்கிகளுடன் இணையுங்கள்.|இன்னும் எளிதாகக் கிடைக்கக்கூடிய பூர்வீக, உள்ளூரில் தழுவிய பயிர்களை நடவு செய்யத் தேர்வு செய்யுங்கள்.","dashboardStartQuestTitle":"ஒரு விவசாய குவெஸ்ட்டைத் தொடங்கு","carrot_quest_day1_title":"ஆழமான மண்ணைத் தயாரிக்கவும்","carrot_quest_day1_desc":"கேரட் நேராக வளர, மண்ணை ஆழமாக உழுது பாறைகளை அகற்றவும்.","carrot_quest_day15_title":"நாற்றுகளை மெல்லியதாக்கு","carrot_quest_day15_desc":"வேர்கள் வளர இடம் கொடுக்க, நாற்றுகளை சுமார் 2 அங்குல இடைவெளியில் மெல்லியதாக்கவும்.","carrot_quest_day30_title":"இலகுவான தழைக்கூளம் இடவும்","carrot_quest_day30_desc":"ஈரப்பதத்தைத் தக்கவைக்கவும், களைகளை அடக்கவும் புல் வெட்டுகளை தழைக்கூளமாகப் பயன்படுத்தவும்.","carrot_quest_day45_title":"பூச்சிகளிடமிருந்து பாதுகாக்கவும்","carrot_quest_day45_desc":"கேரட் துரு ஈக்களிடமிருந்து பாதுகாக்க வரிசை உறைகளைப் பயன்படுத்தவும்.","carrot_quest_day60_title":"வேரின் அளவைச் சரிபார்க்கவும்","carrot_quest_day60_desc":"வேர்கள் குறைந்தது 1/2 அங்குல அகலத்தில் உள்ளதா எனச் சரிபார்க்க, மேலே உள்ள மண்ணை மெதுவாக நகர்த்தவும்.","carrot_quest_day75_title":"உங்கள் கேரட்டை அறுவடை செய்யுங்கள்","carrot_quest_day75_desc":"ஒரு தோட்டக் கவரியால் மண்ணைத் தளர்த்தி, கேரட்டை மெதுவாக இழுக்கவும்.","spinach_quest_day1_title":"குளிர்ந்த மண்ணில் நடவும்","spinach_quest_day1_desc":"கீரை குளிர்ந்த காலநிலையில் செழித்து வளரும் என்பதால், வசந்த காலத்தின் துவக்கத்தில் அல்லது இலையுதிர்காலத்தில் നടുക.","spinach_quest_day10_title":"தொடர்ச்சியான ஈரப்பதத்தை உறுதி செய்யவும்","spinach_quest_day10_desc":"விரைவான வளர்ச்சியை ஊக்குவிக்கவும், முளைப்பதைத் தடுக்கவும் மண்ணை சமமாக ஈரப்பதமாக வைத்திருக்கவும்.","spinach_quest_day20_title":"நைட்ரஜனுடன் உணவளிக்கவும்","spinach_quest_day20_desc":"செழிப்பான, பச்சை இலைகளுக்கு உரத் தேநீர் அல்லது கரிம நைட்ரஜன் உரத்தைப் பயன்படுத்துங்கள்.","spinach_quest_day30_title":"பூச்சி சரிபார்ப்பு","spinach_quest_day30_desc":"அசுவினிகள் அல்லது இலைச் சுரங்கங்களுக்காக இலைகளை ஆய்வு செய்து, இயற்கை வைத்தியம் மூலம் சிகிச்சையளிக்கவும்.","spinach_quest_day45_title":"தொடர்ச்சியான அறுவடை","spinach_quest_day45_desc":"முதலில் வெளி இலைகளை அறுவடை செய்து, உள் இலைகள் தொடர்ந்து வளர அனுமதிக்கவும்.","backToGuides":"← வழிகாட்டிகளுக்குத் திரும்பு","harvestButton":"அறுவடை","harvestSuccess":"அறுவடை வெற்றி! நீங்கள் +{quantity} {cropName} பெற்றீர்கள்.","tts_enable":"உரையிலிருந்து பேச்சை இயக்கு","tts_disable":"உரையிலிருந்து பேச்சை முடக்கு","ttsToggleLabel":"உரையிலிருந்து பேச்சை மாற்று"};
const te = {"appName":"అగ్రిప్లే","loginTitle":"పొలానికి స్వాగతం!","loginSubtitle":"మీ ప్రయాణాన్ని ప్రారంభించడానికి మీ ఫోన్‌ను నమోదు చేయండి.","phoneLabel":"ఫోన్ నంబర్","otpLabel":"OTPని నమోదు చేయండి","loginButton":"లాగిన్","sendOtpButton":"OTP పంపండి","guestLoginButton":"అతిథిగా కొనసాగండి","navDashboard":"డాష్‌బోర్డ్","navCrops":"నా పంటలు","navLearn":"నేర్చుకోండి & పెరగండి","navCommunity":"సంఘం","navLeaderboard":"లీడర్‌బోర్డ్","navBadges":"బ్యాడ్జ్‌లు","navMarketplace":"మార్కెట్","backToDashboard":"← డాష్‌బోర్డ్‌కు తిరిగి వెళ్ళు","communityTitle":"సంఘ కేంద్రం","leaderboardTitle":"రైతు లీడర్‌బోర్డ్","filterState":"రాష్ట్రం","filterDistrict":"జిల్లా","filterVillage":"గ్రామం","filterAll":"అన్నీ","level":"స్థాయి","streak":"రోజు స్ట్రీక్","dailyTasksTitle":"రోజువారీ మిషన్లు","dashboardQuestTitle":"యాక్టివ్ క్వెస్ట్","dashboardQuestNone":"యాక్టివ్ పంట క్వెస్ట్ లేదు.","dashboardQuestStart":"ఒక క్వెస్ట్ ప్రారంభించండి","dashboardQuestToday":"నేటి పని (రోజు {day})","dashboardQuestView":"క్వెస్ట్ లాగ్ చూడండి","badgesTitle":"నా బ్యాడ్జ్‌లు","viewAllBadges":"అన్నీ చూడండి","badgeCollectionTitle":"నా బ్యాడ్జ్ సేకరణ","taskCompleteButton":"క్లెయిమ్ చేయండి","levelUpTitle":"స్థాయి పెరిగింది!","levelUpSubtitle":"మీరు స్థాయి {level}కి చేరుకున్నారు!","levelUpClose":"అద్భుతం!","cropsTitle":"ఒక కొత్త వ్యవసాయ క్వెస్ట్ ప్రారంభించండి","plantButton":"ఈ పంటను నాటండి","selectCrop":"ఒక పంటను ఎంచుకోండి","addNewCrop":"కొత్త పంటను జోడించండి","cropQuestTitle":"{cropName} క్వెస్ట్","cropQuestDay":"రోజు {day}","cropQuestComplete":"పూర్తి చేయండి","cropQuestCompleted":"పూర్తయింది","cropQuestLocked":"లాక్ చేయబడింది","quizTitle":"వ్యవసాయ క్విజ్","quizScore":"మీరు {total}కి {score} స్కోర్ చేసారు!","quizXP":"మీరు {xp} XP సంపాదించారు!","quizNext":"తదుపరి ప్రశ్న","quizFinish":"క్విజ్ ముగించు","communityFeed":"ఫీడ్","communityLeaderboard":"లీడర్‌బోర్డ్","postPlaceholder":"ఒక చిట్కా లేదా నవీకరణను పంచుకోండి...","postButton":"పోస్ట్","leaderboardRank":"ర్యాంక్","leaderboardPlayer":"ఆటగాడు","leaderboardLevel":"స్థాయి","leaderboardXP":"మొత్తం XP","task_water_plants":"మీ మొక్కలకు నీళ్ళు పోయండి","task_check_soil":"నేల తేమను తనిఖీ చేయండి","task_read_article":"ఒక వ్యవసాయ కథనాన్ని చదవండి","crop_tomato":"టమోటా","crop_wheat":"గోధుమ","crop_corn":"మొక్కజొన్న","crop_potato":"బంగాళదుంప","crop_carrot":"క్యారెట్","crop_spinach":"పాలకూర","post_1":"ఈ సీజన్‌లో నా టమోటాలు చాలా బాగా పెరుగుతున్నాయి! 🍅","post_2":"త్వరిత చిట్కా: వేప నూనెను సహజ పురుగుమందుగా ఉపయోగించండి.","post_3":"ఇప్పుడే స్థాయి 10కి చేరుకున్నాను! ఇది సరదాగా ఉంది! 🎉","quiz_q1":"ఆకు పెరుగుదలకు ఏ పోషకం చాలా ముఖ్యం?","quiz_q1_opts":"నత్రజని,భాస్వరం,పొటాషియం,కాల్షియం","quiz_q2":"పంట మార్పిడి అంటే ఏమిటి?","quiz_q2_opts":"పొలంలో పంటలను మార్చడం,పంటలకు వృత్తాకారంలో నీళ్ళు పోయడం,ఒక రకమైన ఎరువు,ఒక పంటకోత పద్ధతి","badge_newbie_name":"కొత్త రైతు","badge_newbie_desc":"మొదటి పనిని పూర్తి చేసారు. స్వాగతం!","badge_green_thumb_name":"గ్రీన్ థంబ్","badge_green_thumb_desc":"10 పనులను విజయవంతంగా పూర్తి చేసారు.","badge_first_harvest_name":"మొదటి పంటకోత","badge_first_harvest_desc":"మీ మొదటి పంటను విజయవంతంగా కోసారు.","badge_quiz_master_name":"క్విజ్ మాస్టర్","badge_quiz_master_desc":"ఒక వ్యవసాయ క్విజ్‌లో పూర్తి స్కోర్‌తో ఉత్తీర్ణులయ్యారు.","badge_streaker_name":"స్ట్రీకర్","badge_streaker_desc":"7-రోజుల స్ట్రీక్‌ను కొనసాగించారు.","badge_community_helper_name":"సంఘ సహాయకుడు","badge_community_helper_desc":"సంఘంతో ఒక ఉపయోగకరమైన చిట్కాను పంచుకున్నారు.","tomato_quest_day1_title":"సమృద్ధమైన నేలను సిద్ధం చేయండి","tomato_quest_day1_desc":"విత్తనాలకు గొప్ప పోషకాలను అందించడానికి మీ నేలలో కంపోస్ట్ కలపండి.","tomato_quest_day2_title":"విత్తనాలను నాటండి","tomato_quest_day2_desc":"సిద్ధం చేసిన నేలలో టమోటా విత్తనాలను సుమారు 1/4 అంగుళాల లోతులో నాటండి.","tomato_quest_day7_title":"సున్నితంగా నీరు పోయడం","tomato_quest_day7_desc":"మొలకెత్తడానికి సహాయపడటానికి నేలను తేమగా ఉంచండి, కానీ నీటితో నిండినది కాదు.","tomato_quest_day12_title":"మొలకల కోసం తనిఖీ చేయండి","tomato_quest_day12_desc":"నేల నుండి ఉద్భవిస్తున్న ఆకుపచ్చ మొలకల మొదటి సంకేతాల కోసం చూడండి.","tomato_quest_day18_title":"సూర్యరశ్మిని అందించండి","tomato_quest_day18_desc":"మొలకలకు రోజుకు కనీసం 6-8 గంటల సూర్యరశ్మి లభించేలా చూసుకోండి.","tomato_quest_day25_title":"మొలకలను పలుచగా చేయండి","tomato_quest_day25_desc":"బలమైన మొలకకు ఎక్కువ స్థలం ఇవ్వడానికి బలహీనమైన మొలకలను సున్నితంగా తొలగించండి.","tomato_quest_day30_title":"లోతుగా నీరు పోయండి","tomato_quest_day30_desc":"బలమైన వేరు అభివృద్ధిని ప్రోత్సహించడానికి లోతుగా మరియు తక్కువ తరచుగా నీరు పోయండి.","tomato_quest_day35_title":"సహజ మల్చ్ వేయండి","tomato_quest_day35_desc":"నేల తేమను నిలుపుకోవడానికి మరియు కలుపు మొక్కలను నివారించడానికి గడ్డి లేదా కలప చిప్స్ పొరను జోడించండి.","tomato_quest_day40_title":"ఒక కర్రను நிறுவించండి","tomato_quest_day40_desc":"మొక్క పొడవుగా పెరిగేటప్పుడు దానికి మద్దతు ఇవ్వడానికి మొక్క దగ్గర ఒక కర్ర లేదా పంజరం ఉంచండి.","tomato_quest_day45_title":"సహజ తెగుళ్ళ గస్తీ","tomato_quest_day45_desc":"తెగుళ్ళ కోసం ఆకులను తనిఖీ చేయండి. వీలైతే లేడీబగ్స్ వంటి ప్రయోజనకరమైన కీటకాలను పరిచయం చేయండి.","tomato_quest_day52_title":"దిగువ ఆకులను కత్తిరించండి","tomato_quest_day52_desc":"గాలి ప్రసరణను మెరుగుపరచడానికి మరియు వ్యాధిని నివారించడానికి దిగువ ఆకులను తొలగించండి.","tomato_quest_day60_title":"మొదటి పంటకోత!","tomato_quest_day60_desc":"మొదటి పండిన టమోటాలను కోయండి. మీ స్థిరమైన వ్యవసాయ ఫలాలను ఆస్వాదించండి!","dashboardCommunityTitle":"సంఘం & ర్యాంకింగ్‌లు","dashboardCommunityDesc":"ఇతర రైతులతో కనెక్ట్ అవ్వండి!","dashboardCommunityViewFeed":"ఫీడ్ చూడండి","dashboardCommunityViewLeaderboard":"లీడర్‌బోర్డ్ తనిఖీ చేయండి","wheat_quest_day1_title":"నేల pHను పరీక్షించండి","wheat_quest_day1_desc":"మీ నేల pH స్థాయిని పరీక్షించండి. గోధుమ 6.0 మరియు 7.0 మధ్య pHను ఇష్టపడుతుంది.","wheat_quest_day15_title":"సంరక్షణ దున్నటం","wheat_quest_day15_desc":"భూమిని సిద్ధం చేయడానికి కనీస దున్నటాన్ని ఉపయోగించండి. ఇది నేల కోతను తగ్గిస్తుంది మరియు తేమను నిలుపుకుంటుంది.","wheat_quest_day30_title":"స్మార్ట్ నీటిపారుదల","wheat_quest_day30_desc":"నీటిని ఆదా చేయడానికి మరియు దానిని నేరుగా వేళ్లకు అందించడానికి మొదటి నీటిపారుదల కోసం బిందు సేద్యాన్ని ఉపయోగించండి.","wheat_quest_day45_title":"చేతితో కలుపు నియంత్రణ","wheat_quest_day45_desc":"களைக்கொல்லிகளைப் பயன்படுத்தாமல் ஊட்டச்சத்துக்களுக்கான போட்டியைத் தடுக்க, களைகளைக் கண்டறிந்து கையால் அகற்றவும்.","wheat_quest_day60_title":"ప్రయోజనకరమైన కీటకాలను ఆకర్షించండి","wheat_quest_day60_desc":"అఫిడ్స్ వంటి తెగుళ్ళను వేటాడే లేడీబగ్స్ మరియు ఇతర కీటకాలను ఆకర్షించడానికి సమీపంలో క్లోవర్ వంటి పువ్వులను నాటండి.","wheat_quest_day75_title":"కంపోస్ట్ టీని వర్తించండి","wheat_quest_day75_desc":"మీ పెరుగుతున్న గోధుమలకు సహజమైన, పోషకాలు అధికంగా ఉండే ఆకుల ఫీడ్‌గా కంపోస్ట్ టీని తయారు చేసి వర్తించండి.","wheat_quest_day90_title":"వ్యాధి పర్యవేక్షణ","wheat_quest_day90_desc":"తుప్పు లేదా బూజు సంకేతాల కోసం ఆకులను తనిఖీ చేయండి. అవసరమైతే గాలి ప్రసరణను మెరుగుపరచండి.","wheat_quest_day120_title":"స్థిరమైన పంటకోత","wheat_quest_day120_desc":"బంగారు గోధుమలను కోయండి. నేలను సుసంపన్నం చేయడానికి కాడలను పొలంలో మల్చ్‌గా వదిలివేయండి.","corn_quest_day1_title":"సహచర నాటడం తయారీ","corn_quest_day1_desc":"'మూడు సోదరీమణులు' తోటను ప్లాన్ చేయండి. మొక్కజొన్న బీన్స్‌కు ఒక కాడను అందిస్తుంది, ఇది నేలకు నత్రజనిని జోడిస్తుంది.","corn_quest_day10_title":"బ్లాక్‌లలో నాటండి","corn_quest_day10_desc":"గాలి పరాగసంపర్కాన్ని మెరుగుపరచడానికి పొడవైన వరుసలకు బదులుగా చిన్న, దీర్ఘచతురస్రాకార బ్లాక్‌లలో మొక్కజొన్న విత్తనాలను విత్తండి.","corn_quest_day25_title":"కంపోస్ట్‌తో సైడ్-డ్రెస్","corn_quest_day25_desc":"పోషకాలను నెమ్మదిగా విడుదల చేయడానికి కాడల ఆధారం వెంట గొప్ప కంపోస్ట్ పొరను జోడించండి.","corn_quest_day40_title":"సహజ తెగుళ్ళ రక్షణ","corn_quest_day40_desc":"మొక్కజొన్న చెవి పురుగుల కోసం doµu. వాటిని నిరోధించడానికి ప్రతి చెవి కొనకు ఒక చుక్క ఖనిజ నూనెను వర్తించండి.","corn_quest_day60_title":"పరాగసంపర్క తనిఖీ","corn_quest_day60_desc":"కాడల పైభాగంలో పసుపు పరాగాన్ని తొలగించే టాసెల్స్ కోసం చూడండి. సహాయం చేయడానికి వాటిని సున్నితంగా కదిలించండి.","corn_quest_day75_title":"పాలు పరీక్ష","corn_quest_day75_desc":"పక్వత కోసం పరీక్షించండి. మీ వేలుగోలుతో ఒక గింజను కుట్టండి; రసం పాలలా ఉంటే, అది పంటకోతకు సిద్ధంగా ఉంది.","corn_quest_day90_title":"పంటకోత & మల్చ్","corn_quest_day90_desc":"మొక్కజొన్న చెవులను కోయండి. కాడలను కత్తిరించి, కుళ్ళిపోయి నేలను పోషించడానికి వాటిని నేలమీద వదిలివేయండి.","potato_quest_day1_title":"మీ బంగాళదుంపలను చిట్ చేయండి","potato_quest_day1_desc":"విత్తన బంగాళదుంపలను ప్రకాశవంతమైన, చల్లని ప్రదేశంలో ఉంచడం ద్వారా నాటడానికి ('చిట్టింగ్') ముందు మొలకెత్తడానికి ప్రోత్సహించండి.","potato_quest_day10_title":"కందకాలలో నాటండి","potato_quest_day10_desc":"పోషణ కోసం అడుగున కంపోస్ట్ పొరతో మొలకెత్తిన బంగాళదుంపలను కందకంలో నాటండి.","potato_quest_day25_title":"మొదటి హిల్లింగ్","potato_quest_day25_desc":"మొక్క ఆధారం చుట్టూ మట్టిని వేయండి. ఇది కొత్త బంగాళదుంపలను సూర్యరశ్మి నుండి రక్షిస్తుంది.","potato_quest_day40_title":"తెగుళ్ళ గస్తీ","potato_quest_day40_desc":"కొలరాడో బంగాళదుంప బీటిల్స్ మరియు వాటి లార్వాల కోసం ఆకులను తనిఖీ చేయండి. మీ మొక్కలను రక్షించడానికి వాటిని చేతితో తీయండి.","potato_quest_day55_title":"రెండవ హిల్లింగ్","potato_quest_day55_desc":"మొక్కలు పొడవుగా పెరిగేకొద్దీ వాటి చుట్టూ మరో మట్టి లేదా గడ్డి మల్చ్ పొరను జోడించండి.","potato_quest_day70_title":"స్థిరమైన తేమ","potato_quest_day70_desc":"నేలను సమానంగా తేమగా ఉంచడానికి లోతుగా మరియు క్రమం తప్పకుండా నీరు పోయండి, ఇది బంగాళదుంపలపై పొక్కులను నివారించడానికి సహాయపడుతుంది.","potato_quest_day90_title":"డై-బ్యాక్ కోసం వేచి ఉండండి","potato_quest_day90_desc":"మొక్క ఆకులు పసుపు రంగులోకి మారి చనిపోతాయి. ఇది బంగాళదుంపలు పరిపక్వం చెందుతున్నాయని సూచిస్తుంది.","potato_quest_day100_title":"సున్నితమైన పంటకోత","potato_quest_day100_desc":"మీ బంగాళదుంపలను తోట ఫోర్క్‌తో జాగ్రత్తగా తవ్వండి. నిల్వ చేయడానికి ముందు వాటిని కొన్ని గంటలు క్యూర్ చేయనివ్వండి.","dashboardStreakTitle":"రోజువారీ స్ట్రీక్","marketplaceTitle":"మార్కెట్","marketplaceTabBuy":"కొనుగోలు","marketplaceTabSell":"అమ్మకం","marketplaceCategoryAll":"అన్నీ","marketplaceCategoryCrops":"పంటలు","marketplaceCategoryTools":"పనిముట్లు","marketplaceCategoryServices":"సేవలు","marketplacePrice":"ధర","marketplaceQuantity":"పరిమాణం","marketplaceSeller":"విక్రేత","marketplaceBuyButton":"కొనుగోలు","marketplaceSellTitle":"మీ ఇన్వెంటరీ నుండి అమ్మండి","marketplaceSellItemLabel":"మీ ఇన్వెంటరీ నుండి వస్తువు","marketplaceSellQuantityLabel":"పరిమాణం","marketplaceSellPriceLabel":"వస్తువుకు ధరను సెట్ చేయండి (₹)","marketplaceSellCategoryLabel":"వర్గం","marketplaceSellButton":"అమ్మకానికి వస్తువును జాబితా చేయండి","buySuccess":"కొనుగోలు విజయవంతం!","sellSuccess":"వస్తువు విజయవంతంగా జాబితా చేయబడింది!","notEnoughFunds":"తగినన్ని రూపాయలు లేవు!","notEnoughStock":"తగినంత స్టాక్ లేదు!","item_shovel":"పార","item_watering_can":"నీరు పోసే డబ్బా","item_seeds_tomato":"టమోటా విత్తనాలు","service_soil_test":"నేల పరీక్ష సేవ","wallet":"వాలెట్","dashboardMarketplaceTitle":"మార్కెట్","dashboardMarketplaceDesc":"పనిముట్లు కొనండి మరియు మీ పంటను అమ్మండి!","dashboardMarketplaceButton":"మార్కెట్‌కు వెళ్లండి","marketplaceSellInstruction":"అమ్మకం కోసం ఎంచుకోవడానికి క్రింద ఉన్న వస్తువుపై క్లిక్ చేయండి.","marketplaceSellYourInventory":"మీ ఇన్వెంటరీ","marketplaceSellNoItems":"మీ ఇన్వెంటరీలో అమ్మడానికి ఏమీ లేదు.","marketplaceSellSelected":"ఎంచుకున్న వస్తువు","marketplaceSellEarnings":"సంభావ్య ఆదాయాలు","dashboardCurrentLevel":"ప్రస్తుత స్థాయి","dashboardLevelAbbr":"స్థాయి","dashboardGuidesTitle":"స్థిరమైన గైడ్‌లు","dashboardGuidesDesc":"స్థిరమైన వ్యవసాయ పద్ధతులను నేర్చుకోండి.","dashboardGuidesButton":"గైడ్‌లను చూడండి","learnTabGuides":"గైడ్‌లు","learnTabQuizzes":"క్విజ్‌లు","guide_water_conservation_title":"నీటి సంరక్షణ","guide_water_conservation_desc":"మీ పొలంలో నీటిని సమర్థవంతంగా ఉపయోగించడానికి మరియు ఈ విలువైన వనరును సంరక్షించడానికి పద్ధతులను నేర్చుకోండి.","guide_water_conservation_task_1_title":"బిందు సేద్యాన్ని நிறுவించండి","guide_water_conservation_task_2_title":"నేలపై మల్చ్ వేయండి","guide_water_conservation_task_3_title":"ఉదయాన్నే నీరు పోయండి","guide_water_conservation_task_4_title":"వర్షపు నీటిని సేకరించండి","guide_water_conservation_task_5_title":"కరువును తట్టుకునే పంటలను ఎంచుకోండి","guide_crop_rotation_title":"పంట మార్పిడి","guide_crop_rotation_desc":"నేల ఆరోగ్యాన్ని కాపాడుకోవడానికి, వ్యాధులను నివారించడానికి మరియు తెగుళ్ళను తగ్గించడానికి పంటలను మార్చడం యొక్క ప్రాముఖ్యతను అర్థం చేసుకోండి.","guide_crop_rotation_task_1_title":"3-సంవత్సరాల మార్పిడి చక్రాన్ని ప్లాన్ చేయండి","guide_crop_rotation_task_2_title":"నత్రజని కోసం పప్పుధాన్యాలను నాటండి","guide_crop_rotation_task_3_title":"ఒకే కుటుంబానికి చెందిన మొక్కలను నాటడం தவிர்க்கவும்","guide_crop_rotation_task_4_title":"కవర్ పంటలను చేర్చండి","guide_crop_rotation_task_5_title":"మీ మార్పిడుల రికార్డును ఉంచండి","guide_composting_101_title":"కంపోస్టింగ్ 101","guide_composting_101_desc":"వంటగది వ్యర్థాలు మరియు పెరటి వ్యర్థాలను మీ మొక్కలకు పోషకాలు అధికంగా ఉండే మట్టిగా మార్చడం నేర్చుకోండి.","guide_composting_101_task_1_title":"కంపోస్టింగ్ స్థలాన్ని ఎంచుకోండి","guide_composting_101_task_2_title":"మీ 'గోధుమ' & 'ఆకుపచ్చ' పదార్థాలను సేకరించండి","guide_composting_101_task_3_title":"మీ కంపోస్ట్ కుప్పను పొరలుగా వేయండి","guide_composting_101_task_4_title":"కుప్పను తేమగా ఉంచండి","guide_composting_101_task_5_title":"మీ కంపోస్ట్‌ను క్రమం తప్పకుండా తిప్పండి","guide_natural_pest_control_title":"సహజ తెగుళ్ల నియంత్రణ","guide_natural_pest_control_desc":"సహజ పర్యావరణ వ్యవస్థను ప్రోత్సహించడం ద్వారా హానికరమైన రసాయనాలు లేకుండా మీ పంటలను తెగుళ్ల నుండి రక్షించండి.","guide_natural_pest_control_task_1_title":"ప్రయోజనకరమైన కీటకాలను పరిచయం చేయండి","guide_natural_pest_control_task_2_title":"సహచర నాటడాన్ని ఉపయోగించండి","guide_natural_pest_control_task_3_title":"వేప నూనె స్ప్రేని సృష్టించండి","guide_natural_pest_control_task_4_title":"భౌతిక అడ్డంకులను (వలలు) ఏర్పాటు చేయండి","guide_natural_pest_control_task_5_title":"పక్షులను సందర్శించడానికి ప్రోత్సహించండి","dashboardTipsTitle":"వ్యవసాయ చిట్కాలు & పరిష్కారాలు","tip_drought_title":"ఆకస్మిక కరువు","tip_drought_cause":"కారణం: వర్షాభావం మరియు అధిక ఉష్ణోగ్రతలు నేలను ఎండబెడుతున్నాయి.","tip_drought_tips":"నేల తేమను నిలుపుకోవడానికి మందపాటి మల్చ్ (గడ్డి, కలప చిప్స్) పొరను వేయండి.|బాష్పీభవనాన్ని తగ్గించడానికి ఉదయాన్నే, లోతుగా కానీ తక్కువ తరచుగా నీరు పెట్టండి.|వేళ్లకు నేరుగా నీటిని అందించడానికి బిందు సేద్యం వ్యవస్థను நிறுவించండి.","tip_flood_title":"అనూహ్య వరదలు","tip_flood_cause":"కారణం: భారీ, సుదీర్ఘ వర్షపాతం పొలాలను నీటితో నింపింది.","tip_flood_tips":"అదనపు నీటిని మళ్లించడానికి నిస్సారమైన కందకాలు తవ్వడం ద్వారా డ్రైనేజీని మెరుగుపరచండి.|తడి నేలపై నడవకుండా లేదా భారీ యంత్రాలను ఉపయోగించకుండా దానిని సంపీడనం చేయకుండా ఉండండి.|నేల ఆరిన తర్వాత వేరు కుళ్ళిపోయిందో లేదో తనిఖీ చేయండి మరియు అవసరమైతే శిలీంద్రనాశకాన్ని వర్తించండి.","tip_fertilizer_shortage_title":"ఎరువుల కొరత","tip_fertilizer_shortage_cause":"కారణం: సరఫరా గొలుసు సమస్యలు వాణిజ్య ఎరువులను అందుబాటులో లేకుండా చేశాయి.","tip_fertilizer_shortage_tips":"మీ స్వంత పోషకాలు అధికంగా ఉండే ఎరువును సృష్టించడానికి కంపోస్ట్ కుప్పను ప్రారంభించండి.|క్లోవర్ వంటి కవర్ పంటలను నాటడం మరియు వాటిని నేలలో దున్నడం ద్వారా పచ్చిరొట్ట ఎరువును ఉపయోగించండి.|త్వరిత పోషక బూస్ట్ కోసం ద్రవ ఎరువుగా ఉపయోగించడానికి కంపోస్ట్ టీని తయారు చేయండి.","tip_seed_shortage_title":"విత్తనాల లభ్యత లేకపోవడం","tip_seed_shortage_cause":"కారణం: మీ ప్రణాళికాబద్ధమైన పంట విత్తనాల కోసం స్థానిక సరఫరాదారుల వద్ద స్టాక్ లేదు.","tip_seed_shortage_tips":"మీ స్వంత ఆరోగ్యకరమైన, బహిరంగ-పరాగసంపర్క మొక్కల నుండి విత్తన சேமிப்பை ప్రాక్టీస్ చేయండి.|విత్తనాలను మార్పిడి చేసుకోవడానికి స్థానిక రైతు నెట్‌వర్క్‌లు లేదా కమ్యూనిటీ సీడ్ బ్యాంకులతో కనెక్ట్ అవ్వండి.|సులభంగా అందుబాటులో ఉండే దేశీయ, స్థానికంగా అనుకూలమైన పంటలను నాటడానికి ఎంచుకోండి.","dashboardStartQuestTitle":"ఒక వ్యవసాయ క్వెస్ట్ ప్రారంభించండి","carrot_quest_day1_title":"లోతైన నేలను సిద్ధం చేయండి","carrot_quest_day1_desc":"క్యారెట్లు నిటారుగా పెరగడానికి నేలను లోతుగా దున్ని రాళ్లను తొలగించండి.","carrot_quest_day15_title":"మొలకలను పలుచగా చేయండి","carrot_quest_day15_desc":"వేర్లు పెరగడానికి స్థలం ఇవ్వడానికి మొలకలను సుమారు 2 అంగుళాల దూరంలో పలుచగా చేయండి.","carrot_quest_day30_title":"తేలికపాటి మల్చ్ వేయండి","carrot_quest_day30_desc":"తేమను నిలుపుకోవడానికి మరియు కలుపు మొక్కలను అణచివేయడానికి గడ్డి కత్తిరింపులను మల్చ్‌గా ఉపయోగించండి.","carrot_quest_day45_title":"తెగుళ్ళ నుండి రక్షించండి","carrot_quest_day45_desc":"క్యారెట్ రస్ట్ ఫ్లైస్ నుండి రక్షించడానికి వరుస కవర్లను ఉపయోగించండి.","carrot_quest_day60_title":"వేరు పరిమాణాన్ని తనిఖీ చేయండి","carrot_quest_day60_desc":"వేర్లు కనీసం 1/2 అంగుళాల వెడల్పు ఉన్నాయో లేదో తనిఖీ చేయడానికి పైభాగంలో ఉన్న నేలను సున్నితంగా కదిలించండి.","carrot_quest_day75_title":"మీ క్యారెట్లను కోయండి","carrot_quest_day75_desc":"తోట ఫోర్క్‌తో నేలను వదులుగా చేసి, క్యారెట్లను సున్నితంగా లాగండి.","spinach_quest_day1_title":"చల్లని నేలలో నాటండి","spinach_quest_day1_desc":"పాలకూర చల్లని వాతావరణంలో వృద్ధి చెందుతుంది కాబట్టి, వసంతకాలం ప్రారంభంలో లేదా శరదృతువులో నాటండి.","spinach_quest_day10_title":"స్థిరమైన తేమను నిర్ధారించుకోండి","spinach_quest_day10_desc":"వేగవంతమైన పెరుగుదలను ప్రోత్సహించడానికి మరియు బోల్టింగ్‌ను నివారించడానికి నేలను సమానంగా తేమగా ఉంచండి.","spinach_quest_day20_title":"నత్రజనితో పోషించండి","spinach_quest_day20_desc":"పచ్చని, ఆకుపచ్చని ఆకుల కోసం కంపోస్ట్ టీ లేదా సేంద్రీయ నత్రజని ఎరువును వర్తించండి.","spinach_quest_day30_title":"తెగుళ్ళ తనిఖీ","spinach_quest_day30_desc":"అఫిడ్స్ లేదా లీఫ్ మైనర్స్ కోసం ఆకులను తనిఖీ చేయండి మరియు సహజ నివారణలతో చికిత్స చేయండి.","spinach_quest_day45_title":"నిరంతర పంటకోత","spinach_quest_day45_desc":"మొదట బయటి ఆకులను కోయండి, లోపలి ఆకులు పెరుగుతూ ఉండటానికి వీలు కల్పిస్తుంది.","backToGuides":"← గైడ్‌లకు తిరిగి వెళ్లు","harvestButton":"పంటకోత","harvestSuccess":"పంటకోత విజయవంతం! మీరు +{quantity} {cropName} పొందారు.","tts_enable":"టెక్స్ట్-టు-స్పీచ్ ప్రారంభించండి","tts_disable":"టెక్స్ట్-టు-స్పీచ్ నిలిపివేయండి","ttsToggleLabel":"టెక్స్ట్ టు స్పీచ్ టోగుల్ చేయండి"};
const bn = {"appName":"এগ্রিপ্লে","loginTitle":"খামারে স্বাগতম!","loginSubtitle":"আপনার যাত্রা শুরু করতে আপনার ফোন লিখুন।","phoneLabel":"ফোন নম্বর","otpLabel":"ওটিপি লিখুন","loginButton":"লগইন","sendOtpButton":"ওটিপি পাঠান","guestLoginButton":"অতিথি হিসাবে চালিয়ে যান","navDashboard":"ড্যাশবোর্ড","navCrops":"আমার ফসল","navLearn":"শিখুন ও বাড়ুন","navCommunity":"সম্প্রদায়","navLeaderboard":"লিডারবোর্ড","navBadges":"ব্যাজ","navMarketplace":"বাজার","backToDashboard":"← ড্যাশবোর্ডে ফিরে যান","communityTitle":"কমিউনিটি হাব","leaderboardTitle":"কৃষক লিডারবোর্ড","filterState":"রাজ্য","filterDistrict":"জেলা","filterVillage":"গ্রাম","filterAll":"সব","level":"স্তর","streak":"দিনের ধারা","dailyTasksTitle":"দৈনিক মিশন","dashboardQuestTitle":"সক্রিয় কোয়েস্ট","dashboardQuestNone":"কোনো সক্রিয় ফসল কোয়েস্ট নেই।","dashboardQuestStart":"একটি কোয়েস্ট শুরু করুন","dashboardQuestToday":"আজকের কাজ (দিন {day})","dashboardQuestView":"কোয়েস্ট লগ দেখুন","badgesTitle":"আমার ব্যাজ","viewAllBadges":"সব দেখুন","badgeCollectionTitle":"আমার ব্যাজ সংগ্রহ","taskCompleteButton":"দাবি করুন","levelUpTitle":"লেভেল আপ!","levelUpSubtitle":"আপনি স্তর {level} এ পৌঁছেছেন!","levelUpClose":"দারুণ!","cropsTitle":"একটি নতুন কৃষি কোয়েস্ট শুরু করুন","plantButton":"এই ফসল রোপণ করুন","selectCrop":"একটি ফসল নির্বাচন করুন","addNewCrop":"নতুন ফসল যোগ করুন","cropQuestTitle":"{cropName} কোয়েস্ট","cropQuestDay":"দিন {day}","cropQuestComplete":"সম্পন্ন করুন","cropQuestCompleted":"সম্পন্ন","cropQuestLocked":"লক করা","quizTitle":"কৃষি কুইজ","quizScore":"আপনি {total} এর মধ্যে {score} পেয়েছেন!","quizXP":"আপনি {xp} XP অর্জন করেছেন!","quizNext":"পরবর্তী প্রশ্ন","quizFinish":"কুইজ শেষ করুন","communityFeed":"ফিড","communityLeaderboard":"লিডারবোর্ড","postPlaceholder":"একটি টিপ বা আপডেট শেয়ার করুন...","postButton":"পোস্ট","leaderboardRank":"র‍্যাঙ্ক","leaderboardPlayer":"খেলোয়াড়","leaderboardLevel":"স্তর","leaderboardXP":"মোট XP","task_water_plants":"আপনার গাছে জল দিন","task_check_soil":"মাটির আর্দ্রতা পরীক্ষা করুন","task_read_article":"একটি কৃষি নিবন্ধ পড়ুন","crop_tomato":"টমেটো","crop_wheat":"গম","crop_corn":"ভূট্টা","crop_potato":"আলু","crop_carrot":"গাজর","crop_spinach":"পালং শাক","post_1":"এই মৌসুমে আমার টমেটোগুলি খুব ভাল বাড়ছে! 🍅","post_2":"দ্রুত টিপ: প্রাকৃতিক কীটনাশক হিসাবে নিম তেল ব্যবহার করুন।","post_3":"মাত্র লেভেল 10 এ পৌঁছেছি! এটা মজার! 🎉","quiz_q1":"পাতার বৃদ্ধির জন্য কোন পুষ্টি সবচেয়ে গুরুত্বপূর্ণ?","quiz_q1_opts":"নাইট্রোজেন,ফসফরাস,পটাশিয়াম,ক্যালসিয়াম","quiz_q2":"শস্য আবর্তন কি?","quiz_q2_opts":"একটি মাঠে ফসল ঘোরানো,বৃত্তাকারে ফসলে জল দেওয়া,এক প্রকার সার,একটি ফসল কাটার কৌশল","badge_newbie_name":"নবীন কৃষক","badge_newbie_desc":"প্রথম কাজটি সম্পন্ন করেছেন। স্বাগতম!","badge_green_thumb_name":"সবুজ আঙুল","badge_green_thumb_desc":"সফলভাবে ১০টি কাজ সম্পন্ন করেছেন।","badge_first_harvest_name":"প্রথম ফসল","badge_first_harvest_desc":"সফলভাবে আপনার প্রথম ফসল কেটেছেন।","badge_quiz_master_name":"কুইজ মাস্টার","badge_quiz_master_desc":"একটি কৃষি কুইজে নিখুঁত স্কোর করেছেন।","badge_streaker_name":"স্ট্রিকার","badge_streaker_desc":"একটি ৭ দিনের ধারা বজায় রেখেছেন।","badge_community_helper_name":"সম্প্রদায় সহায়ক","badge_community_helper_desc":"সম্প্রদায়ের সাথে একটি সহায়ক টিপ শেয়ার করেছেন।","tomato_quest_day1_title":"সমৃদ্ধ মাটি প্রস্তুত করুন","tomato_quest_day1_desc":"বীজের জন্য সমৃদ্ধ পুষ্টি সরবরাহ করতে আপনার মাটিতে কম্পোস্ট মেশান।","tomato_quest_day2_title":"বীজ বপন করুন","tomato_quest_day2_desc":"প্রস্তুত মাটিতে প্রায় ১/৪ ইঞ্চি গভীরে টমেটো বীজ রোপণ করুন।","tomato_quest_day7_title":"আলতো করে জল দেওয়া","tomato_quest_day7_desc":"অঙ্কুরোদগমে সাহায্য করার জন্য মাটি আর্দ্র রাখতে কুয়াশা দিন, কিন্তু জল জমে না।","tomato_quest_day12_title":"চারা পরীক্ষা করুন","tomato_quest_day12_desc":"মাটি থেকে সবুজ চারা বের হওয়ার প্রথম লক্ষণগুলি সন্ধান করুন।","tomato_quest_day18_title":"সূর্যালোক সরবরাহ করুন","tomato_quest_day18_desc":"নিশ্চিত করুন যে চারাগুলি প্রতিদিন কমপক্ষে ৬-৮ ঘন্টা সূর্যালোক পায়।","tomato_quest_day25_title":"চারা পাতলা করুন","tomato_quest_day25_desc":"সবচেয়ে শক্তিশালী চারাটিকে বাড়ার জন্য আরও জায়গা দিতে দুর্বল চারাগুলি আলতো করে সরিয়ে ফেলুন।","tomato_quest_day30_title":"গভীরভাবে জল দিন","tomato_quest_day30_desc":"শক্তিশালী মূলের বিকাশে উৎসাহিত করতে গভীরভাবে এবং কম ঘন ঘন জল দিন।","tomato_quest_day35_title":"প্রাকৃতিক মালচ প্রয়োগ করুন","tomato_quest_day35_desc":"মাটির আর্দ্রতা ধরে রাখতে এবং আগাছা প্রতিরোধ করতে খড় বা কাঠের চিপসের একটি স্তর যুক্ত করুন।","tomato_quest_day40_title":"একটি খুঁটি نصب করুন","tomato_quest_day40_desc":"গাছটি লম্বা হওয়ার সাথে সাথে এটিকে সমর্থন দেওয়ার জন্য গাছের কাছে একটি খুঁটি বা খাঁচা রাখুন।","tomato_quest_day45_title":"প্রাকৃতিক কীটপতঙ্গ টহল","tomato_quest_day45_desc":"কীটপতঙ্গের জন্য পাতা পরীক্ষা করুন। সম্ভব হলে লেডিবাগের মতো উপকারী পোকামাকড় পরিচয় করিয়ে দিন।","tomato_quest_day52_title":"নীচের পাতা ছাঁটাই করুন","tomato_quest_day52_desc":"বায়ু চলাচল উন্নত করতে এবং রোগ প্রতিরোধ করতে নীচের পাতাগুলি সরিয়ে ফেলুন।","tomato_quest_day60_title":"প্রথম ফসল!","tomato_quest_day60_desc":"প্রথম পাকা টমেটোগুলি সংগ্রহ করুন। আপনার টেকসই চাষের ফল উপভোগ করুন!","dashboardCommunityTitle":"সম্প্রদায় ও র‍্যাঙ্কিং","dashboardCommunityDesc":"অন্যান্য কৃষকদের সাথে সংযোগ স্থাপন করুন!","dashboardCommunityViewFeed":"ফিড দেখুন","dashboardCommunityViewLeaderboard":"লিডারবোর্ড দেখুন","wheat_quest_day1_title":"মাটির পিএইচ পরীক্ষা করুন","wheat_quest_day1_desc":"আপনার মাটির পিএইচ স্তর পরীক্ষা করুন। গম ৬.০ থেকে ৭.০ এর মধ্যে পিএইচ পছন্দ করে।","wheat_quest_day15_title":"সংরক্ষণমূলক চাষাবাদ","wheat_quest_day15_desc":"জমি তৈরির জন্য ন্যূনতম চাষাবাদ ব্যবহার করুন। এটি মাটির ক্ষয় হ্রাস করে এবং আর্দ্রতা ধরে রাখে।","wheat_quest_day30_title":"স্মার্ট সেচ","wheat_quest_day30_desc":"জল সংরক্ষণ করতে এবং সরাসরি শিকড়ে পৌঁছে দেওয়ার জন্য প্রথম সেচের জন্য ড্রিপ সেচ ব্যবহার করুন।","wheat_quest_day45_title":"হাতে আগাছা নিয়ন্ত্রণ","wheat_quest_day45_desc":"আগাছানাশক ব্যবহার না করে পুষ্টির জন্য প্রতিযোগিতা রোধ করতে হাতে আগাছা পরীক্ষা করুন এবং সরিয়ে ফেলুন।","wheat_quest_day60_title":"উপকারী পোকামাকড় আকর্ষণ করুন","wheat_quest_day60_desc":"অ্যাফিডের মতো কীটপতঙ্গ শিকার করে এমন লেডিবাগ এবং অন্যান্য পোকামাকড় আকর্ষণ করতে কাছাকাছি ক্লোভারের মতো ফুল লাগান।","wheat_quest_day75_title":"কম্পোস্ট চা প্রয়োগ করুন","wheat_quest_day75_desc":"আপনার ক্রমবর্ধমান গমের জন্য একটি প্রাকৃতিক, পুষ্টিসমৃদ্ধ ফলিয়ার ফিড হিসাবে কম্পোস্ট চা তৈরি করুন এবং প্রয়োগ করুন।","wheat_quest_day90_title":"রোগ পর্যবেক্ষণ","wheat_quest_day90_desc":"মরিচা বা মিলডিউয়ের লক্ষণগুলির জন্য পাতাগুলি পরিদর্শন করুন। প্রয়োজনে বায়ু চলাচল উন্নত করুন।","wheat_quest_day120_title":"টেকসই ফসল","wheat_quest_day120_desc":"সোনালী গম সংগ্রহ করুন। মাটি সমৃদ্ধ করতে খড়গুলি মাঠে মালচ হিসাবে রেখে দিন।","corn_quest_day1_title":"সহচর রোপণের প্রস্তুতি","corn_quest_day1_desc":"একটি 'তিন বোন' বাগান পরিকল্পনা করুন। ভুট্টা শিমের জন্য একটি ডাঁটা সরবরাহ করে, যা মাটিতে নাইট্রোজেন যোগ করে।","corn_quest_day10_title":"ব্লকে রোপণ করুন","corn_quest_day10_desc":"বাতাসের পরাগায়ন উন্নত করতে দীর্ঘ সারির পরিবর্তে ছোট, আয়তক্ষেত্রাকার ব্লকে ভুট্টার বীজ বপন করুন।","corn_quest_day25_title":"কম্পোস্ট দিয়ে সাইড-ড্রেস","corn_quest_day25_desc":"পুষ্টির ধীর মুক্তি প্রদানের জন্য ডাঁটার গোড়ায় সমৃদ্ধ কম্পোস্টের একটি স্তর যুক্ত করুন।","corn_quest_day40_title":"প্রাকৃতিক কীটপতঙ্গ প্রতিরক্ষা","corn_quest_day40_desc":"ভুট্টার কানের পোকার জন্য doµu। তাদের আটকাতে প্রতিটি কানের ডগায় এক ফোঁটা খনিজ তেল প্রয়োগ করুন।","corn_quest_day60_title":"পরাগায়ন পরীক্ষা","corn_quest_day60_desc":"ডাঁটার শীর্ষে হলুদ পরাগ ঝরানো ট্যাসেলগুলি সন্ধান করুন। সাহায্য করার জন্য তাদের একটি মৃদু ঝাঁকুনি দিন।","corn_quest_day75_title":"দুধ পরীক্ষা","corn_quest_day75_desc":"পাকা জন্য পরীক্ষা করুন। আপনার নখ দিয়ে একটি কার্নেল ছিদ্র করুন; যদি রস দুধের মতো হয় তবে এটি কাটার জন্য প্রস্তুত।","corn_quest_day90_title":"ফসল ও মালচ","corn_quest_day90_desc":"ভুট্টার কান সংগ্রহ করুন। ডাঁটাগুলি কেটে ফেলুন এবং পচতে এবং মাটিকে খাওয়াতে মাটিতে রেখে দিন।","potato_quest_day1_title":"আপনার আলু চিট করুন","potato_quest_day1_desc":"বীজ আলুকে একটি উজ্জ্বল, শীতল স্থানে রেখে রোপণের আগে ('চিটিং') অঙ্কুরিত হতে উত্সাহিত করুন।","potato_quest_day10_title":"খাতে রোপণ করুন","potato_quest_day10_desc":"পুষ্টির জন্য নীচে কম্পোস্টের একটি স্তর সহ একটি খাতে অঙ্কুরিত আলু রোপণ করুন।","potato_quest_day25_title":"প্রথম হিলিং","potato_quest_day25_desc":"গাছের গোড়ার চারপাশে মাটি ঢিবি করুন। এটি নতুন আলুকে সূর্যালোক থেকে রক্ষা করে।","potato_quest_day40_title":"কীটপতঙ্গ টহল","potato_quest_day40_desc":"কলোরাডো আলু বিটল এবং তাদের লার্ভার জন্য পাতাগুলি পরিদর্শন করুন। আপনার গাছপালা রক্ষা করতে তাদের হাতে তুলে নিন।","potato_quest_day55_title":"দ্বিতীয় হিলিং","potato_quest_day55_desc":"গাছগুলি লম্বা হওয়ার সাথে সাথে তাদের চারপাশে মাটি বা খড়ের মালচের আরও একটি স্তর যুক্ত করুন।","potato_quest_day70_title":"ধারাবাহিক আর্দ্রতা","potato_quest_day70_desc":"মাটি সমানভাবে আর্দ্র রাখতে গভীরভাবে এবং নিয়মিত জল দিন, যা আলুর উপর স্ক্যাব প্রতিরোধে সহায়তা করে।","potato_quest_day90_title":"ডাই-ব্যাকের জন্য অপেক্ষা করুন","potato_quest_day90_desc":"গাছের পাতা হলুদ হয়ে মারা যাবে। এটি আলু পরিপক্ক হওয়ার লক্ষণ।","potato_quest_day100_title":"নরম ফসল","potato_quest_day100_desc":"একটি বাগানের কাঁটা দিয়ে সাবধানে আপনার আলু খনন করুন। সংরক্ষণের আগে কয়েক ঘন্টার জন্য তাদের নিরাময় করতে দিন।","dashboardStreakTitle":"দৈনিক স্ট্রীক","marketplaceTitle":"বাজার","marketplaceTabBuy":"কিনুন","marketplaceTabSell":"বিক্রি করুন","marketplaceCategoryAll":"সব","marketplaceCategoryCrops":"ফসল","marketplaceCategoryTools":"সরঞ্জাম","marketplaceCategoryServices":"সেবা","marketplacePrice":"দাম","marketplaceQuantity":"পরিমাণ","marketplaceSeller":"বিক্রেতা","marketplaceBuyButton":"কিনুন","marketplaceSellTitle":"আপনার ইনভেন্টরি থেকে বিক্রি করুন","marketplaceSellItemLabel":"আপনার ইনভেন্টরি থেকে আইটেম","marketplaceSellQuantityLabel":"পরিমাণ","marketplaceSellPriceLabel":"প্রতি আইটেমের মূল্য নির্ধারণ করুন (₹)","marketplaceSellCategoryLabel":"বিভাগ","marketplaceSellButton":"বিক্রয়ের জন্য আইটেম তালিকাভুক্ত করুন","buySuccess":"ক্রয় সফল!","sellSuccess":"আইটেম সফলভাবে তালিকাভুক্ত হয়েছে!","notEnoughFunds":"পর্যাপ্ত টাকা নেই!","notEnoughStock":"পর্যাপ্ত স্টক নেই!","item_shovel":"বেলচা","item_watering_can":"জল দেওয়ার ক্যান","item_seeds_tomato":"টমেটো বীজ","service_soil_test":"মাটি পরীক্ষা পরিষেবা","wallet":"ওয়ালেট","dashboardMarketplaceTitle":"বাজার","dashboardMarketplaceDesc":"সরঞ্জাম কিনুন এবং আপনার ফসল বিক্রি করুন!","dashboardMarketplaceButton":"বাজারে যান","marketplaceSellInstruction":"বিক্রয়ের জন্য নির্বাচন করতে নীচের একটি আইটেমে ক্লিক করুন।","marketplaceSellYourInventory":"আপনার ইনভেন্টরি","marketplaceSellNoItems":"আপনার ইনভেন্টরিতে বিক্রি করার মতো কিছুই নেই।","marketplaceSellSelected":"নির্বাচিত আইটেম","marketplaceSellEarnings":"সম্ভাব্য আয়","dashboardCurrentLevel":"বর্তমান স্তর","dashboardLevelAbbr":"স্তর","dashboardGuidesTitle":"টেকসই গাইড","dashboardGuidesDesc":"টেকসই চাষের কৌশল শিখুন।","dashboardGuidesButton":"গাইড দেখুন","learnTabGuides":"গাইড","learnTabQuizzes":"কুইজ","guide_water_conservation_title":"জল সংরক্ষণ","guide_water_conservation_desc":"আপনার খামারে দক্ষতার সাথে জল ব্যবহার করতে এবং এই মূল্যবান সম্পদ সংরক্ষণ করতে কৌশলগুলি শিখুন।","guide_water_conservation_task_1_title":"ড্রিপ সেচ ইনস্টল করুন","guide_water_conservation_task_2_title":"মাটিতে মালচ প্রয়োগ করুন","guide_water_conservation_task_3_title":"সকালে তাড়াতাড়ি জল দিন","guide_water_conservation_task_4_title":"বৃষ্টির জল সংগ্রহ করুন","guide_water_conservation_task_5_title":"খরা-প্রতিরোধী ফসল বাছুন","guide_crop_rotation_title":"শস্য আবর্তন","guide_crop_rotation_desc":"মাটির স্বাস্থ্য বজায় রাখতে, রোগ প্রতিরোধ করতে এবং কীটপতঙ্গ কমাতে ফসল ঘোরানোর গুরুত্ব বুঝুন।","guide_crop_rotation_task_1_title":"একটি ৩-বছরের আবর্তন চক্র পরিকল্পনা করুন","guide_crop_rotation_task_2_title":"নাইট্রোজেনের জন্য লেগুম লাগান","guide_crop_rotation_task_3_title":"একই পরিবারের গাছ লাগানো এড়িয়ে চলুন","guide_crop_rotation_task_4_title":"কভার ফসল অন্তর্ভুক্ত করুন","guide_crop_rotation_task_5_title":"আপনার আবর্তনের একটি রেকর্ড রাখুন","guide_composting_101_title":"কম্পোস্টিং ১০১","guide_composting_101_desc":"রান্নাঘরের স্ক্র্যাপ এবং উঠোনের বর্জ্যকে আপনার গাছের জন্য পুষ্টিসমৃদ্ধ মাটিতে পরিণত করতে শিখুন।","guide_composting_101_task_1_title":"একটি কম্পোস্টিং স্থান চয়ন করুন","guide_composting_101_task_2_title":"আপনার 'বাদামী' এবং 'সবুজ' সংগ্রহ করুন","guide_composting_101_task_3_title":"আপনার কম্পোস্টের স্তূপ স্তর করুন","guide_composting_101_task_4_title":"স্তূপটি আর্দ্র রাখুন","guide_composting_101_task_5_title":"নিয়মিত আপনার কম্পোস্ট উল্টান","guide_natural_pest_control_title":"প্রাকৃতিক কীটপতঙ্গ নিয়ন্ত্রণ","guide_natural_pest_control_desc":"একটি প্রাকৃতিক বাস্তুতন্ত্রকে উত্সাহিত করে ক্ষতিকারক রাসায়নিক ছাড়াই আপনার ফসলকে কীটপতঙ্গ থেকে রক্ষা করুন।","guide_natural_pest_control_task_1_title":"উপকারী পোকামাকড় পরিচয় করান","guide_natural_pest_control_task_2_title":"সহচর রোপণ ব্যবহার করুন","guide_natural_pest_control_task_3_title":"একটি নিম তেলের স্প্রে তৈরি করুন","guide_natural_pest_control_task_4_title":"শারীরিক বাধা (নেট) স্থাপন করুন","guide_natural_pest_control_task_5_title":"পাখিদের পরিদর্শনে উত্সাহিত করুন","dashboardTipsTitle":"কৃষি টিপস ও সমাধান","tip_drought_title":"হঠাৎ খরা","tip_drought_cause":"কারণ: বৃষ্টিপাতের অভাব এবং উচ্চ তাপমাত্রা মাটিকে শুকিয়ে দিচ্ছে।","tip_drought_tips":"মাটির আর্দ্রতা ধরে রাখতে মালচ (খড়, কাঠের চিপস) এর একটি পুরু স্তর প্রয়োগ করুন।|বাষ্পীভবন কমাতে সকালে তাড়াতাড়ি, গভীরভাবে কিন্তু কম ঘন ঘন জল দিন।|সরাসরি শিকড়ে জল পৌঁছে দেওয়ার জন্য একটি ড্রিপ সেচ ব্যবস্থা স্থাপন করুন।","tip_flood_title":"অপ্রত্যাশিত বন্যা","tip_flood_cause":"কারণ: ভারী, দীর্ঘস্থায়ী বৃষ্টিপাতের ফলে মাঠগুলি জলাবদ্ধ হয়ে গেছে।","tip_flood_tips":"অতিরিক্ত জল সরানোর জন্য অগভীর পরিখা খনন করে নিষ্কাশন উন্নত করুন।|ভেজা মাটিতে হাঁটা বা ভারী যন্ত্রপাতি ব্যবহার না করে এটি সংকুচিত করা এড়িয়ে চলুন।|মাটি শুকিয়ে গেলে মূল পচা পরীক্ষা করুন এবং প্রয়োজনে একটি ছত্রাকনাশক প্রয়োগ করুন।","tip_fertilizer_shortage_title":"সারের অভাব","tip_fertilizer_shortage_cause":"কারণ: সরবরাহ শৃঙ্খলার সমস্যাগুলি বাণিজ্যিক সারগুলিকে अनुपलब्ध করে তুলেছে।","tip_fertilizer_shortage_tips":"আপনার নিজের পুষ্টিসমৃদ্ধ সার তৈরি করতে একটি কম্পোস্টের স্তূপ শুরু করুন।|ক্লোভারের মতো কভার ফসল রোপণ করে এবং সেগুলিকে মাটিতে চাষ করে সবুজ সার ব্যবহার করুন।|একটি দ্রুত পুষ্টি বৃদ্ধির জন্য তরল সার হিসাবে ব্যবহার করার জন্য কম্পোস্ট চা তৈরি করুন।","tip_seed_shortage_title":"বীজের अनुपलब्धতা","tip_seed_shortage_cause":"কারণ: স্থানীয় সরবরাহকারীরা আপনার পরিকল্পিত ফসলের বীজের স্টক শেষ করে ফেলেছে।","tip_seed_shortage_tips":"আপনার নিজের স্বাস্থ্যকর, খোলা-পরাগযুক্ত গাছ থেকে বীজ সংরক্ষণের অনুশীলন করুন।|বীজ ব্যবসা করতে স্থানীয় কৃষক নেটওয়ার্ক বা কমিউনিটি বীজ ব্যাংকের সাথে সংযোগ স্থাপন করুন।|দেশীয়, স্থানীয়ভাবে অভিযোজিত ফসল রোপণ করতে বেছে নিন যা আরও সহজে পাওয়া যেতে পারে।","dashboardStartQuestTitle":"একটি কৃষি কোয়েস্ট শুরু করুন","carrot_quest_day1_title":"গভীর মাটি প্রস্তুত করুন","carrot_quest_day1_desc":"গাজর সোজা হয়ে জন্মানো নিশ্চিত করতে মাটি গভীরভাবে চাষ করুন এবং পাথর সরিয়ে ফেলুন।","carrot_quest_day15_title":"চারা পাতলা করুন","carrot_quest_day15_desc":"মূলের বাড়ার জন্য জায়গা দিতে চারা প্রায় ২ ইঞ্চি দূরে পাতলা করুন।","carrot_quest_day30_title":"হালকা মালচ প্রয়োগ করুন","carrot_quest_day30_desc":"আর্দ্রতা ধরে রাখতে এবং আগাছা দমন করতে মালচ হিসাবে ঘাসের কাটিং ব্যবহার করুন।","carrot_quest_day45_title":"কীটপতঙ্গ থেকে রক্ষা করুন","carrot_quest_day45_desc":"গাজর মরিচা মাছি থেকে রক্ষা করতে সারি কভার ব্যবহার করুন।","carrot_quest_day60_title":"মূলের আকার পরীক্ষা করুন","carrot_quest_day60_desc":"মূল কমপক্ষে ১/২ ইঞ্চি চওড়া কিনা তা পরীক্ষা করতে উপরে আলতো করে মাটি সরান।","carrot_quest_day75_title":"আপনার গাজর সংগ্রহ করুন","carrot_quest_day75_desc":"একটি বাগানের কাঁটা দিয়ে মাটি আলগা করুন এবং আলতো করে গাজর টানুন।","spinach_quest_day1_title":"ঠান্ডা মাটিতে রোপণ করুন","spinach_quest_day1_desc":"পালং শাক ঠান্ডা আবহাওয়ায় বেড়ে ওঠে বলে বসন্তের শুরুতে বা শরতে রোপণ করুন।","spinach_quest_day10_title":"ধারাবাহিক আর্দ্রতা নিশ্চিত করুন","spinach_quest_day10_desc":"দ্রুত বৃদ্ধি উত্সাহিত করতে এবং বোল্টিং প্রতিরোধ করতে মাটি সমানভাবে আর্দ্র রাখুন।","spinach_quest_day20_title":"নাইট্রোজেন দিয়ে খাওয়ান","spinach_quest_day20_desc":"রসালো, সবুজ পাতার জন্য একটি কম্পোস্ট চা বা জৈব নাইট্রোজেন সার প্রয়োগ করুন।","spinach_quest_day30_title":"কীটপতঙ্গ পরীক্ষা","spinach_quest_day30_desc":"অ্যাফিড বা লিফ মাইনারের জন্য পাতাগুলি পরিদর্শন করুন এবং প্রাকৃতিক প্রতিকার দিয়ে চিকিত্সা করুন।","spinach_quest_day45_title":"ধারাবাহিক ফসল","spinach_quest_day45_desc":"প্রথমে বাইরের পাতাগুলি সংগ্রহ করুন, যাতে ভিতরের পাতাগুলি বাড়তে থাকে।","backToGuides":"← গাইডগুলিতে ফিরে যান","harvestButton":"ফসল সংগ্রহ","harvestSuccess":"ফসল সংগ্রহ সফল! আপনি +{quantity} {cropName} পেয়েছেন।","tts_enable":"টেক্সট-টু-স্পিচ সক্ষম করুন","tts_disable":"টেক্সট-টু-স্পিচ অক্ষম করুন","ttsToggleLabel":"টেক্সট টু স্পিচ টগল করুন"};
const mr = {"appName":"ऍग्रीप्ले","loginTitle":"शेतात आपले स्वागत आहे!","loginSubtitle":"आपला प्रवास सुरू करण्यासाठी आपला फोन प्रविष्ट करा.","phoneLabel":"फोन नंबर","otpLabel":"ओटीपी प्रविष्ट करा","loginButton":"लॉगिन करा","sendOtpButton":"ओटीपी पाठवा","guestLoginButton":"अतिथी म्हणून सुरू ठेवा","navDashboard":"डॅशबोर्ड","navCrops":"माझी पिके","navLearn":"शिका आणि वाढा","navCommunity":"समुदाय","navLeaderboard":"लीडरबोर्ड","navBadges":"बॅजेस","navMarketplace":"बाजारपेठ","backToDashboard":"← डॅशबोर्डवर परत जा","communityTitle":"समुदाय केंद्र","leaderboardTitle":"शेतकरी लीडरबोर्ड","filterState":"राज्य","filterDistrict":"जिल्हा","filterVillage":"गाव","filterAll":"सर्व","level":"पातळी","streak":"दिवस स्ट्रीक","dailyTasksTitle":"दैनिक मिशन्स","dashboardQuestTitle":"सक्रिय शोध","dashboardQuestNone":"कोणताही सक्रिय पीक शोध नाही.","dashboardQuestStart":"एक शोध सुरू करा","dashboardQuestToday":"आजचे कार्य (दिवस {day})","dashboardQuestView":"शोध लॉग पहा","badgesTitle":"माझे बॅजेस","viewAllBadges":"सर्व पहा","badgeCollectionTitle":"माझे बॅज संग्रह","taskCompleteButton":"दावा करा","levelUpTitle":"पातळी वाढली!","levelUpSubtitle":"आपण पातळी {level} वर पोहोचला आहात!","levelUpClose":"उत्तम!","cropsTitle":"एक नवीन शेती शोध सुरू करा","plantButton":"हे पीक लावा","selectCrop":"एक पीक निवडा","addNewCrop":"नवीन पीक जोडा","cropQuestTitle":"{cropName} शोध","cropQuestDay":"दिवस {day}","cropQuestComplete":"पूर्ण करा","cropQuestCompleted":"पूर्ण झाले","cropQuestLocked":"लॉक केले","quizTitle":"शेती क्विझ","quizScore":"तुम्ही {total} पैकी {score} गुण मिळवले!","quizXP":"तुम्ही {xp} XP मिळवले!","quizNext":"पुढील प्रश्न","quizFinish":"क्विझ समाप्त करा","communityFeed":"फीड","communityLeaderboard":"लीडरबोर्ड","postPlaceholder":"एक टीप किंवा अपडेट शेअर करा...","postButton":"पोस्ट","leaderboardRank":"रँक","leaderboardPlayer":"खेळाडू","leaderboardLevel":"पातळी","leaderboardXP":"एकूण XP","task_water_plants":"आपल्या झाडांना पाणी द्या","task_check_soil":"मातीची आर्द्रता तपासा","task_read_article":"एक शेती लेख वाचा","crop_tomato":"टोमॅटो","crop_wheat":"गहू","crop_corn":"मका","crop_potato":"बटाटा","crop_carrot":"गाजर","crop_spinach":"पालक","post_1":"या हंगामात माझे टोमॅटो खूप चांगले वाढत आहेत! 🍅","post_2":"त्वरित टीप: नैसर्गिक कीटकनाशक म्हणून कडुलिंबाच्या तेलाचा वापर करा.","post_3":"आत्ताच पातळी 10 वर पोहोचलो! हे मजेदार आहे! 🎉","quiz_q1":"पानांच्या वाढीसाठी कोणते पोषक तत्व सर्वात महत्वाचे आहे?","quiz_q1_opts":"नायट्रोजन,फॉस्फरस,पोटॅशियम,कॅल्शियम","quiz_q2":"पीक फेरपालट म्हणजे काय?","quiz_q2_opts":"शेतात पिके बदलणे,पिकांना गोलाकार पाणी देणे,एक प्रकारचे खत,एक कापणी तंत्र","badge_newbie_name":"नवशिका शेतकरी","badge_newbie_desc":"पहिले कार्य पूर्ण केले. स्वागत आहे!","badge_green_thumb_name":"ग्रीन थंब","badge_green_thumb_desc":"10 कार्ये यशस्वीरित्या पूर्ण केली.","badge_first_harvest_name":"पहिली कापणी","badge_first_harvest_desc":"आपले पहिले पीक यशस्वीरित्या कापले.","badge_quiz_master_name":"क्विझ मास्टर","badge_quiz_master_desc":"शेती क्विझमध्ये परिपूर्ण गुण मिळवले.","badge_streaker_name":"स्ट्रीकर","badge_streaker_desc":"7-दिवसांची स्ट्रीक कायम ठेवली.","badge_community_helper_name":"समुदाय मदतनीस","badge_community_helper_desc":"समुदायासोबत एक उपयुक्त टीप शेअर केली.","tomato_quest_day1_title":"समृद्ध माती तयार करा","tomato_quest_day1_desc":"बियांसाठी समृद्ध पोषक तत्वे प्रदान करण्यासाठी आपल्या मातीत कंपोस्ट मिसळा.","tomato_quest_day2_title":"बिया पेरा","tomato_quest_day2_desc":"तयार मातीत टोमॅटोची बियाणे सुमारे 1/4 इंच खोल लावा.","tomato_quest_day7_title":"हलके पाणी देणे","tomato_quest_day7_desc":"अंकुरणासाठी मदत करण्यासाठी माती ओलसर ठेवा, पण पाणी साचू देऊ नका.","tomato_quest_day12_title":"अंकुर तपासा","tomato_quest_day12_desc":"मातीतून बाहेर येणाऱ्या हिरव्या अंकुरांची पहिली चिन्हे शोधा.","tomato_quest_day18_title":"सूर्यप्रकाश द्या","tomato_quest_day18_desc":"रोपांना दररोज किमान 6-8 तास सूर्यप्रकाश मिळेल याची खात्री करा.","tomato_quest_day25_title":"रोपे विरळ करा","tomato_quest_day25_desc":"सर्वात मजबूत रोपाला वाढण्यासाठी अधिक जागा देण्यासाठी कमकुवत रोपे हळूवारपणे काढा.","tomato_quest_day30_title":"खोलवर पाणी द्या","tomato_quest_day30_desc":"मजबूत मुळांच्या विकासास प्रोत्साहन देण्यासाठी खोलवर आणि कमी वेळा पाणी द्या.","tomato_quest_day35_title":"नैसर्गिक मल्च लावा","tomato_quest_day35_desc":"मातीची आर्द्रता टिकवून ठेवण्यासाठी आणि तण रोखण्यासाठी पेंढा किंवा लाकडी चिप्सचा थर घाला.","tomato_quest_day40_title":"एक आधारस्तंभ स्थापित करा","tomato_quest_day40_desc":"झाड उंच वाढल्यावर त्याला आधार देण्यासाठी झाडाजवळ एक आधारस्तंभ किंवा पिंजरा ठेवा.","tomato_quest_day45_title":"नैसर्गिक कीटक गस्त","tomato_quest_day45_desc":"कीटकांसाठी पाने तपासा. शक्य असल्यास लेडीबगसारखे फायदेशीर कीटक सोडा.","tomato_quest_day52_title":"खालची पाने छाटा","tomato_quest_day52_desc":"हवा खेळती राहण्यासाठी आणि रोग टाळण्यासाठी खालची पाने काढून टाका.","tomato_quest_day60_title":"पहिली कापणी!","tomato_quest_day60_desc":"पहिली पिकलेली टोमॅटो काढा. आपल्या शाश्वत शेतीच्या फळांचा आनंद घ्या!","dashboardCommunityTitle":"समुदाय आणि क्रमवारी","dashboardCommunityDesc":"इतर शेतकऱ्यांशी संपर्क साधा!","dashboardCommunityViewFeed":"फीड पहा","dashboardCommunityViewLeaderboard":"लीडरबोर्ड तपासा","wheat_quest_day1_title":"मातीचा पीएच तपासा","wheat_quest_day1_desc":"आपल्या मातीचा पीएच स्तर तपासा. गहू 6.0 ते 7.0 दरम्यानचा पीएच पसंत करतो.","wheat_quest_day15_title":"संरक्षण मशागत","wheat_quest_day15_desc":"जमीन तयार करण्यासाठी कमीतकमी मशागत वापरा. यामुळे मातीची धूप कमी होते आणि ओलावा टिकून राहतो.","wheat_quest_day30_title":"स्मार्ट पाणीपुरवठा","wheat_quest_day30_desc":"पाणी वाचवण्यासाठी आणि थेट मुळांपर्यंत पोहोचवण्यासाठी पहिल्या पाणीपुरवठ्यासाठी ठिबक सिंचन वापरा.","wheat_quest_day45_title":"मॅन्युअल तण नियंत्रण","wheat_quest_day45_desc":"तणनाशकांचा वापर न करता पोषक तत्वांच्या स्पर्धेला प्रतिबंध करण्यासाठी तण तपासा आणि हाताने काढा.","wheat_quest_day60_title":"फायदेशीर कीटकांना आकर्षित करा","wheat_quest_day60_desc":"माव्यासारख्या कीटकांची शिकार करणाऱ्या लेडीबग आणि इतर कीटकांना आकर्षित करण्यासाठी जवळच क्लोव्हरसारखी फुले लावा.","wheat_quest_day75_title":"कंपोस्ट चहा वापरा","wheat_quest_day75_desc":"वाढत्या गव्हासाठी नैसर्गिक, पोषक तत्वांनी युक्त पर्ण आहार म्हणून कंपोस्ट चहा तयार करा आणि वापरा.","wheat_quest_day90_title":"रोग निरीक्षण","wheat_quest_day90_desc":"तांबेरा किंवा बुरशीच्या लक्षणांसाठी पानांची तपासणी करा. आवश्यक असल्यास हवा खेळती ठेवा.","wheat_quest_day120_title":"शाश्वत कापणी","wheat_quest_day120_desc":"सोनेरी गहू काढा. माती समृद्ध करण्यासाठी धांडे शेतात आच्छादन म्हणून सोडा.","corn_quest_day1_title":"सहचर लागवडीची तयारी","corn_quest_day1_desc":"'तीन बहिणी' बागेची योजना करा. मका घेवड्यासाठी एक धांडा पुरवतो, जो मातीत नायट्रोजन घालतो.","corn_quest_day10_title":"ब्लॉक्समध्ये लावा","corn_quest_day10_desc":"वाऱ्याद्वारे परागण सुधारण्यासाठी लांब ओळींऐवजी लहान, आयताकृती ब्लॉक्समध्ये मक्याचे बियाणे पेरा.","corn_quest_day25_title":"कंपोस्टने साइड-ड्रेस करा","corn_quest_day25_desc":"पोषक तत्वांचा हळूहळू पुरवठा करण्यासाठी धांड्यांच्या पायथ्याशी समृद्ध कंपोस्टचा थर घाला.","corn_quest_day40_title":"नैसर्गिक कीटक संरक्षण","corn_quest_day40_desc":"मक्याच्या कणसातील अळीसाठी doµu. त्यांना रोखण्यासाठी प्रत्येक कणसाच्या टोकावर खनिज तेलाचा एक थेंब लावा.","corn_quest_day60_title":"परागण तपासणी","corn_quest_day60_desc":"धांड्यांच्या शेंड्यावर पिवळे परागकण गळणारे तुरे शोधा. मदत करण्यासाठी त्यांना हलकेच हलवा.","corn_quest_day75_title":"दूध चाचणी","corn_quest_day75_desc":"पिकले आहे की नाही ते तपासा. आपल्या नखाने एक दाणा फोडा; रस दुधासारखा असेल तर ते कापणीसाठी तयार आहे.","corn_quest_day90_title":"कापणी आणि आच्छादन","corn_quest_day90_desc":"मक्याची कणसे काढा. धांडे कापून कुजण्यासाठी आणि मातीला पोषण देण्यासाठी जमिनीवर सोडा.","potato_quest_day1_title":"आपले बटाटे चिट करा","potato_quest_day1_desc":"बियाणे बटाट्यांना लागवडीपूर्वी ('चिटिंग') एका तेजस्वी, थंड ठिकाणी ठेवून अंकुरित होण्यास प्रोत्साहित करा.","potato_quest_day10_title":"खड्ड्यांमध्ये लावा","potato_quest_day10_desc":"अंकुरित बटाटे पोषणासाठी तळाशी कंपोस्टचा थर असलेल्या खड्ड्यात लावा.","potato_quest_day25_title":"पहिली भर","potato_quest_day25_desc":"रोपाच्या पायथ्याशी मातीचा ढिग लावा. यामुळे नवीन बटाट्यांचे सूर्यप्रकाशापासून संरक्षण होते.","potato_quest_day40_title":"कीटक गस्त","potato_quest_day40_desc":"कोलोरॅडो बटाटा बीटल आणि त्यांच्या अळ्यांसाठी पानांची तपासणी करा. आपल्या रोपांचे संरक्षण करण्यासाठी त्यांना हाताने काढून टाका.","potato_quest_day55_title":"दुसरी भर","potato_quest_day55_desc":"रोपे उंच वाढल्यावर त्यांच्याभोवती माती किंवा पेंढ्याच्या आच्छादनाचा आणखी एक थर घाला.","potato_quest_day70_title":"सातत्यपूर्ण ओलावा","potato_quest_day70_desc":"माती समान ओलसर ठेवण्यासाठी खोलवर आणि नियमितपणे पाणी द्या, ज्यामुळे बटाट्यावरील खपल्या टाळता येतात.","potato_quest_day90_title":"मरण्याची वाट पहा","potato_quest_day90_desc":"रोपाची पाने पिवळी पडून मरतील. हे बटाटे परिपक्व होत असल्याचे लक्षण आहे.","potato_quest_day100_title":"हळूवार कापणी","potato_quest_day100_desc":"आपले बटाटे बागेच्या काट्याने काळजीपूर्वक खणून काढा. साठवण्यापूर्वी त्यांना काही तास सुकू द्या.","dashboardStreakTitle":"दैनिक स्ट्रीक","marketplaceTitle":"बाजारपेठ","marketplaceTabBuy":"खरेदी करा","marketplaceTabSell":"विक्री करा","marketplaceCategoryAll":"सर्व","marketplaceCategoryCrops":"पिके","marketplaceCategoryTools":"साधने","marketplaceCategoryServices":"सेवा","marketplacePrice":"किंमत","marketplaceQuantity":"प्रमाण","marketplaceSeller":"विक्रेता","marketplaceBuyButton":"खरेदी करा","marketplaceSellTitle":"आपल्या इन्व्हेंटरीमधून विका","marketplaceSellItemLabel":"आपल्या इन्व्हेंटरीमधून वस्तू","marketplaceSellQuantityLabel":"प्रमाण","marketplaceSellPriceLabel":"प्रति वस्तू किंमत सेट करा (₹)","marketplaceSellCategoryLabel":"श्रेणी","marketplaceSellButton":"विक्रीसाठी वस्तू सूचीबद्ध करा","buySuccess":"खरेदी यशस्वी!","sellSuccess":"आयटम यशस्वीरित्या सूचीबद्ध झाला!","notEnoughFunds":"पुरेशी रुपये नाहीत!","notEnoughStock":"पुरेसा स्टॉक नाही!","item_shovel":"फावडे","item_watering_can":"पाणी देण्याचे भांडे","item_seeds_tomato":"टोमॅटो बियाणे","service_soil_test":"माती परीक्षण सेवा","wallet":"वॉलेट","dashboardMarketplaceTitle":"बाजारपेठ","dashboardMarketplaceDesc":"साधने खरेदी करा आणि आपले पीक विका!","dashboardMarketplaceButton":"बाजारपेठेत जा","marketplaceSellInstruction":"विक्रीसाठी निवडण्यासाठी खालील वस्तूवर क्लिक करा.","marketplaceSellYourInventory":"तुमची इन्व्हेंटरी","marketplaceSellNoItems":"तुमच्या इन्व्हेंटरीमध्ये विकायला काहीही नाही.","marketplaceSellSelected":"निवडलेली वस्तू","marketplaceSellEarnings":"संभाव्य कमाई","dashboardCurrentLevel":"सध्याची पातळी","dashboardLevelAbbr":"पातळी","dashboardGuidesTitle":"शाश्वत मार्गदर्शक","dashboardGuidesDesc":"शाश्वत शेती तंत्र शिका.","dashboardGuidesButton":"मार्गदर्शक पहा","learnTabGuides":"मार्गदर्शक","learnTabQuizzes":"क्विझ","guide_water_conservation_title":"जलसंधारण","guide_water_conservation_desc":"आपल्या शेतात पाण्याचा कार्यक्षमतेने वापर करण्यासाठी आणि या मौल्यवान संसाधनाचे संरक्षण करण्यासाठी तंत्र शिका.","guide_water_conservation_task_1_title":"ठिबक सिंचन स्थापित करा","guide_water_conservation_task_2_title":"मातीवर आच्छादन लावा","guide_water_conservation_task_3_title":"सकाळी लवकर पाणी द्या","guide_water_conservation_task_4_title":"पावसाचे पाणी गोळा करा","guide_water_conservation_task_5_title":"दुष्काळ-प्रतिरोधक पिके निवडा","guide_crop_rotation_title":"पीक फेरपालट","guide_crop_rotation_desc":"मातीचे आरोग्य राखण्यासाठी, रोग टाळण्यासाठी आणि कीड कमी करण्यासाठी पिके फिरवण्याचे महत्त्व समजून घ्या.","guide_crop_rotation_task_1_title":"3-वर्षांच्या फेरपालट चक्राची योजना करा","guide_crop_rotation_task_2_title":"नायट्रोजनसाठी शेंगा लावा","guide_crop_rotation_task_3_title":"एकाच कुटुंबातील झाडे लावणे टाळा","guide_crop_rotation_task_4_title":"आच्छादन पिके समाविष्ट करा","guide_crop_rotation_task_5_title":"आपल्या फेरपालटांची नोंद ठेवा","guide_composting_101_title":"कंपोस्टिंग १०१","guide_composting_101_desc":"स्वयंपाकघरातील उरलेले अन्न आणि बागेतील कचरा आपल्या झाडांसाठी पोषक तत्वांनी युक्त मातीत रूपांतरित करायला शिका.","guide_composting_101_task_1_title":"कंपोस्टिंगसाठी जागा निवडा","guide_composting_101_task_2_title":"आपले 'तपकिरी' आणि 'हिरवे' साहित्य गोळा करा","guide_composting_101_task_3_title":"आपल्या कंपोस्टच्या ढिगाऱ्याला थर लावा","guide_composting_101_task_4_title":"ढिगारा ओलसर ठेवा","guide_composting_101_task_5_title":"आपले कंपोस्ट नियमितपणे पलटा","guide_natural_pest_control_title":"नैसर्गिक कीड नियंत्रण","guide_natural_pest_control_desc":"नैसर्गिक परिसंस्थेला प्रोत्साहन देऊन हानिकारक रसायनांशिवाय आपल्या पिकांना कीडांपासून वाचवा.","guide_natural_pest_control_task_1_title":"फायदेशीर कीटक सोडा","guide_natural_pest_control_task_2_title":"सहचर लागवड वापरा","guide_natural_pest_control_task_3_title":"कडुलिंबाच्या तेलाचा स्प्रे तयार करा","guide_natural_pest_control_task_4_title":"भौतिक अडथळे (जाळ्या) लावा","guide_natural_pest_control_task_5_title":"पक्ष्यांना भेट देण्यासाठी प्रोत्साहित करा","dashboardTipsTitle":"शेती टिप्स आणि उपाय","tip_drought_title":"अचानक दुष्काळ","tip_drought_cause":"कारण: पावसाअभावी आणि उच्च तापमानामुळे माती कोरडी होत आहे.","tip_drought_tips":"मातीची ओल टिकवून ठेवण्यासाठी आच्छादनाचा (पेंढा, लाकडी चिप्स) जाड थर लावा.|बाष्पीभवन कमी करण्यासाठी सकाळी लवकर, खोलवर पण कमी वेळा पाणी द्या.|थेट मुळांपर्यंत पाणी पोहोचवण्यासाठी ठिबक सिंचन प्रणाली स्थापित करा.","tip_flood_title":"अनपेक्षित पूर","tip_flood_cause":"कारण: मुसळधार, दीर्घकाळ चाललेल्या पावसामुळे शेतात पाणी साचले आहे.","tip_flood_tips":"जास्तीचे पाणी वळवण्यासाठी उथळ चर खोदून निचरा सुधारा.|ओल्या मातीवर चालणे किंवा भारी यंत्रसामग्री वापरणे टाळून ती घट्ट होण्यापासून टाळा.|माती सुकल्यावर मुळे कुजली आहेत का ते तपासा आणि आवश्यक असल्यास बुरशीनाशक लावा.","tip_fertilizer_shortage_title":"खतांची कमतरता","tip_fertilizer_shortage_cause":"कारण: पुरवठा साखळीतील समस्यांमुळे व्यावसायिक खते अनुपलब्ध झाली आहेत.","tip_fertilizer_shortage_tips":"स्वतःचे पोषक तत्वांनी युक्त खत तयार करण्यासाठी कंपोस्टचा ढिगारा सुरू करा.|क्लोव्हरसारखी आच्छादन पिके लावून आणि ती मातीत नांगरून हिरवळीचे खत वापरा.|त्वरित पोषक तत्वांचा पुरवठा करण्यासाठी द्रव खत म्हणून वापरण्यासाठी कंपोस्ट चहा तयार करा.","tip_seed_shortage_title":"बियाण्यांची अनुपलब्धता","tip_seed_shortage_cause":"कारण: स्थानिक पुरवठादारांकडे तुमच्या नियोजित पिकाच्या बियाणांचा साठा संपला आहे.","tip_seed_shortage_tips":"आपल्या स्वतःच्या निरोगी, खुल्या परागीकरण झालेल्या वनस्पतींपासून बियाणे वाचवण्याचा सराव करा.|बियाण्यांची देवाणघेवाण करण्यासाठी स्थानिक शेतकरी नेटवर्क किंवा समुदाय बियाणे बँकांशी संपर्क साधा.|स्थानिक, स्थानिक पातळीवर जुळवून घेतलेली पिके लावण्याचा पर्याय निवडा जी अधिक सहज उपलब्ध असू शकतात.","dashboardStartQuestTitle":"एक शेती शोध सुरू करा","carrot_quest_day1_title":"खोल माती तयार करा","carrot_quest_day1_desc":"गाजर सरळ वाढतील याची खात्री करण्यासाठी माती खोल नांगरा आणि दगड काढून टाका.","carrot_quest_day15_title":"रोपे विरळ करा","carrot_quest_day15_desc":"मुळांना वाढायला जागा देण्यासाठी रोपे सुमारे 2 इंच अंतरावर विरळ करा.","carrot_quest_day30_title":"हलके आच्छादन लावा","carrot_quest_day30_desc":"ओलावा टिकवून ठेवण्यासाठी आणि तण दाबण्यासाठी गवताच्या कापांचा आच्छादन म्हणून वापर करा.","carrot_quest_day45_title":"कीटकांपासून संरक्षण करा","carrot_quest_day45_desc":"गाजर गंज माश्यांपासून संरक्षण करण्यासाठी ओळींचे कव्हर वापरा.","carrot_quest_day60_title":"मुळांचा आकार तपासा","carrot_quest_day60_desc":"मुळे किमान 1/2 इंच रुंद आहेत की नाही हे तपासण्यासाठी वरची माती हळूवारपणे हलवा.","carrot_quest_day75_title":"आपले गाजर काढा","carrot_quest_day75_desc":"बागेच्या काट्याने माती सैल करा आणि गाजर हळूवारपणे ओढा.","spinach_quest_day1_title":"थंड मातीत लावा","spinach_quest_day1_desc":"पालक थंड हवामानात वाढतो म्हणून वसंत ऋतूच्या सुरुवातीला किंवा शरद ऋतूमध्ये लावा.","spinach_quest_day10_title":"सातत्यपूर्ण ओलावा सुनिश्चित करा","spinach_quest_day10_desc":"जलद वाढीस प्रोत्साहन देण्यासाठी आणि बोल्टिंग टाळण्यासाठी माती समान ओलसर ठेवा.","spinach_quest_day20_title":"नायट्रोजनने पोषण द्या","spinach_quest_day20_desc":"रसदार, हिरव्या पानांसाठी कंपोस्ट चहा किंवा सेंद्रिय नायट्रोजन खत लावा.","spinach_quest_day30_title":"कीटक तपासणी","spinach_quest_day30_desc":"मावा किंवा पान खाणाऱ्या अळ्यांसाठी पानांची तपासणी करा आणि नैसर्गिक उपायांनी उपचार करा.","spinach_quest_day45_title":"सतत कापणी","spinach_quest_day45_desc":"प्रथम बाहेरील पाने काढा, ज्यामुळे आतील पाने वाढत राहतील.","backToGuides":"← मार्गदर्शकांवर परत जा","harvestButton":"कापणी","harvestSuccess":"कापणी यशस्वी! आपल्याला +{quantity} {cropName} मिळाले.","tts_enable":"टेक्स्ट-टू-स्पीच सक्षम करा","tts_disable":"टेक्स्ट-टू-स्पीच अक्षम करा","ttsToggleLabel":"टेक्स्ट टू स्पीच टॉगल करा"};
const kn = {"appName":"ಅಗ್ರಿಪ್ಲೇ","loginTitle":"ಫಾರ್ಮ್‌ಗೆ ಸುಸ್ವಾಗತ!","loginSubtitle":"ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಲು ನಿಮ್ಮ ಫೋನ್ ಅನ್ನು ನಮೂದಿಸಿ.","phoneLabel":"ಫೋನ್ ಸಂಖ್ಯೆ","otpLabel":"ಒಟಿಪಿ ನಮೂದಿಸಿ","loginButton":"ಲಾಗಿನ್","sendOtpButton":"ಒಟಿಪಿ ಕಳುಹಿಸಿ","guestLoginButton":"ಅತಿಥಿಯಾಗಿ ಮುಂದುವರಿಸಿ","navDashboard":"ಡ್ಯಾಶ್‌ಬೋರ್ಡ್","navCrops":"ನನ್ನ ಬೆಳೆಗಳು","navLearn":"ಕಲಿಯಿರಿ ಮತ್ತು ಬೆಳೆಯಿರಿ","navCommunity":"ಸಮುದಾಯ","navLeaderboard":"ಲೀಡರ್‌ಬೋರ್ಡ್","navBadges":"ಬ್ಯಾಡ್ಜ್‌ಗಳು","navMarketplace":"ಮಾರುಕಟ್ಟೆ","backToDashboard":"← ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ","communityTitle":"ಸಮುದಾಯ ಕೇಂದ್ರ","leaderboardTitle":"ರೈತ ಲೀಡರ್‌ಬೋರ್ಡ್","filterState":"ರಾಜ್ಯ","filterDistrict":"ಜಿಲ್ಲೆ","filterVillage":"ಗ್ರಾಮ","filterAll":"ಎಲ್ಲಾ","level":"ಮಟ್ಟ","streak":"ದಿನದ ಸರಣಿ","dailyTasksTitle":"ದೈನಂದಿನ ಕಾರ್ಯಗಳು","dashboardQuestTitle":"ಸಕ್ರಿಯ ಕ್ವೆಸ್ಟ್","dashboardQuestNone":"ಯಾವುದೇ ಸಕ್ರಿಯ ಬೆಳೆ ಕ್ವೆಸ್ಟ್ ಇಲ್ಲ.","dashboardQuestStart":"ಒಂದು ಕ್ವೆಸ್ಟ್ ಪ್ರಾರಂಭಿಸಿ","dashboardQuestToday":"ಇಂದಿನ ಕಾರ್ಯ (ದಿನ {day})","dashboardQuestView":"ಕ್ವೆಸ್ಟ್ ಲಾಗ್ ವೀಕ್ಷಿಸಿ","badgesTitle":"ನನ್ನ ಬ್ಯಾಡ್ಜ್‌ಗಳು","viewAllBadges":"ಎಲ್ಲವನ್ನೂ ನೋಡಿ","badgeCollectionTitle":"ನನ್ನ ಬ್ಯಾಡ್ಜ್ ಸಂಗ್ರಹ","taskCompleteButton":"ಕ್ಲೇಮ್ ಮಾಡಿ","levelUpTitle":"ಮಟ್ಟ ಹೆಚ್ಚಿದೆ!","levelUpSubtitle":"ನೀವು ಮಟ್ಟ {level} ತಲುಪಿದ್ದೀರಿ!","levelUpClose":"ಅದ್ಭುತ!","cropsTitle":"ಒಂದು ಹೊಸ ಕೃಷಿ ಕ್ವೆಸ್ಟ್ ಪ್ರಾರಂಭಿಸಿ","plantButton":"ಈ ಬೆಳೆಯನ್ನು ನೆಡಿ","selectCrop":"ಒಂದು ಬೆಳೆಯನ್ನು ಆರಿಸಿ","addNewCrop":"ಹೊಸ ಬೆಳೆಯನ್ನು ಸೇರಿಸಿ","cropQuestTitle":"{cropName} ಕ್ವೆಸ್ಟ್","cropQuestDay":"ದಿನ {day}","cropQuestComplete":"ಪೂರ್ಣಗೊಳಿಸಿ","cropQuestCompleted":"ಪೂರ್ಣಗೊಂಡಿದೆ","cropQuestLocked":"ಲಾಕ್ ಆಗಿದೆ","quizTitle":"ಕೃಷಿ ರಸಪ್ರಶ್ನೆ","quizScore":"ನೀವು {total} ರಲ್ಲಿ {score} ಅಂಕಗಳನ್ನು ಗಳಿಸಿದ್ದೀರಿ!","quizXP":"ನೀವು {xp} XP ಗಳಿಸಿದ್ದೀರಿ!","quizNext":"ಮುಂದಿನ ಪ್ರಶ್ನೆ","quizFinish":"ರಸಪ್ರಶ್ನೆ ಮುಗಿಸಿ","communityFeed":"ಫೀಡ್","communityLeaderboard":"ಲೀಡರ್‌ಬೋರ್ಡ್","postPlaceholder":"ಒಂದು ಸಲಹೆ ಅಥವಾ ಅಪ್‌ಡೇಟ್ ಹಂಚಿಕೊಳ್ಳಿ...","postButton":"ಪೋಸ್ಟ್","leaderboardRank":"ಶ್ರೇಣಿ","leaderboardPlayer":"ಆಟಗಾರ","leaderboardLevel":"ಮಟ್ಟ","leaderboardXP":"ಒಟ್ಟು XP","task_water_plants":"ನಿಮ್ಮ ಗಿಡಗಳಿಗೆ ನೀರು ಹಾಕಿ","task_check_soil":"ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ಪರೀಕ್ಷಿಸಿ","task_read_article":"ಒಂದು ಕೃಷಿ ಲೇಖನವನ್ನು ಓದಿ","crop_tomato":"ಟೊಮ್ಯಾಟೊ","crop_wheat":"ಗೋಧಿ","crop_corn":"ಮೆಕ್ಕೆ ಜೋಳ","crop_potato":"ಆಲೂಗಡ್ಡೆ","crop_carrot":"ಕ್ಯಾರೆಟ್","crop_spinach":"ಪಾಲಕ","post_1":"ಈ ಋತುವಿನಲ್ಲಿ ನನ್ನ ಟೊಮ್ಯಾಟೊಗಳು ಚೆನ್ನಾಗಿ ಬೆಳೆಯುತ್ತಿವೆ! 🍅","post_2":"ತ್ವರಿತ ಸಲಹೆ: ಬೇವಿನ ಎಣ್ಣೆಯನ್ನು ನೈಸರ್ಗಿಕ ಕೀಟನಾಶಕವಾಗಿ ಬಳಸಿ.","post_3":"ಈಗಷ್ಟೇ ಮಟ್ಟ 10 ತಲುಪಿದೆ! ಇದು ಮಜವಾಗಿದೆ! 🎉","quiz_q1":"ಎಲೆಗಳ ಬೆಳವಣಿಗೆಗೆ ಯಾವ ಪೋಷಕಾಂಶವು ಅತ್ಯಂತ ಮುಖ್ಯವಾದುದು?","quiz_q1_opts":"ಸಾರಜನಕ,ರಂಜಕ,ಪೊಟ್ಯಾಸಿಯಮ್,ಕ್ಯಾಲ್ಸಿಯಂ","quiz_q2":"ಬೆಳೆ ಪರಿವರ್ತನೆ ಎಂದರೇನು?","quiz_q2_opts":"ಒಂದು ಹೊಲದಲ್ಲಿ ಬೆಳೆಗಳನ್ನು ಬದಲಾಯಿಸುವುದು,ಬೆಳೆಗಳಿಗೆ ವೃತ್ತಾಕಾರವಾಗಿ ನೀರು ಹಾಕುವುದು,ಒಂದು ರೀತಿಯ ಗೊಬ್ಬರ,ಒಂದು ಕೊಯ್ಲು ತಂತ್ರ","badge_newbie_name":"ಹೊಸಬ ರೈತ","badge_newbie_desc":"ಮೊದಲ ಕಾರ್ಯವನ್ನು ಪೂರ್ಣಗೊಳಿಸಿದ್ದೀರಿ. ಸ್ವಾಗತ!","badge_green_thumb_name":"ಹಸಿರು ಹೆಬ್ಬೆರಳು","badge_green_thumb_desc":"10 ಕಾರ್ಯಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಳಿಸಿದ್ದೀರಿ.","badge_first_harvest_name":"ಮೊದಲ ಕೊಯ್ಲು","badge_first_harvest_desc":"ನಿಮ್ಮ ಮೊದಲ ಬೆಳೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಕೊಯ್ಲು ಮಾಡಿದ್ದೀರಿ.","badge_quiz_master_name":"ರಸಪ್ರಶ್ನೆ ಮಾಸ್ಟರ್","badge_quiz_master_desc":"ಒಂದು ಕೃಷಿ ರಸಪ್ರಶ್ನೆಯಲ್ಲಿ ಪರಿಪೂರ್ಣ ಅಂಕಗಳನ್ನು ಗಳಿಸಿದ್ದೀರಿ.","badge_streaker_name":"ಸ್ಟ್ರೀಕರ್","badge_streaker_desc":"7-ದಿನದ ಸರಣಿಯನ್ನು ಕಾಯ್ದುಕೊಂಡಿದ್ದೀರಿ.","badge_community_helper_name":"ಸಮುದಾಯ ಸಹಾಯಕ","badge_community_helper_desc":"ಸಮುದಾಯದೊಂದಿಗೆ ಒಂದು ಉಪಯುಕ್ತ ಸಲಹೆಯನ್ನು ಹಂಚಿಕೊಂಡಿದ್ದೀರಿ.","tomato_quest_day1_title":"ಸಮೃದ್ಧ ಮಣ್ಣನ್ನು ತಯಾರಿಸಿ","tomato_quest_day1_desc":"ಬೀಜಗಳಿಗೆ ಸಮೃದ್ಧ ಪೋಷಕಾಂಶಗಳನ್ನು ಒದಗಿಸಲು ನಿಮ್ಮ ಮಣ್ಣಿನಲ್ಲಿ ಕಾಂಪೋಸ್ಟ್ ಮಿಶ್ರಣ ಮಾಡಿ.","tomato_quest_day2_title":"ಬೀಜಗಳನ್ನು ಬಿತ್ತಿ","tomato_quest_day2_desc":"ತಯಾರಾದ ಮಣ್ಣಿನಲ್ಲಿ ಸುಮಾರು 1/4 ಇಂಚು ಆಳದಲ್ಲಿ ಟೊಮ್ಯಾಟೊ ಬೀಜಗಳನ್ನು ನೆಡಿ.","tomato_quest_day7_title":"ಸೌಮ್ಯವಾಗಿ ನೀರುಹಾಕುವುದು","tomato_quest_day7_desc":"ಮೊಳಕೆಯೊಡೆಯಲು ಸಹಾಯ ಮಾಡಲು ಮಣ್ಣನ್ನು ತೇವವಾಗಿಡಿ, ಆದರೆ ನೀರು ನಿಲ್ಲದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.","tomato_quest_day12_title":"ಮೊಳಕೆಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ","tomato_quest_day12_desc":"ಮಣ್ಣಿನಿಂದ ಹೊರಬರುವ ಹಸಿರು ಮೊಳಕೆಗಳ ಮೊದಲ ಚಿಹ್ನೆಗಳಿಗಾಗಿ ನೋಡಿ.","tomato_quest_day18_title":"ಸೂರ್ಯನ ಬೆಳಕನ್ನು ಒದಗಿಸಿ","tomato_quest_day18_desc":"ಸಸಿಗಳಿಗೆ ದಿನಕ್ಕೆ ಕನಿಷ್ಠ 6-8 ಗಂಟೆಗಳ ಕಾಲ ಸೂರ್ಯನ ಬೆಳಕು ಸಿಗುವಂತೆ ನೋಡಿಕೊಳ್ಳಿ.","tomato_quest_day25_title":"ಸಸಿಗಳನ್ನು ವಿರಳಗೊಳಿಸಿ","tomato_quest_day25_desc":"ಬಲವಾದ ಸಸಿಗೆ ಬೆಳೆಯಲು ಹೆಚ್ಚು ಸ್ಥಳಾವಕಾಶ ನೀಡಲು ದುರ್ಬಲ ಸಸಿಗಳನ್ನು ನಿಧಾನವಾಗಿ ತೆಗೆದುಹಾಕಿ.","tomato_quest_day30_title":"ಆಳವಾಗಿ ನೀರು ಹಾಕಿ","tomato_quest_day30_desc":"ಬಲವಾದ ಬೇರುಗಳ ಬೆಳವಣಿಗೆಯನ್ನು ಉತ್ತೇಜಿಸಲು ಆಳವಾಗಿ ಮತ್ತು ಕಡಿಮೆ ಬಾರಿ ನೀರು ಹಾಕಿ.","tomato_quest_day35_title":"ನೈಸರ್ಗಿಕ ಹೊದಿಕೆಯನ್ನು ಅನ್ವಯಿಸಿ","tomato_quest_day35_desc":"ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ಉಳಿಸಿಕೊಳ್ಳಲು ಮತ್ತು ಕಳೆಗಳನ್ನು ತಡೆಯಲು ಒಣಹುಲ್ಲಿನ ಅಥವಾ ಮರದ ಚಿಪ್ಸ್ ಪದರವನ್ನು ಸೇರಿಸಿ.","tomato_quest_day40_title":"ಒಂದು ಗೂಟವನ್ನು ಸ್ಥಾಪಿಸಿ","tomato_quest_day40_desc":"ಗಿಡವು ಎತ್ತರವಾಗಿ ಬೆಳೆದಂತೆ ಅದನ್ನು ಬೆಂಬಲಿಸಲು ಗಿಡದ ಬಳಿ ಒಂದು ಗೂಟ ಅಥವಾ ಪಂಜರವನ್ನು ಇರಿಸಿ.","tomato_quest_day45_title":"ನೈಸರ್ಗಿಕ ಕೀಟ ಗಸ್ತು","tomato_quest_day45_desc":"ಕೀಟಗಳಿಗಾಗಿ ಎಲೆಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ. ಸಾಧ್ಯವಾದರೆ ಲೇಡಿಬಗ್ಗಳಂತಹ ಪ್ರಯೋಜನಕಾರಿ ಕೀಟಗಳನ್ನು ಪರಿಚಯಿಸಿ.","tomato_quest_day52_title":"ಕೆಳಗಿನ ಎಲೆಗಳನ್ನು ಕತ್ತರಿಸಿ","tomato_quest_day52_desc":"ಗಾಳಿಯ ಸಂಚಾರವನ್ನು ಸುಧಾರಿಸಲು ಮತ್ತು ರೋಗವನ್ನು ತಡೆಗಟ್ಟಲು ಕೆಳಗಿನ ಎಲೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ.","tomato_quest_day60_title":"ಮೊದಲ ಕೊಯ್ಲು!","tomato_quest_day60_desc":"ಮೊದಲ ಮಾಗಿದ ಟೊಮ್ಯಾಟೊಗಳನ್ನು ಕೊಯ್ಲು ಮಾಡಿ. ನಿಮ್ಮ ಸುಸ್ಥಿರ ಕೃಷಿಯ ಫಲಗಳನ್ನು ಆನಂದಿಸಿ!","dashboardCommunityTitle":"ಸಮುದಾಯ ಮತ್ತು ಶ್ರೇಯಾಂಕಗಳು","dashboardCommunityDesc":"ಇತರ ರೈತರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ!","dashboardCommunityViewFeed":"ಫೀಡ್ ವೀಕ್ಷಿಸಿ","dashboardCommunityViewLeaderboard":"ಲೀಡರ್‌ಬೋರ್ಡ್ ಪರಿಶೀಲಿಸಿ","wheat_quest_day1_title":"ಮಣ್ಣಿನ pH ಪರೀಕ್ಷಿಸಿ","wheat_quest_day1_desc":"ನಿಮ್ಮ ಮಣ್ಣಿನ pH ಮಟ್ಟವನ್ನು ಪರೀಕ್ಷಿಸಿ. ಗೋಧಿಯು 6.0 ಮತ್ತು 7.0 ರ ನಡುವಿನ pH ಅನ್ನು ಆದ್ಯತೆ ನೀಡುತ್ತದೆ.","wheat_quest_day15_title":"ಸಂರಕ್ಷಣಾ ಉಳುಮೆ","wheat_quest_day15_desc":"ಭೂಮಿಯನ್ನು ಸಿದ್ಧಪಡಿಸಲು ಕನಿಷ್ಠ ಉಳುಮೆಯನ್ನು ಬಳಸಿ. ಇದು ಮಣ್ಣಿನ ಸವೆತವನ್ನು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ ಮತ್ತು ತೇವಾಂಶವನ್ನು ಉಳಿಸಿಕೊಳ್ಳುತ್ತದೆ.","wheat_quest_day30_title":"ಸ್ಮಾರ್ಟ್ ನೀರಾವರಿ","wheat_quest_day30_desc":"ನೀರನ್ನು ಸಂರಕ್ಷಿಸಲು ಮತ್ತು ಅದನ್ನು ನೇರವಾಗಿ ಬೇರುಗಳಿಗೆ ತಲುಪಿಸಲು ಮೊದಲ ನೀರಾವರಿಗೆ ಹನಿ ನೀರಾವರಿಯನ್ನು ಬಳಸಿ.","wheat_quest_day45_title":"ಕೈಯಿಂದ ಕಳೆ ನಿಯಂತ್ರಣ","wheat_quest_day45_desc":"ಕಳೆನಾಶಕಗಳನ್ನು ಬಳಸದೆ ಪೋಷಕಾಂಶಗಳಿಗಾಗಿ ಸ್ಪರ್ಧೆಯನ್ನು ತಡೆಗಟ್ಟಲು ಕಳೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಕೈಯಿಂದ ತೆಗೆದುಹಾಕಿ.","wheat_quest_day60_title":"ಪ್ರಯೋಜನಕಾರಿ ಕೀಟಗಳನ್ನು ಆಕರ್ಷಿಸಿ","wheat_quest_day60_desc":"ಅಫಿಡ್‌ಗಳಂತಹ ಕೀಟಗಳನ್ನು ಬೇಟೆಯಾಡುವ ಲೇಡಿಬಗ್‌ಗಳು ಮತ್ತು ಇತರ ಕೀಟಗಳನ್ನು ಆಕರ್ಷಿಸಲು ಹತ್ತಿರದಲ್ಲಿ ಕ್ಲೋವರ್‌ನಂತಹ ಹೂವುಗಳನ್ನು ನೆಡಿ.","wheat_quest_day75_title":"ಕಾಂಪೋಸ್ಟ್ ಟೀ ಅನ್ವಯಿಸಿ","wheat_quest_day75_desc":"ನಿಮ್ಮ ಬೆಳೆಯುತ್ತಿರುವ ಗೋಧಿಗೆ ನೈಸರ್ಗಿಕ, ಪೋಷಕಾಂಶ-ಭರಿತ ಪත්‍ර ಆಹಾರವಾಗಿ ಕಾಂಪೋಸ್ಟ್ ಟೀ ಅನ್ನು ತಯಾರಿಸಿ ಮತ್ತು ಅನ್ವಯಿಸಿ.","wheat_quest_day90_title":"ರೋಗ ಮೇಲ್ವಿಚಾರಣೆ","wheat_quest_day90_desc":"ತುಕ್ಕು ಅಥವಾ ಶಿಲೀಂಧ್ರದ ಚಿಹ್ನೆಗಳಿಗಾಗಿ ಎಲೆಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ. ಅಗತ್ಯವಿದ್ದರೆ ಗಾಳಿಯ ಸಂಚಾರವನ್ನು ಸುಧಾರಿಸಿ.","wheat_quest_day120_title":"ಸುಸ್ಥಿರ ಕೊಯ್ಲು","wheat_quest_day120_desc":"ಬಂಗಾರದ ಬಣ್ಣದ ಗೋಧಿಯನ್ನು ಕೊಯ್ಲು ಮಾಡಿ. ಮಣ್ಣನ್ನು ಸಮೃದ್ಧಗೊಳಿಸಲು ಕಾಂಡಗಳನ್ನು ಹೊಲದಲ್ಲಿ ಹೊದಿಕೆಯಾಗಿ ಬಿಡಿ.","corn_quest_day1_title":"ಸಹಚರ ನೆಡುವಿಕೆ ಸಿದ್ಧತೆ","corn_quest_day1_desc":"'ಮೂರು ಸಹೋದರಿಯರು' ತೋಟವನ್ನು ಯೋಜಿಸಿ. ಮೆಕ್ಕೆಜೋಳವು ಬೀನ್ಸ್‌ಗೆ ಕಾಂಡವನ್ನು ಒದಗಿಸುತ್ತದೆ, ಇದು ಮಣ್ಣಿಗೆ ಸಾರಜನಕವನ್ನು ಸೇರಿಸುತ್ತದೆ.","corn_quest_day10_title":"ಬ್ಲಾಕ್‌ಗಳಲ್ಲಿ ನೆಡಿ","corn_quest_day10_desc":"ಗಾಳಿ ಪರಾಗಸ್ಪರ್ಶವನ್ನು ಸುಧಾರಿಸಲು ಉದ್ದವಾದ ಸಾಲುಗಳ ಬದಲು ಚಿಕ್ಕ, ಆಯತಾಕಾರದ ಬ್ಲಾಕ್‌ಗಳಲ್ಲಿ ಮೆಕ್ಕೆಜೋಳದ ಬೀಜಗಳನ್ನು ಬಿತ್ತಿ.","corn_quest_day25_title":"ಕಾಂಪೋಸ್ಟ್‌ನೊಂದಿಗೆ ಸೈಡ್-ಡ್ರೆಸ್","corn_quest_day25_desc":"ಪೋಷಕಾಂಶಗಳ ನಿಧಾನಗತಿಯ ಬಿಡುಗಡೆಯನ್ನು ಒದಗಿಸಲು ಕಾಂಡಗಳ ಬುಡದಲ್ಲಿ ಸಮೃದ್ಧ ಕಾಂಪೋಸ್ಟ್‌ನ ಪದರವನ್ನು ಸೇರಿಸಿ.","corn_quest_day40_title":"ನೈಸರ್ಗಿಕ ಕೀಟ ರಕ್ಷಣೆ","corn_quest_day40_desc":"ಮೆಕ್ಕೆಜೋಳದ ಕಿವಿಯ ಹುಳುಗಳಿಗಾಗಿ doµu. ಅವುಗಳನ್ನು ತಡೆಯಲು ಪ್ರತಿ ಕಿವಿಯ ತುದಿಗೆ ಒಂದು ಹನಿ ಖನಿಜ ತೈಲವನ್ನು ಹಾಕಿ.","corn_quest_day60_title":"ಪರಾಗಸ್ಪರ್ಶ ಪರಿಶೀಲನೆ","corn_quest_day60_desc":"ಕಾಂಡಗಳ ಮೇಲ್ಭಾಗದಲ್ಲಿ ಹಳದಿ ಪರಾಗವನ್ನು ಉದುರಿಸುವ ಟಾಸೆಲ್‌ಗಳಿಗಾಗಿ ನೋಡಿ. ಸಹಾಯ ಮಾಡಲು ಅವುಗಳನ್ನು ನಿಧಾನವಾಗಿ ಅಲ್ಲಾಡಿಸಿ.","corn_quest_day75_title":"ಹಾಲು ಪರೀಕ್ಷೆ","corn_quest_day75_desc":"ಮಾಗುವಿಕೆಯನ್ನು ಪರೀಕ್ಷಿಸಿ. ನಿಮ್ಮ ಬೆರಳಿನ ಉಗುರಿನಿಂದ ಒಂದು ಕಾಳನ್ನು ಚುಚ್ಚಿ; ರಸವು ಹಾಲಿನಂತಿದ್ದರೆ, ಅದು ಕೊಯ್ಲಿಗೆ ಸಿದ್ಧವಾಗಿದೆ.","corn_quest_day90_title":"ಕೊಯ್ಲು ಮತ್ತು ಹೊದಿಕೆ","corn_quest_day90_desc":"ಮೆಕ್ಕೆಜೋಳದ ಕಿವಿಗಳನ್ನು ಕೊಯ್ಲು ಮಾಡಿ. ಕಾಂಡಗಳನ್ನು ಕತ್ತರಿಸಿ, ಕೊಳೆಯಲು ಮತ್ತು ಮಣ್ಣಿಗೆ ಆಹಾರವಾಗಲು ಅವುಗಳನ್ನು ನೆಲದ ಮೇಲೆ ಬಿಡಿ.","potato_quest_day1_title":"ನಿಮ್ಮ ಆಲೂಗಡ್ಡೆಗಳನ್ನು ಚಿಟ್ ಮಾಡಿ","potato_quest_day1_desc":"ಬೀಜ ಆಲೂಗಡ್ಡೆಗಳನ್ನು ನೆಡುವ ಮೊದಲು ('ಚಿಟ್ಟಿಂಗ್') ಪ್ರಕಾಶಮಾನವಾದ, ತಂಪಾದ ಸ್ಥಳದಲ್ಲಿ ಇರಿಸುವ ಮೂಲಕ ಮೊಳಕೆಯೊಡೆಯಲು ಪ್ರೋತ್ಸಾಹಿಸಿ.","potato_quest_day10_title":"ಕಂದಕಗಳಲ್ಲಿ ನೆಡಿ","potato_quest_day10_desc":"ಪೋಷಣೆಗಾಗಿ ಕೆಳಭಾಗದಲ್ಲಿ ಕಾಂಪೋಸ್ಟ್ ಪದರವಿರುವ ಕಂದಕದಲ್ಲಿ ಮೊಳಕೆಯೊಡೆದ ಆಲೂಗಡ್ಡೆಗಳನ್ನು ನೆಡಿ.","potato_quest_day25_title":"ಮೊದಲ ಹೂಟಿ","potato_quest_day25_desc":"ಗಿಡದ ಬುಡದ ಸುತ್ತಲೂ ಮಣ್ಣನ್ನು ರಾಶಿ ಮಾಡಿ. ಇದು ಹೊಸ ಆಲೂಗಡ್ಡೆಗಳನ್ನು ಸೂರ್ಯನ ಬೆಳಕಿನಿಂದ ರಕ್ಷಿಸುತ್ತದೆ.","potato_quest_day40_title":"ಕೀಟ ಗಸ್ತು","potato_quest_day40_desc":"ಕೊಲೊರಾಡೋ ಆಲೂಗಡ್ಡೆ ಜೀರುಂಡೆ ಮತ್ತು ಅವುಗಳ ಲಾರ್ವಾಗಳಿಗಾಗಿ ಎಲೆಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ. ನಿಮ್ಮ ಗಿಡಗಳನ್ನು ರಕ್ಷಿಸಲು ಅವುಗಳನ್ನು ಕೈಯಿಂದ ಆರಿಸಿ.","potato_quest_day55_title":"ಎರಡನೇ ಹೂಟಿ","potato_quest_day55_desc":"ಗಿಡಗಳು ಎತ್ತರವಾಗಿ ಬೆಳೆದಂತೆ ಅವುಗಳ ಸುತ್ತಲೂ ಮತ್ತೊಂದು ಪದರ ಮಣ್ಣು ಅಥವಾ ಒಣಹುಲ್ಲಿನ ಹೊದಿಕೆಯನ್ನು ಸೇರಿಸಿ.","potato_quest_day70_title":"ಸ್ಥಿರವಾದ ತೇವಾಂಶ","potato_quest_day70_desc":"ಮಣ್ಣನ್ನು ಸಮನಾಗಿ ತೇವವಾಗಿಡಲು ಆಳವಾಗಿ ಮತ್ತು ನಿಯಮಿತವಾಗಿ ನೀರು ಹಾಕಿ, ಇದು ಆಲೂಗಡ್ಡೆಗಳ ಮೇಲೆ ಕಜ್ಜಿ ತಡೆಯಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.","potato_quest_day90_title":"ಸಾಯುವುದಕ್ಕಾಗಿ ನಿರೀಕ್ಷಿಸಿ","potato_quest_day90_desc":"ಗಿಡದ ಎಲೆಗಳು ಹಳದಿ ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿ ಸಾಯುತ್ತವೆ. ಇದು ಆಲೂಗಡ್ಡೆಗಳು ಪಕ್ವವಾಗುತ್ತಿವೆ ಎಂಬುದರ ಸಂಕೇತವಾಗಿದೆ.","potato_quest_day100_title":"ಸೌಮ್ಯ ಕೊಯ್ಲು","potato_quest_day100_desc":"ನಿಮ್ಮ ಆಲೂಗಡ್ಡೆಗಳನ್ನು ತೋಟದ ಫೋರ್ಕ್‌ನಿಂದ ಎಚ್ಚರಿಕೆಯಿಂದ ಅಗೆಯಿರಿ. ಸಂಗ್ರಹಿಸುವ ಮೊದಲು ಅವುಗಳನ್ನು ಕೆಲವು ಗಂಟೆಗಳ ಕಾಲ ಒಣಗಲು ಬಿಡಿ.","dashboardStreakTitle":"ದೈನಂದಿನ ಸರಣಿ","marketplaceTitle":"ಮಾರುಕಟ್ಟೆ","marketplaceTabBuy":"ಖರೀದಿಸಿ","marketplaceTabSell":"ಮಾರಾಟ ಮಾಡಿ","marketplaceCategoryAll":"ಎಲ್ಲಾ","marketplaceCategoryCrops":"ಬೆಳೆಗಳು","marketplaceCategoryTools":"ಉಪಕರಣಗಳು","marketplaceCategoryServices":"ಸೇವೆಗಳು","marketplacePrice":"ಬೆಲೆ","marketplaceQuantity":"ಪ್ರಮಾಣ","marketplaceSeller":"ಮಾರಾಟಗಾರ","marketplaceBuyButton":"ಖರೀದಿಸಿ","marketplaceSellTitle":"ನಿಮ್ಮ ಇನ್ವೆಂಟರಿಯಿಂದ ಮಾರಾಟ ಮಾಡಿ","marketplaceSellItemLabel":"ನಿಮ್ಮ ಇನ್ವೆಂಟರಿಯಿಂದ ವಸ್ತು","marketplaceSellQuantityLabel":"ಪ್ರಮಾಣ","marketplaceSellPriceLabel":"ಪ್ರತಿ ವಸ್ತುವಿಗೆ ಬೆಲೆ ನಿಗದಿಪಡಿಸಿ (₹)","marketplaceSellCategoryLabel":"ವರ್ಗ","marketplaceSellButton":"ಮಾರಾಟಕ್ಕಾಗಿ ವಸ್ತುವನ್ನು ಪಟ್ಟಿ ಮಾಡಿ","buySuccess":"ಖರೀದಿ ಯಶಸ್ವಿ!","sellSuccess":"ಐಟಂ ಯಶಸ್ವಿಯಾಗಿ ಪಟ್ಟಿಮಾಡಲಾಗಿದೆ!","notEnoughFunds":"ಸಾಕಷ್ಟು ರೂಪಾಯಿಗಳಿಲ್ಲ!","notEnoughStock":"ಸಾಕಷ್ಟು ಸ್ಟಾಕ್ ಇಲ್ಲ!","item_shovel":"ಸಲಿಕೆ","item_watering_can":"ನೀರು ಹಾಕುವ ಕ್ಯಾನ್","item_seeds_tomato":"ಟೊಮ್ಯಾಟೊ ಬೀಜಗಳು","service_soil_test":"ಮಣ್ಣು ಪರೀಕ್ಷೆ ಸೇವೆ","wallet":"Wallet","dashboardMarketplaceTitle":"ಮಾರುಕಟ್ಟೆ","dashboardMarketplaceDesc":"ಉಪಕರಣಗಳನ್ನು ಖರೀದಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಸುಗ್ಗಿಯನ್ನು ಮಾರಾಟ ಮಾಡಿ!","dashboardMarketplaceButton":"ಮಾರುಕಟ್ಟೆಗೆ ಹೋಗಿ","marketplaceSellInstruction":"ಮಾರಾಟಕ್ಕಾಗಿ ಆಯ್ಕೆ ಮಾಡಲು ಕೆಳಗಿನ ವಸ್ತುವಿನ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ.","marketplaceSellYourInventory":"ನಿಮ್ಮ ಇನ್ವೆಂಟರಿ","marketplaceSellNoItems":"ನಿಮ್ಮ ಇನ್ವೆಂಟರಿಯಲ್ಲಿ ಮಾರಾಟ ಮಾಡಲು ಏನೂ ಇಲ್ಲ.","marketplaceSellSelected":"ಆಯ್ದ ವಸ್ತು","marketplaceSellEarnings":"ಸಂಭಾವ್ಯ ಗಳಿಕೆಗಳು","dashboardCurrentLevel":"ಪ್ರಸ್ತುತ ಮಟ್ಟ","dashboardLevelAbbr":"ಮಟ್ಟ","dashboardGuidesTitle":"ಸುಸ್ಥಿರ ಮಾರ್ಗದರ್ಶಿಗಳು","dashboardGuidesDesc":"ಸುಸ್ಥಿರ ಕೃಷಿ ತಂತ್ರಗಳನ್ನು ಕಲಿಯಿರಿ.","dashboardGuidesButton":"ಮಾರ್ಗದರ್ಶಿಗಳನ್ನು ವೀಕ್ಷಿಸಿ","learnTabGuides":"ಮಾರ್ಗದರ್ಶಿಗಳು","learnTabQuizzes":"ರಸಪ್ರಶ್ನೆಗಳು","guide_water_conservation_title":"ನೀರು ಸಂರಕ್ಷಣೆ","guide_water_conservation_desc":"ನಿಮ್ಮ ಜಮೀನಿನಲ್ಲಿ ನೀರನ್ನು ದಕ್ಷತೆಯಿಂದ ಬಳಸಲು ಮತ್ತು ಈ ಅಮೂಲ್ಯ ಸಂಪನ್ಮೂಲವನ್ನು ಸಂರಕ್ಷಿಸಲು ತಂತ್ರಗಳನ್ನು ಕಲಿಯಿರಿ.","guide_water_conservation_task_1_title":"ಹನಿ ನೀರಾವರಿ ಅಳವಡಿಸಿ","guide_water_conservation_task_2_title":"ಮಣ್ಣಿಗೆ ಹೊದಿಕೆ ಹಾಕಿ","guide_water_conservation_task_3_title":"ಬೆಳಗ್ಗೆ ಬೇಗನೆ ನೀರು ಹಾಕಿ","guide_water_conservation_task_4_title":"ಮಳೆ ನೀರು ಸಂಗ್ರಹಿಸಿ","guide_water_conservation_task_5_title":"ಬರ-ನಿರೋಧಕ ಬೆಳೆಗಳನ್ನು ಆರಿಸಿ","guide_crop_rotation_title":"ಬೆಳೆ ಪರಿವರ್ತನೆ","guide_crop_rotation_desc":"ಮಣ್ಣಿನ ಆರೋಗ್ಯವನ್ನು ಕಾಪಾಡಲು, ರೋಗಗಳನ್ನು ತಡೆಗಟ್ಟಲು ಮತ್ತು ಕೀಟಗಳನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಬೆಳೆಗಳನ್ನು ತಿರುಗಿಸುವ ಮಹತ್ವವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.","guide_crop_rotation_task_1_title":"3-ವರ್ಷದ ಪರಿವರ್ತನೆ ಚಕ್ರವನ್ನು ಯೋಜಿಸಿ","guide_crop_rotation_task_2_title":"ಸಾರಜನಕಕ್ಕಾಗಿ ದ್ವಿದಳ ಧಾನ್ಯಗಳನ್ನು ನೆಡಿ","guide_crop_rotation_task_3_title":"ಒಂದೇ ಕುಟುಂಬದ ಗಿಡಗಳನ್ನು ನೆಡುವುದನ್ನು ತಪ್ಪಿಸಿ","guide_crop_rotation_task_4_title":"ಹೊದಿಕೆ ಬೆಳೆಗಳನ್ನು ಸೇರಿಸಿ","guide_crop_rotation_task_5_title":"ನಿಮ್ಮ ಪರಿವರ್ತನೆಗಳ ದಾಖಲೆಯನ್ನು ಇರಿಸಿ","guide_composting_101_title":"ಕಾಂಪೋಸ್ಟಿಂಗ್ 101","guide_composting_101_desc":"ಅಡಿಗೆಮನೆ ಮತ್ತು ಅಂಗಳದ ತ್ಯಾಜ್ಯವನ್ನು ನಿಮ್ಮ ಗಿಡಗಳಿಗೆ ಪೋಷಕಾಂಶ-ಭರಿತ ಮಣ್ಣಾಗಿ ಪರಿವರ್ತಿಸಲು ಕಲಿಯಿರಿ.","guide_composting_101_task_1_title":"ಕಾಂಪೋಸ್ಟಿಂಗ್ ಸ್ಥಳವನ್ನು ಆರಿಸಿ","guide_composting_101_task_2_title":"ನಿಮ್ಮ 'ಕಂದು' ಮತ್ತು 'ಹಸಿರು' ವಸ್ತುಗಳನ್ನು ಸಂಗ್ರಹಿಸಿ","guide_composting_101_task_3_title":"ನಿಮ್ಮ ಕಾಂಪೋಸ್ಟ್ ರಾಶಿಯನ್ನು ಪದರ ಮಾಡಿ","guide_composting_101_task_4_title":"ರಾಶಿಯನ್ನು ತೇವವಾಗಿಡಿ","guide_composting_101_task_5_title":"ನಿಮ್ಮ ಕಾಂಪೋಸ್ಟ್ ಅನ್ನು ನಿಯಮಿತವಾಗಿ ತಿರುಗಿಸಿ","guide_natural_pest_control_title":"ನೈಸರ್ಗಿಕ ಕೀಟ ನಿಯಂತ್ರಣ","guide_natural_pest_control_desc":"ನೈಸರ್ಗಿಕ ಪರಿಸರ ವ್ಯವಸ್ಥೆಯನ್ನು ಪ್ರೋತ್ಸಾಹಿಸುವ ಮೂಲಕ ಹಾನಿಕಾರಕ ರಾಸಾಯನಿಕಗಳಿಲ್ಲದೆ ನಿಮ್ಮ ಬೆಳೆಗಳನ್ನು ಕೀಟಗಳಿಂದ ರಕ್ಷಿಸಿ.","guide_natural_pest_control_task_1_title":"ಪ್ರಯೋಜನಕಾರಿ ಕೀಟಗಳನ್ನು ಪರಿಚಯಿಸಿ","guide_natural_pest_control_task_2_title":"ಸಹಚರ ನೆಡುವಿಕೆಯನ್ನು ಬಳಸಿ","guide_natural_pest_control_task_3_title":"ಬೇವಿನ ಎಣ್ಣೆಯ ಸ್ಪ್ರೇ ರಚಿಸಿ","guide_natural_pest_control_task_4_title":"ಭೌತಿಕ ತಡೆಗಳನ್ನು (ಬಲೆಗಳು) ಸ್ಥಾಪಿಸಿ","guide_natural_pest_control_task_5_title":"ಪಕ್ಷಿಗಳನ್ನು ಭೇಟಿ ನೀಡಲು ಪ್ರೋತ್ಸಾಹಿಸಿ","dashboardTipsTitle":"ಕೃಷಿ ಸಲಹೆಗಳು ಮತ್ತು ಪರಿಹಾರಗಳು","tip_drought_title":"ಹಠಾತ್ ಬರ","tip_drought_cause":"ಕಾರಣ: ಮಳೆಯ ಕೊರತೆ ಮತ್ತು ಅಧಿಕ ತಾಪಮಾನವು ಮಣ್ಣನ್ನು ಒಣಗಿಸುತ್ತಿದೆ.","tip_drought_tips":"ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ಉಳಿಸಿಕೊಳ್ಳಲು ದಪ್ಪವಾದ ಹೊದಿಕೆ (ಒಣಹುಲ್ಲು, ಮರದ ಚಿಪ್ಸ್) ಪದರವನ್ನು ಹಾಕಿ.|ಆಳವಾಗಿ ಆದರೆ ಕಡಿಮೆ ಬಾರಿ, ಆವಿಯಾಗುವಿಕೆಯನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಬೆಳಿಗ್ಗೆ ಬೇಗನೆ ನೀರು ಹಾಕಿ.|ಬೇರುಗಳಿಗೆ ನೇರವಾಗಿ ನೀರನ್ನು ತಲುಪಿಸಲು ಹನಿ ನೀರಾವರಿ ವ್ಯವಸ್ಥೆಯನ್ನು ಸ್ಥಾಪಿಸಿ.","tip_flood_title":"ಅನಿರೀಕ್ಷಿತ ಪ್ರವಾಹ","tip_flood_cause":"ಕಾರಣ: ಭಾರೀ, ದೀರ್ಘಕಾಲದ ಮಳೆಯು ಹೊಲಗಳನ್ನು ಜಲಾವೃತಗೊಳಿಸಿದೆ.","tip_flood_tips":"ಹೆಚ್ಚುವರಿ ನೀರನ್ನು ತಿರುಗಿಸಲು ಆಳವಿಲ್ಲದ ಕಂದಕಗಳನ್ನು ತೋಡುವ ಮೂಲಕ ಒಳಚರಂಡಿಯನ್ನು ಸುಧಾರಿಸಿ.|ಒದ್ದೆಯಾದ ಮಣ್ಣಿನ ಮೇಲೆ ನಡೆಯದೆ ಅಥವಾ ಭಾರೀ ಯಂತ್ರೋಪಕರಣಗಳನ್ನು ಬಳಸದೆ ಅದನ್ನು ಗಟ್ಟಿಯಾಗಿಸುವುದನ್ನು ತಪ್ಪಿಸಿ.|ಮಣ್ಣು ಒಣಗಿದ ನಂತರ ಬೇರು ಕೊಳೆತವನ್ನು ಪರೀಕ್ಷಿಸಿ ಮತ್ತು ಅಗತ್ಯವಿದ್ದರೆ ಶಿಲೀಂಧ್ರನಾಶಕವನ್ನು ಅನ್ವಯಿಸಿ.","tip_fertilizer_shortage_title":"ಗೊಬ್ಬರದ ಕೊರತೆ","tip_fertilizer_shortage_cause":"ಕಾರಣ: ಪೂರೈಕೆ ಸರಪಳಿ ಸಮಸ್ಯೆಗಳು ವಾಣಿಜ್ಯ ಗೊಬ್ಬರಗಳನ್ನು ಲಭ್ಯವಿಲ್ಲದಂತೆ ಮಾಡಿವೆ.","tip_fertilizer_shortage_tips":"ನಿಮ್ಮ ಸ್ವಂತ ಪೋಷಕಾಂಶ-ಭರಿತ ಗೊಬ್ಬರವನ್ನು ರಚಿಸಲು ಕಾಂಪೋಸ್ಟ್ ರಾಶಿಯನ್ನು ಪ್ರಾರಂಭಿಸಿ.|ಕ್ಲೋವರ್‌ನಂತಹ ಹೊದಿಕೆ ಬೆಳೆಗಳನ್ನು ನೆಟ್ಟು ಅವುಗಳನ್ನು ಮಣ್ಣಿನಲ್ಲಿ ಉಳುಮೆ ಮಾಡುವ ಮೂಲಕ ಹಸಿರು ಗೊಬ್ಬರವನ್ನು ಬಳಸಿ.|ತ್ವರಿತ ಪೋಷಕಾಂಶದ ವರ್ಧಕಕ್ಕಾಗಿ ದ್ರವ ಗೊಬ್ಬರವಾಗಿ ಬಳಸಲು ಕಾಂಪೋಸ್ಟ್ ಟೀ ಅನ್ನು ತಯಾರಿಸಿ.","tip_seed_shortage_title":"ಬೀಜಗಳ ಲಭ್ಯವಿಲ್ಲದಿರುವುದು","tip_seed_shortage_cause":"ಕಾರಣ: ನಿಮ್ಮ ಯೋಜಿತ ಬೆಳೆ ಬೀಜಗಳಿಗಾಗಿ ಸ್ಥಳೀಯ ಪೂರೈಕೆದಾರರಲ್ಲಿ ದಾಸ್ತಾನು ಇಲ್ಲ.","tip_seed_shortage_tips":"ನಿಮ್ಮ ಸ್ವಂತ ಆರೋಗ್ಯಕರ, ಮುಕ್ತ-ಪರಾಗಸ್ಪರ್ಶ ಸಸ್ಯಗಳಿಂದ ಬೀಜ ಉಳಿತಾಯವನ್ನು ಅಭ್ಯಾಸ ಮಾಡಿ.|ಬೀಜಗಳನ್ನು ವ್ಯಾಪಾರ ಮಾಡಲು ಸ್ಥಳೀಯ ರೈತ ಜಾಲಗಳು ಅಥವಾ ಸಮುದಾಯ ಬೀಜ ಬ್ಯಾಂಕುಗಳೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ.|ಹೆಚ್ಚು ಸುಲಭವಾಗಿ ಲಭ್ಯವಿರುವ ಸ್ಥಳೀಯ, ಸ್ಥಳೀಯವಾಗಿ ಹೊಂದಿಕೊಂಡ ಬೆಳೆಗಳನ್ನು ನೆಡಲು ಆಯ್ಕೆಮಾಡಿ.","dashboardStartQuestTitle":"ಒಂದು ಕೃಷಿ ಕ್ವೆಸ್ಟ್ ಪ್ರಾರಂಭಿಸಿ","carrot_quest_day1_title":"ಆಳವಾದ ಮಣ್ಣನ್ನು ತಯಾರಿಸಿ","carrot_quest_day1_desc":"ಕ್ಯಾರೆಟ್ ನೇರವಾಗಿ ಬೆಳೆಯುವುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಲು ಮಣ್ಣನ್ನು ಆಳವಾಗಿ ಉಳುಮೆ ಮಾಡಿ ಮತ್ತು ಕಲ್ಲುಗಳನ್ನು ತೆಗೆದುಹಾಕಿ.","carrot_quest_day15_title":"ಸಸಿಗಳನ್ನು ವಿರಳಗೊಳಿಸಿ","carrot_quest_day15_desc":"ಬೇರುಗಳು ಬೆಳೆಯಲು ಜಾಗ ನೀಡಲು ಸಸಿಗಳನ್ನು ಸುಮಾರು 2 ಇಂಚು ಅಂತರದಲ್ಲಿ ವಿರಳಗೊಳಿಸಿ.","carrot_quest_day30_title":"ಹಗುರವಾದ ಹೊದಿಕೆಯನ್ನು ಅನ್ವಯಿಸಿ","carrot_quest_day30_desc":"ತೇವಾಂಶವನ್ನು ಉಳಿಸಿಕೊಳ್ಳಲು ಮತ್ತು ಕಳೆಗಳನ್ನು ಹತ್ತಿಕ್ಕಲು ಹುಲ್ಲಿನ ಕತ್ತರಿಸಿದ ಭಾಗಗಳನ್ನು ಹೊದಿಕೆಯಾಗಿ ಬಳಸಿ.","carrot_quest_day45_title":"ಕೀಟಗಳಿಂದ ರಕ್ಷಿಸಿ","carrot_quest_day45_desc":"ಕ್ಯಾರೆಟ್ ತುಕ್ಕು ನೊಣಗಳಿಂದ ರಕ್ಷಿಸಲು ಸಾಲು ಹೊದಿಕೆಗಳನ್ನು ಬಳಸಿ.","carrot_quest_day60_title":"ಬೇರಿನ ಗಾತ್ರವನ್ನು ಪರೀಕ್ಷಿಸಿ","carrot_quest_day60_desc":"ಬೇರುಗಳು ಕನಿಷ್ಠ 1/2 ಇಂಚು ಅಗಲವಿವೆಯೇ ಎಂದು ಪರೀಕ್ಷಿಸಲು ಮೇಲ್ಭಾಗದಲ್ಲಿರುವ ಮಣ್ಣನ್ನು ನಿಧಾನವಾಗಿ ಸರಿಸಿ.","carrot_quest_day75_title":"ನಿಮ್ಮ ಕ್ಯಾರೆಟ್‌ಗಳನ್ನು ಕೊಯ್ಲು ಮಾಡಿ","carrot_quest_day75_desc":"ತೋಟದ ಫೋರ್ಕ್‌ನಿಂದ ಮಣ್ಣನ್ನು ಸಡಿಲಗೊಳಿಸಿ ಮತ್ತು ಕ್ಯಾರೆಟ್‌ಗಳನ್ನು ನಿಧಾನವಾಗಿ ಎಳೆಯಿರಿ.","spinach_quest_day1_title":"ತಂಪಾದ ಮಣ್ಣಿನಲ್ಲಿ ನೆಡಿ","spinach_quest_day1_desc":"ಪಾಲಕ್ ತಂಪಾದ ವಾತಾವರಣದಲ್ಲಿ ಚೆನ್ನಾಗಿ ಬೆಳೆಯುವುದರಿಂದ ವಸಂತಕಾಲದ ಆರಂಭದಲ್ಲಿ ಅಥವಾ ಶರತ್ಕಾಲದಲ್ಲಿ ನೆಡಿ.","spinach_quest_day10_title":"ಸ್ಥಿರವಾದ ತೇವಾಂಶವನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ","spinach_quest_day10_desc":"ವೇಗದ ಬೆಳವಣಿಗೆಯನ್ನು ಉತ್ತೇಜಿಸಲು ಮತ್ತು ಬೋಲ್ಟಿಂಗ್ ತಡೆಯಲು ಮಣ್ಣನ್ನು ಸಮನಾಗಿ ತೇವವಾಗಿಡಿ.","spinach_quest_day20_title":"ಸಾರಜನಕದಿಂದ ಪೋಷಿಸಿ","spinach_quest_day20_desc":"ಸೊಂಪಾದ, ಹಸಿರು ಎಲೆಗಳಿಗಾಗಿ ಕಾಂಪೋಸ್ಟ್ ಟೀ ಅಥವಾ ಸಾವಯವ ಸಾರಜನಕ ಗೊಬ್ಬರವನ್ನು ಅನ್ವಯಿಸಿ.","spinach_quest_day30_title":"ಕೀಟ ಪರೀಕ್ಷೆ","spinach_quest_day30_desc":"ಅಫಿಡ್‌ಗಳು ಅಥವಾ ಎಲೆ ಗಣಿಗಾರರಿಗಾಗಿ ಎಲೆಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ ಮತ್ತು ನೈಸರ್ಗಿಕ ಪರಿಹಾರಗಳೊಂದಿಗೆ ಚಿಕಿತ್ಸೆ ನೀಡಿ.","spinach_quest_day45_title":"ನಿರಂತರ ಕೊಯ್ಲು","spinach_quest_day45_desc":"ಮೊದಲು ಹೊರಗಿನ ಎಲೆಗಳನ್ನು ಕೊಯ್ಲು ಮಾಡಿ, ಒಳಗಿನ ಎಲೆಗಳು ಬೆಳೆಯುತ್ತಲೇ ಇರಲು ಅನುವು ಮಾಡಿಕೊಡಿ.","backToGuides":"← ಮಾರ್ಗದರ್ಶಿಗಳಿಗೆ ಹಿಂತಿರುಗಿ","harvestButton":"ಕೊಯ್ಲು","harvestSuccess":"ಕೊಯ್ಲು ಯಶಸ್ವಿ! ನೀವು +{quantity} {cropName} ಪಡೆದಿರುವಿರಿ.","tts_enable":"ಪಠ್ಯದಿಂದ ಧ್ವನಿಯನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ","tts_disable":"ಪಠ್ಯದಿಂದ ಧ್ವನಿಯನ್ನು ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಿ","ttsToggleLabel":"ಪಠ್ಯದಿಂದ ಧ್ವನಿಯನ್ನು ಟಾಗಲ್ ಮಾಡಿ"};

const translations: Record<Language, Record<string, string>> = { en, hi, ta, te, bn, mr, kn };

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  isTTSEnabled: boolean;
  toggleTTS: () => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

const I18nProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [isTTSEnabled, setIsTTSEnabled] = useState(false);

  const toggleTTS = useCallback(() => {
    setIsTTSEnabled(prev => !prev);
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
  }, []);

  const t = useCallback((key: string, vars?: Record<string, string | number>) => {
    let translation = translations[language][key] || translations['en'][key] || key;
    if (vars) {
      Object.keys(vars).forEach(varKey => {
        translation = translation.replace(`{${varKey}}`, String(vars[varKey]));
      });
    }
    return translation;
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t, isTTSEnabled, toggleTTS }), [language, t, isTTSEnabled, toggleTTS]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within an I18nProvider');
  return context;
};

// --- AUTH CONTEXT ---
interface AuthContextType {
  user: User | null;
  login: (phone: string, otp: string) => Promise<void>;
  guestLogin: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (phone: string, otp: string) => {
    const { user: loggedInUser } = await api.loginWithPhone(phone, otp);
    setUser(loggedInUser);
  }, []);

  const guestLogin = useCallback(async () => {
    const { user: guestUser } = await api.guestLogin();
    setUser(guestUser);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, login, guestLogin, logout }), [user, login, guestLogin, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

// --- DATA CONTEXT ---
interface DataContextType {
  loading: boolean;
  gameState: GameState | null;
  dailyTasks: DailyTask[] | null;
  crops: Crop[] | null;
  quiz: QuizQuestion[] | null;
  communityPosts: CommunityPost[] | null;
  leaderboard: LeaderboardUser[] | null;
  allBadges: Badge[] | null;
  plantedCrop: PlantedCropState | null;
  marketplaceListings: MarketplaceListing[] | null;
  guides: Guide[] | null;
  farmingTips: FarmingTip[] | null,
  setPlantedCrop: (crop: PlantedCropState | null) => void;
  updateTaskCompletion: (day: number) => void;
  claimDailyTask: (taskId: string) => void;
  levelUpInfo: { newLevel: number } | null;
  clearLevelUp: () => void;
  buyFromMarket: (listingId: string) => void;
  sellToMarket: (itemId: string, quantity: number, price: number) => void;
  completeGuideTask: (taskId: string) => void;
  harvestCrop: () => void;
}

const DataContext = createContext<DataContextType | null>(null);

const DataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [dailyTasks, setDailyTasks] = useState<DailyTask[] | null>(null);
  const [crops, setCrops] = useState<Crop[] | null>(null);
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[] | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[] | null>(null);
  const [allBadges, setAllBadges] = useState<Badge[] | null>(null);
  const [marketplaceListings, setMarketplaceListings] = useState<MarketplaceListing[] | null>(null);
  const [guides, setGuides] = useState<Guide[] | null>(null);
  const [farmingTips, setFarmingTips] = useState<FarmingTip[] | null>(null);

  // Local state for game progression
  const [plantedCrop, setPlantedCropState] = useState<PlantedCropState | null>(() => {
    const saved = localStorage.getItem('plantedCrop');
    return saved ? JSON.parse(saved) : null;
  });
  const [levelUpInfo, setLevelUpInfo] = useState<{ newLevel: number } | null>(null);


  const setPlantedCrop = (crop: PlantedCropState | null) => {
    setPlantedCropState(crop);
    if (crop) {
      localStorage.setItem('plantedCrop', JSON.stringify(crop));
    } else {
      localStorage.removeItem('plantedCrop');
    }
  };

  const addXP = useCallback((xp: number) => {
    setGameState(prev => {
      if (!prev) return null;
      const newXP = prev.xp + xp;
      if (newXP >= prev.xpToNextLevel) {
        const newLevel = prev.level + 1;
        setLevelUpInfo({ newLevel });
        return {
          ...prev,
          level: newLevel,
          xp: newXP - prev.xpToNextLevel,
          xpToNextLevel: Math.floor(prev.xpToNextLevel * 1.5),
        };
      }
      return { ...prev, xp: newXP };
    });
  }, []);

  const updateTaskCompletion = useCallback((day: number) => {
    if (!plantedCrop) return;
    const updatedCrop = {
      ...plantedCrop,
      completedTasks: { ...plantedCrop.completedTasks, [day]: true },
    };
    setPlantedCrop(updatedCrop);
    
    // Find XP for this task
    const cropData = crops?.find(c => c.id === plantedCrop.cropId);
    const taskData = cropData?.questTasks.find(t => t.day === day);
    if (taskData) {
      addXP(taskData.xp);
    }
  }, [plantedCrop, crops, addXP]);

  const claimDailyTask = useCallback((taskId: string) => {
    setDailyTasks(prev => {
      if (!prev) return null;
      const task = prev.find(t => t.id === taskId);
      if (task) {
        addXP(task.xp);
      }
      return prev.map(t => t.id === taskId ? { ...t, completed: true } : t);
    });
  }, [addXP]);

  const completeGuideTask = useCallback((taskId: string) => {
     setGameState(prev => {
        if (!prev) return null;
        if (prev.completedGuideTasks.includes(taskId)) return prev; // Already completed
        
        const guide = guides?.flatMap(g => g.tasks).find(t => t.id === taskId);
        if(guide) {
            addXP(guide.xp);
        }
        return {
            ...prev,
            completedGuideTasks: [...prev.completedGuideTasks, taskId],
        };
     });
  }, [addXP, guides]);


  const harvestCrop = useCallback(() => {
    if (!plantedCrop) return;

    const cropData = crops?.find(c => c.id === plantedCrop.cropId);
    if (!cropData) return;

    setGameState(prev => {
        if (!prev) return null;
        addXP(cropData.harvestBonus);
        const existingItem = prev.inventory.find(item => item.nameKey === cropData.nameKey);
        let newInventory;
        if (existingItem) {
            newInventory = prev.inventory.map(item => item.nameKey === cropData.nameKey ? { ...item, quantity: item.quantity + cropData.harvestBonus } : item);
        } else {
            newInventory = [...prev.inventory, { itemId: cropData.id, nameKey: cropData.nameKey, icon: cropData.icon, quantity: cropData.harvestBonus, category: 'Crops' }];
        }
        return {
            ...prev,
            inventory: newInventory
        };
    });

    setPlantedCrop(null); // Clear the planted crop
  }, [plantedCrop, crops, addXP]);


  const buyFromMarket = useCallback((listingId: string) => {
    const listing = marketplaceListings?.find(l => l.id === listingId);
    if (!listing || !gameState) return;

    if (gameState.wallet < listing.price) {
        alert("Not enough Rupees!"); // Replace with better UI later
        return;
    }

    setGameState(prev => {
        if (!prev) return null;
        const existingItem = prev.inventory.find(item => item.nameKey === listing.itemNameKey);
        let newInventory;
        if (existingItem) {
            newInventory = prev.inventory.map(item => item.nameKey === listing.itemNameKey ? { ...item, quantity: item.quantity + 1 } : item);
        } else {
            // This part is tricky without full item data. We'll make a guess.
            const newItem = {
                itemId: listing.itemNameKey.replace('item_', '').replace('crop_','').replace('service_',''),
                nameKey: listing.itemNameKey,
                icon: listing.itemIcon,
                quantity: 1,
                category: listing.category,
            };
            newInventory = [...prev.inventory, newItem];
        }

        return {
            ...prev,
            wallet: prev.wallet - listing.price,
            inventory: newInventory,
        };
    });

    // Reduce quantity or remove listing
    setMarketplaceListings(prev => {
        if (!prev) return null;
        return prev.map(l => l.id === listingId ? { ...l, quantity: l.quantity - 1 } : l).filter(l => l.quantity > 0);
    });

  }, [gameState, marketplaceListings]);


  const sellToMarket = useCallback((itemId: string, quantity: number, price: number) => {
    if (!gameState) return;

    const itemInInventory = gameState.inventory.find(i => i.itemId === itemId);
    if (!itemInInventory || itemInInventory.quantity < quantity) {
        alert("Not enough stock!"); // Replace with better UI
        return;
    }

    // Decrease from inventory and increase wallet
    setGameState(prev => {
        if (!prev) return null;
        return {
            ...prev,
            wallet: prev.wallet + (price * quantity),
            inventory: prev.inventory.map(i => i.itemId === itemId ? { ...i, quantity: i.quantity - quantity } : i).filter(i => i.quantity > 0),
        }
    });

    // Add to marketplace
    const newListing: MarketplaceListing = {
        id: `m-${Date.now()}`,
        sellerName: 'Alex Farmer', // Mocked user name
        itemNameKey: itemInInventory.nameKey,
        itemIcon: itemInInventory.icon,
        category: itemInInventory.category,
        price,
        quantity,
    };
    setMarketplaceListings(prev => prev ? [newListing, ...prev] : [newListing]);

  }, [gameState]);


  const clearLevelUp = () => setLevelUpInfo(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [
          gameStateData,
          dailyTasksData,
          cropsData,
          quizData,
          communityPostsData,
          leaderboardData,
          allBadgesData,
          marketplaceData,
          guidesData,
          farmingTipsData,
        ] = await Promise.all([
          api.fetchGameState(),
          api.fetchDailyTasks(),
          api.fetchCrops(),
          api.fetchQuiz(),
          api.fetchCommunityPosts(),
          api.fetchLeaderboard(),
          api.fetchAllBadges(),
          api.fetchMarketplaceListings(),
          api.fetchGuides(),
          api.fetchFarmingTips(),
        ]);
        setGameState(gameStateData);
        setDailyTasks(dailyTasksData);
        setCrops(cropsData);
        setQuiz(quizData);
        setCommunityPosts(communityPostsData);
        setLeaderboard(leaderboardData);
        setAllBadges(allBadgesData);
        setMarketplaceListings(marketplaceData);
        setGuides(guidesData);
        setFarmingTips(farmingTipsData);
      } catch (error) {
        console.error("Failed to fetch game data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const value = useMemo(() => ({
    loading,
    gameState,
    dailyTasks,
    crops,
    quiz,
    communityPosts,
    leaderboard,
    allBadges,
    plantedCrop,
    marketplaceListings,
    guides,
    farmingTips,
    setPlantedCrop,
    updateTaskCompletion,
    claimDailyTask,
    levelUpInfo,
    clearLevelUp,
    buyFromMarket,
    sellToMarket,
    completeGuideTask,
    harvestCrop
  }), [
    loading, gameState, dailyTasks, crops, quiz, communityPosts, leaderboard,
    allBadges, plantedCrop, marketplaceListings, guides, farmingTips, updateTaskCompletion, claimDailyTask, levelUpInfo, buyFromMarket, sellToMarket, completeGuideTask, harvestCrop
  ]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};


// --- UI COMPONENTS ---
const LoadingSpinner: FC = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="w-16 h-16 border-4 border-t-green-500 border-gray-200 rounded-full animate-spin"></div>
  </div>
);

const Modal: FC<{ isOpen: boolean; onClose: () => void; children: ReactNode }> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-40" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 shadow-xl w-11/12 max-w-md" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

const TTSButton: FC<{ text: string }> = ({ text }) => {
    const { isTTSEnabled, language } = useI18n();

    const handleSpeech = () => {
        if (!isTTSEnabled || !window.speechSynthesis) return;

        window.speechSynthesis.cancel(); // Stop any previous speech
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Basic language mapping
        const langCodeMap: Record<Language, string> = {
            en: 'en-US',
            hi: 'hi-IN',
            ta: 'ta-IN',
            te: 'te-IN',
            bn: 'bn-IN',
            mr: 'mr-IN',
            kn: 'kn-IN',
        };
        utterance.lang = langCodeMap[language];
        window.speechSynthesis.speak(utterance);
    };

    if (!isTTSEnabled) return null;

    return (
        <button onClick={handleSpeech} className="ml-2 text-gray-500 hover:text-blue-600">
            {'🔊'}
        </button>
    );
};


// --- LOGIN SCREEN ---
const LoginPage: FC = () => {
  const { login, guestLogin } = useAuth();
  const { t } = useI18n();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = () => {
    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    setError('');
    setOtpSent(true);
    // In a real app, this would trigger an API call to send an OTP
  };

  const handleLogin = async () => {
    if (otp.length !== 4) {
      setError('Please enter a valid 4-digit OTP.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await login(phone, otp);
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      await guestLogin();
    } catch (err) {
      setError('Could not log in as guest.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-green-50 flex flex-col justify-center items-center p-4">
      {loading && <LoadingSpinner />}
      <div className="w-full max-w-sm mx-auto bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-green-700 flex items-center justify-center">{t('appName')} 🌱 <TTSButton text={t('appName')} /></h1>
          <p className="text-gray-500 mt-2 flex items-center justify-center">{t('loginTitle')} <TTSButton text={t('loginTitle')} /></p>
          <p className="text-gray-500 flex items-center justify-center">{t('loginSubtitle')} <TTSButton text={t('loginSubtitle')} /></p>
        </div>
        
        {!otpSent ? (
          <div className="space-y-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 flex items-center">{t('phoneLabel')} <TTSButton text={t('phoneLabel')} /></label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="9876543210"
              />
            </div>
            <button onClick={handleSendOtp} className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              {t('sendOtpButton')}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 flex items-center">{t('otpLabel')} <TTSButton text={t('otpLabel')} /></label>
              <input
                type="number"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="1234"
              />
            </div>
            <button onClick={handleLogin} className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              {t('loginButton')}
            </button>
          </div>
        )}

        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}

        <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">or</p>
            <button onClick={handleGuestLogin} className="mt-2 w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
                {t('guestLoginButton')}
            </button>
        </div>
      </div>
    </div>
  );
};


// --- APP LAYOUT & NAVIGATION ---
const Header: FC = () => {
    const { user } = useAuth();
    const { t, setLanguage, language, toggleTTS, isTTSEnabled } = useI18n();
    const { gameState } = useData();

    return (
        <header className="bg-white shadow-md p-3 flex justify-between items-center sticky top-0 z-30">
            <div className="flex items-center space-x-3">
                <img src={user?.avatar} alt={user?.name} className="w-10 h-10 rounded-full border-2 border-green-400" />
                <div>
                    <p className="font-bold text-gray-800 flex items-center">{user?.name} <TTSButton text={user?.name || ''}/></p>
                    <p className="text-sm text-gray-500 flex items-center">{t('level')} {gameState?.level} <TTSButton text={`${t('level')} ${gameState?.level}`}/></p>
                </div>
            </div>
             <div className="flex items-center space-x-2 bg-yellow-200 text-yellow-800 font-bold px-3 py-1 rounded-full">
                <span>💰</span>
                <span>{gameState?.wallet}</span>
                 <TTSButton text={`${t('wallet')} ${gameState?.wallet}`} />
            </div>
            <div className="flex items-center space-x-2">
                <button
                    onClick={toggleTTS}
                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-sm"
                    title={t('ttsToggleLabel')}
                >
                    {isTTSEnabled ? '🔊' : '🔇'}
                </button>
                <select value={language} onChange={(e) => setLanguage(e.target.value as Language)} className="border-gray-300 rounded-md">
                    <option value="en">English</option>
                    <option value="hi">हिंदी</option>
                    <option value="ta">தமிழ்</option>
                    <option value="te">తెలుగు</option>
                    <option value="bn">বাংলা</option>
                    <option value="mr">मराठी</option>
                    <option value="kn">ಕನ್ನಡ</option>
                </select>
            </div>
        </header>
    );
};

const Layout: FC = () => {
    const { t } = useI18n();
    const navItems = [
        { path: '/', label: t('navDashboard'), icon: '🏡' },
        { path: '/crops', label: t('navCrops'), icon: '🌾' },
        { path: '/learn', label: t('navLearn'), icon: '📚' },
        { path: '/marketplace', label: t('navMarketplace'), icon: '🏪' },
        { path: '/community', label: t('navCommunity'), icon: '🧑‍🤝‍🧑' },
        { path: '/leaderboard', label: t('navLeaderboard'), icon: '🏆' },
        { path: '/badges', label: t('navBadges'), icon: '🎖️' },
    ];
    const location = useLocation();

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <Header />
            <main className="p-4 pb-20">
                <Outlet />
            </main>
            <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-t-lg flex justify-around p-2 z-30">
                {navItems.map(item => (
                    <Link key={item.path} to={item.path} className={`flex flex-col items-center justify-center text-center w-16 ${location.pathname === item.path ? 'text-green-600' : 'text-gray-500'}`}>
                        <span className="text-2xl">{item.icon}</span>
                        <span className="text-xs mt-1">{item.label}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
};


// --- DASHBOARD SCREEN & COMPONENTS ---

const DailyTasks: FC = () => {
    const { dailyTasks, claimDailyTask } = useData();
    const { t } = useI18n();

    if (!dailyTasks) return null;

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-lg mb-2 flex items-center">{t('dailyTasksTitle')} <TTSButton text={t('dailyTasksTitle')}/></h2>
            <div className="space-y-2">
                {dailyTasks.map(task => (
                    <div key={task.id} className={`flex items-center justify-between p-2 rounded ${task.completed ? 'bg-gray-200 text-gray-500' : 'bg-green-100'}`}>
                        <div className="flex-grow">
                            <p className="flex items-center">{t(task.titleKey)} <TTSButton text={t(task.titleKey)}/></p>
                            <p className="text-sm text-green-700 flex items-center">+{task.xp} XP <TTSButton text={`+${task.xp} XP`}/></p>
                        </div>
                        <button
                            onClick={() => !task.completed && claimDailyTask(task.id)}
                            disabled={task.completed}
                            className="bg-green-500 text-white px-3 py-1 rounded-md disabled:bg-gray-400"
                        >
                            {task.completed ? '✅' : t('taskCompleteButton')}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ActiveQuestSummary: FC = () => {
    const { plantedCrop, crops } = useData();
    const { t } = useI18n();
    const navigate = useNavigate();

    if (!plantedCrop || !crops) {
        return null;
    }

    const crop = crops.find(c => c.id === plantedCrop.cropId);
    if (!crop) return null;

    const plantedDate = new Date(plantedCrop.plantedDate);
    const today = new Date();
    const dayOfQuest = Math.floor((today.getTime() - plantedDate.getTime()) / (1000 * 3600 * 24)) + 1;

    const todaysTask = crop.questTasks.find(task => task.day === dayOfQuest);

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-lg mb-2 flex items-center">{t('dashboardQuestTitle')}: {t(crop.nameKey)} {crop.icon} <TTSButton text={`${t('dashboardQuestTitle')}: ${t(crop.nameKey)}`}/></h2>
            {todaysTask ? (
                <div>
                    <h3 className="font-semibold flex items-center">{t('dashboardQuestToday', { day: dayOfQuest })} <TTSButton text={t('dashboardQuestToday', { day: dayOfQuest })}/></h3>
                    <p className="text-gray-700 flex items-center">{t(todaysTask.titleKey)} <TTSButton text={t(todaysTask.titleKey)}/></p>
                </div>
            ) : (
                <p className="text-gray-600 flex items-center">No task for today. Let your crop grow! <TTSButton text="No task for today. Let your crop grow!"/></p>
            )}
            <button onClick={() => navigate('/crops')} className="mt-4 bg-green-200 text-green-800 px-4 py-2 rounded-lg w-full text-center">
                {t('dashboardQuestView')}
            </button>
        </div>
    );
};

const StartQuestCard: FC = () => {
    const { crops, setPlantedCrop } = useData();
    const { t } = useI18n();
    const [selectedCropId, setSelectedCropId] = useState<string | null>(crops?.[0]?.id || null);

    const handlePlantCrop = () => {
        if (!selectedCropId) return;
        setPlantedCrop({
            cropId: selectedCropId,
            plantedDate: new Date().toISOString(),
            completedTasks: {},
        });
    };
    
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-lg mb-2 flex items-center">{t('dashboardStartQuestTitle')} <TTSButton text={t('dashboardStartQuestTitle')}/></h2>
            <div className="flex items-center space-x-2">
                <select 
                    value={selectedCropId || ''}
                    onChange={(e) => setSelectedCropId(e.target.value)}
                    className="flex-grow p-2 border border-gray-300 rounded-md"
                >
                    {crops?.map(crop => (
                        <option key={crop.id} value={crop.id}>
                            {crop.icon} {t(crop.nameKey)}
                        </option>
                    ))}
                </select>
                <button 
                    onClick={handlePlantCrop} 
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                    {t('plantButton')}
                </button>
            </div>
        </div>
    );
};

const UserStats: FC = () => {
    const { gameState } = useData();
    const { t } = useI18n();
    if (!gameState) return null;

    const xpProgress = (gameState.xp / gameState.xpToNextLevel) * 100;

    return (
        <div className="bg-white p-4 rounded-lg shadow text-center">
            <p className="text-sm text-gray-500 flex items-center justify-center">{t('dashboardCurrentLevel')} <TTSButton text={t('dashboardCurrentLevel')}/></p>
            <p className="text-3xl font-bold text-green-600">{t('dashboardLevelAbbr')} {gameState.level}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${xpProgress}%` }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1 flex items-center justify-center">{gameState.xp} / {gameState.xpToNextLevel} XP <TTSButton text={`${gameState.xp} of ${gameState.xpToNextLevel} XP`}/></p>
        </div>
    );
};

const StreakCard: FC = () => {
    const { gameState } = useData();
    const { t } = useI18n();
    if (!gameState) return null;

    return (
        <div className="bg-white p-4 rounded-lg shadow text-center">
            <p className="text-sm text-gray-500 flex items-center justify-center">{t('dashboardStreakTitle')} <TTSButton text={t('dashboardStreakTitle')}/></p>
            <p className="text-3xl font-bold text-orange-500">🔥 {gameState.streak}</p>
            <p className="text-xs text-gray-500 mt-1 flex items-center justify-center">Keep it going! <TTSButton text="Keep it going!"/></p>
        </div>
    );
};


const BadgesPreview: FC = () => {
    const { gameState, allBadges } = useData();
    const { t } = useI18n();
    const navigate = useNavigate();

    if (!gameState || !allBadges) return null;
    const earnedBadges = allBadges.filter(b => gameState.badges.includes(b.id)).slice(0, 4);

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
                <h2 className="font-bold text-lg flex items-center">{t('badgesTitle')} <TTSButton text={t('badgesTitle')}/></h2>
                <button onClick={() => navigate('/badges')} className="text-sm text-green-600">{t('viewAllBadges')}</button>
            </div>
            <div className="flex space-x-4">
                {earnedBadges.map(badge => (
                    <div key={badge.id} className="text-center">
                        <p className="text-3xl bg-gray-200 rounded-full p-2">{badge.icon}</p>
                        <p className="text-xs mt-1 flex items-center">{t(badge.nameKey)} <TTSButton text={t(badge.nameKey)}/></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CommunityPreview: FC = () => {
    const { t } = useI18n();
    const navigate = useNavigate();
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-lg flex items-center">{t('dashboardCommunityTitle')} <TTSButton text={t('dashboardCommunityTitle')}/></h2>
            <p className="text-gray-600 text-sm mb-4 flex items-center">{t('dashboardCommunityDesc')} <TTSButton text={t('dashboardCommunityDesc')}/></p>
            <div className="flex space-x-4">
                <button onClick={() => navigate('/community')} className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg">{t('dashboardCommunityViewFeed')}</button>
                <button onClick={() => navigate('/leaderboard')} className="flex-1 bg-purple-500 text-white px-4 py-2 rounded-lg">{t('dashboardCommunityViewLeaderboard')}</button>
            </div>
        </div>
    );
}

const MarketplacePreview: FC = () => {
    const { t } = useI18n();
    const navigate = useNavigate();
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-lg flex items-center">{t('dashboardMarketplaceTitle')} <TTSButton text={t('dashboardMarketplaceTitle')}/></h2>
            <p className="text-gray-600 text-sm mb-4 flex items-center">{t('dashboardMarketplaceDesc')} <TTSButton text={t('dashboardMarketplaceDesc')}/></p>
            <button onClick={() => navigate('/marketplace')} className="bg-yellow-500 text-white px-4 py-2 rounded-lg w-full">{t('dashboardMarketplaceButton')}</button>
        </div>
    );
}

const GuidesPreview: FC = () => {
    const { t } = useI18n();
    const navigate = useNavigate();
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-lg flex items-center">{t('dashboardGuidesTitle')} <TTSButton text={t('dashboardGuidesTitle')}/></h2>
            <p className="text-gray-600 text-sm mb-4 flex items-center">{t('dashboardGuidesDesc')} <TTSButton text={t('dashboardGuidesDesc')}/></p>
            <button onClick={() => navigate('/learn')} className="bg-teal-500 text-white px-4 py-2 rounded-lg w-full">{t('dashboardGuidesButton')}</button>
        </div>
    );
}

const FarmingTipsCard: FC = () => {
    const { t } = useI18n();
    const { farmingTips } = useData();
    const [openTip, setOpenTip] = useState<string | null>(null);

    if(!farmingTips) return null;

    const toggleTip = (tipId: string) => {
        setOpenTip(prev => (prev === tipId ? null : tipId));
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-lg mb-2 flex items-center">{t('dashboardTipsTitle')} <TTSButton text={t('dashboardTipsTitle')}/></h2>
            <div className="space-y-2">
                {farmingTips.map(tip => (
                    <div key={tip.id}>
                        <button onClick={() => toggleTip(tip.id)} className="w-full text-left font-semibold p-2 bg-red-100 text-red-800 rounded-md flex justify-between items-center">
                           <span className="flex items-center"> {t(tip.titleKey)} <TTSButton text={t(tip.titleKey)}/></span>
                           <span>{openTip === tip.id ? '▲' : '▼'}</span>
                        </button>
                        {openTip === tip.id && (
                            <div className="p-2 mt-1 border-l-4 border-red-200">
                                <p className="text-sm text-gray-600 mb-2 flex items-center">{t(tip.causeKey)} <TTSButton text={t(tip.causeKey)}/></p>
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                    {t(tip.tipsKey).split('|').map((tipText, index) => (
                                        <li key={index} className="flex items-center">{tipText} <TTSButton text={tipText}/></li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};


const DashboardScreen: FC = () => {
    const { loading, levelUpInfo, clearLevelUp, plantedCrop } = useData();
    const { t } = useI18n();

    if (loading) return <LoadingSpinner />;

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <UserStats />
                <StreakCard />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-4">
                    {plantedCrop ? <ActiveQuestSummary /> : <StartQuestCard />}
                    <DailyTasks />
                </div>
                <div className="space-y-4">
                    <GuidesPreview />
                    <FarmingTipsCard />
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MarketplacePreview />
              <BadgesPreview />
              <CommunityPreview />
            </div>

            <Modal isOpen={!!levelUpInfo} onClose={clearLevelUp}>
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-green-600">{t('levelUpTitle')}</h2>
                    <p className="text-5xl my-4">🎉</p>
                    <p className="text-gray-700 mb-4">{t('levelUpSubtitle', { level: levelUpInfo?.newLevel ?? '' })}</p>
                    <button onClick={clearLevelUp} className="bg-green-500 text-white px-6 py-2 rounded-lg">
                        {t('levelUpClose')}
                    </button>
                </div>
            </Modal>
        </div>
    );
};

// --- CROPS SCREEN ---
const CropsScreen: FC = () => {
    const { crops, plantedCrop, setPlantedCrop } = useData();
    const { t } = useI18n();
    const navigate = useNavigate();

    const handlePlantCrop = (cropId: string) => {
        setPlantedCrop({
            cropId,
            plantedDate: new Date().toISOString(),
            completedTasks: {},
        });
        navigate('/'); // Go back to dashboard
    };

    if (plantedCrop) {
        return <CropDetailScreen />;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 flex items-center">{t('cropsTitle')} <TTSButton text={t('cropsTitle')}/></h1>
            <div className="space-y-4">
                {crops?.map(crop => (
                    <div key={crop.id} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                        <div>
                            <p className="text-2xl flex items-center">{crop.icon} <span className="font-bold">{t(crop.nameKey)}</span> <TTSButton text={t(crop.nameKey)}/></p>
                            <p className="text-sm text-gray-600 flex items-center">{crop.growthDays} days | +{crop.harvestBonus} XP <TTSButton text={`${crop.growthDays} days, plus ${crop.harvestBonus} XP`}/></p>
                        </div>
                        <button onClick={() => handlePlantCrop(crop.id)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg">
                            {t('plantButton')}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CropDetailScreen: FC = () => {
    const { crops, plantedCrop, updateTaskCompletion, harvestCrop } = useData();
    const { t } = useI18n();
    const navigate = useNavigate();

    if (!plantedCrop) return <div>No crop planted. <Link to="/crops" className="text-blue-500">Plant one?</Link></div>;

    const crop = crops?.find(c => c.id === plantedCrop.cropId);
    if (!crop) return <div>Crop not found</div>;

    const plantedDate = new Date(plantedCrop.plantedDate);
    const today = new Date();
    const dayOfQuest = Math.floor((today.getTime() - plantedDate.getTime()) / (1000 * 3600 * 24)) + 1;
    
    const isReadyToHarvest = dayOfQuest >= crop.growthDays && plantedCrop.completedTasks[crop.questTasks[crop.questTasks.length - 1].day];

    const handleHarvest = () => {
        harvestCrop();
        navigate('/');
    };

    return (
        <div>
            <div className="text-center mb-4">
                <p className="text-6xl">{crop.icon}</p>
                <h1 className="text-3xl font-bold flex items-center justify-center">{t('cropQuestTitle', { cropName: t(crop.nameKey) })} <TTSButton text={t('cropQuestTitle', { cropName: t(crop.nameKey) })}/></h1>
                <p className="text-gray-600 flex items-center justify-center">{crop.growthDays} days to grow <TTSButton text={`${crop.growthDays} days to grow`}/></p>
                <p className="text-sm text-blue-600">Day {dayOfQuest} of {crop.growthDays}</p>
            </div>

            {isReadyToHarvest && (
                <div className="my-4">
                    <button onClick={handleHarvest} className="w-full bg-yellow-500 text-white font-bold py-3 px-4 rounded-lg text-lg animate-pulse">
                        {t('harvestButton')}! 🌻
                    </button>
                </div>
            )}

            <div className="space-y-2">
                {crop.questTasks.map(task => {
                    const isCompleted = plantedCrop?.completedTasks[task.day] || false;
                    const isLocked = dayOfQuest < task.day;
                    const isToday = dayOfQuest === task.day;

                    return (
                        <div key={task.day} className={`p-4 rounded-lg shadow ${isCompleted ? 'bg-green-200' : isLocked ? 'bg-gray-200' : 'bg-white'}`}>
                            <div className="flex justify-between items-start">
                                <div className="flex-grow">
                                    <h3 className={`font-bold ${isLocked ? 'text-gray-500' : ''} flex items-center`}>{t('cropQuestDay', { day: task.day })}: {t(task.titleKey)} <TTSButton text={`${t('cropQuestDay', { day: task.day })}: ${t(task.titleKey)}`}/></h3>
                                    <p className={`text-sm ${isLocked ? 'text-gray-400' : 'text-gray-600'} flex items-center`}>{t(task.descriptionKey)} <TTSButton text={t(task.descriptionKey)}/></p>
                                    <p className={`text-sm font-semibold ${isLocked ? 'text-gray-400' : 'text-green-700'} flex items-center`}>+{task.xp} XP <TTSButton text={`+${task.xp} XP`}/></p>
                                </div>
                                {!isLocked && !isCompleted && (
                                    <button
                                        onClick={() => updateTaskCompletion(task.day)}
                                        disabled={!isToday}
                                        className={`px-4 py-2 rounded-lg text-white font-semibold ${isToday ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}
                                    >
                                        {t('cropQuestComplete')}
                                    </button>
                                )}
                                {isCompleted && <span className="text-gray-600 text-2xl">✅</span>}
                                {isLocked && <span className="text-gray-400 text-2xl">🔒</span>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


// --- LEARN SCREEN ---
const LearnScreen: FC = () => {
    const { t } = useI18n();
    return (
        <div className="h-full">
            <Outlet />
        </div>
    );
};
const LearnLayout: FC = () => {
    const { t } = useI18n();
    const location = useLocation();
    
    const isGuides = location.pathname.startsWith('/learn/guides');
    const isQuizzes = location.pathname.startsWith('/learn/quizzes');

    return (
        <div>
             <div className="flex border-b-2 mb-4">
                <Link to="/learn/guides" className={`flex-1 text-center py-2 font-semibold ${isGuides ? 'border-b-4 border-green-500 text-green-600' : 'text-gray-500'}`}>
                    {t('learnTabGuides')}
                </Link>
                <Link to="/learn/quizzes" className={`flex-1 text-center py-2 font-semibold ${isQuizzes ? 'border-b-4 border-green-500 text-green-600' : 'text-gray-500'}`}>
                    {t('learnTabQuizzes')}
                </Link>
            </div>
            <Outlet />
        </div>
    );
};


const GuidesScreen: FC = () => {
    const { guides } = useData();
    const { t } = useI18n();
    const navigate = useNavigate();

    return (
         <div className="space-y-3">
            {guides?.map(guide => (
                <div key={guide.id} className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
                    <span className="text-4xl">{guide.icon}</span>
                    <div className="flex-1">
                        <h3 className="font-bold text-lg flex items-center">{t(guide.titleKey)} <TTSButton text={t(guide.titleKey)}/></h3>
                        <p className="text-sm text-gray-600 flex items-center">{t(guide.descriptionKey)} <TTSButton text={t(guide.descriptionKey)}/></p>
                    </div>
                     <button onClick={() => navigate(`/learn/guides/${guide.id}`)} className="bg-green-500 text-white p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            ))}
        </div>
    );
};

const QuizScreen: FC = () => {
    const { quiz } = useData();
    const { t } = useI18n();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    if (!quiz) return <LoadingSpinner />;

    const currentQuestion = quiz[currentQuestionIndex];
    
    const handleAnswer = (optionIndex: number) => {
        if (selectedOption !== null) return;
        setSelectedOption(optionIndex);
        if (optionIndex === currentQuestion.correctOptionIndex) {
            setScore(s => s + 1);
        }

        setTimeout(() => {
            if (currentQuestionIndex < quiz.length - 1) {
                setCurrentQuestionIndex(i => i + 1);
                setSelectedOption(null);
            } else {
                setQuizFinished(true);
            }
        }, 1000);
    };

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setQuizFinished(false);
        setSelectedOption(null);
    };

    if (quizFinished) {
        const xpGained = score * 10;
        return (
            <div className="text-center bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-2 flex items-center justify-center">{t('quizTitle')} <TTSButton text={t('quizTitle')}/></h2>
                <p className="text-lg mb-2 flex items-center justify-center">{t('quizScore', { score, total: quiz.length })} <TTSButton text={t('quizScore', { score, total: quiz.length })}/></p>
                <p className="text-lg text-green-600 font-bold mb-4 flex items-center justify-center">{t('quizXP', { xp: xpGained })} <TTSButton text={t('quizXP', { xp: xpGained })}/></p>
                <button onClick={resetQuiz} className="bg-green-500 text-white px-6 py-2 rounded-lg">
                    Play Again
                </button>
            </div>
        );
    }

    return (
         <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2 flex items-center justify-center">{t('quizTitle')} <TTSButton text={t('quizTitle')}/></h2>
            <p className="text-gray-500 mb-4">Question {currentQuestionIndex + 1} of {quiz.length}</p>
            <p className="text-lg mb-4 flex items-center">{t(currentQuestion.questionKey)} <TTSButton text={t(currentQuestion.questionKey)}/></p>
            <div className="space-y-2">
                {t(currentQuestion.optionsKey.join(',')).split(',').map((option, index) => {
                    const isCorrect = index === currentQuestion.correctOptionIndex;
                    const isSelected = selectedOption === index;
                    let buttonClass = 'w-full text-left p-3 rounded-lg border-2 flex items-center justify-between ';
                    if (isSelected) {
                         buttonClass += isCorrect ? 'bg-green-200 border-green-500' : 'bg-red-200 border-red-500';
                    } else {
                        buttonClass += 'bg-gray-100 border-gray-300 hover:bg-gray-200';
                    }

                    return (
                        <button key={index} onClick={() => handleAnswer(index)} disabled={selectedOption !== null} className={buttonClass}>
                            {option}
                            <TTSButton text={option}/>
                        </button>
                    )
                })}
            </div>
        </div>
    )
};


// --- GUIDE DETAIL SCREEN ---
const GuideDetailScreen: FC = () => {
    const { guideId } = useParams<{ guideId: string }>();
    const { guides, gameState, completeGuideTask } = useData();
    const { t } = useI18n();
    const navigate = useNavigate();

    const guide = guides?.find(g => g.id === guideId);

    if (!guide) return <div>Guide not found</div>;

    return (
        <div>
            <button onClick={() => navigate('/learn/guides')} className="text-green-600 mb-4">&larr; {t('backToGuides')}</button>
            <div className="text-center mb-4">
                <p className="text-6xl">{guide.icon}</p>
                <h1 className="text-3xl font-bold flex items-center justify-center">{t(guide.titleKey)} <TTSButton text={t(guide.titleKey)}/></h1>
                <p className="text-gray-600 max-w-xl mx-auto flex items-center">{t(guide.descriptionKey)} <TTSButton text={t(guide.descriptionKey)}/></p>
            </div>
            <div className="space-y-2">
                {guide.tasks.map(task => {
                    const isCompleted = gameState?.completedGuideTasks.includes(task.id) || false;
                    return (
                        <div key={task.id} className={`p-4 rounded-lg shadow ${isCompleted ? 'bg-green-200' : 'bg-white'}`}>
                            <div className="flex justify-between items-center">
                                <div className="flex-grow">
                                    <h3 className={`font-bold ${isCompleted ? 'line-through text-gray-600': ''} flex items-center`}>{t(task.titleKey)} <TTSButton text={t(task.titleKey)}/></h3>
                                    <p className="text-sm text-green-700 flex items-center">+{task.xp} XP <TTSButton text={`+${task.xp} XP`}/></p>
                                </div>
                                 <button
                                    onClick={() => !isCompleted && completeGuideTask(task.id)}
                                    disabled={isCompleted}
                                    className="bg-green-500 text-white px-3 py-1 rounded-md disabled:bg-gray-400"
                                >
                                    {isCompleted ? '✅' : t('taskCompleteButton')}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// --- COMMUNITY SCREEN ---
const CommunityScreen: FC = () => {
    const { communityPosts } = useData();
    const { t } = useI18n();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 flex items-center">{t('communityTitle')} <TTSButton text={t('communityTitle')}/></h1>
            <div className="bg-white p-4 rounded-lg shadow mb-4">
                <textarea className="w-full border rounded-md p-2" placeholder={t('postPlaceholder')}></textarea>
                <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg">{t('postButton')}</button>
            </div>
            <div className="space-y-4">
                {communityPosts?.map(post => (
                    <div key={post.id} className="bg-white p-4 rounded-lg shadow">
                        <div className="flex items-center mb-2">
                            <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full mr-3" />
                            <div>
                                <p className="font-bold flex items-center">{post.author} <TTSButton text={post.author}/></p>
                                <p className="text-sm text-gray-500 flex items-center">{post.timestamp} <TTSButton text={post.timestamp}/></p>
                            </div>
                        </div>
                        <p className="flex items-center">{t(post.contentKey)} <TTSButton text={t(post.contentKey)}/></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- LEADERBOARD SCREEN ---
const LeaderboardScreen: FC = () => {
    const { leaderboard } = useData();
    const { t } = useI18n();
    const { user } = useAuth();
    const [filterState, setFilterState] = useState('All');
    const [filterDistrict, setFilterDistrict] = useState('All');

    const states = useMemo(() => ['All', ...new Set(leaderboard?.map(u => u.state))], [leaderboard]);
    const districts = useMemo(() => ['All', ...new Set(leaderboard?.filter(u => filterState === 'All' || u.state === filterState).map(u => u.district))], [leaderboard, filterState]);

    const filteredLeaderboard = useMemo(() => {
        return leaderboard?.filter(u => 
            (filterState === 'All' || u.state === filterState) &&
            (filterDistrict === 'All' || u.district === filterDistrict)
        );
    }, [leaderboard, filterState, filterDistrict]);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 flex items-center">{t('leaderboardTitle')} <TTSButton text={t('leaderboardTitle')}/></h1>
            {/* Filters */}
            <div className="bg-white p-3 rounded-lg shadow mb-4 flex space-x-4">
                <div>
                    <label className="text-sm text-gray-600 flex items-center">{t('filterState')} <TTSButton text={t('filterState')}/></label>
                    <select value={filterState} onChange={e => { setFilterState(e.target.value); setFilterDistrict('All'); }} className="w-full border-gray-300 rounded-md">
                        {states.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div>
                    <label className="text-sm text-gray-600 flex items-center">{t('filterDistrict')} <TTSButton text={t('filterDistrict')}/></label>
                     <select value={filterDistrict} onChange={e => setFilterDistrict(e.target.value)} className="w-full border-gray-300 rounded-md">
                        {districts.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600 flex items-center">{t('leaderboardRank')} <TTSButton text={t('leaderboardRank')}/></th>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600 flex items-center">{t('leaderboardPlayer')} <TTSButton text={t('leaderboardPlayer')}/></th>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600 flex items-center">{t('leaderboardLevel')} <TTSButton text={t('leaderboardLevel')}/></th>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600 flex items-center">{t('leaderboardXP')} <TTSButton text={t('leaderboardXP')}/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLeaderboard?.map(player => (
                            <tr key={player.rank} className={`border-t ${player.name === user?.name ? 'bg-green-100' : ''}`}>
                                <td className="p-3 font-bold">{player.rank}</td>
                                <td className="p-3 flex items-center">
                                    <img src={player.avatar} alt={player.name} className="w-8 h-8 rounded-full mr-3" />
                                    {player.name}
                                    <TTSButton text={player.name}/>
                                </td>
                                <td className="p-3">{player.level}</td>
                                <td className="p-3 text-gray-600">{player.xp.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- BADGES SCREEN ---
const BadgesScreen: FC = () => {
    const { gameState, allBadges } = useData();
    const { t } = useI18n();

    if (!gameState || !allBadges) return <LoadingSpinner />;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 flex items-center">{t('badgeCollectionTitle')} <TTSButton text={t('badgeCollectionTitle')}/></h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {allBadges.map(badge => {
                    const earned = gameState.badges.includes(badge.id);
                    return (
                        <div key={badge.id} className={`p-4 rounded-lg shadow text-center ${earned ? 'bg-white' : 'bg-gray-200 opacity-60'}`}>
                            <p className="text-5xl bg-gray-100 rounded-full p-3 inline-block">{badge.icon}</p>
                            <h2 className="font-bold mt-2 flex items-center justify-center">{t(badge.nameKey)} <TTSButton text={t(badge.nameKey)}/></h2>
                            <p className="text-sm text-gray-600 flex items-center justify-center">{t(badge.descriptionKey)} <TTSButton text={t(badge.descriptionKey)}/></p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// --- MARKETPLACE SCREEN ---
const MarketplaceScreen: FC = () => {
    const { marketplaceListings, gameState, buyFromMarket, sellToMarket } = useData();
    const { t } = useI18n();
    const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
    const [categoryFilter, setCategoryFilter] = useState<'All' | 'Crops' | 'Tools' | 'Services'>('All');
    
    // Sell tab state
    const [selectedItem, setSelectedItem] = useState<typeof gameState.inventory[0] | null>(null);
    const [sellQuantity, setSellQuantity] = useState(1);
    const [sellPrice, setSellPrice] = useState(10);


    const filteredListings = marketplaceListings?.filter(l => categoryFilter === 'All' || l.category === categoryFilter);

    const handleBuy = (listingId: string) => {
        buyFromMarket(listingId);
    };

    const handleSelectItem = (item: typeof gameState.inventory[0]) => {
        setSelectedItem(item);
        setSellQuantity(1); // Reset quantity on new selection
    }

    const handleSell = () => {
        if (!selectedItem || !gameState) return;
        if (sellQuantity > selectedItem.quantity) {
            alert(t('notEnoughStock'));
            return;
        }
        sellToMarket(selectedItem.itemId, sellQuantity, sellPrice);
        setSelectedItem(null); // Reset form
        alert(t('sellSuccess'));
    };


    const BuyContent = () => (
        <>
        <div className="flex space-x-2 mb-4 overflow-x-auto">
            {(['All', 'Crops', 'Tools', 'Services'] as const).map(cat => (
                <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${categoryFilter === cat ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    {t(`marketplaceCategory${cat}`)}
                </button>
            ))}
        </div>
        <div className="space-y-3">
            {filteredListings?.map(listing => (
                 <div key={listing.id} className="bg-white p-3 rounded-lg shadow flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="text-3xl mr-3">{listing.itemIcon}</span>
                        <div>
                            <p className="font-bold flex items-center">{t(listing.itemNameKey)} <TTSButton text={t(listing.itemNameKey)}/></p>
                            <p className="text-xs text-gray-500 flex items-center">{t('marketplaceSeller')}: {listing.sellerName} <TTSButton text={`${t('marketplaceSeller')}: ${listing.sellerName}`}/></p>
                             <p className="text-xs text-gray-500 flex items-center">{t('marketplaceQuantity')}: {listing.quantity} <TTSButton text={`${t('marketplaceQuantity')}: ${listing.quantity}`}/></p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-green-600 flex items-center">₹{listing.price} <TTSButton text={`${listing.price} Rupees`}/></p>
                         <button onClick={() => handleBuy(listing.id)} className="mt-1 bg-green-500 text-white text-sm px-3 py-1 rounded-md">{t('marketplaceBuyButton')}</button>
                    </div>
                 </div>
            ))}
        </div>
        </>
    );

    const SellContent = () => (
        <div>
            {/* Sell Form */}
            <div className="bg-white p-4 rounded-lg shadow mb-4">
                <h2 className="text-lg font-bold mb-2 flex items-center">{t('marketplaceSellTitle')} <TTSButton text={t('marketplaceSellTitle')}/></h2>
                {selectedItem ? (
                    <div className="space-y-3">
                        <p>{t('marketplaceSellSelected')}: <span className="font-bold">{t(selectedItem.nameKey)} ({selectedItem.quantity} in stock)</span></p>
                        <div>
                            <label className="block text-sm font-medium">{t('marketplaceSellQuantityLabel')}</label>
                            <input
                                type="number"
                                value={sellQuantity}
                                onChange={e => setSellQuantity(Math.max(1, Math.min(selectedItem.quantity, parseInt(e.target.value) || 1)))}
                                className="w-full border-gray-300 rounded-md"
                                max={selectedItem.quantity}
                                min="1"
                            />
                        </div>
                         <div>
                            <label className="block text-sm font-medium">{t('marketplaceSellPriceLabel')}</label>
                            <input
                                type="number"
                                value={sellPrice}
                                onChange={e => setSellPrice(parseInt(e.target.value) || 0)}
                                className="w-full border-gray-300 rounded-md"
                                min="1"
                            />
                        </div>
                        <p className="text-sm">{t('marketplaceSellEarnings')}: <span className="font-bold text-green-600">₹{sellPrice * sellQuantity}</span></p>
                        <button onClick={handleSell} className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg">{t('marketplaceSellButton')}</button>
                        <button onClick={() => setSelectedItem(null)} className="w-full text-center text-sm text-gray-600 mt-2">Cancel</button>

                    </div>
                ) : (
                    <p className="text-gray-600 flex items-center">{t('marketplaceSellInstruction')} <TTSButton text={t('marketplaceSellInstruction')}/></p>
                )}
            </div>
            
            {/* Inventory */}
            <h3 className="font-bold mb-2 flex items-center">{t('marketplaceSellYourInventory')} <TTSButton text={t('marketplaceSellYourInventory')}/></h3>
            <div className="space-y-2">
            {gameState?.inventory && gameState.inventory.length > 0 ? (
                gameState.inventory.map(item => (
                    <button key={item.itemId} onClick={() => handleSelectItem(item)} className="w-full text-left bg-white p-3 rounded-lg shadow flex justify-between items-center">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">{item.icon}</span>
                            <span className="font-semibold">{t(item.nameKey)}</span>
                        </div>
                        <span className="text-gray-600">x{item.quantity}</span>
                    </button>
                ))
            ) : (
                <p className="text-gray-500 flex items-center">{t('marketplaceSellNoItems')} <TTSButton text={t('marketplaceSellNoItems')}/></p>
            )}
            </div>
        </div>
    );

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 flex items-center">{t('marketplaceTitle')} <TTSButton text={t('marketplaceTitle')}/></h1>
             <div className="flex border-b-2 mb-4">
                <button
                    onClick={() => setActiveTab('buy')}
                    className={`flex-1 py-2 font-semibold ${activeTab === 'buy' ? 'border-b-4 border-green-500 text-green-600' : 'text-gray-500'}`}
                >
                    {t('marketplaceTabBuy')}
                </button>
                <button
                    onClick={() => setActiveTab('sell')}
                    className={`flex-1 py-2 font-semibold ${activeTab === 'sell' ? 'border-b-4 border-green-500 text-green-600' : 'text-gray-500'}`}
                >
                     {t('marketplaceTabSell')}
                </button>
            </div>
            {activeTab === 'buy' ? <BuyContent /> : <SellContent />}
        </div>
    );
};


// --- MAIN APP COMPONENT ---
const App: FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <LoginPage />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardScreen />} />
        <Route path="crops" element={<CropsScreen />} />
        <Route path="learn" element={<LearnLayout />}>
            <Route index element={<Navigate to="guides" />} />
            <Route path="guides" element={<GuidesScreen />} />
            <Route path="guides/:guideId" element={<GuideDetailScreen />} />
            <Route path="quizzes" element={<QuizScreen />} />
        </Route>
        <Route path="community" element={<CommunityScreen />} />
        <Route path="leaderboard" element={<LeaderboardScreen />} />
        <Route path="badges" element={<BadgesScreen />} />
        <Route path="marketplace" element={<MarketplaceScreen />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};
export const Root: FC = () => {
  return (
    <AuthProvider>
      <I18nProvider>
        <DataProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </DataProvider>
      </I18nProvider>
    </AuthProvider>
  );
};

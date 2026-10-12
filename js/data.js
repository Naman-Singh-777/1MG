/* DAWAA catalogue. Prices are illustrative demo values (INR). Descriptions are original, written per therapeutic class. */
(function () {
  // key: [Label, parent category, concern slug, uses[], sideEffects[], howItWorks, safetyTips[]]
  const CL = {
    para: ['Non Narcotics And Anti Pyretics', 'Pain Analgesics', 'pain', ['Pain relief', 'Treatment of fever'], ['Nausea', 'Stomach pain', 'Rash (rare)'], 'blocks the chemical messengers in the brain that cause pain and fever', ['Do not exceed the recommended daily dose', 'Avoid alcohol while taking this medicine', 'Check other medicines for paracetamol to avoid double dosing']],
    nsaid: ['NSAIDs', 'Pain Analgesics', 'bone', ['Pain relief', 'Reducing inflammation', 'Arthritis symptoms'], ['Acidity', 'Heartburn', 'Dizziness', 'Headache'], 'reduces the production of prostaglandins that cause pain, swelling and inflammation', ['Take with food or milk', 'Avoid in stomach ulcers and kidney disease unless advised', 'Use the lowest dose for the shortest time']],
    abx: ['Anti Infectives', 'Anti Infectives', 'infection', ['Treatment of bacterial infections'], ['Nausea', 'Diarrhoea', 'Stomach upset', 'Allergic reaction (rare)'], 'stops bacteria from growing or kills them so your body can clear the infection', ['Complete the full course even if you feel better', 'Take at evenly spaced intervals', 'Antibiotics do not work against viral infections']],
    ppi: ['Proton Pump Inhibitors', 'Gastrointestinal', 'stomach', ['Acidity and heartburn', 'GERD (acid reflux)', 'Stomach ulcers'], ['Headache', 'Stomach pain', 'Gas', 'Nausea'], 'reduces the amount of acid produced by the stomach lining', ['Take on an empty stomach, 30 minutes before a meal', 'Long-term use needs medical review', 'Avoid spicy and oily food']],
    antacid: ['Antacids & Digestives', 'Gastrointestinal', 'stomach', ['Indigestion', 'Bloating and gas', 'Acidity'], ['Constipation', 'Loose motion (with magnesium salts)'], 'neutralises or aids digestion to relieve acidity, gas and bloating', ['Take after meals as directed', 'Do not use for more than two weeks without advice']],
    gi: ['Laxatives & Rehydration', 'Gastrointestinal', 'stomach', ['Constipation relief', 'Dehydration due to loose motions'], ['Stomach cramps', 'Gas'], 'softens stools or replaces fluids and salts lost from the body', ['Drink plenty of water', 'Seek advice if symptoms last more than 3 days']],
    dm: ['Anti Diabetic', 'Diabetes Care', 'diabetes', ['Type 2 diabetes mellitus'], ['Low blood sugar', 'Nausea', 'Diarrhoea', 'Weight changes'], 'helps the body control blood sugar by improving insulin action or release', ['Monitor your blood sugar regularly', 'Do not skip meals', 'Carry a quick sugar source in case of low sugar']],
    htn: ['Anti Hypertensive', 'Heart Care', 'heart', ['High blood pressure', 'Heart failure (some medicines)'], ['Dizziness', 'Dry cough', 'Swelling in feet', 'Tiredness'], 'relaxes blood vessels or slows the heart so that blood pressure comes down', ['Take at the same time every day', 'Do not stop suddenly', 'Rise slowly from lying or sitting']],
    lipid: ['Lipid Lowering', 'Heart Care', 'heart', ['High cholesterol', 'Reducing risk of heart disease'], ['Muscle pain', 'Headache', 'Stomach upset'], 'reduces the production of cholesterol in the liver', ['Take in the evening unless advised', 'Report unexplained muscle pain', 'Combine with a healthy diet and exercise']],
    cardiac: ['Cardiac Care', 'Heart Care', 'heart', ['Prevention of blood clots', 'Angina', 'Heart rhythm control'], ['Bleeding or easy bruising', 'Stomach upset', 'Dizziness'], 'keeps the blood flowing smoothly and eases the workload on the heart', ['Tell your doctor before any surgery or dental work', 'Do not stop without medical advice']],
    allergy: ['Anti Allergic', 'Respiratory Care', 'respiratory', ['Allergic rhinitis', 'Itching and hives', 'Sneezing and runny nose'], ['Drowsiness', 'Dry mouth', 'Tiredness'], 'blocks histamine, the chemical responsible for allergy symptoms', ['May cause drowsiness; avoid driving', 'Avoid alcohol']],
    cough: ['Cough & Cold', 'Respiratory Care', 'respiratory', ['Dry or wet cough', 'Common cold', 'Sore throat'], ['Drowsiness', 'Dry mouth', 'Nausea'], 'soothes the throat, thins mucus and eases cough and congestion', ['Drink warm fluids', 'See a doctor if cough lasts more than a week']],
    asthma: ['Respiratory Care', 'Respiratory Care', 'respiratory', ['Asthma', 'COPD', 'Wheezing and breathlessness'], ['Tremors', 'Palpitations', 'Throat irritation'], 'opens up the airways and reduces swelling inside the lungs', ['Rinse your mouth after using inhalers', 'Learn the correct inhaler technique', 'Keep a reliever inhaler handy']],
    vit: ['Vitamins & Minerals', 'Vitamins & Nutrition', 'vitamins', ['Vitamin or mineral deficiency', 'General wellness and immunity'], ['Nausea', 'Constipation', 'Metallic taste'], 'replenishes essential vitamins and minerals your body needs', ['Take after food', 'Do not exceed the recommended dose']],
    thy: ['Thyroid Care', 'Hormones', 'hormones', ['Hypothyroidism', 'Hyperthyroidism (anti-thyroid medicines)'], ['Palpitations', 'Sweating', 'Weight changes'], 'replaces or regulates thyroid hormone levels in the body', ['Take on an empty stomach in the morning', 'Keep a gap of 30–60 minutes before food', 'Get thyroid levels tested regularly']],
    neuro: ['Neuro & Mental Health', 'Neurology', 'neuro', ['Depression', 'Anxiety', 'Sleep problems'], ['Drowsiness', 'Dizziness', 'Dry mouth', 'Weight changes'], 'balances brain chemicals that affect mood, anxiety and sleep', ['Never stop suddenly', 'Avoid alcohol', 'Can cause drowsiness; take care while driving']],
    epi: ['Anti Epileptic', 'Neurology', 'neuro', ['Epilepsy and seizures', 'Nerve pain'], ['Sleepiness', 'Dizziness', 'Unsteadiness'], 'calms excess electrical activity in the brain and nerves', ['Take regularly at fixed times', 'Never stop abruptly']],
    derm: ['Dermatology', 'Skin Care', 'derma', ['Fungal skin infections', 'Itching, rashes and eczema', 'Acne and pimples'], ['Mild burning', 'Redness', 'Dryness at application site'], 'treats the cause of the skin condition and relieves itching and inflammation', ['For external use only', 'Do not apply on broken skin unless advised', 'Wash hands after use']],
    eye: ['Eye Care', 'Eye Care', 'eye', ['Dry eyes', 'Eye infection', 'Eye irritation'], ['Temporary blurring', 'Mild stinging'], 'lubricates or treats the surface of the eye', ['Do not touch the dropper tip to the eye', 'Discard 28 days after opening']],
    liver: ['Liver Care', 'Liver Care', 'liver', ['Fatty liver', 'Liver function support', 'Gallstone dissolution'], ['Nausea', 'Loose motion', 'Mild itching'], 'supports liver cells and bile flow', ['Avoid alcohol', 'Follow a low-fat diet']],
    kidney: ['Kidney Care', 'Kidney Care', 'kidney', ['Kidney stones', 'Urinary tract discomfort', 'Chronic kidney disease support'], ['Nausea', 'Stomach upset'], 'helps the kidneys and urinary tract work better', ['Drink plenty of water unless restricted', 'Follow your nephrologist\'s diet advice']],
    bone: ['Bone, Joint & Muscle Care', 'Bone, Joint & Muscle Care', 'bone', ['Bone and joint health', 'Calcium deficiency', 'Muscle spasm and pain'], ['Constipation', 'Stomach upset', 'Gas'], 'supports strong bones, joints and muscles', ['Take with food', 'Combine with sunlight and light exercise']],
    women: ['Women\'s Health', 'Women\'s Care', 'women', ['Iron deficiency and anaemia', 'Pregnancy supplementation', 'Contraception and cycle regulation'], ['Nausea', 'Constipation', 'Dark stools (iron)'], 'supplies nutrients or regulates hormones as part of women\'s healthcare', ['Take as advised by your gynaecologist', 'Iron works best with vitamin C']],
    ayur: ['Ayurveda', 'Ayurveda Products', 'ayurveda', ['Immunity support', 'Digestive wellness', 'Stress and general wellness'], ['Rarely, mild stomach upset'], 'uses traditional herbs and formulations to support the body\'s natural balance', ['Use as directed on the pack', 'Consult a practitioner if pregnant or on other medicines']],
    homeo: ['Homeopathy', 'Homeopathy', 'homeopathy', ['Cough and cold', 'Skin and hair concerns', 'General ailments'], ['Generally well tolerated'], 'is a homeopathic preparation intended to stimulate the body\'s own healing response', ['Take 15–30 minutes away from food or drink', 'Store away from strong smells']],
    pc: ['Personal Care', 'Personal Care', 'personal', ['Everyday hygiene and skin care'], ['Skin irritation if allergic'], 'is an everyday personal care product', ['Do a patch test first', 'Keep away from eyes']],
    dev: ['Health Devices', 'Devices', 'devices', ['Home health monitoring'], [], 'is a home health device for regular monitoring and care', ['Read the manual before first use', 'Calibrate or replace batteries as advised']]
  };

  // name|composition|form|pack|marketer|class|mrp|rx(1)
  const SEED = `
Dolo 650 Tablet|Paracetamol (650mg)|Tablet|strip of 15 tablets|Micro Labs Ltd|para|32.28
Dolo 500 Tablet|Paracetamol (500mg)|Tablet|strip of 15 tablets|Micro Labs Ltd|para|15.18
Crocin Advance 500mg Tablet|Paracetamol (500mg)|Tablet|strip of 15 tablets|GlaxoSmithKline|para|20
Calpol 500mg Tablet|Paracetamol (500mg)|Tablet|strip of 15 tablets|GlaxoSmithKline|para|15.5
Calpol 250 Suspension Strawberry|Paracetamol (250mg/5ml)|Suspension|bottle of 60 ml|GlaxoSmithKline|para|34
Pacimol 650mg Tablet|Paracetamol (650mg)|Tablet|strip of 15 tablets|Ipca Laboratories|para|29
Sumo Tablet|Paracetamol (100mg) + Nimesulide (100mg)|Tablet|strip of 10 tablets|Alkem Laboratories|para|55
Combiflam Tablet|Ibuprofen (400mg) + Paracetamol (325mg)|Tablet|strip of 20 tablets|Sanofi India Ltd|nsaid|43.2
Brufen 400mg Tablet|Ibuprofen (400mg)|Tablet|strip of 15 tablets|Abbott|nsaid|34
Ibugesic Plus Suspension|Ibuprofen (100mg/5ml) + Paracetamol (162.5mg/5ml)|Suspension|bottle of 60 ml|Cipla Ltd|nsaid|52
Voveran 50mg Tablet|Diclofenac (50mg)|Tablet|strip of 10 tablets|Novartis India Ltd|nsaid|42
Voveran Emulgel|Diclofenac (1.16% w/w)|Gel|tube of 30 gm|Novartis India Ltd|nsaid|116
Volini Pain Relief Gel|Diclofenac + Methyl Salicylate + Menthol|Gel|tube of 30 gm|Sun Pharmaceutical Industries Ltd|nsaid|110
Volini Spray|Diclofenac + Menthol + Methyl Salicylate|Spray|bottle of 35 gm|Sun Pharmaceutical Industries Ltd|nsaid|160
Moov Pain Relief Ointment|Menthol + Camphor + Eucalyptus Oil|Ointment|tube of 50 gm|Reckitt Benckiser|nsaid|135
Omnigel Gel|Diclofenac + Linseed Oil + Menthol + Methyl Salicylate|Gel|tube of 30 gm|Cipla Ltd|nsaid|110
Zerodol-P Tablet|Aceclofenac (100mg) + Paracetamol (325mg)|Tablet|strip of 10 tablets|Ipca Laboratories|nsaid|110
Zerodol-SP Tablet|Aceclofenac (100mg) + Paracetamol (325mg) + Serratiopeptidase (15mg)|Tablet|strip of 10 tablets|Ipca Laboratories|nsaid|152
Hifenac-P Tablet|Aceclofenac (100mg) + Paracetamol (325mg)|Tablet|strip of 10 tablets|Intas Pharmaceuticals Ltd|nsaid|99
Etoshine 90mg Tablet|Etoricoxib (90mg)|Tablet|strip of 10 tablets|Zydus Cadila|nsaid|118|1
Arcoxia 90mg Tablet|Etoricoxib (90mg)|Tablet|strip of 10 tablets|Organon|nsaid|190|1
Naproxyn 250mg Tablet|Naproxen (250mg)|Tablet|strip of 10 tablets|Ranbaxy|nsaid|62|1
Ultracet Tablet|Tramadol (37.5mg) + Paracetamol (325mg)|Tablet|strip of 10 tablets|Janssen|nsaid|147|1
Myospaz Forte Tablet|Aceclofenac + Paracetamol + Chlorzoxazone|Tablet|strip of 10 tablets|Systopic Laboratories|nsaid|105
Thiocolchicoside 4mg Tablet (Myoril)|Thiocolchicoside (4mg)|Tablet|strip of 10 tablets|Sanofi India Ltd|nsaid|110|1
Azithral 500 Tablet|Azithromycin (500mg)|Tablet|strip of 5 tablets|Alembic Pharmaceuticals Ltd|abx|120|1
Azee 500 Tablet|Azithromycin (500mg)|Tablet|strip of 5 tablets|Cipla Ltd|abx|122|1
Augmentin 625 Duo Tablet|Amoxycillin (500mg) + Clavulanic Acid (125mg)|Tablet|strip of 10 tablets|GlaxoSmithKline|abx|203|1
Mox 500 Capsule|Amoxycillin (500mg)|Capsule|strip of 10 capsules|Ranbaxy|abx|105|1
Ciplox 500 Tablet|Ciprofloxacin (500mg)|Tablet|strip of 10 tablets|Cipla Ltd|abx|75|1
Cifran 500 Tablet|Ciprofloxacin (500mg)|Tablet|strip of 10 tablets|Sun Pharmaceutical Industries Ltd|abx|78|1
Taxim-O 200 Tablet|Cefixime (200mg)|Tablet|strip of 10 tablets|Alkem Laboratories|abx|113|1
Zifi 200 Tablet|Cefixime (200mg)|Tablet|strip of 10 tablets|FDC Ltd|abx|105|1
Doxy-1 Forte Capsule|Doxycycline (100mg) + Lactic Acid Bacillus|Capsule|strip of 10 capsules|Cipla Ltd|abx|89|1
Metrogyl 400 Tablet|Metronidazole (400mg)|Tablet|strip of 15 tablets|J.B. Chemicals|abx|27|1
Oflox 200 Tablet|Ofloxacin (200mg)|Tablet|strip of 10 tablets|Cipla Ltd|abx|90|1
Norflox 400 Tablet|Norfloxacin (400mg)|Tablet|strip of 10 tablets|Cipla Ltd|abx|58|1
Taxim 500 Injection|Cefotaxime (500mg)|Injection|vial of 1 injection|Alkem Laboratories|abx|52|1
Pantop 40 Tablet|Pantoprazole (40mg)|Tablet|strip of 15 tablets|Aristo Pharmaceuticals|ppi|160
Pan 40 Tablet|Pantoprazole (40mg)|Tablet|strip of 15 tablets|Alkem Laboratories|ppi|165
Pan-D Capsule SR|Pantoprazole (40mg) + Domperidone (30mg)|Capsule|strip of 15 capsules|Alkem Laboratories|ppi|200
Omez 20 Capsule|Omeprazole (20mg)|Capsule|strip of 15 capsules|Dr. Reddy's Laboratories|ppi|66
Nexpro RD Capsule|Esomeprazole (40mg) + Domperidone (30mg)|Capsule|strip of 10 capsules|Torrent Pharmaceuticals Ltd|ppi|180
Razo-D Capsule|Rabeprazole (20mg) + Domperidone (30mg)|Capsule|strip of 10 capsules|Dr. Reddy's Laboratories|ppi|140
Rablet 20 Tablet|Rabeprazole (20mg)|Tablet|strip of 15 tablets|Lupin Ltd|ppi|123
Ranitidine 150 Tablet (Aciloc)|Ranitidine (150mg)|Tablet|strip of 30 tablets|Cadila Healthcare Ltd|ppi|47
Digene Acidity & Gas Relief Tablet Orange|Magnesium Hydroxide + Dried Aluminium Hydroxide + Simethicone|Tablet|strip of 15 tablets|Abbott|antacid|28
Gelusil MPS Liquid|Aluminium Hydroxide + Magnesium Hydroxide + Simethicone|Liquid|bottle of 200 ml|Pfizer Ltd|antacid|105
Eno Fruit Salt Lemon|Sodium Bicarbonate + Citric Acid|Powder|sachet pack of 6 sachets|GlaxoSmithKline|antacid|36
Eno Fruit Salt Regular|Sodium Bicarbonate + Citric Acid|Powder|bottle of 100 gm|GlaxoSmithKline|antacid|92
Pudin Hara Pearls|Pudina Satva|Capsule|bottle of 10 capsules|Dabur India Ltd|antacid|35
Unienzyme Tablet|Fungal Diastase + Papain + Simethicone|Tablet|strip of 15 tablets|Wockhardt Ltd|antacid|68
Cyclopam Tablet|Dicyclomine (20mg) + Paracetamol (500mg)|Tablet|strip of 10 tablets|Indoco Remedies Ltd|antacid|56
Meftal Spas Tablet|Mefenamic Acid (250mg) + Dicyclomine (10mg)|Tablet|strip of 10 tablets|Blue Cross Laboratories|antacid|47
Duphalac Lactulose Solution|Lactulose (10g/15ml)|Solution|bottle of 200 ml|Abbott|gi|240
Cremaffin Plus Syrup|Milk of Magnesia + Liquid Paraffin + Sodium Picosulphate|Syrup|bottle of 225 ml|Abbott|gi|216
Dulcoflex Tablet|Bisacodyl (5mg)|Tablet|strip of 10 tablets|Boehringer Ingelheim|gi|20
Electral Powder Orange|ORS (WHO formula)|Powder|sachet of 21.8 gm|FDC Ltd|gi|21
ORSL Fruit Punch Oral Rehydration Solution|ORS (WHO formula)|Solution|bottle of 200 ml|JNTL Consumer Health|gi|30
Isabgol Husk Natural|Psyllium Husk|Powder|bottle of 100 gm|Dabur India Ltd|gi|112
Glycomet 500 SR Tablet|Metformin (500mg)|Tablet|strip of 20 tablets|USV Ltd|dm|38|1
Glycomet-GP 1 Tablet|Glimepiride (1mg) + Metformin (500mg)|Tablet|strip of 15 tablets|USV Ltd|dm|90|1
Januvia 100mg Tablet|Sitagliptin (100mg)|Tablet|strip of 7 tablets|MSD|dm|498|1
Jalra 50mg Tablet|Vildagliptin (50mg)|Tablet|strip of 15 tablets|Novartis India Ltd|dm|525|1
Amaryl 2mg Tablet|Glimepiride (2mg)|Tablet|strip of 30 tablets|Sanofi India Ltd|dm|345|1
Gluconorm-G2 Tablet|Glimepiride (2mg) + Metformin (500mg)|Tablet|strip of 15 tablets|Lupin Ltd|dm|101|1
Forxiga 10mg Tablet|Dapagliflozin (10mg)|Tablet|strip of 14 tablets|AstraZeneca|dm|560|1
Jardiance 10mg Tablet|Empagliflozin (10mg)|Tablet|strip of 10 tablets|Boehringer Ingelheim|dm|690|1
Voglibose 0.3 Tablet (Vogs)|Voglibose (0.3mg)|Tablet|strip of 10 tablets|Cipla Ltd|dm|135|1
Pioglit 15 Tablet|Pioglitazone (15mg)|Tablet|strip of 10 tablets|Sun Pharmaceutical Industries Ltd|dm|75|1
Lantus Solostar Insulin Glargine Pen|Insulin Glargine (100IU/ml)|Injection|pen of 3 ml|Sanofi India Ltd|dm|685|1
Mixtard 30 Insulin|Insulin Human (30/70)|Injection|vial of 10 ml|Novo Nordisk|dm|185|1
Telma 40 Tablet|Telmisartan (40mg)|Tablet|strip of 15 tablets|Glenmark Pharmaceuticals Ltd|htn|205|1
Telma-H Tablet|Telmisartan (40mg) + Hydrochlorothiazide (12.5mg)|Tablet|strip of 15 tablets|Glenmark Pharmaceuticals Ltd|htn|220|1
Amlokind-5 Tablet|Amlodipine (5mg)|Tablet|strip of 15 tablets|Mankind Pharma Ltd|htn|28|1
Amlong 5 Tablet|Amlodipine (5mg)|Tablet|strip of 15 tablets|Micro Labs Ltd|htn|32|1
Stamlo 5 Tablet|Amlodipine (5mg)|Tablet|strip of 15 tablets|Dr. Reddy's Laboratories|htn|36|1
Losar 50 Tablet|Losartan (50mg)|Tablet|strip of 15 tablets|Unichem Laboratories Ltd|htn|75|1
Losar-H Tablet|Losartan (50mg) + Hydrochlorothiazide (12.5mg)|Tablet|strip of 15 tablets|Unichem Laboratories Ltd|htn|87|1
Metolar XR 50 Tablet|Metoprolol (50mg)|Tablet|strip of 15 tablets|Cipla Ltd|htn|98|1
Concor 5 Tablet|Bisoprolol (5mg)|Tablet|strip of 10 tablets|Merck Ltd|htn|152|1
Atenolol 50 Tablet (Aten)|Atenolol (50mg)|Tablet|strip of 14 tablets|Zydus Cadila|htn|42|1
Ramipril 5 Capsule (Cardace)|Ramipril (5mg)|Capsule|strip of 15 capsules|Sanofi India Ltd|htn|220|1
Olmezest 20 Tablet|Olmesartan (20mg)|Tablet|strip of 10 tablets|Sun Pharmaceutical Industries Ltd|htn|150|1
Lasix 40mg Tablet|Furosemide (40mg)|Tablet|strip of 15 tablets|Sanofi India Ltd|htn|10|1
Atorva 10 Tablet|Atorvastatin (10mg)|Tablet|strip of 15 tablets|Zydus Cadila|lipid|105|1
Atorlip 20 Tablet|Atorvastatin (20mg)|Tablet|strip of 15 tablets|Cipla Ltd|lipid|188|1
Rosuvas 10 Tablet|Rosuvastatin (10mg)|Tablet|strip of 15 tablets|Sun Pharmaceutical Industries Ltd|lipid|245|1
Rosuvas F 10 Tablet|Rosuvastatin (10mg) + Fenofibrate (160mg)|Tablet|strip of 10 tablets|Sun Pharmaceutical Industries Ltd|lipid|230|1
Tonact 20 Tablet|Atorvastatin (20mg)|Tablet|strip of 15 tablets|Lupin Ltd|lipid|160|1
Ecosprin 75 Tablet|Aspirin (75mg)|Tablet|strip of 14 tablets|USV Ltd|cardiac|5.6
Ecosprin AV 75 Capsule|Aspirin (75mg) + Atorvastatin (10mg)|Capsule|strip of 15 capsules|USV Ltd|cardiac|115|1
Clopitab 75 Tablet|Clopidogrel (75mg)|Tablet|strip of 15 tablets|Lupin Ltd|cardiac|115|1
Deplatt A 75 Capsule|Clopidogrel (75mg) + Aspirin (75mg)|Capsule|strip of 15 capsules|Torrent Pharmaceuticals Ltd|cardiac|122|1
Sorbitrate 10mg Tablet|Isosorbide Dinitrate (10mg)|Tablet|strip of 50 tablets|Abbott|cardiac|52|1
Ranolazine 500 Tablet (Ranozex)|Ranolazine (500mg)|Tablet|strip of 10 tablets|Sun Pharmaceutical Industries Ltd|cardiac|150|1
Eliquis 5mg Tablet|Apixaban (5mg)|Tablet|strip of 10 tablets|Bristol-Myers Squibb|cardiac|460|1
Cetzine 10mg Tablet|Cetirizine (10mg)|Tablet|strip of 10 tablets|GlaxoSmithKline|allergy|35
Okacet Tablet|Cetirizine (10mg)|Tablet|strip of 10 tablets|Cipla Ltd|allergy|20
Allegra 120mg Tablet|Fexofenadine (120mg)|Tablet|strip of 10 tablets|Sanofi India Ltd|allergy|200
Allegra 180mg Tablet|Fexofenadine (180mg)|Tablet|strip of 10 tablets|Sanofi India Ltd|allergy|260
Montair LC Tablet|Montelukast (10mg) + Levocetirizine (5mg)|Tablet|strip of 10 tablets|Cipla Ltd|allergy|220|1
Levocet 5mg Tablet|Levocetirizine (5mg)|Tablet|strip of 10 tablets|Hetero Healthcare|allergy|58
Avil 25 Tablet|Pheniramine (25mg)|Tablet|strip of 15 tablets|Sanofi India Ltd|allergy|11
Sinarest New Tablet|Paracetamol + Phenylephrine + Chlorpheniramine|Tablet|strip of 15 tablets|Centaur Pharmaceuticals|cough|58
Vicks Action 500 Advanced Tablet|Paracetamol + Phenylephrine + Caffeine|Tablet|strip of 15 tablets|Procter & Gamble|cough|50
D Cold Total Tablet|Paracetamol + Phenylephrine + Chlorpheniramine|Tablet|strip of 10 tablets|Paras Pharmaceuticals|cough|46
Benadryl Cough Formula Syrup|Diphenhydramine + Ammonium Chloride + Sodium Citrate|Syrup|bottle of 150 ml|Johnson & Johnson|cough|123
Corex DX Cough Syrup|Dextromethorphan + Chlorpheniramine|Syrup|bottle of 100 ml|Pfizer Ltd|cough|119
Ascoril LS Syrup|Ambroxol + Levosalbutamol + Guaifenesin|Syrup|bottle of 100 ml|Glenmark Pharmaceuticals Ltd|cough|118
Ascoril D Plus Syrup|Dextromethorphan + Chlorpheniramine + Phenylephrine|Syrup|bottle of 100 ml|Glenmark Pharmaceuticals Ltd|cough|122
Grilinctus BM Syrup|Bromhexine + Terbutaline + Guaifenesin + Menthol|Syrup|bottle of 100 ml|Franco-Indian Pharmaceuticals|cough|96
Cofsils Gargle|Povidone Iodine|Gargle|bottle of 100 ml|Cipla Ltd|cough|159.37
Strepsils Orange Lozenges|Amylmetacresol + Dichlorobenzyl Alcohol|Lozenge|strip of 8 lozenges|Reckitt Benckiser|cough|44
Vicks VapoRub|Menthol + Camphor + Eucalyptus + Turpentine|Balm|bottle of 50 ml|Procter & Gamble|cough|165
Otrivin Adult Nasal Spray|Xylometazoline (0.1% w/v)|Spray|bottle of 10 ml|GlaxoSmithKline|cough|85
Nasivion 0.05% Nasal Drops|Oxymetazoline (0.05%)|Drops|bottle of 10 ml|Merck Ltd|cough|75
Asthalin Inhaler|Salbutamol (100mcg)|Inhaler|inhaler of 200 mdi|Cipla Ltd|asthma|146|1
Foracort 200 Inhaler|Formoterol (6mcg) + Budesonide (200mcg)|Inhaler|inhaler of 120 mdi|Cipla Ltd|asthma|420|1
Seroflo 250 Inhaler|Salmeterol (25mcg) + Fluticasone (250mcg)|Inhaler|inhaler of 120 mdi|Cipla Ltd|asthma|390|1
Duolin Respules|Levosalbutamol + Ipratropium|Respules|pack of 10 respules|Cipla Ltd|asthma|210|1
Montek LC Tablet|Montelukast (10mg) + Levocetirizine (5mg)|Tablet|strip of 15 tablets|Sun Pharmaceutical Industries Ltd|asthma|250|1
Deriphyllin Retard 150 Tablet|Etofylline + Theophylline|Tablet|strip of 10 tablets|Zydus Cadila|asthma|35|1
Shelcal 500 Tablet|Calcium (500mg) + Vitamin D3 (250IU)|Tablet|strip of 15 tablets|Torrent Pharmaceuticals Ltd|bone|125
Shelcal CT Tablet|Calcium Citrate + Vitamin D3 + Magnesium + Zinc|Tablet|strip of 15 tablets|Torrent Pharmaceuticals Ltd|bone|208
Calcirol D3 Granules|Cholecalciferol (60000IU)|Granules|sachet of 1 gm|Cadila Healthcare Ltd|bone|27
Cipcal D3 Granules|Cholecalciferol|Granules|sachet of 1 gm|Cipla Ltd|bone|36.52
Uprise D3 60K Capsule|Cholecalciferol (60000IU)|Capsule|strip of 4 capsules|Alkem Laboratories|bone|120
D-Rise 60K Capsule|Cholecalciferol (60000IU)|Capsule|strip of 4 capsules|Cipla Ltd|bone|109
Gemsoline Soft Gelatin Capsule|Calcitriol + Calcium Carbonate + Omega 3|Capsule|strip of 15 capsules|Medley Pharmaceuticals|bone|251.25
Glucosamine + Chondroitin Tablet (Cartiflex)|Glucosamine + Chondroitin + MSM|Tablet|strip of 10 tablets|Zydus Wellness|bone|290
Evion 400 Capsule|Vitamin E (400mg)|Capsule|strip of 10 capsules|Merck Ltd|vit|35
Becosules Capsule|Vitamin B-Complex + Vitamin C|Capsule|strip of 20 capsules|Pfizer Ltd|vit|50
Neurobion Forte Tablet|Vitamin B1 + B6 + B12|Tablet|strip of 30 tablets|Merck Ltd|vit|42
Limcee 500mg Chewable Tablet|Vitamin C (500mg)|Tablet|strip of 15 tablets|Abbott|vit|27
Celin 500mg Tablet|Vitamin C (500mg)|Tablet|strip of 15 tablets|GlaxoSmithKline|vit|21
Zincovit Tablet|Multivitamin + Multimineral + Grape Seed Extract|Tablet|strip of 15 tablets|Apex Laboratories|vit|105
Supradyn Daily Multivitamin Tablet|Multivitamin + Multimineral|Tablet|strip of 15 tablets|Bayer|vit|58
Revital H Men Capsule|Multivitamin + Ginseng|Capsule|bottle of 30 capsules|Sun Pharmaceutical Industries Ltd|vit|310
Becadexamin Capsule|Multivitamin + Multimineral|Capsule|strip of 20 capsules|GlaxoSmithKline|vit|57
Methylcobalamin 1500 Tablet (Mecobalamin)|Methylcobalamin (1500mcg)|Tablet|strip of 10 tablets|Cadila Healthcare Ltd|vit|104
Omega-3 Fish Oil 1000mg Capsule (Maxepa)|Omega-3 Fatty Acids|Capsule|strip of 10 capsules|Merck Ltd|vit|185
Thyronorm 50mcg Tablet|Levothyroxine (50mcg)|Tablet|bottle of 120 tablets|Abbott|thy|220|1
Eltroxin 100mcg Tablet|Levothyroxine (100mcg)|Tablet|bottle of 120 tablets|GlaxoSmithKline|thy|215|1
Thyronorm 25mcg Tablet|Levothyroxine (25mcg)|Tablet|bottle of 120 tablets|Abbott|thy|185|1
Neomercazole 5mg Tablet|Carbimazole (5mg)|Tablet|strip of 100 tablets|Abbott|thy|190|1
Alprax 0.25 Tablet|Alprazolam (0.25mg)|Tablet|strip of 15 tablets|Torrent Pharmaceuticals Ltd|neuro|27|1
Restyl 0.5 Tablet|Alprazolam (0.5mg)|Tablet|strip of 10 tablets|Cipla Ltd|neuro|30|1
Nexito 10 Tablet|Escitalopram (10mg)|Tablet|strip of 10 tablets|Sun Pharmaceutical Industries Ltd|neuro|105|1
Zoloft 50mg Tablet|Sertraline (50mg)|Tablet|strip of 10 tablets|Pfizer Ltd|neuro|140|1
Daxid 50 Tablet|Sertraline (50mg)|Tablet|strip of 10 tablets|Pfizer Ltd|neuro|115|1
Clonotril 0.5 Tablet|Clonazepam (0.5mg)|Tablet|strip of 10 tablets|Torrent Pharmaceuticals Ltd|neuro|35|1
Zolfresh 10 Tablet|Zolpidem (10mg)|Tablet|strip of 10 tablets|Sun Pharmaceutical Industries Ltd|neuro|110|1
Gabapin 100 Capsule|Gabapentin (100mg)|Capsule|strip of 10 capsules|Intas Pharmaceuticals Ltd|epi|85|1
Pregabalin 75 Capsule (Pregeb)|Pregabalin (75mg)|Capsule|strip of 10 capsules|Sun Pharmaceutical Industries Ltd|epi|105|1
Eptoin 100 Tablet|Phenytoin (100mg)|Tablet|strip of 15 tablets|Abbott|epi|34|1
Tegretol 200 Tablet|Carbamazepine (200mg)|Tablet|strip of 10 tablets|Novartis India Ltd|epi|55|1
Levipil 500 Tablet|Levetiracetam (500mg)|Tablet|strip of 10 tablets|Sun Pharmaceutical Industries Ltd|epi|196|1
Betadine Ointment|Povidone Iodine (5% w/w)|Ointment|tube of 20 gm|Win Medicare|derm|68
Candid Cream|Clotrimazole (1% w/w)|Cream|tube of 15 gm|Glenmark Pharmaceuticals Ltd|derm|95
Candid Dusting Powder|Clotrimazole (1% w/w)|Powder|bottle of 100 gm|Glenmark Pharmaceuticals Ltd|derm|131
Clocip Anti-Fungal Dusting Powder|Clotrimazole + Zinc Oxide|Powder|bottle of 100 gm|Cipla Ltd|derm|131
Soframycin Skin Cream|Framycetin (1% w/w)|Cream|tube of 30 gm|Sanofi India Ltd|derm|55
Fucidin Cream|Fusidic Acid (2% w/w)|Cream|tube of 15 gm|Leo Pharma|derm|165|1
T-Bact Ointment|Mupirocin (2% w/w)|Ointment|tube of 5 gm|GlaxoSmithKline|derm|140|1
Quadriderm RF Cream|Mometasone + Gentamicin + Miconazole + Zinc|Cream|tube of 15 gm|Piramal Healthcare|derm|85|1
Clobetasol Cream (Tenovate)|Clobetasol (0.05% w/w)|Cream|tube of 30 gm|GlaxoSmithKline|derm|120|1
Betnovate-N Cream|Betamethasone + Neomycin|Cream|tube of 20 gm|GlaxoSmithKline|derm|28|1
Panderm+ Cream|Clobetasol + Ofloxacin + Ornidazole + Terbinafine|Cream|tube of 15 gm|Zydus Cadila|derm|90|1
Terbinaforce Cream|Terbinafine (1% w/w)|Cream|tube of 10 gm|Zydus Cadila|derm|95
Clindac-A Gel|Clindamycin (1% w/w)|Gel|tube of 15 gm|Integrace|derm|165|1
Differin Gel|Adapalene (0.1% w/w)|Gel|tube of 15 gm|Galderma|derm|480|1
Benzac AC 2.5% Gel|Benzoyl Peroxide (2.5%)|Gel|tube of 20 gm|Galderma|derm|240
Itraconazole 100 Capsule (Candiforce)|Itraconazole (100mg)|Capsule|strip of 10 capsules|Zydus Cadila|derm|165|1
Eloway Aloe Vera Moisturizing Gel|Aloe Vera Extract|Gel|box of 100 gm|Eloway|derm|150
Moisturex Cream|Liquid Paraffin + White Soft Paraffin|Cream|tube of 100 gm|Glenmark Pharmaceuticals Ltd|derm|250
Refresh Tears Eye Drops|Carboxymethylcellulose (0.5% w/v)|Drops|bottle of 10 ml|Allergan|eye|152
Systane Ultra Lubricant Eye Drops|Polyethylene Glycol + Propylene Glycol|Drops|bottle of 10 ml|Alcon|eye|345
Moxifloxacin Eye Drops (Vigamox)|Moxifloxacin (0.5% w/v)|Drops|bottle of 5 ml|Alcon|eye|135|1
Ciplox Eye/Ear Drops|Ciprofloxacin (0.3% w/v)|Drops|bottle of 10 ml|Cipla Ltd|eye|48|1
Itone Eye Drops|Herbal Eye Drops|Drops|bottle of 10 ml|Himalaya Wellness|eye|105
Genteal Gel Drops|Hypromellose (0.3%)|Gel|tube of 10 gm|Alcon|eye|215
Lumigan 0.01% Eye Drops|Bimatoprost (0.01%)|Drops|bottle of 3 ml|Allergan|eye|540|1
Ursocol 300 Tablet|Ursodeoxycholic Acid (300mg)|Tablet|strip of 15 tablets|Sun Pharmaceutical Industries Ltd|liver|325|1
Udiliv 300 Tablet|Ursodeoxycholic Acid (300mg)|Tablet|strip of 15 tablets|Abbott|liver|330|1
Liv 52 DS Tablet|Herbal Liver Tonic|Tablet|bottle of 60 tablets|Himalaya Wellness|liver|180
Liv 52 Syrup|Herbal Liver Tonic|Syrup|bottle of 200 ml|Himalaya Wellness|liver|130
Silybon 140 Tablet|Silymarin (140mg)|Tablet|strip of 10 tablets|Micro Labs Ltd|liver|120
Essentiale Forte Capsule|Essential Phospholipids|Capsule|strip of 10 capsules|Sanofi India Ltd|liver|370
Hepamerz Sachet|L-Ornithine L-Aspartate|Granules|sachet of 5 gm|Intas Pharmaceuticals Ltd|liver|90|1
Cystone Tablet|Herbal Kidney Care|Tablet|bottle of 100 tablets|Himalaya Wellness|kidney|195
Neeri KFT Syrup|Herbal Kidney Support|Syrup|bottle of 200 ml|Aimil Pharmaceuticals|kidney|165
Citralka Syrup|Disodium Hydrogen Citrate|Syrup|bottle of 200 ml|Pharmed Ltd|kidney|123
Uroflow Tablet|Flavoxate (200mg)|Tablet|strip of 10 tablets|Abbott|kidney|100|1
Tamsulosin 0.4 Capsule (Urimax)|Tamsulosin (0.4mg)|Capsule|strip of 15 capsules|Cipla Ltd|kidney|210|1
Kidney Ketosteril Tablet|Ketoanalogues of Amino Acids|Tablet|strip of 10 tablets|Fresenius Kabi|kidney|650|1
Autrin Capsule|Iron + Vitamin B12 + Folic Acid|Capsule|strip of 15 capsules|Pfizer Ltd|women|65
Dexorange Syrup|Iron + Folic Acid + Vitamin B12|Syrup|bottle of 200 ml|Franco-Indian Pharmaceuticals|women|120
Folvite 5mg Tablet|Folic Acid (5mg)|Tablet|strip of 20 tablets|Pfizer Ltd|women|40
Orofer XT Tablet|Ferrous Ascorbate + Folic Acid|Tablet|strip of 10 tablets|Emcure Pharmaceuticals|women|120
Unwanted 72 Tablet|Levonorgestrel (1.5mg)|Tablet|strip of 1 tablet|Mankind Pharma Ltd|women|120
i-pill Emergency Contraceptive|Levonorgestrel (1.5mg)|Tablet|strip of 1 tablet|Cipla Ltd|women|130
Mala-D Tablet|Levonorgestrel + Ethinylestradiol|Tablet|strip of 28 tablets|HLL Lifecare|women|45
Meprate 10mg Tablet|Medroxyprogesterone (10mg)|Tablet|strip of 10 tablets|Zydus Cadila|women|215|1
Prega News Advance Pregnancy Test Kit|Urine hCG Rapid Test|Kit|box of 1 test kit|Mankind Pharma Ltd|women|120
Evecare Syrup|Herbal Women's Tonic|Syrup|bottle of 200 ml|Charak Pharma|women|165
Himalaya Ashvagandha Tablet|Withania somnifera (Ashwagandha)|Tablet|bottle of 60 tablets|Himalaya Wellness|ayur|185
Dabur Chyawanprash|Amla + 40 Herbs|Paste|jar of 1 kg|Dabur India Ltd|ayur|395
Dabur Honitus Cough Syrup|Tulsi + Honey + Herbs|Syrup|bottle of 100 ml|Dabur India Ltd|ayur|88
Patanjali Giloy Ghanvati|Tinospora cordifolia|Tablet|bottle of 60 tablets|Patanjali Ayurved|ayur|70
Zandu Pancharishta|Ayurvedic Digestive Tonic|Syrup|bottle of 450 ml|Zandu|ayur|195
Hamdard Safi Blood Purifier|Herbal Blood Purifier|Syrup|bottle of 200 ml|Hamdard Laboratories|ayur|125
Baidyanath Triphala Churna|Triphala|Powder|pack of 100 gm|Baidyanath|ayur|70
Himalaya Septilin Tablet|Immunity Herbal Tablet|Tablet|bottle of 60 tablets|Himalaya Wellness|ayur|150
Himalaya Gasex Tablet|Herbal Digestive|Tablet|strip of 10 tablets|Himalaya Wellness|ayur|35
Dabur Shilajit Gold Capsule|Shilajit + Herbs|Capsule|bottle of 20 capsules|Dabur India Ltd|ayur|830
SBL Arnica Montana 30 Dilution|Arnica Montana (30C)|Dilution|bottle of 30 ml|SBL Pvt Ltd|homeo|80
SBL Alfalfa Tonic|Alfalfa Mother Tincture|Tonic|bottle of 450 ml|SBL Pvt Ltd|homeo|230
Dr. Reckeweg R7 Drops|Homeopathic Combination|Drops|bottle of 22 ml|Dr. Reckeweg|homeo|215
Dr. Reckeweg R1 Drops|Homeopathic Combination|Drops|bottle of 22 ml|Dr. Reckeweg|homeo|215
Willmar Schwabe Calendula Q Mother Tincture|Calendula Officinalis (Q)|Dilution|bottle of 30 ml|Willmar Schwabe India|homeo|180
Bjain Nux Vomica 200 Dilution|Nux Vomica (200C)|Dilution|bottle of 30 ml|Bjain Pharmaceuticals|homeo|110
Bakson's Cold Cough Syrup|Homeopathic Combination|Syrup|bottle of 100 ml|Bakson's|homeo|110
Dettol Antiseptic Liquid|Chloroxylenol (4.8% w/v)|Liquid|bottle of 250 ml|Reckitt Benckiser|pc|125
Savlon Antiseptic Liquid|Chloroxylenol + Terpineol|Liquid|bottle of 200 ml|ITC Ltd|pc|99
Dettol Hand Sanitizer Original|Ethyl Alcohol (70%)|Gel|bottle of 200 ml|Reckitt Benckiser|pc|110
Lifebuoy Hand Sanitizer|Isopropyl Alcohol|Gel|bottle of 100 ml|Hindustan Unilever Ltd|pc|60
Himalaya Neem Face Wash|Neem + Turmeric|Face Wash|tube of 100 ml|Himalaya Wellness|pc|175
Cetaphil Gentle Skin Cleanser|Glycerin + Panthenol|Cleanser|bottle of 125 ml|Galderma|pc|365
Sebamed Clear Face Wash|Mild Cleanser|Face Wash|bottle of 150 ml|Sebamed|pc|670
Neutrogena Ultra Sheer Sunscreen SPF 50+|Avobenzone + Octocrylene|Sunscreen|tube of 50 gm|Johnson & Johnson|pc|499
Lakme Sun Expert SPF 50|Sunscreen|Sunscreen|tube of 50 ml|Hindustan Unilever Ltd|pc|235
Johnson's Baby Powder|Talc|Powder|bottle of 200 gm|Johnson & Johnson|pc|180
Pampers Active Baby Diapers (M)|Diapers|Diapers|pack of 56 diapers|Procter & Gamble|pc|849
Head & Shoulders Anti-Dandruff Shampoo|Zinc Pyrithione|Shampoo|bottle of 340 ml|Procter & Gamble|pc|365
Nizral 2% Shampoo|Ketoconazole (2% w/v)|Shampoo|bottle of 100 ml|Johnson & Johnson|pc|189
Minoxidil 5% Solution (Tugain 5)|Minoxidil (5% w/v)|Solution|bottle of 60 ml|Cipla Ltd|pc|620
Tugain Twins 5 Solution|Minoxidil (5% w/v)|Solution|kit of 2 bottles|Cipla Ltd|pc|1715.7
Dettol Soap Original|Chloroxylenol|Soap|pack of 4 bars|Reckitt Benckiser|pc|140
Band-Aid Washproof Bandages|Adhesive Bandage|Bandage|pack of 20 bandages|Johnson & Johnson|pc|55
Dr. Morepen BP Monitor BP-09|Digital Blood Pressure Monitor|Device|1 unit|Morepen Laboratories|dev|1790
Omron HEM-7120 BP Monitor|Digital Blood Pressure Monitor|Device|1 unit|Omron|dev|2200
Accu-Chek Active Glucometer|Blood Glucose Monitor|Device|kit of 1 glucometer|Roche|dev|1000
Accu-Chek Active Test Strips|Blood Glucose Test Strips|Strips|box of 50 strips|Roche|dev|1005
OneTouch Select Plus Glucometer|Blood Glucose Monitor|Device|kit of 1 glucometer|LifeScan|dev|980
Dr. Morepen Gluco One Strips|Blood Glucose Test Strips|Strips|box of 50 strips|Morepen Laboratories|dev|900
Dr. Trust Digital Thermometer|Digital Clinical Thermometer|Device|1 unit|Dr. Trust|dev|299
Dr. Morepen Pulse Oximeter PO-04|Fingertip Pulse Oximeter|Device|1 unit|Morepen Laboratories|dev|1599
Omron Compressor Nebulizer NE-C801|Nebulizer|Device|1 unit|Omron|dev|2700
Hot Water Bag Tata Style (Rubber)|Hot Water Bag|Device|1 unit|Generic|dev|225
Steam Vaporizer Inhaler|Steam Inhaler|Device|1 unit|Generic|dev|350
Elbow Support Large|Elastic Elbow Support|Support|1 unit|Generic|dev|290
Knee Cap Support Medium|Elastic Knee Support|Support|1 unit|Generic|dev|300
Lumbar Sacro Belt|Back Support Belt|Support|1 unit|Generic|dev|450
`.trim().split('\n');

  const hash = s => { let h = 7; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; };
  const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const meds = SEED.map((line, i) => {
    const [name, comp, form, pack, marketer, cls, mrp, rx] = line.split('|');
    const h = hash(name);
    const mrpN = +mrp;
    const FIX = { 'Dolo 650 Tablet': 12, 'Dolo 500 Tablet': 4, 'Cofsils Gargle': 52, 'Clocip Anti-Fungal Dusting Powder': 25, 'Omnigel Gel': 32, 'Cipcal D3 Granules': 35, 'Gemsoline Soft Gelatin Capsule': 35, 'Tugain Twins 5 Solution': 25, 'Eloway Aloe Vera Moisturizing Gel': 33 };
    const d = name in FIX ? FIX[name] : [0, 5, 8, 10, 12, 15, 18, 20, 25, 30, 35][h % 11];
    const price = +(mrpN * (1 - d / 100)).toFixed(mrpN < 100 ? 1 : 0);
    const c = CL[cls];
    const reviews = (h % 7 === 0) ? 0 : 6 + (h % 3600);
    return {
      id: 74000 + i * 37 + (h % 30), slug: slug(name), name, comp, form, pack, marketer, cls,
      mrp: mrpN, price: d ? price : mrpN, off: d, rx: rx === '1',
      rating: reviews ? +(3.8 + (h % 8) / 10).toFixed(1) : 0, reviews,
      cat: c[2], sub: c[0], parent: c[1],
      bestseller: h % 9 === 0, ad: h % 23 === 0, bought: 500 + (h % 24000), eta: ['Get by 4pm, Today', 'Get by Today', 'Get by Tomorrow'][h % 3]
    };
  });

  const LABS = [
    ['Comprehensive Gold Full Body Checkup', 4998, 2499, 'package', 92], ['Good Health Silver Package', 1498, 749, 'package', 63],
    ['Comprehensive Silver Full Body Checkup', 3998, 1999, 'package', 78], ['Comprehensive Platinum Full Body Checkup', 7998, 3999, 'package', 105],
    ['Good Health Platinum Package', 2998, 1499, 'package', 74], ['Good Health Gold Package', 1998, 999, 'package', 68],
    ['Lipid Profile', 439, 439, 'test', 8], ['CBC (Complete Blood Count)', 389, 349, 'test', 21],
    ['Thyroid Profile Total (T3, T4 & TSH)', 609, 539, 'test', 3], ['Lipid Profile, Non Fasting', 699, 399, 'test', 8],
    ['LFT (Liver Function Test)', 779, 439, 'test', 11], ['KFT with Electrolytes (Kidney Function Test)', 939, 439, 'test', 8],
    ['Vitamin B12 (Vit B12)', 1319, 749, 'test', 1], ['Vitamin D Total 25-Hydroxy', 1599, 849, 'test', 1],
    ['HbA1c (Glycosylated Haemoglobin)', 599, 349, 'test', 1], ['Fasting Blood Sugar', 120, 80, 'test', 1],
    ['Urine Routine & Microscopy', 150, 120, 'test', 1], ['Iron Studies', 1199, 699, 'test', 3], ['Dengue NS1 Antigen', 900, 600, 'test', 1],
    ['Diabetes Screening Package', 1499, 899, 'package', 12], ['Women Wellness Package', 3499, 1799, 'package', 64], ['Senior Citizen Health Package', 4499, 2299, 'package', 82]
  ].map((r, i) => ({ id: 'L' + (100 + i), name: r[0], mrp: r[1], price: r[2], type: r[3], tests: r[4], off: Math.round((1 - r[2] / r[1]) * 100) }));

  const MEGA = [
    ['hrc', 'Health Resource Center', [['All Diseases', '#/diseases'], ['All Medicines', '#/medicines'], ['Medicines by Therapeutic Class', '#/classes']]],
    ['hair', 'Hair Care', ['Hair Oils', 'Shampoos & Conditioners', 'Hair Serums', 'Hair Creams & Masks', 'Hair Colour', 'Hair Growth Products', 'Essential Oils']],
    ['fitness', 'Fitness & Health', ['Plant Protein', 'Mass Gainers', 'Pre/Post Workout', 'Smart Watches & Rings', 'Fat Burners']],
    ['sexual', 'Sexual Wellness', ['Lubricants & Massage Gels', 'Sexual Wellness Devices', 'Performance Enhancers', 'Oral Contraceptives']],
    ['vitamins', 'Vitamins & Nutrition', ['Omega & Fish Oil & DHA', 'Hair & Skin Supplements', 'Calcium', 'Vitamin B', 'Vitamin D', 'Vitamin C']],
    ['supports', 'Supports & Braces', ['Ankle, Foot & Leg Support', 'Knee & Leg Support', 'Back & Abdomen Support', 'Elbow & Arm Support']],
    ['immunity', 'Immunity Boosters', ['Chyawanprash', 'Antioxidant Supplements', 'Ayurvedic Supplements', 'Herbal Tea']],
    ['homeopathy', 'Homeopathy', ['Homeopathy Diabetes Medicines', 'Sexual Health', 'Hair Care Products', 'Piles and Fissures', 'Fungal Infection', 'Obesity', 'Warts']],
    ['pet', 'Pet Care', ['Pet Supplements', 'Pet Food']]
  ];

  const CONCERNS = [
    ['diabetes', 'Diabetes', '#CFE8FF'], ['heart', 'Heart Care', '#D9D4FF'], ['stomach', 'Stomach Care', '#CDEFE3'],
    ['liver', 'Liver Care', '#FFE7C4'], ['bone', 'Bone, Joint & Muscle Care', '#FFD9D2'], ['kidney', 'Kidney Care', '#C9EEF0'],
    ['derma', 'Derma Care', '#FFDDE8'], ['respiratory', 'Respiratory Care', '#E3F2C8'], ['eye', 'Eye Care', '#E6DAFF']
  ];

  const BRANDS = ['Himalaya Wellness', 'Dabur India Ltd', 'Cipla Ltd', 'Sun Pharmaceutical Industries Ltd', 'Abbott', 'Mankind Pharma Ltd', 'Zydus Cadila', 'Glenmark Pharmaceuticals Ltd', 'Johnson & Johnson', 'Reckitt Benckiser', 'Torrent Pharmaceuticals Ltd', 'Sanofi India Ltd'];

  const CATS = [['top-deals', 'Best offers'], ['vitamins', 'Vitamins & Supplements'], ['drinks', 'Nutritional Drinks'], ['derma', 'Skin Care'], ['hair', 'Hair Care'], ['sexual', 'Sexual Wellness'], ['ayurveda', 'Ayurveda Products'], ['pain', 'Pain Relief'], ['homeopathy', 'Homeopathy']];

  window.DAWAA_DATA = { meds, LABS, MEGA, CONCERNS, BRANDS, CATS, CL, count: meds.length };
})();

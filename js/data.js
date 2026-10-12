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

  // name|composition|form|pack|marketer|class|mrp|rx(1)|price(real, from 1mg)|cx(1 = composition/marketer not verified)
  const SEED = `
Dolo 650 Tablet|Paracetamol (650mg)|Tablet|strip of 15 tablets|Micro Labs Ltd|para|32.28||28.3|
Dolo 500 Tablet|Paracetamol (500mg)|Tablet|strip of 15 tablets|Micro Labs Ltd|para|14.58||14|
Crocin Advance 500mg Tablet|Paracetamol (500mg)|Tablet|strip of 20 tablets|GlaxoSmithKline|para|19.53||19.53|
Sumo Tablet|Paracetamol (100mg) + Nimesulide (100mg)|Tablet|strip of 15 tablets|Alkem Laboratories|para|184.55||168|
Combiflam Tablet|Ibuprofen (400mg) + Paracetamol (325mg)|Tablet|strip of 20 tablets|Sanofi India Ltd|nsaid|57.45||53.4|
Voveran Emulgel|Diclofenac (1.16% w/w)|Gel|tube of 50 gm gel|Novartis India Ltd|nsaid|301.17||293|
Volini Pain Relief Gel|Diclofenac + Methyl Salicylate + Menthol|Gel|tube of 75 gm gel|Sun Pharmaceutical Industries Ltd|nsaid|289||266|
Volini Spray|Diclofenac + Menthol + Methyl Salicylate|Spray|bottle of 15 gm spray|Sun Pharmaceutical Industries Ltd|nsaid|77||73.8|
Moov Pain Relief Ointment|Menthol + Camphor + Eucalyptus Oil|Ointment|tube of 50 gm cream|Reckitt Benckiser|nsaid|255||182|
Zerodol-P Tablet|Aceclofenac (100mg) + Paracetamol (325mg)|Tablet|strip of 10 tablets|Ipca Laboratories|nsaid|75.94||69.2|
Zerodol-SP Tablet|Aceclofenac (100mg) + Paracetamol (325mg) + Serratiopeptidase (15mg)|Tablet|strip of 10 tablets|Ipca Laboratories|nsaid|150.85||140|
Hifenac-P Tablet|Aceclofenac (100mg) + Paracetamol (325mg)|Tablet|strip of 15 tablets|Intas Pharmaceuticals Ltd|nsaid|117.5||107|
Ultracet Tablet|Tramadol (37.5mg) + Paracetamol (325mg)|Tablet|strip of 15 tablets|Janssen|nsaid|295.6|1|269|
Myospaz Forte Tablet|Aceclofenac + Paracetamol + Chlorzoxazone|Tablet|strip of 10 tablets|Systopic Laboratories|nsaid|401||365|
Azithral 500 Tablet|Azithromycin (500mg)|Tablet|strip of 5 tablets|Alembic Pharmaceuticals Ltd|abx|126.73|1|118|
Azee 500 Tablet|Azithromycin (500mg)|Tablet|strip of 5 tablets|Cipla Ltd|abx|126.71|1|118|
Augmentin 625 Duo Tablet|Amoxycillin (500mg) + Clavulanic Acid (125mg)|Tablet|strip of 10 tablets|GlaxoSmithKline|abx|196.65|1|183|
Ciplox 500 Tablet|Ciprofloxacin (500mg)|Tablet|strip of 10 tablets|Cipla Ltd|abx|45.66|1|40.7|
Cifran 500 Tablet|Ciprofloxacin (500mg)|Tablet|strip of 10 tablets|Sun Pharmaceutical Industries Ltd|abx|45.57|1|41.5|
Taxim-O 200 Tablet|Cefixime (200mg)|Tablet|strip of 10 tablets|Alkem Laboratories|abx|105.1|1|95.7|
Zifi 200 Tablet|Cefixime (200mg)|Tablet|strip of 10 tablets|FDC Ltd|abx|105.11|1|95.8|
Metrogyl 400 Tablet|Metronidazole (400mg)|Tablet|strip of 20 tablets|J.B. Chemicals|abx|32.76|1|32|
Oflox 200 Tablet|Ofloxacin (200mg)|Tablet|strip of 10 tablets|Cipla Ltd|abx|110.5|1|101|
Norflox 400 Tablet|Norfloxacin (400mg)|Tablet|strip of 10 tablets|Cipla Ltd|abx|97.38|1|88.7|
Pantop 40 Tablet|Pantoprazole (40mg)|Tablet|strip of 15 tablets|Aristo Pharmaceuticals|ppi|174.45||154|
Pan 40 Tablet|Pantoprazole (40mg)|Tablet|strip of 15 tablets|Alkem Laboratories|ppi|192.8||169|
Razo-D Capsule|Rabeprazole (20mg) + Domperidone (30mg)|Capsule|strip of 15 capsule sr|Dr. Reddy's Laboratories|ppi|361||317|
Rablet 20 Tablet|Rabeprazole (20mg)|Tablet|strip of 15 tablets|Lupin Ltd|ppi|215.25||181|
Unienzyme Tablet|Fungal Diastase + Papain + Simethicone|Tablet|strip of 15 tablets|Wockhardt Ltd|antacid|96.56||91.6|
Cyclopam Tablet|Dicyclomine (20mg) + Paracetamol (500mg)|Tablet|strip of 10 tablets|Indoco Remedies Ltd|antacid|62.5||51.9|
Meftal Spas Tablet|Mefenamic Acid (250mg) + Dicyclomine (10mg)|Tablet|strip of 10 tablets|Blue Cross Laboratories|antacid|56.5||51.5|
Cremaffin Plus Syrup|Milk of Magnesia + Liquid Paraffin + Sodium Picosulphate|Syrup|bottle of 225 ml syrup|Abbott|gi|371.58||316|
Glycomet 500 SR Tablet|Metformin (500mg)|Tablet|strip of 20 tablet sr|USV Ltd|dm|42.24|1|38.9|
Glycomet-GP 1 Tablet|Glimepiride (1mg) + Metformin (500mg)|Tablet|strip of 15 tablet pr|USV Ltd|dm|123.28|1|113|
Januvia 100mg Tablet|Sitagliptin (100mg)|Tablet|strip of 7 tablets|MSD|dm|304|1|280|
Jalra 50mg Tablet|Vildagliptin (50mg)|Tablet|strip of 15 tablets|Novartis India Ltd|dm|347.98|1|320|
Amaryl 2mg Tablet|Glimepiride (2mg)|Tablet|strip of 30 tablets|Sanofi India Ltd|dm|186.75|1|172|
Gluconorm-G2 Tablet|Glimepiride (2mg) + Metformin (500mg)|Tablet|strip of 15 tablet pr|Lupin Ltd|dm|359.75|1|331|
Forxiga 10mg Tablet|Dapagliflozin (10mg)|Tablet|strip of 14 tablets|AstraZeneca|dm|566.25|1|522|
Jardiance 10mg Tablet|Empagliflozin (10mg)|Tablet|strip of 10 tablets|Boehringer Ingelheim|dm|422|1|397|
Pioglit 15 Tablet|Pioglitazone (15mg)|Tablet|strip of 10 tablets|Sun Pharmaceutical Industries Ltd|dm|74.53|1|68.6|
Telma 40 Tablet|Telmisartan (40mg)|Tablet|strip of 30 tablets|Glenmark Pharmaceuticals Ltd|htn|216.72|1|189|
Telma-H Tablet|Telmisartan (40mg) + Hydrochlorothiazide (12.5mg)|Tablet|strip of 15 tablets|Glenmark Pharmaceuticals Ltd|htn|356.72|1|311|
Amlokind-5 Tablet|Amlodipine (5mg)|Tablet|strip of 15 tablets|Mankind Pharma Ltd|htn|23.82|1|21.7|
Stamlo 5 Tablet|Amlodipine (5mg)|Tablet|strip of 30 tablets|Dr. Reddy's Laboratories|htn|80.51|1|70.1|
Losar 50 Tablet|Losartan (50mg)|Tablet|strip of 15 tablets|Unichem Laboratories Ltd|htn|178.31|1|155|
Losar-H Tablet|Losartan (50mg) + Hydrochlorothiazide (12.5mg)|Tablet|strip of 15 tablets|Unichem Laboratories Ltd|htn|311.86|1|272|
Concor 5 Tablet|Bisoprolol (5mg)|Tablet|strip of 10 tablets|Merck Ltd|htn|145.39|1|127|
Olmezest 20 Tablet|Olmesartan (20mg)|Tablet|strip of 10 tablets|Sun Pharmaceutical Industries Ltd|htn|164|1|143|
Atorlip 20 Tablet|Atorvastatin (20mg)|Tablet|strip of 15 tablets|Cipla Ltd|lipid|202.54|1|185|
Rosuvas 10 Tablet|Rosuvastatin (10mg)|Tablet|strip of 15 tablets|Sun Pharmaceutical Industries Ltd|lipid|375|1|327|
Rosuvas F 10 Tablet|Rosuvastatin (10mg) + Fenofibrate (160mg)|Tablet|strip of 15 tablets|Sun Pharmaceutical Industries Ltd|lipid|460|1|401|
Tonact 20 Tablet|Atorvastatin (20mg)|Tablet|strip of 15 tablets|Lupin Ltd|lipid|202.5|1|184|
Ecosprin 75 Tablet|Aspirin (75mg)|Tablet|strip of 14 tablets|USV Ltd|cardiac|5.29||5.1|
Ecosprin AV 75 Capsule|Aspirin (75mg) + Atorvastatin (10mg)|Capsule|strip of 15 capsules|USV Ltd|cardiac|65.5|1|63.1|
Eliquis 5mg Tablet|Apixaban (5mg)|Tablet|strip of 10 tablets|Bristol-Myers Squibb|cardiac|509.06|1|428|
Allegra 120mg Tablet|Fexofenadine (120mg)|Tablet|strip of 10 tablets|Sanofi India Ltd|allergy|272.99||254|
Allegra 180mg Tablet|Fexofenadine (180mg)|Tablet|strip of 10 tablets|Sanofi India Ltd|allergy|312.04||290|
Montair LC Tablet|Montelukast (10mg) + Levocetirizine (5mg)|Tablet|strip of 15 tablets|Cipla Ltd|allergy|419.79|1|390|
Levocet 5mg Tablet|Levocetirizine (5mg)|Tablet|strip of 10 tablets|Hetero Healthcare|allergy|14.06||12.8|
Avil 25 Tablet|Pheniramine (25mg)|Tablet|strip of 15 tablets|Sanofi India Ltd|allergy|13.66||12.4|
Sinarest New Tablet|Paracetamol + Phenylephrine + Chlorpheniramine|Tablet|strip of 15 tablets|Centaur Pharmaceuticals|cough|135.88||126|
Vicks Action 500 Advanced Tablet|Paracetamol + Phenylephrine + Caffeine|Tablet|strip of 10 tablets|Procter & Gamble|cough|70||63.8|
Ascoril LS Syrup|Ambroxol + Levosalbutamol + Guaifenesin|Syrup|bottle of 100 ml syrup|Glenmark Pharmaceuticals Ltd|cough|158||144|
Ascoril D Plus Syrup|Dextromethorphan + Chlorpheniramine + Phenylephrine|Syrup|bottle of 100 ml syrup|Glenmark Pharmaceuticals Ltd|cough|158.4||144|
Grilinctus BM Syrup|Bromhexine + Terbutaline + Guaifenesin + Menthol|Syrup|bottle of 100 ml syrup|Franco-Indian Pharmaceuticals|cough|131.7||120|
Cofsils Gargle|Povidone Iodine|Gargle|bottle of 100 ml gargle|Cipla Ltd|cough|159.37||77|
Vicks VapoRub|Menthol + Camphor + Eucalyptus + Turpentine|Balm|jar of 105 ml balm|Procter & Gamble|cough|349||279|
Foracort 200 Inhaler|Formoterol (6mcg) + Budesonide (200mcg)|Inhaler|packet of 120 mdi inhaler|Cipla Ltd|asthma|381.76|1|355|
Seroflo 250 Inhaler|Salmeterol (25mcg) + Fluticasone (250mcg)|Inhaler|packet of 120 mdi inhaler|Cipla Ltd|asthma|1006.2|1|935|
Montek LC Tablet|Montelukast (10mg) + Levocetirizine (5mg)|Tablet|strip of 15 tablets|Sun Pharmaceutical Industries Ltd|asthma|404|1|375|
Deriphyllin Retard 150 Tablet|Etofylline + Theophylline|Tablet|strip of 30 tablet pr|Zydus Cadila|asthma|46.03|1|41.9|
Shelcal CT Tablet|Calcium Citrate + Vitamin D3 + Magnesium + Zinc|Tablet|strip of 15 tablets|Torrent Pharmaceuticals Ltd|bone|401.95||373|
Cipcal D3 Granules|Cholecalciferol|Granules|sachet of 1 gm granules|Cipla Ltd|bone|36.52||23.7|
Uprise D3 60K Capsule|Cholecalciferol (60000IU)|Capsule|strip of 12 soft gelatin capsules|Alkem Laboratories|bone|397.15||369|
D-Rise 60K Capsule|Cholecalciferol (60000IU)|Capsule|strip of 4 soft gelatin capsules|Cipla Ltd|bone|132.38||123|
Gemsoline Soft Gelatin Capsule|Calcitriol + Calcium Carbonate + Omega 3|Capsule|strip of 15 soft gelatin capsules|Medley Pharmaceuticals|bone|251.25||163|
Becosules Capsule|Vitamin B-Complex + Vitamin C|Capsule|strip of 20 capsules|Pfizer Ltd|vit|68.6||64.6|
Thyronorm 50mcg Tablet|Levothyroxine (50mcg)|Tablet|bottle of 120 tablets|Abbott|thy|132.87|1|121|
Eltroxin 100mcg Tablet|Levothyroxine (100mcg)|Tablet|bottle of 120 tablets|GlaxoSmithKline|thy|169.93|1|155|
Thyronorm 25mcg Tablet|Levothyroxine (25mcg)|Tablet|bottle of 120 tablets|Abbott|thy|186.6|1|170|
Alprax 0.25 Tablet|Alprazolam (0.25mg)|Tablet|strip of 15 tablets|Torrent Pharmaceuticals Ltd|neuro|36.09|1|33.2|
Nexito 10 Tablet|Escitalopram (10mg)|Tablet|strip of 15 tablets|Sun Pharmaceutical Industries Ltd|neuro|145.15|1|134|
Clonotril 0.5 Tablet|Clonazepam (0.5mg)|Tablet|strip of 15 tablets|Torrent Pharmaceuticals Ltd|neuro|55.25|1|50.9|
Levipil 500 Tablet|Levetiracetam (500mg)|Tablet|strip of 15 tablets|Sun Pharmaceutical Industries Ltd|epi|207.82|1|191|
Betadine Ointment|Povidone Iodine (5% w/w)|Ointment|tube of 20 gm ointment|Win Medicare|derm|132.3||128|
Candid Dusting Powder|Clotrimazole (1% w/w)|Powder|bottle of 120 gm dusting powder|Glenmark Pharmaceuticals Ltd|derm|163.13||143|
Clocip Anti-Fungal Dusting Powder|Clotrimazole + Zinc Oxide|Powder|bottle of 100 gm dusting powder|Cipla Ltd|derm|131||98.1|
Fucidin Cream|Fusidic Acid (2% w/w)|Cream|tube of 15 gm cream|Leo Pharma|derm|158.44|1|142|
Quadriderm RF Cream|Mometasone + Gentamicin + Miconazole + Zinc|Cream|tube of 10 gm cream|Piramal Healthcare|derm|163.13|1|149|
Betnovate-N Cream|Betamethasone + Neomycin|Cream|tube of 25 gm cream|GlaxoSmithKline|derm|68.9|1|61.7|
Panderm+ Cream|Clobetasol + Ofloxacin + Ornidazole + Terbinafine|Cream|tube of 15 gm cream|Zydus Cadila|derm|121.27|1|109|
Terbinaforce Cream|Terbinafine (1% w/w)|Cream|tube of 10 gm cream|Zydus Cadila|derm|56.44||51.4|
Clindac-A Gel|Clindamycin (1% w/w)|Gel|tube of 30 gm gel|Integrace|derm|285|1|259|
Benzac AC 2.5% Gel|Benzoyl Peroxide (2.5%)|Gel|tube of 30 gm gel|Galderma|derm|116.25||96.3|
Moisturex Cream|Liquid Paraffin + White Soft Paraffin|Cream|jar of 100 gm cream|Glenmark Pharmaceuticals Ltd|derm|300||273|
Refresh Tears Eye Drops|Carboxymethylcellulose (0.5% w/v)|Drops|bottle of 10 ml eye drop|Allergan|eye|132.12||124|
Ciplox Eye/Ear Drops|Ciprofloxacin (0.3% w/v)|Drops|bottle of 10 ml eye/ear drops|Cipla Ltd|eye|16.58|1|15.3|
Ursocol 300 Tablet|Ursodeoxycholic Acid (300mg)|Tablet|strip of 15 tablets|Sun Pharmaceutical Industries Ltd|liver|760|1|645|
Udiliv 300 Tablet|Ursodeoxycholic Acid (300mg)|Tablet|strip of 15 tablets|Abbott|liver|1016.34|1|863|
Folvite 5mg Tablet|Folic Acid (5mg)|Tablet|strip of 45 tablets|Pfizer Ltd|women|73||73|
Orofer XT Tablet|Ferrous Ascorbate + Folic Acid|Tablet|bottle of 30 tablets|Emcure Pharmaceuticals|women|635.65||560|
i-pill Emergency Contraceptive|Levonorgestrel (1.5mg)|Tablet|strip of 1 tablet|Cipla Ltd|women|77.16||74|
Mala-D Tablet|Levonorgestrel + Ethinylestradiol|Tablet|strip of 28 tablets|HLL Lifecare|women|5||4.6|
Meprate 10mg Tablet|Medroxyprogesterone (10mg)|Tablet|strip of 10 tablets|Zydus Cadila|women|66.62|1|64.1|
Dabur Chyawanprash|Amla + 40 Herbs|Paste|jar of 2 kg paste|Dabur India Ltd|ayur|895||715|
Zandu Pancharishta|Ayurvedic Digestive Tonic|Syrup|bottle of 650 ml tonic|Zandu|ayur|214||170|
Baidyanath Triphala Churna|Triphala|Powder|jar of 500 gm churna|Baidyanath|ayur|250||204|
Himalaya Septilin Tablet|Immunity Herbal Tablet|Tablet|bottle of 60 tablets|Himalaya Wellness|ayur|257||218|
Himalaya Gasex Tablet|Herbal Digestive|Tablet|bottle of 100 tablets|Himalaya Wellness|ayur|206||169|
Dabur Shilajit Gold Capsule|Shilajit + Herbs|Capsule|bottle of 20 capsules|Dabur India Ltd|ayur|560||467|
SBL Alfalfa Tonic|Alfalfa Mother Tincture|Tonic|bottle of 180 ml tonic|SBL Pvt Ltd|homeo|178||144|
Cetaphil Gentle Skin Cleanser|Glycerin + Panthenol|Cleanser|pump bottle of 1000 ml cleanser|Galderma|pc|1899||1747|
Johnson's Baby Powder|Talc|Powder|box of 400 gm powder|Johnson & Johnson|pc|375||319|
Tugain Twins 5 Solution|Minoxidil (5% w/v)|Solution|kit of 2 bottles|Cipla Ltd|pc|1715.7||1287|
Dettol Soap Original|Chloroxylenol|Soap|box of 100 gm soap|Reckitt Benckiser|pc|40||40|
Omron HEM-7120 BP Monitor|Digital Blood Pressure Monitor|Device|box of 1 unit|Omron|dev|2334||1890|
ParaCIP 500 Tablet|Paracetamol|Tablet|strip of 10 tablets||para|9.45||8.7|1
Calpol 650 + Tablet|Paracetamol|Tablet|strip of 15 tablets||para|32.24||30.4|1
Calpol 500 + Tablet|Paracetamol|Tablet|strip of 15 tablets||para|14.26||14.26|1
Calpol 250mg Paediatric Oral Suspension Strawberry|Paracetamol|Syrup|bottle of 60 ml oral suspension||para|42.84||42.84|1
Crocin 650mg Tablet|Paracetamol|Tablet|strip of 15 tablets||para|32.28||31.9|1
Parafast 650mg Tablet|Paracetamol|Tablet|strip of 10 tablets||para|21.41||15.2|1
Brufen 400 Tablet|Ibuprofen|Tablet|strip of 20 tablets||nsaid|25.75||23.5|1
Brufen 200 Tablet|Ibuprofen|Tablet|strip of 15 tablets||nsaid|11.34||10.3|1
Brufen 600 Tablet|Ibuprofen|Tablet|strip of 15 tablets||nsaid|43.7||39.8|1
IBUgesic Oral Suspension Orange|Ibuprofen|Syrup|bottle of 100 ml oral suspension||nsaid|23.64||21.5|1
Flexon Tablet|Ibuprofen|Tablet|strip of 15 tablets||nsaid|35.25||32.1|1
IBUgesic Plus Oral Suspension Orange|Ibuprofen|Syrup|bottle of 100 ml oral suspension||nsaid|62.27||56.7|1
Flexon MR Tablet|Ibuprofen|Tablet|strip of 10 tablets||nsaid|32.2||29.3|1
IBUgesic Plus Tablet|Ibuprofen|Tablet|strip of 20 tablets||nsaid|41.49||37.8|1
Reactin 100 SR Tablet|Diclofenac|Tablet|strip of 15 tablets||nsaid|114.57||68.8|1
Zeldinac Transdermal Patch|Diclofenac|Patch|box of 3 transdermal patches||nsaid|96||59.7|1
Reactin 75 Injection|Diclofenac|Injection|ampoule of 1 ml injection||nsaid|21.56|1|16.6|1
Zeldinac 100 Tablet SR|Diclofenac|Tablet|strip of 10 tablets||nsaid|41.25||38.3|1
Zeldinac 75mg Injection|Diclofenac|Injection|ampoule of 1 ml injection||nsaid|13|1|11.4|1
Diklotas 25mg Injection|Diclofenac|Injection|vial of 3 ml injection||nsaid|4.69|1|4.1|1
Zerodol Tablet|Aceclofenac|Tablet|strip of 10 tablets||nsaid|67.22||61.2|1
Hifenac Tablet|Aceclofenac|Tablet|strip of 10 tablets||nsaid|64.22||58.5|1
Zerodol -CR Tablet|Aceclofenac|Tablet|strip of 10 tablets||nsaid|109||99.3|1
Signoflam Tablet|Aceclofenac|Tablet|strip of 10 tablets||nsaid|158.55||144|1
Zerodol-MR Tablet|Aceclofenac|Tablet|strip of 10 tablets||nsaid|128||117|1
Hifenac SR Tablet|Aceclofenac|Tablet|strip of 10 tablets||nsaid|106.8||97.3|1
Azicip 500 Tablet|Azithromycin|Tablet|strip of 3 tablets||abx|75.53|1|54|1
Azimax 500 Tablet|Azithromycin|Tablet|strip of 3 tablets||abx|76.03|1|47.9|1
Azax 500 Tablet|Azithromycin|Tablet|strip of 3 tablets||pc|75.5||47.6|1
Azicip 250 Tablet|Azithromycin|Tablet|strip of 6 tablets||abx|74.78|1|47.1|1
Azee 250 Tablet|Azithromycin|Tablet|strip of 10 tablets||pc|125.46||114|1
Azikem 500mg Tablet|Azithromycin|Tablet|strip of 3 tablets||abx|75.52|1|47|1
Alkem Amoxicillin 250mg Capsule|Amoxycillin|Capsule|box of 100 capsules||abx|97.56|1|85.9|1
Amoxycillin 500mg Capsule|Amoxycillin|Capsule|strip of 10 capsules||abx|29.91|1|27.2|1
Amoxycillin 125mg Syrup|Amoxycillin|Syrup|bottle of 60 ml syrup||abx|22.97|1|20.9|1
Amoxycillin 125mg Tablet|Amoxycillin|Tablet|strip of 10 tablets||abx|11.34|1|10.3|1
DavaIndia Amoxycillin 500mg Capsule|Amoxycillin|Capsule|strip of 10 capsules||abx|32.81|1|29.9|1
StayHappi Amoxycillin 250mg Capsule|Amoxycillin|Capsule|strip of 10 capsules||abx|18.75|1|17.1|1
Zifi 100 Dry Syrup|Cefixime|Syrup|bottle of 30 ml oral suspension||abx|77.05|1|70.2|1
Taxim-O 400 Tablet|Cefixime|Tablet|strip of 10 tablets||abx|237.62|1|216|1
Taxim-O Forte Dry Syrup|Cefixime|Syrup|bottle of 60 ml oral suspension||abx|148.85|1|136|1
Ceftas 200 Tablet|Cefixime|Tablet|strip of 10 tablets||abx|99.93|1|91|1
Cefolac 200 Tablet|Cefixime|Tablet|strip of 10 tablets||abx|105.09|1|95.7|1
Mahacef 200 Tablet|Cefixime|Tablet|strip of 10 tablets||abx|99.76|1|90.9|1
Pantakind Tablet|Pantoprazole|Tablet|strip of 15 tablets||ppi|87.38||76.9|1
Pezover 40 Tablet|Pantoprazole|Tablet|strip of 15 tablets||ppi|100||73.2|1
Pantafol 40mg Tablet|Pantoprazole|Tablet|strip of 10 tablets||ppi|65||46.5|1
Pantosec Tablet|See pack for composition|Tablet|strip of 15 tablets||ppi|244.25||218|1
Pentaloc 40 Tablet|Pantoprazole|Tablet|strip of 15 tablets||ppi|143.63||91.2|1
Zovanta 40 Tablet|Pantoprazole|Tablet|strip of 15 tablets||ppi|217.59||194|1
Omee Capsule|Omeprazole|Capsule|packet of 20 capsules||ppi|61.74||40.1|1
Omecip Capsule|Omeprazole|Capsule|strip of 15 capsules||ppi|45.2||27.7|1
Nogacid Capsule|Omeprazole|Capsule|strip of 15 capsules||ppi|46.29||29.2|1
Omefol Capsule|Omeprazole|Capsule|strip of 15 capsules||ppi|48.03||30.4|1
Omifyl Capsule|Omeprazole|Capsule|strip of 15 capsules||ppi|45.19||35.3|1
Omez Capsule|Omeprazole|Capsule|strip of 30 capsules||ppi|92.42||82.5|1
OCid 20 Capsule|Omeprazole|Capsule|strip of 20 capsules||ppi|61.3||52.7|1
Omee-D Capsule|Omeprazole|Capsule|strip of 20 capsules||ppi|215.6||136|1
Okamet 500 Tablet|Metformin|Tablet|strip of 20 tablets||dm|26.49|1|18.6|1
Debistal 500 SR Tablet|Metformin|Tablet|strip of 15 tablets||dm|34.6|1|21|1
Metform 1000mg Tablet SR|Metformin|Tablet|strip of 10 tablets||dm|42|1|26.5|1
Abomet 1000mg Tablet SR|Metformin|Tablet|strip of 15 tablets||dm|64.73|1|40.9|1
Metform 500mg Tablet|Metformin|Tablet|strip of 20 tablets||dm|41.5|1|32.4|1
Telgard 40 Tablet|Telmisartan|Tablet|strip of 10 tablets||htn|72.66|1|32.1|1
Telmikind 40 Tablet|Telmisartan|Tablet|strip of 15 tablets||htn|62.27|1|56.7|1
AMlip 5 Tablet|Amlodipine|Tablet|strip of 10 tablets||htn|26.66|1|15.1|1
AMlip 2.5 Tablet|Amlodipine|Tablet|strip of 10 tablets||htn|19.21|1|11.6|1
AMlip 10 Tablet|Amlodipine|Tablet|strip of 10 tablets||htn|58.57|1|35.2|1
Abamlo 5 Tablet|Amlodipine|Tablet|strip of 10 tablets||htn|26.14|1|20.2|1
Wellamo 5 Tablet|Amlodipine|Tablet|strip of 14 tablets||htn|36.7|1|28.7|1
AMlong Tablet|Amlodipine|Tablet|strip of 30 tablets||htn|80.51|1|70.1|1
Stamlo 2.5 Tablet|Amlodipine|Tablet|strip of 30 tablets||htn|57.64|1|52.5|1
Amlopres 5 Tablet|Amlodipine|Tablet|strip of 30 tablets||htn|80.62|1|73.4|1
LipVAS 10 Tablet|Atorvastatin|Tablet|strip of 10 tablets||lipid|53.44|1|27.2|1
LipVAS 20 Tablet|Atorvastatin|Tablet|strip of 10 tablets||lipid|135.03|1|60.5|1
LipVAS 40 Tablet|Atorvastatin|Tablet|strip of 10 tablets||lipid|207.57|1|93.3|1
ATR 80 Tablet|Atorvastatin|Tablet|strip of 10 tablets||lipid|425|1|255|1
Cardiozen 10mg Tablet|Atorvastatin|Tablet|strip of 10 tablets||lipid|52|1|31.2|1
CETcip Tablet|Cetirizine|Tablet|strip of 10 tablets||allergy|20.05||12.4|1
Stanhist 10 Tablet|Cetirizine|Tablet|strip of 10 tablets||allergy|18.13||11.4|1
New Okacet Tablet|Cetirizine|Tablet|strip of 10 tablets||allergy|20.05||12.4|1
Cetrizine Syrup|Cetirizine|Syrup|bottle of 30 ml syrup||allergy|20.5||13.4|1
Leecet Tablet|Cetirizine|Tablet|strip of 10 tablets||allergy|19.5||12.1|1
Cetrizine 5mg Syrup|Cetirizine|Syrup|bottle of 60 ml syrup||allergy|41.25||37.5|1
Cetriver 10mg Tablet|Cetirizine|Tablet|strip of 10 tablets||allergy|19.5||12.1|1
Minolast 10 Tablet|Montelukast|Tablet|strip of 10 tablets||allergy|120|1|74.5|1
Montu 10mg Tablet|Montelukast|Tablet|strip of 10 tablets||allergy|172|1|106|1
Minolast FX 10mg/120mg Tablet|Montelukast|Tablet|strip of 10 tablets||allergy|149|1|91.7|1
Montecip FX 10mg/120mg Tablet|Montelukast|Tablet|strip of 10 tablets||allergy|229.49|1|143|1
Levozet M Tablet|Montelukast|Tablet|strip of 10 tablets||allergy|75|1|46.6|1
Montas-FX Tablet|Montelukast|Tablet|strip of 10 tablets||allergy|235.78|1|147|1
Alrgee M 10mg/120mg Tablet|Montelukast|Tablet|strip of 10 tablets||allergy|225|1|205|1
EUthyrox 75 Tablet|Levothyroxine|Tablet|bottle of 100 tablets||thy|153.71|1|145|1
EUthyrox 25 Tablet|Levothyroxine|Tablet|bottle of 100 tablets||thy|154.74|1|146|1
EUthyrox 50 Tablet|Levothyroxine|Tablet|bottle of 100 tablets||thy|110.68|1|104|1
EUthyrox 100 Tablet|Levothyroxine|Tablet|bottle of 100 tablets||thy|140.63|1|133|1
EUthyrox 12.5mcg Tablet|Levothyroxine|Tablet|bottle of 100 tablets||thy|159.08|1|149|1
EUthyrox 150mcg Tablet|Levothyroxine|Tablet|bottle of 100 tablets||thy|182.7|1|166|1
Recalmin D3 60K IU Softgel Capsule|Cholecalciferol (Vitamin D3)|Capsule|strip of 4 capsules||vit|125||75.1|1
Calcitas -D3 Soft Gelatin Capsule|Cholecalciferol (Vitamin D3)|Capsule|strip of 4 capsules||vit|131.54||85.4|1
Lumia 60K Capsule|Cholecalciferol (Vitamin D3)|Capsule|strip of 8 capsules||vit|264.65||246|1
Dr ExcelD3 Capsule|Cholecalciferol (Vitamin D3)|Capsule|strip of 8 capsules||vit|236.05||113|1
Calcigen D3 Softgel Capsule|Cholecalciferol (Vitamin D3)|Capsule|strip of 4 capsules||vit|132.34||99.3|1
Uprise-D3 60K Syrup Sugar Free|Cholecalciferol (Vitamin D3)|Syrup|bottle of 5 ml syrup||vit|96.4||89.6|1
Vitanova - D3 Drop|Cholecalciferol (Vitamin D3)|Drops|bottle of 15 ml drop||vit|125.1||110|1
Recalmin-XT Tablet|Cholecalciferol (Vitamin D3)|Tablet|strip of 15 tablets||vit|275||184|1
Shelcal - HD Tablet|Calcium + Vitamin D3|Tablet|strip of 15 tablets||vit|170.9||157|1
Supracal Tablet|Calcium + Vitamin D3|Tablet|strip of 15 tablets||vit|215||200|1
Clocip Clotrimazole Cream (15 gm)|Clotrimazole|Cream|tube of 15 gm cream||derm|48.03||40.4|1
Candid Multi-Benefit Skin Cream|Clotrimazole|Cream|tube of 30 gm cream||derm|96.71||88.2|1
Abzorb Anti Fungal Dusting Powder|Clotrimazole|Powder|bottle of 120 gm dusting powder||derm|175||154|1
Candid Dusting Powder 60 gm|Clotrimazole|Powder|bottle of 60 gm dusting powder||derm|97.5||92.5|1
Candid Dusting Powder 250 gm|Clotrimazole|Powder|bottle of 250 gm dusting powder||derm|280||246|1
Leezole Dusting Powder|Clotrimazole|Powder|box of 100 gm dusting powder||derm|103||63.9|1
Dabur Honitus Honey-Based Ayurvedic Cough Syrup|See pack for composition|Syrup|bottle of 100 ml syrup||cough|130||104|1
Dabur Honitus Adulsa Cough Syrup|See pack for composition|Syrup|bottle of 100 ml syrup||cough|99||79.1|1
SBL Stobal Cough Syrup 180 ml|See pack for composition|Syrup|bottle of 180 ml syrup||cough|178||137|1
Reswas Cough Syrup Sugar Free|See pack for composition|Syrup|bottle of 120 ml syrup||cough|163.44||149|1
Zedex Cough Syrup|See pack for composition|Syrup|bottle of 100 ml syrup||cough|197.48||180|1
SBL Stobal Cough Syrup 500 ml|See pack for composition|Syrup|bottle of 500 ml syrup||cough|309||244|1
Supradyn Daily Multivitamin Tablet (Bottle of 60)|See pack for composition|Tablet|bottle of 60 tablets||vit|293||270|1
A to Z NS+ Daily Multivitamin Tablets|See pack for composition|Tablet|strip of 15 tablets||vit|190||170|1
Centrum Multivitamin For Women|See pack for composition|Tablet|bottle of 50 tablets||vit|720||581|1
Centrum Multivitamin for Men|See pack for composition|Tablet|bottle of 50 tablets||vit|720||575|1
Itone Eye Drop|See pack for composition|Drops|bottle of 10 ml eye drop||eye|72||64.8|1
LUBImoist Eye Drop|See pack for composition|Drops|bottle of 10 ml eye drop||eye|361.85||300|1
Lubimoist-PF Eye Drop Preservative Free|See pack for composition|Drops|bottle of 10 ml eye drop||eye|361.85||296|1
HYLosoft Eye Drop|See pack for composition|Drops|packet of 10 ml eye drop||eye|475||409|1
Livetone UD 300mg Tablet|Ursodeoxycholic Acid|Tablet|strip of 10 tablets||liver|387.2|1|322|1
Ursolid 300mg Tablet|Ursodeoxycholic Acid|Tablet|strip of 10 tablets||liver|350|1|322|1
Udiwok 300 Tablet|Ursodeoxycholic Acid|Tablet|strip of 15 tablets||liver|700.7|1|590|1
Livetone UD 150mg Tablet|Ursodeoxycholic Acid|Tablet|strip of 10 tablets||liver|229.9|1|178|1
Ursolid 150 Tablet|Ursodeoxycholic Acid|Tablet|strip of 10 tablets||liver|180|1|125|1
Uditec 300 Tablet|Ursodeoxycholic Acid|Tablet|strip of 10 tablets||liver|350|1|319|1
Uditec 150mg Tablet|Ursodeoxycholic Acid|Tablet|strip of 10 tablets||liver|180|1|121|1
Udinol 300mg Tablet|Ursodeoxycholic Acid|Tablet|strip of 10 tablets||liver|580|1|366|1
Dettol Antiseptic Disinfectant Liquid 125 ml|See pack for composition|Liquid|bottle of 125 ml liquid||pc|91.33||86.9|1
Dettol Antiseptic Disinfectant Liquid 250 ml|See pack for composition|Liquid|bottle of 250 ml liquid||pc|167.34||160|1
Dettol Antiseptic Disinfectant Liquid 750 ml|See pack for composition|Liquid|bottle of 750 ml liquid||pc|364.19||364.19|1
Dettol Antiseptic Disinfectant Liquid 1300 ml|See pack for composition|Liquid|bottle of 1300 ml liquid||pc|591.2||561|1
Dr Morepen BG 03 Gluco One Glucometer Kit|See pack for composition|Device|box of 1 kit||dm|1085||467|1
Accu-Chek Active Blood Glucometer Kit|See pack for composition|Device|packet of 1 kit||dm|1124||921|1
Instant S Blood Glucometer with 10 Test Strips|See pack for composition|Device|box of 1 unit||dm|890||819|1
Contour Plus Sugar Testing Machine|See pack for composition|Device|box of 1 unit||dm|820||820|1
Accu-Chek Instant Glucometer Combo Pack|See pack for composition|Device|box of 1 unit||dm|1499||1339|1
FreeStyle Libre 2 Plus Sensor|See pack for composition|Device|box of 1 unit||dm|5138||4624|1
Contour Plus Elite Blood Glucose Monitor|See pack for composition|Device|box of 1 unit||dm|1124||1067|1
Dr Morepen BG 03 Gluco One Glucometer|See pack for composition|Device|box of 1 unit||dm|620||427|1
Eno Fruit Salt Sachet Lemon|See pack for composition|Powder|box of 6 sachets||antacid|60||55.4|1
Boroline Cream SX Antiseptic Ayurvedic|See pack for composition|Cream|tube of 20 gm cream||ayur|42.2||42.2|1
Kayam Ayurvedic Tablet|See pack for composition|Tablet|bottle of 30 tablets||ayur|125||116|1
Ashwagandha Capsules 500mg (Tata 1mg Tejasya)|See pack for composition|Capsule|bottle of 60 capsules||ayur|201||162|1
Boroline SX Antiseptic Ayurvedic Cream|See pack for composition|Cream|tube of 19 gm cream||ayur|40||40|1
Himalaya Gokshura Ayurvedic Tablets For Men|See pack for composition|Tablet|bottle of 60 tablets||ayur|275||226|1
`.trim().split('\n');

  const hash = s => { let h = 7; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; };
  const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const meds = SEED.map((line, i) => {
    const [name, comp, form, pack, marketer, cls, mrp, rx, pp, cx] = line.split('|');
    const h = hash(name);
    const mrpN = +mrp;
    const FIX = { 'Dolo 650 Tablet': 12, 'Dolo 500 Tablet': 4, 'Cofsils Gargle': 52, 'Clocip Anti-Fungal Dusting Powder': 25, 'Omnigel Gel': 32, 'Cipcal D3 Granules': 35, 'Gemsoline Soft Gelatin Capsule': 35, 'Tugain Twins 5 Solution': 25, 'Eloway Aloe Vera Moisturizing Gel': 33 };
    const real = pp ? +pp : null;
    const d = real !== null ? Math.max(0, Math.round((1 - real / mrpN) * 100)) : name in FIX ? FIX[name] : [0, 5, 8, 10, 12, 15, 18, 20, 25, 30, 35][h % 11];
    const price = real !== null ? real : +(mrpN * (1 - d / 100)).toFixed(mrpN < 100 ? 1 : 0);
    const c = CL[cls];
    const reviews = (h % 7 === 0) ? 0 : 6 + (h % 3600);
    return {
      id: 74000 + i * 37 + (h % 30), slug: slug(name), name, comp, form, pack, marketer, cls,
      mrp: mrpN, price: d ? price : (real !== null ? real : mrpN), off: d, rx: rx === '1', cx: cx === '1',
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

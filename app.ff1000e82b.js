(() => {
'use strict';

/* ================= data + constants ================= */
const EMBED = JSON.parse(document.getElementById('snapshot').textContent);
let site = EMBED;
const app = document.getElementById('app');
const LANGS = ['en', 'hi', 'pa'];
const LANG_LABEL = { en: 'EN', hi: 'हिन्दी', pa: 'ਪੰਜਾਬੀ' };
const LANG_FULL = { en: 'English', hi: 'हिन्दी', pa: 'ਪੰਜਾਬੀ' };
const SECTIONS = ['community', 'civic', 'business', 'education', 'culture', 'sport', 'india'];
const NEWS = 'news@themelbourneindian.com.au';
const PUBLIC_URL = 'https://themelbourneindian.com.au';
const SHARE_T = { en: ['Share', 'Copy link', 'Link copied'], hi: ['शेयर करें', 'लिंक कॉपी करें', 'लिंक कॉपी हो गया'], pa: ['ਸਾਂਝਾ ਕਰੋ', 'ਲਿੰਕ ਕਾਪੀ ਕਰੋ', 'ਲਿੰਕ ਕਾਪੀ ਹੋ ਗਿਆ'] };
const ADS = 'ads@themelbourneindian.com.au';
const SUP_ONCE = 'https://buy.stripe.com/aFa9AU8QR4VUa1iaSlenS00';
const SUP_MONTH = 'https://buy.stripe.com/6oU3cwebb9ca2yQe4xenS01';
const SUP_PORTAL = 'https://billing.stripe.com/p/login/aFa9AU8QR4VUa1iaSlenS00';
const SUP = {
  en: { nav: 'Support us', title: 'Support independent news', dek: 'The Melbourne Indian is free to read, in English, Hindi and Punjabi. Reader support keeps it that way.',
    p: ['We are a small, independent newsroom covering Melbourne\'s Indian communities every day: local and state news, visas and settling in, the election, sport and community life. There is no paywall, and no one tells us what to cover.', 'Your contribution pays for reporting, for producing every story in three languages, and for the costs of running the site.'],
    month: 'Become a monthly supporter', monthSub: '$9.99 a month', once: 'Give once', onceSub: 'Any amount',
    small: 'Payments are processed securely by Stripe. We never see your card details. The Melbourne Indian is not a registered charity, so contributions are not tax deductible. You can cancel monthly support at any time using the link above, or by emailing', boxT: 'Free news, kept free by readers', boxP: 'If this story helped you, help keep The Melbourne Indian going.', boxC: 'Support us', manage: 'Already a monthly supporter? Manage or cancel' },
  hi: { nav: 'सहयोग करें', title: 'स्वतंत्र पत्रकारिता का साथ दें', dek: 'द मेलबर्न इंडियन अंग्रेज़ी, हिंदी और पंजाबी में मुफ़्त पढ़ा जा सकता है। पाठकों का सहयोग इसे मुफ़्त बनाए रखता है।',
    p: ['हम एक छोटा, स्वतंत्र न्यूज़रूम हैं जो हर दिन मेलबर्न के भारतीय समुदायों की ख़बरें देता है: स्थानीय और राज्य की ख़बरें, वीज़ा और नई ज़िंदगी बसाना, चुनाव, खेल और सामुदायिक जीवन। कोई पेवॉल नहीं, और हमें कोई नहीं बताता कि क्या छापना है।', 'आपका योगदान रिपोर्टिंग, हर ख़बर को तीन भाषाओं में तैयार करने और साइट चलाने के ख़र्च में काम आता है।'],
    month: 'मासिक सहयोगी बनें', monthSub: '$9.99 हर महीने', once: 'एक बार दें', onceSub: 'कोई भी राशि',
    small: 'भुगतान Stripe के ज़रिए सुरक्षित रूप से होता है। हम आपके कार्ड की जानकारी कभी नहीं देखते। द मेलबर्न इंडियन पंजीकृत चैरिटी नहीं है, इसलिए योगदान पर टैक्स छूट नहीं मिलती। मासिक सहयोग ऊपर दिए लिंक से कभी भी रद्द करें, या ईमेल करें:', boxT: 'मुफ़्त ख़बरें, आपके सहयोग से', boxP: 'अगर यह ख़बर आपके काम आई, तो द मेलबर्न इंडियन को चलाए रखने में मदद करें।', boxC: 'सहयोग करें', manage: 'पहले से मासिक सहयोगी हैं? बदलें या रद्द करें' },
  pa: { nav: 'ਸਹਿਯੋਗ ਕਰੋ', title: 'ਆਜ਼ਾਦ ਪੱਤਰਕਾਰੀ ਦਾ ਸਾਥ ਦਿਓ', dek: 'ਦ ਮੈਲਬਰਨ ਇੰਡੀਅਨ ਅੰਗਰੇਜ਼ੀ, ਹਿੰਦੀ ਅਤੇ ਪੰਜਾਬੀ ਵਿੱਚ ਮੁਫ਼ਤ ਪੜ੍ਹਿਆ ਜਾ ਸਕਦਾ ਹੈ। ਪਾਠਕਾਂ ਦਾ ਸਹਿਯੋਗ ਇਸਨੂੰ ਮੁਫ਼ਤ ਰੱਖਦਾ ਹੈ।',
    p: ['ਅਸੀਂ ਇੱਕ ਛੋਟਾ, ਆਜ਼ਾਦ ਨਿਊਜ਼ਰੂਮ ਹਾਂ ਜੋ ਹਰ ਰੋਜ਼ ਮੈਲਬਰਨ ਦੇ ਭਾਰਤੀ ਭਾਈਚਾਰਿਆਂ ਦੀਆਂ ਖ਼ਬਰਾਂ ਦਿੰਦਾ ਹੈ: ਸਥਾਨਕ ਅਤੇ ਸੂਬੇ ਦੀਆਂ ਖ਼ਬਰਾਂ, ਵੀਜ਼ਾ ਅਤੇ ਨਵੀਂ ਜ਼ਿੰਦਗੀ ਵਸਾਉਣਾ, ਚੋਣਾਂ, ਖੇਡਾਂ ਅਤੇ ਭਾਈਚਾਰਕ ਜੀਵਨ। ਕੋਈ ਪੇਅਵਾਲ ਨਹੀਂ, ਅਤੇ ਸਾਨੂੰ ਕੋਈ ਨਹੀਂ ਦੱਸਦਾ ਕਿ ਕੀ ਛਾਪਣਾ ਹੈ।', 'ਤੁਹਾਡਾ ਯੋਗਦਾਨ ਰਿਪੋਰਟਿੰਗ, ਹਰ ਖ਼ਬਰ ਨੂੰ ਤਿੰਨ ਭਾਸ਼ਾਵਾਂ ਵਿੱਚ ਤਿਆਰ ਕਰਨ ਅਤੇ ਸਾਈਟ ਚਲਾਉਣ ਦੇ ਖ਼ਰਚੇ ਵਿੱਚ ਕੰਮ ਆਉਂਦਾ ਹੈ।'],
    month: 'ਮਹੀਨਾਵਾਰ ਸਹਿਯੋਗੀ ਬਣੋ', monthSub: '$9.99 ਹਰ ਮਹੀਨੇ', once: 'ਇੱਕ ਵਾਰ ਦਿਓ', onceSub: 'ਕੋਈ ਵੀ ਰਕਮ',
    small: 'ਭੁਗਤਾਨ Stripe ਰਾਹੀਂ ਸੁਰੱਖਿਅਤ ਢੰਗ ਨਾਲ ਹੁੰਦਾ ਹੈ। ਅਸੀਂ ਤੁਹਾਡੇ ਕਾਰਡ ਦੀ ਜਾਣਕਾਰੀ ਕਦੇ ਨਹੀਂ ਦੇਖਦੇ। ਦ ਮੈਲਬਰਨ ਇੰਡੀਅਨ ਰਜਿਸਟਰਡ ਚੈਰਿਟੀ ਨਹੀਂ ਹੈ, ਇਸ ਲਈ ਯੋਗਦਾਨ \'ਤੇ ਟੈਕਸ ਛੋਟ ਨਹੀਂ ਮਿਲਦੀ। ਮਹੀਨਾਵਾਰ ਸਹਿਯੋਗ ਉੱਪਰ ਦਿੱਤੇ ਲਿੰਕ ਤੋਂ ਕਦੇ ਵੀ ਰੱਦ ਕਰੋ, ਜਾਂ ਈਮੇਲ ਕਰੋ:', boxT: 'ਮੁਫ਼ਤ ਖ਼ਬਰਾਂ, ਤੁਹਾਡੇ ਸਹਿਯੋਗ ਨਾਲ', boxP: 'ਜੇ ਇਹ ਖ਼ਬਰ ਤੁਹਾਡੇ ਕੰਮ ਆਈ, ਤਾਂ ਦ ਮੈਲਬਰਨ ਇੰਡੀਅਨ ਨੂੰ ਚਲਦਾ ਰੱਖਣ ਵਿੱਚ ਮਦਦ ਕਰੋ।', boxC: 'ਸਹਿਯੋਗ ਕਰੋ', manage: 'ਪਹਿਲਾਂ ਹੀ ਮਹੀਨਾਵਾਰ ਸਹਿਯੋਗੀ ਹੋ? ਬਦਲੋ ਜਾਂ ਰੱਦ ਕਰੋ' } };
const SUP_PERKS = {"en": {"h": "What monthly supporters get", "li": ["Your name on our Founding Supporters wall, if you'd like it there", "The Friday newsletter a day early, on Thursday night", "The Weekly Edition: a designed digital paper of the week's best stories in English, Hindi or Punjabi, every Sunday (starting soon)", "A monthly supporters-only poll on what we cover next", "First invitations to our supporter events and meetups"], "free": "The news itself stays free for everyone.", "wallT": "Founding Supporters", "wallE": "Be the first name on the wall."}, "hi": {"h": "मासिक सहयोगियों को क्या मिलता है", "li": ["हमारी फ़ाउंडिंग सपोर्टर्स सूची में आपका नाम, अगर आप चाहें", "शुक्रवार का न्यूज़लेटर एक दिन पहले, गुरुवार रात", "वीकली एडिशन: हफ़्ते की सबसे अच्छी ख़बरों का डिज़ाइन किया हुआ डिजिटल अख़बार, हिंदी, अंग्रेज़ी या पंजाबी में, हर रविवार (जल्द शुरू)", "हर महीने सिर्फ़ सहयोगियों के लिए पोल: आगे हम किस विषय पर लिखें", "हमारे सहयोगी कार्यक्रमों और मुलाक़ातों के पहले निमंत्रण"], "free": "ख़बरें सबके लिए मुफ़्त रहेंगी।", "wallT": "फ़ाउंडिंग सपोर्टर्स", "wallE": "इस सूची में पहला नाम आपका हो सकता है।"}, "pa": {"h": "ਮਹੀਨਾਵਾਰ ਸਹਿਯੋਗੀਆਂ ਨੂੰ ਕੀ ਮਿਲਦਾ ਹੈ", "li": ["ਸਾਡੀ ਫਾਊਂਡਿੰਗ ਸਪੋਰਟਰਜ਼ ਸੂਚੀ ਵਿੱਚ ਤੁਹਾਡਾ ਨਾਮ, ਜੇ ਤੁਸੀਂ ਚਾਹੋ", "ਸ਼ੁੱਕਰਵਾਰ ਦਾ ਨਿਊਜ਼ਲੈਟਰ ਇੱਕ ਦਿਨ ਪਹਿਲਾਂ, ਵੀਰਵਾਰ ਰਾਤ", "ਵੀਕਲੀ ਐਡੀਸ਼ਨ: ਹਫ਼ਤੇ ਦੀਆਂ ਸਭ ਤੋਂ ਵਧੀਆ ਖ਼ਬਰਾਂ ਦਾ ਡਿਜ਼ਾਈਨ ਕੀਤਾ ਡਿਜੀਟਲ ਅਖ਼ਬਾਰ, ਪੰਜਾਬੀ, ਅੰਗਰੇਜ਼ੀ ਜਾਂ ਹਿੰਦੀ ਵਿੱਚ, ਹਰ ਐਤਵਾਰ (ਜਲਦ ਸ਼ੁਰੂ)", "ਹਰ ਮਹੀਨੇ ਸਿਰਫ਼ ਸਹਿਯੋਗੀਆਂ ਲਈ ਪੋਲ: ਅੱਗੇ ਅਸੀਂ ਕਿਸ ਵਿਸ਼ੇ 'ਤੇ ਲਿਖੀਏ", "ਸਾਡੇ ਸਹਿਯੋਗੀ ਸਮਾਗਮਾਂ ਅਤੇ ਮਿਲਣੀਆਂ ਦੇ ਪਹਿਲੇ ਸੱਦੇ"], "free": "ਖ਼ਬਰਾਂ ਸਭ ਲਈ ਮੁਫ਼ਤ ਰਹਿਣਗੀਆਂ।", "wallT": "ਫਾਊਂਡਿੰਗ ਸਪੋਰਟਰਜ਼", "wallE": "ਇਸ ਸੂਚੀ ਵਿੱਚ ਪਹਿਲਾ ਨਾਮ ਤੁਹਾਡਾ ਹੋ ਸਕਦਾ ਹੈ।"}};
const SUP_WALL = []; // names supporters asked to show (from the Stripe checkout field)
function supBtns(l) { const u = SUP[l] || SUP.en; return `<div class="sup-btns"><a class="sup-b sup-m" data-sup="monthly" href="${SUP_MONTH}" target="_blank" rel="noopener"><b>${esc(u.month)}</b><span>${esc(u.monthSub)}</span></a><a class="sup-b sup-o" data-sup="once" href="${SUP_ONCE}" target="_blank" rel="noopener"><b>${esc(u.once)}</b><span>${esc(u.onceSub)}</span></a></div>`; }
function supBox(l) { const u = SUP[l] || SUP.en; return `<aside class="sup-box" aria-label="${esc(u.nav)}"><h2>${esc(u.boxT)}</h2><p>${esc(u.boxP)}</p><a class="btn" href="${href.page(l, 'support')}">${esc(u.boxC)}</a></aside>`; }

const T = {
  en: {
    tagline: 'Indian roots. Melbourne stories.', edition: 'Melbourne edition', free: 'Free to read',
    sec: { community: 'Community', civic: 'Civic', business: 'Business', education: 'Education', culture: 'Culture & Faith', sport: 'Sport', india: 'India–Australia' },
    secDesc: { community: 'Local news from Melbourne\'s Indian communities.', civic: 'State and local government, elections and your rights.', business: 'Local business, grants and trade.', education: 'Schools, universities and international students.', culture: 'Festivals, faith and the arts.', sport: 'Cricket first, plus kabaddi, hockey and the local clubs and players from Melbourne\'s Indian communities.', india: 'The relationship between India and Australia, and what it means here.' },
    type: { news: 'News', explainer: 'Explainer', guide: 'Guide', analysis: 'Analysis', notice: 'From the publisher' },
    home: 'Home', latest: 'Latest', dates: 'Dates to know', keyDates: 'Key dates', more: 'More', moreIn: 'More in', all: 'All stories',
    guides: 'Practical guides', guidesSub: 'Useful information for Melbourne families, students and businesses.',
    min: 'min read', by: 'By', sources: 'Sources', checked: 'checked', corrections: 'Corrections', otherLangs: 'Also in',
    reportErr: 'Spotted an error? Email', newsletter: 'Newsletter', directory: 'Business directory', advertise: 'Advertise', contact: 'Contact',
    about: 'About us', standards: 'Editorial standards', ad: 'Advertisement', photo: 'Photo',
    nlTitle: 'The Melbourne Indian, in your inbox', nlText: 'A short weekly briefing on what matters to Melbourne\'s Indian communities, in English, Hindi or Punjabi.',
    dirTitle: 'Find local Indian-owned businesses', dirText: 'Local businesses, places of worship and community organisations serving Melbourne\'s Indian communities. Every listing is checked against public sources, and businesses can claim, correct or remove theirs.',
    enOnly: 'In English', enOnlyNote: 'These stories are currently available in English.', readEn: 'Read in English', notInLang: '',
    translatedNote: '', empty: 'No stories here yet.', subscribe: 'Subscribe', listBiz: 'List your business',
    houseAdTitle: 'Reach Melbourne\'s Indian communities', houseAdText: 'Founding advertising packages in English, Hindi and Punjabi.', houseAdCta: 'Advertise with us',
    footAbout: 'An independent, free-to-read news service for Melbourne\'s Indian communities, in English, Hindi and Punjabi.',
    sections: 'Sections', publication: 'The publication', editions: 'Editions', workWith: 'Work with us'
  },
  hi: {
    tagline: 'भारतीय जड़ें। मेलबर्न की कहानियाँ।', edition: 'मेलबर्न संस्करण', free: 'पढ़ना निःशुल्क',
    sec: { community: 'समुदाय', civic: 'नागरिक', business: 'व्यापार', education: 'शिक्षा', culture: 'संस्कृति और आस्था', sport: 'खेल', india: 'भारत–ऑस्ट्रेलिया' },
    secDesc: { community: 'मेलबर्न के भारतीय समुदायों की स्थानीय ख़बरें।', civic: 'राज्य और स्थानीय सरकार, चुनाव और आपके अधिकार।', business: 'स्थानीय व्यवसाय, अनुदान और व्यापार।', education: 'स्कूल, विश्वविद्यालय और अंतरराष्ट्रीय छात्र।', culture: 'त्योहार, आस्था और कला।', sport: 'सबसे पहले क्रिकेट, साथ में कबड्डी, हॉकी, और मेलबर्न के भारतीय समुदायों के स्थानीय क्लब और खिलाड़ी।', india: 'भारत और ऑस्ट्रेलिया के रिश्ते, और यहाँ उनका असर।' },
    type: { news: 'समाचार', explainer: 'व्याख्या', guide: 'गाइड', analysis: 'विश्लेषण', notice: 'प्रकाशक की ओर से' },
    home: 'मुखपृष्ठ', latest: 'ताज़ा', dates: 'याद रखने वाली तारीख़ें', keyDates: 'मुख्य तारीख़ें', more: 'और', moreIn: 'और ख़बरें:', all: 'सभी ख़बरें',
    guides: 'काम की जानकारी', guidesSub: 'मेलबर्न के परिवारों, छात्रों और व्यवसायों के लिए उपयोगी जानकारी।',
    min: 'मिनट', by: 'लेखक:', sources: 'स्रोत', checked: 'जाँचा गया', corrections: 'सुधार', otherLangs: 'अन्य भाषा में',
    reportErr: 'ग़लती दिखी? ईमेल करें', newsletter: 'न्यूज़लेटर', directory: 'व्यवसाय निर्देशिका', advertise: 'विज्ञापन', contact: 'संपर्क',
    about: 'हमारे बारे में', standards: 'संपादकीय मानक', ad: 'विज्ञापन', photo: 'फ़ोटो',
    nlTitle: 'द मेलबर्न इंडियन, आपके इनबॉक्स में', nlText: 'मेलबर्न के भारतीय समुदायों से जुड़ी ज़रूरी बातों का साप्ताहिक संक्षिप्त समाचार, हिंदी, अंग्रेज़ी या पंजाबी में।',
    dirTitle: 'स्थानीय भारतीय व्यवसाय खोजें', dirText: 'मेलबर्न के भारतीय समुदायों की सेवा करने वाले स्थानीय व्यवसाय, पूजा स्थल और सामुदायिक संगठन। हर लिस्टिंग प्रकाशित होने से पहले जाँची जाती है।',
    enOnly: 'अंग्रेज़ी में', enOnlyNote: 'ये ख़बरें अभी अंग्रेज़ी में उपलब्ध हैं।', readEn: 'अंग्रेज़ी में पढ़ें',
    translatedNote: 'यह ख़बर अंग्रेज़ी से अनूदित है और मूल से मिलाई गई है। अनुवाद में ग़लती दिखे तो हमें बताएँ।', empty: 'यहाँ अभी कोई ख़बर नहीं है।', subscribe: 'सदस्यता लें', listBiz: 'अपना व्यवसाय जोड़ें',
    houseAdTitle: 'मेलबर्न के भारतीय समुदायों तक पहुँचें', houseAdText: 'अंग्रेज़ी, हिंदी और पंजाबी में शुरुआती विज्ञापन पैकेज।', houseAdCta: 'विज्ञापन दें',
    footAbout: 'मेलबर्न के भारतीय समुदायों के लिए अंग्रेज़ी, हिंदी और पंजाबी में एक स्वतंत्र, निःशुल्क समाचार सेवा।',
    sections: 'खंड', publication: 'प्रकाशन', editions: 'संस्करण', workWith: 'हमारे साथ'
  },
  pa: {
    tagline: 'ਭਾਰਤੀ ਜੜ੍ਹਾਂ। ਮੈਲਬਰਨ ਦੀਆਂ ਕਹਾਣੀਆਂ।', edition: 'ਮੈਲਬਰਨ ਐਡੀਸ਼ਨ', free: 'ਪੜ੍ਹਨਾ ਮੁਫ਼ਤ',
    sec: { community: 'ਭਾਈਚਾਰਾ', civic: 'ਨਾਗਰਿਕ', business: 'ਕਾਰੋਬਾਰ', education: 'ਸਿੱਖਿਆ', culture: 'ਸੱਭਿਆਚਾਰ ਤੇ ਆਸਥਾ', sport: 'ਖੇਡਾਂ', india: 'ਭਾਰਤ–ਆਸਟ੍ਰੇਲੀਆ' },
    secDesc: { community: 'ਮੈਲਬਰਨ ਦੇ ਭਾਰਤੀ ਭਾਈਚਾਰਿਆਂ ਦੀਆਂ ਸਥਾਨਕ ਖ਼ਬਰਾਂ।', civic: 'ਸੂਬਾ ਅਤੇ ਸਥਾਨਕ ਸਰਕਾਰ, ਚੋਣਾਂ ਅਤੇ ਤੁਹਾਡੇ ਹੱਕ।', business: 'ਸਥਾਨਕ ਕਾਰੋਬਾਰ, ਗ੍ਰਾਂਟਾਂ ਅਤੇ ਵਪਾਰ।', education: 'ਸਕੂਲ, ਯੂਨੀਵਰਸਿਟੀਆਂ ਅਤੇ ਕੌਮਾਂਤਰੀ ਵਿਦਿਆਰਥੀ।', culture: 'ਤਿਉਹਾਰ, ਆਸਥਾ ਅਤੇ ਕਲਾ।', sport: 'ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਕ੍ਰਿਕਟ, ਨਾਲ ਹੀ ਕਬੱਡੀ, ਹਾਕੀ, ਅਤੇ ਮੈਲਬਰਨ ਦੇ ਭਾਰਤੀ ਭਾਈਚਾਰਿਆਂ ਦੇ ਸਥਾਨਕ ਕਲੱਬ ਅਤੇ ਖਿਡਾਰੀ।', india: 'ਭਾਰਤ ਅਤੇ ਆਸਟ੍ਰੇਲੀਆ ਦੇ ਰਿਸ਼ਤੇ, ਅਤੇ ਇੱਥੇ ਉਨ੍ਹਾਂ ਦਾ ਅਸਰ।' },
    type: { news: 'ਖ਼ਬਰ', explainer: 'ਵਿਆਖਿਆ', guide: 'ਗਾਈਡ', analysis: 'ਵਿਸ਼ਲੇਸ਼ਣ', notice: 'ਪ੍ਰਕਾਸ਼ਕ ਵੱਲੋਂ' },
    home: 'ਮੁੱਖ ਪੰਨਾ', latest: 'ਤਾਜ਼ਾ', dates: 'ਯਾਦ ਰੱਖਣ ਵਾਲੀਆਂ ਤਰੀਕਾਂ', keyDates: 'ਮੁੱਖ ਤਰੀਕਾਂ', more: 'ਹੋਰ', moreIn: 'ਹੋਰ ਖ਼ਬਰਾਂ:', all: 'ਸਾਰੀਆਂ ਖ਼ਬਰਾਂ',
    guides: 'ਕੰਮ ਦੀ ਜਾਣਕਾਰੀ', guidesSub: 'ਮੈਲਬਰਨ ਦੇ ਪਰਿਵਾਰਾਂ, ਵਿਦਿਆਰਥੀਆਂ ਅਤੇ ਕਾਰੋਬਾਰਾਂ ਲਈ ਲਾਭਦਾਇਕ ਜਾਣਕਾਰੀ।',
    min: 'ਮਿੰਟ', by: 'ਲੇਖਕ:', sources: 'ਸਰੋਤ', checked: 'ਜਾਂਚਿਆ', corrections: 'ਸੋਧਾਂ', otherLangs: 'ਹੋਰ ਬੋਲੀ ਵਿੱਚ',
    reportErr: 'ਗ਼ਲਤੀ ਦਿਸੀ? ਈਮੇਲ ਕਰੋ', newsletter: 'ਨਿਊਜ਼ਲੈਟਰ', directory: 'ਕਾਰੋਬਾਰ ਡਾਇਰੈਕਟਰੀ', advertise: 'ਇਸ਼ਤਿਹਾਰ', contact: 'ਸੰਪਰਕ',
    about: 'ਸਾਡੇ ਬਾਰੇ', standards: 'ਸੰਪਾਦਕੀ ਨਿਯਮ', ad: 'ਇਸ਼ਤਿਹਾਰ', photo: 'ਫ਼ੋਟੋ',
    nlTitle: 'ਦ ਮੈਲਬਰਨ ਇੰਡੀਅਨ, ਤੁਹਾਡੇ ਇਨਬਾਕਸ ਵਿੱਚ', nlText: 'ਮੈਲਬਰਨ ਦੇ ਭਾਰਤੀ ਭਾਈਚਾਰਿਆਂ ਲਈ ਜ਼ਰੂਰੀ ਗੱਲਾਂ ਦਾ ਹਫ਼ਤਾਵਾਰੀ ਸੰਖੇਪ, ਪੰਜਾਬੀ, ਅੰਗਰੇਜ਼ੀ ਜਾਂ ਹਿੰਦੀ ਵਿੱਚ।',
    dirTitle: 'ਸਥਾਨਕ ਭਾਰਤੀ ਕਾਰੋਬਾਰ ਲੱਭੋ', dirText: 'ਮੈਲਬਰਨ ਦੇ ਭਾਰਤੀ ਭਾਈਚਾਰਿਆਂ ਦੀ ਸੇਵਾ ਕਰਨ ਵਾਲੇ ਸਥਾਨਕ ਕਾਰੋਬਾਰ, ਧਾਰਮਿਕ ਸਥਾਨ ਅਤੇ ਭਾਈਚਾਰਕ ਸੰਸਥਾਵਾਂ। ਹਰ ਲਿਸਟਿੰਗ ਛਪਣ ਤੋਂ ਪਹਿਲਾਂ ਜਾਂਚੀ ਜਾਂਦੀ ਹੈ।',
    enOnly: 'ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ', enOnlyNote: 'ਇਹ ਖ਼ਬਰਾਂ ਅਜੇ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਉਪਲਬਧ ਹਨ।', readEn: 'ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਪੜ੍ਹੋ',
    translatedNote: 'ਇਹ ਖ਼ਬਰ ਅੰਗਰੇਜ਼ੀ ਤੋਂ ਅਨੁਵਾਦ ਕੀਤੀ ਗਈ ਹੈ ਅਤੇ ਮੂਲ ਨਾਲ ਮਿਲਾਈ ਗਈ ਹੈ। ਅਨੁਵਾਦ ਵਿੱਚ ਗ਼ਲਤੀ ਦਿਸੇ ਤਾਂ ਸਾਨੂੰ ਦੱਸੋ।', empty: 'ਇੱਥੇ ਅਜੇ ਕੋਈ ਖ਼ਬਰ ਨਹੀਂ।', subscribe: 'ਸਬਸਕ੍ਰਾਈਬ ਕਰੋ', listBiz: 'ਆਪਣਾ ਕਾਰੋਬਾਰ ਜੋੜੋ',
    houseAdTitle: 'ਮੈਲਬਰਨ ਦੇ ਭਾਰਤੀ ਭਾਈਚਾਰਿਆਂ ਤੱਕ ਪਹੁੰਚੋ', houseAdText: 'ਅੰਗਰੇਜ਼ੀ, ਹਿੰਦੀ ਅਤੇ ਪੰਜਾਬੀ ਵਿੱਚ ਸ਼ੁਰੂਆਤੀ ਇਸ਼ਤਿਹਾਰ ਪੈਕੇਜ।', houseAdCta: 'ਇਸ਼ਤਿਹਾਰ ਦਿਓ',
    footAbout: 'ਮੈਲਬਰਨ ਦੇ ਭਾਰਤੀ ਭਾਈਚਾਰਿਆਂ ਲਈ ਅੰਗਰੇਜ਼ੀ, ਹਿੰਦੀ ਅਤੇ ਪੰਜਾਬੀ ਵਿੱਚ ਇੱਕ ਆਜ਼ਾਦ, ਮੁਫ਼ਤ ਖ਼ਬਰ ਸੇਵਾ।',
    sections: 'ਹਿੱਸੇ', publication: 'ਪ੍ਰਕਾਸ਼ਨ', editions: 'ਐਡੀਸ਼ਨ', workWith: 'ਸਾਡੇ ਨਾਲ'
  }
};
const MONTHS = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  hi: ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'],
  pa: ['ਜਨਵਰੀ', 'ਫ਼ਰਵਰੀ', 'ਮਾਰਚ', 'ਅਪ੍ਰੈਲ', 'ਮਈ', 'ਜੂਨ', 'ਜੁਲਾਈ', 'ਅਗਸਤ', 'ਸਤੰਬਰ', 'ਅਕਤੂਬਰ', 'ਨਵੰਬਰ', 'ਦਸੰਬਰ']
};
const MON3 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = {
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  hi: ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'],
  pa: ['ਐਤਵਾਰ', 'ਸੋਮਵਾਰ', 'ਮੰਗਲਵਾਰ', 'ਬੁੱਧਵਾਰ', 'ਵੀਰਵਾਰ', 'ਸ਼ੁੱਕਰਵਾਰ', 'ਸ਼ਨੀਵਾਰ']
};

/* ================= helpers ================= */
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const today = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Australia/Melbourne' }).format(new Date());
const pd = s => { const [y, m, d] = String(s).split('-').map(Number); return new Date(Date.UTC(y, (m || 1) - 1, d || 1)); };
const longDate = (s, l) => { const d = pd(s); return `${DAYS[l][d.getUTCDay()]}${l === 'en' ? '' : ','} ${d.getUTCDate()} ${MONTHS[l][d.getUTCMonth()]} ${d.getUTCFullYear()}`; };
const shortDate = (s, l) => { const d = pd(s); return `${d.getUTCDate()} ${MONTHS[l][d.getUTCMonth()]} ${d.getUTCFullYear()}`; };
const hash = s => { let h = 2166136261; for (const c of String(s)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
const nowIso = () => new Date().toISOString();
const slugify = s => String(s).toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 70) || ('story-' + Date.now());
const okEmail = s => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s).trim());
const words = a => { let n = 0; for (const b of (a.en?.body || [])) { if (typeof b === 'string') n += b.split(/\s+/).length; else if (b.ul) n += b.ul.join(' ').split(/\s+/).length; else if (b.dl) n += b.dl.flat().join(' ').split(/\s+/).length; else if (b.note) n += b.note.split(/\s+/).length; } return n; };
const mins = a => (a.en?.body ? Math.max(1, Math.ceil(words(a) / 200)) : a.mins || 1);
function toast(msg) { const t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 3200); }
async function copyText(text, el) {
  try { await navigator.clipboard.writeText(text); toast('Copied'); }
  catch { if (el) { const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); toast('Selected. Press Ctrl+C or ⌘C to copy'); } }
}

/* ================= state ================= */
const S = {
  db: null, user: null, uid: null, isEditor: false, canWrite: null, assets: null, sample: null, artifact: null, downloads: null,
  desk: { articles: [], dates: [], enquiries: [], subscribers: [], submissions: [], tips: [], ads: [], directory: [], issues: [], audit: [], runs: [] },
  deskLoaded: false, deskStarted: false, deskErr: null, ui: {}
};

/* ================= routing ================= */
function route() {
  const h = decodeURIComponent(location.hash.replace(/^#/, ''));
  let m;
  if (!h || h === 'en') return { lang: 'en', view: 'home' };
  if (h === 'hi' || h === 'pa') return { lang: h, view: 'home' };
  if ((m = h.match(/^(en|hi|pa)-s-([a-z]+)$/))) return { lang: m[1], view: 'section', sec: m[2] };
  if ((m = h.match(/^(en|hi|pa)-a-([a-z0-9-]+)$/))) return { lang: m[1], view: 'article', slug: m[2] };
  if ((m = h.match(/^(en|hi|pa)-p-([a-z]+)$/))) return { lang: m[1], view: 'page', page: m[2] };
  if ((m = h.match(/^(en|hi|pa)-d-([a-z0-9-]+)$/))) return { lang: m[1], view: 'listing', slug: m[2] };
  if ((m = h.match(/^desk(?:-([a-z]+))?(?:-(.+))?$/))) return { lang: 'en', view: 'desk', dv: m[1] || 'overview', arg: m[2] || '' };
  return { lang: 'en', view: 'home' };
}
const href = {
  home: l => '#' + (l === 'en' ? 'en' : l),
  sec: (l, s) => `#${l}-s-${s}`,
  art: (l, s) => `#${l}-a-${s}`,
  page: (l, p) => `#${l}-p-${p}`,
  dir: (l, s) => `#${l}-d-${s}`,
  desk: (v, a) => '#desk' + (v ? '-' + v : '') + (a ? '-' + a : '')
};

/* ================= article access ================= */
const previewMode = () => S.isEditor && S.deskLoaded && S.ui.preview;
function allArticles() {
  if (previewMode()) return S.desk.articles.filter(a => a.status !== 'archived');
  return (site.articles || []).filter(a => a.status === 'published');
}
function sorted(list) { return [...list].sort((a, b) => (b.date || '').localeCompare(a.date || '') || (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || (b.priority || 0) - (a.priority || 0)); }
function findArticle(slug) {
  if (S.isEditor && S.deskLoaded) { const d = S.desk.articles.find(a => a.slug === slug); if (d) return d; }
  return (site.articles || []).find(a => a.slug === slug);
}
const has = (a, l) => !!(a && a[l] && a[l].headline);
const V = (a, l) => has(a, l) ? a[l] : a.en;
const vlang = (a, l) => has(a, l) ? l : 'en';

/* ================= visuals ================= */
const SKY = 'M0 320V226h30v-37h38v65h25V167h24v-44h15V90h8v33h15v44h23v88h17V192h38v-72h20v72h25V149h39v91h29v-78h31V98h15v-47h7V19h5v32h8v47h17v64h36v91h30v-74h22v-42h24v42h24V90h15v-48h10v48h17v135h31V166h25v-35h30v85h20v-59h42v98h20V135h19v-28h29v28h22v120h35V182h25v-43h27v43h13v138Z';
const SEC_BG = { community: ['#B9532A', '#E39A62'], civic: ['#1F3A2F', '#3F6B55'], business: ['#1C3550', '#3E6488'], education: ['#0C5960', '#3A9198'], culture: ['#8E5A08', '#D59A2C'], india: ['#6E2230', '#B4545F'], sport: ['#163F7A', '#3D79C9'] };
function cover(a, lang, opts = {}) {
  const [c1, c2] = SEC_BG[a.section] || SEC_BG.community;
  const h = hash(a.slug); const id = 'g' + (h % 100000);
  const fig = a.figure || {}; const fv = fig.value || ''; const fl = (fig[lang] || fig.en || '');
  let art = '';
  const rot = h % 360;
  switch (a.section) {
    case 'civic':
      art = `<g opacity=".28" transform="translate(${(h % 200) - 100},355) scale(1.45)"><path d="${SKY}" fill="#fff"/></g>`; break;
    case 'culture': {
      let p = ''; const n = 12 + (h % 6); const cx = 900 + (h % 120), cy = 300;
      for (let r = 0; r < 4; r++) for (let i = 0; i < n; i++) { const ang = (i / n) * Math.PI * 2 + r * .2; const rad = 70 + r * 70; p += `<circle cx="${(cx + Math.cos(ang) * rad).toFixed(1)}" cy="${(cy + Math.sin(ang) * rad).toFixed(1)}" r="${18 - r * 3}" fill="none" stroke="#fff" stroke-width="3"/>`; }
      art = `<g opacity=".3">${p}<circle cx="${cx}" cy="${cy}" r="34" fill="#fff" opacity=".6"/></g>`; break; }
    case 'business': {
      let bars = ''; for (let i = 0; i < 9; i++) { const bh = 80 + ((h >> i) % 7) * 40 + i * 18; bars += `<rect x="${640 + i * 58}" y="${640 - bh}" width="36" height="${bh}" fill="#fff"/>`; }
      let grid = ''; for (let y = 120; y < 675; y += 60) grid += `<line x1="0" x2="1200" y1="${y}" y2="${y}" stroke="#fff" stroke-width="1"/>`;
      art = `<g opacity=".14">${grid}</g><g opacity=".3">${bars}</g>`; break; }
    case 'education': {
      let l = ''; for (let y = 90; y < 675; y += 44) l += `<line x1="0" x2="1200" y1="${y}" y2="${y}" stroke="#fff" stroke-width="2"/>`;
      art = `<g opacity=".16">${l}</g><circle cx="${880 + (h % 160)}" cy="300" r="190" fill="none" stroke="#fff" stroke-width="22" opacity=".3"/>`; break; }
    case 'sport': {  // cricket pitch, creases and a ball
      const bx = 880 + (h % 140), by = 300;
      art = `<g opacity=".2" fill="none" stroke="#fff" stroke-width="10"><circle cx="${bx}" cy="${by}" r="240"/></g><g opacity=".32" fill="none" stroke="#fff"><rect x="${bx - 60}" y="30" width="120" height="615" stroke-width="6"/><line x1="${bx - 95}" x2="${bx + 95}" y1="115" y2="115" stroke-width="5"/><line x1="${bx - 95}" x2="${bx + 95}" y1="560" y2="560" stroke-width="5"/></g><g opacity=".6"><circle cx="${bx - 190}" cy="${by + 150}" r="48" fill="#fff"/><path d="M${bx - 214} ${by + 116} q24 34 0 68 M${bx - 166} ${by + 116} q-24 34 0 68" stroke="#163F7A" stroke-width="5" fill="none" stroke-dasharray="7 6"/></g>`; break; }
    case 'india':
      art = `<g opacity=".32" fill="none" stroke="#fff" stroke-width="16"><circle cx="760" cy="337" r="210"/><circle cx="1010" cy="337" r="210"/></g>`; break;
    default:
      art = `<g fill="none" stroke="#fff" opacity=".24" transform="rotate(${rot % 40 - 20} 900 300)"><circle cx="930" cy="250" r="140" stroke-width="3"/><circle cx="930" cy="250" r="210" stroke-width="40" opacity=".5"/><circle cx="930" cy="250" r="310" stroke-width="60" opacity=".35"/></g>`;
  }
  const big = opts.small ? 120 : 150;
  const fvSize = fv.length > 7 ? big * .7 : fv.length > 5 ? big * .85 : big;
  return `<svg viewBox="0 0 1200 675" preserveAspectRatio="xMinYMid slice" role="img" aria-label="${esc((fl ? fv + ' ' + fl : (V(a, lang).headline)))}">
<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
<rect width="1200" height="675" fill="url(#${id})"/>${art}
${fv ? `<text x="70" y="${opts.small ? 430 : 400}" fill="#fff" font-family="Newsreader, Georgia, serif" font-weight="600" font-size="${fvSize}" letter-spacing="-3">${esc(fv)}</text>` : ''}
${fl ? `<text x="74" y="${opts.small ? 500 : 480}" fill="#fff" opacity=".9" font-family="Source Sans 3, Mukta, Mukta Mahee, sans-serif" font-weight="600" font-size="${opts.small ? 40 : 36}">${esc(fl)}</text>` : ''}
</svg>`;
}
function media(a, lang, cls = '', withCap = false, eager = false) {
  const img = a.image;
  if (img && img.url) {
    const alt = (img.alt && (img.alt[lang] || img.alt.en)) || '';
    const cap = (img.caption && (img.caption[lang] || img.caption.en)) || '';
    const credit = img.credit ? `${T[lang].photo}: ${img.credit}${img.licence ? ' / ' + img.licence : ''}` : '';
    const el = `<div class="media ${cls}"><img src="${esc(img.url)}"${img.srcset ? ` srcset="${esc(img.srcset)}" sizes="${cls ? '(max-width:820px) 100vw, 360px' : '(max-width:820px) 100vw, 720px'}"` : ''} alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></div>`;
    return withCap ? `<figure>${el}<figcaption>${esc(cap)} ${credit ? `<span class="credit">${img.sourceUrl ? `<a href="${esc(img.sourceUrl)}" target="_blank" rel="noopener">${esc(credit)}</a>` : esc(credit)}</span>` : ''}</figcaption></figure>` : el;
  }
  return `<div class="media ${cls}">${cover(a, lang, { small: cls.includes('r43') || cls.includes('r11') })}</div>`;
}
const secVar = s => `style="--sec:var(--s-${esc(s)})"`;
function kicker(a, l) { return `<a class="kicker" ${secVar(a.section)} href="${href.sec(l, a.section)}">${esc(T[l].sec[a.section] || a.section)}</a>${a.type && a.type !== 'news' ? ` <span class="kicker type-tag">· ${esc(T[l].type[a.type] || '')}</span>` : ''}`; }
function statusBadge(a) { return a.status && a.status !== 'published' && previewMode() ? ` <span class="badge b-${esc(a.status)}">${esc(a.status)}</span>` : ''; }
function meta(a, l) { return `<div class="meta">${esc(shortDate(a.date, l))} · ${mins(a)} ${esc(T[l].min)}${statusBadge(a)}</div>`; }

/* ================= ads ================= */
function liveAds(slot) { const t = today(); return (site.ads || []).filter(x => x.slot === slot && x.status === 'live' && (!x.start || x.start <= t) && (!x.end || x.end >= t)); }
function adSlot(slot, l, seed = 0) {
  const ads = liveAds(slot);
  if (ads.length) {
    const ad = ads[seed % ads.length];
    return `<aside class="ad ad-${slot}" aria-label="${esc(T[l].ad)}"><span class="ad-label">${esc(T[l].ad)} · ${esc(ad.advertiser)}</span><h4>${esc(ad.headline)}</h4><p>${esc(ad.text || '')}</p>${ad.url ? `<a class="btn sm ghost" href="${esc(ad.url)}" target="_blank" rel="noopener sponsored">${esc(ad.cta || 'Learn more')}</a>` : ''}</aside>`;
  }
  return `<aside class="ad ad-house ad-${slot}" aria-label="${esc(T[l].ad)}"><span class="ad-label">${esc(T[l].ad)} · The Melbourne Indian</span><h4>${esc(T[l].houseAdTitle)}</h4><p>${esc(T[l].houseAdText)}</p><a class="btn sm" href="${href.page(l, 'advertise')}">${esc(T[l].houseAdCta)}</a></aside>`;
}

/* ================= key dates: countdown tags + moving ticker ================= */
const DUE_T = { en: ['Today', 'Tomorrow', n => `In ${n} days`], hi: ['आज', 'कल', n => `${n} दिन में`], pa: ['ਅੱਜ', 'ਭਲਕੇ', n => `${n} ਦਿਨਾਂ ਵਿੱਚ`] };
const daysTo = s => Math.round((pd(s) - pd(today())) / 864e5);
function dueTag(l, s) {
  const n = daysTo(s), w = DUE_T[l] || DUE_T.en;
  if (n < 0 || n > 7) return '';
  return `<span class="due${n === 0 ? ' is-today' : n === 1 ? ' is-soon' : ''}">${esc(n === 0 ? w[0] : n === 1 ? w[1] : w[2](n))}</span>`;
}
function tickerHtml(l, dates) {
  const set = hidden => dates.map(d => `<a href="${d.slug ? href.art(l, d.slug) : '#'}"${hidden ? ' tabindex="-1"' : ''}><span class="d tnum">${pd(d.date).getUTCDate()} ${esc(l === 'en' ? MON3[pd(d.date).getUTCMonth()] : MONTHS[l][pd(d.date).getUTCMonth()])}</span>${daysTo(d.date) <= 1 ? dueTag(l, d.date) : ''}${esc(d[l] || d.en)}</a><span class="sep" aria-hidden="true">/</span>`).join('');
  return `<div class="ticker"><div class="wrap ticker-in"><b class="ticker-l"><i aria-hidden="true"></i>${esc(T[l].keyDates)}</b><div class="ticker-vp"><div class="ticker-track"><div class="ticker-set">${set(false)}</div><div class="ticker-set" aria-hidden="true">${set(true)}</div></div></div></div></div>`;
}
let tickerT0 = 0;
function initTicker() {
  const tr = document.querySelector('.ticker-track'); if (!tr) return;
  const w = tr.firstElementChild ? tr.firstElementChild.scrollWidth : 0; if (!w) return;
  const dur = Math.max(18, w / 45); // about 45px a second, whatever the number of dates
  if (!tickerT0) tickerT0 = performance.now();
  tr.style.animationDuration = dur + 's';
  tr.style.animationDelay = -(((performance.now() - tickerT0) / 1000) % dur) + 's'; // keep its place across re-renders
  tr.classList.add('run');
}
/* ================= sport: scores ticker ================= */
const SC_T = { en: ['Scores', 'Live', 'Updated'], hi: ['स्कोर', 'लाइव', 'अपडेट'], pa: ['ਸਕੋਰ', 'ਲਾਈਵ', 'ਅੱਪਡੇਟ'] };
function scoresTicker(l) {
  const at = Date.parse(site.scoresAt || ''); if (!at || Date.now() - at > 48 * 3600e3) return '';  // stale: fall back to key dates
  const sc = (site.scores || []).slice(0, 8); if (!sc.length) return '';
  const w = SC_T[l] || SC_T.en;
  const live = sc.some(s => s.status === 'live');
  const when = new Date(at).toLocaleString('en-AU', { timeZone: 'Australia/Melbourne', hour: 'numeric', minute: '2-digit', weekday: 'short' });
  const set = hidden => sc.map(s => `<a class="sc" href="${s.slug ? href.art(l, s.slug) : href.sec(l, 'sport')}"${hidden ? ' tabindex="-1"' : ''}>${s.status === 'live' ? `<span class="sc-live">${esc(w[1])}</span>` : ''}<span class="d">${esc(s.comp)}</span><span lang="en">${esc(s.line)}</span></a><span class="sep" aria-hidden="true">/</span>`).join('') + `<span class="sc-upd">${esc(w[2])} ${esc(when)}</span><span class="sep" aria-hidden="true">/</span>`;
  return `<div class="ticker ticker-scores"><div class="wrap ticker-in"><b class="ticker-l${live ? ' is-live' : ''}"><i aria-hidden="true"></i>${esc(w[0])}</b><div class="ticker-vp"><div class="ticker-track"><div class="ticker-set">${set(false)}</div><div class="ticker-set" aria-hidden="true">${set(true)}</div></div></div></div></div>`;
}
/* ================= chrome ================= */
function chrome(r, inner, opts = {}) {
  const l = r.lang; const t = T[l];
  const sw = opts.switch || { en: href.home('en'), hi: href.home('hi'), pa: href.home('pa') };
  const dates = (site.dates || []).filter(d => d.date >= today()).slice(0, 5);
  const ticker = opts.ticker === false ? '' : (opts.scores && scoresTicker(l)) || (dates.length ? tickerHtml(l, dates) : '');
  const draftbar = previewMode() ? `<div class="draftbar"><div class="wrap"><span class="badge b-draft">Preview</span> You are seeing drafts and held stories as editors see them. The public site shows approved stories only. <a href="${href.desk('stories')}">Back to the desk</a> <button class="btn sm ghost" data-act="exit-preview">Exit preview</button></div></div>` : '';
  return `${draftbar}
<div class="util"><div class="wrap util-in"><div class="util-l"><strong>${esc(t.edition)}</strong><span>${esc(longDate(today(), l))}</span><span>${esc(t.free)}</span></div>
<div class="util-r"><a class="util-search" href="${href.page(l, 'search')}" aria-label="Search"><svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg> Search</a><a class="util-sup" href="${href.page(l, 'support')}">${esc((SUP[l] || SUP.en).nav)}</a><a class="util-sub" href="${href.page(l, 'newsletter')}">${esc(t.subscribe)}</a><a href="${href.page(l, 'directory')}">${esc(t.directory)}</a><a href="${href.page(l, 'advertise')}">${esc(t.advertise)}</a>${S.isEditor ? `<a class="desk-link" href="${href.desk()}">Newsroom desk</a>` : ''}</div></div></div>
<header class="mast"><div class="wrap mast-in">
<a class="identity" href="${href.home(l)}" aria-label="The Melbourne Indian home"><span class="brandmark" aria-hidden="true">m.</span><span><span class="brand" lang="en">The Melbourne <em>Indian.</em></span><span class="tagline">${esc(t.tagline)}</span></span></a>
<nav class="edition-line" aria-label="Edition"><span class="ed-links">${LANGS.map((x, i) => `${i ? '<span class="ed-sep" aria-hidden="true">|</span>' : ''}<a href="${sw[x]}" lang="${x}"${x === l ? ' aria-current="true"' : ''}>${LANG_FULL[x]}</a>`).join('')}</span></nav>
</div>
<nav class="nav" aria-label="Sections"><div class="wrap nav-in"><a href="${href.home(l)}"${r.view === 'home' ? ' aria-current="page"' : ''}>${esc(t.home)}</a>${SECTIONS.map(s => `<a ${secVar(s)} href="${href.sec(l, s)}"${opts.activeSec === s ? ' aria-current="page"' : ''}>${esc(t.sec[s])}</a>`).join('')}<span class="spacer"></span><a class="nav-search" href="${href.page(l, 'search')}"${r.page === 'search' ? ' aria-current="page"' : ''}><svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg>Search</a><a href="${href.page(l, 'standards')}">${esc(t.standards)}</a></div></nav>
</header>
${ticker}
<main id="main">${inner}</main>
<footer class="foot"><div class="wrap">
<div class="foot-grid">
<div><div class="foot-brand" lang="en">The Melbourne <em>Indian.</em></div><p>${esc(t.footAbout)}</p><p><a href="mailto:${NEWS}">${NEWS}</a><br><a href="mailto:${ADS}">${ADS}</a></p><p><a href="https://www.facebook.com/themelbourneindian" target="_blank" rel="noopener">${esc({ en: 'Follow us on Facebook', hi: 'फ़ेसबुक पर फ़ॉलो करें', pa: 'ਫੇਸਬੁੱਕ ਉੱਤੇ ਫਾਲੋ ਕਰੋ' }[l] || 'Follow us on Facebook')}</a></p></div>
<div><h3>${esc(t.sections)}</h3><ul>${SECTIONS.map(s => `<li><a href="${href.sec(l, s)}">${esc(t.sec[s])}</a></li>`).join('')}</ul></div>
<div><h3>${esc(t.publication)}</h3><ul><li><a href="${href.page(l, 'about')}">${esc(t.about)}</a></li><li><a href="${href.page(l, 'standards')}">${esc(t.standards)}</a></li><li><a href="${href.page(l, 'contact')}">${esc(t.contact)}</a></li><li><a href="${href.page(l, 'privacy')}">${esc({ en: 'Privacy', hi: 'गोपनीयता', pa: 'ਪਰਦੇਦਾਰੀ' }[l] || 'Privacy')}</a></li><li><a href="${href.page(l, 'newsletter')}">${esc(t.newsletter)}</a></li><li><a href="${href.page(l, 'support')}">${esc((SUP[l] || SUP.en).nav)}</a></li></ul></div>
<div><h3>${esc(t.workWith)}</h3><ul><li><a href="${href.page(l, 'advertise')}">${esc(t.advertise)}</a></li><li><a href="${href.page(l, 'directory')}">${esc(t.directory)}</a></li></ul><h3 style="margin-top:16px">${esc(t.editions)}</h3><ul>${LANGS.map(x => `<li><a href="${href.home(x)}" lang="${x}">${LANG_FULL[x]}</a></li>`).join('')}</ul></div>
</div>
<div class="foot-bottom"><span>© ${today().slice(0, 4)} The Melbourne Indian. Independent and free to read.</span></div>
</div></footer>`;
}

/* ================= public views ================= */
function storyCardSecond(a, l) {
  const v = V(a, l), vl = vlang(a, l);
  return `<article class="second" ${secVar(a.section)}><a class="story-link" href="${href.art(l, a.slug)}">${media(a, vl, 'r32')}</a><div>${kicker(a, l)}<a class="story-link" href="${href.art(l, a.slug)}" lang="${vl}"><h3>${esc(v.headline)}</h3></a></div><p class="dek" lang="${vl}">${esc(v.dek)}</p>${meta(a, l)}</article>`;
}
function viewHome(r) {
  const l = r.lang; const t = T[l];
  const all = sorted(allArticles());
  const inLang = l === 'en' ? all : all.filter(a => has(a, l));
  const enOnly = l === 'en' ? [] : all.filter(a => !has(a, l));
  if (!all.length) return chrome(r, `<div class="wrap"><p class="empty" style="margin:40px 0">${esc(t.empty)}</p></div>`);
  const pool = inLang.length ? inLang : all;
  // hero: the desk's "Lead story" first (if it has a photo), then the newest story (JUST IN while under 24 hours old),
  // then the most important stories by desk priority
  const pubAt = a => Date.parse(a.approvedAt || ((a.date || '1970-01-01') + 'T00:00:00+11:00')) || 0;
  // Only front-page-worthy stories go in the carousel: desk priority 9 or 10 (out of 10), with a photo.
  // JUST IN is reserved for hard news (type "news") at priority 9+, under 24 hours old. Guides and explainers never get it.
  const HERO_MIN = 9;
  const byPri = (a, b) => (b.priority || 0) - (a.priority || 0) || pubAt(b) - pubAt(a);
  const hasImg = a => a.image && a.image.url;
  const worthy = a => hasImg(a) && (a.priority || 0) >= HERO_MIN;
  const pinned = pool.filter(a => a.featured && hasImg(a)).sort((a, b) => pubAt(b) - pubAt(a))[0];
  const newest = pool.filter(a => worthy(a) && (a.type || 'news') === 'news').sort((a, b) => pubAt(b) - pubAt(a))[0];
  let leads = [...new Set([pinned, newest, ...pool.filter(worthy).sort(byPri)])].filter(Boolean).slice(0, 4);
  if (leads.length < 2) leads = [...new Set([...leads, ...pool.filter(hasImg).sort(byPri)])].slice(0, 2);  // quiet day: never fewer than two slides
  const fresh = !!newest && Date.now() - pubAt(newest) < 24 * 3600e3;
  const flash = `<span class="flash${fresh ? ' is-live' : ''}"><i aria-hidden="true"></i>${esc(fresh ? ({ en: 'Just in', hi: 'अभी-अभी', pa: 'ਹੁਣੇ-ਹੁਣੇ' }[l] || 'Just in') : t.latest)}</span>`;
  const topTag = `<span class="flash"><i aria-hidden="true"></i>${esc({ en: 'Top story', hi: 'मुख्य ख़बर', pa: 'ਮੁੱਖ ਖ਼ਬਰ' }[l] || 'Top story')}</span>`;
  const rest = pool.filter(a => !leads.includes(a));
  const seconds = rest.slice(0, 2);
  const latest = rest.slice(2, 6);
  const used = new Set([...leads, ...seconds, ...latest].map(a => a.slug));
  const heroLabel = { en: 'Top stories', hi: 'मुख्य ख़बरें', pa: 'ਮੁੱਖ ਖ਼ਬਰਾਂ' }[l] || 'Top stories';
  const hero = `<div class="hero" data-hero aria-roledescription="carousel" aria-label="${esc(heroLabel)}"><div class="hero-track">${leads.map((a, i) => { const v = V(a, l), vl = vlang(a, l); return `<article class="lead-story hero-slide${i === 0 ? ' is-on' : ''}" ${secVar(a.section)} aria-roledescription="slide" aria-label="${i + 1} / ${leads.length}"${i ? ' aria-hidden="true" inert' : ''}><a class="story-link" href="${href.art(l, a.slug)}" tabindex="-1" aria-hidden="true">${media(a, vl, '', false, i === 0)}</a><div class="hero-txt">${a === newest ? flash : a === pinned ? topTag : ''}${kicker(a, l)}<a class="story-link" href="${href.art(l, a.slug)}" lang="${vl}"><h2>${esc(v.headline)}</h2></a><p class="dek" lang="${vl}">${esc(v.dek)}</p>${meta(a, l)}</div></article>`; }).join('')}</div>${leads.length > 1 ? `<div class="hero-ctl"><button type="button" class="hero-btn" data-hero-act="prev" aria-label="Previous story">&#8249;</button><div class="hero-dots">${leads.map((a, i) => `<button type="button" class="hero-dot" data-hero-act="go" data-hero-i="${i}" aria-label="Story ${i + 1}: ${esc(V(a, l).headline)}"${i === 0 ? ' aria-current="true"' : ''}><i></i></button>`).join('')}</div><button type="button" class="hero-btn" data-hero-act="next" aria-label="Next story">&#8250;</button><button type="button" class="hero-btn hero-pause" data-hero-act="pause" aria-label="Pause rotation" aria-pressed="false">&#10074;&#10074;</button></div>` : ''}</div>`;
  const dates = (site.dates || []).filter(d => d.date >= today()).slice(0, 6);
  let html = `<div class="wrap"><section class="front">
<div class="lead-pkg">
${hero}
${seconds.map(a => storyCardSecond(a, l)).join('')}
</div>
<aside class="rail">
${dates.length ? `<div class="rail-box"><h2>${esc(t.dates)}</h2><ol class="datelist">${dates.map((d, i) => `<li style="--i:${i}"><span class="rd"><span class="rd-n">${pd(d.date).getUTCDate()}</span><span class="rd-m">${esc(MON3[pd(d.date).getUTCMonth()])}</span></span><span class="dl-t"><a href="${d.slug ? href.art(l, d.slug) : '#'}">${esc(d[l] || d.en)}</a>${dueTag(l, d.date)}</span></li>`).join('')}</ol></div>` : ''}
${fixturesBox(l, 4)}
${adSlot('mrec', l, 0)}
</aside></section>`;
  if (latest.length > 1) html += `<section class="latest" style="grid-template-columns:repeat(${latest.length},minmax(0,1fr))" aria-label="${esc(t.latest)}">${latest.map((a, i) => { const v = V(a, l), vl = vlang(a, l); return `<article ${secVar(a.section)}><span class="num">${esc(t.latest)} · ${i + 1}</span>${kicker(a, l)}<a class="story-link" href="${href.art(l, a.slug)}" lang="${vl}"><h3>${esc(v.headline)}</h3></a>${statusBadge(a)}</article>`; }).join('')}</section>`;
  // section blocks
  const blocks = SECTIONS.map(s => {
    const items = pool.filter(a => a.section === s && !used.has(a.slug));
    if (!items.length) return '';
    const [top, ...more] = items; const v = V(top, l), vl = vlang(top, l);
    return `<section class="secblock" ${secVar(s)}><div class="band-h"><h2>${esc(t.sec[s])}</h2><a href="${href.sec(l, s)}">${esc(t.all)} →</a></div>
<div class="top"><a class="story-link" href="${href.art(l, top.slug)}">${media(top, vl, 'r43')}</a><div><a class="story-link" href="${href.art(l, top.slug)}" lang="${vl}"><h3>${esc(v.headline)}</h3></a><p class="dek" lang="${vl}">${esc(v.dek)}</p>${meta(top, l)}</div></div>
${more.length ? `<ul>${more.slice(0, 3).map(a => `<li><a href="${href.art(l, a.slug)}" lang="${vlang(a, l)}">${esc(V(a, l).headline)}</a>${statusBadge(a)}</li>`).join('')}</ul>` : ''}</section>`;
  }).filter(Boolean);
  if (blocks.length) html += `<div class="sections">${blocks.join('')}</div>`;
  html += `</div>`;
  const guides = pool.filter(a => (a.type === 'guide' || a.type === 'explainer') && !leads.includes(a) && !seconds.includes(a)).slice(0, 4);
  if (guides.length) html += `<section class="guides"><div class="wrap"><div class="band-h"><h2>${esc(t.guides)}</h2><span class="muted small">${esc(t.guidesSub)}</span></div><div class="guides-grid">${guides.map(a => { const v = V(a, l), vl = vlang(a, l); return `<article class="guide" ${secVar(a.section)}>${kicker(a, l)}<a class="story-link" href="${href.art(l, a.slug)}" lang="${vl}"><h3>${esc(v.headline)}</h3></a><p lang="${vl}">${esc(v.dek)}</p></article>`; }).join('')}</div></div></section>`;
  html += `<div class="wrap">`;
  if (enOnly.length) html += `<section class="secblock" style="margin-bottom:40px"><div class="band-h"><h2>${esc(t.enOnly)}</h2><span class="muted small">${esc(t.enOnlyNote)}</span></div><ul>${enOnly.map(a => `<li><a href="${href.art('en', a.slug)}" lang="en">${esc(a.en.headline)}</a>${statusBadge(a)}</li>`).join('')}</ul></section>`;
  html += adSlot('leaderboard', l, 1);
  html += `<section class="promo"><div class="nl"><h2>${esc(t.nlTitle)}</h2><p>${esc(t.nlText)}</p><a class="btn" href="${href.page(l, 'newsletter')}">${esc(t.subscribe)}</a></div><div class="dir"><h2>${esc(t.dirTitle)}</h2><p>${esc(t.dirText)}</p><a class="btn ghost" href="${href.page(l, 'directory')}">${esc(t.listBiz)}</a></div></section></div>`;
  return chrome(r, html);
}
/* ================= sport: upcoming matches ================= */
const FIX_T = { en: ['Upcoming matches', 'Times are Melbourne time. Check with the venue or broadcaster before you go.', 'In Melbourne', 'Time TBC'], hi: ['आने वाले मैच', 'समय मेलबर्न के अनुसार। जाने से पहले आयोजन स्थल या प्रसारक से पुष्टि करें।', 'मेलबर्न में', 'समय तय नहीं'], pa: ['ਆਉਣ ਵਾਲੇ ਮੈਚ', 'ਸਮਾਂ ਮੈਲਬਰਨ ਅਨੁਸਾਰ। ਜਾਣ ਤੋਂ ਪਹਿਲਾਂ ਸਥਾਨ ਜਾਂ ਪ੍ਰਸਾਰਕ ਤੋਂ ਪੁਸ਼ਟੀ ਕਰੋ।', 'ਮੈਲਬਰਨ ਵਿੱਚ', 'ਸਮਾਂ ਤੈਅ ਨਹੀਂ'] };
const fmtTime = s => { const [h, m] = String(s).split(':').map(Number); return `${h % 12 || 12}${m ? '.' + String(m).padStart(2, '0') : ''}${h < 12 ? 'am' : 'pm'}`; };
function fixturesBox(l, n = 6) {
  const fx = (site.fixtures || []).filter(f => (f.end || f.date) >= today()).sort((a, b) => (a.date + (a.time || '')).localeCompare(b.date + (b.time || ''))).slice(0, n);
  if (!fx.length) return '';
  const w = FIX_T[l] || FIX_T.en;
  const span = f => f.end && f.end !== f.date ? `${pd(f.date).getUTCDate()}–${pd(f.end).getUTCDate()} ${MON3[pd(f.end).getUTCMonth()]}` : '';
  return `<div class="rail-box fixtures" style="--sec:var(--s-sport)"><h2>${esc(w[0])}</h2><ol class="fx">${fx.map((f, i) => `<li style="--i:${i}"${f.local ? ' class="is-local"' : ''}><span class="rd"><span class="rd-n">${pd(f.date).getUTCDate()}</span><span class="rd-m">${esc(MON3[pd(f.date).getUTCMonth()])}</span></span><div class="fx-t"><span class="fx-c">${esc((f.comp || {})[l] || (f.comp || {}).en || '')}${f.local ? ` <b>${esc(w[2])}</b>` : ''}</span>${f.slug ? `<a href="${href.art(l, f.slug)}">` : '<strong>'}${esc(f.match[l] || f.match.en)}${f.slug ? '</a>' : '</strong>'}<span class="fx-v">${esc(f.venue || '')}${span(f) ? ' · ' + esc(span(f)) : ''} · ${esc(f.time ? fmtTime(f.time) : w[3])}</span>${dueTag(l, f.date)}</div></li>`).join('')}</ol><p class="fx-note">${esc(w[1])}</p></div>`;
}
function viewSection(r) {
  const l = r.lang, t = T[l], s = r.sec;
  if (!SECTIONS.includes(s)) return viewHome({ lang: l, view: 'home' });
  const items = sorted(allArticles().filter(a => a.section === s));
  const list = items.length ? items.map(a => { const v = V(a, l), vl = vlang(a, l); return `<article class="rowcard" ${secVar(s)}><a class="story-link" href="${href.art(l, a.slug)}">${media(a, vl, 'r32')}</a><div>${kicker(a, l)}<a class="story-link" href="${href.art(l, a.slug)}" lang="${vl}"><h3>${esc(v.headline)}</h3></a><p class="dek" lang="${vl}">${esc(v.dek)}</p>${meta(a, l)}</div></article>`; }).join('') : `<p class="empty">${esc(t.empty)}</p>`;
  const sw = { en: href.sec('en', s), hi: href.sec('hi', s), pa: href.sec('pa', s) };
  return chrome(r, `<div class="wrap" ${secVar(s)}><header class="sec-head"><h1>${esc(t.sec[s])}</h1><p>${esc(t.secDesc[s])}</p></header><div class="sec-grid"><div>${list}</div><aside class="rail">${s === 'sport' ? fixturesBox(l, 10) : ''}${adSlot('mrec', l, 2)}</aside></div></div>`, { activeSec: s, switch: sw, scores: s === 'sport' });
}
function bodyHtml(blocks, l, withAd) {
  let out = '', paras = 0;
  for (const b of blocks || []) {
    if (typeof b === 'string') { out += `<p>${esc(b)}</p>`; paras++; if (withAd && paras === 3) out += adSlot('inline', l, 3); }
    else if (b.h) out += `<h2>${esc(b.h)}</h2>`;
    else if (b.ul) out += `<ul>${b.ul.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
    else if (b.dl) out += `<dl class="keydates">${b.dl.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>`;
    else if (b.note) out += `<p class="note">${esc(b.note)}</p>`;
  }
  return out;
}
function viewArticle(r) {
  const l = r.lang, t = T[l];
  const a = findArticle(r.slug);
  const visible = a && (a.status === 'published' || (S.isEditor && S.deskLoaded));
  if (!visible) return chrome(r, `<div class="wrap"><div class="art-head"><h1>Story not found</h1><p class="dek">It may have been moved or is not yet published.</p><a class="btn" href="${href.home(l)}">${esc(t.home)}</a></div></div>`);
  const vl = vlang(a, l), v = V(a, l);
  const sw = {}; LANGS.forEach(x => { sw[x] = href.art(x, a.slug); });
  const others = LANGS.filter(x => x !== vl && has(a, x)).map(x => `<a href="${href.art(x, a.slug)}" lang="${x}">${LANG_FULL[x]}</a>`).join(' · ');
  const more = sorted(allArticles().filter(x => x.section === a.section && x.slug !== a.slug)).slice(0, 4);
  const dates = (site.dates || []).filter(d => d.date >= today()).slice(0, 5);
  const draftNote = a.status !== 'published' ? `<div class="draftbar"><div class="wrap"><span class="badge b-${esc(a.status)}">${esc(a.status)}</span> Not public. Only editors can see this page. <span class="badge b-${esc(a.risk || 'green')}">${esc(a.risk || 'green')} risk</span> <a href="${href.desk('edit', a.slug)}">Open in the desk</a></div></div>` : '';
  const srcs = (a.sources || []).length ? `<section><h2>${esc(t.sources)}</h2><ol>${a.sources.map(s => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a> <span class="muted">(${esc(t.checked)} ${esc(shortDate(s.checked || a.date, l))})</span></li>`).join('')}</ol></section>` : '';
  const corr = (a.corrections || []).length ? `<section><h2>${esc(t.corrections)}</h2><ul>${a.corrections.map(c => `<li>${esc(c)}</li>`).join('')}</ul></section>` : '';
  const shUrl = `${PUBLIC_URL}/${vl}/${a.slug}/`, shT = SHARE_T[l] || SHARE_T.en;
  const share = a.status !== 'published' ? '' : `<div class="share" role="group" aria-label="${esc(shT[0])}"><span class="share-l">${esc(shT[0])}</span><a class="sh sh-wa" href="https://wa.me/?text=${encodeURIComponent(v.headline + ' ' + shUrl)}" target="_blank" rel="noopener">WhatsApp</a><a class="sh" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shUrl)}" target="_blank" rel="noopener">Facebook</a><a class="sh" href="https://twitter.com/intent/tweet?url=${encodeURIComponent(shUrl)}&amp;text=${encodeURIComponent(v.headline)}" target="_blank" rel="noopener">X</a><button type="button" class="sh" data-share-copy="${esc(shUrl)}" data-done="${esc(shT[2])}">${esc(shT[1])}</button></div>`;
  const notInLang = l !== vl ? `<p class="note" lang="${l}">${esc(t.enOnlyNote)}</p>` : '';
  const html = `${draftNote}<div class="wrap" ${secVar(a.section)}>
<header class="art-head">${kicker(a, l)}<h1 lang="${vl}">${esc(v.headline)}</h1><p class="dek" lang="${vl}">${esc(v.dek)}</p>
<div class="byline"><span>${esc(t.by)} <strong>${esc(a.byline || 'The Melbourne Indian newsroom')}</strong></span><span class="tnum">${esc(longDate(a.date, l))}</span><span>${mins(a)} ${esc(t.min)}</span>${a.updated && a.updated.slice(0, 10) !== a.date ? `<span class="tnum">Updated ${esc(shortDate(a.updated.slice(0, 10), l))}</span>` : ''}${others ? `<span>${esc(t.otherLangs)}: ${others}</span>` : ''}</div>${share}</header>
<div class="art-grid"><div class="art-main">${notInLang}${media(a, vl, '', true, true)}
<div class="body" lang="${vl}">${bodyHtml(v.body, l, true)}</div>
${a.status === 'published' ? supBox(l) : ''}${readNext(a, l, more)}<div class="endmatter">${vl !== 'en' && t.translatedNote ? `<p class="muted">${esc(t.translatedNote)}</p>` : ''}${share}${srcs}${corr}<section><p class="muted">${esc(t.reportErr)} <a href="mailto:${NEWS}">${NEWS}</a></p></section></div></div>
<aside class="rail">${more.length ? `<div class="rail-box"><h2>${esc(t.moreIn)} ${esc(t.sec[a.section])}</h2><ul class="morelist">${more.map(x => `<li><a href="${href.art(l, x.slug)}" lang="${vlang(x, l)}">${esc(V(x, l).headline)}</a></li>`).join('')}</ul></div>` : ''}${a.section === 'sport' ? fixturesBox(l, 5) : ''}${adSlot('mrec', l, 4)}${dates.length ? `<div class="rail-box"><h2>${esc(t.dates)}</h2><ol class="datelist">${dates.map((d, i) => `<li style="--i:${i}"><span class="rd"><span class="rd-n">${pd(d.date).getUTCDate()}</span><span class="rd-m">${esc(MON3[pd(d.date).getUTCMonth()])}</span></span><span class="dl-t"><a href="${d.slug ? href.art(l, d.slug) : '#'}">${esc(d[l] || d.en)}</a>${dueTag(l, d.date)}</span></li>`).join('')}</ol></div>` : ''}</aside></div></div>`;
  document.title = `${v.headline} · The Melbourne Indian`;
  return chrome(r, html, { activeSec: a.section, switch: sw, scores: a.section === 'sport' });
}

/* ---------- forms (public) ---------- */
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/';
const FORMS = {
  subscribe: { coll: 'subscribers', subject: 'Newsletter subscription', to: NEWS,
    fields: [['email', 'Email address', 'email', true], ['name', 'Your name (optional)', 'text', false]],
    extra: `<fieldset class="field" style="border:0;padding:0;margin:0"><legend class="flabel">Editions</legend><div class="actions"><label class="check"><input type="checkbox" name="ed_en" checked> English</label><label class="check"><input type="checkbox" name="ed_hi"> हिन्दी</label><label class="check"><input type="checkbox" name="ed_pa"> ਪੰਜਾਬੀ</label></div></fieldset>`,
    consent: 'I agree to receive The Melbourne Indian newsletter by email. I can unsubscribe at any time.' },
  nudge: { coll: 'subscribers', subject: 'Newsletter subscription', to: NEWS,
    fields: [['email', 'Email address', 'email', true]],
    consent: 'By subscribing I agree to receive The Melbourne Indian newsletter by email. I can unsubscribe at any time.' },
  enquiry: { coll: 'enquiries', subject: 'Advertising enquiry', to: ADS,
    fields: [['business', 'Business name', 'text', true], ['name', 'Contact name', 'text', true], ['email', 'Email', 'email', true], ['phone', 'Phone (optional)', 'tel', false], ['package', 'Package', 'select:Not sure yet|Business listing|Founding partner|Event promotion|Sponsored article', false], ['message', 'What would you like to promote?', 'textarea', true]],
    consent: 'I agree that The Melbourne Indian can contact me about this enquiry.' },
  listing: { coll: 'submissions', subject: 'Business directory listing', to: ADS,
    fields: [['business', 'Business name', 'text', true], ['category', 'Category', 'select:Grocery|Restaurant & catering|Professional services|Health|Education & tutoring|Religious & community|Events & entertainment|Retail|Other', true], ['suburb', 'Suburb', 'text', true], ['website', 'Website (optional)', 'url', false], ['phone', 'Business phone (optional)', 'tel', false], ['email', 'Contact email', 'email', true], ['languages', 'Languages spoken (optional)', 'text', false], ['description', 'Short description (up to 60 words)', 'textarea', true]],
    consent: 'I confirm I am authorised to list this business and agree to The Melbourne Indian checking these details before publishing.' },
  tip: { coll: 'tips', subject: 'Story tip', to: NEWS,
    fields: [['name', 'Your name (optional)', 'text', false], ['email', 'Email (optional, so we can reply)', 'email', false], ['message', 'What should we know? Include links or documents if you can.', 'textarea', true]],
    consent: 'I understand The Melbourne Indian checks all tips independently and will not publish my name without my permission.' }
};
function formHtml(kind) {
  const f = FORMS[kind];
  const fields = f.fields.map(([n, lab, type, req]) => {
    const id = `f-${kind}-${n}`;
    let input;
    if (type === 'textarea') input = `<textarea id="${id}" name="${n}"${req ? ' required' : ''}></textarea>`;
    else if (type.startsWith('select:')) input = `<select id="${id}" name="${n}"${req ? ' required' : ''}>${type.slice(7).split('|').map(o => `<option>${esc(o)}</option>`).join('')}</select>`;
    else input = `<input id="${id}" name="${n}" type="${type}"${req ? ' required' : ''}${type === 'email' ? ' autocomplete="email"' : ''}>`;
    return `<div class="field"><label for="${id}">${esc(lab)}</label>${input}</div>`;
  }).join('');
  return `<form class="form" data-form="${kind}" novalidate>${fields}${f.extra || ''}<input type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0"><label class="check"><input type="checkbox" name="consent" id="f-${kind}-consent" required> <span>${esc(f.consent)}</span></label><div><button class="btn" type="submit">Send</button></div><div class="out" aria-live="polite"></div></form>`;
}
async function submitForm(form) {
  const kind = form.dataset.form; const f = FORMS[kind]; const out = form.querySelector('.out');
  const data = {}; new FormData(form).forEach((v, k) => { data[k] = typeof v === 'string' ? v.trim() : v; });
  const missing = f.fields.filter(([n, , , req]) => req && !data[n]).map(([, lab]) => lab);
  if (missing.length) { out.innerHTML = `<p class="status err">Please fill in: ${esc(missing.join(', '))}.</p>`; return; }
  if (data.email && !okEmail(data.email)) { out.innerHTML = `<p class="status err">That email address doesn't look right. Check it and try again.</p>`; return; }
  if (!data.consent) { out.innerHTML = `<p class="status err">Please tick the consent box to continue.</p>`; return; }
  const rec = { ...data, consent: true, consentText: f.consent, submittedAt: nowIso(), status: 'new', page: location.hash || '#en' };
  if (kind === 'subscribe' || kind === 'nudge') { rec.editions = LANGS.filter(x => data['ed_' + x]); LANGS.forEach(x => delete rec['ed_' + x]); }
  if (S.db && S.uid && S.canWrite !== false) {
    try { await S.db.doc(`${f.coll}/${S.uid}`).set(rec); subDone(kind, form); form.reset(); out.innerHTML = `<p class="status ok">Thank you. We've received your ${esc(f.subject.toLowerCase())}.</p>`; return; }
    catch (e) { if (e && e.code === 'invalid_argument') S.canWrite = false; }
  }
  const honey = rec._honey; delete rec._honey;
  const thanks = `<p class="status ok">Thank you. We've received your ${esc(f.subject.toLowerCase())}.</p>`;
  if (honey) { form.reset(); out.innerHTML = thanks; return; }
  const body = Object.entries(rec).filter(([k]) => !['consent', 'consentText', 'status', 'page', 'submittedAt'].includes(k)).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join('\n');
  const btn = form.querySelector('button[type=submit]'); if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
  try {
    const payload = { ...rec, editions: Array.isArray(rec.editions) ? rec.editions.join(', ') : rec.editions, consent: 'Yes: ' + f.consent, _subject: `${f.subject} (website)`, _template: 'table', _captcha: 'false' };
    delete payload.consentText; delete payload.status;
    if (rec.email) payload._replyto = rec.email;
    const res = await fetch(FORM_ENDPOINT + f.to, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) });
    const j = await res.json().catch(() => ({}));
    if (res.ok && (j.success === true || j.success === 'true')) { subDone(kind, form); form.reset(); out.innerHTML = thanks; if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || 'Send'; } return; }
  } catch (e) { }
  if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || 'Send'; }
  const mail = `mailto:${f.to}?subject=${encodeURIComponent(f.subject)}&body=${encodeURIComponent(body)}`;
  out.innerHTML = `<div class="status err" style="color:var(--ink)"><p style="margin:0 0 8px">We couldn't send that from the website just now. Tap below to send it from your email instead, with your details already filled in.</p><p style="margin:0 0 8px"><a class="btn sm" href="${mail}">Send by email</a></p><pre class="copytxt" style="white-space:pre-wrap;font:14px/1.4 var(--sans);margin:0 0 8px">${esc(body)}</pre><div class="copybox"><code>${f.to}</code><button type="button" class="btn sm ghost" data-act="copy-form">Copy details</button></div></div>`;
}
/* ================= business directory ================= */
const DIR_CATS = ['Restaurants & takeaway', 'Sweets & bakeries', 'Groceries', 'Fashion & bridal', 'Weddings & photography', 'Health', 'Migration & education', 'Accounting & finance', 'Real estate', 'Driving schools', 'Travel', 'Temples & gurdwaras', 'Community organisations'];
const dirSlug = d => d.slug || d._id || String(d.business || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const dirAll = () => (site.directory || []).filter(d => d.status === 'approved');
const dirSubs = d => (d.suburbs && d.suburbs.length ? d.suburbs : String(d.suburb || '').split(/,\s*/)).filter(Boolean);
const dirWide = d => /melbourne-wide|australia-wide|victoria-wide|online/i.test(d.area || '');
const telHref = p => 'tel:' + String(p).replace(/[^\d+]/g, '');
const dirDate = v => { const d = new Date(String(v || '').slice(0, 10) + 'T00:00:00'); return isNaN(d) ? '' : d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }); };
const dirMail = (d, what) => `mailto:${ADS}?subject=${encodeURIComponent(what + ': ' + d.business)}&body=${encodeURIComponent(`Hi,\n\nI'm writing about the listing for ${d.business} on The Melbourne Indian business directory (${location.origin}/directory/${dirSlug(d)}/).\n\n` + (what === 'Remove listing' ? 'Please remove this listing.\n\nMy name and role at the business:\n' : 'My name and role at the business:\n\nWhat needs changing or adding:\n'))}`;
function dirSort(a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || DIR_CATS.indexOf(a.category) - DIR_CATS.indexOf(b.category) || String(a.business).localeCompare(String(b.business)); }
function dirCard(d, l) {
  const subs = dirSubs(d), where = subs.slice(0, 3).join(' · ') + (subs.length > 3 ? ` · +${subs.length - 3} more` : '') + (dirWide(d) ? ` · ${d.area}` : '');
  const hay = [d.business, d.category, d.description, subs.join(' '), (d.tags || []).join(' '), d.languages, d.area].join(' ').toLowerCase();
  return `<article class="dir-card${d.featured ? ' is-featured' : ''}" data-cat="${esc(d.category || '')}" data-sub="|${esc(subs.join('|'))}|" data-wide="${dirWide(d) ? 1 : 0}" data-q="${esc(hay)}"><span class="kicker">${esc(d.category || '')}${d.featured ? ' · Featured' : ''}</span><h3><a href="${href.dir(l, dirSlug(d))}">${esc(d.business)}</a></h3><p class="dir-where">${esc(where)}</p><p class="dir-desc">${esc(d.description || '')}</p><p class="dir-act">${d.phone ? `<a href="${telHref(d.phone)}">${esc(d.phone)}</a>` : ''}${d.website ? `<a href="${esc(d.website)}" target="_blank" rel="noopener">Website</a>` : ''}<a href="${href.dir(l, dirSlug(d))}">${(d.locations || []).length > 1 ? `${d.locations.length} locations` : 'Details'}</a></p>${d.claimed ? '' : `<p class="dir-src">Listed from public information · <a href="${href.dir(l, dirSlug(d))}">Is this your business?</a></p>`}</article>`;
}
function dirFilter() {
  const root = document.querySelector('.dir-page'); if (!root) return;
  const f = S.ui.dir || (S.ui.dir = { q: '', cat: '', sub: '' });
  const words = f.q.toLowerCase().split(/\s+/).filter(Boolean); let n = 0;
  root.querySelectorAll('.dir-card').forEach(c => {
    const ok = (!f.cat || c.dataset.cat === f.cat) && (!f.sub || c.dataset.sub.includes('|' + f.sub + '|') || c.dataset.wide === '1') && words.every(w => c.dataset.q.includes(w));
    c.hidden = !ok; if (ok) n++;
  });
  const total = root.querySelectorAll('.dir-card').length, cnt = root.querySelector('.dir-count'), none = root.querySelector('.dir-none');
  if (cnt) cnt.textContent = n === total ? `${total} listings` : `Showing ${n} of ${total} listings`;
  if (none) none.hidden = n > 0;
}
document.addEventListener('input', ev => {
  const el = ev.target; if (!el.closest || !el.closest('.dir-tools')) return;
  const f = S.ui.dir || (S.ui.dir = { q: '', cat: '', sub: '' });
  f[el.name] = el.value; dirFilter();
});
function viewDirectory(r, sw) {
  const l = r.lang, t = T[l], list = dirAll().sort(dirSort), f = S.ui.dir || (S.ui.dir = { q: '', cat: '', sub: '' });
  const cats = DIR_CATS.filter(c => list.some(d => d.category === c)).concat([...new Set(list.map(d => d.category))].filter(c => c && !DIR_CATS.includes(c)));
  const subCount = {}; list.forEach(d => dirSubs(d).forEach(x => { subCount[x] = (subCount[x] || 0) + 1; }));
  const subs = Object.keys(subCount).filter(x => !/^melbourne$/i.test(x)).sort((a, b) => a.localeCompare(b));
  const opt = (v, label, cur) => `<option value="${esc(v)}"${v === cur ? ' selected' : ''}>${esc(label)}</option>`;
  const main = `<div class="wrap dir-page"><header class="dir-head"><h1>${esc(t.directory)}</h1><p class="dek">${esc(t.dirText)}</p></header>
${list.length ? `<div class="dir-tools" role="search"><div class="dir-q"><label for="dir-q">Search</label><input id="dir-q" name="q" type="search" placeholder="Biryani, gurdwara, tax return, Tarneit…" value="${esc(f.q)}" autocomplete="off"></div><div><label for="dir-cat">Category</label><select id="dir-cat" name="cat">${opt('', 'All categories', f.cat)}${cats.map(c => opt(c, `${c} (${list.filter(d => d.category === c).length})`, f.cat)).join('')}</select></div><div><label for="dir-sub">Suburb</label><select id="dir-sub" name="sub">${opt('', 'All suburbs', f.sub)}${subs.map(x => opt(x, x, f.sub)).join('')}</select></div></div><p class="dir-count" aria-live="polite">${list.length} listings</p><div class="dir-grid">${list.map(d => dirCard(d, l)).join('')}</div><p class="dir-none" hidden>Nothing matches yet. Try a different word or suburb, or <a href="mailto:${ADS}?subject=Directory%20suggestion">tell us which business we should add</a>.</p>` : `<p class="empty">The first listings are being checked and will appear here soon.</p>`}
<section class="prose dir-more"><h2>${esc(t.listBiz)}</h2><p>Basic listings are free. A <strong>featured listing</strong> ($49 a month) puts your business first in its category, with a photo and a description in up to three languages. See our <a href="${href.page(l, 'advertise')}">advertising packages</a>.</p><p class="small muted">Many listings are made from public information, such as a business's own website. If one is yours, you can claim it, correct it or ask us to remove it by emailing <a href="mailto:${ADS}">${ADS}</a>. We remove listings the same day we're asked.</p>${formHtml('listing')}</section></div>`;
  return chrome(r, main, { switch: sw });
}
function viewListing(r) {
  const l = r.lang, all = dirAll(), d = all.find(x => dirSlug(x) === r.slug);
  const sw = { en: href.dir('en', r.slug), hi: href.dir('hi', r.slug), pa: href.dir('pa', r.slug) };
  if (!d) { document.title = 'Listing not found · The Melbourne Indian'; return chrome(r, `<div class="wrap page-grid"><article class="prose"><p class="dir-back"><a href="${href.page(l, 'directory')}">← Business directory</a></p><h1>Listing not found</h1><p>This listing may have been removed or renamed.</p></article></div>`, { switch: sw }); }
  document.title = `${d.business}, ${dirSubs(d)[0] || 'Melbourne'} · Business directory · The Melbourne Indian`;
  const locs = d.locations || [], rows = [];
  if (locs.length) rows.push([locs.length > 1 ? 'Locations' : 'Location', locs.map(x => `<div class="dir-loc"><strong>${esc(x.label ? x.label + ', ' + x.suburb : x.suburb)}</strong>${x.address ? '<br>' + esc(x.address) : ''}${x.phone ? `<br><a href="${telHref(x.phone)}">${esc(x.phone)}</a>` : ''}</div>`).join('')]);
  else if (dirSubs(d).length) rows.push(['Suburb', esc(dirSubs(d).join(', '))]);
  if (d.phone && !locs.some(x => x.phone === d.phone)) rows.push(['Phone', `<a href="${telHref(d.phone)}">${esc(d.phone)}</a>`]);
  if (d.website) rows.push(['Website', `<a href="${esc(d.website)}" target="_blank" rel="noopener">${esc(d.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''))}</a>`]);
  if (d.hours) rows.push(['Hours', esc(d.hours)]);
  if (d.area) rows.push(['Serves', esc(d.area)]);
  if (d.languages) rows.push(['Languages', esc(d.languages)]);
  if ((d.tags || []).length) rows.push(['Good to know', `<div class="dir-tags">${d.tags.map(x => `<span>${esc(x)}</span>`).join('')}</div>`]);
  if (d.note) rows.push(['Note', esc(d.note)]);
  const more = all.filter(x => x !== d && x.category === d.category).sort((a, b) => (dirSubs(b).some(s => dirSubs(d).includes(s)) ? 1 : 0) - (dirSubs(a).some(s => dirSubs(d).includes(s)) ? 1 : 0) || dirSort(a, b)).slice(0, 6);
  const src = d.source ? `<a href="${esc(d.source)}" target="_blank" rel="noopener">${esc(d.sourceLabel || 'source')}</a>` : esc(d.sourceLabel || 'public sources');
  const main = `<p class="dir-back"><a href="${href.page(l, 'directory')}">← Business directory</a></p><span class="kicker">${esc(d.category || '')}${d.featured ? ' · Featured' : ''}</span><h1>${esc(d.business)}</h1><p class="dek">${esc(d.description || '')}</p><dl class="dir-facts">${rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>
<p class="small muted">${d.claimed ? 'Details supplied by the business.' : `Listed from public information (${src})${d.checked ? ', checked ' + esc(dirDate(d.checked)) : ''}.`} Details can change, so check with the business before you visit.</p>
${d.claimed ? '' : `<section class="dir-claim"><h2>Is this your business?</h2><p>We made this free listing from public information. Claim it to correct the details or add photos and a description in Hindi and Punjabi. Or ask us to take it down: we remove listings the same day we're asked.</p><p><a class="btn" href="${esc(dirMail(d, 'Claim listing'))}">Claim or update this listing</a><a class="btn ghost" href="${esc(dirMail(d, 'Remove listing'))}">Remove this listing</a></p></section>`}`;
  const side = (more.length ? `<div class="rail-box"><h2>More ${esc(d.category || 'listings')}</h2><ul class="dir-side">${more.map(x => `<li><a href="${href.dir(l, dirSlug(x))}">${esc(x.business)}</a> <span class="small muted">${esc(dirSubs(x)[0] || '')}</span></li>`).join('')}</ul></div>` : '') + adSlot('mrec', l, 5);
  return chrome(r, `<div class="wrap page-grid"><article class="prose">${main}</article><aside class="rail">${side}</aside></div>`, { switch: sw });
}
/* ================= read next + search ================= */
const STOP = new Set('the a an and or of to in on for with at by from as is are was were be been it its this that these those after before over under into about than then but not no new says say said will would can could may might has have had more most up out off who what when where why how which their his her they them we our you your also first last two one three australia australian victoria victorian melbourne indian india'.split(' '));
const keyWords = a => new Set(((a.en?.headline || '') + ' ' + (a.en?.dek || '')).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter(w => w.length > 2 && !STOP.has(w)));
function readNext(a, l, exclude) {
  if (a.status !== 'published') return '';
  const kw = keyWords(a), skip = new Set([a.slug, ...(exclude || []).map(x => x.slug)]);
  const scored = allArticles().filter(x => !skip.has(x.slug)).map(x => { let sc = 0; keyWords(x).forEach(w => { if (kw.has(w)) sc += 2; }); if (x.section === a.section) sc += 1; return [sc, x]; });
  const pick = scored.sort((p, q) => q[0] - p[0] || String(q[1].date).localeCompare(String(p[1].date)) || (q[1].priority || 0) - (p[1].priority || 0)).slice(0, 3).map(p => p[1]);
  return pick.length ? `<section class="readnext" aria-labelledby="rn-h"><h2 id="rn-h">${esc(({ en: 'Read next', hi: 'आगे पढ़ें', pa: 'ਅੱਗੇ ਪੜ੍ਹੋ' })[l] || 'Read next')}</h2><div class="readnext-grid">${pick.map(x => storyCardSecond(x, l)).join('')}</div></section>` : '';
}
const bodyText = v => (v?.body || []).map(b => typeof b === 'string' ? b : b.h || b.note || (b.ul || []).join(' ') || (b.dl || []).flat().join(' ')).join(' ');
function runSearch() {
  const out = document.getElementById('search-out'); if (!out) return;
  const r = route(), l = r.lang, q = (S.ui.q || '').trim().toLowerCase(), words = q.split(/\s+/).filter(Boolean);
  if (!words.length) { out.innerHTML = `<p class="muted">Search ${allArticles().length} stories and ${dirAll().length} directory listings.</p>`; return; }
  const hit = (txt) => words.every(w => txt.includes(w));
  const stories = [];
  for (const a of allArticles()) {
    const v = V(a, l), vl = vlang(a, l), title = (LANGS.map(x => a[x]?.headline || '').join(' ')).toLowerCase(), dek = (LANGS.map(x => a[x]?.dek || '').join(' ')).toLowerCase();
    const all = title + ' ' + dek + ' ' + LANGS.map(x => bodyText(a[x])).join(' ').toLowerCase() + ' ' + (T[l].sec[a.section] || '').toLowerCase();
    if (!hit(all)) continue;
    stories.push([(hit(title) ? 10 : 0) + (hit(dek) ? 4 : 0), a, v, vl]);
  }
  stories.sort((p, z) => z[0] - p[0] || String(z[1].date).localeCompare(String(p[1].date)));
  const biz = dirAll().filter(d => hit([d.business, d.category, d.description, dirSubs(d).join(' '), (d.tags || []).join(' ')].join(' ').toLowerCase())).sort(dirSort);
  const n = stories.length + biz.length;
  out.innerHTML = `<p class="dir-count" aria-live="polite">${n ? `${n} result${n === 1 ? '' : 's'} for “${esc(S.ui.q.trim())}”` : `Nothing found for “${esc(S.ui.q.trim())}”. Try fewer or different words.`}${site.partial ? ' · searching the full archive…' : ''}</p>`
    + (stories.length ? `<section><h2 class="search-h">Stories</h2><ol class="search-list">${stories.slice(0, 40).map(([, a, v, vl]) => `<li ${secVar(a.section)}>${kicker(a, l)}<a class="story-link" href="${href.art(l, a.slug)}" lang="${vl}"><h3>${esc(v.headline)}</h3></a><p class="dek" lang="${vl}">${esc(v.dek)}</p>${meta(a, l)}</li>`).join('')}</ol></section>` : '')
    + (biz.length ? `<section><h2 class="search-h">Business directory</h2><div class="dir-grid">${biz.slice(0, 12).map(d => dirCard(d, l)).join('')}</div></section>` : '');
}
document.addEventListener('input', ev => { if (ev.target && ev.target.id === 'site-q') { S.ui.q = ev.target.value; runSearch(); } });
document.addEventListener('submit', ev => { if (ev.target && ev.target.classList && ev.target.classList.contains('search-form')) { ev.preventDefault(); ev.stopImmediatePropagation(); } }, true);
function viewSearch(r, sw) {
  document.title = 'Search · The Melbourne Indian';
  return chrome(r, `<div class="wrap search-page"><h1>Search</h1><form class="search-form" role="search"><label class="sr-only" for="site-q">Search stories and businesses</label><input id="site-q" type="search" name="q" placeholder="Visa, election, Tarneit, cricket, biryani…" value="${esc(S.ui.q || '')}" autocomplete="off" enterkeyhint="search"></form><div id="search-out"></div></div>`, { switch: sw });
}
function viewPage(r) {
  const l = r.lang, t = T[l], p = r.page;
  const sw = { en: href.page('en', p), hi: href.page('hi', p), pa: href.page('pa', p) };
  const pages = site.pages || {};
  let main = '', side = adSlot('mrec', l, 5);
  if (p === 'about' || p === 'standards') main = `<h1>${esc(p === 'about' ? 'About us' : 'Editorial standards')}</h1>${pages[p] || ''}`;
  else if (p === 'advertise') { main = `<h1>Advertise with us</h1>${pages.advertise || ''}<h2>Send an enquiry</h2>${formHtml('enquiry')}`; side = `<div class="rail-box"><h2>Advertising</h2><p class="small">Email <a href="mailto:${ADS}">${ADS}</a></p></div>`; }
  else if (p === 'support') { const u = SUP[l] || SUP.en; main = `<h1>${esc(u.title)}</h1><p class="dek">${esc(u.dek)}</p>${u.p.map(x => `<p>${esc(x)}</p>`).join('')}<h2>${esc(SUP_PERKS[l].h)}</h2><ul class="sup-perks">${SUP_PERKS[l].li.map(x => `<li>${esc(x)}</li>`).join('')}</ul><p class="small muted">${esc(SUP_PERKS[l].free)}</p>${supBtns(l)}<p class="small"><a href="${SUP_PORTAL}" target="_blank" rel="noopener">${esc(u.manage)}</a></p><p class="small muted">${esc(u.small)} <a href="mailto:${NEWS}">${NEWS}</a></p>`; side = `<div class="rail-box sup-wall"><h2>${esc(SUP_PERKS[l].wallT)}</h2>${SUP_WALL.length ? `<ul>${SUP_WALL.map(n => `<li>${esc(n)}</li>`).join('')}</ul>` : `<p class="small">${esc(SUP_PERKS[l].wallE)}</p>`}</div>`; }
  else if (p === 'newsletter') main = `<h1>${esc(t.newsletter)}</h1><p class="dek">${esc(t.nlText)}</p>${formHtml('subscribe')}<p class="small muted" style="margin-top:12px">We use your email only to send the newsletter you chose. Every email has an unsubscribe link.</p>`;
  else if (p === 'contact') main = `<h1>${esc(t.contact)}</h1><p class="dek">News tips, corrections and feedback go to our editors.</p><div class="copybox" style="margin-bottom:8px"><span>News and corrections:</span><code>${NEWS}</code></div><div class="copybox" style="margin-bottom:22px"><span>Advertising:</span><code>${ADS}</code></div><h2>Send us a tip</h2>${formHtml('tip')}`;
  else if (p === 'directory') return (site.partial && !(site.directory || []).length) ? chrome(r, `<div class="wrap dir-page"><h1>${esc(t.directory)}</h1><p class="muted">Loading listings…</p></div>`, { switch: sw }) : viewDirectory(r, sw);
  else if (p === 'search') return viewSearch(r, sw);
  else if (pages[p]) main = `<h1>${esc(({ privacy: 'Privacy policy' })[p] || p)}</h1>${pages[p]}`;
  else main = `<h1>Page not found</h1>`;
  return chrome(r, `<div class="wrap page-grid"><article class="prose">${main}</article><aside class="rail">${side}</aside></div>`, { switch: sw });
}

/* ================= desk ================= */
const DESK_NAV = [['overview', 'Overview'], ['stories', 'Stories'], ['preview', 'Front page preview'], ['dates', 'Key dates'], ['images', 'Image register'], ['enquiries', 'Advertiser enquiries'], ['ads', 'Ad bookings'], ['directory', 'Directory'], ['newsletter', 'Newsletter'], ['tips', 'Reader tips'], ['automation', 'Automation & costs'], ['audit', 'Audit log']];
const COLLS = ['articles', 'dates', 'enquiries', 'subscribers', 'submissions', 'tips', 'ads', 'directory', 'issues', 'audit', 'runs'];
function startDesk() {
  if (S.deskStarted || !S.db || !S.isEditor) return; S.deskStarted = true;
  const pending = new Set(COLLS);
  const timer = setTimeout(() => { if (!S.deskLoaded) { S.deskErr = 'The newsroom database is taking longer than usual to respond.'; render(); } }, 10000);
  for (const c of COLLS) {
    let q = S.db.collection(c);
    if (c === 'audit') q = q.orderBy('at', 'desc').limit(150);
    q.onSnapshot(snap => {
      S.desk[c] = snap.docs.map(d => ({ ...d.data(), _id: d.id }));
      if (c === 'articles') S.desk.articles.forEach(a => { a.slug = a.slug || a._id; });
      pending.delete(c);
      if (!pending.size) { S.deskLoaded = true; clearTimeout(timer); S.deskErr = null; }
      if (S.deskLoaded) scheduleRender();
    }, err => { S.deskErr = 'Could not load ' + c + ': ' + (err && err.code || 'error'); clearTimeout(timer); scheduleRender(); });
  }
}
let rq = 0; function scheduleRender() { if (rq) return; rq = requestAnimationFrame(() => { rq = 0; if (route().view === 'desk' || previewMode() || S.isEditor) render(true); }); }
const counts = () => {
  const a = S.desk.articles; return {
    awaiting: a.filter(x => ['draft', 'review'].includes(x.status)).length, held: a.filter(x => x.status === 'held').length, published: a.filter(x => x.status === 'published').length,
    enq: S.desk.enquiries.filter(x => (x.status || 'new') === 'new').length, subs: S.desk.subscribers.length, subm: S.desk.submissions.filter(x => (x.status || 'new') === 'new').length, tips: S.desk.tips.filter(x => (x.status || 'new') === 'new').length
  };
};
function audit(action, slug, detail) { if (!S.db) return; S.db.collection('audit').add({ at: nowIso(), by: S.uid || 'editor', action, slug: slug || '', detail: detail || '' }).catch(() => {}); }
const who = id => id === 'claude' ? 'Claude (automation)' : id === S.uid ? 'You' : 'Editor';
function deskShell(dv, inner) {
  const c = counts();
  const badge = { stories: c.awaiting, enquiries: c.enq, directory: c.subm, tips: c.tips };
  return `<div class="desk"><aside class="desk-side"><div class="brandline">The Melbourne <em>Indian.</em></div><small>Newsroom desk</small><nav aria-label="Desk">${DESK_NAV.map(([k, lab]) => `<a href="${href.desk(k)}"${dv === k ? ' aria-current="page"' : ''}><span>${lab}</span>${badge[k] ? `<span class="cnt">${badge[k]}</span>` : ''}</a>`).join('')}<hr><a href="#en">View public site</a></nav></aside><section class="desk-main">${inner}</section></div>`;
}
function siteStatus() {
  const pubDb = S.desk.articles.filter(a => a.status === 'published');
  const pubSite = (site.articles || []);
  const sig = list => list.map(a => a.slug + ':' + (a.updated || '')).sort().join('|');
  const dirty = sig(pubDb) !== sig(pubSite) || JSON.stringify((S.desk.dates || []).map(d => [d.date, d.en]).sort()) !== JSON.stringify((site.dates || []).map(d => [d.date, d.en]).sort())
    || JSON.stringify(S.desk.ads.filter(x => x.status === 'live').map(x => x._id + (x.updated || '')).sort()) !== JSON.stringify((site.ads || []).map(x => x._id + (x.updated || '')).sort())
    || JSON.stringify(S.desk.directory.filter(x => x.status === 'approved').map(x => x._id + (x.updated || '')).sort()) !== JSON.stringify((site.directory || []).map(x => x._id + (x.updated || '')).sort());
  return { dirty, pubDb: pubDb.length, pubSite: pubSite.length };
}
function viewDesk(r) {
  if (!S.isEditor) {
    return chrome({ lang: 'en', view: 'page' }, `<div class="wrap page-grid"><article class="prose"><h1>Newsroom desk</h1><p class="dek">The desk is for The Melbourne Indian's editors. It is not available on this website.</p><a class="btn" href="#en">Go to the front page</a></article></div>`);
  }
  startDesk();
  if (!S.deskLoaded) return deskShell(r.dv, `<h1>Loading the desk…</h1><p class="desk-sub">${esc(S.deskErr || 'Connecting to the newsroom database.')}</p>`);
  const fn = { overview: dOverview, stories: dStories, edit: dEdit, dates: dDates, images: dImages, enquiries: dEnquiries, ads: dAds, directory: dDirectory, newsletter: dNewsletter, tips: dTips, automation: dAutomation, audit: dAudit }[r.dv];
  if (r.dv === 'preview') { S.ui.preview = true; location.hash = 'en'; return ''; }
  return deskShell(r.dv === 'edit' ? 'stories' : r.dv, fn ? fn(r) : dOverview(r));
}
function dOverview() {
  const c = counts(), st = siteStatus();
  const queue = S.desk.articles.filter(a => ['draft', 'review', 'held'].includes(a.status)).sort((a, b) => (b.priority || 0) - (a.priority || 0));
  return `<h1>Good ${new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}</h1><p class="desk-sub">${esc(longDate(today(), 'en'))}. Here is what needs you today.</p>
<div class="tiles"><a class="tile${c.awaiting ? ' attn' : ''}" href="${href.desk('stories')}"><b>${c.awaiting}</b><span>Stories awaiting approval</span></a><a class="tile" href="${href.desk('stories')}"><b>${c.held}</b><span>Held for checks</span></a><a class="tile" href="${href.desk('stories')}"><b>${c.published}</b><span>Published</span></a><a class="tile${c.enq ? ' attn' : ''}" href="${href.desk('enquiries')}"><b>${c.enq}</b><span>New advertiser enquiries</span></a><a class="tile" href="${href.desk('newsletter')}"><b>${c.subs}</b><span>Newsletter subscribers</span></a><a class="tile${c.subm ? ' attn' : ''}" href="${href.desk('directory')}"><b>${c.subm}</b><span>Directory submissions</span></a><a class="tile${c.tips ? ' attn' : ''}" href="${href.desk('tips')}"><b>${c.tips}</b><span>Reader tips</span></a></div>
<div class="panel"><h2>Public site</h2><p>${st.pubSite} stories are live on the public site. ${st.dirty ? `<strong>There are approved changes that are not live yet.</strong>` : 'Everything approved is live.'}</p><div class="actions"><button class="btn${st.dirty ? ' saffron' : ''}" data-act="publish-site">Publish site update</button><a class="btn ghost" href="${href.desk('preview')}">Preview front page with drafts</a></div><div class="out" id="pub-out" aria-live="polite"></div></div>
<div class="panel"><h2>Review queue</h2>${queue.length ? `<div class="table-wrap"><table class="dtable"><thead><tr><th>Status</th><th>Risk</th><th>Story</th><th>Section</th></tr></thead><tbody>${queue.map(a => `<tr class="click" data-go="${href.desk('edit', a.slug)}"><td><span class="badge b-${esc(a.status)}">${esc(a.status)}</span></td><td><span class="badge b-${esc(a.risk || 'green')}">${esc(a.risk || 'green')}</span></td><td class="hl">${esc(a.en?.headline)}<div class="small muted" style="font-family:var(--sans)">${esc(a.desk_note || a.risk_note || '')}</div></td><td>${esc(T.en.sec[a.section] || a.section)}</td></tr>`).join('')}</tbody></table></div>` : '<p class="muted">Nothing waiting. Nice.</p>'}</div>
<div class="panel"><h2>Recent activity</h2>${auditList(8)}</div>`;
}
function auditList(n) { const a = S.desk.audit.slice(0, n); return a.length ? `<ul class="morelist">${a.map(x => `<li class="small"><span class="tnum muted">${esc((x.at || '').replace('T', ' ').slice(0, 16))}</span> · <strong>${esc(who(x.by))}</strong> ${esc(x.action)} ${x.slug ? `<a href="${href.desk('edit', x.slug)}">${esc(x.slug)}</a>` : ''} <span class="muted">${esc(x.detail || '')}</span></li>`).join('')}</ul>` : '<p class="muted small">No activity yet.</p>'; }
function dStories() {
  const f = S.ui.storyFilter || 'all';
  const list = S.desk.articles.filter(a => f === 'all' || a.status === f || (f === 'awaiting' && ['draft', 'review'].includes(a.status))).sort((a, b) => (b.updated || b.date || '').localeCompare(a.updated || a.date || ''));
  const chips = [['all', 'All'], ['awaiting', 'Awaiting approval'], ['held', 'Held'], ['published', 'Published'], ['archived', 'Archived']];
  return `<h1>Stories</h1><p class="desk-sub">Every story, in every state. Nothing reaches the public site until you approve it and publish the site update.</p>
<div class="toolbar">${chips.map(([k, lab]) => `<button class="chip" aria-pressed="${f === k}" data-act="story-filter" data-v="${k}">${lab}</button>`).join('')}<span style="flex:1"></span><button class="btn sm" data-act="new-story-open">New story</button></div>
${S.ui.newStory ? `<form class="panel" data-dform="new-story"><h2>New story</h2><div class="row2"><div class="field"><label for="ns-h">Working headline</label><input id="ns-h" name="headline" type="text" required></div><div class="field"><label for="ns-s">Section</label><select id="ns-s" name="section">${SECTIONS.map(s => `<option value="${s}">${T.en.sec[s]}</option>`).join('')}</select></div></div><div class="actions" style="margin-top:12px"><button class="btn" type="submit">Create draft</button><button class="btn ghost" type="button" data-act="new-story-cancel">Cancel</button></div></form>` : ''}
<div class="panel"><div class="table-wrap"><table class="dtable"><thead><tr><th>Status</th><th>Risk</th><th>Headline</th><th>Section</th><th>Editions</th><th>Image</th><th>Updated</th></tr></thead><tbody>${list.map(a => `<tr class="click" data-go="${href.desk('edit', a.slug)}"><td><span class="badge b-${esc(a.status)}">${esc(a.status)}</span></td><td><span class="badge b-${esc(a.risk || 'green')}">${esc(a.risk || 'green')}</span></td><td class="hl">${esc(a.en?.headline || a.slug)}</td><td>${esc(T.en.sec[a.section] || a.section)}</td><td class="langpills">${LANGS.map(x => `<span class="${has(a, x) ? 'on' : ''}">${x.toUpperCase()}</span>`).join('')}</td><td>${a.image?.url ? '✓ Photo' : '<span class="muted">Graphic</span>'}</td><td class="tnum small">${esc((a.updated || a.date || '').slice(0, 10))}</td></tr>`).join('') || `<tr><td colspan="7" class="muted">No stories in this view.</td></tr>`}</tbody></table></div></div>`;
}
/* --- body text <-> blocks --- */
function blocksToText(blocks) {
  return (blocks || []).map(b => typeof b === 'string' ? b : b.h ? '## ' + b.h : b.note ? '> ' + b.note : b.ul ? b.ul.map(x => '- ' + x).join('\n') : b.dl ? b.dl.map(([k, v]) => '| ' + k + ' | ' + v).join('\n') : '').join('\n\n');
}
function textToBlocks(txt) {
  const out = [];
  for (const chunk of String(txt || '').replace(/\r/g, '').split(/\n\s*\n/)) {
    const c = chunk.trim(); if (!c) continue;
    const lines = c.split('\n').map(s => s.trim()).filter(Boolean);
    if (c.startsWith('## ')) out.push({ h: c.slice(3).trim() });
    else if (c.startsWith('> ')) out.push({ note: lines.map(s => s.replace(/^>\s?/, '')).join(' ') });
    else if (lines.every(s => s.startsWith('- '))) out.push({ ul: lines.map(s => s.slice(2).trim()) });
    else if (lines.every(s => s.startsWith('|'))) out.push({ dl: lines.map(s => s.replace(/^\|\s*/, '').split('|').map(x => x.trim())).map(([k, v]) => [k || '', v || '']) });
    else out.push(lines.join(' '));
  }
  return out;
}
function dEdit(r) {
  const a = S.desk.articles.find(x => x.slug === r.arg);
  if (!a) return `<h1>Story not found</h1><p><a href="${href.desk('stories')}">Back to stories</a></p>`;
  const tab = S.ui.edTab || 'en';
  const v = a[tab] || { headline: '', dek: '', body: [] };
  const img = a.image || {};
  const tr = a.translations || {};
  const issues = approvalIssues(a);
  return `<p class="small"><a href="${href.desk('stories')}">← Stories</a></p><h1 style="font-size:26px">${esc(a.en?.headline || a.slug)}</h1>
<p class="desk-sub"><span class="badge b-${esc(a.status)}">${esc(a.status)}</span> <span class="badge b-${esc(a.risk || 'green')}">${esc(a.risk || 'green')} risk</span> · <a href="${href.art('en', a.slug)}">Preview story</a> · last updated ${esc((a.updated || '').replace('T', ' ').slice(0, 16) || a.date)}</p>
<form class="editor" data-dform="article" data-slug="${esc(a.slug)}">
<div>
<div class="panel"><div class="tabs" role="tablist">${LANGS.map(x => `<button type="button" role="tab" aria-selected="${tab === x}" data-act="ed-tab" data-v="${x}">${LANG_FULL[x]}${x !== 'en' ? (has(a, x) ? (tr[x] === 'reviewed' ? ' ✓' : ' · draft') : ' · none') : ''}</button>`).join('')}</div>
${tab !== 'en' ? `<div class="toolbar"><button type="button" class="btn sm ghost" data-act="translate" data-v="${tab}">Draft ${LANG_FULL[tab]} translation with Claude</button><label class="check"><input type="checkbox" name="tr_reviewed" ${tr[tab] === 'reviewed' ? 'checked' : ''}> A fluent editor has reviewed this translation</label>${has(a, tab) ? `<button type="button" class="btn sm danger" data-act="remove-lang" data-v="${tab}">Remove ${LANG_FULL[tab]} version</button>` : ''}</div><div class="out" id="tr-out" aria-live="polite"></div>` : ''}
<div class="field"><label for="e-h">Headline</label><input id="e-h" name="headline" type="text" value="${esc(v.headline)}" lang="${tab}"></div>
<div class="field" style="margin-top:10px"><label for="e-d">Standfirst</label><textarea id="e-d" name="dek" style="min-height:70px" lang="${tab}">${esc(v.dek)}</textarea></div>
<div class="field" style="margin-top:10px"><label for="e-b">Body</label><textarea id="e-b" name="body" style="min-height:380px;font-family:var(--serif);font-size:17px" lang="${tab}">${esc(blocksToText(v.body))}</textarea><small>Blank line between paragraphs. <code>## </code> subheading · <code>- </code> list item · <code>&gt; </code> note box · <code>| date | event</code> key-dates table.</small></div>
</div>
<div class="panel"><h2>Sources</h2><div class="field"><label for="e-src">One per line: Title | URL | date checked (YYYY-MM-DD)</label><textarea id="e-src" name="sources" style="min-height:120px">${esc((a.sources || []).map(s => [s.title, s.url, s.checked].join(' | ')).join('\n'))}</textarea></div>
<div class="field" style="margin-top:10px"><label for="e-cor">Corrections (one per line, shown publicly)</label><textarea id="e-cor" name="corrections" style="min-height:60px">${esc((a.corrections || []).join('\n'))}</textarea></div></div>
<div class="panel"><h2>Image</h2>${img.url ? `<figure style="max-width:420px"><div class="media"><img src="${esc(img.url)}" alt="${esc(img.alt?.en || '')}"></div><figcaption>${esc(img.caption?.en || '')} · ${esc(img.credit || '')} / ${esc(img.licence || '')}</figcaption></figure>` : `<p class="muted small">No photo yet. The story uses a designed section graphic until one is added.</p>`}
${(a.image_candidates || []).length ? `<p class="small"><strong>Licensed candidates found by the newsroom:</strong></p><ul class="small">${a.image_candidates.map(c => `<li><a href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.title)}</a>${c.caption ? `<br><span class="muted">Suggested caption: ${esc(c.caption)}</span>` : ''}${c.alt ? `<br><span class="muted">Suggested alt text: ${esc(c.alt)}</span>` : ''}</li>`).join('')}</ul><p class="small muted">Open the page, check the licence allows commercial reuse, download the largest size, then upload it below with the author's credit exactly as shown.</p>` : ''}
${S.assets ? `<div class="row2"><div class="field"><label for="i-file">Photo file</label><input id="i-file" name="i_file" type="file" accept="image/jpeg,image/png,image/webp"></div><div class="field"><label for="i-credit">Credit (photographer / owner)</label><input id="i-credit" name="i_credit" type="text" value="${esc(img.credit || '')}"></div><div class="field"><label for="i-lic">Licence (e.g. CC BY-SA 4.0, own photo, supplied with permission)</label><input id="i-lic" name="i_licence" type="text" value="${esc(img.licence || '')}"></div><div class="field"><label for="i-src">Source URL</label><input id="i-src" name="i_source" type="url" value="${esc(img.sourceUrl || '')}"></div></div><div class="field" style="margin-top:10px"><label for="i-cap">Caption (English)</label><input id="i-cap" name="i_caption" type="text" value="${esc(img.caption?.en || (a.image_candidates || [])[0]?.caption || '')}"></div><div class="field" style="margin-top:10px"><label for="i-alt">Alt text (describe what is in the photo)</label><input id="i-alt" name="i_alt" type="text" value="${esc(img.alt?.en || (a.image_candidates || [])[0]?.alt || '')}"></div><div class="actions" style="margin-top:10px"><button type="button" class="btn sm" data-act="save-image">Save image</button>${img.url ? '<button type="button" class="btn sm danger" data-act="remove-image">Remove image</button>' : ''}</div><div class="out" id="img-out" aria-live="polite"></div>` : '<p class="small muted">Photo uploads are available to editors in the Claude app.</p>'}</div>
</div>
<div>
<div class="panel"><h2>Publishing</h2>
${issues.length ? `<p class="small"><strong>Before approval:</strong></p><ul class="warnlist">${issues.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : '<p class="small" style="color:var(--ok)">Ready to approve.</p>'}
${a.risk === 'red' ? `<label class="check" style="margin-top:10px"><input type="checkbox" name="red_ok" ${a.red_reviewed ? 'checked' : ''}> I have completed the editorial/legal review this story needs</label>` : ''}
<div class="actions" style="margin-top:12px"><button class="btn" type="submit">Save</button>${a.status !== 'published' ? `<button type="button" class="btn saffron" data-act="approve">Approve &amp; publish</button>` : `<button type="button" class="btn ghost" data-act="unpublish">Unpublish</button>`}${a.status !== 'held' ? `<button type="button" class="btn ghost" data-act="hold">Hold</button>` : `<button type="button" class="btn ghost" data-act="to-draft">Move to drafts</button>`}</div>
<div class="out" id="ed-out" aria-live="polite"></div>
${S.ui.confirm === 'archive' ? `<div class="confirm">Archive this story? It will be removed from the site and the review queue. <div class="actions" style="margin-top:8px"><button type="button" class="btn sm danger" data-act="archive-yes">Archive</button><button type="button" class="btn sm ghost" data-act="confirm-no">Cancel</button></div></div>` : `<p style="margin-top:12px"><button type="button" class="btn sm danger" data-act="archive">Archive story</button></p>`}
</div>
<div class="panel"><h2>Details</h2>
<div class="field"><label for="e-sec">Section</label><select id="e-sec" name="section">${SECTIONS.map(s => `<option value="${s}"${a.section === s ? ' selected' : ''}>${T.en.sec[s]}</option>`).join('')}</select></div>
<div class="field" style="margin-top:8px"><label for="e-type">Type</label><select id="e-type" name="type">${Object.entries(T.en.type).map(([k, lab]) => `<option value="${k}"${(a.type || 'news') === k ? ' selected' : ''}>${lab}</option>`).join('')}</select></div>
<div class="field" style="margin-top:8px"><label for="e-risk">Risk level</label><select id="e-risk" name="risk">${['green', 'amber', 'red'].map(k => `<option value="${k}"${(a.risk || 'green') === k ? ' selected' : ''}>${k}</option>`).join('')}</select></div>
<div class="field" style="margin-top:8px"><label for="e-rn">Risk note</label><textarea id="e-rn" name="risk_note" style="min-height:70px">${esc(a.risk_note || '')}</textarea></div>
<div class="field" style="margin-top:8px"><label for="e-dn">Desk note (internal)</label><textarea id="e-dn" name="desk_note" style="min-height:70px">${esc(a.desk_note || '')}</textarea></div>
<div class="field" style="margin-top:8px"><label for="e-by">Byline</label><input id="e-by" name="byline" type="text" value="${esc(a.byline || 'The Melbourne Indian newsroom')}"></div>
<div class="row2" style="margin-top:8px"><div class="field"><label for="e-date">Date</label><input id="e-date" name="date" type="date" value="${esc(a.date || today())}"></div><div class="field"><label for="e-pri">Priority</label><input id="e-pri" name="priority" type="number" min="0" max="10" value="${esc(a.priority ?? 5)}"><small>9 or 10 puts it in the front-page carousel (big news only). Hard news at 9+ gets JUST IN for 24 hours.</small></div></div>
<label class="check" style="margin-top:8px"><input type="checkbox" name="featured" ${a.featured ? 'checked' : ''}> Lead story on the front page</label>
<div class="row2" style="margin-top:8px"><div class="field"><label for="e-fv">Graphic figure</label><input id="e-fv" name="fig_value" type="text" value="${esc(a.figure?.value || '')}"></div><div class="field"><label for="e-fl">Figure label (EN)</label><input id="e-fl" name="fig_en" type="text" value="${esc(a.figure?.en || '')}"></div></div>
</div>
</div>
</form>`;
}
function approvalIssues(a) {
  const p = [];
  if (!a.en?.headline) p.push('English headline is missing.');
  if (!a.en?.dek) p.push('English standfirst is missing.');
  if (!(a.en?.body || []).length) p.push('English body is empty.');
  if (a.type !== 'notice' && !(a.sources || []).length) p.push('Add at least one source.');
  for (const x of ['hi', 'pa']) if (has(a, x) && (a.translations || {})[x] !== 'reviewed') p.push(`${LANG_FULL[x]} translation has not been marked as reviewed.`);
  if (a.image?.url && (!a.image.credit || !a.image.licence || !a.image.alt?.en)) p.push('Image needs a credit, licence and alt text.');
  if (a.risk === 'red' && !a.red_reviewed) p.push('Red-risk story: confirm the editorial/legal review.');
  return p;
}
function readArticleForm(form, a) {
  const fd = new FormData(form); const g = k => (fd.get(k) ?? '').toString();
  const tab = S.ui.edTab || 'en';
  const upd = { section: g('section') || a.section, type: g('type') || 'news', risk: g('risk') || 'green', risk_note: g('risk_note'), desk_note: g('desk_note'), byline: g('byline'), date: g('date') || a.date, priority: Number(g('priority') || 5), featured: !!fd.get('featured'), updated: nowIso() };
  upd.figure = { ...(a.figure || {}), value: g('fig_value'), en: g('fig_en') };
  upd.sources = g('sources').split('\n').map(s => s.trim()).filter(Boolean).map(line => { const [title, url, checked] = line.split('|').map(x => (x || '').trim()); return { title, url, checked: checked || today() }; });
  upd.corrections = g('corrections').split('\n').map(s => s.trim()).filter(Boolean);
  const lv = { headline: g('headline').trim(), dek: g('dek').trim(), body: textToBlocks(g('body')) };
  if (tab === 'en' || lv.headline || lv.dek || lv.body.length) upd[tab] = lv;
  if (tab !== 'en') upd.translations = { ...(a.translations || {}), [tab]: fd.get('tr_reviewed') ? 'reviewed' : (a.translations || {})[tab] === 'reviewed' && !fd.get('tr_reviewed') ? 'draft' : ((a.translations || {})[tab] || 'draft') };
  if (a.risk === 'red' || upd.risk === 'red') upd.red_reviewed = !!fd.get('red_ok');
  return upd;
}
async function saveArticle(form, extra = {}) {
  const slug = form.dataset.slug; const a = S.desk.articles.find(x => x.slug === slug); if (!a) return null;
  const upd = { ...readArticleForm(form, a), ...extra };
  try { await S.db.doc('articles/' + slug).update(upd); return { ...a, ...upd }; }
  catch (e) { const o = document.getElementById('ed-out'); if (o) o.innerHTML = `<p class="status err">Could not save (${esc(e.code || 'error')}). Your edits are still on the page.</p>`; return null; }
}

/* --- other desk views --- */
function dDates() {
  const list = [...S.desk.dates].sort((a, b) => (a.date || '').localeCompare(b.date || ''));
  return `<h1>Key dates</h1><p class="desk-sub">Shown in the ticker and "Dates to know" boxes. Past dates hide themselves.</p>
<div class="panel"><div class="table-wrap"><table class="dtable"><thead><tr><th>Date</th><th>English</th><th>हिन्दी</th><th>ਪੰਜਾਬੀ</th><th>Story</th><th></th></tr></thead><tbody>${list.map(d => `<tr><td class="tnum">${esc(d.date)}</td><td>${esc(d.en)}</td><td lang="hi">${esc(d.hi || '')}</td><td lang="pa">${esc(d.pa || '')}</td><td class="small">${esc(d.slug || '')}</td><td><button class="btn sm danger" data-act="del-doc" data-coll="dates" data-id="${esc(d._id)}">Delete</button></td></tr>`).join('')}</tbody></table></div></div>
<form class="panel" data-dform="date"><h2>Add a date</h2><div class="row2"><div class="field"><label for="dt-d">Date</label><input id="dt-d" name="date" type="date" required></div><div class="field"><label for="dt-s">Linked story</label><select id="dt-s" name="slug"><option value="">None</option>${S.desk.articles.map(a => `<option value="${esc(a.slug)}">${esc(a.en?.headline || a.slug)}</option>`).join('')}</select></div><div class="field"><label for="dt-en">English</label><input id="dt-en" name="en" type="text" required></div><div class="field"><label for="dt-hi">हिन्दी (optional)</label><input id="dt-hi" name="hi" type="text" lang="hi"></div><div class="field"><label for="dt-pa">ਪੰਜਾਬੀ (optional)</label><input id="dt-pa" name="pa" type="text" lang="pa"></div></div><div class="actions" style="margin-top:12px"><button class="btn" type="submit">Add date</button></div></form>`;
}
function dImages() {
  const rows = S.desk.articles.filter(a => a.status !== 'archived');
  return `<h1>Image register</h1><p class="desk-sub">Every photo's source and usage rights, in one place. Stories without a photo use a designed section graphic. We never use photos from competing publications or AI-generated images of real events.</p>
<div class="panel"><div class="table-wrap"><table class="dtable"><thead><tr><th>Story</th><th>Status</th><th>Photo</th><th>Credit / licence</th><th>Source</th><th>Candidates</th></tr></thead><tbody>${rows.map(a => `<tr><td class="hl"><a href="${href.desk('edit', a.slug)}">${esc(a.en?.headline || a.slug)}</a></td><td><span class="badge b-${esc(a.status)}">${esc(a.status)}</span></td><td>${a.image?.url ? '✓' : '<span class="muted">Graphic</span>'}</td><td class="small">${esc(a.image?.credit || '')}${a.image?.licence ? ' / ' + esc(a.image.licence) : ''}</td><td class="small">${a.image?.sourceUrl ? `<a href="${esc(a.image.sourceUrl)}" target="_blank" rel="noopener">Link</a>` : ''}</td><td class="small">${(a.image_candidates || []).map(c => `<a href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.title)}</a>`).join('<br>') || '<span class="muted">Data graphic suits this story</span>'}</td></tr>`).join('')}</tbody></table></div></div>`;
}
const ENQ_ST = ['new', 'contacted', 'proposal sent', 'won', 'lost'];
function dEnquiries() {
  const list = [...S.desk.enquiries].sort((a, b) => (b.submittedAt || '').localeCompare(a.submittedAt || ''));
  return `<h1>Advertiser enquiries</h1><p class="desk-sub">From the advertise form, plus any you add from email or phone calls.</p>
<div class="panel">${list.length ? list.map(x => `<div class="list-card"><h3>${esc(x.business || 'Unnamed business')} <span class="badge b-${x.status === 'won' ? 'published' : x.status === 'lost' ? 'held' : 'draft'}">${esc(x.status || 'new')}</span>${x.sample ? ' <span class="badge b-review">sample</span>' : ''}</h3><dl class="kv"><dt>Contact</dt><dd>${esc(x.name || '')} · <a href="mailto:${esc(x.email || '')}">${esc(x.email || '')}</a> ${esc(x.phone || '')}</dd><dt>Package</dt><dd>${esc(x.package || '')}</dd><dt>Message</dt><dd>${esc(x.message || '')}</dd><dt>Received</dt><dd class="tnum">${esc((x.submittedAt || '').slice(0, 16).replace('T', ' '))}</dd></dl><div class="actions"><select aria-label="Status" data-act="set-field" data-coll="enquiries" data-id="${esc(x._id)}" data-field="status">${ENQ_ST.map(s => `<option${(x.status || 'new') === s ? ' selected' : ''}>${s}</option>`).join('')}</select><input type="text" aria-label="Notes" placeholder="Notes" value="${esc(x.notes || '')}" data-act="set-field" data-coll="enquiries" data-id="${esc(x._id)}" data-field="notes" style="max-width:360px"></div></div>`).join('') : '<p class="muted">No enquiries yet. They will appear here as they arrive.</p>'}</div>
<form class="panel" data-dform="enquiry"><h2>Log an enquiry</h2><div class="row2"><div class="field"><label for="en-b">Business</label><input id="en-b" name="business" type="text" required></div><div class="field"><label for="en-n">Contact name</label><input id="en-n" name="name" type="text"></div><div class="field"><label for="en-e">Email</label><input id="en-e" name="email" type="email"></div><div class="field"><label for="en-p">Phone</label><input id="en-p" name="phone" type="tel"></div></div><div class="field" style="margin-top:10px"><label for="en-m">Notes / message</label><textarea id="en-m" name="message"></textarea></div><div class="actions" style="margin-top:10px"><button class="btn" type="submit">Add enquiry</button></div></form>`;
}
function dAds() {
  const list = [...S.desk.ads].sort((a, b) => (b.start || '').localeCompare(a.start || ''));
  const ed = S.ui.adEdit ? S.desk.ads.find(x => x._id === S.ui.adEdit) || {} : {};
  return `<h1>Ad bookings</h1><p class="desk-sub">Three placements: <strong>leaderboard</strong> (front page band), <strong>mrec</strong> (right-hand rail) and <strong>inline</strong> (inside articles). Only bookings marked <em>live</em>, within their dates, appear after a site update. Every ad is labelled "Advertisement".</p>
<div class="panel"><div class="table-wrap"><table class="dtable"><thead><tr><th>Status</th><th>Advertiser</th><th>Slot</th><th>Dates</th><th>Price</th><th></th></tr></thead><tbody>${list.map(x => `<tr><td><span class="badge b-${x.status === 'live' ? 'published' : x.status === 'sample' ? 'review' : 'draft'}">${esc(x.status)}</span></td><td>${esc(x.advertiser)}<div class="small muted">${esc(x.headline || '')}</div></td><td>${esc(x.slot)}</td><td class="tnum small">${esc(x.start || '')} → ${esc(x.end || '')}</td><td class="num">${esc(x.price || '')}</td><td><button class="btn sm ghost" data-act="ad-edit" data-id="${esc(x._id)}">Edit</button></td></tr>`).join('') || '<tr><td colspan="6" class="muted">No bookings yet.</td></tr>'}</tbody></table></div></div>
<form class="panel" data-dform="ad" data-id="${esc(ed._id || '')}"><h2>${ed._id ? 'Edit booking' : 'New booking'}</h2><div class="row2"><div class="field"><label for="ad-a">Advertiser</label><input id="ad-a" name="advertiser" type="text" required value="${esc(ed.advertiser || '')}"></div><div class="field"><label for="ad-s">Slot</label><select id="ad-s" name="slot">${['mrec', 'leaderboard', 'inline'].map(s => `<option${ed.slot === s ? ' selected' : ''}>${s}</option>`).join('')}</select></div><div class="field"><label for="ad-st">Start</label><input id="ad-st" name="start" type="date" value="${esc(ed.start || '')}"></div><div class="field"><label for="ad-en">End</label><input id="ad-en" name="end" type="date" value="${esc(ed.end || '')}"></div><div class="field"><label for="ad-h">Headline</label><input id="ad-h" name="headline" type="text" value="${esc(ed.headline || '')}"></div><div class="field"><label for="ad-u">Link URL</label><input id="ad-u" name="url" type="url" value="${esc(ed.url || '')}"></div><div class="field"><label for="ad-c">Button text</label><input id="ad-c" name="cta" type="text" value="${esc(ed.cta || 'Learn more')}"></div><div class="field"><label for="ad-p">Price</label><input id="ad-p" name="price" type="text" value="${esc(ed.price || '')}"></div></div><div class="field" style="margin-top:10px"><label for="ad-t">Ad text (up to 30 words)</label><textarea id="ad-t" name="text" style="min-height:70px">${esc(ed.text || '')}</textarea></div><div class="field" style="margin-top:10px"><label for="ad-sta">Status</label><select id="ad-sta" name="status">${['booked', 'live', 'ended', 'sample'].map(s => `<option${(ed.status || 'booked') === s ? ' selected' : ''}>${s}</option>`).join('')}</select></div><div class="actions" style="margin-top:12px"><button class="btn" type="submit">${ed._id ? 'Save booking' : 'Add booking'}</button>${ed._id ? '<button type="button" class="btn ghost" data-act="ad-new">New booking</button>' : ''}</div></form>`;
}
function dDirectory() {
  const subs = [...S.desk.submissions].sort((a, b) => (b.submittedAt || '').localeCompare(a.submittedAt || ''));
  const list = S.desk.directory;
  return `<h1>Business directory</h1><p class="desk-sub">Submissions from the public form. Check each business before approving it; approved listings appear after a site update.</p>
<div class="panel"><h2>Listings</h2><div class="table-wrap"><table class="dtable"><thead><tr><th>Status</th><th>Business</th><th>Category</th><th>Suburb</th><th></th></tr></thead><tbody>${list.map(d => `<tr><td><span class="badge b-${d.status === 'approved' ? 'published' : d.status === 'sample' ? 'review' : 'draft'}">${esc(d.status)}</span></td><td>${esc(d.business)}<div class="small muted">${esc(d.description || '')}</div></td><td>${esc(d.category || '')}</td><td>${esc(d.suburb || '')}</td><td class="actions">${d.status !== 'approved' && d.status !== 'sample' ? `<button class="btn sm" data-act="set-status" data-coll="directory" data-id="${esc(d._id)}" data-v="approved">Approve</button>` : ''}${d.status === 'approved' ? `<button class="btn sm ghost" data-act="set-status" data-coll="directory" data-id="${esc(d._id)}" data-v="pending">Unlist</button>` : ''}<button class="btn sm danger" data-act="del-doc" data-coll="directory" data-id="${esc(d._id)}">Delete</button></td></tr>`).join('') || '<tr><td colspan="5" class="muted">No listings yet.</td></tr>'}</tbody></table></div></div>
<div class="panel"><h2>Submissions</h2>${subs.length ? subs.map(s => `<div class="list-card"><h3>${esc(s.business)} <span class="badge b-draft">${esc(s.status || 'new')}</span></h3><dl class="kv"><dt>Category</dt><dd>${esc(s.category || '')}</dd><dt>Suburb</dt><dd>${esc(s.suburb || '')}</dd><dt>Contact</dt><dd>${esc(s.email || '')} ${esc(s.phone || '')}</dd><dt>Website</dt><dd>${esc(s.website || '')}</dd><dt>Description</dt><dd>${esc(s.description || '')}</dd></dl><div class="actions"><button class="btn sm" data-act="sub-to-listing" data-id="${esc(s._id)}">Create pending listing</button><button class="btn sm ghost" data-act="set-status" data-coll="submissions" data-id="${esc(s._id)}" data-v="rejected">Reject</button></div></div>`).join('') : '<p class="muted">No submissions yet.</p>'}</div>`;
}
function dNewsletter() {
  const subs = S.desk.subscribers; const pub = sorted(S.desk.articles.filter(a => a.status === 'published'));
  const byEd = LANGS.map(x => [x, subs.filter(s => (s.editions || []).includes(x)).length]);
  return `<h1>Newsletter</h1><p class="desk-sub">Build each issue here from published stories. Sending needs an email service (see Automation &amp; costs); until one is connected, copy the finished HTML into it.</p>
<div class="tiles">${byEd.map(([x, n]) => `<div class="tile"><b>${n}</b><span>${LANG_FULL[x]} subscribers</span></div>`).join('')}<div class="tile"><b>${subs.length}</b><span>Total</span></div></div>
<div class="panel"><h2>Subscribers</h2>${subs.length ? `<div class="table-wrap"><table class="dtable"><thead><tr><th>Email</th><th>Name</th><th>Editions</th><th>Consented</th></tr></thead><tbody>${subs.map(s => `<tr><td>${esc(s.email)}</td><td>${esc(s.name || '')}</td><td>${esc((s.editions || []).join(', '))}</td><td class="tnum small">${esc((s.submittedAt || '').slice(0, 10))}</td></tr>`).join('')}</tbody></table></div>` : '<p class="muted">No subscribers yet.</p>'}<div class="actions" style="margin-top:10px"><button class="btn sm ghost" data-act="export-subs"${subs.length ? '' : ' disabled'}>Export CSV</button></div></div>
<form class="panel" data-dform="issue"><h2>Compose an issue</h2><div class="row2"><div class="field"><label for="nl-s">Subject</label><input id="nl-s" name="subject" type="text" value="${esc(S.ui.nl?.subject || 'This week in Melbourne\'s Indian communities')}"></div><div class="field"><label for="nl-e">Edition</label><select id="nl-e" name="edition">${LANGS.map(x => `<option value="${x}"${(S.ui.nl?.edition || 'en') === x ? ' selected' : ''}>${LANG_FULL[x]}</option>`).join('')}</select></div></div><div class="field" style="margin-top:10px"><label for="nl-i">Introduction</label><textarea id="nl-i" name="intro" style="min-height:80px">${esc(S.ui.nl?.intro || '')}</textarea></div><fieldset class="field" style="border:0;padding:0;margin:10px 0 0"><legend class="flabel">Stories</legend>${pub.map(a => `<label class="check"><input type="checkbox" name="story" value="${esc(a.slug)}"${(S.ui.nl?.stories || []).includes(a.slug) ? ' checked' : ''}> ${esc(a.en.headline)}</label>`).join('') || '<p class="muted small">Publish stories first.</p>'}</fieldset><div class="actions" style="margin-top:12px"><button class="btn" type="submit">Build preview</button>${S.ui.nlHtml ? '<button type="button" class="btn ghost" data-act="copy-nl">Copy HTML</button><button type="button" class="btn ghost" data-act="save-issue">Save issue</button>' : ''}</div>${S.ui.nlHtml ? `<iframe class="preview-frame" title="Newsletter preview" sandbox="" srcdoc="${esc(S.ui.nlHtml)}" style="margin-top:12px"></iframe><textarea id="nl-html" class="sr" aria-hidden="true">${esc(S.ui.nlHtml)}</textarea>` : ''}</form>
<div class="panel"><h2>Saved issues</h2>${S.desk.issues.length ? `<ul class="morelist">${S.desk.issues.map(i => `<li class="small"><strong>${esc(i.subject)}</strong> · ${esc(i.edition)} · ${esc((i.createdAt || '').slice(0, 10))} · ${(i.stories || []).length} stories</li>`).join('')}</ul>` : '<p class="muted">None yet.</p>'}</div>`;
}
function buildNewsletter(subject, edition, intro, slugs) {
  const arts = slugs.map(s => S.desk.articles.find(a => a.slug === s)).filter(Boolean);
  const items = arts.map(a => { const v = V(a, edition); return `<tr><td style="padding:16px 0;border-bottom:1px solid #ddd"><div style="font:700 11px Arial;letter-spacing:.08em;text-transform:uppercase;color:#BD5125">${esc(T[edition].sec[a.section])}</div><div style="font:600 21px Georgia,serif;margin:4px 0 6px;color:#181F1C">${esc(v.headline)}</div><div style="font:15px/1.5 Arial;color:#3B4540">${esc(v.dek)}</div></td></tr>`; }).join('');
  return `<!doctype html><html lang="${edition}"><head><meta charset="utf-8"><title>${esc(subject)}</title></head><body style="margin:0;background:#FAF8F3"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center"><table role="presentation" width="600" style="max-width:600px;width:100%" cellpadding="0" cellspacing="0"><tr><td style="padding:24px 20px;border-bottom:3px solid #181F1C"><div style="font:800 30px Georgia,serif;letter-spacing:-1px;color:#181F1C">The Melbourne <span style="color:#BD5125">Indian.</span></div><div style="font:700 10px Arial;letter-spacing:.17em;text-transform:uppercase;color:#66716B;margin-top:4px">${esc(T[edition].tagline)}</div></td></tr><tr><td style="padding:20px;font:16px/1.6 Arial;color:#181F1C">${esc(intro).replace(/\n/g, '<br>')}<table role="presentation" width="100%">${items}</table></td></tr><tr><td style="padding:20px;font:12px/1.5 Arial;color:#66716B;border-top:1px solid #ddd">You're receiving this because you subscribed to The Melbourne Indian. {{unsubscribe_link}}<br>The Melbourne Indian · ${NEWS}</td></tr></table></td></tr></table></body></html>`;
}
function dTips() {
  const list = [...S.desk.tips].sort((a, b) => (b.submittedAt || '').localeCompare(a.submittedAt || ''));
  return `<h1>Reader tips</h1><p class="desk-sub">Treat every tip as unverified. Check it independently before it informs any story.</p><div class="panel">${list.length ? list.map(x => `<div class="list-card"><h3>${esc((x.message || '').slice(0, 80))}${(x.message || '').length > 80 ? '…' : ''} <span class="badge b-draft">${esc(x.status || 'new')}</span></h3><p class="small">${esc(x.message || '')}</p><p class="small muted">${esc(x.name || 'Anonymous')} ${esc(x.email || '')} · ${esc((x.submittedAt || '').slice(0, 10))}</p><div class="actions"><button class="btn sm ghost" data-act="set-status" data-coll="tips" data-id="${esc(x._id)}" data-v="actioned">Mark actioned</button></div></div>`).join('') : '<p class="muted">No tips yet.</p>'}</div>`;
}
function dAutomation() {
  const runs = [...S.desk.runs].sort((a, b) => (b.at || '').localeCompare(a.at || ''));
  return `<h1>Automation &amp; costs</h1><p class="desk-sub">How the newsroom runs, and what anything costs.</p>
<div class="panel"><h2>Daily newsroom run</h2><p>Each morning a scheduled Claude task, running on your existing Claude subscription, checks official and community sources, researches up to five candidate stories, and saves them here as <strong>drafts</strong> with sources, risk ratings and suggested images. While the workflow is being tested, <strong>nothing is published without your approval</strong>.</p>${runs.length ? `<ul class="morelist">${runs.slice(0, 10).map(x => `<li class="small"><span class="tnum muted">${esc((x.at || '').slice(0, 16).replace('T', ' '))}</span> · ${esc(x.summary || '')}</li>`).join('')}</ul>` : '<p class="muted small">No runs recorded yet.</p>'}</div>
<div class="panel"><h2>Running costs</h2><div class="table-wrap"><table><thead><tr><th>Service</th><th>What it does</th><th>Cost</th></tr></thead><tbody>
<tr><td>Claude subscription (existing)</td><td>Research, drafting, translation drafts, this desk, hosting this preview</td><td>Already paid</td></tr>
<tr><td>Domain themelbourneindian.com.au</td><td>Your address on the web</td><td>Already purchased</td></tr>
<tr><td>Email mailboxes (news@, ads@)</td><td>Receiving reader and advertiser email</td><td>Free tiers exist (e.g. Zoho Mail); Google Workspace is paid per user</td></tr>
<tr><td>Public hosting on your domain</td><td>Serving the site at themelbourneindian.com.au with forms open to everyone</td><td>Free tiers exist (e.g. Cloudflare Pages); <strong>not set up. Needs your approval</strong></td></tr>
<tr><td>Newsletter sending</td><td>Sending issues to subscribers with unsubscribe handling</td><td>Free tiers exist for small lists (e.g. Brevo, MailerLite); <strong>not set up. Needs your approval</strong></td></tr>
</tbody></table></div></div>`;
}
function dAudit() { return `<h1>Audit log</h1><p class="desk-sub">Who did what, and when. Kept for accountability.</p><div class="panel">${auditList(150)}</div>`; }

/* ================= publishing ================= */
function snapshotFromDesk() {
  const strip = a => { const { desk_note, risk_note, image_candidates, red_reviewed, _id, ...rest } = a; return rest; };
  return {
    builtAt: nowIso(), version: 2,
    articles: S.desk.articles.filter(a => a.status === 'published').map(strip),
    dates: S.desk.dates.map(({ _id, ...d }) => d),
    fixtures: site.fixtures || [], scores: site.scores || [], scoresAt: site.scoresAt || '',  // upcoming matches, maintained by Claude in data/site.json
    ads: S.desk.ads.filter(x => x.status === 'live').map(x => ({ ...x })),
    directory: S.desk.directory.filter(x => x.status === 'approved').map(x => ({ ...x })),
    pages: site.pages
  };
}
const RESET = ':root{color-scheme:light;padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom)}body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}';
function buildDocument(snap) {
  const head = document.getElementById('headbits').innerHTML;
  const css = document.getElementById('css').textContent;
  const js = document.getElementById('appjs').textContent;
  const data = JSON.stringify(snap).replace(/</g, '\\u003c');
  return `<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover"><style>${RESET}</style></head><body><template id="headbits">${head}</template>${head}<style id="css">${css}</style><script id="snapshot" type="application/json">${data}<\/script><div id="app"></div><script id="appjs">${js}<\/script></body></html>`;
}
async function publishSite() {
  const out = document.getElementById('pub-out');
  const say = (m, ok) => { if (out) out.innerHTML = `<p class="status ${ok ? 'ok' : 'err'}">${esc(m)}</p>`; else toast(m); };
  if (!S.artifact) { say('Publishing is available to editors in the Claude app. Ask Claude to publish the update instead.'); return; }
  const snap = snapshotFromDesk();
  say('Publishing…', true);
  try {
    await S.artifact.publish({ 'data/site.json': { content: JSON.stringify(snap), contentType: 'application/json' } });
    site = snap; audit('published site update', '', `${snap.articles.length} stories live`); say(`Published. ${snap.articles.length} stories are live.`, true); render(true);
  } catch (e) {
    if (e && (e.code === 'capability_disabled' || e.code === 'not_granted' || e.code === 'bad_request' || e.code === 'read_only_path')) {
      try { audit('published site update (full page)', '', `${snap.articles.length} stories live`); await S.artifact.publish(buildDocument(snap)); return; }
      catch (e2) { say('Could not publish (' + (e2.code || 'error') + '). Ask Claude to publish the update.'); return; }
    }
    if (e && e.code === 'conflict') { say('Someone published at the same time. The page will reload; try again.'); return; }
    say('Could not publish (' + (e && e.code || 'error') + ').');
  }
}

/* ================= events ================= */
document.addEventListener('click', async ev => {
  const go = ev.target.closest('[data-go]'); if (go && !ev.target.closest('a,button,input,select,textarea')) { location.hash = go.dataset.go.slice(1); return; }
  const b = ev.target.closest('[data-act]'); if (!b || b.tagName === 'SELECT' || (b.tagName === 'INPUT' && b.type !== 'checkbox')) return;
  const act = b.dataset.act; const r = route();
  const form = b.closest('form');
  switch (act) {
    case 'exit-preview': S.ui.preview = false; render(); break;
    case 'copy-form': { const pre = b.closest('.status').querySelector('.copytxt'); copyText(pre.textContent, pre); break; }
    case 'publish-site': publishSite(); break;
    case 'story-filter': S.ui.storyFilter = b.dataset.v; render(); break;
    case 'new-story-open': S.ui.newStory = true; render(); break;
    case 'new-story-cancel': S.ui.newStory = false; render(); break;
    case 'ed-tab': { const f = b.closest('form'); if (f) await saveArticle(f); S.ui.edTab = b.dataset.v; render(); break; }
    case 'approve': case 'unpublish': case 'hold': case 'to-draft': {
      const f = b.closest('form'); const saved = await saveArticle(f); if (!saved) return;
      const o = document.getElementById('ed-out');
      if (act === 'approve') {
        const iss = approvalIssues(saved); if (iss.length) { o.innerHTML = `<p class="status err">Not approved yet: ${esc(iss.join(' '))}</p>`; return; }
        await S.db.doc('articles/' + saved.slug).update({ status: 'published', approvedAt: nowIso(), approvedBy: S.uid || 'editor' });
        audit('approved', saved.slug); o.innerHTML = `<p class="status ok">Approved. Publishing the site update…</p>`; setTimeout(publishSite, 300);
      } else {
        const st = { unpublish: 'draft', hold: 'held', 'to-draft': 'draft' }[act];
        await S.db.doc('articles/' + saved.slug).update({ status: st }); audit(act === 'unpublish' ? 'unpublished' : act === 'hold' ? 'held' : 'moved to drafts', saved.slug);
        if (act === 'unpublish') setTimeout(publishSite, 300);
      }
      break;
    }
    case 'archive': S.ui.confirm = 'archive'; render(); break;
    case 'confirm-no': S.ui.confirm = null; render(); break;
    case 'archive-yes': { const slug = r.arg; S.ui.confirm = null; await S.db.doc('articles/' + slug).update({ status: 'archived', updated: nowIso() }); audit('archived', slug); location.hash = 'desk-stories'; break; }
    case 'remove-lang': { const slug = r.arg; const a = S.desk.articles.find(x => x.slug === slug); const upd = { [b.dataset.v]: null, translations: { ...(a.translations || {}), [b.dataset.v]: null }, updated: nowIso() }; await S.db.doc('articles/' + slug).update(upd); audit('removed ' + b.dataset.v + ' version', slug); S.ui.edTab = 'en'; break; }
    case 'translate': {
      const lang = b.dataset.v; const slug = r.arg; const a = S.desk.articles.find(x => x.slug === slug); const o = document.getElementById('tr-out');
      if (!S.sample) { o.innerHTML = '<p class="status err">Translation drafting is available to editors in the Claude app.</p>'; return; }
      b.disabled = true; o.innerHTML = '<p class="status ok">Claude is drafting the translation…</p>';
      try {
        const name = lang === 'hi' ? 'Hindi (Devanagari script), standard newspaper register' : 'Punjabi (Gurmukhi script), standard newspaper register as used by Punjabi media in Australia';
        const res = await S.sample.json(`Translate this news story into ${name} for The Melbourne Indian, a Melbourne community newspaper. Keep every fact, number, date, name and quotation exactly; keep quotation marks around quoted words; do not add or remove information. Write idiomatic, natural prose, not word-for-word. Keep English acronyms (VEC, ABS, VFS, OCI) as they are. Reply with only JSON: {"headline": string, "dek": string, "body": array} where body mirrors the input body array item-for-item (strings stay strings; objects keep their keys h/ul/dl/note with translated values; in dl translate both columns).\n\nINPUT:\n${JSON.stringify(a.en)}`, { modelTier: 'complex' });
        if (!res || !res.headline || !Array.isArray(res.body)) throw { code: 'invalid_json' };
        await S.db.doc('articles/' + slug).update({ [lang]: { headline: res.headline, dek: res.dek || '', body: res.body }, translations: { ...(a.translations || {}), [lang]: 'machine' }, updated: nowIso() });
        audit('drafted ' + lang + ' translation (needs review)', slug); toast('Translation drafted. A fluent editor must review it before approval.');
      } catch (e) { o.innerHTML = `<p class="status err">Translation failed (${esc(e && e.code || 'error')}). Try again later.</p>`; b.disabled = false; }
      break;
    }
    case 'save-image': case 'remove-image': {
      const slug = r.arg; const o = document.getElementById('img-out');
      if (act === 'remove-image') { await S.db.doc('articles/' + slug).update({ image: null, updated: nowIso() }); audit('removed image', slug); break; }
      const fd = new FormData(form); const file = fd.get('i_file'); const a = S.desk.articles.find(x => x.slug === slug);
      const credit = (fd.get('i_credit') || '').trim(), lic = (fd.get('i_licence') || '').trim(), src = (fd.get('i_source') || '').trim(), cap = (fd.get('i_caption') || '').trim(), alt = (fd.get('i_alt') || '').trim();
      if (!credit || !lic || !alt || !cap) { o.innerHTML = '<p class="status err">Credit, licence, caption and alt text are all required. We keep a usage-rights record for every photo.</p>'; return; }
      let url = a.image?.url, assetId = a.image?.assetId;
      if (file && file.size) { try { o.innerHTML = '<p class="status ok">Uploading…</p>'; const up = await S.assets.upload(file); url = up.url; assetId = up.id; } catch (e) { o.innerHTML = `<p class="status err">Upload failed (${esc(e && e.code || 'error')}).</p>`; return; } }
      if (!url) { o.innerHTML = '<p class="status err">Choose a photo file to upload.</p>'; return; }
      await S.db.doc('articles/' + slug).update({ image: { url, assetId, credit, licence: lic, sourceUrl: src, caption: { ...(a.image?.caption || {}), en: cap }, alt: { ...(a.image?.alt || {}), en: alt }, addedAt: nowIso(), addedBy: S.uid || 'editor' }, updated: nowIso() });
      audit('added image', slug, credit + ' / ' + lic); toast('Image saved');
      break;
    }
    case 'del-doc': { await S.db.doc(b.dataset.coll + '/' + b.dataset.id).delete(); audit('deleted ' + b.dataset.coll.replace(/s$/, ''), '', b.dataset.id); break; }
    case 'set-status': { await S.db.doc(b.dataset.coll + '/' + b.dataset.id).update({ status: b.dataset.v, updated: nowIso() }); audit(`${b.dataset.coll}: ${b.dataset.v}`, '', b.dataset.id); break; }
    case 'sub-to-listing': { const s = S.desk.submissions.find(x => x._id === b.dataset.id); if (!s) return; const { _id, consent, consentText, page, ...rest } = s; await S.db.collection('directory').add({ ...rest, status: 'pending', fromSubmission: _id, updated: nowIso() }); await S.db.doc('submissions/' + _id).update({ status: 'listed' }); audit('created listing from submission', '', s.business); break; }
    case 'ad-edit': S.ui.adEdit = b.dataset.id; render(); break;
    case 'ad-new': S.ui.adEdit = null; render(); break;
    case 'export-subs': {
      const rows = [['email', 'name', 'editions', 'consented_at', 'consent_text']].concat(S.desk.subscribers.map(s => [s.email, s.name || '', (s.editions || []).join(' '), s.submittedAt || '', s.consentText || '']));
      const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
      if (S.downloads) { try { await S.downloads.save({ filename: `subscribers-${today()}.csv`, data: csv }); audit('exported subscribers'); } catch { toast('Export cancelled'); } } else toast('Export is available in the Claude app.');
      break;
    }
    case 'copy-nl': { const ta = document.getElementById('nl-html'); copyText(S.ui.nlHtml, ta); break; }
    case 'save-issue': { await S.db.collection('issues').add({ ...S.ui.nl, html: S.ui.nlHtml, createdAt: nowIso(), by: S.uid || 'editor' }); audit('saved newsletter issue', '', S.ui.nl.subject); toast('Issue saved'); break; }
  }
});
document.addEventListener('change', async ev => {
  const el = ev.target.closest('[data-act="set-field"]'); if (!el || !S.db) return;
  await S.db.doc(el.dataset.coll + '/' + el.dataset.id).update({ [el.dataset.field]: el.value, updated: nowIso() }).catch(() => toast('Could not save'));
});
document.addEventListener('submit', async ev => {
  const f = ev.target; if (!(f instanceof HTMLFormElement)) return;
  if (f.dataset.form) { ev.preventDefault(); submitForm(f); return; }
  const k = f.dataset.dform; if (!k) return; ev.preventDefault();
  const fd = new FormData(f); const g = n => (fd.get(n) || '').toString().trim();
  try {
    if (k === 'article') { const s = await saveArticle(f); if (s) { audit('edited', s.slug); const o = document.getElementById('ed-out'); if (o) o.innerHTML = '<p class="status ok">Saved.</p>'; } }
    else if (k === 'new-story') {
      let slug = slugify(g('headline')); if (S.desk.articles.some(a => a.slug === slug)) slug += '-' + Date.now().toString(36).slice(-4);
      await S.db.doc('articles/' + slug).set({ slug, section: g('section'), type: 'news', status: 'draft', risk: 'amber', risk_note: '', date: today(), priority: 5, byline: 'The Melbourne Indian newsroom', sources: [], en: { headline: g('headline'), dek: '', body: [] }, created: nowIso(), updated: nowIso(), createdBy: S.uid || 'editor' });
      audit('created draft', slug); S.ui.newStory = false; location.hash = 'desk-edit-' + slug;
    }
    else if (k === 'date') { await S.db.collection('dates').add({ date: g('date'), en: g('en'), hi: g('hi'), pa: g('pa'), slug: g('slug') }); audit('added key date', g('slug'), g('date') + ' ' + g('en')); f.reset(); }
    else if (k === 'enquiry') { await S.db.collection('enquiries').add({ business: g('business'), name: g('name'), email: g('email'), phone: g('phone'), message: g('message'), status: 'new', submittedAt: nowIso(), source: 'manual' }); audit('logged enquiry', '', g('business')); f.reset(); }
    else if (k === 'ad') {
      const rec = { advertiser: g('advertiser'), slot: g('slot'), start: g('start'), end: g('end'), headline: g('headline'), url: g('url'), cta: g('cta'), price: g('price'), text: g('text'), status: g('status'), updated: nowIso() };
      if (f.dataset.id) { await S.db.doc('ads/' + f.dataset.id).update(rec); audit('edited ad booking', '', rec.advertiser); } else { await S.db.collection('ads').add(rec); audit('added ad booking', '', rec.advertiser); }
      S.ui.adEdit = null; toast('Booking saved');
    }
    else if (k === 'issue') { S.ui.nl = { subject: g('subject'), edition: g('edition'), intro: g('intro'), stories: fd.getAll('story').map(String) }; S.ui.nlHtml = buildNewsletter(S.ui.nl.subject, S.ui.nl.edition, S.ui.nl.intro, S.ui.nl.stories); render(); }
  } catch (e) { toast('Could not save (' + (e && e.code || 'error') + ')'); }
});

/* ================= render ================= */
let lastKey = '';
function render(soft) {
  const r = route();
  const key = location.hash + '|' + (previewMode() ? 'p' : '');
  // keep the editor's typing safe: don't re-render a desk form the user is in the middle of editing
  if (soft && r.view === 'desk' && document.activeElement && document.activeElement.closest('form[data-dform]') && key === lastKey) return;
  let html;
  if (r.view === 'desk') html = viewDesk(r);
  else if (r.view === 'article') html = viewArticle(r);
  else if (r.view === 'section') html = viewSection(r);
  else if (r.view === 'page') html = viewPage(r);
  else if (r.view === 'listing') html = viewListing(r);
  else html = viewHome(r);
  if (html === '') return;
  if (r.view !== 'article' && r.view !== 'listing') document.title = r.view === 'desk' ? 'Newsroom desk · The Melbourne Indian' : 'The Melbourne Indian';
  document.documentElement.lang = r.lang;
  const y = window.scrollY;
  app.innerHTML = html;
  if (key !== lastKey) { window.scrollTo(0, 0); const m = document.getElementById('main'); if (m && !soft) m.setAttribute('tabindex', '-1'); } else window.scrollTo(0, y);
  lastKey = key;
  initHero();
  initTicker();
  dirFilter();
  runSearch();
  if (r.view === 'page' && r.page === 'search' && !soft) { const qi = document.getElementById('site-q'); if (qi && matchMedia('(min-width: 700px)').matches) qi.focus(); }
  if (typeof statsPage === 'function') statsPage();
}
/* ================= share: copy link ================= */
document.addEventListener('click', async ev => {
  const b = ev.target.closest('[data-share-copy]'); if (!b) return;
  const u = b.dataset.shareCopy;
  try { await navigator.clipboard.writeText(u); } catch { const ta = document.createElement('textarea'); ta.value = u; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch {} ta.remove(); }
  const o = b.textContent; b.textContent = b.dataset.done || 'Copied'; setTimeout(() => { b.textContent = o; }, 1800);
});
/* ================= front-page hero rotation ================= */
const HERO_MS = 7000;
function heroShow(h, i) {
  const slides = [...h.querySelectorAll('.hero-slide')], dots = [...h.querySelectorAll('.hero-dot')];
  if (!slides.length) return;
  i = (i + slides.length) % slides.length;
  slides.forEach((s, k) => { const on = k === i; s.classList.toggle('is-on', on); s.inert = !on; if (on) s.removeAttribute('aria-hidden'); else s.setAttribute('aria-hidden', 'true'); });
  dots.forEach((d, k) => { if (k === i) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); });
  S.heroIdx = i;
}
function heroHold(h) { h.classList.toggle('paused', !!(h.dataset.userPaused || h.matches(':hover') || h.querySelector(':focus-visible') || document.hidden)); }
function initHero() {
  const h = document.querySelector('[data-hero]'); if (!h) return;
  const n = h.querySelectorAll('.hero-slide').length;
  h.style.setProperty('--hero-ms', HERO_MS + 'ms');
  if (S.heroIdx && S.heroIdx < n) heroShow(h, S.heroIdx); else S.heroIdx = 0;
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || n < 2) { h.classList.add('static'); return; }
  ['mouseenter', 'mouseleave', 'focusin'].forEach(e => h.addEventListener(e, () => heroHold(h)));
  h.addEventListener('focusout', () => setTimeout(() => heroHold(h), 0));
  h.addEventListener('animationend', ev => { if (ev.animationName !== 'heroFill') return; const d = ev.target.closest && ev.target.closest('.hero-dot'); if (d && d.hasAttribute('aria-current')) heroShow(h, (S.heroIdx || 0) + 1); });
  heroHold(h);
}
document.addEventListener('visibilitychange', () => { const h = document.querySelector('[data-hero]'); if (h) heroHold(h); });
document.addEventListener('click', ev => {
  const b = ev.target.closest('[data-hero-act]'); if (!b) return;
  const h = b.closest('[data-hero]'); if (!h) return;
  const act = b.dataset.heroAct, i = S.heroIdx || 0;
  if (act === 'prev') heroShow(h, i - 1);
  else if (act === 'next') heroShow(h, i + 1);
  else if (act === 'go') heroShow(h, +b.dataset.heroI);
  else if (act === 'pause') {
    const p = !h.dataset.userPaused; if (p) h.dataset.userPaused = '1'; else delete h.dataset.userPaused;
    b.setAttribute('aria-pressed', String(p)); b.setAttribute('aria-label', p ? 'Play rotation' : 'Pause rotation'); b.innerHTML = p ? '&#9654;' : '&#10074;&#10074;';
    heroHold(h);
  }
});
/* ================= audience stats (Umami Cloud, cookie-free; off until STATS_ID is set) ================= */
const STATS_ID = '318a11f8-e4b6-4bad-9af9-1927926c7d98';
const STATS_SRC = 'https://cloud.umami.is/script.js';
let statsLast = '';
function statsUrl(r) {
  if (r.view === 'article') return `/${r.lang}/${r.slug}/`;
  if (r.view === 'section') return `/${r.lang}/section/${r.sec}/`;
  if (r.view === 'page') return `/${r.lang}/${r.page}/`;
  if (r.view === 'listing') return `/directory/${r.slug}/`;
  return r.lang === 'en' ? '/' : `/${r.lang}/`;
}
function statsOff() {
  if (!STATS_ID || S.isEditor || previewMode()) return true;
  try { if (/[?&]me=1\b/.test(location.search)) localStorage.setItem('umami.disabled', '1'); if (localStorage.getItem('umami.disabled')) return true; } catch {}
  return false;
}
function statsPage() {
  if (statsOff() || !window.umami) return;
  const r = route(); if (r.view === 'desk') return;
  const u = statsUrl(r); if (u === statsLast) return; statsLast = u;
  const q = location.search || '';
  window.umami.track(p => ({ ...p, url: u + q, title: document.title, referrer: statsLast ? p.referrer : document.referrer }));
}
function statsEvent(name, data) { if (statsOff() || !window.umami) return; try { window.umami.track(name, data || {}); } catch {} }
if (!statsOff()) {
  const sc = document.createElement('script'); sc.defer = true; sc.src = STATS_SRC;
  sc.setAttribute('data-website-id', STATS_ID); sc.setAttribute('data-auto-track', 'false'); sc.setAttribute('data-domains', 'themelbourneindian.com.au,www.themelbourneindian.com.au');
  sc.onload = statsPage; document.head.appendChild(sc);
  window.addEventListener('hashchange', () => setTimeout(statsPage, 50));
}
/* ================= Meta Pixel (ad measurement + retargeting; disclosed on the privacy page) ================= */
const PIXEL_ID = '3668276636652761';
let pixelLast = '';
function pixelOff() {
  if (!PIXEL_ID || S.isEditor || previewMode()) return true;
  try { if (navigator.globalPrivacyControl) return true; } catch {}
  try { if (/[?&]me=1\b/.test(location.search) || localStorage.getItem('umami.disabled')) return true; } catch {}
  return false;
}
function pixelPage() {
  if (pixelOff() || !window.fbq) return;
  const r = route(); if (r.view === 'desk') return;
  const u = statsUrl(r); if (u === pixelLast) return; pixelLast = u;
  try {
    window.fbq('track', 'PageView');
    if (r.view === 'listing') window.fbq('trackCustom', 'DirectoryListingView', { listing: r.slug });
    else if (r.view === 'article') window.fbq('track', 'ViewContent', { content_ids: [r.slug], content_type: 'article', content_category: r.lang });
    else if (r.view === 'page' && r.page === 'advertise') window.fbq('trackCustom', 'AdvertisePageView', { lang: r.lang });
    else if (r.view === 'page' && r.page === 'support') window.fbq('trackCustom', 'SupportPageView', { lang: r.lang });
  } catch {}
}
document.addEventListener('click', ev => { const a = ev.target && ev.target.closest && ev.target.closest('a[data-sup]'); if (a) pixelEvent('InitiateCheckout', { content_name: 'support-' + a.dataset.sup, currency: 'AUD', value: a.dataset.sup === 'monthly' ? 9.99 : 10 }); }, true);
function pixelEvent(name, data, custom) { if (pixelOff() || !window.fbq) return; try { window.fbq(custom ? 'trackCustom' : 'track', name, data || {}); } catch {} }
if (!pixelOff()) {
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  window.fbq('init', PIXEL_ID);
  pixelPage();
  window.addEventListener('hashchange', () => setTimeout(pixelPage, 60));
}
document.addEventListener('click', ev => {
  const a = ev.target.closest('a,button'); if (!a) return;
  const h = a.getAttribute('href') || '';
  if (a.closest('.share')) statsEvent('Share', { how: h.includes('wa.me') ? 'whatsapp' : h.includes('facebook.com') ? 'facebook' : a.hasAttribute('data-share-copy') ? 'copy-link' : 'other', lang: route().lang });
  else if (/^#(en|hi|pa)$/.test(h) && a.closest('.langs,.lang-switch,nav,header')) statsEvent('Language', { to: h.slice(1) });
  else if (/^https?:/.test(h) && !h.includes('themelbourneindian.com.au')) { try { statsEvent('Outbound', { host: new URL(h).hostname }); } catch {} }
}, true);
/* ================= free-subscribe nudge (public readers only) ================= */
const NUDGE_SUB = 'tmi_subscribed', NUDGE_SKIP = 'tmi_nudge_dismissed', NUDGE_DAYS = 14, NUDGE_DELAY = 35000, NUDGE_SCROLL = 0.5;
const lsGet = k => { try { return localStorage.getItem(k); } catch { return null; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch {} };
let nudgeShown = false, nudgeTimer = null;
function subDone(kind, form) {
  if (kind === 'enquiry' || kind === 'listing') { pixelEvent('Lead', { content_name: kind === 'enquiry' ? 'advertising enquiry' : 'directory listing' }); return; }
  if (kind !== 'subscribe' && kind !== 'nudge') return;
  lsSet(NUDGE_SUB, new Date().toISOString());
  statsEvent('Subscribe', { where: kind === 'nudge' ? 'pop-up' : 'newsletter page', lang: route().lang });
  pixelEvent('Subscribe', { content_name: 'newsletter' });
  const n = form.closest('.nudge');
  if (n) { n.classList.add('done'); setTimeout(() => nudgeHide(false), 4500); }
  else nudgeHide(false);
}
function nudgeAllowed() {
  if (nudgeShown || S.isEditor || previewMode()) return false;
  if (lsGet(NUDGE_SUB)) return false;
  const d = Date.parse(lsGet(NUDGE_SKIP) || ''); if (d && Date.now() - d < NUDGE_DAYS * 864e5) return false;
  try { if (sessionStorage.getItem(NUDGE_SKIP)) return false; } catch {}
  const r = route(); if (r.view === 'desk' || (r.view === 'page' && r.page === 'newsletter')) return false;
  const a = document.activeElement; if (a && a.closest && a.closest('form')) return false;
  return true;
}
function nudgeShow() {
  if (!nudgeAllowed()) return;
  const l = route().lang, t = T[l];
  nudgeShown = true; try { sessionStorage.setItem(NUDGE_SKIP, '1'); } catch {}
  const el = document.createElement('aside');
  el.className = 'nudge'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-labelledby', 'nudge-h'); el.lang = l;
  el.innerHTML = `<button type="button" class="nudge-x" data-nudge-x aria-label="Close">&times;</button>
<div class="nudge-k" lang="en"><i>m.</i>Free · weekly</div>
<h2 id="nudge-h">${esc(t.nlTitle)}</h2><p>${esc(t.nlText)}</p>
<form class="nudge-f" data-form="nudge" novalidate><input type="hidden" name="ed_${l}" value="1"><input type="hidden" name="consent" value="1">
<input type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">
<div class="nudge-row"><input type="email" name="email" required autocomplete="email" inputmode="email" placeholder="you@email.com" aria-label="Email address"><button class="btn" type="submit" data-label="${esc(t.subscribe)}">${esc(t.subscribe)}</button></div>
<p class="nudge-fine" lang="en">Free. One short email a week. Unsubscribe anytime. By subscribing you agree to receive it.</p>
<div class="out" aria-live="polite"></div></form>`;
  document.body.appendChild(el); statsEvent('Pop-up shown', { lang: l, page: route().view });
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-on')));
}
function nudgeHide(dismissed) {
  const el = document.querySelector('.nudge'); if (!el) return;
  if (dismissed) { lsSet(NUDGE_SKIP, new Date().toISOString()); statsEvent('Pop-up closed'); }
  el.classList.remove('is-on'); setTimeout(() => el.remove(), 400);
}
function nudgeArm() {
  clearTimeout(nudgeTimer);
  if (!nudgeAllowed()) return;
  nudgeTimer = setTimeout(nudgeShow, NUDGE_DELAY);
}
window.addEventListener('scroll', () => {
  if (nudgeShown || route().view !== 'article') return;
  const h = document.documentElement, max = h.scrollHeight - h.clientHeight;
  if (max > 400 && h.scrollTop / max >= NUDGE_SCROLL) nudgeShow();
}, { passive: true });
document.addEventListener('click', ev => { if (ev.target.closest('[data-nudge-x]')) nudgeHide(true); });
document.addEventListener('keydown', ev => { if (ev.key === 'Escape' && document.querySelector('.nudge')) nudgeHide(true); });
window.addEventListener('hashchange', () => { if (!nudgeShown) nudgeArm(); else { const r = route(); if (r.view === 'desk' || r.page === 'newsletter') nudgeHide(false); } });
window.addEventListener('hashchange', () => { if (!location.hash.startsWith('#desk') && !previewMode()) S.ui.preview = S.ui.preview && S.isEditor; render(); });
render();
nudgeArm();

/* ================= boot: newer data + capabilities ================= */
fetch('data/site.json', { cache: 'no-store' }).then(r => r.ok ? r.json() : null).then(d => { if (d && d.builtAt && (EMBED.partial || !site.builtAt || d.builtAt > site.builtAt)) { const ae = document.activeElement, sid = ae && ae.id, pos = ae && ae.selectionStart; site = { ...d, pages: d.pages || EMBED.pages }; render(true); if (sid) { const el = document.getElementById(sid); if (el) { el.focus(); try { el.setSelectionRange(pos, pos); } catch (e) {} } } } }).catch(() => {});
(async () => {
  const c = window.claude; if (!c || !c.use) { S.user = undefined; return; }
  const [user, db] = await Promise.all([c.use('user').catch(() => null), c.use('db').catch(() => null)]);
  S.user = user; S.db = db;
  if (user) {
    try { S.isEditor = !!(await user.canEdit()); } catch { S.isEditor = false; }
    try { S.uid = await user.id(); } catch { S.uid = null; }
    try { S.canWrite = await user.can('data.write'); } catch { S.canWrite = null; }
  }
  if (S.isEditor) {
    const [art, assets, sample, downloads] = await Promise.all(['artifact', 'assets', 'sample', 'downloads'].map(n => c.use(n).catch(() => null)));
    S.artifact = art; S.assets = assets; S.sample = sample; S.downloads = downloads;
    startDesk();
  }
  render(true);
})();
})();

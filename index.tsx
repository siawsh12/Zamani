
import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// --- I18N (Internationalization) SETUP ---
const translations = {
  en: {
    chats: 'Chats',
    welcome: 'Welcome to ConnectApp',
    selectChat: 'Select a chat to start messaging or create a new conversation.',
    storyYou: 'You',
    yesterday: 'Yesterday',
    daysAgo: 'days ago',
    networkInternet: 'Internet',
    networkLocal: 'Local',
    language: 'Language',
    voiceCall: 'Voice Call',
    videoCall: 'Video Call',
    calling: 'Calling...',
    endCall: 'End Call',
    goBack: 'Go Back',
    typeMessage: 'Type a message...',
    send: 'Send',
    channels: 'Channels',
    requestNewChannel: 'Request New Channel',
    newChannel: 'New Channel',
    channelName: 'Channel Name',
    request: 'Request',
    cancel: 'Cancel',
    pending: 'Pending',
    channelRequestSent: 'Channel request sent for approval.',
    profile: 'Profile',
    editProfile: 'Edit Profile',
    save: 'Save',
    uploadPhoto: 'Upload Photo',
    name: 'Name',
    appearance: 'Appearance',
    getPremium: 'Unlock Premium',
    premiumDescription: 'Watch 3 ads to unlock premium features for 24 hours.',
    watchAd: 'Watch Ad',
    watched: 'Watched',
    adsWatched: '{count}/3 Ads Watched',
    premiumUnlocked: 'Premium Unlocked!',
    premiumUnlockedMessage: 'You can now enjoy all features for the next 24 hours.',
    watchOnYouTube: 'Watch on YouTube',
    browseInstagram: 'Browse Instagram',
    anotherAd: 'Watch Video Ad',
    adTitle: 'Viewing Ad',
    close: 'Close',
    premiumActive: 'Premium Active',
    callsAndMessages: 'Calls & Messages',
  },
  fa: {
    chats: 'چت‌ها',
    welcome: 'به ConnectApp خوش آمدید',
    selectChat: 'یک چت را برای شروع پیام‌رسانی انتخاب کنید یا یک گفتگوی جدید ایجاد کنید.',
    storyYou: 'شما',
    yesterday: 'دیروز',
    daysAgo: 'روز پیش',
    networkInternet: 'اینترنت',
    networkLocal: 'محلی',
    language: 'زبان',
    voiceCall: 'تماس صوتی',
    videoCall: 'تماس تصویری',
    calling: 'در حال تماس...',
    endCall: 'پایان تماس',
    goBack: 'بازگشت',
    typeMessage: 'پیام خود را بنویسید...',
    send: 'ارسال',
    channels: 'کانال‌ها',
    requestNewChannel: 'درخواست کانال جدید',
    newChannel: 'کانال جدید',
    channelName: 'نام کانال',
    request: 'درخواست',
    cancel: 'لغو',
    pending: 'در انتظار',
    channelRequestSent: 'درخواست کانال برای تأیید ارسال شد.',
    profile: 'پروفایل',
    editProfile: 'ویرایش پروفایل',
    save: 'ذخیره',
    uploadPhoto: 'آپلود عکس',
    name: 'نام',
    appearance: 'ظاهر',
    getPremium: 'فعالسازی اشتراک ویژه',
    premiumDescription: 'برای فعالسازی تمام امکانات برنامه به مدت ۲۴ ساعت، ۳ تبلیغ تماشا کنید.',
    watchAd: 'تماشا',
    watched: 'دیده شد',
    adsWatched: '{count}/3 تبلیغ دیده شد',
    premiumUnlocked: 'اشتراک ویژه فعال شد!',
    premiumUnlockedMessage: 'شما می‌توانید تا ۲۴ ساعت آینده از تمام امکانات استفاده کنید.',
    watchOnYouTube: 'تماشا در یوتیوب',
    browseInstagram: 'مشاهده در اینستاگرام',
    anotherAd: 'تماشای تبلیغ ویدیویی',
    adTitle: 'در حال مشاهده تبلیغ',
    close: 'بستن',
    premiumActive: 'اشتراک فعال',
    callsAndMessages: 'تماس‌ها و پیام‌ها',
  },
  ps: {
    chats: 'چټونه',
    welcome: 'ConnectApp ته ښه راغلاست',
    selectChat: 'د پیغام رسولو پیل کولو لپاره یو چټ وټاکئ یا نوې خبرې اترې جوړې کړئ.',
    storyYou: 'تاسو',
    yesterday: 'پرون',
    daysAgo: 'ورځې وړاندې',
    networkInternet: 'انټرنیټ',
    networkLocal: 'محلي',
    language: 'ژبه',
    voiceCall: 'غږیز کال',
    videoCall: 'ویډیو کال',
    calling: 'زنګ وهل...',
    endCall: 'کال پای ته ورسوه',
    goBack: 'شاته',
    typeMessage: 'یو پیغام ولیکئ...',
    send: 'لیږل',
    channels: 'کانالونه',
    requestNewChannel: 'د نوي کانال غوښتنه',
    newChannel: 'نوی کانال',
    channelName: 'د کانال نوم',
    request: 'غوښتنه',
    cancel: 'لغوه کول',
    pending: 'په تمه',
    channelRequestSent: 'د کانال غوښتنه د تایید لپاره واستول شوه.',
    profile: 'پروفایل',
    editProfile: 'پروفایل سمول',
    save: 'خوندي کول',
    uploadPhoto: 'عکس پورته کول',
    name: 'نوم',
    appearance: 'بڼه',
    getPremium: 'پریمیم فعالول',
    premiumDescription: 'د ۲۴ ساعتونو لپاره د پریمیم ځانګړتیاوو د خلاصولو لپاره ۳ اعلانونه وګورئ.',
    watchAd: 'وګورئ',
    watched: 'کتل شوی',
    adsWatched: '{count}/3 اعلانونه کتل شوي',
    premiumUnlocked: 'پریمیم خلاص شو!',
    premiumUnlockedMessage: 'تاسو اوس کولی شئ د راتلونکو ۲۴ ساعتونو لپاره له ټولو ځانګړتیاوو خوند واخلئ.',
    watchOnYouTube: 'په یوټیوب کې وګورئ',
    browseInstagram: 'انسټاګرام براوز کړئ',
    anotherAd: 'ویډیو اعلان وګورئ',
    adTitle: 'د اعلان کتل',
    close: 'تړل',
    premiumActive: 'پریمیم فعال',
    callsAndMessages: 'زنګونه او پیغامونه',
  },
  ar: {
    chats: 'الدردشات',
    welcome: 'أهلاً بك في ConnectApp',
    selectChat: 'اختر محادثة لبدء المراسلة أو قم بإنشاء محادثة جديدة.',
    storyYou: 'أنت',
    yesterday: 'أمس',
    daysAgo: 'أيام مضت',
    networkInternet: 'إنترنت',
    networkLocal: 'محلي',
    language: 'اللغة',
    voiceCall: 'مكالمة صوتية',
    videoCall: 'مكالمة فيديو',
    calling: 'جارٍ الاتصال...',
    endCall: 'إنهاء المكالمة',
    goBack: 'رجوع',
    typeMessage: 'اكتب رسالة...',
    send: 'إرسال',
    channels: 'القنوات',
    requestNewChannel: 'طلب قناة جديدة',
    newChannel: 'قناة جديدة',
    channelName: 'اسم القناة',
    request: 'طلب',
    cancel: 'إلغاء',
    pending: 'قيد الانتظار',
    channelRequestSent: 'تم إرسال طلب القناة للموافقة.',
    profile: 'الملف الشخصي',
    editProfile: 'تعديل الملف الشخصي',
    save: 'حفظ',
    uploadPhoto: 'تحميل صورة',
    name: 'الاسم',
    appearance: 'المظهر',
    getPremium: 'فتح الاشتراك المميز',
    premiumDescription: 'شاهد 3 إعلانات لفتح الميزات المميزة لمدة 24 ساعة.',
    watchAd: 'مشاهدة',
    watched: 'تمت المشاهدة',
    adsWatched: 'تمت مشاهدة {count}/3 إعلانات',
    premiumUnlocked: 'تم فتح الاشتراك المميز!',
    premiumUnlockedMessage: 'يمكنك الآن الاستمتاع بجميع الميزات لمدة 24 ساعة القادمة.',
    watchOnYouTube: 'شاهد على يوتيوب',
    browseInstagram: 'تصفح انستغرام',
    anotherAd: 'شاهد إعلان الفيديو',
    adTitle: 'مشاهدة الإعلان',
    close: 'إغلاق',
    premiumActive: 'الاشتراك فعال',
    callsAndMessages: 'المكالمات والرسائل',
  },
};

type Language = 'en' | 'fa' | 'ps' | 'ar';
const LanguageContext = createContext({
  language: 'en' as Language,
  setLanguage: (lang: Language) => {},
  t: (key: keyof typeof translations.en, replacements?: {[key: string]: string | number}) => translations.en[key],
  dir: 'ltr' as 'ltr' | 'rtl',
});

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('fa');
  
  useEffect(() => {
    const dir = ['fa', 'ar', 'ps'].includes(language) ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language]);

  const t = (key: keyof typeof translations.en, replacements?: {[key: string]: string | number}) => {
    let translation = translations[language][key] || translations.en[key];
    if (replacements) {
        Object.keys(replacements).forEach(rKey => {
            translation = translation.replace(`{${rKey}}`, String(replacements[rKey]));
        });
    }
    return translation;
  };

  const dir = ['fa', 'ar', 'ps'].includes(language) ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};


// --- MOCK DATA ---
const initialStories = [
  { id: 1, name: 'You', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
  { id: 2, name: 'Alice', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d' },
  { id: 3, name: 'Bob', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d' },
  { id: 4, name: 'Charlie', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d' },
  { id: 5, name: 'Diana', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d' },
  { id: 6, name: 'Eve', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026709d' },
];

const initialChats = [
  { id: 1, name: 'Design Team', message: 'Yeah, I just pushed the latest version.', time: '10:42 AM', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026701d', messages: [{id: 1, sender: 'them', text: 'Hey team, the new mockups are ready for review.'}, {id: 2, sender: 'me', text: 'Awesome! I\'ll take a look now.'}, {id: 3, sender: 'them', text: 'Let me know your thoughts on the new color scheme.'}, {id: 4, sender: 'me', text: 'Yeah, I just pushed the latest version.'}]},
  { id: 2, name: 'Bennie', message: 'Sounds good, let\'s catch up later!', time: '10:30 AM', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026702d', messages: [{id: 1, sender: 'them', text: 'Hey, I reviewed the latest designs. Looks great!'},{id: 2, sender: 'me', text: 'Thanks! Appreciate the feedback.'},{id: 3, sender: 'them', text: 'Sounds good, let\'s catch up later!'}]},
  { id: 3, name: 'Marketing Campaign', message: 'The new ad copy is ready for review.', time: '9:55 AM', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026703d', messages: [{id: 1, sender: 'them', text: 'The new ad copy is ready for review.'}]},
  { id: 4, name: 'Mom', message: 'Can you pick up milk on your way home?', time: 'Yesterday', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026710d', messages: [{id: 1, sender: 'them', text: 'Can you pick up milk on your way home?'}]},
  { id: 5, name: 'Project Alpha', message: 'Meeting has been rescheduled to 3 PM.', time: 'Yesterday', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026711d', messages: [{id: 1, sender: 'them', text: 'Just a heads up, the stand-up meeting has been rescheduled to 3 PM today.'},{id: 2, sender: 'me', text: 'Got it, thanks for letting me know.'}]},
  { id: 6, name: 'John Doe', message: 'Happy Birthday! 🎉', time: '2 days ago', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026712d', messages: [{id: 1, sender: 'them', text: 'Happy Birthday! 🎉'}]},
];

const initialChannels = [
    { id: 101, name: 'General', avatar: 'https://place-hold.it/50/6c5ce7/ffffff&text=G', status: 'approved', messages: [{id: 1, sender: 'them', text: 'Welcome to the general channel!'}] },
    { id: 102, name: 'Random', avatar: 'https://place-hold.it/50/a9a9a9/ffffff&text=R', status: 'approved', messages: [{id: 1, sender: 'them', text: 'Talk about anything and everything.'}] },
];

// --- SVG ICONS ---
const MessageIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M8 9h8"></path> <path d="M8 13h6"></path> <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z"></path> </svg> );
const HashtagIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 9l14 0" /><path d="M5 15l14 0" /><path d="M11 4l-4 16" /><path d="M17 4l-4 16" /></svg> );
const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg> );
const ChatBubbleIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" /> </svg> );
const GlobeIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /> <path d="M3.6 9h16.8" /> <path d="M3.6 15h16.8" /> <path d="M11.5 3a17 17 0 0 0 0 18" /> <path d="M12.5 3a17 17 0 0 1 0 18" /> </svg> );
const WifiIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M12 18l.01 0" /> <path d="M9.172 15.172a4 4 0 0 1 5.656 0" /> <path d="M6.343 12.343a8 8 0 0 1 11.314 0" /> <path d="M3.515 9.515c4.686 -4.687 12.284 -4.687 16.97 0" /> </svg> );
const PhoneIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /></svg> );
const CameraOnIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z" /><path d="M3 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" /></svg> );
const MicOffIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 3l18 18" /><path d="M9 5a3 3 0 0 1 6 0v5a3 3 0 0 1 -.13 .874m-2 2.002a3 3 0 0 1 -3.87 -2.876v-1" /><path d="M5 10a7 7 0 0 0 10.846 5.85m2 -2a6.967 6.967 0 0 0 -1.846 -5.85" /><path d="M8 21h8" /><path d="M12 17v4" /></svg> );
const MicOnIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z" /><path d="M5 10a7 7 0 0 0 14 0" /><path d="M8 21h8" /><path d="M12 17v4" /></svg> );
const CameraOffIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 3l18 18" /><path d="M15.564 15.574a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-2.686m1.163 -2.825l2.39 -1.195l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -.677 .946" /><path d="M10.73 6.726a2 2 0 0 1 3.27 -1.726h1a2 2 0 0 1 2 2v3m-1.173 3.171a2 2 0 0 1 -2.827 .829h-4a2 2 0 0 1 -2 -2v-8a2 2 0 0 1 2 -2h1" /></svg> );
const EndCallIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} fill="#fff" width="24" height="24" viewBox="0 0 24 24"><path d="M3.68,16.05a1,1,0,0,0,1.41,0l1-1A1,1,0,0,0,5.32,14L3,11.66,5.32,9.34a1,1,0,0,0,0-1.41l-1-1a1,1,0,0,0-1.41,0L1.41,8.34a1,1,0,0,0,0,1.41L2.24,10.6,1.3,11.5a3.73,3.73,0,0,0-.56,4.24,1,1,0,0,0,.56.56l.09.09a1,1,0,0,0,1.41,0Z"/><path d="M20.59,15.66,19.76,14.8a3.73,3.73,0,0,0-4.24-.56,1,1,0,0,0-.56.56l-.09.09a1,1,0,0,0,0,1.41l1.41,1.41a1,1,0,0,0,1.41,0l1-1a1,1,0,0,0,0-1.41L16.68,14l2.34-2.34a1,1,0,0,0-1.41-1.41l-1,1a1,1,0,0,0,0,1.41l1.41,1.41a1,1,0,0,0,.71.29.66.66,0,0,0,.3-.06.7.7,0,0,0,.4-.63V8.84a1,1,0,0,0-1-1H16.4a1,1,0,0,0-.71.29l-1.41,1.41a1,1,0,0,0,0,1.41l1,1a1,1,0,0,0,1.41,0L19.41,10,17.07,7.66a1,1,0,0,0-1.41,0l-1,1a1,1,0,0,0,0,1.41L16.68,12l-2.34,2.34a1,1,0,0,0,0,1.41l1,1a1,1,0,0,0,1.41,0l1.41-1.41a1,1,0,0,0,0-1.41l-.83-.83A3.73,3.73,0,0,0,19,8.34a1,1,0,0,0,.56-4.24,1,1,0,0,0-.56-.56L18.9,3.41a1,1,0,0,0-1.41,0l-1.41,1.41a1,1,0,0,0,0,1.41L17.59,7.7,15.24,5.34a1,1,0,0,0-1.41,1.41l1,1a1,1,0,0,0,1.41,0L18.59,5.41l2.34,2.34a1,1,0,0,0,1.41,0l1-1a1,1,0,0,0,0-1.41L21,3.62a1,1,0,0,0-1.41-1.41Z" transform="rotate(135 12 12)"/></svg> );
const BackArrowIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg> );
const SendIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 14l11 -11" /><path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" /></svg> );
const EditIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg> );
const PaletteIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25" /><path d="M8.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M16.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg> );
const DiamondIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 5h12l3 5l-8.5 9.5a.7 .7 0 0 1 -1 0l-8.5 -9.5l3 -5" /><path d="M10 12l-2 -2.2l.6 -1" /></svg> );
const YouTubeIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="red" strokeLinecap="round" strokeLinejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z" fill-opacity="0.1" fill="#fff"></path> <path d="M10 9l5 3l-5 3z" fill="#fff"></path> </svg> );
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"> <defs><radialGradient id="react-grad" r="150%" cx="30%" cy="107%"> <stop stop-color="#fdf497" offset="0"></stop> <stop stop-color="#fdf497" offset="0.05"></stop> <stop stop-color="#fd5949" offset="0.45"></stop> <stop stop-color="#d6249f" offset="0.6"></stop> <stop stop-color="#285AEB" offset="0.9"></stop> </radialGradient></defs> <path d="M0 0h24v24H0z" stroke="none" fill="none"></path> <rect x="4" y="4" width="16" height="16" rx="4" stroke="url(#react-grad)" stroke-width="2.5"></rect> <circle cx="12" cy="12" r="3" stroke="url(#react-grad)" stroke-width="2.5"></circle> <line x1="16.5" y1="7.5" x2="16.5" y2="7.501" stroke="url(#react-grad)" stroke-width="3"></line> </svg> );
const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /> <path d="M9 12l2 2l4 -4" /> </svg>);


// --- COMPONENTS ---
const LanguageSelector = () => {
    const { language, setLanguage, t } = useContext(LanguageContext);
    const languages: { code: Language, name: string }[] = [
        { code: 'en', name: 'English' },
        { code: 'fa', name: 'فارسی (Persian)' },
        { code: 'ps', name: 'پښتو (Pashto)' },
        { code: 'ar', name: 'العربية (Arabic)' },
    ];

    return (
        <div className="language-selector-list">
            <div className="profile-menu-item no-hover">
                <GlobeIcon className="profile-menu-icon" />
                <h3 className="profile-menu-title">{t('language')}</h3>
            </div>
            <ul className="language-options">
                {languages.map(lang => (
                    <li key={lang.code}>
                        <button
                            className={`language-option-btn ${language === lang.code ? 'active' : ''}`}
                            onClick={() => setLanguage(lang.code)}
                            aria-pressed={language === lang.code}
                        >
                            <span>{lang.name}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Sidebar = ({ activeView, setActiveView, user }: { activeView: 'chats' | 'channels' | 'profile', setActiveView: (view: 'chats' | 'channels' | 'profile') => void, user: any }) => {
    const { t } = useContext(LanguageContext);
    return (
    <div className="sidebar">
        <div className="sidebar-nav">
            <button className={`sidebar-btn profile-btn ${activeView === 'profile' ? 'active' : ''}`} onClick={() => setActiveView('profile')} aria-label={t('profile')}>
                <img src={user.avatar} alt={user.name} className="sidebar-profile-avatar" />
            </button>
            <button className={`sidebar-btn ${activeView === 'chats' ? 'active' : ''}`} onClick={() => setActiveView('chats')} aria-label={t('chats')}>
              <MessageIcon className="sidebar-icon" />
            </button>
            <button className={`sidebar-btn ${activeView === 'channels' ? 'active' : ''}`} onClick={() => setActiveView('channels')} aria-label={t('channels')}>
              <HashtagIcon className="sidebar-icon" />
            </button>
        </div>
    </div>
    );
};

const Story = ({ name, avatar }: { name: string, avatar: string }) => {
    const { t } = useContext(LanguageContext);
    const displayName = name === 'You' ? t('storyYou') : name;
    return (
        <div className="story">
            <div className="story-avatar-wrapper">
                <img src={avatar} alt={`${displayName}'s story`} className="story-avatar" />
            </div>
            <span className="story-name">{displayName}</span>
        </div>
    )
};

const StoriesBar = ({ stories }: { stories: typeof initialStories }) => (
    <div className="stories-bar">
        {stories.map(({id, ...rest}) => <Story key={id} {...rest} />)}
    </div>
);

const ChatItem = ({ name, message, time, avatar, isActive, onClick }: { name: string, message: string, time: string, avatar:string, isActive: boolean, onClick: () => void }) => {
    const { t } = useContext(LanguageContext);
    const displayTime = time === 'Yesterday' ? t('yesterday') : (time.includes('days ago') ? `${time.split(' ')[0]} ${t('daysAgo')}` : time);

    return (
        <div className={`chat-item ${isActive ? 'active' : ''}`} onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}>
            <img src={avatar} alt={name} className="chat-avatar" />
            <div className="chat-details">
                <div className="chat-header">
                    <span className="chat-name">{name}</span>
                    <span className="chat-timestamp">{displayTime}</span>
                </div>
                <p className="chat-message">{message}</p>
            </div>
        </div>
    )
};

const NetworkSwitch = ({ networkMode, setNetworkMode }: { networkMode: 'internet' | 'local', setNetworkMode: (mode: 'internet' | 'local') => void }) => {
    const { t } = useContext(LanguageContext);
    return (
        <div className="network-switch" onClick={() => setNetworkMode(networkMode === 'internet' ? 'local' : 'internet')}>
            {networkMode === 'internet' ? <GlobeIcon className="network-icon" /> : <WifiIcon className="network-icon" />}
            <span className="network-label">{networkMode === 'internet' ? t('networkInternet') : t('networkLocal')}</span>
        </div>
    );
};

const ChatList = ({ chats, stories, networkMode, setNetworkMode, activeChatId, setActiveChatId }: { chats: any[], stories: any[], networkMode: 'internet' | 'local', setNetworkMode: (mode: 'internet' | 'local') => void, activeChatId: number | null, setActiveChatId: (id: number) => void }) => {
    const { t } = useContext(LanguageContext);
    
    return (
        <div className="chat-list-panel">
            <div className="chat-list-header">
                <h1>{t('chats')}</h1>
                <NetworkSwitch networkMode={networkMode} setNetworkMode={setNetworkMode} />
            </div>
            <StoriesBar stories={stories} />
            <div className="chat-list">
                {chats.map((chat) => <ChatItem key={chat.id} {...chat} isActive={activeChatId === chat.id} onClick={() => setActiveChatId(chat.id)} />)}
            </div>
        </div>
    )
};

const ChannelItem = ({ name, avatar, status, isActive, onClick }: { name: string, avatar:string, status: string, isActive: boolean, onClick: () => void }) => {
    const { t } = useContext(LanguageContext);
    return (
        <div className={`chat-item ${isActive ? 'active' : ''}`} onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}>
            <img src={avatar} alt={name} className="chat-avatar" />
            <div className="chat-details">
                <div className="chat-header">
                    <span className="chat-name">{name}</span>
                    {status === 'pending' && <span className="pending-badge">{t('pending')}</span>}
                </div>
                <p className="chat-message"></p>
            </div>
        </div>
    );
};

const ChannelsPanel = ({ channels, activeChannelId, setActiveChannelId, onRequestNewChannel }: { channels: any[], activeChannelId: number | null, setActiveChannelId: (id: number) => void, onRequestNewChannel: () => void }) => {
    const { t } = useContext(LanguageContext);
    
    return (
        <div className="chat-list-panel">
            <div className="chat-list-header">
                <h1>{t('channels')}</h1>
                <button className="new-channel-btn" onClick={onRequestNewChannel} aria-label={t('requestNewChannel')}>
                    <PlusIcon />
                    <span>{t('newChannel')}</span>
                </button>
            </div>
            <div className="chat-list">
                {channels.map((channel) => <ChannelItem key={channel.id} {...channel} isActive={activeChannelId === channel.id} onClick={() => setActiveChannelId(channel.id)} />)}
            </div>
        </div>
    )
};

const RequestChannelModal = ({ isOpen, onClose, onRequest }: { isOpen: boolean, onClose: () => void, onRequest: (name: string) => void }) => {
    const { t } = useContext(LanguageContext);
    const [channelName, setChannelName] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (channelName.trim()) {
            onRequest(channelName.trim());
            setChannelName('');
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 id="modal-title">{t('newChannel')}</h3>
                    <button onClick={onClose} className="modal-close-btn" aria-label={t('cancel')}>&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <label htmlFor="channelName" className="sr-only">{t('channelName')}</label>
                        <input
                            id="channelName"
                            type="text"
                            value={channelName}
                            onChange={e => setChannelName(e.target.value)}
                            placeholder={t('channelName')}
                            required
                            autoFocus
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn-secondary" onClick={onClose}>{t('cancel')}</button>
                        <button type="submit" className="btn-primary">{t('request')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const MessageBubble = ({ text, sender }: { text: string, sender: 'me' | 'them' }) => (
    <div className={`message-bubble ${sender === 'me' ? 'sent' : 'received'}`}>
        <p>{text}</p>
    </div>
);

const MessageInput = ({ onSendMessage }: { onSendMessage: (message: string) => void }) => {
    const { t } = useContext(LanguageContext);
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message.trim());
            setMessage('');
        }
    };
    
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="chat-input-container">
            <input 
                type="text" 
                className="chat-input" 
                placeholder={t('typeMessage')} 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                aria-label={t('typeMessage')}
            />
            <button className="send-btn" onClick={handleSend} aria-label={t('send')}>
                <SendIcon />
            </button>
        </div>
    );
};

const ChatWindow = ({ activeChat, onStartCall, onBack, onSendMessage }: { activeChat: any | null, onStartCall: (type: 'voice' | 'video') => void, onBack: () => void, onSendMessage: (message: string) => void }) => {
    const { t } = useContext(LanguageContext);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [activeChat?.messages]);
    
    if (!activeChat) {
        return (
          <div className="chat-window welcome">
            <div className="chat-window-content">
                <ChatBubbleIcon className="chat-window-icon" />
                <h2>{t('welcome')}</h2>
                <p>{t('selectChat')}</p>
            </div>
          </div>
        );
    }

    return (
      <div className="chat-window">
        <div className="chat-window-header">
            <button className="chat-window-back-btn" onClick={onBack} aria-label={t('goBack')}>
                <BackArrowIcon />
            </button>
            <div className="chat-window-header-info">
                <img src={activeChat.avatar} alt={activeChat.name} className="chat-avatar" />
                <span className="chat-name">{activeChat.name}</span>
            </div>
            <div className="chat-window-header-actions">
                <button className="chat-window-action-btn" onClick={() => onStartCall('voice')} aria-label={t('voiceCall')}>
                    <PhoneIcon />
                </button>
                <button className="chat-window-action-btn" onClick={() => onStartCall('video')} aria-label={t('videoCall')}>
                    <CameraOnIcon />
                </button>
            </div>
        </div>
        <div className="chat-messages-area" aria-live="polite">
             {activeChat.messages.map((msg: any) => <MessageBubble key={msg.id} text={msg.text} sender={msg.sender} />)}
             <div ref={messagesEndRef} />
        </div>
        <MessageInput onSendMessage={onSendMessage} />
      </div>
    );
};

const CallScreen = ({ user, type, onEndCall }: { user: any, type: 'voice' | 'video' | null, onEndCall: () => void }) => {
    const { t } = useContext(LanguageContext);
    const [isMuted, setIsMuted] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(type === 'video');

    return (
        <div className="call-screen" role="dialog" aria-modal="true" aria-label={`${type} call with ${user.name}`}>
            <div className="call-screen-bg" style={{backgroundImage: `url(${user.avatar})`}}></div>
            <div className="call-screen-content">
                <img src={user.avatar} alt={user.name} className="call-user-avatar" />
                <h2 className="call-user-name">{user.name}</h2>
                <p className="call-status">{t('calling')}</p>

                <div className="call-controls">
                    <button className="call-control-button" onClick={() => setIsMuted(!isMuted)} aria-label={isMuted ? "Unmute" : "Mute"}>
                        {isMuted ? <MicOffIcon /> : <MicOnIcon />}
                    </button>
                    {type === 'video' && (
                        <button className="call-control-button" onClick={() => setIsCameraOn(!isCameraOn)} aria-label={isCameraOn ? "Turn camera off" : "Turn camera on"}>
                            {isCameraOn ? <CameraOnIcon /> : <CameraOffIcon />}
                        </button>
                    )}
                    <button className="call-control-button end-call" onClick={onEndCall} aria-label={t('endCall')}>
                        <EndCallIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

const ProfileEditModal = ({ isOpen, onClose, user, onSave }: { isOpen: boolean, onClose: () => void, user: any, onSave: (user: any) => void }) => {
    const { t } = useContext(LanguageContext);
    const [name, setName] = useState(user.name);
    const [avatar, setAvatar] = useState(user.avatar);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setName(user.name === 'You' ? '' : user.name);
            setAvatar(user.avatar);
        }
    }, [user, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalName = name.trim() || 'You';
        onSave({ ...user, name: finalName, avatar });
        onClose();
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                setAvatar(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const triggerFileSelect = () => fileInputRef.current?.click();

    return (
        <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="profile-modal-title">
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 id="profile-modal-title">{t('editProfile')}</h3>
                    <button onClick={onClose} className="modal-close-btn" aria-label={t('cancel')}>&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="profile-edit-avatar">
                            <img src={avatar} alt="Avatar preview" className="profile-edit-avatar-img" />
                            <button type="button" className="btn-secondary" onClick={triggerFileSelect}>{t('uploadPhoto')}</button>
                            <input type="file" ref={fileInputRef} onChange={handleAvatarChange} accept="image/*" style={{ display: 'none' }} aria-hidden="true" />
                        </div>
                        <label htmlFor="profileName" className="form-label">{t('name')}</label>
                        <input
                            id="profileName"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder={t('storyYou')}
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn-secondary" onClick={onClose}>{t('cancel')}</button>
                        <button type="submit" className="btn-primary">{t('save')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ProfilePanel = ({ user, onUpdateUser, onRequestNewChannel, onGetPremium, isPremiumActive, setActiveView }: { user: any, onUpdateUser: (user: any) => void, onRequestNewChannel: () => void, onGetPremium: () => void, isPremiumActive: boolean, setActiveView: (view: 'chats' | 'channels' | 'profile') => void }) => {
    const { t } = useContext(LanguageContext);
    const [isEditModalOpen, setEditModalOpen] = useState(false);

    const handleSaveProfile = (updatedUser: any) => {
        onUpdateUser(updatedUser);
        setEditModalOpen(false);
    }

    return (
      <div className="profile-panel">
        <div className="chat-list-header">
            <h1>{t('profile')}</h1>
        </div>
        <div className="profile-info-card">
          <div className="profile-info-avatar-wrapper">
            <img src={user.avatar} alt={user.name} className="profile-info-avatar" />
          </div>
          <div className="profile-info-text">
            <h2>{user.name === 'You' ? t('storyYou') : user.name}</h2>
          </div>
          <button className="edit-profile-btn" onClick={() => setEditModalOpen(true)} aria-label={t('editProfile')}>
            <EditIcon />
          </button>
        </div>
        
        <div className="profile-menu">
            <div className="profile-menu-section">
                <div className="profile-menu-item" onClick={onGetPremium} role="button" tabIndex={0}>
                    <DiamondIcon className="profile-menu-icon" />
                    <span className="profile-menu-title">{isPremiumActive ? t('premiumActive') : t('getPremium')}</span>
                    {isPremiumActive && <CheckCircleIcon className="profile-menu-status-icon" />}
                </div>
            </div>
            <div className="profile-menu-section">
                <div className="profile-menu-item" onClick={() => setActiveView('chats')} role="button" tabIndex={0}>
                    <MessageIcon className="profile-menu-icon" />
                    <span className="profile-menu-title">{t('callsAndMessages')}</span>
                </div>
            </div>
            <div className="profile-menu-section">
                <LanguageSelector />
            </div>
            <div className="profile-menu-section">
                <div className="profile-menu-item" onClick={onRequestNewChannel} role="button" tabIndex={0}>
                    <PlusIcon className="profile-menu-icon" />
                    <span className="profile-menu-title">{t('newChannel')}</span>
                </div>
            </div>
            <div className="profile-menu-section">
                <div className="profile-menu-item">
                    <PaletteIcon className="profile-menu-icon" />
                    <span className="profile-menu-title">{t('appearance')}</span>
                </div>
            </div>
        </div>
        
        <ProfileEditModal
            isOpen={isEditModalOpen}
            onClose={() => setEditModalOpen(false)}
            user={user}
            onSave={handleSaveProfile}
        />
      </div>
    );
};

const AdViewerModal = ({ isOpen, onClose, url }: { isOpen: boolean, onClose: () => void, url: string }) => {
    const { t } = useContext(LanguageContext);
    const [canClose, setCanClose] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setCanClose(false);
            const timer = setTimeout(() => {
                setCanClose(true);
            }, 5000); // 5 second timer
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="ad-viewer-modal-backdrop">
            <div className="ad-viewer-content">
                <div className="ad-viewer-header">
                    <h3>{t('adTitle')}</h3>
                    <button onClick={onClose} className="modal-close-btn ad-viewer-close-btn" disabled={!canClose} aria-label={t('close')}>
                        &times;
                    </button>
                </div>
                <iframe src={url} title="Ad Content" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
        </div>
    );
};

const PremiumModal = ({ isOpen, onClose, adsWatched, onWatchAd, isPremiumUnlocked }: { isOpen: boolean; onClose: () => void; adsWatched: string[]; onWatchAd: (url: string, source: string) => void; isPremiumUnlocked: boolean; }) => {
    const { t } = useContext(LanguageContext);
    
    const adSources = [
        { name: t('watchOnYouTube'), url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', icon: <YouTubeIcon className="ad-slot-icon" />, sourceKey: 'youtube' },
        { name: t('browseInstagram'), url: 'https://www.instagram.com/p/C31Jb7isBZa/embed', icon: <InstagramIcon className="ad-slot-icon" />, sourceKey: 'instagram' },
        { name: t('anotherAd'), url: 'https://www.youtube.com/embed/LXb3EKWsInQ', icon: <DiamondIcon className="ad-slot-icon" />, sourceKey: 'another' }
    ];

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{isPremiumUnlocked ? t('premiumActive') : t('getPremium')}</h3>
                    <button onClick={onClose} className="modal-close-btn" aria-label={t('close')}>&times;</button>
                </div>
                <div className="modal-body">
                    {isPremiumUnlocked || adsWatched.length >= 3 ? (
                        <div className="premium-success-view">
                            <CheckCircleIcon className="success-icon" />
                            <h4>{t('premiumUnlocked')}</h4>
                            <p>{t('premiumUnlockedMessage')}</p>
                        </div>
                    ) : (
                        <>
                            <p>{t('premiumDescription')}</p>
                            <p className="ads-watched-text">{t('adsWatched', { count: adsWatched.length })}</p>
                            <div className="ad-slots-container">
                                {adSources.map(ad => (
                                    <div className="ad-slot" key={ad.sourceKey}>
                                        {ad.icon}
                                        <span className="ad-slot-info">{ad.name}</span>
                                        <button
                                            className="ad-slot-btn"
                                            onClick={() => onWatchAd(ad.url, ad.sourceKey)}
                                            disabled={adsWatched.includes(ad.sourceKey)}
                                        >
                                            {adsWatched.includes(ad.sourceKey) ? t('watched') : t('watchAd')}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const App = () => {
    const [networkMode, setNetworkMode] = useState<'internet' | 'local'>('internet');
    const [activeChatId, setActiveChatId] = useState<number | null>(null);
    const [callInfo, setCallInfo] = useState<{ active: boolean; type: 'voice' | 'video' | null; user: any | null }>({ active: false, type: null, user: null });
    
    const [user, setUser] = useState(initialStories[0]);
    const [chats, setChats] = useState(initialChats);
    const [activeView, setActiveView] = useState<'chats' | 'channels' | 'profile'>('chats');
    const [channels, setChannels] = useState(initialChannels);
    const [isRequestModalOpen, setRequestModalOpen] = useState(false);
    
    // Premium feature state
    const [isPremiumModalOpen, setPremiumModalOpen] = useState(false);
    const [adsWatched, setAdsWatched] = useState<string[]>([]);
    const [adViewerInfo, setAdViewerInfo] = useState<{isOpen: boolean, url: string, source: string} | null>(null);
    const [isPremiumActive, setPremiumActive] = useState(false);

    const allConversations = [...chats, ...channels];
    const activeChat = allConversations.find(c => c.id === activeChatId);
    
    useEffect(() => {
        if (adsWatched.length >= 3 && !isPremiumActive) {
            setPremiumActive(true);
            const timer = setTimeout(() => {
                setPremiumActive(false);
                setAdsWatched([]);
            }, 24 * 60 * 60 * 1000); // 24 hours
            return () => clearTimeout(timer);
        }
    }, [adsWatched, isPremiumActive]);


    const startCall = (type: 'voice' | 'video') => {
        if (activeChat) {
            setCallInfo({ active: true, type, user: activeChat });
        }
    };
    const endCall = () => {
        setCallInfo({ active: false, type: null, user: null });
    };

    const handleSendMessage = (messageText: string) => {
        if (!activeChatId) return;

        const newMessage = {
            id: Date.now(),
            sender: 'me' as 'me' | 'them',
            text: messageText,
        };
        
        const isChannel = channels.some(c => c.id === activeChatId);

        if (isChannel) {
             const updatedChannels = channels.map(channel => {
                if (channel.id === activeChatId) {
                    return { ...channel, messages: [...(channel.messages || []), newMessage] };
                }
                return channel;
            });
            setChannels(updatedChannels);
        } else {
            const updatedChats = chats.map(chat => {
                if (chat.id === activeChatId) {
                    return {
                        ...chat,
                        messages: [...chat.messages, newMessage],
                        message: messageText,
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    };
                }
                return chat;
            });
            setChats(updatedChats);
        }
    };
    
    const handleRequestChannel = (name: string) => {
        const newChannel = {
            id: Date.now(),
            name,
            avatar: `https://place-hold.it/50/8e44ad/ffffff&text=${name.charAt(0).toUpperCase()}`,
            status: 'pending',
            messages: []
        };
        setChannels(prev => [...prev, newChannel]);
        setRequestModalOpen(false);

        // Simulate server approval
        setTimeout(() => {
            setChannels(prev => prev.map(c => c.id === newChannel.id ? {...c, status: 'approved'} : c));
        }, 3000);
    };

    const handleUpdateUser = (updatedUser: any) => {
        setUser(updatedUser);
        // If 'You' story exists, update it. This part is a bit tricky with mock data.
        // For this app's structure, just updating the user state is sufficient as it's passed down.
    };

    const handleWatchAd = (url: string, source: string) => {
        setAdViewerInfo({ isOpen: true, url, source });
        setPremiumModalOpen(false);
    };

    const handleCloseAdViewer = () => {
        if (adViewerInfo) {
            setAdsWatched(prev => [...new Set([...prev, adViewerInfo.source])]);
            setAdViewerInfo(null);
            setPremiumModalOpen(true);
        }
    };


    return (
        <div className={`app-container ${activeChatId ? 'chat-view-active' : ''}`}>
            <Sidebar activeView={activeView} setActiveView={setActiveView} user={user} />

            {activeView === 'chats' && (
                <ChatList 
                    chats={chats}
                    stories={[user, ...initialStories.slice(1)]}
                    networkMode={networkMode} 
                    setNetworkMode={setNetworkMode} 
                    activeChatId={activeChatId}
                    setActiveChatId={setActiveChatId}
                />
            )}
            {activeView === 'channels' && (
                <ChannelsPanel
                    channels={channels}
                    activeChannelId={activeChatId}
                    setActiveChannelId={setActiveChatId}
                    onRequestNewChannel={() => setRequestModalOpen(true)}
                />
            )}
            {activeView === 'profile' && (
                 <ProfilePanel 
                    user={user} 
                    onUpdateUser={handleUpdateUser}
                    onRequestNewChannel={() => setRequestModalOpen(true)}
                    onGetPremium={() => setPremiumModalOpen(true)}
                    isPremiumActive={isPremiumActive}
                    setActiveView={setActiveView}
                 />
            )}

            <ChatWindow 
                activeChat={activeChat}
                onStartCall={startCall}
                onBack={() => setActiveChatId(null)}
                onSendMessage={handleSendMessage}
            />
            
            {callInfo.active && callInfo.user && (
                <CallScreen 
                    user={callInfo.user}
                    type={callInfo.type}
                    onEndCall={endCall}
                />
            )}
            <RequestChannelModal
                isOpen={isRequestModalOpen}
                onClose={() => setRequestModalOpen(false)}
                onRequest={handleRequestChannel}
            />
            <PremiumModal
                isOpen={isPremiumModalOpen}
                onClose={() => setPremiumModalOpen(false)}
                adsWatched={adsWatched}
                onWatchAd={handleWatchAd}
                isPremiumUnlocked={isPremiumActive}
            />
            {adViewerInfo?.isOpen && (
                <AdViewerModal
                    isOpen={adViewerInfo.isOpen}
                    onClose={handleCloseAdViewer}
                    url={adViewerInfo.url}
                />
            )}
        </div>
    );
};


const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
        <LanguageProvider>
            <App />
        </LanguageProvider>
    );
}

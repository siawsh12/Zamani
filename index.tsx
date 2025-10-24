// FIX: Resolve Blob type conflict by aliasing the imported `Blob` from `@google/genai` to `GoogleGenAIBlob`.
import { GoogleGenAI, LiveServerMessage, Modality, Blob as GoogleGenAIBlob, Chat } from "@google/genai";

const FRAME_RATE = 1; // Send 1 frame per second
const JPEG_QUALITY = 0.7;
const FREE_MESSAGE_LIMIT = 100;
const FREE_IMAGE_LIMIT = 30;


type Language = 'fa' | 'en' | 'tr' | 'hi' | 'zh' | 'ar';
type RechargeCard = {
    code: string;
    amount: number;
    used: boolean;
};
type SubscriptionType = 'none' | 'monthly' | 'yearly';
type FacingMode = 'user' | 'environment';

// --- User Data Structure ---
type User = {
    email: string;
    passwordHash: string; // In a real app, this would be a secure hash, not plain text
    balance: number;
    subscriptionType: SubscriptionType;
    subscriptionExpiry: number | null;
    freeMessageCount: number;
    freeImageCount: number;
    generatedCards: RechargeCard[];
};


// --- Translation Data ---
const translations = {
    fa: {
        qamarAITitle: "قمر AI",
        qamarName: "قمر",
        statusOnline: "آنلاین",
        voiceCallAria: "شروع تماس صوتی",
        attachmentAria: "پیوست فایل",
        removeFileAria: "حذف فایل",
        sendAria: "ارسال پیام",
        videoOnAria: "روشن کردن ویدیو",
        videoOffAria: "خاموش کردن ویدیو",
        endCallAria: "پایان تماس",
        managementHeader: "مدیریت",
        clearChat: "پاک کردن چت",
        newChat: "چت جدید",
        settingsHeader: "تنظیمات",
        languageSettingHeader: "زبان",
        chatTabLabel: "چت",
        managementTabLabel: "مدیریت",
        settingsTabLabel: "تنظیمات",
        chatTabAria: "چت",
        managementTabAria: "مدیریت",
        settingsTabAria: "تنظیمات",
        chatInputPlaceholder: "پیام خود را بنویسید...",
        chatInputPlaceholderWithFile: "یک عنوان اضافه کنید... (اختیاری)",
        callStatusPreparing: "در حال آماده‌سازی...",
        callStatusConnecting: "در حال اتصال...",
        callStatusConnected: "متصل شد. صحبت کنید!",
        callStatusError: (msg: string) => `خطا: ${msg}`,
        callStatusPermissionsError: "خطا: دسترسی‌ها را بررسی کنید.",
        typingIndicator: "قمر در حال نوشتن است...",
        thinkingIndicator: "قمر در حال فکر کردن است...",
        newChatStarted: "باشه، یک جلسه چت جدید شروع کردم.",
        textChatError: "متاسفم، در پاسخ دادن با مشکل مواجه شدم. لطفاً دوباره تلاش کنید.",
        imageChatError: "متاسفم، در پردازش تصویر با مشکل مواجه شدم.",
        unsupportedFileError: "متاسفم، در حال حاضر فقط می‌توانم تصاویر را پردازش کنم.",
        imagePromptDefault: "این تصویر را به فارسی توصیف کن.",
        fileLabel: (name: string) => `فایل: ${name}`,
        callTranscriptHeader: "رونوشت تماس:",
        systemInstructionChat: "شما قمر، یک دستیار هوش مصنوعی دوستانه هستید. پاسخ‌های خود را به صورت محاوره‌ای و مختصر به زبان فارسی ارائه دهید.",
        systemInstructionCall: "شما قمر، یک دستیار هوش مصنوعی دوستانه در یک تماس ویدیویی هستید. پاسخ‌ها را کوتاه و به زبان فارسی نگه دارید.",
        walletTabLabel: "کیف پول",
        walletTabAria: "کیف پول",
        walletHeader: "کیف پول",
        currentBalance: "موجودی فعلی",
        formatCurrency: (amount: number) => `${amount.toLocaleString('fa-IR')} دلار`,
        muteCallAria: "بی‌صدا کردن تماس",
        unmuteCallAria: "صدادار کردن تماس",
        holdCallAria: "نگه داشتن تماس",
        resumeCallAria: "ادامه تماس",
        callStatusOnHold: "تماس در حالت انتظار",
        clearAndNewChat: "چت",
        generateCardHeader: "صدور کارت شارژ",
        amountInputPlaceholder: "مبلغ",
        issueCardButton: "صدور کارت",
        redeemCodeHeader: "استفاده از کد شارژ",
        redeemInputPlaceholder: "کد شارژ را وارد کنید...",
        redeemButton: "اعمال کد",
        copyCodeButton: "کپی",
        copiedTooltip: "کپی شد!",
        redeemSuccess: (amount: string) => `مبلغ ${amount} با موفقیت اضافه شد.`,
        redeemError: "کد نامعتبر یا استفاده شده است.",
        passwordModalHeader: "ورود به بخش مدیریت",
        passwordInputPlaceholder: "رمز عبور",
        passwordSubmitButton: "ورود",
        passwordErrorMessage: "رمز عبور اشتباه است",
        subscriptionStatusHeader: "وضعیت اشتراک",
        subscriptionPlansHeader: "پلن‌های اشتراک",
        noActivePlan: "پلن فعال نیست",
        activeUntil: (date: string) => `فعال تا: ${date}`,
        monthlyPlanName: "اشتراک ماهانه",
        yearlyPlanName: "اشتراک سالانه",
        subscribeButton: "خرید",
        insufficientFunds: "موجودی کافی نیست!",
        planActivatedSuccess: "پلن با موفقیت فعال شد!",
        planPrices: { monthly: 3, yearly: 30 },
        freeUsageHeader: "استفاده رایگان",
        freeMessagesRemaining: (count: number) => `پیام‌های باقی‌مانده: ${count}`,
        freeImagesRemaining: (count: number) => `آپلود عکس باقی‌مانده: ${count}`,
        messageLimitReached: "سهمیه پیام رایگان شما تمام شده است. لطفاً برای ادامه یک پلن خریداری کنید.",
        imageLimitReached: "سهمیه آپلود عکس رایگان شما تمام شده است. لطفاً برای ادامه یک پلن خریداری کنید.",
        loginHeader: "ورود",
        signupHeader: "ثبت نام",
        emailPlaceholder: "ایمیل",
        loginButton: "ورود",
        signupButton: "ثبت نام",
        noAccountPrompt: "حساب کاربری ندارید؟",
        signupLink: "ثبت نام کنید",
        hasAccountPrompt: "قبلا ثبت‌نام کرده‌اید؟",
        loginLink: "وارد شوید",
        logoutButton: "خروج",
        loginErrorInvalid: "ایمیل یا رمز عبور نامعتبر است.",
        signupErrorExists: "کاربری با این ایمیل وجود دارد.",
        signupErrorPassword: "رمز عبور باید حداقل ۶ کاراکتر باشد.",
        callRequiresSubscription: "برای استفاده از تماس تصویری باید اشتراک فعال داشته باشید.",
        switchCameraAria: "تغییر دوربین",
        registeredUsersHeader: "کاربران ثبت‌نام شده",
        userBalanceLabel: "موجودی",
        userSubscriptionLabel: "اشتراک",
        noSubscription: "ندارد",
        adsenseHeader: "گوگل ادسنس",
        adsensePubIdPlaceholder: "شناسه ناشر (ca-pub-...)",
        adsenseSlotIdPlaceholder: "شناسه اسلات تبلیغ (مثال: 1234567890)",
        saveButton: "ذخیره",
        adsenseIdSaved: "شناسه‌ها با موفقیت ذخیره شدند.",
        insecureContextWarning: "اتصال امن نیست. ویژگی‌ها فقط روی HTTPS یا localhost کار می‌کنند.",
        insecureContextInputPlaceholder: "برای فعال‌سازی چت به اتصال امن (HTTPS) نیاز است.",
    },
    en: {
        qamarAITitle: "Qamar AI",
        qamarName: "Qamar",
        statusOnline: "Online",
        voiceCallAria: "Start voice call",
        attachmentAria: "Attach file",
        removeFileAria: "Remove file",
        sendAria: "Send message",
        videoOnAria: "Turn video on",
        videoOffAria: "Turn video off",
        endCallAria: "End call",
        managementHeader: "Management",
        clearChat: "Clear Chat",
        newChat: "New Chat",
        settingsHeader: "Settings",
        languageSettingHeader: "Language",
        chatTabLabel: "Chat",
        managementTabLabel: "Manage",
        settingsTabLabel: "Settings",
        chatTabAria: "Chat",
        managementTabAria: "Management",
        settingsTabAria: "Settings",
        chatInputPlaceholder: "Write your message...",
        chatInputPlaceholderWithFile: "Add a caption... (optional)",
        callStatusPreparing: "Preparing...",
        callStatusConnecting: "Connecting...",
        callStatusConnected: "Connected. Start talking!",
        callStatusError: (msg: string) => `Error: ${msg}`,
        callStatusPermissionsError: "Error: Check permissions.",
        typingIndicator: "Qamar is typing...",
        thinkingIndicator: "Qamar is thinking...",
        newChatStarted: "Okay, I've started a new chat session.",
        textChatError: "I'm sorry, I encountered a problem replying. Please try again.",
        imageChatError: "I'm sorry, I had trouble processing the image.",
        unsupportedFileError: "Sorry, I can only process images at the moment.",
        imagePromptDefault: "Describe this image in English.",
        fileLabel: (name: string) => `File: ${name}`,
        callTranscriptHeader: "Call Transcript:",
        systemInstructionChat: "You are Qamar, a friendly AI assistant. Keep your responses conversational and brief, in English.",
        systemInstructionCall: "You are Qamar, a friendly AI assistant on a video call. Keep responses short and in English.",
        walletTabLabel: "Wallet",
        walletTabAria: "Wallet",
        walletHeader: "Wallet",
        currentBalance: "Current Balance",
        formatCurrency: (amount: number) => `$${Math.round(amount)}`,
        muteCallAria: "Mute call",
        unmuteCallAria: "Unmute call",
        holdCallAria: "Hold call",
        resumeCallAria: "Resume call",
        callStatusOnHold: "Call on Hold",
        clearAndNewChat: "Chat",
        generateCardHeader: "Issue Recharge Card",
        amountInputPlaceholder: "Amount",
        issueCardButton: "Issue Card",
        redeemCodeHeader: "Redeem Code",
        redeemInputPlaceholder: "Enter recharge code...",
        redeemButton: "Redeem",
        copyCodeButton: "Copy",
        copiedTooltip: "Copied!",
        redeemSuccess: (amount: string) => `${amount} added successfully.`,
        redeemError: "Invalid or used code.",
        passwordModalHeader: "Enter Management Area",
        passwordInputPlaceholder: "Password",
        passwordSubmitButton: "Enter",
        passwordErrorMessage: "Incorrect Password",
        subscriptionStatusHeader: "Subscription Status",
        subscriptionPlansHeader: "Subscription Plans",
        noActivePlan: "No active plan",
        activeUntil: (date: string) => `Active until: ${date}`,
        monthlyPlanName: "Monthly Plan",
        yearlyPlanName: "Yearly Plan",
        subscribeButton: "Subscribe",
        insufficientFunds: "Insufficient funds!",
        planActivatedSuccess: "Plan activated successfully!",
        planPrices: { monthly: 3, yearly: 30 },
        freeUsageHeader: "Free Usage",
        freeMessagesRemaining: (count: number) => `Messages Remaining: ${count}`,
        freeImagesRemaining: (count: number) => `Image Uploads Remaining: ${count}`,
        messageLimitReached: "You have run out of free messages. Please subscribe to continue.",
        imageLimitReached: "You have run out of free image uploads. Please subscribe to continue.",
        loginHeader: "Login",
        signupHeader: "Sign Up",
        emailPlaceholder: "Email",
        loginButton: "Login",
        signupButton: "Sign Up",
        noAccountPrompt: "Don't have an account?",
        signupLink: "Sign up",
        hasAccountPrompt: "Already have an account?",
        loginLink: "Login",
        logoutButton: "Logout",
        loginErrorInvalid: "Invalid email or password.",
        signupErrorExists: "A user with this email already exists.",
        signupErrorPassword: "Password must be at least 6 characters.",
        callRequiresSubscription: "You need an active subscription to use video calls.",
        switchCameraAria: "Switch Camera",
        registeredUsersHeader: "Registered Users",
        userBalanceLabel: "Balance",
        userSubscriptionLabel: "Subscription",
        noSubscription: "None",
        adsenseHeader: "Google AdSense",
        adsensePubIdPlaceholder: "Publisher ID (ca-pub-...)",
        adsenseSlotIdPlaceholder: "Ad Slot ID (e.g., 1234567890)",
        saveButton: "Save",
        adsenseIdSaved: "IDs saved successfully.",
        insecureContextWarning: "Connection not secure. Features only work over HTTPS or localhost.",
        insecureContextInputPlaceholder: "Secure connection (HTTPS) required to chat.",
    },
    tr: {
        qamarAITitle: "Qamar AI",
        qamarName: "Qamar",
        statusOnline: "Çevrimiçi",
        voiceCallAria: "Sesli aramayı başlat",
        attachmentAria: "Dosya ekle",
        removeFileAria: "Dosyayı kaldır",
        sendAria: "Mesaj gönder",
        videoOnAria: "Videoyu aç",
        videoOffAria: "Videoyu kapat",
        endCallAria: "Aramayı bitir",
        managementHeader: "Yönetim",
        clearChat: "Sohbeti Temizle",
        newChat: "Yeni Sohbet",
        settingsHeader: "Ayarlar",
        languageSettingHeader: "Dil",
        chatTabLabel: "Sohbet",
        managementTabLabel: "Yönet",
        settingsTabLabel: "Ayarlar",
        chatTabAria: "Sohbet",
        managementTabAria: "Yönetim",
        settingsTabAria: "Ayarlar",
        chatInputPlaceholder: "Mesajınızı yazın...",
        chatInputPlaceholderWithFile: "Altyazı ekle... (isteğe bağlı)",
        callStatusPreparing: "Hazırlanıyor...",
        callStatusConnecting: "Bağlanıyor...",
        callStatusConnected: "Bağlandı. Konuşmaya başlayın!",
        callStatusError: (msg: string) => `Hata: ${msg}`,
        callStatusPermissionsError: "Hata: İzinleri kontrol edin.",
        typingIndicator: "Qamar yazıyor...",
        thinkingIndicator: "Qamar düşünüyor...",
        newChatStarted: "Tamam, yeni bir sohbet başlattım.",
        textChatError: "Üzgünüm, yanıtlarken bir sorunla karşılaştım. Lütfen tekrar deneyin.",
        imageChatError: "Üzgünüm, resmi işlerken bir sorun yaşadım.",
        unsupportedFileError: "Üzgünüm, şu anda sadece resimleri işleyebilirim.",
        imagePromptDefault: "Bu resmi Türkçe olarak tanımla.",
        fileLabel: (name: string) => `Dosya: ${name}`,
        callTranscriptHeader: "Arama Dökümü:",
        systemInstructionChat: "Sen Qamar, dost canlısı bir yapay zeka asistanısın. Cevaplarını sohbet havasında ve kısa tut, Türkçe olarak.",
        systemInstructionCall: "Sen Qamar, bir video görüşmesinde dost canlısı bir yapay zeka asistanısın. Cevapları kısa ve Türkçe tut.",
        walletTabLabel: "Cüzdan",
        walletTabAria: "Cüzdan",
        walletHeader: "Cüzdan",
        currentBalance: "Mevcut Bakiye",
        formatCurrency: (amount: number) => `$${Math.round(amount)}`,
        muteCallAria: "Aramayı sessize al",
        unmuteCallAria: "Sessizden çıkar",
        holdCallAria: "Aramayı beklet",
        resumeCallAria: "Aramaya devam et",
        callStatusOnHold: "Arama Beklemede",
        clearAndNewChat: "Sohbet",
        generateCardHeader: "Kontör Kartı Oluştur",
        amountInputPlaceholder: "Miktar",
        issueCardButton: "Kart Oluştur",
        redeemCodeHeader: "Kodu Kullan",
        redeemInputPlaceholder: "Kontör kodunu girin...",
        redeemButton: "Kullan",
        copyCodeButton: "Kopyala",
        copiedTooltip: "Kopyalandı!",
        redeemSuccess: (amount: string) => `${amount} başarıyla eklendi.`,
        redeemError: "Geçersiz veya kullanılmış kod.",
        passwordModalHeader: "Yönetim Alanına Gir",
        passwordInputPlaceholder: "Şifre",
        passwordSubmitButton: "Giriş",
        passwordErrorMessage: "Yanlış Şifre",
        subscriptionStatusHeader: "Abonelik Durumu",
        subscriptionPlansHeader: "Abonelik Planları",
        noActivePlan: "Aktif plan yok",
        activeUntil: (date: string) => `Aktif olduğu tarih: ${date}`,
        monthlyPlanName: "Aylık Plan",
        yearlyPlanName: "Yıllık Plan",
        subscribeButton: "Abone Ol",
        insufficientFunds: "Yetersiz bakiye!",
        planActivatedSuccess: "Plan başarıyla etkinleştirildi!",
        planPrices: { monthly: 3, yearly: 30 },
        freeUsageHeader: "Ücretsiz Kullanım",
        freeMessagesRemaining: (count: number) => `Kalan Mesaj: ${count}`,
        freeImagesRemaining: (count: number) => `Kalan Resim Yükleme: ${count}`,
        messageLimitReached: "Ücretsiz mesaj hakkınız bitti. Devam etmek için lütfen abone olun.",
        imageLimitReached: "Ücretsiz resim yükleme hakkınız bitti. Devam etmek için lütfen abone olun.",
        loginHeader: "Giriş Yap",
        signupHeader: "Kayıt Ol",
        emailPlaceholder: "E-posta",
        loginButton: "Giriş Yap",
        signupButton: "Kayıt Ol",
        noAccountPrompt: "Hesabınız yok mu?",
        signupLink: "Kayıt ol",
        hasAccountPrompt: "Zaten bir hesabınız var mı?",
        loginLink: "Giriş yap",
        logoutButton: "Çıkış Yap",
        loginErrorInvalid: "Geçersiz e-posta veya şifre.",
        signupErrorExists: "Bu e-posta ile bir kullanıcı zaten mevcut.",
        signupErrorPassword: "Şifre en az 6 karakter olmalıdır.",
        callRequiresSubscription: "Görüntülü aramaları kullanmak için aktif bir aboneliğe ihtiyacınız var.",
        switchCameraAria: "Kamerayı Değiştir",
        registeredUsersHeader: "Kayıtlı Kullanıcılar",
        userBalanceLabel: "Bakiye",
        userSubscriptionLabel: "Abonelik",
        noSubscription: "Yok",
        adsenseHeader: "Google AdSense",
        adsensePubIdPlaceholder: "Yayıncı Kimliği (ca-pub-...)",
        adsenseSlotIdPlaceholder: "Reklam Alanı Kimliği (örn. 1234567890)",
        saveButton: "Kaydet",
        adsenseIdSaved: "Kimlikler başarıyla kaydedildi.",
        insecureContextWarning: "Bağlantı güvenli değil. Özellikler yalnızca HTTPS veya localhost üzerinden çalışır.",
        insecureContextInputPlaceholder: "Sohbet için güvenli bağlantı (HTTPS) gereklidir.",
    },
    hi: {
        qamarAITitle: "क़मर AI",
        qamarName: "क़मर",
        statusOnline: "ऑनलाइन",
        voiceCallAria: "वॉइस कॉल शुरू करें",
        attachmentAria: "फ़ाइल जोड़ें",
        removeFileAria: "फ़ाइल हटाएँ",
        sendAria: "संदेश भेजें",
        videoOnAria: "वीडियो चालू करें",
        videoOffAria: "वीडियो बंद करें",
        endCallAria: "कॉल समाप्त करें",
        managementHeader: "प्रबंधन",
        clearChat: "चैट साफ़ करें",
        newChat: "नई चैट",
        settingsHeader: "सेटिंग्स",
        languageSettingHeader: "भाषा",
        chatTabLabel: "चैट",
        managementTabLabel: "प्रबंधन",
        settingsTabLabel: "सेटिंग्स",
        chatTabAria: "चैट",
        managementTabAria: "प्रबंधन",
        settingsTabAria: "सेटिंग्स",
        chatInputPlaceholder: "अपना संदेश लिखें...",
        chatInputPlaceholderWithFile: "एक कैप्शन जोड़ें... (वैकल्पिक)",
        callStatusPreparing: "तैयारी हो रही है...",
        callStatusConnecting: "कनेक्ट हो रहा है...",
        callStatusConnected: "जुड़ गया। बात करना शुरू करें!",
        callStatusError: (msg: string) => `त्रुटि: ${msg}`,
        callStatusPermissionsError: "त्रुटि: अनुमतियों की जाँच करें।",
        typingIndicator: "क़मर लिख रहा है...",
        thinkingIndicator: "क़मर सोच रहा है...",
        newChatStarted: "ठीक है, मैंने एक नया चैट सत्र शुरू कर दिया है।",
        textChatError: "मुझे खेद है, मुझे जवाब देने में समस्या हुई। कृपया पुनः प्रयास करें।",
        imageChatError: "मुझे खेद है, मुझे छवि को संसाधित करने में समस्या हुई।",
        unsupportedFileError: "क्षमा करें, मैं इस समय केवल छवियों को संसाधित कर सकता हूँ।",
        imagePromptDefault: "इस छवि का वर्णन हिंदी में करें।",
        fileLabel: (name: string) => `फ़ाइल: ${name}`,
        callTranscriptHeader: "कॉल ट्रांसक्रिप्ट:",
        systemInstructionChat: "आप क़मर हैं, एक दोस्ताना एआई सहायक। अपने जवाबों को संवादात्मक और संक्षिप्त रखें, हिंदी में।",
        systemInstructionCall: "आप क़मर हैं, एक वीडियो कॉल पर एक दोस्ताना एआई सहायक। जवाबों को छोटा और हिंदी में रखें।",
        walletTabLabel: "वॉलेट",
        walletTabAria: "वॉलेट",
        walletHeader: "वॉलेट",
        currentBalance: "वर्तमान शेष",
        formatCurrency: (amount: number) => `$${Math.round(amount)}`,
        muteCallAria: "कॉल म्यूट करें",
        unmuteCallAria: "कॉल अनम्यूट करें",
        holdCallAria: "कॉल होल्ड करें",
        resumeCallAria: "कॉल फिर से शुरू करें",
        callStatusOnHold: "कॉल होल्ड पर",
        clearAndNewChat: "चैट",
        generateCardHeader: "रिचार्ज कार्ड जारी करें",
        amountInputPlaceholder: "राशि",
        issueCardButton: "कार्ड जारी करें",
        redeemCodeHeader: "कोड भुनाएँ",
        redeemInputPlaceholder: "रिचार्ज कोड दर्ज करें...",
        redeemButton: "भुनाएँ",
        copyCodeButton: "कॉपी",
        copiedTooltip: "कॉपी किया गया!",
        redeemSuccess: (amount: string) => `${amount} सफलतापूर्वक जोड़ा गया।`,
        redeemError: "अमान्य या प्रयुक्त कोड।",
        passwordModalHeader: "प्रबंधन क्षेत्र में प्रवेश करें",
        passwordInputPlaceholder: "पासवर्ड",
        passwordSubmitButton: "प्रवेश करें",
        passwordErrorMessage: "गलत पासवर्ड",
        subscriptionStatusHeader: "सदस्यता स्थिति",
        subscriptionPlansHeader: "सदस्यता योजनाएँ",
        noActivePlan: "कोई सक्रिय योजना नहीं",
        activeUntil: (date: string) => `तक सक्रिय: ${date}`,
        monthlyPlanName: "मासिक योजना",
        yearlyPlanName: "वार्षिक योजना",
        subscribeButton: "सदस्यता लें",
        insufficientFunds: "अपर्याप्त धनराशि!",
        planActivatedSuccess: "योजना सफलतापूर्वक सक्रिय हो गई!",
        planPrices: { monthly: 3, yearly: 30 },
        freeUsageHeader: "मुफ्त उपयोग",
        freeMessagesRemaining: (count: number) => `शेष संदेश: ${count}`,
        freeImagesRemaining: (count: number) => `शेष छवि अपलोड: ${count}`,
        messageLimitReached: "आपके मुफ्त संदेश समाप्त हो गए हैं। जारी रखने के लिए कृपया सदस्यता लें।",
        imageLimitReached: "आपके मुफ्त छवि अपलोड समाप्त हो गए हैं। जारी रखने के लिए कृपया सदस्यता लें।",
        loginHeader: "लॉग इन करें",
        signupHeader: "साइन अप करें",
        emailPlaceholder: "ईमेल",
        loginButton: "लॉग इन करें",
        signupButton: "साइन अप करें",
        noAccountPrompt: "खाता नहीं है?",
        signupLink: "साइन अप करें",
        hasAccountPrompt: "पहले से ही एक खाता है?",
        loginLink: "लॉग इन करें",
        logoutButton: "लॉग आउट करें",
        loginErrorInvalid: "अमान्य ईमेल या पासवर्ड।",
        signupErrorExists: "इस ईमेल वाला उपयोगकर्ता पहले से मौजूद है।",
        signupErrorPassword: "पासवर्ड कम से कम 6 वर्णों का होना चाहिए।",
        callRequiresSubscription: "वीडियो कॉल का उपयोग करने के लिए आपको एक सक्रिय सदस्यता की आवश्यकता है।",
        switchCameraAria: "कैमरा बदलें",
        registeredUsersHeader: "पंजीकृत उपयोगकर्ता",
        userBalanceLabel: "शेष",
        userSubscriptionLabel: "सदस्यता",
        noSubscription: "कोई नहीं",
        adsenseHeader: "गूगल एडसेंस",
        adsensePubIdPlaceholder: "प्रकाशक आईडी (ca-pub-...)",
        adsenseSlotIdPlaceholder: "विज्ञापन स्लॉट आईडी (उदा., 1234567890)",
        saveButton: "सहेजें",
        adsenseIdSaved: "आईडी सफलतापूर्वक सहेजी गईं।",
        insecureContextWarning: "कनेक्शन सुरक्षित नहीं है। सुविधाएँ केवल HTTPS या localhost पर काम करती हैं।",
        insecureContextInputPlaceholder: "चैट करने के लिए सुरक्षित कनेक्शन (HTTPS) आवश्यक है।",
    },
    zh: {
        qamarAITitle: "Qamar AI",
        qamarName: "Qamar",
        statusOnline: "在线",
        voiceCallAria: "开始语音通话",
        attachmentAria: "附加文件",
        removeFileAria: "删除文件",
        sendAria: "发送消息",
        videoOnAria: "打开视频",
        videoOffAria: "关闭视频",
        endCallAria: "结束通话",
        managementHeader: "管理",
        clearChat: "清除聊天",
        newChat: "新聊天",
        settingsHeader: "设置",
        languageSettingHeader: "语言",
        chatTabLabel: "聊天",
        managementTabLabel: "管理",
        settingsTabLabel: "设置",
        chatTabAria: "聊天",
        managementTabAria: "管理",
        settingsTabAria: "设置",
        chatInputPlaceholder: "写下您的消息...",
        chatInputPlaceholderWithFile: "添加标题...（可选）",
        callStatusPreparing: "准备中...",
        callStatusConnecting: "连接中...",
        callStatusConnected: "已连接。开始通话！",
        callStatusError: (msg: string) => `错误：${msg}`,
        callStatusPermissionsError: "错误：请检查权限。",
        typingIndicator: "Qamar 正在输入...",
        thinkingIndicator: "Qamar 正在思考...",
        newChatStarted: "好的，我已经开始了新的聊天会话。",
        textChatError: "抱歉，我回复时遇到问题。请重试。",
        imageChatError: "抱歉，我处理图像时遇到问题。",
        unsupportedFileError: "抱歉，我目前只能处理图像。",
        imagePromptDefault: "用中文描述这张图片。",
        fileLabel: (name: string) => `文件：${name}`,
        callTranscriptHeader: "通话记录：",
        systemInstructionChat: "你是 Qamar，一个友好的人工智能助手。请用中文保持对话式和简洁的回复。",
        systemInstructionCall: "你是 Qamar，一个在视频通话中的友好人工智能助手。请保持回复简短并使用中文。",
        walletTabLabel: "钱包",
        walletTabAria: "钱包",
        walletHeader: "钱包",
        currentBalance: "当前余额",
        formatCurrency: (amount: number) => `$${Math.round(amount)}`,
        muteCallAria: "静音通话",
        unmuteCallAria: "取消静音",
        holdCallAria: "保持通话",
        resumeCallAria: "继续通话",
        callStatusOnHold: "通话保持中",
        clearAndNewChat: "聊天",
        generateCardHeader: "发行充值卡",
        amountInputPlaceholder: "金额",
        issueCardButton: "发行卡",
        redeemCodeHeader: "兑换代码",
        redeemInputPlaceholder: "输入充值代码...",
        redeemButton: "兑换",
        copyCodeButton: "复制",
        copiedTooltip: "已复制！",
        redeemSuccess: (amount: string) => `${amount} 已成功添加。`,
        redeemError: "无效或已使用的代码。",
        passwordModalHeader: "进入管理区域",
        passwordInputPlaceholder: "密码",
        passwordSubmitButton: "进入",
        passwordErrorMessage: "密码错误",
        subscriptionStatusHeader: "订阅状态",
        subscriptionPlansHeader: "订阅计划",
        noActivePlan: "无有效计划",
        activeUntil: (date: string) => `有效期至：${date}`,
        monthlyPlanName: "月度计划",
        yearlyPlanName: "年度计划",
        subscribeButton: "订阅",
        insufficientFunds: "资金不足！",
        planActivatedSuccess: "计划已成功激活！",
        planPrices: { monthly: 3, yearly: 30 },
        freeUsageHeader: "免费使用",
        freeMessagesRemaining: (count: number) => `剩余消息：${count}`,
        freeImagesRemaining: (count: number) => `剩余图片上传：${count}`,
        messageLimitReached: "您的免费消息已用完。请订阅以继续。",
        imageLimitReached: "您的免费图片上传已用完。请订阅以继续。",
        loginHeader: "登录",
        signupHeader: "注册",
        emailPlaceholder: "电子邮件",
        loginButton: "登录",
        signupButton: "注册",
        noAccountPrompt: "没有帐户？",
        signupLink: "注册",
        hasAccountPrompt: "已有帐户？",
        loginLink: "登录",
        logoutButton: "登出",
        loginErrorInvalid: "无效的电子邮件或密码。",
        signupErrorExists: "该电子邮件的用户已存在。",
        signupErrorPassword: "密码必须至少为6个字符。",
        callRequiresSubscription: "您需要有效订阅才能使用视频通话。",
        switchCameraAria: "切换摄像头",
        registeredUsersHeader: "注册用户",
        userBalanceLabel: "余额",
        userSubscriptionLabel: "订阅",
        noSubscription: "无",
        adsenseHeader: "谷歌广告联盟",
        adsensePubIdPlaceholder: "发布商 ID (ca-pub-...)",
        adsenseSlotIdPlaceholder: "广告位 ID (例如 1234567890)",
        saveButton: "保存",
        adsenseIdSaved: "ID 已成功保存。",
        insecureContextWarning: "连接不安全。功能仅在 HTTPS 或 localhost 上工作。",
        insecureContextInputPlaceholder: "需要安全连接 (HTTPS) 才能聊天。",
    },
    ar: {
        qamarAITitle: "قمر AI",
        qamarName: "قمر",
        statusOnline: "متصل",
        voiceCallAria: "بدء مكالمة صوتية",
        attachmentAria: "إرفاق ملف",
        removeFileAria: "إزالة الملف",
        sendAria: "إرسال رسالة",
        videoOnAria: "تشغيل الفيديو",
        videoOffAria: "إيقاف الفيديو",
        endCallAria: "إنهاء المكالمة",
        managementHeader: "إدارة",
        clearChat: "مسح المحادثة",
        newChat: "محادثة جديدة",
        settingsHeader: "الإعدادات",
        languageSettingHeader: "اللغة",
        chatTabLabel: "محادثة",
        managementTabLabel: "إدارة",
        settingsTabLabel: "الإعدادات",
        chatTabAria: "محادثة",
        managementTabAria: "إدارة",
        settingsTabAria: "الإعدادات",
        chatInputPlaceholder: "اكتب رسالتك...",
        chatInputPlaceholderWithFile: "أضف تعليقًا... (اختياري)",
        callStatusPreparing: "جارٍ التحضير...",
        callStatusConnecting: "جارٍ الاتصال...",
        callStatusConnected: "متصل. ابدأ الحديث!",
        callStatusError: (msg: string) => `خطأ: ${msg}`,
        callStatusPermissionsError: "خطأ: تحقق من الأذونات.",
        typingIndicator: "قمر يكتب...",
        thinkingIndicator: "قمر يفكر...",
        newChatStarted: "حسنًا، لقد بدأت جلسة محادثة جديدة.",
        textChatError: "أنا آسف، واجهت مشكلة في الرد. يرجى المحاولة مرة أخرى.",
        imageChatError: "أنا آسف، واجهت مشكلة في معالجة الصورة.",
        unsupportedFileError: "عذرًا، لا يمكنني معالجة الصور إلا في الوقت الحالي.",
        imagePromptDefault: "صف هذه الصورة باللغة العربية.",
        fileLabel: (name: string) => `ملف: ${name}`,
        callTranscriptHeader: "نص المكالمة:",
        systemInstructionChat: "أنت قمر، مساعد ذكاء اصطناعي ودود. حافظ على ردودك حوارية وموجزة، باللغة العربية.",
        systemInstructionCall: "أنت قمر، مساعد ذكاء اصطناعي ودود في مكالمة فيديو. حافظ على الردود قصيرة وباللغة العربية.",
        walletTabLabel: "المحفظة",
        walletTabAria: "المحفظة",
        walletHeader: "المحفظة",
        currentBalance: "الرصيد الحالي",
        formatCurrency: (amount: number) => `$${amount.toLocaleString('ar-SA')}`,
        muteCallAria: "كتم المكالمة",
        unmuteCallAria: "إلغاء كتم المكالمة",
        holdCallAria: "تعليق المكالمة",
        resumeCallAria: "استئناف المكالمة",
        callStatusOnHold: "المكالمة معلقة",
        clearAndNewChat: "محادثة",
        generateCardHeader: "إصدار بطاقة شحن",
        amountInputPlaceholder: "المبلغ",
        issueCardButton: "إصدار البطاقة",
        redeemCodeHeader: "استخدام الرمز",
        redeemInputPlaceholder: "أدخل رمز الشحن...",
        redeemButton: "استخدام",
        copyCodeButton: "نسخ",
        copiedTooltip: "تم النسخ!",
        redeemSuccess: (amount: string) => `تمت إضافة ${amount} بنجاح.`,
        redeemError: "رمز غير صالح أو مستخدم.",
        passwordModalHeader: "الدخول إلى منطقة الإدارة",
        passwordInputPlaceholder: "كلمة المرور",
        passwordSubmitButton: "دخول",
        passwordErrorMessage: "كلمة مرور غير صحيحة",
        subscriptionStatusHeader: "حالة الاشتراك",
        subscriptionPlansHeader: "خطط الاشتراك",
        noActivePlan: "لا توجد خطة نشطة",
        activeUntil: (date: string) => `نشط حتى: ${date}`,
        monthlyPlanName: "الخطة الشهرية",
        yearlyPlanName: "الخطة السنوية",
        subscribeButton: "اشتراك",
        insufficientFunds: "رصيد غير كافٍ!",
        planActivatedSuccess: "تم تفعيل الخطة بنجاح!",
        planPrices: { monthly: 3, yearly: 30 },
        freeUsageHeader: "الاستخدام المجاني",
        freeMessagesRemaining: (count: number) => `الرسائل المتبقية: ${count}`,
        freeImagesRemaining: (count: number) => `تحميلات الصور المتبقية: ${count}`,
        messageLimitReached: "لقد نفدت رسائلك المجانية. يرجى الاشتراك للمتابعة.",
        imageLimitReached: "لقد نفدت تحميلات الصور المجانية. يرجى الاشتراك للمتابعة.",
        loginHeader: "تسجيل الدخول",
        signupHeader: "إنشاء حساب",
        emailPlaceholder: "البريد الإلكتروني",
        loginButton: "تسجيل الدخول",
        signupButton: "إنشاء حساب",
        noAccountPrompt: "ليس لديك حساب؟",
        signupLink: "أنشئ حسابًا",
        hasAccountPrompt: "لديك حساب بالفعل؟",
        loginLink: "سجل الدخول",
        logoutButton: "تسجيل الخروج",
        loginErrorInvalid: "بريد إلكتروني أو كلمة مرور غير صالحة.",
        signupErrorExists: "يوجد مستخدم بهذا البريد الإلكتروني بالفعل.",
        signupErrorPassword: "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.",
        callRequiresSubscription: "تحتاج إلى اشتراك نشط لاستخدام مكالمات الفيديو.",
        switchCameraAria: "تبديل الكاميرا",
        registeredUsersHeader: "المستخدمون المسجلون",
        userBalanceLabel: "الرصيد",
        userSubscriptionLabel: "الاشتراك",
        noSubscription: "لا يوجد",
        adsenseHeader: "جوجل أدسنس",
        adsensePubIdPlaceholder: "معرف الناشر (ca-pub-...)",
        adsenseSlotIdPlaceholder: "معرف الوحدة الإعلانية (مثال: 1234567890)",
        saveButton: "حفظ",
        adsenseIdSaved: "تم حفظ المعرفات بنجاح.",
        insecureContextWarning: "الاتصال غير آمن. الميزات تعمل فقط عبر HTTPS أو localhost.",
        insecureContextInputPlaceholder: "مطلوب اتصال آمن (HTTPS) للدردشة.",
    }
};

// --- DOM Elements ---
const authView = document.getElementById('auth-view') as HTMLDivElement;
const loginView = document.getElementById('login-view') as HTMLDivElement;
const signupView = document.getElementById('signup-view') as HTMLDivElement;
const appView = document.getElementById('app') as HTMLDivElement;

const loginForm = document.getElementById('login-form') as HTMLFormElement;
const signupForm = document.getElementById('signup-form') as HTMLFormElement;
const loginEmailInput = document.getElementById('login-email') as HTMLInputElement;
const loginPasswordInput = document.getElementById('login-password') as HTMLInputElement;
const loginErrorEl = document.getElementById('login-error') as HTMLParagraphElement;
const signupEmailInput = document.getElementById('signup-email') as HTMLInputElement;
const signupPasswordInput = document.getElementById('signup-password') as HTMLInputElement;
const signupErrorEl = document.getElementById('signup-error') as HTMLParagraphElement;
const showSignupButton = document.getElementById('show-signup') as HTMLAnchorElement;
const showLoginButton = document.getElementById('show-login') as HTMLAnchorElement;
const logoutButton = document.getElementById('logout-button') as HTMLButtonElement;


const mainContent = document.getElementById('main-content') as HTMLDivElement;
const chatView = document.getElementById('chat-view') as HTMLDivElement;
const callScreen = document.getElementById('call-screen') as HTMLDivElement;
const managementView = document.getElementById('management-view') as HTMLDivElement;
const settingsView = document.getElementById('settings-view') as HTMLDivElement;
const walletView = document.getElementById('wallet-view') as HTMLDivElement;
const insecureContextWarning = document.getElementById('insecure-context-warning') as HTMLDivElement;

const voiceCallButton = document.getElementById('voice-call-button') as HTMLButtonElement;
const endCallButton = document.getElementById('end-call-button') as HTMLButtonElement;
const videoToggleButton = document.getElementById('video-toggle-button') as HTMLButtonElement;
const muteToggleButton = document.getElementById('mute-toggle-button') as HTMLButtonElement;
const holdCallButton = document.getElementById('hold-call-button') as HTMLButtonElement;
const switchCameraButton = document.getElementById('switch-camera-button') as HTMLButtonElement;
const callStatusEl = document.getElementById('call-status') as HTMLParagraphElement;
const transcriptEl = document.getElementById('transcript') as HTMLDivElement;
const liveTranscriptContainer = document.getElementById('live-transcript-container') as HTMLDivElement;
const videoEl = document.getElementById('user-video') as HTMLVideoElement;
const videoContainer = document.getElementById('video-container') as HTMLDivElement;
const qamarAvatarCall = document.getElementById('qamar-avatar-call') as HTMLDivElement;
const chatForm = document.getElementById('chat-form') as HTMLFormElement;
const chatInput = document.getElementById('chat-input') as HTMLInputElement;
const sendButton = document.getElementById('send-button') as HTMLButtonElement;
const attachmentButton = document.getElementById('attachment-button') as HTMLButtonElement;
const fileInput = document.getElementById('file-input') as HTMLInputElement;
const canvasEl = document.createElement('canvas');
const videoOnIcon = document.getElementById('video-on-icon') as HTMLElement;
const videoOffIcon = document.getElementById('video-off-icon') as HTMLElement;
const micOnIcon = document.getElementById('mic-on-icon') as HTMLElement;
const micOffIcon = document.getElementById('mic-off-icon') as HTMLElement;
const filePreviewContainer = document.getElementById('file-preview-container') as HTMLDivElement;
const filePreviewName = document.getElementById('file-preview-name') as HTMLSpanElement;
const removeFileButton = document.getElementById('remove-file-button') as HTMLButtonElement;
const adContainer = document.getElementById('ad-container') as HTMLDivElement;
const toastContainer = document.getElementById('toast-container') as HTMLDivElement;

// Nav, Management, Settings, Wallet Elements
const chatTab = document.getElementById('chat-tab') as HTMLButtonElement;
const managementTab = document.getElementById('management-tab') as HTMLButtonElement;
const settingsTab = document.getElementById('settings-tab') as HTMLButtonElement;
const walletTab = document.getElementById('wallet-tab') as HTMLButtonElement;
const langButtons = document.querySelectorAll('.lang-button');
const walletBalanceAmount = document.getElementById('wallet-balance-amount') as HTMLParagraphElement;
const cardAmountInput = document.getElementById('card-amount-input') as HTMLInputElement;
const generateCardButton = document.getElementById('generate-card-button') as HTMLButtonElement;
const generatedCardsList = document.getElementById('generated-cards-list') as HTMLDivElement;
const redeemCodeInput = document.getElementById('redeem-code-input') as HTMLInputElement;
const redeemCodeButton = document.getElementById('redeem-code-button') as HTMLButtonElement;
const redeemStatusMessage = document.getElementById('redeem-status-message') as HTMLParagraphElement;
const passwordModal = document.getElementById('password-modal') as HTMLDivElement;
const passwordModalOverlay = document.getElementById('password-modal-overlay') as HTMLDivElement;
const passwordModalContent = document.getElementById('password-modal-content') as HTMLDivElement;
const passwordForm = document.getElementById('password-form') as HTMLFormElement;
const passwordInput = document.getElementById('password-input') as HTMLInputElement;
const passwordErrorMessage = document.getElementById('password-error-message') as HTMLParagraphElement;
const subscriptionStatusText = document.getElementById('subscription-status-text') as HTMLParagraphElement;
const planPriceElements = document.querySelectorAll('.plan-price');
const subscribeButtons = document.querySelectorAll('.subscribe-button');
const chatMenuButton = document.getElementById('chat-menu-button') as HTMLButtonElement;
const chatMenuDropdown = document.getElementById('chat-menu-dropdown') as HTMLDivElement;
const clearChatButton = document.getElementById('clear-chat-button') as HTMLButtonElement;
const newChatButton = document.getElementById('new-chat-button') as HTMLButtonElement;
const freeUsageSection = document.getElementById('free-usage-section') as HTMLDivElement;
const freeMessagesText = document.getElementById('free-messages-text') as HTMLParagraphElement;
const freeImagesText = document.getElementById('free-images-text') as HTMLParagraphElement;
const userListContainer = document.getElementById('user-list-container') as HTMLDivElement;
const adsensePubIdInput = document.getElementById('adsense-pub-id-input') as HTMLInputElement;
const adsenseSlotIdInput = document.getElementById('adsense-slot-id-input') as HTMLInputElement;
const saveAdsenseIdsButton = document.getElementById('save-adsense-ids-button') as HTMLButtonElement;
const adsenseStatusMessage = document.getElementById('adsense-status-message') as HTMLParagraphElement;

const pageViews = document.querySelectorAll('.page-view');
const navItems = document.querySelectorAll('.nav-item');

// --- App State ---
let isConversing = false;
let mediaStream: MediaStream | null = null;
let sessionPromise: Promise<any> | null = null;
let frameInterval: number | null = null;
let stagedFile: File | null = null;
let currentLanguage: Language = 'fa';
let isMuted = false;
let isCallOnHold = false;
let currentFacingMode: FacingMode = 'user';

// --- User & Auth State ---
let currentUser: User | null = null;
let users: Record<string, User> = {};

// --- AdSense State ---
let adsensePublisherId: string | null = null;
let adsenseSlotId: string | null = null;

// Audio processing state
let inputAudioContext: AudioContext | null = null;
let outputAudioContext: AudioContext | null = null;
let inputScriptProcessor: ScriptProcessorNode | null = null;
let nextStartTime = 0;
const sources = new Set<AudioBufferSourceNode>();

// Transcription state
let currentInputTranscription = '';
let currentUserTurnElement: HTMLElement | null = null;
let currentOutputTranscription = '';
let currentModelTurnElement: HTMLElement | null = null;

// Initialize Gemini client and chat
let chat: Chat | null = null;

function getAiClient() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
}

function initializeChat(lang: Language = 'fa') {
    const ai = getAiClient();
    chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: translations[lang].systemInstructionChat,
        },
    });
}

// --- AdSense Logic ---
function saveAdsenseIds(pubId: string, slotId: string) {
    adsensePublisherId = pubId;
    adsenseSlotId = slotId;
    localStorage.setItem('qamar-ai-adsense-pub-id', pubId);
    localStorage.setItem('qamar-ai-adsense-slot-id', slotId);
}

function loadAdsenseIds() {
    const storedPubId = localStorage.getItem('qamar-ai-adsense-pub-id');
    const storedSlotId = localStorage.getItem('qamar-ai-adsense-slot-id');
    if (storedPubId && storedSlotId) {
        adsensePublisherId = storedPubId;
        adsenseSlotId = storedSlotId;
        adsensePubIdInput.value = storedPubId;
        adsenseSlotIdInput.value = storedSlotId;
        initAdsense();
    }
}

function initAdsense() {
    if (adsensePublisherId && adsenseSlotId && adContainer) {
        // Create and add the AdSense script tag to the head
        const adScript = document.createElement('script');
        adScript.async = true;
        adScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsensePublisherId}`;
        adScript.crossOrigin = 'anonymous';
        document.head.appendChild(adScript);

        // Clear previous ad and create the ad unit
        adContainer.innerHTML = '';
        const adUnit = document.createElement('ins');
        adUnit.className = 'adsbygoogle';
        adUnit.style.display = 'block';
        adUnit.dataset.adClient = adsensePublisherId;
        adUnit.dataset.adSlot = adsenseSlotId;
        adUnit.dataset.adFormat = 'auto';
        adUnit.dataset.fullWidthResponsive = 'true';

        adContainer.appendChild(adUnit);

        // Push the ad
        try {
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense error:", e);
        }
    }
}

// --- Auth & Data Management ---
function loadUsers() {
    const storedUsers = localStorage.getItem('qamar-ai-users');
    users = storedUsers ? JSON.parse(storedUsers) : {};
}

function saveUsers() {
    localStorage.setItem('qamar-ai-users', JSON.stringify(users));
}

function showAuthView(view: 'login' | 'signup') {
    authView.classList.remove('hidden');
    appView.classList.add('hidden');
    if (view === 'login') {
        loginView.classList.remove('hidden');
        signupView.classList.add('hidden');
    } else {
        loginView.classList.add('hidden');
        signupView.classList.remove('hidden');
    }
}

function showAppView() {
    authView.classList.add('hidden');
    appView.classList.remove('hidden');
}

function handleLogin(user: User) {
    currentUser = user;
    sessionStorage.setItem('qamar-ai-currentUser', user.email);
    loadUserData();
    showAppView();
}

function loadUserData() {
    if (!currentUser) return;
    const savedLang = localStorage.getItem(`qamar-ai-language-${currentUser.email}`) as Language | null;
    checkSubscriptionStatus();
    setLanguage(savedLang || 'fa');
    updateBalanceDisplay();
    updateSubscriptionStatusUI();
    updateFreeUsageUI();
    renderGeneratedCards();
}

// --- Language & Initialization ---
function setLanguage(lang: Language) {
    if (!['fa', 'en', 'tr', 'hi', 'zh', 'ar'].includes(lang)) return;

    // Security check: many features require a secure context (HTTPS).
    if (!window.isSecureContext) {
        console.warn('Application is not running in a secure context. Features will be limited.');
        const warningParagraph = insecureContextWarning.querySelector('p');
        if (warningParagraph) {
            warningParagraph.textContent = translations[lang].insecureContextWarning;
        }
        insecureContextWarning.classList.remove('hidden');
        
        // Disable key features that won't work
        voiceCallButton.disabled = true;
        sendButton.disabled = true;
        attachmentButton.disabled = true;
        chatInput.disabled = true;
        chatInput.placeholder = translations[lang].insecureContextInputPlaceholder;
    }

    currentLanguage = lang;
    if (currentUser) {
        localStorage.setItem(`qamar-ai-language-${currentUser.email}`, lang);
    } else {
        localStorage.setItem('qamar-ai-language', lang); // For auth screen
    }
    

    document.documentElement.lang = lang;
    document.documentElement.dir = ['fa', 'ar'].includes(lang) ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-translate-key]').forEach(element => {
        const el = element as HTMLElement;
        const key = el.dataset.translateKey as keyof typeof translations.en;
        const prop = el.dataset.translateProp || 'textContent';

        if (key && translations[lang][key]) {
            const translationValue = translations[lang][key];
            const translation = typeof translationValue === 'function' ? (translationValue as Function)('') : translationValue;

             if (prop === 'aria-label' || prop === 'placeholder') {
                // Avoid overwriting the placeholder if it was set by the security check
                if (!(el.id === 'chat-input' && el.hasAttribute('disabled'))) {
                     el.setAttribute(prop, translation as string);
                }
            } else {
                (el as any)[prop] = translation;
            }
        }
    });
    
    const isVideoOn = !videoContainer.classList.contains('hidden');
    videoToggleButton.setAttribute('aria-label', isVideoOn ? translations[currentLanguage].videoOffAria : translations[currentLanguage].videoOnAria);
    muteToggleButton.setAttribute('aria-label', isMuted ? translations[currentLanguage].unmuteCallAria : translations[currentLanguage].muteCallAria);
    holdCallButton.setAttribute('aria-label', isCallOnHold ? translations[currentLanguage].resumeCallAria : translations[currentLanguage].holdCallAria);

    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    
    updateBalanceDisplay();
    updateSubscriptionStatusUI();
    updatePlanPricesUI();
    updateFreeUsageUI();
    renderGeneratedCards();
    if (!managementView.classList.contains('hidden')) {
        renderUserList();
    }
    initializeChat(lang);
}

function initializeApp() {
    // Handle dynamic viewport height for mobile browsers
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    window.addEventListener('resize', setViewportHeight);
    setViewportHeight();

    loadUsers();
    loadAdsenseIds();
    const currentUserEmail = sessionStorage.getItem('qamar-ai-currentUser');
    if (currentUserEmail && users[currentUserEmail]) {
        handleLogin(users[currentUserEmail]);
    } else {
        const savedLang = localStorage.getItem('qamar-ai-language') as Language | null;
        setLanguage(savedLang || 'fa');
        showAuthView('login');
    }
}
initializeApp();


// --- Wallet, Subscription & Card Logic ---
function updateBalanceDisplay() {
    if (!currentUser) return;
    const { formatCurrency } = translations[currentLanguage];
    walletBalanceAmount.textContent = formatCurrency(currentUser.balance);
}

function isSubscribed(user: User | null = currentUser): boolean {
    if (!user) return false;
    return user.subscriptionType !== 'none' &&
           user.subscriptionExpiry != null &&
           user.subscriptionExpiry > Date.now();
}


function checkSubscriptionStatus() {
    if (!currentUser) return;
    if (!isSubscribed()) {
        currentUser.subscriptionType = 'none';
        currentUser.subscriptionExpiry = null;
        saveUsers();
    }
}

function updateSubscriptionStatusUI() {
    if (!currentUser) return;
    if (isSubscribed() && currentUser.subscriptionExpiry) {
        const expiryDate = new Date(currentUser.subscriptionExpiry);
        const locale = ['fa', 'ar'].includes(currentLanguage) ? `${currentLanguage}-SA` : `${currentLanguage}-CA`;
        const formattedDate = expiryDate.toLocaleDateString(locale);
        subscriptionStatusText.textContent = translations[currentLanguage].activeUntil(formattedDate);
        subscriptionStatusText.classList.add('active');
        freeUsageSection.classList.add('hidden');
    } else {
        subscriptionStatusText.textContent = translations[currentLanguage].noActivePlan;
        subscriptionStatusText.classList.remove('active');
        freeUsageSection.classList.remove('hidden');
    }
    updateFreeUsageUI();
}

function updatePlanPricesUI() {
    const { formatCurrency, planPrices } = translations[currentLanguage];
    planPriceElements.forEach(el => {
        const element = el as HTMLElement;
        const plan = element.dataset.planPrice as 'monthly' | 'yearly';
        if (plan) {
            element.textContent = formatCurrency(planPrices[plan]);
        }
    });
}

function handleSubscription(plan: 'monthly' | 'yearly') {
    if (!currentUser) return;
    const priceInUSD = translations['en'].planPrices[plan];
    
    if (currentUser.balance >= priceInUSD) {
        currentUser.balance -= priceInUSD;
        
        const now = new Date();
        const expiryDate = new Date(now.getTime());
        if (plan === 'monthly') {
            expiryDate.setMonth(expiryDate.getMonth() + 1);
        } else {
            expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        }
        
        currentUser.subscriptionType = plan;
        currentUser.subscriptionExpiry = expiryDate.getTime();

        saveUsers();
        updateBalanceDisplay();
        updateSubscriptionStatusUI();
        showToast(translations[currentLanguage].planActivatedSuccess);
    } else {
        showToast(translations[currentLanguage].insufficientFunds);
    }
}


function updateFreeUsageUI() {
    if (!currentUser) return;
    if (isSubscribed()) {
        freeUsageSection.classList.add('hidden');
    } else {
        freeUsageSection.classList.remove('hidden');
        freeMessagesText.textContent = translations[currentLanguage].freeMessagesRemaining(currentUser.freeMessageCount);
        freeImagesText.textContent = translations[currentLanguage].freeImagesRemaining(currentUser.freeImageCount);
    }
}

function rechargeWallet(amount: number) {
    if (!currentUser) return;
    currentUser.balance += amount;
    saveUsers();
    updateBalanceDisplay();
}

function renderGeneratedCards() {
    if (!currentUser) return;
    generatedCardsList.innerHTML = '';
    const { formatCurrency, copyCodeButton } = translations[currentLanguage];
    
    if (currentUser.generatedCards.length === 0) return;

    currentUser.generatedCards.forEach(card => {
        const cardEl = document.createElement('div');
        cardEl.className = `generated-card ${card.used ? 'used' : ''}`;
        cardEl.innerHTML = `
            <div class="card-info">
                <div class="code">${card.code}</div>
                <div class="amount">${formatCurrency(card.amount)}</div>
            </div>
            <div class="card-actions">
                <button class="copy-button" data-code="${card.code}">${copyCodeButton}</button>
            </div>
        `;
        generatedCardsList.appendChild(cardEl);
    });
    
    document.querySelectorAll('.copy-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const target = e.currentTarget as HTMLButtonElement;
            const code = target.dataset.code;
            if (code) {
                navigator.clipboard.writeText(code);
                const originalText = target.textContent;
                target.textContent = translations[currentLanguage].copiedTooltip;
                setTimeout(() => {
                    target.textContent = originalText;
                }, 1500);
            }
        });
    });
}

function renderUserList() {
    userListContainer.innerHTML = '';
    const { formatCurrency, userBalanceLabel, userSubscriptionLabel, noSubscription } = translations[currentLanguage];

    Object.values(users).forEach(user => {
        const userEl = document.createElement('div');
        userEl.className = 'user-list-item';

        const hasSub = isSubscribed(user);
        const subText = hasSub ? user.subscriptionType : noSubscription;

        userEl.innerHTML = `
            <div class="user-main-info">
                <div class="user-email">${user.email}</div>
            </div>
            <div class="user-details">
                 <div class="user-balance">${userBalanceLabel}: ${formatCurrency(user.balance)}</div>
                 <div class="user-subscription ${hasSub ? 'active' : 'inactive'}">${subText}</div>
            </div>
        `;
        userListContainer.appendChild(userEl);
    });
}

generateCardButton.addEventListener('click', () => {
    if (!currentUser) return;
    const amountUSD = parseInt(cardAmountInput.value, 10);
    if (!amountUSD || amountUSD <= 0) return;

    const newCard: RechargeCard = {
        code: `QMR-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
        amount: amountUSD,
        used: false,
    };

    currentUser.generatedCards.unshift(newCard);
    saveUsers();
    renderGeneratedCards();
    cardAmountInput.value = '';
});

redeemCodeButton.addEventListener('click', () => {
    if (!currentUser) return;
    const code = redeemCodeInput.value.trim().toUpperCase();
    redeemStatusMessage.textContent = '';
    if (!code) return;

    // Admin can redeem any card, so we check all users' cards
    let cardFound: RechargeCard | null = null;
    let cardOwner: User | null = null;
    
    for (const user of Object.values(users)) {
        const card = user.generatedCards.find(c => c.code === code);
        if (card) {
            cardFound = card;
            cardOwner = user;
            break;
        }
    }

    if (cardFound && !cardFound.used && cardOwner) {
        cardFound.used = true;
        rechargeWallet(cardFound.amount); // Recharges the current user's wallet
        saveUsers(); // Saves all user data, including the updated card status
        renderGeneratedCards(); // Re-renders the admin's card list
        
        const amountDisplayStr = translations[currentLanguage].formatCurrency(cardFound.amount);
        redeemStatusMessage.textContent = translations[currentLanguage].redeemSuccess(amountDisplayStr);
        redeemStatusMessage.className = 'success';
        redeemCodeInput.value = '';
    } else {
        redeemStatusMessage.textContent = translations[currentLanguage].redeemError;
        redeemStatusMessage.className = 'error';
    }
});

subscribeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const plan = button.getAttribute('data-plan') as 'monthly' | 'yearly';
        handleSubscription(plan);
    });
});

// --- Auth Event Listeners ---
showSignupButton.addEventListener('click', (e) => {
    e.preventDefault();
    showAuthView('signup');
});
showLoginButton.addEventListener('click', (e) => {
    e.preventDefault();
    showAuthView('login');
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginEmailInput.value.toLowerCase();
    const password = loginPasswordInput.value;
    const user = users[email];

    if (user && user.passwordHash === password) { // Simple check, no real hashing
        loginErrorEl.classList.add('hidden');
        handleLogin(user);
    } else {
        loginErrorEl.textContent = translations[currentLanguage].loginErrorInvalid;
        loginErrorEl.classList.remove('hidden');
    }
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signupEmailInput.value.toLowerCase();
    const password = signupPasswordInput.value;

    if (users[email]) {
        signupErrorEl.textContent = translations[currentLanguage].signupErrorExists;
        signupErrorEl.classList.remove('hidden');
        return;
    }
    if (password.length < 6) {
        signupErrorEl.textContent = translations[currentLanguage].signupErrorPassword;
        signupErrorEl.classList.remove('hidden');
        return;
    }
    
    signupErrorEl.classList.add('hidden');
    const newUser: User = {
        email,
        passwordHash: password, // Store plain text for this simulation
        balance: 0,
        subscriptionType: 'none',
        subscriptionExpiry: null,
        freeMessageCount: FREE_MESSAGE_LIMIT,
        freeImageCount: FREE_IMAGE_LIMIT,
        generatedCards: [],
    };
    users[email] = newUser;
    saveUsers();
    handleLogin(newUser);
});

logoutButton.addEventListener('click', () => {
    currentUser = null;
    sessionStorage.removeItem('qamar-ai-currentUser');
    showAuthView('login');
});


// --- Main App Event Listeners ---
voiceCallButton.addEventListener('click', handleVoiceCallButtonClick);
endCallButton.addEventListener('click', () => endConversation());
videoToggleButton.addEventListener('click', handleVideoToggle);
muteToggleButton.addEventListener('click', handleMuteToggle);
holdCallButton.addEventListener('click', handleHoldToggle);
switchCameraButton.addEventListener('click', handleSwitchCamera);
removeFileButton.addEventListener('click', clearStagedFile);

saveAdsenseIdsButton.addEventListener('click', () => {
    const pubId = adsensePubIdInput.value.trim();
    const slotId = adsenseSlotIdInput.value.trim();
    
    if (pubId.startsWith('ca-pub-') && slotId) {
        saveAdsenseIds(pubId, slotId);
        adsenseStatusMessage.textContent = translations[currentLanguage].adsenseIdSaved;
        setTimeout(() => { adsenseStatusMessage.textContent = '' }, 3000);
        // Reload to apply changes and load the ad script
        location.reload();
    } else {
        // Simple validation feedback
        if (!pubId.startsWith('ca-pub-')) {
            adsensePubIdInput.style.borderColor = 'var(--error-color)';
        }
        if (!slotId) {
            adsenseSlotIdInput.style.borderColor = 'var(--error-color)';
        }
    }
});
adsensePubIdInput.addEventListener('input', () => adsensePubIdInput.style.borderColor = '');
adsenseSlotIdInput.addEventListener('input', () => adsenseSlotIdInput.style.borderColor = '');


function switchTab(targetViewId: string, activeTab: HTMLElement) {
    pageViews.forEach(view => {
        const page = view as HTMLElement;
        if(page.id !== 'call-screen') {
            page.classList.add('hidden');
        }
    });
    document.getElementById(targetViewId)?.classList.remove('hidden');
    navItems.forEach(item => item.classList.remove('active'));
    activeTab.classList.add('active');
    if (targetViewId === 'wallet-view') {
        updateSubscriptionStatusUI();
    }
    if (targetViewId === 'management-view') {
        renderUserList();
    }
}

chatTab.addEventListener('click', () => switchTab('chat-view', chatTab));
walletTab.addEventListener('click', () => switchTab('wallet-view', walletTab));
managementTab.addEventListener('click', () => {
    passwordErrorMessage.classList.add('hidden');
    passwordModal.classList.remove('hidden');
});
settingsTab.addEventListener('click', () => switchTab('settings-view', settingsTab));

passwordModalOverlay.addEventListener('click', () => passwordModal.classList.add('hidden'));
passwordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (passwordInput.value === 'admin123') {
        passwordModal.classList.add('hidden');
        passwordInput.value = '';
        passwordErrorMessage.classList.add('hidden');
        switchTab('management-view', managementTab);
    } else {
        passwordErrorMessage.classList.remove('hidden');
        passwordModalContent.classList.add('shake');
        setTimeout(() => passwordModalContent.classList.remove('shake'), 820);
        passwordInput.value = '';
    }
});

chatMenuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    chatMenuDropdown.classList.toggle('hidden');
});
clearChatButton.addEventListener('click', () => {
    transcriptEl.innerHTML = '';
    chatMenuDropdown.classList.add('hidden');
});
newChatButton.addEventListener('click', () => {
    transcriptEl.innerHTML = '';
    initializeChat(currentLanguage);
    if (chat) {
        addMessageToChat(transcriptEl, 'model', { text: translations[currentLanguage].newChatStarted });
    }
    chatMenuDropdown.classList.add('hidden');
});
window.addEventListener('click', (e) => {
    if (!chatMenuDropdown.classList.contains('hidden')) {
        const target = e.target as Node;
        if (!chatMenuDropdown.contains(target) && target !== chatMenuButton) {
            chatMenuDropdown.classList.add('hidden');
        }
    }
});

langButtons.forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.getAttribute('data-lang') as Language;
        setLanguage(lang);
    });
});

chatInput.addEventListener('input', () => {
    sendButton.disabled = chatInput.value.trim() === '' && !stagedFile;
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (chatInput.disabled || sendButton.disabled) {
        return;
    }
    const text = chatInput.value.trim();

    if (stagedFile) {
        sendImageMessage(stagedFile, text);
        clearStagedFile();
    } else if (text) {
        sendTextMessage(text);
    }
    
    chatInput.value = '';
    chatInput.placeholder = translations[currentLanguage].chatInputPlaceholder;
    sendButton.disabled = true;
});

attachmentButton.addEventListener('click', () => {
    if (!currentUser) return;
    if (!isSubscribed() && currentUser.freeImageCount <= 0) {
        showToast(translations[currentLanguage].imageLimitReached);
        return;
    }
    fileInput.click();
});
fileInput.addEventListener('change', (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
        stagedFile = file;
        filePreviewName.textContent = file.name;
        filePreviewContainer.classList.remove('hidden');
        chatInput.placeholder = translations[currentLanguage].chatInputPlaceholderWithFile;
        sendButton.disabled = false;
    }
});


async function handleVoiceCallButtonClick() {
  if (!currentUser || !isSubscribed(currentUser)) {
      showToast(translations[currentLanguage].callRequiresSubscription);
      return;
  }
  if (!isConversing) {
    showCallScreen();
    await startConversation();
  }
}

async function handleSwitchCamera() {
    if (!mediaStream) return;
    
    currentFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';

    const oldVideoTrack = mediaStream.getVideoTracks()[0];
    oldVideoTrack.stop();

    try {
        const newStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { exact: currentFacingMode } }
        });
        const newVideoTrack = newStream.getVideoTracks()[0];
        mediaStream.removeTrack(oldVideoTrack);
        mediaStream.addTrack(newVideoTrack);
        videoEl.srcObject = mediaStream; // Re-assign to reflect the change
    } catch (err) {
        console.error("Error switching camera:", err);
        // Try to revert if switching failed
        currentFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';
    }
}

function handleVideoToggle() {
    if (!isConversing || isCallOnHold) return;
    const isVideoOn = !videoContainer.classList.contains('hidden');
    if (isVideoOn) {
        videoContainer.classList.add('hidden');
        videoToggleButton.classList.remove('active');
        videoOnIcon.classList.add('hidden');
        videoOffIcon.classList.remove('hidden');
        videoToggleButton.setAttribute('aria-label', translations[currentLanguage].videoOnAria);
        mediaStream?.getVideoTracks().forEach(track => track.enabled = false);
    } else {
        videoContainer.classList.remove('hidden');
        videoToggleButton.classList.add('active');
        videoOnIcon.classList.remove('hidden');
        videoOffIcon.classList.add('hidden');
        videoToggleButton.setAttribute('aria-label', translations[currentLanguage].videoOffAria);
        mediaStream?.getVideoTracks().forEach(track => track.enabled = true);
    }
}

function handleMuteToggle() {
    if (!isConversing || isCallOnHold) return;
    isMuted = !isMuted;
    muteToggleButton.classList.toggle('active', isMuted);
    micOnIcon.classList.toggle('hidden', isMuted);
    micOffIcon.classList.toggle('hidden', !isMuted);
    muteToggleButton.setAttribute('aria-label', isMuted ? translations[currentLanguage].unmuteCallAria : translations[currentLanguage].muteCallAria);
    mediaStream?.getAudioTracks().forEach(track => track.enabled = !isMuted);
}

function handleHoldToggle() {
    if (!isConversing) return;
    isCallOnHold = !isCallOnHold;
    holdCallButton.classList.toggle('active', isCallOnHold);
    holdCallButton.setAttribute('aria-label', isCallOnHold ? translations[currentLanguage].resumeCallAria : translations[currentLanguage].holdCallAria);
    
    videoToggleButton.disabled = isCallOnHold;
    muteToggleButton.disabled = isCallOnHold;

    if (isCallOnHold) {
        callStatusEl.textContent = translations[currentLanguage].callStatusOnHold;
        mediaStream?.getTracks().forEach(track => track.enabled = false);
    } else {
        callStatusEl.textContent = translations[currentLanguage].callStatusConnected;
        mediaStream?.getAudioTracks().forEach(track => track.enabled = !isMuted);
        const isVideoOn = !videoContainer.classList.contains('hidden');
        mediaStream?.getVideoTracks().forEach(track => track.enabled = isVideoOn);
    }
}


// --- Text & Image Chat Logic ---
async function sendTextMessage(text: string) {
    if (!currentUser) return;
    if (!isSubscribed()) {
        if (currentUser.freeMessageCount <= 0) {
            showToast(translations[currentLanguage].messageLimitReached);
            return;
        }
    }

    if (!chat) {
        initializeChat(currentLanguage);
    }
    if (!chat) return; // Should not happen, but good for type safety

    addMessageToChat(transcriptEl, 'user', { text });
    const thinkingEl = addMessageToChat(transcriptEl, 'model', { text: translations[currentLanguage].typingIndicator }, 'typing-indicator');

    try {
        const response = await chat.sendMessage({ message: text });
        if (!isSubscribed()) {
            currentUser.freeMessageCount--;
            saveUsers();
            updateFreeUsageUI();
        }
        thinkingEl.remove();
        addMessageToChat(transcriptEl, 'model', { text: response.text });
    } catch (err) {
        console.error('Text chat error:', err);
        thinkingEl.remove();
        addMessageToChat(transcriptEl, 'model', { text: translations[currentLanguage].textChatError });
        initializeChat(currentLanguage);
    }
}

async function sendImageMessage(file: File, promptText: string) {
    if (!currentUser) return;
    if (!isSubscribed()) {
        if (currentUser.freeImageCount <= 0) {
            showToast(translations[currentLanguage].imageLimitReached);
            return;
        }
    }

    if (!file.type.startsWith('image/')) {
        addMessageToChat(transcriptEl, 'user', { text: translations[currentLanguage].fileLabel(file.name) });
        addMessageToChat(transcriptEl, 'model', { text: translations[currentLanguage].unsupportedFileError });
        return;
    }
    const imageUrl = URL.createObjectURL(file);
    addMessageToChat(transcriptEl, 'user', { image: imageUrl, text: promptText });
    
    const thinkingEl = addMessageToChat(transcriptEl, 'model', { text: translations[currentLanguage].thinkingIndicator }, 'typing-indicator');

    try {
        const ai = getAiClient();
        const base64Data = await fileToBase64(file);
        const imagePart = { inlineData: { data: base64Data, mimeType: file.type } };
        const finalPrompt = promptText.trim() || translations[currentLanguage].imagePromptDefault;
        const textPart = { text: finalPrompt };
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
        });

        if (!isSubscribed()) {
            currentUser.freeImageCount--;
            saveUsers();
            updateFreeUsageUI();
        }

        thinkingEl.remove();
        addMessageToChat(transcriptEl, 'model', { text: response.text });

    } catch (err) {
        console.error('Image chat error:', err);
        thinkingEl.remove();
        addMessageToChat(transcriptEl, 'model', { text: translations[currentLanguage].imageChatError });
    }
}


// --- Core Voice Conversation Logic ---
async function startConversation() {
  isConversing = true;
  videoToggleButton.disabled = false;
  muteToggleButton.disabled = false;
  holdCallButton.disabled = false;
  switchCameraButton.classList.remove('hidden');
  callStatusEl.textContent = translations[currentLanguage].callStatusConnecting;
  currentFacingMode = 'user'; // Reset to front camera

  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { 
          width: { ideal: 1280 }, 
          height: { ideal: 720 },
          facingMode: currentFacingMode 
      },
    });
    videoEl.srcObject = mediaStream;
    mediaStream.getVideoTracks().forEach(track => track.enabled = false);
    setupAudioProcessing();

    const ai = getAiClient();
    sessionPromise = ai.live.connect({
      model: 'gemini-2.5-flash-native-audio-preview-09-2025',
      callbacks: {
        onopen: () => {
          callStatusEl.textContent = translations[currentLanguage].callStatusConnected;
          streamMedia();
        },
        onmessage: handleLiveMessage,
        onerror: (e: ErrorEvent) => {
          console.error('API Error:', e);
          callStatusEl.textContent = translations[currentLanguage].callStatusError(e.message);
          endConversation();
        },
        onclose: (e: CloseEvent) => {
          console.log('API connection closed');
          endConversation(false);
        },
      },
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
        inputAudioTranscription: {},
        outputAudioTranscription: {},
        systemInstruction: translations[currentLanguage].systemInstructionCall,
      },
    });
  } catch (err) {
    console.error('Failed to start conversation:', err);
    callStatusEl.textContent = translations[currentLanguage].callStatusPermissionsError;
    await endConversation();
  }
}

async function endConversation(closeSession = true) {
  if (!isConversing && !closeSession) return;
  isConversing = false;
  isMuted = false;
  isCallOnHold = false;

  if (sessionPromise && closeSession) {
    try {
      const session = await sessionPromise;
      session.close();
    } catch (e) { console.error("Error closing session", e); }
  }

  if (frameInterval) { clearInterval(frameInterval); frameInterval = null; }
  if (mediaStream) { mediaStream.getTracks().forEach(track => track.stop()); mediaStream = null; }
  videoEl.srcObject = null;
  if (inputScriptProcessor) { inputScriptProcessor.disconnect(); inputScriptProcessor = null; }
  if (inputAudioContext) { await inputAudioContext.close(); inputAudioContext = null; }
  if (outputAudioContext) { await outputAudioContext.close(); outputAudioContext = null; }
  
  for (const source of sources.values()) { source.stop(); }
  sources.clear();
  nextStartTime = 0;
  
  sessionPromise = null;
  archiveCallTranscript();
  showChatScreen();
}

// --- Media Streaming ---
function setupAudioProcessing() {
    inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
}

function streamMedia() {
  if (!mediaStream || !inputAudioContext || !sessionPromise) return;

  const source = inputAudioContext.createMediaStreamSource(mediaStream);
  inputScriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
  inputScriptProcessor.onaudioprocess = (audioProcessingEvent) => {
    if (isCallOnHold) return;
    const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
    const pcmBlob = createBlob(inputData);
    sessionPromise!.then((session) => session.sendRealtimeInput({ media: pcmBlob }));
  };
  source.connect(inputScriptProcessor);
  inputScriptProcessor.connect(inputAudioContext.destination);

  frameInterval = window.setInterval(() => {
    if (isCallOnHold || videoContainer.classList.contains('hidden')) return;
    const ctx = canvasEl.getContext('2d');
    if (!ctx) return;
    canvasEl.width = videoEl.videoWidth;
    canvasEl.height = videoEl.videoHeight;
    ctx.drawImage(videoEl, 0, 0, videoEl.videoWidth, videoEl.videoHeight);
    canvasEl.toBlob(
      async (blob) => {
        if (blob) {
          try {
            const base64Data = await blobToBase64(blob);
            sessionPromise!.then((session) => {
              session.sendRealtimeInput({ media: { data: base64Data, mimeType: 'image/jpeg' } });
            });
          } catch (e) { console.error("Error sending video frame:", e); }
        }
      }, 'image/jpeg', JPEG_QUALITY
    );
  }, 1000 / FRAME_RATE);
}

// --- Live Message Handling ---
async function handleLiveMessage(message: LiveServerMessage) {
  const qamarCallAvatar = document.getElementById('qamar-avatar-call');
  
  const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
  if (audioData && outputAudioContext) {
    qamarCallAvatar?.classList.add('speaking');
    nextStartTime = Math.max(nextStartTime, outputAudioContext.currentTime);
    try {
        const audioBuffer = await decodeAudioData(decode(audioData), outputAudioContext, 24000, 1);
        const source = outputAudioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(outputAudioContext.destination);
        source.addEventListener('ended', () => {
            sources.delete(source);
            if (sources.size === 0) {
               qamarCallAvatar?.classList.remove('speaking');
            }
        });
        source.start(nextStartTime);
        nextStartTime += audioBuffer.duration;
        sources.add(source);
    } catch(e) {
        console.error("Error playing audio", e);
        qamarCallAvatar?.classList.remove('speaking');
    }
  } else if (sources.size === 0) {
     qamarCallAvatar?.classList.remove('speaking');
  }

  if (message.serverContent?.inputTranscription) {
    const text = message.serverContent.inputTranscription.text;
    currentInputTranscription += text;
    updateLiveTranscriptionUI('user', text);
  } else if (message.serverContent?.outputTranscription) {
    const text = message.serverContent.outputTranscription.text;
    currentOutputTranscription += text;
    updateLiveTranscriptionUI('model', text);
  }

  if (message.serverContent?.turnComplete) {
    currentUserTurnElement = null;
    currentModelTurnElement = null;
    currentInputTranscription = '';
    currentOutputTranscription = '';
  }

  if (message.serverContent?.interrupted) {
    for (const source of sources.values()) {
      source.stop();
      sources.delete(source);
    }
    nextStartTime = 0;
    qamarCallAvatar?.classList.remove('speaking');
  }
}

function updateLiveTranscriptionUI(role: 'user' | 'model', text: string) {
    if (role === 'user') {
        if (!currentUserTurnElement) {
            currentUserTurnElement = addMessageToChat(liveTranscriptContainer, 'user', {});
        }
        currentUserTurnElement.querySelector('p')!.textContent += text;
    } else {
        if (!currentModelTurnElement) {
            currentModelTurnElement = addMessageToChat(liveTranscriptContainer, 'model', {});
        }
        currentModelTurnElement.querySelector('p')!.textContent += text;
    }
    liveTranscriptContainer.scrollTop = liveTranscriptContainer.scrollHeight;
}

// --- UI Management ---
function showCallScreen() {
  mainContent.classList.add('hidden');
  callScreen.classList.remove('hidden');
  callStatusEl.textContent = translations[currentLanguage].callStatusPreparing;
  liveTranscriptContainer.innerHTML = '';
  videoToggleButton.disabled = true;
  videoToggleButton.classList.remove('active');
  videoOnIcon.classList.add('hidden');
  videoOffIcon.classList.remove('hidden');
  muteToggleButton.disabled = true;
  muteToggleButton.classList.remove('active');
  micOnIcon.classList.remove('hidden');
  micOffIcon.classList.add('hidden');
  holdCallButton.disabled = true;
  holdCallButton.classList.remove('active');
  switchCameraButton.classList.add('hidden');
  setLanguage(currentLanguage);
}

function showChatScreen() {
    mainContent.classList.remove('hidden');
    callScreen.classList.add('hidden');
    videoContainer.classList.add('hidden');
    videoToggleButton.classList.remove('active');
    videoOnIcon.classList.add('hidden');
    videoOffIcon.classList.remove('hidden');
    videoToggleButton.disabled = true;
    muteToggleButton.classList.remove('active');
    micOnIcon.classList.remove('hidden');
    micOffIcon.classList.add('hidden');
    muteToggleButton.disabled = true;
    holdCallButton.classList.remove('active');
    holdCallButton.disabled = true;
    switchCameraButton.classList.add('hidden');
    setLanguage(currentLanguage);
}

function archiveCallTranscript() {
    const callTranscriptContent = liveTranscriptContainer.innerHTML;
    if (callTranscriptContent.trim()) {
        const archiveEntry = document.createElement('div');
        archiveEntry.classList.add('transcript-entry', 'call-archive');
        archiveEntry.innerHTML = `
            <strong>${translations[currentLanguage].callTranscriptHeader}</strong>
            <div class="call-archive-content">${callTranscriptContent}</div>
        `;
        transcriptEl.appendChild(archiveEntry);
        transcriptEl.parentElement!.scrollTop = transcriptEl.parentElement!.scrollHeight;
    }
    liveTranscriptContainer.innerHTML = '';
}


// --- DOM & UI Helpers ---
function addMessageToChat(
  parentElement: HTMLElement,
  role: 'user' | 'model',
  content: { text?: string, image?: string },
  customClass?: string
): HTMLElement {
  const entry = document.createElement('div');
  entry.classList.add('transcript-entry', role === 'user' ? 'user-turn' : 'model-turn');
  if (customClass) entry.classList.add(customClass);
  if (content.image) {
      const img = document.createElement('img');
      img.src = content.image;
      entry.appendChild(img);
  }
  const p = document.createElement('p');
  p.textContent = content.text || '';
  entry.appendChild(p);
  parentElement.appendChild(entry);
  parentElement.scrollTop = parentElement.scrollHeight;
  if (parentElement === transcriptEl) {
    const chatWindow = document.getElementById('chat-window');
    if(chatWindow) chatWindow.scrollTop = chatWindow.scrollHeight;
  }
  return entry;
}

function clearStagedFile() {
    stagedFile = null;
    (fileInput as HTMLInputElement).value = '';
    filePreviewContainer.classList.add('hidden');
    filePreviewName.textContent = '';
    chatInput.placeholder = translations[currentLanguage].chatInputPlaceholder;
    sendButton.disabled = chatInput.value.trim() === '';
}

function showToast(message: string, duration = 3000) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Animate out and remove
    setTimeout(() => {
        toast.classList.remove('show');
        toast.addEventListener('transitionend', () => {
            toast.remove();
        });
    }, duration);
}

// --- Base64 & Audio Helpers ---
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const result = (reader.result as string).split(',')[1];
        resolve(result);
    };
    reader.onerror = error => reject(error);
  });
}

function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = (reader.result as string).split(',')[1];
        resolve(base64data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
}

function createBlob(data: Float32Array): GoogleGenAIBlob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
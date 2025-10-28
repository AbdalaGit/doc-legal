// --- NUMBER TO ARABIC WORDS CONVERTER ---
const numberConverter = {
  numberToArabicWords: function(number) {
    if (number === null || isNaN(number) || number === '') return '';
    number = parseInt(number, 10);
    if (number === 0) return 'صفر';

    const taMarbuta = "ة";
    const L = "ل";
    const A = "ا";
    const wa = " و";

    const ones = ["", "واحد", "اثنان", "ثلاثة", "أربعة", "خمسة", "ستة", "سبعة", "ثمانية", "تسعة"];
    const onesFeminine = ["", "إحدى", "اثنتان", "ثلاث", "أربع", "خمس", "ست", "سبع", "ثمان", "تسع"];
    const tens = ["", "عشرة", "عشرون", "ثلاثون", "أربعون", "خمسون", "ستون", "سبعون", "ثمانون", "تسعون"];
    const hundreds = ["", "مئة", "مئتان", "ثلاثمائة", "أربعمائة", "خمسمائة", "ستمائة", "سبعمائة", "ثمانمائة", "تسعمائة"];

    const getHundreds = (num) => hundreds[Math.floor(num / 100)];
    const getTens = (num) => tens[Math.floor((num % 100) / 10)];
    const getOnes = (num) => ones[num % 10];
    const getFeminineOnes = (num) => onesFeminine[num % 10];

    function convertChunk(num, isFeminine = false) {
      if (num === 0) return '';
      let parts = [];
      const h = Math.floor(num / 100);
      const t = Math.floor((num % 100) / 10);
      const o = num % 10;
      
      if (h > 0) parts.push(hundreds[h]);
      
      if (t === 1 && o > 0) { // 11-19
          if (o === 1) parts.push(isFeminine ? "إحدى عشرة" : "أحد عشر");
          else if (o === 2) parts.push(isFeminine ? "اثنتا عشرة" : "اثنا عشر");
          else parts.push((isFeminine ? onesFeminine[o] : ones[o]) + " " + tens[1]);
      } else { // Other numbers
          if (o > 0) parts.push(isFeminine ? onesFeminine[o] : ones[o]);
          if (t > 0) parts.push(tens[t]);
      }
      return parts.join(wa);
    }
    
    function convert(number) {
        if (number == 0) return 'صفر';
        let str = '';
        const billions = Math.floor(number / 1000000000);
        const millions = Math.floor((number % 1000000000) / 1000000);
        const thousands = Math.floor((number % 1000000) / 1000);
        const remainder = number % 1000;

        const addPart = (part) => {
            if (str !== '' && part !== '') str += wa;
            str += part;
        };

        if (billions > 0) {
            if (billions === 1) addPart('مليار');
            else if (billions === 2) addPart('ملياران');
            else if (billions >= 3 && billions <= 10) addPart(convertChunk(billions, true) + ' مليارات');
            else addPart(convertChunk(billions) + ' مليارًا');
        }
        if (millions > 0) {
            if (millions === 1) addPart('مليون');
            else if (millions === 2) addPart('مليونان');
            else if (millions >= 3 && millions <= 10) addPart(convertChunk(millions, true) + ' ملايين');
            else addPart(convertChunk(millions) + ' مليونًا');
        }
        if (thousands > 0) {
            if (thousands === 1) addPart('ألف');
            else if (thousands === 2) addPart('ألفان');
            else if (thousands >= 3 && thousands <= 10) addPart(convertChunk(thousands, true) + ' آلاف');
            else addPart(convertChunk(thousands) + ' ألفًا');
        }
        if (remainder > 0) {
            addPart(convertChunk(remainder));
        }

        return str;
    }
    
    return `فقط ${convert(number)} جنيه مصري لا غير`;
  }
};

const DISCLAIMER = `---
إخلاء مسؤولية: هذا المستند هو نموذج استرشادي يهدف للمساعدة، وقد لا يكون شاملاً لجميع الحالات القانونية. لا يتحمل التطبيق أي مسؤولية عن استخدام هذا النموذج. يوصى بشدة باستشارة محامٍ متخصص لضمان حماية حقوقك بشكل كامل ومطابقة العقد للقوانين السارية.`;


// --- TEMPLATES DATA ---
const templates = {
  marriageContract: {
    name: 'عقد زواج (صيغة مبسطة)',
    description: 'نموذج استرشادي لتوثيق عقد قران شرعي بين طرفين.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
    fields: [
      { id: 'marriageDate', label: 'تاريخ عقد القران', type: 'date', required: true },
      { id: 'husbandName', label: 'اسم الزوج', type: 'text', required: true },
      { id: 'husbandId', label: 'الرقم القومي للزوج', type: 'text', required: true },
      { id: 'wifeName', label: 'اسم الزوجة', type: 'text', required: true },
      { id: 'wifeId', label: 'الرقم القومي للزوجة', type: 'text', required: true },
      { id: 'maritalHomeAddress', label: 'عنوان سكن الزوجية', type: 'text', required: true },
      { id: 'dowry', label: 'المهر المتفق عليه (صداق)', type: 'text', required: true },
      { id: 'witness1Name', label: 'اسم الشاهد الأول', type: 'text', required: true },
      { id: 'witness2Name', label: 'اسم الشاهد الثاني', type: 'text', required: true },
    ],
    generate: (data) => `
بسم الله الرحمن الرحيم
"وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً" (الروم: 21)

عقد زواج شرعي

إنه في يوم .......... الموافق ${data.marriageDate || '    /  /    '}، وبعون الله وتوفيقه، تم عقد قران كل من:

الطرف الأول (الزوج): السيد/ ${data.husbandName || '................................................'}
ويحمل بطاقة رقم قومي ${data.husbandId || '..............................'}

الطرف الثاني (الزوجة): السيدة/ ${data.wifeName || '................................................'}
وتحمل بطاقة رقم قومي ${data.wifeId || '..............................'}

وقد تم هذا الزواج على أن يكون سكن الزوجية في العنوان التالي:
${data.maritalHomeAddress || '......................................................................'}

وعلى كتاب الله وسنة رسوله صلى الله عليه وسلم، وعلى الصداق المسمى بينهما وهو:
${data.dowry || '......................................................................'}

وذلك بحضور الشاهدين:
1. السيد/ ${data.witness1Name || '................................................'}
2. السيد/ ${data.witness2Name || '................................................'}

وقد تم الإيجاب والقبول بين الطرفين، والله خير الشاهدين.

توقيع الزوج: ..........................         توقيع الزوجة: ..........................
توقيع الشاهد الأول: .....................    توقيع الشاهد الثاني: .....................

${DISCLAIMER.replace("العقد", "المستند").replace("محامٍ متخصص", "مأذون شرعي أو محامٍ متخصص")}
    `,
  },
  divorceAgreement: {
    name: 'عقد طلاق (اتفاقي)',
    description: 'نموذج استرشادي لتوثيق اتفاق بالتراضي على إنهاء العلاقة الزوجية.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
    fields: [
      { id: 'divorceDate', label: 'تاريخ تحرير الاتفاق', type: 'date', required: true },
      { id: 'husbandName', label: 'اسم الزوج (المطلق)', type: 'text', required: true },
      { id: 'wifeName', label: 'اسم الزوجة (المطلقة)', type: 'text', required: true },
      { id: 'marriageDate', label: 'تاريخ عقد الزواج', type: 'date', required: true },
      { id: 'agreementTerms', label: 'بنود الاتفاق (النفقة، المؤخر، الحضانة...إلخ)', type: 'textarea', required: true, rows: 4 },
    ],
    generate: (data) => `
بسم الله الرحمن الرحيم
"فَإِمْسَاكٌ بِمَعْرُوفٍ أَوْ تَسْرِيحٌ بِإِحْسَانٍ" (البقرة: 229)

اتفاق طلاق بالتراضي

إنه في يوم .......... الموافق ${data.divorceDate || '    /  /    '}، اتفق كل من:

الطرف الأول: السيد/ ${data.husbandName || '................................................'} (مُطلِّق)
الطرف الثاني: السيدة/ ${data.wifeName || '................................................'} (مُطلَّقة)

وكان الطرفان قد تزوجا بموجب عقد زواج رسمي بتاريخ ${data.marriageDate || '    /  /    '}. ونظرًا لاستحالة استمرار الحياة الزوجية بينهما، فقد اتفقا وهما بكامل أهليتهما الشرعية والقانونية على إنهاء العلاقة الزوجية بينهما بالتراضي، وذلك وفقًا للبنود التالية:

1. يقر الطرفان بإنهاء العلاقة الزوجية بينهما طلاقًا بائنًا بينونة صغرى.
2. اتفق الطرفان على تسوية كافة حقوق الزوجة المالية والشرعية على النحو التالي:
   ${data.agreementTerms || '................................................................................................................................'}
3. تقر الزوجة باستلامها كافة حقوقها المتفق عليها، وتبرئ ذمة زوجها من أي التزامات أخرى حالية أو مستقبلية.
4. يعتبر هذا الاتفاق نهائيًا وملزمًا للطرفين، ولا يحق لأي منهما الرجوع فيه أو المطالبة بأي حقوق أخرى خلاف ما ورد به.

وهذا اتفاق نهائي بين الطرفين، والله على ما نقول شهيد.

توقيع الطرف الأول: ..........................
توقيع الطرف الثاني: ..........................

---
إخلاء مسؤولية: هذا المستند هو نموذج استرشادي لاتفاق ودي ولا يغني عن إثبات الطلاق رسميًا لدى الجهات الحكومية المختصة لترتيب آثاره القانونية.
    `,
  },
  leaseContract: {
    name: 'عقد إيجار',
    description: 'عقد لتنظيم العلاقة بين المؤجر والمستأجر لوحدة سكنية أو تجارية.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,
    fields: [
      { id: 'leaseDate', label: 'تاريخ تحرير العقد', type: 'date', required: true },
      { id: 'lessorName', label: 'اسم المؤجر (المالك)', type: 'text', required: true },
      { id: 'lessorId', label: 'الرقم القومي للمؤجر', type: 'text', required: true },
      { id: 'lessorAddress', label: 'عنوان سكن المؤجر', type: 'text', required: true },
      { id: 'lesseeName', label: 'اسم المستأجر', type: 'text', required: true },
      { id: 'lesseeId', label: 'الرقم القومي للمستأجر', type: 'text', required: true },
      { id: 'lesseeAddress', label: 'عنوان سكن المستأجر', type: 'text', required: true },
      { id: 'propertyAddress', label: 'عنوان العين المؤجرة', type: 'text', required: true },
      { id: 'propertyPurpose', label: 'الغرض من الإيجار (سكني / تجاري)', type: 'text', required: true },
      { id: 'rentAmount', label: 'قيمة الإيجار الشهرية (بالأرقام)', type: 'number', required: true },
      { id: 'leaseStartDate', label: 'تاريخ بدء الإيجار', type: 'date', required: true },
      { id: 'leaseEndDate', label: 'تاريخ انتهاء الإيجار', type: 'date', required: true },
      { id: 'additionalClauses', label: 'بنود إضافية (اختياري)', type: 'textarea', rows: 4 },
    ],
    generate: (data) => `
بسم الله الرحمن الرحيم
عقد إيجار

إنه في يوم .......... الموافق ${data.leaseDate || '    /  /    '} تم تحرير هذا العقد بين كل من:

الطرف الأول (المؤجر): السيد/ ${data.lessorName || '................................................'}
ويحمل بطاقة رقم قومي ${data.lessorId || '..............................'}، ومقيم في ${data.lessorAddress || '......................................................................'}

الطرف الثاني (المستأجر): السيد/ ${data.lesseeName || '................................................'}
ويحمل بطاقة رقم قومي ${data.lesseeId || '..............................'}، ومقيم في ${data.lesseeAddress || '......................................................................'}

بعد أن أقر الطرفان بأهليتهما الكاملة للتعاقد والتصرف قانوناً، اتفقا على ما يلي:

(تمهيد)
يمتلك الطرف الأول العقار الكائن في ${data.propertyAddress || '......................................................................'}، وحيث رغب الطرف الثاني في استئجاره، فقد اتفق الطرفان على البنود التالية.

(البند الأول) التمهيد السابق جزء لا يتجزأ من هذا العقد ومكملاً له.
(البند الثاني) أجر الطرف الأول للطرف الثاني ما هو العين المؤجرة المذكورة أعلاه، بغرض استعمالها ${data.propertyPurpose || '..........'}.
(البند الثالث) مدة هذا العقد تبدأ من ${data.leaseStartDate || '    /  /    '} وتنتهي في ${data.leaseEndDate || '    /  /    '}، وهي مدة غير قابلة للتجديد إلا بعقد جديد وباتفاق صريح بين الطرفين.
(البند الرابع) القيمة الإيجارية الشهرية المتفق عليها هي مبلغ ${data.rentAmount || '0'} جنيه مصري (${numberConverter.numberToArabicWords(data.rentAmount)}), يلتزم الطرف الثاني بسدادها مقدمًا في موعد أقصاه اليوم الخامس من كل شهر ميلادي.
(البند الخامس) يقر المستأجر بأنه عاين العين المؤجرة المعاينة التامة النافية للجهالة، وأنها بحالة جيدة وصالحة للغرض الذي أُجرت من أجله ويتعهد بالمحافظة عليها.
(البند السادس) يلتزم المستأجر بسداد قيمة فواتير استهلاك (المياه والكهرباء والغاز) طوال مدة الإيجار.
(البند السابع) لا يجوز للمستأجر تأجير العين من الباطن أو التنازل عن الإيجار للغير، ويعتبر العقد مفسوخاً من تلقاء نفسه حال مخالفة هذا الشرط.
${data.additionalClauses ? `(البند الثامن) بنود إضافية: \n${data.additionalClauses}\n` : ''}
(البند ${data.additionalClauses ? 'التاسع' : 'الثامن'}) يخضع هذا العقد لأحكام القانون المدني المصري، وفي حالة نشوب أي نزاع، تكون محاكم القاهرة هي المختصة.

تحرر هذا العقد من نسختين، بيد كل طرف نسخة للعمل بموجبها عند اللزوم.

الطرف الأول (المؤجر)                  الطرف الثاني (المستأجر)
الاسم: ${data.lessorName || '..............................'}                   الاسم: ${data.lesseeName || '..............................'}
التوقيع: ..........................          التوقيع: ..........................

${DISCLAIMER}
    `,
  },
  saleContract: {
    name: 'عقد بيع (عام)',
    description: 'وثيقة لنقل ملكية شيء معين (عقار، منقول..إلخ) من بائع لمشترٍ.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>`,
    fields: [
        { id: 'sellerName', label: 'اسم البائع', type: 'text', required: true },
        { id: 'buyerName', label: 'اسم المشتري', type: 'text', required: true },
        { id: 'itemDescription', label: 'وصف الشيء المبيع', type: 'textarea', required: true },
        { id: 'salePrice', label: 'ثمن البيع (بالأرقام)', type: 'number', required: true },
        { id: 'saleDate', label: 'تاريخ البيع', type: 'date', required: true },
        { id: 'additionalClauses', label: 'بنود إضافية (اختياري)', type: 'textarea', rows: 3 },
    ],
    generate: (data) => `
عقد بيع إبتدائي

إنه في يوم .......... الموافق ${data.saleDate || '    /  /    '}، تم الاتفاق بين كل من:

الطرف الأول (البائع): السيد/ ${data.sellerName || '................................................'}
الطرف الثاني (المشتري): السيد/ ${data.buyerName || '................................................'}

بعد أن أقر الطرفان بأهليتهما للتعاقد، اتفقا على ما يلي:
باع وأسقط وتنازل الطرف الأول بكافة الضمانات الفعلية والقانونية إلى الطرف الثاني القابل لذلك، ما هو:
${data.itemDescription || '................................................................................................................................'}

البند الأول: يقر المشتري بأنه عاين المبيع المعاينة التامة النافية للجهالة وقبله بحالته الراهنة.
البند الثاني: تم هذا البيع نظير ثمن إجمالي وقدره ${data.salePrice || '0'} جنيه (${numberConverter.numberToArabicWords(data.salePrice)}). يقر البائع باستلامه كامل المبلغ ويعتبر توقيعه على هذا العقد بمثابة مخالصة نهائية.
البند الثالث: يقر البائع بأن ملكية الشيء المبيع قد آلت إليه بطرق مشروعة، وأن المبيع خالٍ من كافة الحقوق العينية أيًا كان نوعها، كالرهن والاختصاص والامتياز وحقوق الانتفاع والارتفاق، ظاهرًا أو خفيًا.
${data.additionalClauses ? `البند الرابع: بنود إضافية: \n${data.additionalClauses}\n` : ''}
البند ${data.additionalClauses ? 'الخامس' : 'الرابع'}: بمجرد التوقيع على هذا العقد، يصبح المشتري هو المالك للمبيع وله حق التصرف فيه.

الطرف الأول (البائع)                  الطرف الثاني (المشتري)
الاسم: ${data.sellerName || '..............................'}                   الاسم: ${data.buyerName || '..............................'}
التوقيع: ..........................          التوقيع: ..........................

${DISCLAIMER}
    `
  },
  carSaleContract: {
    name: 'عقد بيع سيارة',
    description: 'وثيقة رسمية لنقل ملكية سيارة من بائع إلى مشترٍ مقابل مبلغ متفق عليه.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 16.5 17.5 13H22v-2h-4.5l-3.5 3.5"></path><path d="M8 5 5.5 9H2v6h3.5L8 19h2l3-4-3-4H8Z"></path><path d="m14 5 3 4-3 4h2l3.5-4L16 5h-2Z"></path></svg>`,
    fields: [
        { id: 'sellerName', label: 'اسم البائع', type: 'text', required: true },
        { id: 'sellerId', label: 'رقم قومي للبائع', type: 'text', required: true },
        { id: 'sellerAddress', label: 'عنوان سكن البائع', type: 'text', required: true },
        { id: 'buyerName', label: 'اسم المشتري', type: 'text', required: true },
        { id: 'buyerId', label: 'رقم قومي للمشتري', type: 'text', required: true },
        { id: 'buyerAddress', label: 'عنوان سكن المشتري', type: 'text', required: true },
        { id: 'carType', label: 'نوع السيارة', type: 'text', required: true },
        { id: 'carModel', label: 'موديل السيارة', type: 'text', required: true },
        { id: 'plateNumber', label: 'رقم اللوحة', type: 'text', required: true },
        { id: 'vin', label: 'رقم الشاسيه', type: 'text', required: true },
        { id: 'engineNumber', label: 'رقم الموتور', type: 'text', required: true },
        { id: 'salePrice', label: 'سعر البيع (بالأرقام)', type: 'number', required: true },
    ],
    generate: (data) => `
عقد بيع سيارة (إبتدائي)

إنه في يوم الموافق ${new Date().toLocaleDateString('ar-EG')}، تم الاتفاق بين كل من:

الطرف الأول (البائع): السيد/ ${data.sellerName || '................................................'}
رقم قومي: ${data.sellerId || '..............................'}، ومقيم في ${data.sellerAddress || '......................................................................'}

الطرف الثاني (المشتري): السيد/ ${data.buyerName || '................................................'}
رقم قومي: ${data.buyerId || '..............................'}، ومقيم في ${data.buyerAddress || '......................................................................'}

بعد أن أقر الطرفان بأهليتهما للتعاقد، اتفقا على ما يلي:
بموجب هذا العقد، باع وأسقط وتنازل الطرف الأول بكافة الضمانات الفعلية والقانونية إلى الطرف الثاني القابل لذلك، السيارة التالية بياناتها:
نوع السيارة: ${data.carType || '..............................'}
موديل: ${data.carModel || '..............................'}
رقم اللوحة: ${data.plateNumber || '..............................'}
رقم الشاسيه: ${data.vin || '................................................'}
رقم الموتور: ${data.engineNumber || '................................................'}

البند الأول: يقر المشتري بأنه عاين السيارة المعاينة التامة النافية للجهالة وقبلها بحالتها الراهنة.
البند الثاني: تم هذا البيع نظير مبلغ إجمالي وقدره ${data.salePrice || '0'} جنيه مصري (${numberConverter.numberToArabicWords(data.salePrice)}), وقد أقر الطرف الأول (البائع) باستلامه كامل المبلغ من يد الطرف الثاني (المشتري) ويعتبر توقيعه على هذا العقد بمثابة مخالصة نهائية.
البند الثالث: يقر البائع بأن السيارة خالية من أي ديون أو رهون أو حقوق للغير، وهو المسؤول عن أي مخالفات قبل تاريخ هذا العقد.
البند الرابع: أصبح المشتري هو المالك الوحيد للسيارة وله الحق في التصرف فيها ونقل ملكيتها.
البند الخامس: يلتزم المشتري بإنهاء كافة إجراءات نقل الملكية والتسجيل في إدارة المرور المختصة، وهو المسؤول عن كافة الرسوم والمخالفات المرورية من تاريخ استلام السيارة.

الطرف الأول (البائع)                  الطرف الثاني (المشتري)
الاسم: ${data.sellerName || '..............................'}                   الاسم: ${data.buyerName || '..............................'}
التوقيع: ..........................          التوقيع: ..........................

${DISCLAIMER}
    `
  },
  receiptAcknowledgement: {
    name: 'إقرار استلام نقدية',
    description: 'وثيقة يقر فيها شخص باستلامه لمبلغ مالي من شخص آخر.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
    fields: [
      { id: 'receiverName', label: 'اسم المستلم', type: 'text', required: true },
      { id: 'receiverId', label: 'الرقم القومي للمستلم', type: 'text', required: true },
      { id: 'giverName', label: 'اسم المسلِّم', type: 'text', required: true },
      { id: 'amountReceived', label: 'المبلغ المستلم (بالأرقام)', type: 'number', required: true },
      { id: 'reason', label: 'وذلك مقابل', type: 'text', required: true },
      { id: 'receiptDate', label: 'تاريخ الاستلام', type: 'date', required: true },
    ],
    generate: (data) => `
إقرار استلام نقدية

أقر أنا الموقع أدناه، السيد/ ${data.receiverName || '................................................'}, وأحمل بطاقة رقم قومي ${data.receiverId || '..............................'}, بأنني قد استلمت في يوم .......... الموافق ${data.receiptDate || '    /  /    '} من السيد/ ${data.giverName || '................................................'}، مبلغًا وقدره ${data.amountReceived || '0'} جنيهًا مصريًا (${numberConverter.numberToArabicWords(data.amountReceived)}).

وذلك مقابل: ${data.reason || '......................................................................'}.

وهذا إقرار مني باستلام المبلغ كاملاً ومخالصة نهائية، ويعتبر توقيقي على هذا الإقرار بمثابة إيصال استلام لا يجوز الرجوع فيه.

المقر بما فيه,
الاسم: ${data.receiverName || '..............................'}
التوقيع: ..........................
    `,
  },
  authorization: {
    name: 'تفويض',
    description: 'وثيقة يفوض فيها شخص شخصًا آخر للقيام بأعمال محددة نيابة عنه.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h3.39a2 2 0 0 0 1.95-1.52l.48-1.95a2 2 0 0 1 1.95-1.53h2.46a2 2 0 0 1 1.95 1.53l.48 1.95a2 2 0 0 0 1.95 1.52H21"></path><path d="M12 12a5 5 0 0 0-5-5H3.5a2.5 2.5 0 0 0 0 5H7a5 5 0 0 0 5-5Z"></path><path d="M12 12a5 5 0 0 1 5-5h3.5a2.5 2.5 0 0 1 0 5H17a5 5 0 0 1-5-5Z"></path></svg>`,
    fields: [
      { id: 'authorizerName', label: 'اسم المفوض', type: 'text', required: true },
      { id: 'authorizerId', label: 'الرقم القومي للمفوض', type: 'text', required: true },
      { id: 'authorizedName', label: 'اسم المفوض إليه', type: 'text', required: true },
      { id: 'authorizedId', label: 'الرقم القومي للمفوض إليه', type: 'text', required: true },
      { id: 'authorizationScope', label: 'موضوع التفويض', type: 'textarea', required: true },
      { id: 'authDate', label: 'تاريخ التفويض', type: 'date', required: true },
    ],
    generate: (data) => `
تفويض

أنا الموقع أدناه، ${data.authorizerName || '................................................'}، رقم قومي ${data.authorizerId || '..............................'}، أفوض بموجب هذا المستند السيد/ ${data.authorizedName || '................................................'}، رقم قومي ${data.authorizedId || '..............................'}، في القيام بالأعمال التالية نيابة عني:

${data.authorizationScope || '................................................................................................................................'}

وهذا تفويض مني بذلك، وله الحق في التوقيع نيابة عني في كل ما يتعلق بهذا التفويض ويعتبر توقيعه ملزماً لي.

تحريراً في: ${data.authDate || '    /  /    '}

المفوض,
الاسم: ${data.authorizerName || '..............................'}
التوقيع: ..........................
    `
  },
  resignation: {
    name: 'خطاب استقالة',
    description: 'خطاب رسمي يقدمه الموظف لشركته للتعبير عن رغبته في إنهاء علاقة العمل.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="17" x2="22" y1="8" y2="13"></line><line x1="22" x2="17" y1="8" y2="13"></line></svg>`,
    fields: [
      { id: 'employeeName', label: 'اسم الموظف', type: 'text', required: true },
      { id: 'position', label: 'المنصب الوظيفي', type: 'text', required: true },
      { id: 'companyName', label: 'اسم الشركة', type: 'text', required: true },
      { id: 'recipientName', label: 'مقدمة إلى السيد/ة', type: 'text', required: true },
      { id: 'lastDay', label: 'آخر يوم عمل', type: 'date', required: true },
      { id: 'resignationDate', label: 'تاريخ تقديم الاستقالة', type: 'date', required: true },
    ],
    generate: (data) => `
التاريخ: ${data.resignationDate || '    /  /    '}

السيد/ة ${data.recipientName || 'مدير الموارد البشرية المحترم'},
${data.companyName || '................................................'}

تحية طيبة وبعد،

الموضوع: استقالة من العمل

أتقدم إليكم بخطابي هذا لإبلاغكم بقرار استقالتي من منصب ${data.position || '..............................'}، وذلك اعتبارًا من تاريخه.
وعليه، سيكون آخر يوم عمل لي في الشركة هو يوم .......... الموافق ${data.lastDay || '    /  /    '}، مع التزامي الكامل بتسليم كافة العهد والمهام الموكلة إليّ خلال فترة الإشعار القانونية.

أود أن أعبر عن شكري وامتناني للفترة التي قضيتها في الشركة، وما قدمته لي من خبرات وفرص للتعلم.
أتمنى لكم وللشركة دوام التوفيق والنجاح.

مع خالص التقدير،
الاسم: ${data.employeeName || '..............................'}
التوقيع: ..........................
`
  },
  clearance: {
    name: 'شهادة إخلاء طرف',
    description: 'وثيقة تثبت براءة ذمة موظف سابق من أي عهد أو التزامات تجاه الشركة.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>`,
    fields: [
      { id: 'companyName', label: 'اسم الشركة', type: 'text', required: true },
      { id: 'employeeName', label: 'اسم الموظف', type: 'text', required: true },
      { id: 'employeeId', label: 'الرقم القومي للموظف', type: 'text', required: true },
      { id: 'lastDay', label: 'تاريخ آخر يوم عمل', type: 'date', required: true },
      { id: 'issueDate', label: 'تاريخ إصدار الشهادة', type: 'date', required: true },
    ],
    generate: (data) => `
شهادة إخلاء طرف

التاريخ: ${data.issueDate || '    /  /    '}

تشهد شركة ${data.companyName || '................................................'} بأن السيد/ ${data.employeeName || '................................................'}، والذي يحمل رقم قومي ${data.employeeId || '..............................'}، قد عمل لديها وانتهت علاقته بالشركة اعتباراً من تاريخ ${data.lastDay || '    /  /    '}.

وبناءً على مراجعة سجلاتنا، فإننا نقر بأن المذكور قد قام بتسليم كافة ما بعهده من أدوات ومستندات وملفات، وأن ذمته المالية وغير المالية خالية تماماً من أي التزامات تجاه الشركة حتى تاريخه.

وقد أُعطيت له هذه الشهادة بناءً على طلبه، دون أدنى مسؤولية على الشركة.

مع أطيب التمنيات بالتوفيق،،،

مدير الموارد البشرية
الاسم: ..........................
التوقيع: ..........................
    `,
  },
  employmentContract: {
    name: 'عقد عمل',
    description: 'عقد يحدد شروط وبنود علاقة العمل بين صاحب العمل والموظف.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
    fields: [
      { id: 'companyName', label: 'اسم الشركة (الطرف الأول)', type: 'text', required: true },
      { id: 'employeeName', label: 'اسم الموظف (الطرف الثاني)', type: 'text', required: true },
      { id: 'employeeId', label: 'الرقم القومي للموظف', type: 'text', required: true },
      { id: 'employeeNationality', label: 'جنسية الموظف', type: 'text', required: true },
      { id: 'jobTitle', label: 'المسمى الوظيفي', type: 'text', required: true },
      { id: 'startDate', label: 'تاريخ بدء العقد', type: 'date', required: true },
      { id: 'salaryAmount', label: 'الراتب الشهري (بالأرقام)', type: 'number', required: true },
      { id: 'contractDuration', label: 'مدة العقد', type: 'text', required: true },
      { id: 'additionalClauses', label: 'بنود إضافية (اختياري)', type: 'textarea', rows: 4 },
    ],
    generate: (data) => `
عقد عمل محدد المدة

إنه في يوم .......... الموافق ${new Date().toLocaleDateString('ar-EG')}، تم إبرام هذا العقد بين كل من:

الطرف الأول: شركة ${data.companyName || '................................................'}، ويمثلها في هذا العقد السيد/ ..........................
الطرف الثاني: السيد/ ${data.employeeName || '................................................'}، ${data.employeeNationality || '..........'} الجنسية، ويحمل بطاقة رقم قومي ${data.employeeId || '..............................'}.

تمهيد:
حيث يرغب الطرف الأول في تعيين الطرف الثاني لديه، وقد أبدى الطرف الثاني استعداده ورغبته في ذلك، فقد اتفق الطرفان على ما يلي:

1.  يعتبر التمهيد السابق جزءاً لا يتجزأ من هذا العقد.
2.  يعمل الطرف الثاني لدى الطرف الأول بوظيفة "${data.jobTitle || '..............................'}".
3.  مدة هذا العقد هي ${data.contractDuration || '..........'}، تبدأ من تاريخ ${data.startDate || '    /  /    '}، ويخضع الموظف لفترة اختبار مدتها ثلاثة أشهر.
4.  يتقاضى الطرف الثاني راتبًا شهريًا إجماليًا قدره ${data.salaryAmount || '0'} جنيه (${numberConverter.numberToArabicWords(data.salaryAmount)}).
5.  يلتزم الطرف الثاني بأداء العمل المنوط به بدقة وأمانة، والمحافظة على أسرار العمل وعدم إفشائها.
${data.additionalClauses ? `6. بنود إضافية: \n${data.additionalClauses}\n` : ''}
7.  في حالة رغبة أحد الطرفين في إنهاء العقد، يجب عليه إخطار الطرف الآخر كتابيًا قبل شهر على الأقل.
8.  يخضع هذا العقد لأحكام قانون العمل المصري رقم 12 لسنة 2003.

وقد تحرر هذا العقد من نسختين، بيد كل طرف نسخة للعمل بموجبها.

الطرف الأول (الشركة)                  الطرف الثاني (الموظف)
التوقيع: ..........................          التوقيع: ..........................

${DISCLAIMER}
    `,
  },
  waiver: {
    name: 'إقرار تنازل',
    description: 'وثيقة يقر فيها شخص بالتنازل عن حق معين لشخص آخر دون مقابل.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`,
    fields: [
      { id: 'waivingPartyName', label: 'اسم المتنازل', type: 'text', required: true },
      { id: 'waivingPartyId', label: 'الرقم القومي للمتنازل', type: 'text', required: true },
      { id: 'beneficiaryName', label: 'اسم المتنازل له', type: 'text', required: true },
      { id: 'subjectOfWaiver', label: 'موضوع التنازل (مثال: دين، حصة في شركة، الخ)', type: 'textarea', required: true },
      { id: 'waiverDate', label: 'تاريخ التنازل', type: 'date', required: true },
    ],
    generate: (data) => `
إقرار بالتنازل

أقر أنا الموقع أدناه، ${data.waivingPartyName || '................................................'}، رقم قومي ${data.waivingPartyId || '..............................'}، وبكامل إرادتي الحرة، بأنني قد تنازلت تنازلاً نهائيًا لا رجعة فيه عن:

${data.subjectOfWaiver || '................................................................................................................................'}

وذلك لصالح السيد/ ${data.beneficiaryName || '................................................'}.

ويعتبر هذا التنازل نافذًا ومنتجًا لكافة آثاره القانونية من تاريخه، ولا يحق لي أو لورثتي من بعدي الرجوع فيه مستقبلًا لأي سبب من الأسباب.

وهذا إقرار مني بذلك، وأنا بكامل قواي العقلية.

تحريراً في: ${data.waiverDate || '    /  /    '}

المقر بما فيه (المتنازل),
الاسم: ${data.waivingPartyName || '..............................'}
التوقيع: ..........................
    `
  },
  partnershipAgreement: {
    name: 'عقد شراكة',
    description: 'اتفاق بين طرفين أو أكثر لتأسيس شركة وتحديد حصص كل شريك والتزاماته.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    fields: [
      { id: 'partner1Name', label: 'اسم الشريك الأول', type: 'text', required: true },
      { id: 'partner2Name', label: 'اسم الشريك الثاني', type: 'text', required: true },
      { id: 'companyName', label: 'اسم الشركة / المشروع', type: 'text', required: true },
      { id: 'companyPurpose', label: 'غرض الشركة', type: 'textarea', required: true },
      { id: 'totalCapital', label: 'رأس مال الشركة (بالأرقام)', type: 'number', required: true },
      { id: 'partner1Share', label: 'حصة الشريك الأول (%)', type: 'number', required: true },
      { id: 'partner2Share', label: 'حصة الشريك الثاني (%)', type: 'number', required: true },
       { id: 'additionalClauses', label: 'بنود إضافية (اختياري)', type: 'textarea', rows: 4 },
    ],
    generate: (data) => `
عقد تأسيس شركة تضامن

إنه في يوم .......... الموافق ${new Date().toLocaleDateString('ar-EG')}، تم الاتفاق بين كل من:
1. السيد/ ${data.partner1Name || '................................................'} (شريك أول)
2. السيد/ ${data.partner2Name || '................................................'} (شريك ثاني)

على تأسيس شركة تضامن وفقًا للشروط التالية:
المادة الأولى: اسم الشركة هو "${data.companyName || '..............................'}" وغرضها هو ${data.companyPurpose || '..............................'}.
المادة الثانية: رأس مال الشركة هو مبلغ ${data.totalCapital || '0'} جنيه مصري (${numberConverter.numberToArabicWords(data.totalCapital)}), موزع بين الشركاء كالتالي:
- الشريك الأول: حصة بنسبة ${data.partner1Share || '0'}%
- الشريك الثاني: حصة بنسبة ${data.partner2Share || '0'}%
المادة الثالثة: يتولى إدارة الشركة الشريكان مجتمعين أو منفردين، ولهما الحق في التوقيع على كافة العقود والمعاملات باسم الشركة.
المادة الرابعة: يتم توزيع الأرباح والخسائر بنسبة حصة كل شريك في رأس المال.
المادة الخامسة: مدة الشركة تبدأ من تاريخ التوقيع على هذا العقد وهي غير محددة المدة.
${data.additionalClauses ? `المادة السادسة: بنود إضافية: \n${data.additionalClauses}\n` : ''}

وهذا اتفاق بين الشركاء، والله خير الشاهدين.

الشريك الأول                  الشريك الثاني
الاسم: ${data.partner1Name || '..............................'}                  الاسم: ${data.partner2Name || '..............................'}
التوقيع: ..........................         التوقيع: ..........................

${DISCLAIMER}
    `
  },
  loanAgreement: {
    name: 'عقد قرض',
    description: 'اتفاق يلتزم بموجبه المقرض بأن ينقل إلى المقترض مبلغًا من المال على أن يرده.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
    fields: [
      { id: 'lenderName', label: 'اسم المُقرض (الدائن)', type: 'text', required: true },
      { id: 'borrowerName', label: 'اسم المُقترض (المدين)', type: 'text', required: true },
      { id: 'borrowerId', label: 'الرقم القومي للمقترض', type: 'text', required: true },
      { id: 'loanAmount', label: 'مبلغ القرض (بالأرقام)', type: 'number', required: true },
      { id: 'repaymentDate', label: 'تاريخ استحقاق السداد', type: 'date', required: true },
    ],
    generate: (data) => `
عقد قرض حسن

إنه في يوم .......... الموافق ${new Date().toLocaleDateString('ar-EG')}، بين كل من:
الطرف الأول (المُقرض): السيد/ ${data.lenderName || '................................................'}
الطرف الثاني (المُقترض): السيد/ ${data.borrowerName || '................................................'}، رقم قومي ${data.borrowerId || '..............................'}

أقر الطرف الثاني بأنه قد اقترض من الطرف الأول مبلغًا وقدره ${data.loanAmount || '0'} جنيهًا (${numberConverter.numberToArabicWords(data.loanAmount)}), وذلك على سبيل القرض الحسن بدون فوائد.
ويتعهد الطرف الثاني بسداد كامل المبلغ في موعد أقصاه ${data.repaymentDate || '    /  /    '}.
وهذا العقد يعتبر سندًا للدين في يد الطرف الأول.

المُقرض                  المُقترض
الاسم: ${data.lenderName || '..............................'}                  الاسم: ${data.borrowerName || '..............................'}
التوقيع: ..........................         التوقيع: ..........................
    `
  },
  agencyAgreement: {
    name: 'عقد وكالة (توكيل)',
    description: 'عقد يقيم به شخص (الموكل) شخصًا آخر (الوكيل) مقام نفسه في تصرف جائز معلوم.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m4.93 19.07 1.41-1.41"/><path d="m17.66 6.34 1.41-1.41"/></svg>`,
    fields: [
      { id: 'principalName', label: 'اسم الموكل', type: 'text', required: true },
      { id: 'principalId', label: 'الرقم القومي للموكل', type: 'text', required: true },
      { id: 'agentName', label: 'اسم الوكيل', type: 'text', required: true },
      { id: 'agentId', label: 'الرقم القومي للوكيل', type: 'text', required: true },
      { id: 'agencyScope', label: 'موضوع الوكالة', type: 'textarea', required: true },
    ],
    generate: (data) => `
توكيل خاص

أقر أنا الموقع أدناه، ${data.principalName || '................................................'}، رقم قومي ${data.principalId || '..............................'}، بأنني قد وكلت السيد/ ${data.agentName || '................................................'}، رقم قومي ${data.agentId || '..............................'}، لينوب عني في:

${data.agencyScope || '................................................................................................................................'}

وللوكيل الحق في التوقيع نيابة عني على كافة الأوراق والمستندات المتعلقة بهذا الموضوع، والتعامل مع كافة الجهات الحكومية وغير الحكومية.
وهذا توكيل مني بذلك.

تحريراً في: ${new Date().toLocaleDateString('ar-EG')}

الموكل,
الاسم: ${data.principalName || '..............................'}
التوقيع: ..........................
    `
  },
  serviceAgreement: {
    name: 'عقد تقديم خدمات',
    description: 'اتفاق بين مقدم خدمة وعميل يحدد نطاق الخدمة، المدة، والتكلفة.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,
    fields: [
      { id: 'clientName', label: 'اسم العميل (الطرف الأول)', type: 'text', required: true },
      { id: 'providerName', label: 'اسم مقدم الخدمة (الطرف الثاني)', type: 'text', required: true },
      { id: 'serviceDescription', label: 'وصف الخدمات المقدمة', type: 'textarea', required: true },
      { id: 'totalFee', label: 'الأتعاب الإجمالية (بالأرقام)', type: 'number', required: true },
    ],
    generate: (data) => `
عقد اتفاق على تقديم خدمات

اتفق كل من:
الطرف الأول: السيد/ ${data.clientName || '................................................'}
الطرف الثاني: السيد/ ${data.providerName || '................................................'}

على ما يلي:
1.  يقوم الطرف الثاني بتقديم الخدمات التالية للطرف الأول:
    ${data.serviceDescription || '................................................................................................................................'}
2.  تم تحديد الأتعاب الإجمالية لهذه الخدمات بمبلغ ${data.totalFee || '0'} جنيه (${numberConverter.numberToArabicWords(data.totalFee)}).
3.  يلتزم الطرف الثاني بتقديم الخدمات بالدقة والجودة المطلوبة في الوقت المتفق عليه.
4.  يلتزم الطرف الأول بسداد الأتعاب المتفق عليها عند إنجاز العمل.

الطرف الأول                  الطرف الثاني
الاسم: ${data.clientName || '..............................'}                   الاسم: ${data.providerName || '..............................'}
التوقيع: ..........................          التوقيع: ..........................

${DISCLAIMER}
    `
  },
  pledgeAgreement: {
    name: 'عقد رهن',
    description: 'عقد يخصص بمقتضاه شيء منقول أو عقار لضمان الوفاء بدين معين.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 1-10 5 10 5 10-5Z"/><path d="m2 16 10 5 10-5"/><path d="m2 11 10 5 10-5"/></svg>`,
    fields: [
      { id: 'pledgorName', label: 'اسم الراهن (المدين)', type: 'text', required: true },
      { id: 'pledgeeName', label: 'اسم المرتهن (الدائن)', type: 'text', required: true },
      { id: 'pledgedItem', label: 'وصف الشيء المرهون', type: 'textarea', required: true },
      { id: 'debtAmount', label: 'قيمة الدين المضمون (بالأرقام)', type: 'number', required: true },
    ],
    generate: (data) => `
عقد رهن حيازي

إنه في يوم .......... الموافق ${new Date().toLocaleDateString('ar-EG')}، بين كل من:
الطرف الأول (الراهن): السيد/ ${data.pledgorName || '................................................'}
الطرف الثاني (المرتهن): السيد/ ${data.pledgeeName || '................................................'}

أقر الطرف الأول بأنه مدين للطرف الثاني بمبلغ وقدره ${data.debtAmount || '0'} جنيه (${numberConverter.numberToArabicWords(data.debtAmount)}).
وضمانًا لسداد هذا الدين، قام الطرف الأول برهن وتسليم الشيء التالي للطرف الثاني:
${data.pledgedItem || '................................................................................................................................'}

ويحق للطرف الثاني حبس الشيء المرهون حتى استيفاء كامل دينه. وفي حال عدم السداد في الموعد المحدد، يحق للمرتهن اتخاذ الإجراءات القانونية للتنفيذ على الشيء المرهون.

الراهن                  المرتهن
الاسم: ${data.pledgorName || '..............................'}                   الاسم: ${data.pledgeeName || '..............................'}
التوقيع: ..........................          التوقيع: ..........................

${DISCLAIMER}
    `
  },
};

// --- APP LOGIC ---
document.addEventListener('DOMContentLoaded', () => {

    const App = {
        // --- STATE ---
        state: {
            currentView: 'landing', // landing, myDocuments, editor
            documents: [],
            activeDocumentId: null, // id of the document being edited
            theme: 'light',
        },

        // --- DOM ELEMENTS ---
        elements: {
            html: document.documentElement,
            brandLogo: document.getElementById('brand-logo'),
            landingSection: document.getElementById('landing-section'),
            myDocumentsSection: document.getElementById('my-documents-section'),
            appSection: document.getElementById('app-section'),
            templatesContainer: document.getElementById('templates-container'),
            savedDocumentsContainer: document.getElementById('saved-documents-container'),
            searchInput: document.getElementById('search-input'),
            noResultsMessage: document.getElementById('no-results-message'),
            noSavedDocumentsMessage: document.getElementById('no-saved-documents-message'),
            backButton: document.getElementById('back-button'),
            backToHomeBtn: document.getElementById('back-to-home-btn'),
            templateTitle: document.getElementById('template-title'),
            dynamicForm: document.getElementById('dynamic-form'),
            documentViewer: document.getElementById('document-viewer'),
            documentNameInput: document.getElementById('document-name-input'),
            copyrightYearSpan: document.getElementById('copyright-year'),
            themeToggle: document.getElementById('theme-toggle'),
            themeIconLight: document.getElementById('theme-icon-light'),
            themeIconDark: document.getElementById('theme-icon-dark'),
            myDocumentsBtn: document.getElementById('my-documents-btn'),
            actionButtons: { // Will be populated dynamically
                desktop: document.getElementById('action-buttons-desktop'),
                mobile: document.getElementById('action-buttons-mobile'),
                template: document.getElementById('action-buttons-template'),
            },
        },

        // --- INITIALIZATION ---
        init() {
            this.elements.copyrightYearSpan.textContent = new Date().getFullYear();
            this.loadStateFromLocalStorage();
            this.applyTheme();
            this.render();
            this.attachEventListeners();
        },

        // --- STATE MANAGEMENT ---
        loadStateFromLocalStorage() {
            const savedDocs = localStorage.getItem('savedDocuments');
            this.state.documents = savedDocs ? JSON.parse(savedDocs) : [];
            this.state.theme = localStorage.getItem('theme') || 'light';
        },
        
        saveStateToLocalStorage() {
            localStorage.setItem('savedDocuments', JSON.stringify(this.state.documents));
            localStorage.setItem('theme', this.state.theme);
        },
        
        navigateTo(view) {
            this.state.currentView = view;
            this.render();
        },

        // --- RENDER FUNCTIONS ---
        render() {
            // Hide all sections
            this.elements.landingSection.classList.remove('active');
            this.elements.myDocumentsSection.classList.remove('active');
            this.elements.appSection.classList.remove('active');

            // Show the current view
            switch(this.state.currentView) {
                case 'landing':
                    this.elements.landingSection.classList.add('active');
                    this.renderTemplateGrid();
                    break;
                case 'myDocuments':
                    this.elements.myDocumentsSection.classList.add('active');
                    this.renderSavedDocuments();
                    break;
                case 'editor':
                    this.elements.appSection.classList.add('active');
                    this.renderEditor();
                    break;
            }
            window.scrollTo(0, 0);
        },

        renderTemplateGrid(filter = '') {
            const container = this.elements.templatesContainer;
            container.innerHTML = '';
            const lowerCaseFilter = filter.toLowerCase();
            let matchFound = false;
            
            const sortedTemplates = Object.entries(templates).sort(([, a], [, b]) => a.name.localeCompare(b.name, 'ar'));

            sortedTemplates.forEach(([key, template]) => {
                if (template.name.toLowerCase().includes(lowerCaseFilter) || template.description.toLowerCase().includes(lowerCaseFilter)) {
                    matchFound = true;
                    container.insertAdjacentHTML('beforeend', `
                        <div class="col">
                            <div class="card h-100 template-card" data-template-key="${key}">
                                <div class="card-body d-flex align-items-center">
                                    <div class="card-icon">${template.icon}</div>
                                    <div>
                                        <h5 class="card-title mb-1">${template.name}</h5>
                                        <p class="card-text mb-0">${template.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);
                }
            });
            this.elements.noResultsMessage.classList.toggle('d-none', matchFound);
        },
        
        renderSavedDocuments() {
            const container = this.elements.savedDocumentsContainer;
            container.innerHTML = '';

            if (this.state.documents.length === 0) {
                this.elements.noSavedDocumentsMessage.classList.remove('d-none');
                return;
            }
            this.elements.noSavedDocumentsMessage.classList.add('d-none');

            this.state.documents.forEach(doc => {
                 const template = templates[doc.templateKey];
                 if (!template) return;
                 
                 container.insertAdjacentHTML('beforeend', `
                    <div class="col">
                        <div class="card saved-document-card">
                            <div class="card-body">
                                <div class="d-flex align-items-start">
                                    <div class="card-icon">${template.icon}</div>
                                    <div class="flex-grow-1">
                                        <h5 class="card-title mb-1">${doc.name || template.name}</h5>
                                        <p class="card-text mb-2 text-muted small">آخر تعديل: ${new Date(doc.lastModified).toLocaleString('ar-EG')}</p>
                                    </div>
                                </div>
                                <div class="d-flex gap-2 mt-3">
                                    <button class="btn btn-sm btn-primary flex-grow-1 edit-doc-btn" data-doc-id="${doc.id}">تعديل</button>
                                    <button class="btn btn-sm btn-outline-danger delete-doc-btn" data-doc-id="${doc.id}">حذف</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
            });
        },

        renderEditor() {
            const doc = this.state.documents.find(d => d.id === this.state.activeDocumentId);
            if (!doc) {
                console.error("Document not found for editing");
                this.navigateTo('landing');
                return;
            }
            const template = templates[doc.templateKey];
            if (!template) {
                console.error("Template not found for document");
                this.navigateTo('landing');
                return;
            }
            
            this.elements.templateTitle.textContent = template.name;
            this.elements.documentNameInput.value = doc.name || '';
            this.createFormForTemplate(template, doc.formData);
            this.populateActionButtons();
            this.updatePreview();
        },
        
        createFormForTemplate(template, formData = {}) {
            const form = this.elements.dynamicForm;
            form.innerHTML = '';
            template.fields.forEach(field => {
                const formGroup = document.createElement('div');
                formGroup.className = 'mb-3';
                
                let inputHtml;
                if (field.type === 'textarea') {
                    inputHtml = `<textarea class="form-control" id="${field.id}" rows="${field.rows || 3}" ${field.required ? 'required' : ''}>${formData[field.id] || ''}</textarea>`;
                } else {
                    inputHtml = `<input type="${field.type}" class="form-control" id="${field.id}" value="${formData[field.id] || ''}" ${field.required ? 'required' : ''}>`;
                }

                formGroup.innerHTML = `
                    <label for="${field.id}" class="form-label">${field.label}</label>
                    ${inputHtml}
                    ${field.id.toLowerCase().includes('id') ? `<div class="invalid-feedback">يجب أن يتكون الرقم القومي من 14 رقمًا ويبدأ بـ 2 أو 3.</div>` : ''}
                `;
                form.appendChild(formGroup);
            });
        },

        populateActionButtons() {
            const templateContent = this.elements.actionButtons.template.innerHTML;
            this.elements.actionButtons.desktop.innerHTML = templateContent;
            this.elements.actionButtons.mobile.innerHTML = templateContent;
        },

        // --- ACTIONS & LOGIC ---
        updatePreview() {
            const doc = this.state.documents.find(d => d.id === this.state.activeDocumentId);
            if (!doc) return;
            const template = templates[doc.templateKey];
            const formData = this.getFormData();
            
            let isFormValid = true;
            template.fields.forEach(field => {
                 const input = this.elements.dynamicForm.querySelector(`#${field.id}`);
                 input.classList.remove('is-invalid');
                 if (field.required && !formData[field.id]) {
                     isFormValid = false;
                 }
                 if (field.id.toLowerCase().includes('id') && formData[field.id] && !/^[23]\d{13}$/.test(formData[field.id])) {
                     isFormValid = false;
                     input.classList.add('is-invalid');
                 }
            });

            this.elements.documentViewer.textContent = template.generate(formData);
            
            // Update buttons state in both mobile and desktop containers
            ['desktop', 'mobile'].forEach(view => {
                const container = this.elements.actionButtons[view];
                if(container) {
                    const saveBtn = container.querySelector('#save-button');
                    const copyBtn = container.querySelector('#copy-button');
                    const downloadBtn = container.querySelector('#download-button');
                    if(saveBtn) saveBtn.disabled = !isFormValid;
                    if(copyBtn) copyBtn.disabled = !isFormValid;
                    if(downloadBtn) downloadBtn.disabled = !isFormValid;
                }
            });
        },

        getFormData() {
            const formData = {};
            this.elements.dynamicForm.querySelectorAll('input, textarea').forEach(input => {
                formData[input.id] = input.value.trim();
            });
            return formData;
        },

        saveCurrentDocument() {
            const docIndex = this.state.documents.findIndex(d => d.id === this.state.activeDocumentId);
            if (docIndex === -1) return;

            const doc = this.state.documents[docIndex];
            doc.formData = this.getFormData();
            doc.lastModified = new Date().toISOString();
            doc.name = this.elements.documentNameInput.value.trim() || templates[doc.templateKey].name;

            this.saveStateToLocalStorage();
            
            // Visual feedback on both sets of buttons
            ['desktop', 'mobile'].forEach(view => {
                const saveButton = this.elements.actionButtons[view].querySelector('#save-button');
                if (saveButton) {
                    const originalContent = saveButton.innerHTML;
                    saveButton.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg>
                        تم الحفظ
                    `;
                    setTimeout(() => saveButton.innerHTML = originalContent, 2000);
                }
            });
        },

        deleteDocument(docId) {
            if (confirm("هل أنت متأكد من حذف هذا المستند؟ لا يمكن التراجع عن هذا الإجراء.")) {
                this.state.documents = this.state.documents.filter(doc => doc.id !== docId);
                this.saveStateToLocalStorage();
                this.renderSavedDocuments();
            }
        },

        startNewDocument(templateKey) {
            const newDoc = {
                id: `doc_${Date.now()}`,
                templateKey: templateKey,
                formData: {},
                name: '',
                lastModified: new Date().toISOString(),
            };
            this.state.documents.push(newDoc);
            this.state.activeDocumentId = newDoc.id;
            this.saveStateToLocalStorage();
            this.navigateTo('editor');
        },
        
        editDocument(docId) {
            this.state.activeDocumentId = docId;
            this.navigateTo('editor');
        },
        
        // --- THEME ---
        toggleTheme() {
            this.state.theme = this.state.theme === 'light' ? 'dark' : 'light';
            this.saveStateToLocalStorage();
            this.applyTheme();
        },
        applyTheme() {
            this.elements.html.setAttribute('data-theme', this.state.theme);
            if (this.state.theme === 'dark') {
                this.elements.themeIconLight.classList.add('d-none');
                this.elements.themeIconDark.classList.remove('d-none');
            } else {
                this.elements.themeIconLight.classList.remove('d-none');
                this.elements.themeIconDark.classList.add('d-none');
            }
        },

        // --- PDF & COPY ---
        async generatePdfFromElement(sourceElement, filename, button) {
             const originalContent = button.innerHTML;
             button.disabled = true;
             button.innerHTML = `<span class="spinner-border spinner-border-sm"></span> جارٍ التحميل...`;

             try {
                 const { jsPDF } = window.jspdf;
                 const canvas = await html2canvas(sourceElement, { scale: 2, useCORS: true, logging: false, backgroundColor: this.state.theme === 'dark' ? '#1e1e1e' : '#ffffff' });
                 const imgData = canvas.toDataURL('image/jpeg', 0.95);
                 const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
                 const pdfWidth = pdf.internal.pageSize.getWidth(), pdfHeight = pdf.internal.pageSize.getHeight();
                 const margin = 15;
                 const canvasAspectRatio = canvas.width / canvas.height;
                 let imgWidth = pdfWidth - (margin * 2), imgHeight = imgWidth / canvasAspectRatio;

                 if (imgHeight > pdfHeight - (margin * 2)) {
                     imgHeight = pdfHeight - (margin * 2);
                     imgWidth = imgHeight * canvasAspectRatio;
                 }
                 const x = (pdfWidth - imgWidth) / 2;
                 pdf.addImage(imgData, 'JPEG', x, margin, imgWidth, imgHeight);
                 pdf.save(`${filename}.pdf`);
             } catch (err) {
                 console.error("PDF generation failed:", err);
             } finally {
                 button.disabled = false;
                 button.innerHTML = originalContent;
             }
        },
        
        handleDownloadPdf(button) {
            const doc = this.state.documents.find(d => d.id === this.state.activeDocumentId);
            if (!doc) return;
            const filename = doc.name || templates[doc.templateKey]?.name || 'document';
            this.generatePdfFromElement(this.elements.documentViewer, filename, button);
        },
        
        async handleDownloadBlankPdf(button) {
            const doc = this.state.documents.find(d => d.id === this.state.activeDocumentId);
            if (!doc) return;

            const template = templates[doc.templateKey];
            const blankContent = template.generate({});

            const tempViewer = document.createElement('pre');
            tempViewer.className = 'document-content';
            tempViewer.style.cssText = 'position:absolute; left:-9999px; width:800px; padding: 1.5rem; font-family: var(--font-family); background-color: var(--background-color); color: var(--text-color); border: 1px solid var(--border-color);';
            tempViewer.textContent = blankContent;
            document.body.appendChild(tempViewer);

            try {
                await this.generatePdfFromElement(tempViewer, `${template.name} (فارغ)`, button);
            } finally {
                document.body.removeChild(tempViewer);
            }
        },

        handleCopyText(button) {
            navigator.clipboard.writeText(this.elements.documentViewer.textContent).then(() => {
                const originalContent = button.innerHTML;
                button.innerHTML = `تم النسخ!`;
                setTimeout(() => button.innerHTML = originalContent, 2000);
            });
        },
        
        // --- EVENT LISTENERS ---
        attachEventListeners() {
            // Navigation
            this.elements.brandLogo.addEventListener('click', () => this.navigateTo('landing'));
            this.elements.myDocumentsBtn.addEventListener('click', () => this.navigateTo('myDocuments'));
            this.elements.backToHomeBtn.addEventListener('click', () => this.navigateTo('landing'));
            this.elements.backButton.addEventListener('click', () => {
                this.saveCurrentDocument();
                setTimeout(() => this.navigateTo('myDocuments'), 100);
            });

            // Search and template selection
            this.elements.searchInput.addEventListener('input', (e) => this.renderTemplateGrid(e.target.value));
            this.elements.templatesContainer.addEventListener('click', (e) => {
                const card = e.target.closest('.template-card');
                if (card && card.dataset.templateKey) {
                    this.startNewDocument(card.dataset.templateKey);
                }
            });

            // Saved documents actions
            this.elements.savedDocumentsContainer.addEventListener('click', (e) => {
                const editBtn = e.target.closest('.edit-doc-btn');
                const deleteBtn = e.target.closest('.delete-doc-btn');
                if (editBtn) this.editDocument(editBtn.dataset.docId);
                if (deleteBtn) this.deleteDocument(deleteBtn.dataset.docId);
            });
            
            // Editor
            this.elements.dynamicForm.addEventListener('input', () => this.updatePreview());
            this.elements.documentNameInput.addEventListener('input', () => this.updatePreview());

            // Delegated event listeners for action buttons
            document.body.addEventListener('click', (e) => {
                const saveBtn = e.target.closest('#save-button');
                const copyBtn = e.target.closest('#copy-button');
                const downloadBtn = e.target.closest('#download-button');
                const downloadBlankBtn = e.target.closest('#download-blank-button');

                if (this.state.currentView === 'editor') {
                    if (saveBtn) this.saveCurrentDocument();
                    if (copyBtn) this.handleCopyText(copyBtn);
                    if (downloadBtn) this.handleDownloadPdf(downloadBtn);
                    if (downloadBlankBtn) this.handleDownloadBlankPdf(downloadBlankBtn);
                }
            });

            // Theme
            this.elements.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    };
    
    App.init();
});
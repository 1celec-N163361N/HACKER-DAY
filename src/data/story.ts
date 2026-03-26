export type NodeType =
  | "story"
  | "terminal"
  | "message"
  | "alert"
  | "choice"
  | "ending";

export interface Choice {
  id: string;
  text: string;
  nextNodeId: string;
  danger?: boolean;
}

export interface TerminalCommand {
  command: string;
  output: string;
  delay?: number;
}

export interface StoryNode {
  id: string;
  type: NodeType;
  title?: string;
  narrative: string;
  subtext?: string;
  choices?: Choice[];
  terminalCommands?: TerminalCommand[];
  messageFrom?: string;
  messageContent?: string;
  alertLevel?: "info" | "warning" | "critical";
  autoAdvance?: boolean;
  autoAdvanceDelay?: number;
  nextNodeId?: string;
  ending?: "escape" | "caught" | "repent";
  endingTitle?: string;
  endingMessage?: string;
}

/*
  ملف تفاعلي طويل مبني على فكرة الانزلاق التدريجي إلى جرائم تقنية المعلومات ثم مواجهة أثرها الواقعي.
  الأسماء والجهات هنا تخيلية، لكن المنطق الإنساني والمهني مقصود أن يكون قريباً من الواقع.
  لا يحتوي الملف على خطوات هجومية تشغيلية أو تعليمات استغلال قابلة للتطبيق.
*/

export const storyNodes: Record<string, StoryNode> = {
  start: {
    id: "start",
    type: "story",
    title: "بعد منتصف الليل",
    narrative: `
      أنت تعمل في الدعم التقني منذ سنوات، وتعرف كيف تتحرك الأنظمة، وأين يخطئ الناس، وكيف تُترك الأبواب نصف مفتوحة.
      في البداية كنت تستمتع بحل المشاكل، ثم بدأ التعب المالي يتراكم، وتأخر راتبك، وتضخمت دفعات القرض، وصرت تنظر إلى مهاراتك وكأنها أصل غير مستغل.
      المنطقة الرمادية لا تبدأ بجريمة كبيرة، بل بسؤال صغير يتكرر في الرأس: ما الذي سيحدث لو أخذت خطوة واحدة فقط؟
      الليلة ليست ليلة بطولة، وليست ليلة عبقرية، بل ليلة قرار بطيء قد يغيّر شكل حياتك كله.
    `.trim(),
    subtext: `
      وصلتك قبل ساعة رسالة من وسيط يعرف أنك كنت تعمل في اختبارات أمنية قانونية في الماضي.
      هو لا يسمي ما يريده اختراقاً، بل يسميه وصولاً سريعاً إلى معلومات يحتاجها طرف ثالث.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "اقرأ رسالة الوسيط",
        nextNodeId: "broker_intro",
        danger: false,
      },
      {
        id: "c2",
        text: "أغلق الهاتف وحاول النوم",
        nextNodeId: "debt_notice",
        danger: false,
      },
      {
        id: "c3",
        text: "افتح ملفاً قديماً من أيام العمل القانوني",
        nextNodeId: "old_work_memory",
        danger: false,
      },
    ],
  },

  debt_notice: {
    id: "debt_notice",
    type: "message",
    narrative: `
      أنت تعرف أن الرسالة آلية، لكن وقعها ليس آلياً.
      كل سطر فيها يضغط على نقطة حساسة: الحاجة، الخجل، والإحساس بأنك تركض أسرع من قدرتك على اللحاق بحياتك.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "عد إلى رسالة الوسيط",
        nextNodeId: "broker_intro",
        danger: false,
      },
      {
        id: "c2",
        text: "ابحث عن عمل إضافي قانوني",
        nextNodeId: "legal_path_offer",
        danger: false,
      },
    ],
    messageFrom: "إشعار بنكي",
    messageContent: `
      نحيطكم علماً بأن القسط المتأخر ما زال قائماً.
      في حال عدم السداد خلال المدة المحددة قد تبدأ إجراءات إضافية.
      لمزيد من التفاصيل يرجى الدخول إلى التطبيق أو التواصل مع خدمة العملاء.
    `.trim(),
  },

  old_work_memory: {
    id: "old_work_memory",
    type: "story",
    title: "منطقة كان لها معنى",
    narrative: `
      تفتح تقريراً قديماً من فترة كنت تعمل فيها ضمن فريق يختبر تطبيقات بشكل قانوني بعد موافقات واضحة.
      كان هناك احترام للحدود، ومواعيد، وتعويض عادل، ومحادثات مهنية لا تحتاج أن تبررها لنفسك.
      تتذكر شعوراً مفقوداً: أن تكون جيداً في شيء من دون أن تخاف من أثره بعد أسبوع أو شهر أو سنة.
    `.trim(),
    subtext: `
      المهارة نفسها لم تتغير، لكن الاتجاه هو الذي تغيّر.
      الفرق بين الفحص المصرح به والتعدي غير المصرح به ليس لغوياً، بل أخلاقي وقانوني ومهني.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "ابحث عن فرصة قانونية مشابهة",
        nextNodeId: "legal_path_offer",
        danger: false,
      },
      {
        id: "c2",
        text: "عد إلى الرسالة الجديدة",
        nextNodeId: "broker_intro",
        danger: false,
      },
    ],
  },

  legal_path_offer: {
    id: "legal_path_offer",
    type: "story",
    title: "الطريق البطيء لكنه حقيقي",
    narrative: `
      تتصفح منصات العمل الحر، وبرامج الإفصاح عن الثغرات، ووظائف الدعم الأمني المبتدئة.
      الأجر أقل مما يَعِد به الوسيط، والنتائج أبطأ، لكن كل خطوة هنا يمكن أن تقولها بصوت مرتفع.
      لا يوجد اختصار مجيد؛ يوجد فقط طريق بطيء لا يبتلعك في النهاية.
    `.trim(),
    subtext: `
      أمامك خياران غير متكافئين في السرعة:
      مال سريع محفوف بالانكشاف، أو مسار أبطأ يبقي اسمك ونومك على حالهما.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "تمسك بالطريق القانوني",
        nextNodeId: "ending_decline_early",
        danger: false,
      },
      {
        id: "c2",
        text: "أنت تحتاج المال الآن، عد للوسيط",
        nextNodeId: "broker_intro",
        danger: true,
      },
    ],
  },

  broker_intro: {
    id: "broker_intro",
    type: "message",
    narrative: `
      الرسالة قصيرة ومقصودة.
      لا يوجد اسم جهة، ولا طلب مباشر، فقط لغة مصممة لتخفف من بشاعة المعنى الحقيقي.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "اسأله عن الهدف",
        nextNodeId: "target_shortlist",
        danger: true,
      },
      {
        id: "c2",
        text: "ارفض من البداية",
        nextNodeId: "ending_decline_early",
        danger: false,
      },
      {
        id: "c3",
        text: "اطلب مهلة للتفكير",
        nextNodeId: "mentor_warning",
        danger: false,
      },
    ],
    messageFrom: "الوسيط",
    messageContent: `
      لدي طرف يحتاج وصولاً إلى بيانات تشغيلية من جهة خاصة.
      لا أحتاج عرضاً تقنياً ولا استعراضاً.
      أحتاج شخصاً يفهم كيف تتحرك الأنظمة والناس.
      الدفع سريع إذا كان العمل نظيفاً.
    `.trim(),
  },

  mentor_warning: {
    id: "mentor_warning",
    type: "message",
    narrative: `
      أنت لم تخبره شيئاً، لكنه أرسل هذه الرسالة بعد أن رأى منشورك الغاضب عن المال والعمل.
      أحياناً تأتي التحذيرات بصيغة عامة، لكنها تصيب الهدف تماماً.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "تجاهل التحذير وأكمل",
        nextNodeId: "target_shortlist",
        danger: true,
      },
      {
        id: "c2",
        text: "خذ التحذير بجدية",
        nextNodeId: "ending_decline_early",
        danger: false,
      },
    ],
    messageFrom: "مشرف سابق",
    messageContent: `
      تذكير فقط لأنني أعرفك جيداً.
      أسوأ القرارات المهنية تبدأ غالباً حين يختلط الضغط المالي بالإحساس بأن المهارة تعطي صاحبها استثناء.
      المهارة لا تعطي أحداً استثناء.
    `.trim(),
  },

  target_shortlist: {
    id: "target_shortlist",
    type: "story",
    title: "قائمة أهداف لا تشبه الأفلام",
    narrative: `
      الوسيط يرسل ثلاث جهات محتملة.
      لا توجد بنوك عملاقة ولا أقمار صناعية ولا مشاهد سينمائية.
      هناك فقط مؤسسات عادية تحمل فوقها حياة أناس عاديين: رواتب، ملفات مراجعين، وشحنات بعناوين حقيقية.
      هذا بالضبط ما يجعل الأمر حقيقياً وثقيلاً.
    `.trim(),
    subtext: `
      كل هدف هنا يؤثر في أشخاص يمكن تخيلهم بسهولة.
      كل اختيار يفتح نوعاً مختلفاً من الضرر.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "منصة رواتب للشركات الصغيرة",
        nextNodeId: "target_context_payroll",
        danger: true,
      },
      {
        id: "c2",
        text: "سلسلة عيادات يومية",
        nextNodeId: "target_context_clinic",
        danger: true,
      },
      {
        id: "c3",
        text: "شركة نقل وتخزين",
        nextNodeId: "target_context_logistics",
        danger: true,
      },
    ],
  },

  target_context_payroll: {
    id: "target_context_payroll",
    type: "story",
    title: "الهدف الأول: منصة رواتب",
    narrative: `
      المنصة لا تدير المال مباشرة فقط، بل تدير الثقة بين الشركة وموظفيها.
      بداخلها عادة توجد كشوف رواتب، هويات، عقود، تفاصيل بدلات، وتحديثات حسابات بنكية.
      أي عبث هنا لا يضرب مؤسسة مجردة، بل يضرب أسراً تعيش على تحويل آخر الشهر.
    `.trim(),
    subtext: `
      الوسيط لا يطلب كل شيء.
      هو يطلب ما يسميه عينة تثبت الإمكانية، ثم تتوسع الطلبات لاحقاً.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "ابدأ بجمع سياق عام من مصادر متاحة",
        nextNodeId: "public_research_payroll",
        danger: false,
      },
      {
        id: "c2",
        text: "تراجع الآن",
        nextNodeId: "ending_decline_early",
        danger: false,
      },
      {
        id: "c3",
        text: "أبلغ الجهة بأن هناك وسيطاً يبحث عن بياناتها",
        nextNodeId: "ending_report_early",
        danger: false,
      },
    ],
  },

  public_research_payroll: {
    id: "public_research_payroll",
    type: "terminal",
    title: "جمع سياق عام",
    narrative: `
      بدلاً من القفز الأعمى، تبدأ بالنظر إلى ما هو متاح علناً أو متداول داخل فرق المهنة:
      صفحات توظيف، وثائق عامة، إعلانات مزودين، منشورات موظفين، وآثار إدارية يتركها أي نمو سريع.
      أنت لا تخترق هنا، لكنك تتعلم شيئاً أخطر: أن كثيراً من الجهات تكشف عن نفسها أكثر مما تتخيل.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "تحدث مع أختك التي تعمل في الشؤون الإدارية",
        nextNodeId: "sister_message",
        danger: false,
      },
      {
        id: "c2",
        text: "عد إلى الوسيط واطلب تفاصيل أكثر",
        nextNodeId: "broker_deadline",
        danger: true,
      },
      {
        id: "c3",
        text: "أوقف كل شيء",
        nextNodeId: "ending_decline_early",
        danger: false,
      },
    ],
    terminalCommands: [
      {
        command: "cat public_notes.txt",
        output: `
          ملاحظات عامة: توسع سريع خلال 18 شهراً
          تغيير مزودين مرتين
          ضغط تشغيل قبل نهاية كل شهر
          وظائف شاغرة في الدعم والامتثال
        `.trim(),
        delay: 700,
      },
      {
        command: "cat vendor_mentions.txt",
        output: `
          إشارات علنية إلى شركاء تقنيين ومقاولين خارجيين
          مستندات تسويق تتضمن أسماء منتجات دون تفاصيل حساسة
          منشورات موظفين تكشف تواريخ مشاريع داخلية تقريبية
        `.trim(),
        delay: 900,
      },
      {
        command: "cat risk_thoughts.txt",
        output: `
          الخطر الحقيقي ليس في أداة واحدة بل في تلاقي الضغط التشغيلي مع أخطاء البشر وسوء الفصل بين الصلاحيات
        `.trim(),
        delay: 600,
      },
    ],
  },

  target_context_clinic: {
    id: "target_context_clinic",
    type: "story",
    title: "الهدف الثاني: سلسلة عيادات",
    narrative: `
      العيادات اليومية تبدو أقل بريقاً من المستشفيات الكبرى، لكنها تحمل أكثر ما يكرهه الناس في التسريب: الخصوصية القريبة جداً من الجسد.
      مواعيد، ملاحظات متابعة، فواتير، إحالات، وملفات مراجعين يظنون أن تفاصيلهم ستظل في غرفة ضيقة بين طبيب ومريض.
      اختراق هذا النوع من الجهات لا ينتج فضيحة تقنية فقط، بل ينتج خوفاً طويل الأمد من الكشف والوصمة.
    `.trim(),
    subtext: `
      الوسيط يتحدث عن بيانات قابلة للضغط على الناس أو بيعها أو استخدامها في انتحال الهوية.
      أنت تعرف أن هذا ليس وصفاً نظرياً بل سوقاً قائماً على استغلال الضعف.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "ابدأ بجمع سياق عام من مصادر متاحة",
        nextNodeId: "public_research_clinic",
        danger: false,
      },
      {
        id: "c2",
        text: "تراجع الآن",
        nextNodeId: "ending_decline_early",
        danger: false,
      },
      {
        id: "c3",
        text: "أبلغ الجهة بأن هناك وسيطاً يبحث عن بياناتها",
        nextNodeId: "ending_report_early",
        danger: false,
      },
    ],
  },

  public_research_clinic: {
    id: "public_research_clinic",
    type: "terminal",
    title: "جمع سياق عام",
    narrative: `
      بدلاً من القفز الأعمى، تبدأ بالنظر إلى ما هو متاح علناً أو متداول داخل فرق المهنة:
      صفحات توظيف، وثائق عامة، إعلانات مزودين، منشورات موظفين، وآثار إدارية يتركها أي نمو سريع.
      أنت لا تخترق هنا، لكنك تتعلم شيئاً أخطر: أن كثيراً من الجهات تكشف عن نفسها أكثر مما تتخيل.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "تحدث مع أختك التي تعمل في الشؤون الإدارية",
        nextNodeId: "sister_message",
        danger: false,
      },
      {
        id: "c2",
        text: "عد إلى الوسيط واطلب تفاصيل أكثر",
        nextNodeId: "broker_deadline",
        danger: true,
      },
      {
        id: "c3",
        text: "أوقف كل شيء",
        nextNodeId: "ending_decline_early",
        danger: false,
      },
    ],
    terminalCommands: [
      {
        command: "cat public_notes.txt",
        output: `
          ملاحظات عامة: توسع سريع خلال 18 شهراً
          تغيير مزودين مرتين
          ضغط تشغيل قبل نهاية كل شهر
          وظائف شاغرة في الدعم والامتثال
        `.trim(),
        delay: 700,
      },
      {
        command: "cat vendor_mentions.txt",
        output: `
          إشارات علنية إلى شركاء تقنيين ومقاولين خارجيين
          مستندات تسويق تتضمن أسماء منتجات دون تفاصيل حساسة
          منشورات موظفين تكشف تواريخ مشاريع داخلية تقريبية
        `.trim(),
        delay: 900,
      },
      {
        command: "cat risk_thoughts.txt",
        output: `
          الخطر الحقيقي ليس في أداة واحدة بل في تلاقي الضغط التشغيلي مع أخطاء البشر وسوء الفصل بين الصلاحيات
        `.trim(),
        delay: 600,
      },
    ],
  },

  target_context_logistics: {
    id: "target_context_logistics",
    type: "story",
    title: "الهدف الثالث: شركة نقل وتخزين",
    narrative: `
      شركة النقل والتخزين لا تبدو للوهلة الأولى هدفاً شخصياً، لكنها تمسك بخريطة الحياة اليومية للناس والمؤسسات.
      عناوين، تواريخ تسليم، أسماء مستلمين، مسارات مستودعات، وأحياناً معلومات داخلية عن الموردين والجداول.
      أي عبث هنا قد ينتج سرقة مادية أو ابتزازاً أو تعطيلاً يضرب التجارة الصغيرة قبل الكبيرة.
    `.trim(),
    subtext: `
      الوسيط يركز على بيانات العناوين والحركة، لأن السوق السوداء لا تهتم فقط بما في الداخل بل بمتى وأين وكيف يتحرك.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "ابدأ بجمع سياق عام من مصادر متاحة",
        nextNodeId: "public_research_logistics",
        danger: false,
      },
      {
        id: "c2",
        text: "تراجع الآن",
        nextNodeId: "ending_decline_early",
        danger: false,
      },
      {
        id: "c3",
        text: "أبلغ الجهة بأن هناك وسيطاً يبحث عن بياناتها",
        nextNodeId: "ending_report_early",
        danger: false,
      },
    ],
  },

  public_research_logistics: {
    id: "public_research_logistics",
    type: "terminal",
    title: "جمع سياق عام",
    narrative: `
      بدلاً من القفز الأعمى، تبدأ بالنظر إلى ما هو متاح علناً أو متداول داخل فرق المهنة:
      صفحات توظيف، وثائق عامة، إعلانات مزودين، منشورات موظفين، وآثار إدارية يتركها أي نمو سريع.
      أنت لا تخترق هنا، لكنك تتعلم شيئاً أخطر: أن كثيراً من الجهات تكشف عن نفسها أكثر مما تتخيل.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "تحدث مع أختك التي تعمل في الشؤون الإدارية",
        nextNodeId: "sister_message",
        danger: false,
      },
      {
        id: "c2",
        text: "عد إلى الوسيط واطلب تفاصيل أكثر",
        nextNodeId: "broker_deadline",
        danger: true,
      },
      {
        id: "c3",
        text: "أوقف كل شيء",
        nextNodeId: "ending_decline_early",
        danger: false,
      },
    ],
    terminalCommands: [
      {
        command: "cat public_notes.txt",
        output: `
          ملاحظات عامة: توسع سريع خلال 18 شهراً
          تغيير مزودين مرتين
          ضغط تشغيل قبل نهاية كل شهر
          وظائف شاغرة في الدعم والامتثال
        `.trim(),
        delay: 700,
      },
      {
        command: "cat vendor_mentions.txt",
        output: `
          إشارات علنية إلى شركاء تقنيين ومقاولين خارجيين
          مستندات تسويق تتضمن أسماء منتجات دون تفاصيل حساسة
          منشورات موظفين تكشف تواريخ مشاريع داخلية تقريبية
        `.trim(),
        delay: 900,
      },
      {
        command: "cat risk_thoughts.txt",
        output: `
          الخطر الحقيقي ليس في أداة واحدة بل في تلاقي الضغط التشغيلي مع أخطاء البشر وسوء الفصل بين الصلاحيات
        `.trim(),
        delay: 600,
      },
    ],
  },

  sister_message: {
    id: "sister_message",
    type: "message",
    narrative: `
      تقرأ الرسالة مرتين.
      هي لا تعرف شيئاً محدداً، لكنها تعرفك جيداً بما يكفي لتلمس اللحظة الخطرة.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "احفظ الرسالة وتراجع",
        nextNodeId: "ending_family_support",
        danger: false,
      },
      {
        id: "c2",
        text: "أنت تحتاج أن تكمل رغم ذلك",
        nextNodeId: "broker_deadline",
        danger: true,
      },
    ],
    messageFrom: "أختك",
    messageContent: `
      أعرف أنك متوتر من المال.
      لكن لا تجعل خوفك من المستقبل يدفعك إلى قرار سيبتلع المستقبل نفسه.
      أحياناً أسوأ شيء يفعله الإنسان ليس لأنه شرير، بل لأنه مرهق ويظن أن الأمر مؤقت.
    `.trim(),
  },

  broker_deadline: {
    id: "broker_deadline",
    type: "message",
    narrative: `
      اللغة الآن أوضح.
      الوسيط يضغط بالوقت لأنه يعرف أن التعجل يضعف الأخلاق والحكم معاً.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "اطلب وسيلة وصول جاهزة من السوق الرمادية",
        nextNodeId: "package_offer",
        danger: true,
      },
      {
        id: "c2",
        text: "حاول صنع مبرر تواصلي مع موظف",
        nextNodeId: "pretext_choice",
        danger: true,
      },
      {
        id: "c3",
        text: "بلّغ الجهة المستهدفة مبكراً",
        nextNodeId: "ending_report_early",
        danger: false,
      },
    ],
    messageFrom: "الوسيط",
    messageContent: `
      الطرف ينتظر قرارك خلال الليلة.
      لا أحتاج تقريراً طويلاً.
      أحتاج مؤشراً على أنك قادر على الوصول أو قريب منه.
      إذا لم تكن مناسباً سأتجه إلى شخص آخر.
    `.trim(),
  },

  pretext_choice: {
    id: "pretext_choice",
    type: "story",
    title: "التلاعب يبدأ باللغة",
    narrative: `
      أنت تعرف أن كثيراً من الحوادث لا تبدأ بكسر تقني معقد، بل برسالة تبدو معقولة في توقيت مناسب.
      المشكلة أن كل رسالة من هذا النوع لا تسرق معلومة فقط؛ هي تسرق ثقة شخص ظن أنه يتعامل مع جهة طبيعية.
      حتى قبل أن تكتب سطراً واحداً، تشعر أن المسافة بين المهارة والخداع تقلصت إلى درجة مزعجة.
    `.trim(),
    subtext: `
      كل ذريعة من الذرائع التالية واقعية في عالم الاحتيال، وهذا بالضبط سبب قبحها.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "صفة مجند يبحث عن مرشح تقني",
        nextNodeId: "pretext_recruiter",
        danger: true,
      },
      {
        id: "c2",
        text: "صفة مراجع تدقيق خارجي",
        nextNodeId: "pretext_auditor",
        danger: true,
      },
      {
        id: "c3",
        text: "صفة دعم من مزود خدمة",
        nextNodeId: "pretext_support",
        danger: true,
      },
      {
        id: "c4",
        text: "توقف هنا",
        nextNodeId: "ending_decline_early",
        danger: false,
      },
    ],
  },

  pretext_recruiter: {
    id: "pretext_recruiter",
    type: "story",
    title: "ذريعة التوظيف",
    narrative: `
      أنت تعرف أن سوق العمل المرهق يجعل الناس أكثر استعداداً للرد على من يعدهم بفرصة أفضل.
      هذا لا يجعل الخداع أقل سوءاً؛ بل يجعل استغلاله أكثر حقارة، لأنه يركب على احتياج مشروع.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "أرسل الرسالة على أي حال",
        nextNodeId: "reply_recruiter",
        danger: true,
      },
      {
        id: "c2",
        text: "احذف المسودة قبل إرسالها",
        nextNodeId: "package_offer",
        danger: false,
      },
    ],
  },

  reply_recruiter: {
    id: "reply_recruiter",
    type: "message",
    narrative: `
      الشخص على الطرف الآخر لم يبتلع الرواية كاملة.
      حذره العادي يربكك أكثر من أي نظام تقني، لأنك ترى إنساناً يحاول فقط ألا يُخدع.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "تتراجع بسبب الإحراج والذنب",
        nextNodeId: "ending_decline_early",
        danger: false,
      },
      {
        id: "c2",
        text: "تترك البشر جانباً وتبحث عن وصول جاهز",
        nextNodeId: "package_offer",
        danger: true,
      },
    ],
    messageFrom: "موظف من الجهة المستهدفة",
    messageContent: `
      أشكرك على التواصل.
      قبل أن أكمل، هل يمكن أن ترسل اسم الجهة ونطاق بريدها الرسمي؟
      مررت سابقاً بمحاولات مزيفة وأصبحت أكثر حذراً.
    `.trim(),
  },

  pretext_auditor: {
    id: "pretext_auditor",
    type: "story",
    title: "ذريعة التدقيق",
    narrative: `
      لغة التدقيق مغرية لمن يريد أن يبدو رسمياً بسرعة.
      لكن استخدامها كقناع يعني أنك تتطفل على ثقافة الامتثال نفسها، وتحوّل ما يفترض أنه حماية إلى مدخل للاستغلال.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "أرسل الرسالة على أي حال",
        nextNodeId: "reply_auditor",
        danger: true,
      },
      {
        id: "c2",
        text: "احذف المسودة قبل إرسالها",
        nextNodeId: "package_offer",
        danger: false,
      },
    ],
  },

  reply_auditor: {
    id: "reply_auditor",
    type: "message",
    narrative: `
      الرد مهني وبارد، لكنه يذكرك بشيء مهم:
      حين تكون المؤسسة ناضجة قليلاً، لا ينهار كل شيء أمام النبرة الرسمية وحدها.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "تتراجع بسبب الإحراج والذنب",
        nextNodeId: "ending_decline_early",
        danger: false,
      },
      {
        id: "c2",
        text: "تترك البشر جانباً وتبحث عن وصول جاهز",
        nextNodeId: "package_offer",
        danger: true,
      },
    ],
    messageFrom: "مسؤولة عمليات",
    messageContent: `
      يرجى تزويدي بخطاب تكليف رسمي واسم المسؤول الداخلي المرجعي.
      أي طلب يخص البيانات أو الصلاحيات لا يُنظر فيه من دون قناة معتمدة.
    `.trim(),
  },

  pretext_support: {
    id: "pretext_support",
    type: "story",
    title: "ذريعة الدعم الفني",
    narrative: `
      هذه الذريعة تعتمد على ارتباك اللحظة.
      كلما زادت الأعطال أو التحديثات أو ضغط نهاية الشهر، صار الناس أكثر ميلاً لتصديق من يدّعي أنه جاء ليساعد.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "أرسل الرسالة على أي حال",
        nextNodeId: "reply_support",
        danger: true,
      },
      {
        id: "c2",
        text: "احذف المسودة قبل إرسالها",
        nextNodeId: "package_offer",
        danger: false,
      },
    ],
  },

  reply_support: {
    id: "reply_support",
    type: "message",
    narrative: `
      هذا الرد البسيط يوقظ فيك شيئاً مزعجاً:
      أنت لا تواجه جداراً تقنياً، بل تواجه شخصاً يحاول فقط أن يلتزم بما طُلب منه كي لا يؤذي أحداً.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "تتراجع بسبب الإحراج والذنب",
        nextNodeId: "ending_decline_early",
        danger: false,
      },
      {
        id: "c2",
        text: "تترك البشر جانباً وتبحث عن وصول جاهز",
        nextNodeId: "package_offer",
        danger: true,
      },
    ],
    messageFrom: "موظف خدمة",
    messageContent: `
      لدينا سياسة تمنع مشاركة أي معلومات تشغيلية خارج التذكرة الرسمية.
      إذا كان هناك تحديث حقيقي فأرسله عبر القناة المعتمدة وسيراه الفريق المختص.
    `.trim(),
  },

  package_offer: {
    id: "package_offer",
    type: "story",
    title: "السوق الرمادية لا تهتم بك",
    narrative: `
      الوسيط يعرض عليك ما يسميه حزمة وصول.
      هو لا يشرح كيف جرى الحصول عليها، ولا كم يدٍ مرت عليها، ولا من سيتذكرها بعد أسبوع.
      كل شيء هنا مبني على نفي المسؤولية: كل طرف يتصرف كأنه مجرد ناقل، بينما الضرر ينتقل كاملاً إلى الضحايا.
    `.trim(),
    subtext: `
      أنت لا تشتري مجرد معلومة.
      أنت تشتري موقعاً داخل سلسلة قذرة لا يضمن لك أحد فيها شيئاً.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "ادفع وتستلم ما يوصلك للداخل",
        nextNodeId: "buy_package",
        danger: true,
      },
      {
        id: "c2",
        text: "تبلغ الجهة المستهدفة بأن هناك حزمة متداولة تخصها",
        nextNodeId: "ending_report_early",
        danger: false,
      },
      {
        id: "c3",
        text: "تتراجع نهائياً",
        nextNodeId: "ending_decline_early",
        danger: false,
      },
    ],
  },

  buy_package: {
    id: "buy_package",
    type: "story",
    title: "خطوة يصعب التراجع عنها نفسياً",
    narrative: `
      أرسلت المبلغ.
      بمجرد أن يخرج المال تشعر أن جزءاً منك يريد متابعة المشوار فقط حتى لا يعترف بأنه عبر الخط من أجل لا شيء.
      هذه ليست شجاعة؛ هذا تحيز بشري معروف نحو تبرير الخطأ بعد الاستثمار فيه.
    `.trim(),
    subtext: `
      تصل الحزمة مع تعليمات مقتضبة لا تكشف المصدر.
      أنت لا تعرف من تضرر قبل أن تصل إليك، ولا من سيُسحب معك لو انكشف الأمر.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "افتح الحزمة وتدخل",
        nextNodeId: "sector_access_router",
        danger: true,
      },
      {
        id: "c2",
        text: "توقف رغم كل شيء",
        nextNodeId: "notify_after_buy",
        danger: false,
      },
    ],
  },

  notify_after_buy: {
    id: "notify_after_buy",
    type: "story",
    title: "توقف متأخر لكنه مهم",
    narrative: `
      أنت الآن في وضع أسوأ من البداية، لأنك أصبحت جزءاً من السلسلة ولو للحظة.
      لكن التوقف الآن ما زال أفضل من الاستمرار.
      الفرق بين ضرر وقع وضرر مُنع ليس صغيراً، حتى لو كان ضميرك لا يمنحك راحة كاملة.
    `.trim(),
    subtext: `
      التبليغ في هذه المرحلة لا يمحو ما فعلته، لكنه قد يمنع اتساع الضرر ويخلق سجلاً يثبت أنك لم تواصل.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "بلّغ الجهة واشرح أن حزمة وصول متداولة",
        nextNodeId: "ending_report_after_contact",
        danger: false,
      },
      {
        id: "c2",
        text: "اصمت واختفِ",
        nextNodeId: "silent_guilt",
        danger: true,
      },
    ],
  },

  silent_guilt: {
    id: "silent_guilt",
    type: "story",
    title: "الصمت لا يعيدك إلى نقطة الصفر",
    narrative: `
      تمسح المحادثات وتطفئ الشاشة وتجلس طويلاً.
      لا أحد يطرق الباب، ولا يوجد مشهد درامي، لكن شيئاً داخلك يعرف أن المشكلة لم تنته.
      أنت لا تعرف هل الجهة انكشفت بالفعل، ولا هل الحزمة ستنتقل إلى شخص أكثر اندفاعاً منك.
    `.trim(),
    subtext: `
      بعض الناس يظنون أن عدم الاستمرار يكفي.
      لكنه لا يكفي دائماً حين تترك الخطر يتحرك وأنت تعرف بوجوده.
    `.trim(),
    nextNodeId: "ending_silent_damage",
  },

  sector_access_router: {
    id: "sector_access_router",
    type: "story",
    title: "الدخول لا يبدو مجيداً",
    narrative: `
      لا يوجد شعور عبقري.
      يوجد فقط توتر، ونافذة مفتوحة، وإحساس غير مريح بأنك داخل مكان ليس لك.
      من هذه اللحظة تتغير زاوية القصة: لم تعد تنظر إلى احتمال الجريمة، بل إلى أثرها المباشر.
    `.trim(),
    subtext: `
      حسب الجهة التي اخترتها سابقاً، سيتغير نوع البيانات التي تراها ونوع الضرر الذي يمكن أن يحدث.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "تابع مسار الرواتب",
        nextNodeId: "inside_payroll_overview",
        danger: true,
      },
      {
        id: "c2",
        text: "تابع مسار العيادات",
        nextNodeId: "inside_clinic_overview",
        danger: true,
      },
      {
        id: "c3",
        text: "تابع مسار النقل والتخزين",
        nextNodeId: "inside_logistics_overview",
        danger: true,
      },
    ],
  },
  inside_payroll_overview: {
    id: "inside_payroll_overview",
    type: "story",
    title: "من الداخل: منصة الرواتب",
    narrative: `
      أول ما تراه ليس رقماً مالياً كبيراً ولا ملفاً سرياً كما في الخيال.
      ترى أسماء أشخاص، تواريخ مباشرة العمل، بدلات سكن، بدلات نقل، وآخر تحديثات الحسابات البنكية.
      كل سطر هنا يشبه حياة كاملة مضغوطة في جدول.
      عند هذه النقطة يصبح من الصعب على الإنسان أن يكذب على نفسه ويقول إنه يتعامل مع كيان مجرد.
    `.trim(),
    subtext: `
      الوسيط لا يريد صورة شاملة.
      هو يريد شيئاً يكفي لإثبات القدرة ثم يبدأ بعده الابتزاز المهني المعتاد: إذا وصلت مرة فستصل ثانية.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "استعرض مزيداً من البيانات",
        nextNodeId: "payroll_preview",
        danger: true,
      },
      {
        id: "c2",
        text: "توقف الآن قبل أن تنقل شيئاً",
        nextNodeId: "inside_stop_reflection",
        danger: false,
      },
      {
        id: "c3",
        text: "بلّغ الجهة فوراً واذكر أن الوصول غير مشروع",
        nextNodeId: "report_from_inside",
        danger: false,
      },
    ],
  },

  payroll_preview: {
    id: "payroll_preview",
    type: "terminal",
    title: "معاينة لا ينبغي أن تراها",
    narrative: `
      النافذة أمامك تعرض حقولاً يعرفها موظفو الموارد البشرية جيداً، لكنك لست واحداً منهم هنا.
      لا توجد بطولة في قراءة بيانات رواتب أشخاص لا يعرفونك.
      يوجد فقط تعدٍّ واضح، وكل ثانية إضافية تجعل العودة النفسية أصعب.
    `.trim(),
    terminalCommands: [
      {
        command: "cat payroll_sample_view.txt",
        output: `
          employee_name | employee_id | bank_update_status | allowance_note
          موظف 001 | 10482 | pending review | housing revision requested
          موظف 002 | 11807 | approved | transport allowance updated
          موظف 003 | 12241 | pending confirmation | family status changed
        `.trim(),
        delay: 900,
      },
      {
        command: "cat access_warning.txt",
        output: `
          هذه ليست مجرد بيانات مالية.
          أي إساءة استخدام هنا قد تؤدي إلى تحويلات مضللة أو انتحال هوية أو استهداف مباشر لموظفين تحت ضغط معيشي.
        `.trim(),
        delay: 700,
      },
    ],
    choices: [
      {
        id: "c1",
        text: "أرسل عينة صغيرة للوسيط",
        nextNodeId: "payroll_send_sample",
        danger: true,
      },
      {
        id: "c2",
        text: "احذف ما نسخته ذهنياً وتراجع",
        nextNodeId: "inside_stop_reflection",
        danger: false,
      },
      {
        id: "c3",
        text: "تواصل مع الجهة بصفة مبلّغ لا بصفة منكر",
        nextNodeId: "report_from_inside",
        danger: false,
      },
    ],
  },

  payroll_send_sample: {
    id: "payroll_send_sample",
    type: "story",
    title: "أصغر عينة ليست صغيرة",
    narrative: `
      تقنع نفسك أن ما ترسله ليس إلا جزءاً محدوداً.
      لكن الجزء المحدود من البيانات الشخصية لا يكون محدود الأثر بالضرورة.
      في عالم الجرائم المعلوماتية، العينة ليست إثباتاً فقط؛ هي أيضاً عربون ثقة بين مجرم وآخر.
      أنت الآن لا تثبت القدرة فحسب، بل تثبت استعدادك للاستمرار.
    `.trim(),
    subtext: `
      الوسيط سيرى في هذه الخطوة بداية تفاوض، لا نهاية اختبار.
      ومنذ هذه اللحظة يصير من الصعب أن تعود إلى الوراء من دون كلفة.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "انتظر رد الوسيط",
        nextNodeId: "broker_after_sample",
        danger: true,
      },
      {
        id: "c2",
        text: "أرسل للجهة بلاغاً فورياً قبل أن يتسع الضرر",
        nextNodeId: "report_after_sample",
        danger: false,
      },
    ],
  },

  broker_after_sample: {
    id: "broker_after_sample",
    type: "message",
    narrative: `
      الرد يأتي أسرع مما توقعت.
      الأشخاص الذين يعيشون على هذه السوق لا يضيعون وقتهم حين يلمسون إمكان الربح.
      لغته لا تحمل مفاجأة، لكنها تحمل ما هو أسوأ: الاعتياد.
    `.trim(),
    messageFrom: "الوسيط",
    messageContent: `
      جيد.
      هذا يكفي لإثبات الوصول.
      الآن نحتاج دفعة أكبر تتضمن ما يسمح بالفرز والتسعير.
      لا توسع الموضوع على نفسك أخلاقياً.
      أنت لا تؤذي أحداً مباشرة، أنت فقط تنقل ما هو موجود.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "وسع الاستخراج",
        nextNodeId: "payroll_bulk_request",
        danger: true,
      },
      {
        id: "c2",
        text: "ارفض وأوقف التواصل",
        nextNodeId: "blackmail_opening",
        danger: true,
      },
      {
        id: "c3",
        text: "بلّغ الجهة قبل أي خطوة أخرى",
        nextNodeId: "report_after_sample",
        danger: false,
      },
    ],
  },

  payroll_bulk_request: {
    id: "payroll_bulk_request",
    type: "story",
    title: "التوسع",
    narrative: `
      هنا ينكشف منطق السوق السوداء كاملاً.
      لا أحد يكتفي بالقليل إذا عرف أن الباب مفتوح.
      تصبح اللغة أكثر برودة: فرز، تسعير، صلاحية، تحديث، تمييز بين سجلات أحدث وأقدم.
      البشر يتحولون سريعاً إلى صفوف قابلة للبيع حين تسمح لنفسك بالنظر إليهم بهذه الطريقة.
    `.trim(),
    subtext: `
      كل توسع هنا يزيد من عدد المتضررين المحتملين ويزيد من احتمالات الانكشاف والتحقيق.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "تابع رغم كل شيء",
        nextNodeId: "payroll_real_people",
        danger: true,
      },
      {
        id: "c2",
        text: "توقف الآن",
        nextNodeId: "blackmail_opening",
        danger: true,
      },
      {
        id: "c3",
        text: "أبلغ الجهة المختصة داخل المؤسسة",
        nextNodeId: "report_after_sample",
        danger: false,
      },
    ],
  },

  payroll_real_people: {
    id: "payroll_real_people",
    type: "message",
    narrative: `
      وأنت تتردد، تأتيك رسالة لا علاقة مباشرة لها بما تفعل.
      لكنها تضرب المكان الصحيح في وعيك: هذا ليس نظاماً فقط، بل ناس يعيشون على تفاصيل من هذا النوع.
    `.trim(),
    messageFrom: "قريب لك",
    messageContent: `
      لا أعرف لماذا تذكرتك الآن.
      الشركة عندنا أخطأت الشهر الماضي في جزء من الرواتب وتأذى ناس كثير.
      بعضهم ما قدر يسدد الإيجار في وقته.
      غريب كيف رقم صغير في نظام يقلب حياة بيت كامل.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "تتراجع لأن المعنى صار أوضح",
        nextNodeId: "inside_stop_reflection",
        danger: false,
      },
      {
        id: "c2",
        text: "تواصل رغم ذلك",
        nextNodeId: "payroll_distribution_thought",
        danger: true,
      },
    ],
  },

  payroll_distribution_thought: {
    id: "payroll_distribution_thought",
    type: "story",
    title: "لحظة تبرير أخيرة",
    narrative: `
      تبدأ بترديد الجملة التي يرددها كثير ممن ينزلقون في هذا الطريق:
      أنا لن ألمس حساباً بنفسي، أنا فقط سأمرر البيانات.
      لكن تمرير البيانات الشخصية في هذا السياق ليس حياداً.
      هو خطوة فاعلة في سلسلة ضرر يمكن توقعها بسهولة، ولهذا لا يعفيك التفريق اللغوي بين الفعل المباشر وغير المباشر.
    `.trim(),
    subtext: `
      الطريق أمامك الآن يتشعب بوضوح:
      إما أن تكمل وتصبح جزءاً صريحاً من السوق، أو تنسحب وتتحمل تبعات الانسحاب.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "سلّم دفعة أوسع",
        nextNodeId: "delivered_payroll_batch",
        danger: true,
      },
      {
        id: "c2",
        text: "انسحب الآن",
        nextNodeId: "blackmail_opening",
        danger: true,
      },
      {
        id: "c3",
        text: "أبلغ الجهة واطلب احتواء عاجلاً",
        nextNodeId: "report_after_sample",
        danger: false,
      },
    ],
  },

  delivered_payroll_batch: {
    id: "delivered_payroll_batch",
    type: "story",
    title: "التحويل تم",
    narrative: `
      ترسل دفعة أوسع من البيانات.
      لا يحدث انفجار في الشاشة ولا إنذار سينمائي.
      يحدث ما هو أبرد: صمت لثوانٍ، ثم تحويل مالي، ثم إحساس فوري بأن المال دخل من باب لن تستطيع لاحقاً أن تقول إنك لم تعرف طبيعته.
      الجرائم المعلوماتية الواقعية كثيراً ما تكون مملة في لحظتها، لكن آثارها ليست مملة على الإطلاق.
    `.trim(),
    subtext: `
      منذ هذه اللحظة صار لدى جهة مجهولة ما يكفي لفرز الأسماء، وربطها بسياقات معيشية، واستهداف أفراد حقيقيين.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "راقب ما سيحدث",
        nextNodeId: "payroll_aftermath_signs",
        danger: true,
      },
      {
        id: "c2",
        text: "استيقظ أخيراً وبلّغ",
        nextNodeId: "late_report_payroll",
        danger: false,
      },
    ],
  },

  payroll_aftermath_signs: {
    id: "payroll_aftermath_signs",
    type: "alert",
    alertLevel: "critical",
    title: "بداية الأثر",
    narrative: `
      خلال أيام قليلة تبدأ برؤية إشارات متفرقة في أماكن لا تتوقعها:
      رسائل عن محاولات احتيال، استفسارات داخلية عن تحديثات غير معتادة، ارتباك في مراجعات الحسابات، وكلام مقتضب في مجموعات مهنية عن حادثة قيد التحقق.
      هنا تدرك أن الضرر لا يسير بخط مستقيم.
      هو يتشعب في حياة أشخاص ومكاتب وأنظمة وعلاقات ثقة.
    `.trim(),
    subtext: `
      حتى لو لم يظهر اسمك بعد، فإن هذا لا يعني أنك خارج المشهد.
      التحقيقات الجادة تبنى من آثار صغيرة ومتراكمة.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "تحاول الصمت والاختفاء",
        nextNodeId: "silence_before_knock",
        danger: true,
      },
      {
        id: "c2",
        text: "تتواصل مع محامٍ",
        nextNodeId: "lawyer_consult",
        danger: false,
      },
      {
        id: "c3",
        text: "تتقدم ببلاغ متأخر",
        nextNodeId: "late_report_payroll",
        danger: false,
      },
    ],
  },

  blackmail_opening: {
    id: "blackmail_opening",
    type: "message",
    narrative: `
      حين تحاول الانسحاب بعد أن قدمت ما يثبت استعدادك، يتغير الخطاب فوراً.
      هذا هو الوجه الحقيقي للعلاقات غير القانونية: لا عقود، لا ثقة، لا احترام لقرارك بالتراجع.
      فقط ضغط وابتزاز واستغلال لما سبق أن فعلته.
    `.trim(),
    messageFrom: "الوسيط",
    messageContent: `
      لا تتصرف كأنك خارج الموضوع الآن.
      عندي ما يكفي لأربطك بما حدث.
      إذا لم تكمل فسأعتبرك أنت المشكلة لا الحل.
      لا تدفعني إلى خيارات لا تعجبك.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "تخضع للضغط وتكمل",
        nextNodeId: "payroll_distribution_thought",
        danger: true,
      },
      {
        id: "c2",
        text: "توقف وتلجأ إلى مسار قانوني",
        nextNodeId: "lawyer_consult",
        danger: false,
      },
    ],
  },

  lawyer_consult: {
    id: "lawyer_consult",
    type: "story",
    title: "أول حديث صريح",
    narrative: `
      للمرة الأولى تصف ما حدث بلغة لا تحتوي على تبريرات كثيرة.
      المحامي لا يطمئنك طمأنة فارغة، ولا يرعبك لمجرد الترهيب.
      يوضح لك أن الصمت ليس دائماً حماية، وأن التعاون المبكر، والتوثيق، والتوقف الفوري، والامتناع عن الإتلاف المتعمد للأدلة، كلها أمور قد تغيّر شكل المآل.
      الحقيقة هنا ثقيلة، لكنها أوضح من الأكاذيب التي كنت ترددها لنفسك.
    `.trim(),
    subtext: `
      أنت لا تبحث الآن عن مخرج نظيف، لأنه لم يعد موجوداً.
      أنت تبحث عن أقل المسارات سوءاً وأكثرها صدقاً.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "تتبع النصيحة وتبلّغ",
        nextNodeId: "late_report_payroll",
        danger: false,
      },
      {
        id: "c2",
        text: "ترفض وتختفي",
        nextNodeId: "silence_before_knock",
        danger: true,
      },
    ],
  },

  late_report_payroll: {
    id: "late_report_payroll",
    type: "story",
    title: "بلاغ متأخر",
    narrative: `
      البلاغ المتأخر ليس بطولة.
      لكنه أيضاً ليس عديم القيمة.
      أنت تقدم ما لديك من معرفة عن الوسيط، وطبيعة الطلب، وما جرى تمريره، وتقبل أن هذه الخطوة لا تمحو الفعل الأصلي.
      الفرق الوحيد أنها قد تمنع مزيداً من الاتساع وتثبت أنك توقفت عن الكذب على نفسك وعلى غيرك.
    `.trim(),
    subtext: `
      الاستجابة داخل الجهة تكون باردة ومهنية.
      لا أحد يشكرك كشخص منقذ، ولا أحد ينسى أنك جزء من المشكلة.
    `.trim(),
    nextNodeId: "ending_reckoning_reported",
  },

  silence_before_knock: {
    id: "silence_before_knock",
    type: "story",
    title: "الانتظار",
    narrative: `
      تمضي الأيام في صورة غير محتملة:
      لا حدث حاسماً، فقط توتر دائم، مراجعة لا إرادية للرسائل، وخوف من كل إشعار وكل مكالمة وكل زيارة غير متوقعة.
      كثير من الناس يظنون أن الخطر ينتهي إذا انتهى الاتصال بالوسيط.
      لكنه في الحقيقة يبدأ أحياناً بعد انقطاعه.
    `.trim(),
    subtext: `
      ما يؤذيك هنا ليس فقط احتمال المحاسبة.
      ما يؤذيك أيضاً أنك تعرف الآن كيف يمكن لقرار واحد أن يفتح باباً لا تستطيع وحدك إغلاقه.
    `.trim(),
    nextNodeId: "ending_caught_general",
  },

  inside_clinic_overview: {
    id: "inside_clinic_overview",
    type: "story",
    title: "من الداخل: العيادات",
    narrative: `
      البيانات هنا أكثر حساسية من أن توصف بأنها معلومات تشغيلية فقط.
      أنت أمام مواعيد، فواتير، تلميحات تشخيصية، تحويلات، وملفات تخص أشخاصاً دخلوا هذه المؤسسة وهم يظنون أن أضعف لحظاتهم ستبقى محفوظة.
      لا تحتاج أن ترى الكثير لتفهم حجم الانتهاك.
    `.trim(),
    subtext: `
      في هذا النوع من الجهات، أقل كمية من البيانات قد تكون كافية لإحراج أو ابتزاز أو وصم إنسان لا يعرف حتى أنك موجود.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "استعرض مزيداً من البيانات",
        nextNodeId: "clinic_preview",
        danger: true,
      },
      {
        id: "c2",
        text: "توقف فوراً",
        nextNodeId: "inside_stop_reflection",
        danger: false,
      },
      {
        id: "c3",
        text: "بلّغ الجهة مباشرة",
        nextNodeId: "report_from_inside",
        danger: false,
      },
    ],
  },

  clinic_preview: {
    id: "clinic_preview",
    type: "terminal",
    title: "معاينة لا ينبغي أن تراها",
    narrative: `
      ما يظهر أمامك يكفي كي تفهم أنك دخلت مساحة خصوصية لا يجوز الاقتراب منها بلا حق.
      حتى لو كانت الحقول مقتضبة أو مجزأة، فهي تنتمي إلى حياة أشخاص قد يدفعون ثمناً اجتماعياً ونفسياً قاسياً إذا خرجت من سياقها.
    `.trim(),
    terminalCommands: [
      {
        command: "cat clinic_schedule_preview.txt",
        output: `
          patient_ref | service_type | status | note_flag
          ref-4011 | follow-up visit | confirmed | restricted visibility
          ref-4028 | lab review | pending | physician note attached
          ref-4036 | consultation | completed | billing follow-up required
        `.trim(),
        delay: 1000,
      },
      {
        command: "cat privacy_note.txt",
        output: `
          هذا النوع من البيانات لا يعرّض المؤسسة فقط.
          قد يعرّض المراجعين للوصمة أو الابتزاز أو تدمير السمعة أو الاستهداف المبني على معلومات حميمة.
        `.trim(),
        delay: 700,
      },
    ],
    choices: [
      {
        id: "c1",
        text: "أرسل عينة للوسيط",
        nextNodeId: "clinic_send_sample",
        danger: true,
      },
      {
        id: "c2",
        text: "توقف قبل النقل",
        nextNodeId: "inside_stop_reflection",
        danger: false,
      },
      {
        id: "c3",
        text: "تبلغ الجهة فوراً",
        nextNodeId: "report_from_inside",
        danger: false,
      },
    ],
  },

  clinic_send_sample: {
    id: "clinic_send_sample",
    type: "story",
    title: "العينة هنا أكثر قسوة",
    narrative: `
      مجرد إرسال جزء محدود من بيانات طبية أو شبه طبية لا يمكن وصفه بأنه خطأ تقني عابر.
      لأن القيمة السوقية لهذا النوع من البيانات تنبع من حساسيته نفسها.
      ما يشتريه الوسيط هنا ليس معلومة فقط، بل قابلية الضغط على أشخاص لا حول لهم في هذه السلسلة.
    `.trim(),
    subtext: `
      لا تحتاج السوق السوداء إلى ملف كامل كي تبدأ استغلالها.
      يكفي أحياناً جزء صغير يثبت النوع ويكشف المسار.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "انتظر الرد",
        nextNodeId: "clinic_broker_push",
        danger: true,
      },
      {
        id: "c2",
        text: "أبلغ الجهة فوراً",
        nextNodeId: "report_after_sample",
        danger: false,
      },
    ],
  },

  clinic_broker_push: {
    id: "clinic_broker_push",
    type: "message",
    narrative: `
      الوسيط لا يعلق على البعد الإنساني إ �لاقاً.
      هذا ما يميز هذه السوق: القدرة على إزالة الإنسان من المعادلة اللغوية مع أنه هو موضوع الصفقة من الأساس.
    `.trim(),
    messageFrom: "الوسيط",
    messageContent: `
      النوع جيد.
      نحتاج سجلات أكثر مع ما يسمح بالتصنيف الزمني وربط الملف بالشخص.
      هذا المجال مطلوب.
      لا تتوقف الآن.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "تستمر",
        nextNodeId: "clinic_patient_echo",
        danger: true,
      },
      {
        id: "c2",
        text: "تنسحب وتطلب مساراً قانونياً للتعامل مع التهديد",
        nextNodeId: "lawyer_consult",
        danger: false,
      },
      {
        id: "c3",
        text: "تبلغ الجهة على الفور",
        nextNodeId: "report_after_sample",
        danger: false,
      },
    ],
  },

  clinic_patient_echo: {
    id: "clinic_patient_echo",
    type: "message",
    narrative: `
      تتلقى في نفس الليلة رسالة من قريب يطلب رأيك في موضوع صحي خاص.
      لا علاقة للرسالة بالجهة المستهدفة، لكنها تُسقط الحاجز الأخير بين المجرد والإنساني.
      تتذكر أن الناس يكتبون ويزورون ويكشفون ضعفهم على أساس أن هناك حرمة وحدوداً واضحة.
    `.trim(),
    messageFrom: "قريب لك",
    messageContent: `
      لا أريد أن يعرف أحد بهذا الموضوع الآن.
      حتى داخل العائلة أنا متردد.
      أحياناً المعلومة الطبية الصغيرة تتعب الإنسان أكثر من المرض نفسه إذا خرجت للناس.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "تتراجع لأن المعنى أصبح مباشراً",
        nextNodeId: "inside_stop_reflection",
        danger: false,
      },
      {
        id: "c2",
        text: "تواصل رغم ذلك",
        nextNodeId: "clinic_full_delivery",
        danger: true,
      },
    ],
  },

  clinic_full_delivery: {
    id: "clinic_full_delivery",
    type: "story",
    title: "التسليم",
    narrative: `
      يحدث التسليم بهدوء لا يليق بفظاعة ما يعنيه.
      لا ترى الضحايا، ولا تسمع أصواتهم، ولا تشاهد ارتباكهم حين يكتشفون أن ما ظنوه محمياً صار مادة تداول.
      لكن غياب المشهد لا يعني غياب الحقيقة.
      أنت تعرف جيداً ماذا يمكن أن يحدث بهذا النوع من البيانات.
    `.trim(),
    subtext: `
      التحويل المالي يصل، لكنه لا يشتري لك راحة.
      فقط يثبت أنك بعت شيئاً لا تملك حق التصرف فيه.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "تراقب ما بعد ذلك",
        nextNodeId: "clinic_aftermath",
        danger: true,
      },
      {
        id: "c2",
        text: "تتجه إلى بلاغ متأخر",
        nextNodeId: "late_report_clinic",
        danger: false,
      },
    ],
  },

  clinic_aftermath: {
    id: "clinic_aftermath",
    type: "alert",
    alertLevel: "critical",
    title: "الضرر غير التقني",
    narrative: `
      تبدأ تسمع عن مراجعين اشتكوا من رسائل مريبة، أو اتصالات تشير إلى معلومات لا يفترض أن تكون معروفة خارج العيادة.
      هذا النوع من الضرر لا يُقاس فقط بتكلفة الاستجابة الفنية.
      يُقاس بالخوف، والوصمة، والشك، وتآكل الثقة في مؤسسة يفترض أنها مأمن.
    `.trim(),
    subtext: `
      بعض الأضرار هنا لا تُرى في لوحة مؤشرات تقنية.
      لكنها تبقى عند الناس أطول بكثير من بقاء الخبر في النشرات.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "تصمت",
        nextNodeId: "silence_before_knock",
        danger: true,
      },
      {
        id: "c2",
        text: "تستشير محامياً",
        nextNodeId: "lawyer_consult",
        danger: false,
      },
      {
        id: "c3",
        text: "تبلغ",
        nextNodeId: "late_report_clinic",
        danger: false,
      },
    ],
  },

  late_report_clinic: {
    id: "late_report_clinic",
    type: "story",
    title: "بلاغ متأخر في ملف حساس",
    narrative: `
      البلاغ هنا لا يمحو حقيقة أن الخصوصية انتُهكت بالفعل.
      لكنه قد يساعد على الحد من التوسع، وتحذير المتضررين، وإيقاف سلسلة إعادة البيع أو الاستخدام اللاحق.
      في هذا الطريق لا توجد نهاية نظيفة، لكن توجد درجات مختلفة من الصراحة والمسؤولية.
    `.trim(),
    subtext: `
      أنت لا تصبح جيداً بمجرد أنك تكلمت.
      لكنك على الأقل لا تواصل الازدواجية نفسها.
    `.trim(),
    nextNodeId: "ending_reckoning_reported",
  },

  inside_logistics_overview: {
    id: "inside_logistics_overview",
    type: "story",
    title: "من الداخل: النقل والتخزين",
    narrative: `
      قد يبدو هذا الملف أقل حساسية لأول وهلة من الرواتب أو العيادات.
      لكنك عندما ترى عناوين، ومواعيد، ومسارات، وأسماء جهات استلام، تدرك أن هذه ليست تفاصيل محايدة.
      هي خريطة حركة يمكن أن تسهّل سرقة أو انتحالاً أو استهدافاً مادياً أو احتيالاً مقنعاً.
    `.trim(),
    subtext: `
      أحياناً لا يكون أخطر ما في البيانات هو سريتها المباشرة، بل قدرتها على تمكين أضرار لاحقة خارج الشاشة.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "استعرض مزيداً من البيانات",
        nextNodeId: "logistics_preview",
        danger: true,
      },
      {
        id: "c2",
        text: "توقف فوراً",
        nextNodeId: "inside_stop_reflection",
        danger: false,
      },
      {
        id: "c3",
        text: "أبلغ الجهة",
        nextNodeId: "report_from_inside",
        danger: false,
      },
    ],
  },

  logistics_preview: {
    id: "logistics_preview",
    type: "terminal",
    title: "معاينة لا ينبغي أن تراها",
    narrative: `
      كل عنوان هنا نقطة على خريطة حياة شخص أو مؤسسة.
      وكل موعد تسليم أو تخزين قد يتحول في يد خاطئة إلى فرصة استهداف مادي لا علاقة لها بعالم الحواسيب في الظاهر.
    `.trim(),
    terminalCommands: [
      {
        command: "cat route_preview.txt",
        output: `
          shipment_ref | city | delivery_window | receiver_type
          sh-8801 | Riyadh | morning slot | residential
          sh-8820 | Jeddah | afternoon slot | small business
          sh-8844 | Dammam | evening slot | warehouse contact
        `.trim(),
        delay: 900,
      },
      {
        command: "cat physical_risk_note.txt",
        output: `
          بيانات الحركة والعناوين قد تمكّن احتيالاً ميدانياً أو استهدافاً لطرود أو مواقع أو أشخاص.
          الأثر هنا قد يخرج من الفضاء الرقمي إلى المادي بسرعة.
        `.trim(),
        delay: 700,
      },
    ],
    choices: [
      {
        id: "c1",
        text: "أرسل عينة للوسيط",
        nextNodeId: "logistics_send_sample",
        danger: true,
      },
      {
        id: "c2",
        text: "توقف",
        nextNodeId: "inside_stop_reflection",
        danger: false,
      },
      {
        id: "c3",
        text: "بلّغ الجهة فوراً",
        nextNodeId: "report_from_inside",
        danger: false,
      },
    ],
  },

  logistics_send_sample: {
    id: "logistics_send_sample",
    type: "story",
    title: "العينة كافية لفتح السوق",
    narrative: `
      ترسل عينة صغيرة، لكنها تكفي لتأكيد أن البيانات حقيقية وقابلة للاستثمار.
      في عالم الجرائم، القيمة ليست في الحجم فقط بل في قابلية الاستخدام.
      والبيانات اللوجستية المغرية هي تلك التي تبدو عادية لكنها قابلة للربط والتحويل إلى استهداف عملي.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "انتظر رد الوسيط",
        nextNodeId: "logistics_broker_push",
        danger: true,
      },
      {
        id: "c2",
        text: "بلّغ الآن",
        nextNodeId: "report_after_sample",
        danger: false,
      },
    ],
  },

  logistics_broker_push: {
    id: "logistics_broker_push",
    type: "message",
    narrative: `
      الرد يحمل نوعاً آخر من البرود.
      الوسيط لا يحتاج أن يقول لك صراحة ماذا سيُفعل بهذه البيانات.
      يكفي أنه يطلب ما يسمح بالتصنيف والتوقيت والموثوقية.
    `.trim(),
    messageFrom: "الوسيط",
    messageContent: `
      جيد.
      نحتاج توسعاً في نطاق المدن والمواعيد والعناوين القابلة للاعتماد.
      كلما كانت البيانات أقرب للزمن الحقيقي زادت قيمتها.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "توسع",
        nextNodeId: "logistics_realization",
        danger: true,
      },
      {
        id: "c2",
        text: "تنسحب",
        nextNodeId: "blackmail_opening",
        danger: true,
      },
      {
        id: "c3",
        text: "تبلّغ",
        nextNodeId: "report_after_sample",
        danger: false,
      },
    ],
  },

  logistics_realization: {
    id: "logistics_realization",
    type: "story",
    title: "الخروج من الشاشة",
    narrative: `
      هنا تدرك أن الأذى الممكن لم يعد رقمياً فقط.
      ما بين عنوان ووقت وتسلسل شحنة، يمكن أن يُبنى انتحال لمندوب، أو استهداف لطرد، أو احتيال على مستلم، أو تتبع لعادات حركة.
      الجرائم المعلوماتية لا تبقى دائماً داخل الأجهزة.
      أحياناً تكون الشاشة مجرد نقطة البداية.
    `.trim(),
    subtext: `
      كل خطوة إضافية تجعل احتمال الأذى المادي أقرب.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "تكمل رغم ذلك",
        nextNodeId: "logistics_delivery_done",
        danger: true,
      },
      {
        id: "c2",
        text: "تتوقف الآن",
        nextNodeId: "lawyer_consult",
        danger: false,
      },
    ],
  },

  logistics_delivery_done: {
    id: "logistics_delivery_done",
    type: "story",
    title: "التسليم تم",
    narrative: `
      تصل الدفعة للوسيط ويصل المال إليك.
      لا تعرف أين ستذهب البيانات تحديداً بعد ذلك، لكنك تعرف ما يكفي لتفهم أنك شاركت في تهيئة ضرر يتجاوز العالم الرقمي.
      وهذه المعرفة وحدها تكفي لسلب أي وهم بأنك كنت مجرد ناقل محايد.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "تنتظر النتائج",
        nextNodeId: "logistics_aftermath",
        danger: true,
      },
      {
        id: "c2",
        text: "تتجه إلى بلاغ متأخر",
        nextNodeId: "late_report_logistics",
        danger: false,
      },
    ],
  },

  logistics_aftermath: {
    id: "logistics_aftermath",
    type: "alert",
    alertLevel: "critical",
    title: "إشارات ميدانية",
    narrative: `
      تبدأ تظهر أخبار صغيرة ومتناثرة:
      تلاعب في مواعيد، شكاوى من تواصل ينتحل صفة مندوبين، ارتباك في تتبع بعض الشحنات، وبلاغات عن محاولات احتيال تعتمد على تفاصيل لا يفترض أن يعرفها أحد خارج الجهة.
      عندها ترى الأثر الكامل: بيانات خرجت من الشاشة ثم عادت إلى الناس كخطر مادي.
    `.trim(),
    subtext: `
      هذا النوع من الضرر يثبت أن كثيراً من الجرائم المعلوماتية ليست افتراضية كما يتخيل البعض.
      آثارها يمكن أن تكون ملموسة جداً.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "تصمت وتختفي",
        nextNodeId: "silence_before_knock",
        danger: true,
      },
      {
        id: "c2",
        text: "تبلغ",
        nextNodeId: "late_report_logistics",
        danger: false,
      },
      {
        id: "c3",
        text: "تتواصل مع محامٍ",
        nextNodeId: "lawyer_consult",
        danger: false,
      },
    ],
  },

  late_report_logistics: {
    id: "late_report_logistics",
    type: "story",
    title: "بلاغ متأخر في ملف لوجستي",
    narrative: `
      التبليغ هنا قد يساعد على وقف سلسلة سوء الاستخدام، وتنبيه العملاء أو المستلمين، وتشديد إجراءات التحقق.
      لكنه لا يزيل أنك شاركت أصلاً في فتح هذا الباب.
      المسار القانوني والمهني بعد ذلك لن يكون سهلاً، لكنه يبقى أكثر شرفاً من الاستمرار في الإنكار.
    `.trim(),
    nextNodeId: "ending_reckoning_reported",
  },

  inside_stop_reflection: {
    id: "inside_stop_reflection",
    type: "story",
    title: "أنت ما زلت تملك لحظة اختيار",
    narrative: `
      تتوقف.
      قد يبدو هذا القرار صغيراً مقارنة بما حدث قبله، لكنه ليس صغيراً.
      التوقف في منتصف الطريق لا يجعلك بريئاً إذا كنت قد دخلت فعلاً، لكنه يمنعك من التورط بدرجات أعمق ويعيد لك شيئاً من قدرتك على النظر إلى نفسك بوضوح.
    `.trim(),
    subtext: `
      الآن لديك خياران واقعيان:
      إما الصمت والاختباء، أو الاعتراف الجزئي على الأقل بما يلزم لمنع الضرر الأكبر.
    `.trim(),
    choices: [
      {
        id: "c1",
        text: "أصمت وأختفي",
        nextNodeId: "silent_guilt",
        danger: true,
      },
      {
        id: "c2",
        text: "أبلغ الجهة بما حدث",
        nextNodeId: "report_from_inside",
        danger: false,
      },
      {
        id: "c3",
        text: "أستشير محامياً أولاً",
        nextNodeId: "lawyer_consult",
        danger: false,
      },
    ],
  },

  report_from_inside: {
    id: "report_from_inside",
    type: "story",
    title: "بلاغ من نقطة غير مريحة",
    narrative: `
      تصوغ رسالة لا تدّعي فيها بطولة.
      توضح أن هناك وصولاً غير مشروعاً أو محاولة قريبة من ذلك، وأن الجهة تحتاج إلى احتواء عاجل، ومراجعة سجلات، وتقييد إضافي، وتحقق داخلي.
      البلاغ الصادق هنا أصعب من الهروب، لأنه يجبرك على لمس الحقيقة من دون مكياج.
    `.trim(),
    subtext: `
      الرد الأولي من الجهة ليس عاطفياً.
      هو مهني، حذر، ومتمسك بالإجراءات.
      وهذا بالضبط ما ينبغي أن يكون.
    `.trim(),
    nextNodeId: "ending_reckoning_reported",
  },

  report_after_sample: {
    id: "report_after_sample",
    type: "story",
    title: "البلاغ بعد وقوع جزء من الضرر",
    narrative: `
      تبلغ بعد أن خرجت عينة أو جزء من البيانات.
      لا تحاول تجميل ذلك، لأن التجميل لن يخدم أحداً.
      كل ما يمكنك فعله الآن هو أن تكون دقيقاً في ما خرج، وكيف خرج، وما هي المسارات المحتملة لاستغلاله، ومن هو الوسيط الذي تواصل معك.
    `.trim(),
    subtext: `
      أنت لست منقذاً هنا.
      أنت طرف توقف متأخراً وقرر أن يكف عن مضاعفة الكذب.
    `.trim(),
    nextNodeId: "ending_reckoning_reported",
  },

  ending_decline_early: {
    id: "ending_decline_early",
    type: "ending",
    ending: "repent",
    endingTitle: "نهاية: الانسحاب المبكر",
    narrative: `
      لم تحصل على المال السريع، ولم تنحل كل مشاكلك المالية في ليلة.
      لكنك منعت نفسك من عبور خط يصعب جداً العبور العكسي منه.
      أحياناً يكون القرار الصحيح مخيباً لمن يريد حلاً فورياً، لكنه يظل القرار الذي يبقي حياتك قابلة للإصلاح.
    `.trim(),
    endingMessage: `
      كثير من مسارات الجريمة التقنية تبدأ بضغط مالي وتبرير أخلاقي تدريجي.
      قطع الطريق في بدايته ليس ضعفاً، بل فهم مبكر لكيفية عمل الانزلاق.
    `.trim(),
  },

  ending_family_support: {
    id: "ending_family_support",
    type: "ending",
    ending: "repent",
    endingTitle: "نهاية: نجاة بدعم إنساني",
    narrative: `
      لم يكن ما أنقذك درساً تقنياً ولا نظام حماية متقدماً.
      كانت رسالة من شخص يعرفك كإنسان قبل أن يعرف مهاراتك.
      أحياناً يمنعنا الناس القريبون من ارتكاب أسوأ ما فينا فقط لأنهم يذكروننا بمن كنا قبل أن يفسدنا الضغط.
    `.trim(),
    endingMessage: `
      الدعم الاجتماعي لا يحل الأزمات دائماً، لكنه كثيراً ما يقطع الطريق على القرارات الاندفاعية التي تغيّر حياة كاملة.
    `.trim(),
  },

  ending_report_early: {
    id: "ending_report_early",
    type: "ending",
    ending: "repent",
    endingTitle: "نهاية: التبليغ قبل الاتساع",
    narrative: `
      اخترت التبليغ قبل أن تدخل بعيداً أو قبل أن تتسع السلسلة.
      لن يصفق لك أحد لأنك كنت قريباً من الخط أصلاً، لكنك منعت ضرراً أكبر، وهذا ليس تفصيلاً صغيراً.
      بعض القرارات الصحيحة تأتي بعد نية سيئة، لكنها تبقى أفضل من تحويل النية إلى أذى فعلي واسع.
    `.trim(),
    endingMessage: `
      التبليغ المبكر عن مسارات الاستهداف أو الوساطة أو تداول الوصول يمكن أن يغيّر كثيراً من نتائج الحوادث ويمنع تضخمها.
    `.trim(),
  },

  ending_report_after_contact: {
    id: "ending_report_after_contact",
    type: "ending",
    ending: "repent",
    endingTitle: "نهاية: توقف متأخر لكن مسؤول",
    narrative: `
      اشتريت الحزمة أو لمست البداية، ثم توقفت وأبلغت.
      هذا لا يجعلك خارج المشكلة، لكنه يضعك على الأقل خارج منطق الاستمرار والإنكار.
      الطريق بعد ذلك لن يكون سهلاً، لكنك لم تسمح لنفسك بأن تصير ترساً كاملاً في آلة الأذى.
    `.trim(),
    endingMessage: `
      في القضايا الواقعية، التوقف المبكر، والتعاون، وعدم توسيع الضرر، كلها عناصر ذات أثر مهم، حتى مع بقاء المسؤولية الأصلية قائمة.
    `.trim(),
  },

  ending_silent_damage: {
    id: "ending_silent_damage",
    type: "ending",
    ending: "escape",
    endingTitle: "نهاية: صمت لا يشبه النجاة",
    narrative: `
      لم يأتك اتصال في تلك الليلة، وربما لم يأتك في الأسبوع التالي.
      لكنك لم تخرج من القصة فعلاً.
      بقيت تعرف أن شيئاً خطيراً يتحرك وأنت اخترت أن تنسحب بصمت من دون أن تحاول تقليص أثره.
      هذا النوع من الصمت لا يمنح سلاماً، بل يؤجل المواجهة ويجعلها أكثر عفناً في الداخل.
    `.trim(),
    endingMessage: `
      غياب المحاسبة الفورية لا يعني غياب الضرر، ولا يعني أن القرار كان آمناً أو مقبولاً أو قابلاً للنسيان.
    `.trim(),
  },

  ending_reckoning_reported: {
    id: "ending_reckoning_reported",
    type: "ending",
    ending: "repent",
    endingTitle: "نهاية: مواجهة لا تريح لكنها أصدق",
    narrative: `
      اخترت الاعتراف بما يلزم والتوقف عن توسيع السلسلة.
      لا توجد هنا نهاية ناعمة ولا تبرئة عاطفية.
      هناك فقط انتقال من عقلية الإنكار إلى عقلية تحمل العاقبة، ومحاولة تقليل الضرر، وقبول أن المهارة لا تمنحك استثناءً من القانون أو من الأثر الإنساني.
      للمرة الأولى منذ بداية هذه القصة، تصبح الحقيقة أوضح من الأعذار.
    `.trim(),
    endingMessage: `
      الفرق بين المختص القانوني والمعتدي غير المصرح له ليس في الأدوات وحدها، بل في التفويض، والحدود، والهدف، والاستعداد لتحمل المسؤولية.
    `.trim(),
  },

  ending_caught_general: {
    id: "ending_caught_general",
    type: "ending",
    ending: "caught",
    endingTitle: "نهاية: الانكشاف",
    narrative: `
      لم يكن الانكشاف مشهداً صاخباً كما تتخيله الأعمال الدرامية.
      كان نتيجة طبيعية لتراكم آثار رقمية، ورسائل، وتحويلات، وربط بين أطراف، وتوقيتات، وسجلات، وشهادات، وتحقيقات لا تحتاج إلى خيال كبير كي تصل إلى من شارك.
      في النهاية لا تبقى معك صورة الشخص الذكي الذي عرف من أين يدخل.
      تبقى معك صورة الشخص الذي أقنع نفسه أن الحاجة تعطيه حقاً في التعدي.
    `.trim(),
    endingMessage: `
      الجرائم المعلوماتية ليست لعباً تجريبياً.
      آثارها القانونية والمهنية والاجتماعية حقيقية، وغالباً ما تكون أعنف وأطول من المكسب السريع الذي يبدأ منها.
    `.trim(),
  },
};

export const firstNodeId = "start";

import type { Locale } from "./locales";
import type { Mode, Tone } from "./types";

export type PickItem = { id: string; label: string; prompt: string };

export type UiCopy = {
  languageLabel: string;
  autoLabel: string;
  subtitle: string;
  voiceLabel: string;
  tones: Record<Tone, { label: string; hint: string }>;
  modes: Record<Mode, { label: string; hint: string }>;
  modesAria: string;
  send: string;
  newConversation: string;
  you: string;
  typing: string;
  messageAria: string;
  placeholders: Record<Mode, string>;
  disclaimer: string;
  demoBanner: string;
  demoNotice: string;
  genericError: string;
  streamError: string;
  welcome: Record<Mode, Record<Tone, string>>;
  demoReply: Record<Mode, string>;
  chatStarters: PickItem[];
  storyThemes: PickItem[];
  learnTopics: PickItem[];
};

const en: UiCopy = {
  languageLabel: "Language",
  autoLabel: "Auto (browser)",
  subtitle: "All-ages tutor · any language",
  voiceLabel: "Voice",
  tones: {
    kid: { label: "Kid", hint: "Simpler words" },
    teen: { label: "Teen", hint: "Everyday voice" },
    adult: { label: "Adult", hint: "A bit more depth" },
  },
  modes: {
    chat: { label: "Chat", hint: "Tutor chat in any language" },
    stories: { label: "Stories", hint: "Stories you help steer" },
    learn: { label: "Learn", hint: "Quizzes that teach" },
  },
  modesAria: "Modes",
  send: "Send",
  newConversation: "New conversation",
  you: "You",
  typing: "Venture 1 is typing",
  messageAria: "Message for Venture 1",
  placeholders: {
    chat: "Ask to learn something — any language…",
    stories: "What happens next?",
    learn: "Your answer, or pick a topic…",
  },
  disclaimer:
    "A parent or guardian should stay nearby when kids use Venture 1. This is a family-safe tutor, not a substitute for a teacher or a person — and AI can make mistakes. Write in any language. Don’t share your real name, address, school, or phone number.",
  demoBanner:
    "Live replies need an OPENAI_API_KEY. Until that is set, Venture 1 uses a short demo message. Add the key locally or in Railway to chat for real.",
  demoNotice: "That last reply was a demo because no API key was found.",
  genericError: "Something went wrong. Please try again.",
  streamError: "This browser couldn't stream the reply.",
  welcome: {
    chat: {
      kid: "Hi — I'm Venture 1, your tutor. Ask me about school, animals, space, how things work, or anything you want to learn. Write in any language — I'll answer in yours. What should we start with?",
      teen: "Hey, I'm Venture 1 — a tutor for whatever you're working on. Science, history, languages, sports, homework, everyday life. Write in any language and I'll match it. What's on your mind?",
      adult: "Hello — I'm Venture 1, a family-safe personal tutor with a wide brief. Ask me to explain, practice, or just talk. I reply in your language, and I can teach one language using another. Where should we start?",
    },
    stories: {
      kid: "Let's make a story together — I can tell it in whatever language you write in. Pick a theme, or tell me an idea. I'll start, then you choose what happens next.",
      teen: "Want a short adventure? Pick a theme or give me a spark. I'll write in your language, then you decide the next move.",
      adult: "We can spin a short, interactive tale in your language. Choose a theme or describe a setting. I'll open the scene; you steer what follows.",
    },
    learn: {
      kid: "Let's practice with a quiz or a riddle. Pick a topic, or say \"surprise me.\" I'll explain as we go — wrong guesses are how we learn. Any language is fine.",
      teen: "Tutor time: pick a topic for a quiz or riddle, or tell me to surprise you. I'll explain the idea after each answer. No shame for misses. I'll use your language.",
      adult: "A short quiz or practice set, if you like — in your language. Choose a topic or ask me to pick. I'll teach the idea after each answer, then offer a next step.",
    },
  },
  demoReply: {
    chat: "I'd love to talk — I just need an API key to think with you live. A parent or the person who set up this app can add OPENAI_API_KEY (see the README). Until then, try Stories or Learn.",
    stories: "A real story needs the live model, which starts when OPENAI_API_KEY is set. You can still pick a theme to see how it works.",
    learn: "Quizzes light up when OPENAI_API_KEY is set. Sample riddle: I have keys but no locks. What am I? (A keyboard.)",
  },
  chatStarters: [
    { id: "curious", label: "Teach me something interesting", prompt: "Teach me one interesting, family-friendly idea. Explain it step by step with an example, then check if I follow." },
    { id: "homework", label: "Help me understand this", prompt: "Help me understand something I'm stuck on. Ask what the topic is, then tutor me step by step without doing the work for me if it is homework." },
    { id: "language", label: "Practice another language", prompt: "Help me practice another language. Ask which language I want to learn and which language I want explanations in, then start a short lesson." },
    { id: "joke", label: "Tell a clean joke", prompt: "Tell a clever, clean joke, then ask if I want another or a tiny lesson hidden in the humor." },
  ],
  storyThemes: [
    { id: "dragons", label: "Dragons", prompt: "Start a short interactive story about dragons. Family-safe, vivid, then ask what happens next." },
    { id: "space", label: "Space", prompt: "Start a short interactive story set in space. Family-safe, vivid, then ask what happens next." },
    { id: "animals", label: "Animals", prompt: "Start a short interactive story starring clever animals. Family-safe, vivid, then ask what happens next." },
    { id: "mystery", label: "Mystery", prompt: "Start a short cozy mystery story (no gore). Family-safe, vivid, then ask what happens next." },
    { id: "folklore", label: "Folklore", prompt: "Start a short story inspired by gentle folklore. Family-safe, then ask what happens next." },
    { id: "everyday", label: "Everyday adventure", prompt: "Start a short story about an ordinary day that becomes a small adventure. Family-safe, then ask what happens next." },
  ],
  learnTopics: [
    { id: "animals", label: "Animals", prompt: "Start a short tutoring quiz about animals. One question at a time." },
    { id: "numbers", label: "Numbers", prompt: "Start a short numbers or simple math tutoring quiz. One question at a time." },
    { id: "space", label: "Space", prompt: "Start a short tutoring quiz about space. One question at a time." },
    { id: "kindness", label: "Kindness", prompt: "Start a short quiz about kindness. One question at a time." },
    { id: "science", label: "Science", prompt: "Start a short everyday science tutoring quiz. One question at a time." },
    { id: "wordplay", label: "Wordplay", prompt: "Start with a riddle or word puzzle. One at a time." },
    { id: "history", label: "History", prompt: "Start a short family-safe history or geography quiz. One question at a time." },
    { id: "arts", label: "Arts & music", prompt: "Start a short tutoring quiz about art or music. One question at a time." },
  ],
};

const es: UiCopy = {
  languageLabel: "Idioma",
  autoLabel: "Auto (navegador)",
  subtitle: "Tutor para todas las edades · cualquier idioma",
  voiceLabel: "Voz",
  tones: {
    kid: { label: "Niñez", hint: "Palabras más simples" },
    teen: { label: "Joven", hint: "Voz cotidiana" },
    adult: { label: "Adulto", hint: "Un poco más de profundidad" },
  },
  modes: {
    chat: { label: "Chat", hint: "Tutoría en cualquier idioma" },
    stories: { label: "Cuentos", hint: "Historias que tú diriges" },
    learn: { label: "Aprender", hint: "Quizzes que enseñan" },
  },
  modesAria: "Modos",
  send: "Enviar",
  newConversation: "Nueva conversación",
  you: "Tú",
  typing: "Venture 1 está escribiendo",
  messageAria: "Mensaje para Venture 1",
  placeholders: {
    chat: "Pide aprender algo — cualquier idioma…",
    stories: "¿Qué pasa después?",
    learn: "Tu respuesta, o elige un tema…",
  },
  disclaimer:
    "Un padre o tutor debe estar cerca cuando los niños usen Venture 1. Es un tutor familiar, no un sustituto de un maestro o de una persona, y la IA puede equivocarse. Escribe en cualquier idioma. No compartas tu nombre real, dirección, escuela o teléfono.",
  demoBanner:
    "Las respuestas en vivo necesitan OPENAI_API_KEY. Hasta entonces, Venture 1 usa un mensaje de demostración. Añade la clave en local o en Railway.",
  demoNotice: "La última respuesta fue una demo porque no hay clave de API.",
  genericError: "Algo salió mal. Inténtalo de nuevo.",
  streamError: "Este navegador no pudo mostrar la respuesta en vivo.",
  welcome: {
    chat: {
      kid: "Hola — soy Venture 1, tu tutor. Pregúntame por el colegio, los animales, el espacio o lo que quieras aprender. Escribe en cualquier idioma. ¿Con qué empezamos?",
      teen: "Hey, soy Venture 1 — un tutor para lo que estés trabajando. Ciencia, historia, idiomas, deberes. Escribe en tu idioma y te sigo. ¿Qué tienes en mente?",
      adult: "Hola — soy Venture 1, un tutor personal seguro para la familia. Pídeme explicar, practicar o solo conversar. Respondo en tu idioma. ¿Por dónde empezamos?",
    },
    stories: {
      kid: "Hagamos un cuento juntos. Elige un tema o dime una idea. Yo empiezo y tú decides qué pasa después.",
      teen: "¿Una aventura corta? Elige un tema o dame una pista. Escribo en tu idioma y tú eliges el siguiente paso.",
      adult: "Podemos tejer un relato interactivo en tu idioma. Elige un tema o un escenario. Yo abro la escena; tú la diriges.",
    },
    learn: {
      kid: "Practiquemos con un quiz o una adivinanza. Elige un tema o di «sorpréndeme». Explico al paso; equivocarse es aprender.",
      teen: "Hora de tutoría: elige un tema o pide sorpresa. Explico la idea tras cada respuesta. Sin vergüenza por fallar.",
      adult: "Un quiz breve en tu idioma, si quieres. Elige un tema o pídeme que elija. Enseño la idea y ofrezco el siguiente paso.",
    },
  },
  demoReply: {
    chat: "Me encantaría hablar — hace falta OPENAI_API_KEY para el modelo en vivo. Mientras tanto, prueba Cuentos o Aprender.",
    stories: "Una historia de verdad necesita OPENAI_API_KEY. Aún puedes elegir un tema para ver cómo funciona.",
    learn: "Los quizzes se encienden con OPENAI_API_KEY. Adivinanza de muestra: tengo teclas pero no cerraduras. ¿Qué soy? (Un teclado.)",
  },
  chatStarters: [
    { id: "curious", label: "Enséñame algo interesante", prompt: "Enséñame una idea interesante y apta para toda la familia. Explícala paso a paso con un ejemplo y comprueba si te sigo." },
    { id: "homework", label: "Ayúdame a entender esto", prompt: "Ayúdame a entender algo que no me sale. Pregunta el tema y enséñame paso a paso, sin hacer los deberes por mí." },
    { id: "language", label: "Practicar otro idioma", prompt: "Ayúdame a practicar otro idioma. Pregunta cuál quiero aprender y en qué idioma quiero las explicaciones." },
    { id: "joke", label: "Cuenta un chiste limpio", prompt: "Cuenta un chiste ingenioso y limpio, y pregunta si quiero otro o una mini lección." },
  ],
  storyThemes: [
    { id: "dragons", label: "Dragones", prompt: "Empieza un cuento interactivo corto sobre dragones. Seguro para la familia. Luego pregunta qué pasa después." },
    { id: "space", label: "Espacio", prompt: "Empieza un cuento interactivo corto en el espacio. Seguro para la familia. Luego pregunta qué pasa después." },
    { id: "animals", label: "Animales", prompt: "Empieza un cuento interactivo con animales listos. Seguro para la familia. Luego pregunta qué pasa después." },
    { id: "mystery", label: "Misterio", prompt: "Empieza un misterio acogedor (sin violencia). Seguro para la familia. Luego pregunta qué pasa después." },
    { id: "folklore", label: "Folclore", prompt: "Empieza un cuento inspirado en el folclore suave. Seguro para la familia. Luego pregunta qué pasa después." },
    { id: "everyday", label: "Aventura cotidiana", prompt: "Empieza un cuento sobre un día normal que se vuelve una pequeña aventura. Luego pregunta qué pasa después." },
  ],
  learnTopics: [
    { id: "animals", label: "Animales", prompt: "Empieza un quiz de tutoría sobre animales. Una pregunta cada vez." },
    { id: "numbers", label: "Números", prompt: "Empieza un quiz de números o mates sencillas. Una pregunta cada vez." },
    { id: "space", label: "Espacio", prompt: "Empieza un quiz de tutoría sobre el espacio. Una pregunta cada vez." },
    { id: "kindness", label: "Amabilidad", prompt: "Empieza un quiz sobre la amabilidad. Una pregunta cada vez." },
    { id: "science", label: "Ciencia", prompt: "Empieza un quiz de ciencia cotidiana. Una pregunta cada vez." },
    { id: "wordplay", label: "Palabras", prompt: "Empieza con una adivinanza o juego de palabras. Una cada vez." },
    { id: "history", label: "Historia", prompt: "Empieza un quiz de historia o geografía, apto para la familia. Una pregunta cada vez." },
    { id: "arts", label: "Arte y música", prompt: "Empieza un quiz de arte o música. Una pregunta cada vez." },
  ],
};

const fr: UiCopy = {
  languageLabel: "Langue",
  autoLabel: "Auto (navigateur)",
  subtitle: "Tuteur pour tous les âges · toutes les langues",
  voiceLabel: "Voix",
  tones: {
    kid: { label: "Enfant", hint: "Mots plus simples" },
    teen: { label: "Ado", hint: "Voix du quotidien" },
    adult: { label: "Adulte", hint: "Un peu plus de profondeur" },
  },
  modes: {
    chat: { label: "Chat", hint: "Tutorat dans votre langue" },
    stories: { label: "Histoires", hint: "Des récits que vous guidez" },
    learn: { label: "Apprendre", hint: "Quiz qui enseignent" },
  },
  modesAria: "Modes",
  send: "Envoyer",
  newConversation: "Nouvelle conversation",
  you: "Vous",
  typing: "Venture 1 écrit",
  messageAria: "Message pour Venture 1",
  placeholders: {
    chat: "Demandez à apprendre — n’importe quelle langue…",
    stories: "Et ensuite ?",
    learn: "Votre réponse, ou choisissez un thème…",
  },
  disclaimer:
    "Un parent ou tuteur devrait rester près des enfants qui utilisent Venture 1. C’est un tuteur familial, pas un remplaçant d’un enseignant ou d’une personne — et l’IA peut se tromper. Écrivez dans n’importe quelle langue. Ne partagez pas votre vrai nom, adresse, école ou téléphone.",
  demoBanner:
    "Les réponses en direct ont besoin d’OPENAI_API_KEY. En attendant, Venture 1 envoie un message de démo. Ajoutez la clé en local ou sur Railway.",
  demoNotice: "La dernière réponse était une démo, car aucune clé API n’a été trouvée.",
  genericError: "Un problème est survenu. Réessayez.",
  streamError: "Ce navigateur n’a pas pu afficher la réponse en direct.",
  welcome: {
    chat: {
      kid: "Salut — je suis Venture 1, ton tuteur. Demande-moi l’école, les animaux, l’espace, ou tout ce que tu veux apprendre. Écris dans n’importe quelle langue. On commence par quoi ?",
      teen: "Hey, je suis Venture 1 — un tuteur pour ce que tu travailles. Sciences, histoire, langues, devoirs. Écris dans ta langue, je te suis. Qu’est-ce que tu as en tête ?",
      adult: "Bonjour — je suis Venture 1, tuteur personnel sûr pour toute la famille. Demandez-moi d’expliquer, de pratiquer, ou simplement de parler. Je réponds dans votre langue. Par où commence-t-on ?",
    },
    stories: {
      kid: "Inventons une histoire ensemble. Choisis un thème ou donne-moi une idée. Je commence, tu choisis la suite.",
      teen: "Une courte aventure ? Choisis un thème ou donne-moi une étincelle. J’écris dans ta langue, tu décides la suite.",
      adult: "Nous pouvons tisser un récit interactif dans votre langue. Choisissez un thème ou un décor. J’ouvre la scène ; vous la dirigez.",
    },
    learn: {
      kid: "Entraînons-nous avec un quiz ou une énigme. Choisis un thème ou dis « surprends-moi ». J’explique au fur et à mesure.",
      teen: "Cours express : choisis un thème ou demande une surprise. J’explique l’idée après chaque réponse. Pas de honte si tu te trompes.",
      adult: "Un court quiz dans votre langue, si vous voulez. Choisissez un thème ou laissez-moi choisir. J’enseigne l’idée, puis le pas suivant.",
    },
  },
  demoReply: {
    chat: "J’aimerais discuter — il faut OPENAI_API_KEY pour le modèle en direct. En attendant, essayez Histoires ou Apprendre.",
    stories: "Une vraie histoire a besoin d’OPENAI_API_KEY. Vous pouvez déjà choisir un thème pour voir le fonctionnement.",
    learn: "Les quiz s’allument avec OPENAI_API_KEY. Énigme : j’ai des touches mais pas de serrures. Qui suis-je ? (Un clavier.)",
  },
  chatStarters: [
    { id: "curious", label: "Apprends-moi quelque chose", prompt: "Enseigne-moi une idée intéressante et familiale. Explique étape par étape avec un exemple, puis vérifie si je suis." },
    { id: "homework", label: "Aide-moi à comprendre", prompt: "Aide-moi à comprendre quelque chose qui bloque. Demande le sujet, puis enseigne étape par étape sans faire le devoir à ma place." },
    { id: "language", label: "Pratiquer une autre langue", prompt: "Aide-moi à pratiquer une autre langue. Demande laquelle apprendre et dans quelle langue donner les explications." },
    { id: "joke", label: "Une blague propre", prompt: "Raconte une blague intelligente et propre, puis demande si j’en veux une autre." },
  ],
  storyThemes: [
    { id: "dragons", label: "Dragons", prompt: "Commence une courte histoire interactive sur des dragons. Familiale, puis demande la suite." },
    { id: "space", label: "Espace", prompt: "Commence une courte histoire interactive dans l’espace. Familiale, puis demande la suite." },
    { id: "animals", label: "Animaux", prompt: "Commence une courte histoire avec des animaux malins. Familiale, puis demande la suite." },
    { id: "mystery", label: "Mystère", prompt: "Commence un mystère doux (sans violence). Familial, puis demande la suite." },
    { id: "folklore", label: "Folklore", prompt: "Commence une histoire inspirée d’un folklore doux. Familiale, puis demande la suite." },
    { id: "everyday", label: "Aventure du quotidien", prompt: "Commence une histoire sur un jour ordinaire qui devient une petite aventure. Puis demande la suite." },
  ],
  learnTopics: [
    { id: "animals", label: "Animaux", prompt: "Commence un quiz tutoré sur les animaux. Une question à la fois." },
    { id: "numbers", label: "Nombres", prompt: "Commence un quiz de nombres ou de maths simples. Une question à la fois." },
    { id: "space", label: "Espace", prompt: "Commence un quiz tutoré sur l’espace. Une question à la fois." },
    { id: "kindness", label: "Gentillesse", prompt: "Commence un quiz sur la gentillesse. Une question à la fois." },
    { id: "science", label: "Sciences", prompt: "Commence un quiz de sciences du quotidien. Une question à la fois." },
    { id: "wordplay", label: "Mots", prompt: "Commence par une énigme ou un jeu de mots. Une à la fois." },
    { id: "history", label: "Histoire", prompt: "Commence un quiz d’histoire ou de géographie, familial. Une question à la fois." },
    { id: "arts", label: "Arts et musique", prompt: "Commence un quiz d’art ou de musique. Une question à la fois." },
  ],
};

const zh: UiCopy = {
  languageLabel: "语言",
  autoLabel: "自动（浏览器）",
  subtitle: "全年龄段导师 · 任意语言",
  voiceLabel: "语气",
  tones: {
    kid: { label: "儿童", hint: "更简单的用词" },
    teen: { label: "青少年", hint: "日常语气" },
    adult: { label: "成人", hint: "稍深一点" },
  },
  modes: {
    chat: { label: "聊天", hint: "用你的语言辅导" },
    stories: { label: "故事", hint: "你来决定接下来" },
    learn: { label: "学习", hint: "边玩边学的测验" },
  },
  modesAria: "模式",
  send: "发送",
  newConversation: "新对话",
  you: "你",
  typing: "Venture 1 正在输入",
  messageAria: "给 Venture 1 的消息",
  placeholders: {
    chat: "想学什么都可以——任何语言…",
    stories: "接下来会发生什么？",
    learn: "写下答案，或选一个主题…",
  },
  disclaimer:
    "孩子使用 Venture 1 时，请有家长或监护人在旁。这是家庭友好的导师，不能代替老师或真人，而且人工智能可能出错。可用任何语言书写。请不要分享真实姓名、地址、学校或电话。",
  demoBanner:
    "实时回复需要 OPENAI_API_KEY。设置之前，Venture 1 会使用演示回复。请在本地或 Railway 中添加密钥。",
  demoNotice: "上一条是演示回复，因为没有找到 API 密钥。",
  genericError: "出了点问题，请再试一次。",
  streamError: "这个浏览器无法流式显示回复。",
  welcome: {
    chat: {
      kid: "你好——我是导师 Venture 1。可以问学校、动物、太空，或任何想学的事。用你喜欢的语言写，我会用同样的语言回答。我们从哪里开始？",
      teen: "嗨，我是 Venture 1，帮你把事情讲明白。科学、历史、语言、作业都可以。用你的语言写就行。你在想什么？",
      adult: "你好——我是 Venture 1，面向全家人的安全私人导师。可以讲解、练习，或只是聊聊。我会用你的语言回答。从哪里开始？",
    },
    stories: {
      kid: "我们一起来编故事。选一个主题，或告诉我你的想法。我先开头，你来决定接下来。",
      teen: "来一段短冒险？选主题或给我一点灵感。我用你的语言写，你决定下一步。",
      adult: "我们可以用你的语言写一个互动短篇。选主题或场景。我打开画面，你来掌舵。",
    },
    learn: {
      kid: "我们来做测验或谜语。选主题，或说「给我惊喜」。我会一边讲一边鼓励你——答错也没关系。",
      teen: "辅导时间：选主题或让我来选。每题之后我会解释。答错不必难为情。",
      adult: "来一组简短测验也可以——用你的语言。选主题或让我选。每题后我会讲清要点，再给你下一步。",
    },
  },
  demoReply: {
    chat: "我很想和你聊——实时模型需要 OPENAI_API_KEY。在此之前，可以先试试故事或学习。",
    stories: "真正的故事需要设置 OPENAI_API_KEY。你仍可以点选主题，看看流程。",
    learn: "设置 OPENAI_API_KEY 后测验才会真正开始。样例谜语：我有许多键，却没有锁。我是什么？（键盘。）",
  },
  chatStarters: [
    { id: "curious", label: "教我一件有趣的事", prompt: "教我一个有趣、适合全家的知识点。请一步步解释并举例，然后确认我是否听懂。" },
    { id: "homework", label: "帮我弄懂这个", prompt: "帮我理解卡住的内容。先问主题，再一步步辅导。如果是作业，请不要直接替我做完。" },
    { id: "language", label: "练习另一种语言", prompt: "帮我练习另一种语言。先问我想学哪一门、希望用哪种语言讲解，然后开始一小课。" },
    { id: "joke", label: "讲个干净的笑话", prompt: "讲一个聪明、得体的笑话，然后问我还要不要下一个。" },
  ],
  storyThemes: [
    { id: "dragons", label: "龙", prompt: "开始一个关于龙的短篇互动故事。家庭友好，然后问接下来发生什么。" },
    { id: "space", label: "太空", prompt: "开始一个太空主题的短篇互动故事。家庭友好，然后问接下来发生什么。" },
    { id: "animals", label: "动物", prompt: "开始一个聪明动物为主角的短篇互动故事。家庭友好，然后问接下来发生什么。" },
    { id: "mystery", label: "谜案", prompt: "开始一个温和的谜案故事（不要血腥）。家庭友好，然后问接下来发生什么。" },
    { id: "folklore", label: "传说", prompt: "开始一个受温和民间传说启发的短篇故事。然后问接下来发生什么。" },
    { id: "everyday", label: "日常冒险", prompt: "开始一个普通的一天变成小冒险的故事。然后问接下来发生什么。" },
  ],
  learnTopics: [
    { id: "animals", label: "动物", prompt: "开始一个关于动物的辅导测验。一次一题。" },
    { id: "numbers", label: "数字", prompt: "开始一个数字或简单数学辅导测验。一次一题。" },
    { id: "space", label: "太空", prompt: "开始一个关于太空的辅导测验。一次一题。" },
    { id: "kindness", label: "友善", prompt: "开始一个关于友善的测验。一次一题。" },
    { id: "science", label: "科学", prompt: "开始一个日常科学辅导测验。一次一题。" },
    { id: "wordplay", label: "字谜", prompt: "先出一道谜语或字谜。一次一题。" },
    { id: "history", label: "历史", prompt: "开始一个家庭友好的历史或地理测验。一次一题。" },
    { id: "arts", label: "艺术与音乐", prompt: "开始一个艺术或音乐辅导测验。一次一题。" },
  ],
};

const ar: UiCopy = {
  languageLabel: "اللغة",
  autoLabel: "تلقائي (المتصفح)",
  subtitle: "معلّم لكل الأعمار · أي لغة",
  voiceLabel: "الأسلوب",
  tones: {
    kid: { label: "طفل", hint: "كلمات أبسط" },
    teen: { label: "يافع", hint: "أسلوب يومي" },
    adult: { label: "بالغ", hint: "عمق أكبر قليلاً" },
  },
  modes: {
    chat: { label: "محادثة", hint: "تدريس بلغتك" },
    stories: { label: "قصص", hint: "قصص توجّهها أنت" },
    learn: { label: "تعلّم", hint: "اختبارات تعلّم" },
  },
  modesAria: "الأوضاع",
  send: "إرسال",
  newConversation: "محادثة جديدة",
  you: "أنت",
  typing: "Venture 1 يكتب",
  messageAria: "رسالة إلى Venture 1",
  placeholders: {
    chat: "اطلب أن تتعلم شيئاً — بأي لغة…",
    stories: "ماذا يحدث بعد ذلك؟",
    learn: "أجب، أو اختر موضوعاً…",
  },
  disclaimer:
    "ينبغي أن يبقى أحد الوالدين أو الوصي قريباً عندما يستخدم الأطفال Venture 1. هذا معلّم آمن للأسرة، وليس بديلاً عن معلّم أو شخص حقيقي، وقد يخطئ الذكاء الاصطناعي. اكتب بأي لغة. لا تشارك اسمك الحقيقي أو عنوانك أو مدرستك أو هاتفك.",
  demoBanner:
    "الردود المباشرة تحتاج OPENAI_API_KEY. حتى ذلك الحين يستخدم Venture 1 رسالة تجريبية. أضف المفتاح محلياً أو في Railway.",
  demoNotice: "كان الرد الأخير تجريبياً لأنه لم يُعثر على مفتاح API.",
  genericError: "حدث خطأ. حاول مرة أخرى.",
  streamError: "تعذّر على هذا المتصفح عرض الرد مباشرة.",
  welcome: {
    chat: {
      kid: "مرحباً — أنا Venture 1 معلّمك. اسألني عن المدرسة أو الحيوانات أو الفضاء أو أي شيء تريد تعلمه. اكتب بأي لغة. بماذا نبدأ؟",
      teen: "أهلاً، أنا Venture 1 — معلّم لما تعمل عليه: علوم، تاريخ، لغات، واجبات. اكتب بلغتك وسأجيب بها. ما الذي يدور في بالك؟",
      adult: "مرحباً — أنا Venture 1، معلّم شخصي آمن للأسرة. اطلب شرحاً أو تمريناً أو مجرد حديث. أجيب بلغتك. من أين نبدأ؟",
    },
    stories: {
      kid: "لنصنع قصة معاً. اختر موضوعاً أو أخبرني بفكرة. أبدأ أنا، وأنت تختار ما يحدث بعد ذلك.",
      teen: "مغامرة قصيرة؟ اختر موضوعاً أو أعطني شرارة. أكتب بلغتك وأنت تقرر الخطوة التالية.",
      adult: "يمكننا نسج حكاية تفاعلية بلغتك. اختر موضوعاً أو مكاناً. أفتح المشهد وأنت تقود.",
    },
    learn: {
      kid: "لنتدرب باختبار أو لغز. اختر موضوعاً أو قل «فاجئني». أشرح أثناء الطريق — الخطأ جزء من التعلّم.",
      teen: "وقت التدريس: اختر موضوعاً أو اطلب مفاجأة. أشرح الفكرة بعد كل إجابة. لا خجل من الخطأ.",
      adult: "اختبار قصير بلغتك إن أحببت. اختر موضوعاً أو دعني أختار. أعلّم الفكرة ثم أقترح الخطوة التالية.",
    },
  },
  demoReply: {
    chat: "يسعدني الحديث — النموذج المباشر يحتاج OPENAI_API_KEY. جرّب القصص أو التعلّم حتى ذلك الحين.",
    stories: "القصة الحقيقية تحتاج OPENAI_API_KEY. يمكنك اختيار موضوع لرؤية الطريقة.",
    learn: "تُفعَّل الاختبارات بعد ضبط OPENAI_API_KEY. لغز تجريبي: لديّ مفاتيح بلا أقفال. من أنا؟ (لوحة المفاتيح.)",
  },
  chatStarters: [
    { id: "curious", label: "علّمني شيئاً ممتعاً", prompt: "علّمني فكرة ممتعة وآمنة للأسرة. اشرح خطوة بخطوة مع مثال ثم تأكد أنني أفهم." },
    { id: "homework", label: "ساعدني على الفهم", prompt: "ساعدني على فهم شيء عالق. اسأل عن الموضوع ثم علّمني خطوة بخطوة دون حل الواجب عني." },
    { id: "language", label: "تدريب لغة أخرى", prompt: "ساعدني على التدرّب على لغة أخرى. اسأل أي لغة أتعلم وبأي لغة تريد الشروح." },
    { id: "joke", label: "نكتة مهذبة", prompt: "اروِ نكتة ذكية ومهذبة ثم اسأل إن أردت أخرى." },
  ],
  storyThemes: [
    { id: "dragons", label: "تنانين", prompt: "ابدأ قصة تفاعلية قصيرة عن التنانين. آمنة للأسرة ثم اسأل ماذا بعد." },
    { id: "space", label: "فضاء", prompt: "ابدأ قصة تفاعلية قصيرة في الفضاء. آمنة للأسرة ثم اسأل ماذا بعد." },
    { id: "animals", label: "حيوانات", prompt: "ابدأ قصة تفاعلية قصيرة عن حيوانات ذكية. آمنة للأسرة ثم اسأل ماذا بعد." },
    { id: "mystery", label: "لغز", prompt: "ابدأ قصة لغز لطيفة بلا عنف. آمنة للأسرة ثم اسأل ماذا بعد." },
    { id: "folklore", label: "حكايات", prompt: "ابدأ قصة مستوحاة من حكايات شعبية لطيفة ثم اسأل ماذا بعد." },
    { id: "everyday", label: "مغامرة يومية", prompt: "ابدأ قصة عن يوم عادي يتحول إلى مغامرة صغيرة ثم اسأل ماذا بعد." },
  ],
  learnTopics: [
    { id: "animals", label: "حيوانات", prompt: "ابدأ اختبار تدريس عن الحيوانات. سؤال واحد في كل مرة." },
    { id: "numbers", label: "أرقام", prompt: "ابدأ اختبار أرقام أو حساب بسيط. سؤال واحد في كل مرة." },
    { id: "space", label: "فضاء", prompt: "ابدأ اختبار تدريس عن الفضاء. سؤال واحد في كل مرة." },
    { id: "kindness", label: "لطف", prompt: "ابدأ اختباراً عن اللطف. سؤال واحد في كل مرة." },
    { id: "science", label: "علوم", prompt: "ابدأ اختبار علوم يومية. سؤال واحد في كل مرة." },
    { id: "wordplay", label: "كلمات", prompt: "ابدأ بلغز أو لعبة كلمات. واحد في كل مرة." },
    { id: "history", label: "تاريخ", prompt: "ابدأ اختبار تاريخ أو جغرافيا آمناً للأسرة. سؤال واحد في كل مرة." },
    { id: "arts", label: "فن وموسيقى", prompt: "ابدأ اختبار فن أو موسيقى. سؤال واحد في كل مرة." },
  ],
};

const hi: UiCopy = {
  languageLabel: "भाषा",
  autoLabel: "ऑटो (ब्राउज़र)",
  subtitle: "हर उम्र का शिक्षक · कोई भी भाषा",
  voiceLabel: "आवाज़",
  tones: {
    kid: { label: "बच्चे", hint: "सरल शब्द" },
    teen: { label: "किशोर", hint: "रोज़मर्रा की भाषा" },
    adult: { label: "वयस्क", hint: "थोड़ी और गहराई" },
  },
  modes: {
    chat: { label: "चैट", hint: "आपकी भाषा में ट्यूशन" },
    stories: { label: "कहानियाँ", hint: "कहानी आप चलाते हैं" },
    learn: { label: "सीखें", hint: "सिखाने वाली प्रश्नोत्तरी" },
  },
  modesAria: "मोड",
  send: "भेजें",
  newConversation: "नई बातचीत",
  you: "आप",
  typing: "Venture 1 लिख रहा है",
  messageAria: "Venture 1 के लिए संदेश",
  placeholders: {
    chat: "कुछ सीखने को कहें — कोई भी भाषा…",
    stories: "आगे क्या होगा?",
    learn: "उत्तर लिखें, या विषय चुनें…",
  },
  disclaimer:
    "जब बच्चे Venture 1 इस्तेमाल करें तो माता-पिता या अभिभावक पास रहें। यह परिवार-सुरक्षित शिक्षक है, किसी शिक्षक या इंसान की जगह नहीं — और AI गलती कर सकता है। किसी भी भाषा में लिखें। अपना असली नाम, पता, स्कूल या फ़ोन न बताएँ।",
  demoBanner:
    "लाइव जवाब के लिए OPENAI_API_KEY चाहिए। तब तक Venture 1 डेमो संदेश भेजता है। कुंजी स्थानीय रूप से या Railway में जोड़ें।",
  demoNotice: "आखिरी जवाब डेमो था क्योंकि API कुंजी नहीं मिली।",
  genericError: "कुछ गड़बड़ हुई। फिर कोशिश करें।",
  streamError: "यह ब्राउज़र जवाब लाइव नहीं दिखा सका।",
  welcome: {
    chat: {
      kid: "नमस्ते — मैं Venture 1, आपका शिक्षक। स्कूल, जानवर, अंतरिक्ष या जो भी सीखना हो पूछें। किसी भी भाषा में लिखें। कहाँ से शुरू करें?",
      teen: "हे, मैं Venture 1 — जो भी पढ़ रहे हो उसमें मदद करूँगा। विज्ञान, इतिहास, भाषाएँ, होमवर्क। अपनी भाषा में लिखो। क्या सोच रहे हो?",
      adult: "नमस्ते — मैं Venture 1, परिवार-सुरक्षित निजी शिक्षक। समझाऊँ, अभ्यास करूँ, या बात करूँ। आपकी भाषा में जवाब दूँगा। कहाँ से शुरू करें?",
    },
    stories: {
      kid: "साथ में कहानी बनाते हैं। विषय चुनें या कोई विचार बताएँ। मैं शुरू करूँगा, आगे आप तय करेंगे।",
      teen: "छोटी सी यात्रा चाहिए? विषय चुनो या एक संकेत दो। मैं तुम्हारी भाषा में लिखूँगा, अगला कदम तुम चुनोगे।",
      adult: "हम आपकी भाषा में एक छोटी अंतःक्रियात्मक कथा बुन सकते हैं। विषय या स्थान चुनें। मैं दृश्य खोलूँगा; आप रास्ता तय करें।",
    },
    learn: {
      kid: "प्रश्नोत्तरी या पहेली से अभ्यास करें। विषय चुनें या कहें «आश्चर्य दो»। मैं साथ-साथ समझाऊँगा — गलती सीखने का हिस्सा है।",
      teen: "ट्यूटर समय: विषय चुनो या सरप्राइज़ माँगो। हर उत्तर के बाद मैं विचार समझाऊँगा। गलती पर शर्म नहीं।",
      adult: "अगर चाहें तो आपकी भाषा में छोटी प्रश्नोत्तरी। विषय चुनें या मुझे चुनने दें। हर उत्तर के बाद मैं सिखाऊँगा, फिर अगला कदम।",
    },
  },
  demoReply: {
    chat: "बात करना अच्छा लगेगा — लाइव मॉडल के लिए OPENAI_API_KEY चाहिए। तब तक कहानियाँ या सीखना आज़माएँ।",
    stories: "असली कहानी के लिए OPENAI_API_KEY चाहिए। तरीका देखने के लिए विषय चुन सकते हैं।",
    learn: "OPENAI_API_KEY लगने पर प्रश्नोत्तरी चालू होगी। नमूना पहेली: मेरे पास चाबियाँ हैं, ताले नहीं। मैं कौन? (कीबोर्ड।)",
  },
  chatStarters: [
    { id: "curious", label: "कुछ दिलचस्प सिखाओ", prompt: "एक दिलचस्प, परिवार-सुरक्षित बात सिखाओ। चरणबद्ध समझाओ, उदाहरण दो, फिर पूछो कि मैं समझ गया या नहीं।" },
    { id: "homework", label: "यह समझने में मदद करो", prompt: "जिस बात में अटक रहा हूँ उसे समझाओ। विषय पूछो, फिर चरणबद्ध पढ़ाओ। होमवर्क हो तो मेरे बदले पूरा मत करना।" },
    { id: "language", label: "दूसरी भाषा का अभ्यास", prompt: "दूसरी भाषा का अभ्यास कराओ। पूछो कौन सी भाषा सीखनी है और समझ किस भाषा में चाहिए।" },
    { id: "joke", label: "साफ़-सुथरा चुटकुला", prompt: "एक स्मार्ट, साफ़ चुटकुला सुनाओ, फिर पूछो और चाहिए या नहीं।" },
  ],
  storyThemes: [
    { id: "dragons", label: "अजगर", prompt: "अजगरों पर छोटी अंतःक्रियात्मक कहानी शुरू करो। परिवार-सुरक्षित, फिर पूछो आगे क्या।" },
    { id: "space", label: "अंतरिक्ष", prompt: "अंतरिक्ष में छोटी अंतःक्रियात्मक कहानी शुरू करो। परिवार-सुरक्षित, फिर पूछो आगे क्या।" },
    { id: "animals", label: "जानवर", prompt: "चतुर जानवरों वाली छोटी कहानी शुरू करो। परिवार-सुरक्षित, फिर पूछो आगे क्या।" },
    { id: "mystery", label: "रहस्य", prompt: "हल्की रहस्य कहानी शुरू करो (हिंसा नहीं)। परिवार-सुरक्षित, फिर पूछो आगे क्या।" },
    { id: "folklore", label: "लोककथा", prompt: "कोमल लोककथा से प्रेरित छोटी कहानी शुरू करो, फिर पूछो आगे क्या।" },
    { id: "everyday", label: "रोज़ की यात्रा", prompt: "साधारण दिन की छोटी यात्रा वाली कहानी शुरू करो, फिर पूछो आगे क्या।" },
  ],
  learnTopics: [
    { id: "animals", label: "जानवर", prompt: "जानवरों पर छोटी ट्यूशन प्रश्नोत्तरी शुरू करो। एक बार में एक प्रश्न।" },
    { id: "numbers", label: "संख्याएँ", prompt: "संख्या या सरल गणित की प्रश्नोत्तरी शुरू करो। एक बार में एक प्रश्न।" },
    { id: "space", label: "अंतरिक्ष", prompt: "अंतरिक्ष पर छोटी ट्यूशन प्रश्नोत्तरी शुरू करो। एक बार में एक प्रश्न।" },
    { id: "kindness", label: "दयालुता", prompt: "दयालुता पर प्रश्नोत्तरी शुरू करो। एक बार में एक प्रश्न।" },
    { id: "science", label: "विज्ञान", prompt: "रोज़मर्रा विज्ञान की प्रश्नोत्तरी शुरू करो। एक बार में एक प्रश्न।" },
    { id: "wordplay", label: "शब्द खेल", prompt: "पहेली या शब्द खेल से शुरू करो। एक बार में एक।" },
    { id: "history", label: "इतिहास", prompt: "परिवार-सुरक्षित इतिहास या भूगोल प्रश्नोत्तरी शुरू करो। एक बार में एक प्रश्न।" },
    { id: "arts", label: "कला और संगीत", prompt: "कला या संगीत की प्रश्नोत्तरी शुरू करो। एक बार में एक प्रश्न।" },
  ],
};

const pt: UiCopy = {
  languageLabel: "Idioma",
  autoLabel: "Auto (navegador)",
  subtitle: "Tutor para todas as idades · qualquer idioma",
  voiceLabel: "Voz",
  tones: {
    kid: { label: "Criança", hint: "Palavras mais simples" },
    teen: { label: "Jovem", hint: "Voz do dia a dia" },
    adult: { label: "Adulto", hint: "Um pouco mais de profundidade" },
  },
  modes: {
    chat: { label: "Chat", hint: "Tutoria no seu idioma" },
    stories: { label: "Histórias", hint: "Contos que você conduz" },
    learn: { label: "Aprender", hint: "Quizzes que ensinam" },
  },
  modesAria: "Modos",
  send: "Enviar",
  newConversation: "Nova conversa",
  you: "Você",
  typing: "Venture 1 está escrevendo",
  messageAria: "Mensagem para o Venture 1",
  placeholders: {
    chat: "Peça para aprender algo — qualquer idioma…",
    stories: "O que acontece depois?",
    learn: "Sua resposta, ou escolha um tema…",
  },
  disclaimer:
    "Um responsável deve ficar por perto quando crianças usam o Venture 1. É um tutor familiar, não substitui um professor ou uma pessoa — e a IA pode errar. Escreva em qualquer idioma. Não compartilhe nome real, endereço, escola ou telefone.",
  demoBanner:
    "Respostas ao vivo precisam de OPENAI_API_KEY. Até lá, o Venture 1 usa uma mensagem de demonstração. Adicione a chave localmente ou no Railway.",
  demoNotice: "A última resposta foi uma demo porque não há chave de API.",
  genericError: "Algo deu errado. Tente de novo.",
  streamError: "Este navegador não conseguiu mostrar a resposta em tempo real.",
  welcome: {
    chat: {
      kid: "Oi — eu sou o Venture 1, seu tutor. Pergunte sobre a escola, animais, espaço ou o que quiser aprender. Escreva em qualquer idioma. Por onde começamos?",
      teen: "E aí, eu sou o Venture 1 — um tutor para o que você estiver estudando. Ciências, história, idiomas, dever de casa. Escreva no seu idioma. O que está na sua cabeça?",
      adult: "Olá — eu sou o Venture 1, um tutor pessoal seguro para a família. Peça para explicar, praticar ou só conversar. Respondo no seu idioma. Por onde começamos?",
    },
    stories: {
      kid: "Vamos inventar uma história juntos. Escolha um tema ou me dê uma ideia. Eu começo e você decide o que vem depois.",
      teen: "Uma aventura curta? Escolha um tema ou me dê um gancho. Escrevo no seu idioma e você escolhe o próximo passo.",
      adult: "Podemos tecer um conto interativo no seu idioma. Escolha um tema ou cenário. Eu abro a cena; você conduz.",
    },
    learn: {
      kid: "Vamos treinar com um quiz ou uma charada. Escolha um tema ou diga «me surpreenda». Eu explico no caminho — errar faz parte.",
      teen: "Hora do tutor: escolha um tema ou peça surpresa. Explico a ideia depois de cada resposta. Sem vergonha de errar.",
      adult: "Um quiz curto no seu idioma, se quiser. Escolha um tema ou deixe eu escolher. Ensino a ideia e ofereço o próximo passo.",
    },
  },
  demoReply: {
    chat: "Adoraria conversar — o modelo ao vivo precisa de OPENAI_API_KEY. Enquanto isso, experimente Histórias ou Aprender.",
    stories: "Uma história de verdade precisa de OPENAI_API_KEY. Você ainda pode escolher um tema para ver como funciona.",
    learn: "Os quizzes ligam quando OPENAI_API_KEY está definida. Charada: tenho teclas, mas nenhuma fechadura. O que sou? (Um teclado.)",
  },
  chatStarters: [
    { id: "curious", label: "Me ensine algo interessante", prompt: "Ensine uma ideia interessante e segura para a família. Explique passo a passo com um exemplo e confira se eu acompanhei." },
    { id: "homework", label: "Me ajude a entender isto", prompt: "Ajude-me a entender algo em que travei. Pergunte o tema e ensine passo a passo, sem fazer a lição no meu lugar." },
    { id: "language", label: "Praticar outro idioma", prompt: "Ajude-me a praticar outro idioma. Pergunte qual quero aprender e em qual idioma quero as explicações." },
    { id: "joke", label: "Uma piada limpa", prompt: "Conte uma piada inteligente e limpa, depois pergunte se quero outra." },
  ],
  storyThemes: [
    { id: "dragons", label: "Dragões", prompt: "Comece uma história interativa curta sobre dragões. Segura para a família. Depois pergunte o que vem a seguir." },
    { id: "space", label: "Espaço", prompt: "Comece uma história interativa curta no espaço. Segura para a família. Depois pergunte o que vem a seguir." },
    { id: "animals", label: "Animais", prompt: "Comece uma história interativa com animais espertos. Segura para a família. Depois pergunte o que vem a seguir." },
    { id: "mystery", label: "Mistério", prompt: "Comece um mistério aconchegante (sem violência). Seguro para a família. Depois pergunte o que vem a seguir." },
    { id: "folklore", label: "Folclore", prompt: "Comece uma história inspirada em folclore gentil. Depois pergunte o que vem a seguir." },
    { id: "everyday", label: "Aventura do dia a dia", prompt: "Comece uma história sobre um dia comum que vira uma pequena aventura. Depois pergunte o que vem a seguir." },
  ],
  learnTopics: [
    { id: "animals", label: "Animais", prompt: "Comece um quiz de tutoria sobre animais. Uma pergunta de cada vez." },
    { id: "numbers", label: "Números", prompt: "Comece um quiz de números ou matemática simples. Uma pergunta de cada vez." },
    { id: "space", label: "Espaço", prompt: "Comece um quiz de tutoria sobre o espaço. Uma pergunta de cada vez." },
    { id: "kindness", label: "Gentileza", prompt: "Comece um quiz sobre gentileza. Uma pergunta de cada vez." },
    { id: "science", label: "Ciência", prompt: "Comece um quiz de ciência do dia a dia. Uma pergunta de cada vez." },
    { id: "wordplay", label: "Palavras", prompt: "Comece com uma charada ou jogo de palavras. Uma de cada vez." },
    { id: "history", label: "História", prompt: "Comece um quiz de história ou geografia, seguro para a família. Uma pergunta de cada vez." },
    { id: "arts", label: "Arte e música", prompt: "Comece um quiz de arte ou música. Uma pergunta de cada vez." },
  ],
};

const COPIES: Record<Locale, UiCopy> = { en, es, fr, zh, ar, hi, pt };

export function getUiCopy(locale: Locale): UiCopy {
  return COPIES[locale] ?? en;
}

const categoryData = [
  // Hero Section
  {
    category: "hero",
    title: "Hero Images",
    description: "Our stunning hero images capture the essence of unforgettable events, showcasing the grandeur and elegance of our event planning expertise.",
    quotes: [
      "Every event begins with a vision; let us make yours unforgettable.",
      "Moments that shine, captured in timeless elegance.",
      "Where dreams meet reality, your event starts here.",
    ],
  },
  // All Services Section
  {
    category: "house-decoration",
    title: "House Decoration",
    description: "Transform your home for any occasion with beautiful and creative decorations.",
    quotes: [
      "Home is where the celebration begins.",
      "Decorate your memories, not just your walls.",
      "A house full of joy and color.",
    ],
  },
  {
    category: "haldi-mehendi",
    title: "Haldi & Mehendi",
    description: "Vibrant, colorful, and full of tradition, our Haldi and Mehendi setups bring the joy of pre-wedding celebrations to life.",
    quotes: [
      "Colors of love, traditions that bind, moments that shine.",
      "Dance in the hues of joy and celebration!",
      "Haldi and Mehendi: where tradition meets festivity.",
    ],
  },
  {
    category: "flower-decoration",
    title: "Flower Decoration",
    description: "Romantic and elegant setups using flowers.",
    quotes: [
      "Blooming love, fragrant memories.",
      "Flowers that speak the language of love and celebration.",
      "Let nature’s beauty adorn your special moments.",
    ],
  },
  {
    category: "mandap-decoration",
    title: "Mandap Decoration",
    description: "Traditional and modern mandap setups for your perfect wedding ceremony.",
    quotes: [
      "Where vows are exchanged and dreams begin.",
      "A mandap that reflects your love story.",
      "Sacred spaces, beautiful beginnings.",
    ],
  },
  {
    category: "bride-groom-entry",
    title: "Bride & Groom Entry",
    description: "Make a grand entrance with breathtaking setups that reflect your love story.",
    quotes: [
      "Step into forever with a moment that takes your breath away.",
      "Your love deserves a grand entrance.",
      "Where every step tells a story of love and commitment.",
    ],
  },
  {
    category: "firework",
    title: "Firework Decoration",
    description: "Make your entry memorable using firework decoration.",
    quotes: [
      "Light up the night with a celebration that dazzles.",
      "Every spark tells a story; let’s make yours unforgettable.",
      "Fireworks: where every moment is a burst of joy.",
    ],
  },
  {
    category: "engagement-decoration",
    title: "Engagement Decoration",
    description: "Celebrate your engagement with elegant and joyful decorations.",
    quotes: [
      "Two hearts, one promise.",
      "A ring, a promise, a celebration.",
      "Begin your forever with style.",
    ],
  },
  {
    category: "baby-shower-decoration",
    title: "Baby Shower Decoration",
    description: "Beautiful and elegant setups to celebrate your love and milestones.",
    quotes: [
      "Celebrating new beginnings with love and joy.",
      "A sprinkle of love, a dash of joy, and a whole lot of celebration.",
      "Welcoming your little miracle with warmth and festivity.",
    ],
  },
  {
    category: "birthday-theme-decoration",
    title: "Birthday Theme Decoration",
    description: "Transform birthdays into extraordinary adventures with creative themes and vibrant decorations.",
    quotes: [
      "Every birthday is a new chapter; let’s make it epic!",
      "Celebrate life with colors, themes, and joy.",
      "Turning another year older has never looked this good!",
    ],
  },
  {
    category: "anniversary-decoration",
    title: "Anniversary Decoration",
    description: "Honor your love and milestones with romantic, elegant setups that make every anniversary unforgettable.",
    quotes: [
      "Love grows stronger with every year; celebrate it in style.",
      "A moment to cherish, a love to celebrate.",
      "Here’s to love that lasts and memories that shine.",
    ],
  },
  {
    category: "naming-ceremony",
    title: "Naming Ceremony",
    description: "Celebrate your child's naming ceremony with beautiful decorations.",
    quotes: [
      "A name to cherish, a day to remember.",
      "Welcoming your little one with love and tradition.",
      "A celebration of identity and joy.",
    ],
  },
  {
    category: "car-decoration",
    title: "Car Decoration",
    description: "Decorate your car for weddings, birthdays, and special occasions.",
    quotes: [
      "Drive into celebrations with style.",
      "Every journey deserves a festive start.",
      "Decorated rides for memorable moments.",
    ],
  },
  {
    category: "surprise-decoration",
    title: "Surprise Decoration",
    description: "Plan surprise parties with creative and fun decorations.",
    quotes: [
      "Surprises that sparkle and delight.",
      "Make every moment a surprise to remember.",
      "Unexpected joy, beautifully decorated.",
    ],
  },
  {
    category: "room-decoration",
    title: "Room Decoration",
    description: "Transform any room into a celebration space.",
    quotes: [
      "Rooms filled with joy and color.",
      "Every corner tells a story.",
      "Celebrate in style, anywhere.",
    ],
  },
  {
    category: "annaprashan-decoration",
    title: "Annaprashan Decoration",
    description: "Celebrate your baby's first meal with traditional and festive decorations.",
    quotes: [
      "A milestone worth celebrating.",
      "First bites, lifelong memories.",
      "Tradition and joy in every detail.",
    ],
  },
  {
    category: "birthday-baby-entry",
    title: "Birthday Baby Entry",
    description: "Special entry setups for birthday babies.",
    quotes: [
      "Make your baby's birthday entry magical.",
      "A grand welcome for your little star.",
      "Celebrate the first steps in style.",
    ],
  },
  // Balloon Decoration Section
  {
    category: "welcome-baby-decoration",
    title: "Welcome Baby Decoration",
    description: "Welcome your newborn with adorable balloon decorations.",
    quotes: [
      "A new arrival, a new celebration.",
      "Balloons for your bundle of joy.",
      "Welcome with love and color.",
    ],
  },
  {
    category: "baby-entry-decoration",
    title: "Baby Entry Decoration",
    description: "Special balloon setups for baby entry.",
    quotes: [
      "A grand entry for your little one.",
      "Celebrate every step.",
      "Balloons for magical moments.",
    ],
  },
  // Wedding Services Section
  {
    category: "haldi-mehendi-decoration",
    title: "Haldi & Mehendi Decoration",
    description: "Traditional Haldi & Mehendi setups for weddings.",
    quotes: [
      "Tradition and color for your wedding.",
      "Haldi and Mehendi with a modern touch.",
      "Celebrate rituals with style.",
    ],
  },
  {
    category: "fireworks",
    title: "FireWorks",
    description: "Firework setups for wedding entries.",
    quotes: [
      "Light up your wedding night.",
      "Fireworks for unforgettable moments.",
      "Celebrate with a bang.",
    ],
  },
  {
    category: "stage-varmala-theme",
    title: "Stage Varmala Theme",
    description: "Special stage setups for varmala ceremonies.",
    quotes: [
      "A stage for love and tradition.",
      "Varmala moments to cherish.",
      "Celebrate with elegance.",
    ],
  },
  {
    category: "bride-welcome",
    title: "Bride Welcome Home",
    description: "Special decorations for welcoming the bride.",
    quotes: [
      "Welcome the bride with love.",
      "A new home, a new beginning.",
      "Celebrate her arrival.",
    ],
  },
];

export default categoryData;
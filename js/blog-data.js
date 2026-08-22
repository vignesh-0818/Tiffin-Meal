// blog-data.js - Centralized source of truth for Blog articles
const blogArticles = [
  {
    id: 1,
    title: "10 Benefits of Home-Cooked Tiffin Meals",
    category: "Health",
    author: "Arjun Mehta",
    authorImage: "assets/images/avatars/author_arjun.jpg",
    date: "Jan 15, 2024",
    readTime: "5 min",
    image: "assets/images/blog/home-cooked-tiffin.jpg",
    excerpt: "Discover why home-cooked tiffin meals are a healthier, more affordable, and more convenient alternative to restaurant food for everyday nutrition.",
    content: `
      <p>In today's fast-paced world, eating out or ordering in has become a daily habit for many. However, the benefits of home-cooked meals, especially when delivered fresh in a traditional tiffin, are unparalleled. Let's explore why making the switch can transform your health and lifestyle.</p>
      
      <h4 class="mt-4 mb-3">1. Complete Nutritional Control</h4>
      <p>When you opt for home-style tiffin meals, you know exactly what's going into your body. Unlike restaurant food that often hides excess butter, oil, and sugar to enhance taste, home-cooked meals prioritize wholesome ingredients. You get the perfect balance of proteins, complex carbohydrates, and essential fats without the hidden calories.</p>
      
      <h4 class="mt-4 mb-3">2. Better Portion Management</h4>
      <p>Restaurant portions have grown significantly over the last few decades, leading to overeating. A standard tiffin box is designed with portion control in mind. The compartments naturally guide you towards eating a balanced amount of rice, roti, dal, and vegetables, preventing the sluggish feeling that comes after a heavy meal.</p>
      
      <h4 class="mt-4 mb-3">3. Significant Cost Savings</h4>
      <p>Eating out daily quickly adds up. A monthly tiffin subscription can cut your food expenses by up to 40% while providing better quality food. It eliminates delivery fees, tips, and the premium markup of restaurant dining.</p>
      
      <h4 class="mt-4 mb-3">4. Consistent Energy Levels</h4>
      <p>Heavy, greasy food causes sudden spikes and crashes in blood sugar levels. A well-balanced home-cooked meal provides sustained energy release, keeping you focused and productive throughout your workday.</p>
      
      <h4 class="mt-4 mb-3">5. Improved Digestion</h4>
      <p>Everyday cooking uses simple spices and moderate amounts of healthy oils. This is much gentler on your digestive system compared to rich restaurant gravies, reducing issues like acidity, bloating, and indigestion.</p>
    `
  },
  {
    id: 2,
    title: "Top 5 Indian Breakfast Recipes for Busy Mornings",
    category: "Recipes",
    author: "Priya Sharma",
    authorImage: "assets/images/avatars/author_priya.jpg",
    date: "Jan 12, 2024",
    readTime: "7 min",
    image: "assets/images/blog/indian-breakfast.jpg",
    excerpt: "Start your day right with these quick and delicious Indian breakfast recipes that can be prepared in under 15 minutes for the whole family.",
    content: `
      <p>Breakfast is often called the most important meal of the day, yet it's the one we most frequently skip or rush through. Indian cuisine offers an incredible variety of nutritious breakfasts that are quick to prepare and keep you energized for hours.</p>
      
      <h4 class="mt-4 mb-3">1. Classic Poha</h4>
      <p>Flattened rice cooked with onions, peanuts, curry leaves, and a hint of turmeric. It takes less than 10 minutes to make, is light on the stomach, and provides a great mix of carbohydrates and protein (from the peanuts).</p>
      
      <h4 class="mt-4 mb-3">2. Vegetable Upma</h4>
      <p>Roasted semolina cooked with mixed vegetables and tempered with mustard seeds. Upma is incredibly satisfying and can be packed with whatever vegetables you have in your fridge, making it a nutritional powerhouse.</p>
      
      <h4 class="mt-4 mb-3">3. Besan Chilla</h4>
      <p>Often called the Indian savory pancake, this is made from chickpea flour mixed with finely chopped onions, tomatoes, and coriander. It's an excellent gluten-free, high-protein breakfast that cooks in minutes.</p>
    `
  },
  {
    id: 3,
    title: "Understanding Vegetarian Nutrition: A Complete Guide",
    category: "Nutrition",
    author: "Dr. Meera Patel",
    authorImage: "assets/images/avatars/author_meera.jpg",
    date: "Jan 10, 2024",
    readTime: "8 min",
    image: "assets/images/blog/vegetarian-nutrition.jpg",
    excerpt: "A comprehensive guide to getting all essential nutrients from a vegetarian diet, including protein sources, vitamins, and balanced meal planning.",
    content: `
      <p>Transitioning to or maintaining a vegetarian diet is fantastic for both personal health and the environment. However, it requires a basic understanding of nutrition to ensure you're getting a complete amino acid profile and all essential vitamins.</p>
      
      <h4 class="mt-4 mb-3">The Protein Question</h4>
      <p>The most common concern about vegetarian diets is protein. Indian cuisine brilliantly solves this through food combining. Eating dal (lentils) with rice or roti creates a complete protein, providing all nine essential amino acids your body needs. Other excellent vegetarian protein sources include paneer, tofu, chickpeas, and Greek yogurt.</p>
      
      <h4 class="mt-4 mb-3">Essential Micronutrients</h4>
      <p>Vegetarians need to pay special attention to Vitamin B12, Iron, and Omega-3 fatty acids. Incorporating leafy greens (like spinach and fenugreek) with a squeeze of lemon juice enhances iron absorption. For B12, fortified foods or dairy products are essential, and flaxseeds or walnuts are great for Omega-3s.</p>
    `
  },
  {
    id: 4,
    title: "How to Choose the Right Meal Plan for Your Lifestyle",
    category: "Tips",
    author: "Rahul Verma",
    authorImage: "assets/images/avatars/author_rahul.jpg",
    date: "Jan 8, 2024",
    readTime: "6 min",
    image: "assets/images/blog/meal-plan-guide.jpg",
    excerpt: "Not sure which tiffin plan suits you? Here is a practical guide to selecting the perfect meal plan based on your lifestyle, goals, and budget.",
    content: `
      <p>With so many meal subscription options available today, choosing the right one can feel overwhelming. The key is to match the plan to your specific daily routine and health goals.</p>
      
      <h4 class="mt-4 mb-3">Assess Your Schedule</h4>
      <p>Do you work long hours and struggle with dinner, or are your mornings too rushed for lunch prep? If you're skipping lunch at the office, a weekday lunch delivery is ideal. If you're too exhausted to cook after commuting, opt for a dinner plan.</p>
      
      <h4 class="mt-4 mb-3">Define Your Goals</h4>
      <p>Are you trying to lose weight, build muscle, or simply eat cleaner? If weight loss is the goal, look for calorie-controlled or low-carb plans. If you're highly active, a high-protein or 'jumbo' tiffin with extra portions will serve you better.</p>
    `
  },
  {
    id: 5,
    title: "The Importance of Meal Timing for Better Health",
    category: "Health",
    author: "Dr. Meera Patel",
    authorImage: "assets/images/avatars/author_meera.jpg",
    date: "Jan 5, 2024",
    readTime: "5 min",
    image: "assets/images/blog/meal-timing-health.jpg",
    excerpt: "Learn why eating at the right times can boost your metabolism, improve digestion, and help you maintain a healthy weight effortlessly.",
    content: `
      <p>We often focus entirely on *what* we eat, completely ignoring *when* we eat. Our bodies operate on a circadian rhythm, and aligning our meals with this internal clock can dramatically improve our digestion and metabolism.</p>
      
      <h4 class="mt-4 mb-3">The Heavy Lunch Principle</h4>
      <p>According to traditional Indian Ayurvedic principles, our digestive fire is strongest at noon when the sun is at its peak. This makes lunch the ideal time for your heaviest meal. A hearty tiffin at 1 PM will be digested much more efficiently than a heavy dinner at 9 PM.</p>
      
      <h4 class="mt-4 mb-3">The Light Dinner Rule</h4>
      <p>Eating a heavy meal right before bed disrupts sleep and forces your body to focus on digestion rather than cellular repair. Aim to finish a light dinner at least 2-3 hours before sleeping. This simple change can reduce acid reflux and morning grogginess.</p>
    `
  },
  {
    id: 6,
    title: "South Indian Meals: A Culinary Journey",
    category: "Recipes",
    author: "Priya Sharma",
    authorImage: "assets/images/avatars/author_priya.jpg",
    date: "Jan 3, 2024",
    readTime: "6 min",
    image: "assets/images/blog/south-indian-cuisine.jpg",
    excerpt: "Explore the rich and diverse flavors of South Indian cuisine, from crispy dosas and fluffy idlis to aromatic sambar and tangy rasam.",
    content: `
      <p>South Indian cuisine is a celebration of flavors, textures, and aromas. From the coconut-rich curries of Kerala to the tangy rasams of Tamil Nadu, every region has its own culinary identity. Let us take you on a delicious journey through some of the most iconic South Indian dishes.</p>
      
      <h4 class="mt-4 mb-3">Dosa: The Beloved Crepe</h4>
      <p>No discussion of South Indian food is complete without dosa. This crispy, golden crepe made from a fermented batter of rice and urad dal is a masterpiece of Indian cuisine. The secret to a perfect dosa lies in the fermentation of the batter, which gives it a slightly tangy flavor and light texture.</p>
      
      <h4 class="mt-4 mb-3">Idli: Steamed Perfection</h4>
      <p>Soft, pillowy idlis are the ultimate comfort food. Steamed to perfection using the same fermented batter as dosa, idlis are virtually fat-free and incredibly easy to digest. Pair them with sambar and coconut chutney for a classic combination.</p>
      
      <h4 class="mt-4 mb-3">Sambar: The Soul of South Indian Meals</h4>
      <p>Sambar is a lentil-based vegetable stew flavored with tamarind and a special blend of spices. Each family has their own secret sambar recipe, passed down through generations. The magic of sambar lies in the balance of sour, spicy, and savory flavors.</p>
    `
  }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = blogArticles;
}

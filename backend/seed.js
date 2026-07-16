const { Sequelize } = require("sequelize");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

async function seed() {
  try {
    console.log("Connecting to NeonDB...");
    await sequelize.authenticate();
    console.log("Connected!\n");

    // Sync models first
    const fs = require("fs");
    const modelsPath = path.join(__dirname, "models");
    const models = {};

    fs.readdirSync(modelsPath).forEach((file) => {
      if (file.endsWith(".js") && file !== "index.js") {
        const model = require(path.join(modelsPath, file))(
          sequelize,
          require("sequelize").DataTypes
        );
        models[model.name] = model;
      }
    });

    Object.keys(models).forEach((modelName) => {
      if (models[modelName].associate) {
        models[modelName].associate(models);
      }
    });

    console.log("Dropping and recreating tables...");
    await sequelize.sync({ force: true });
    console.log("Tables created!\n");

    const { User, Post, Like, Comment, Follower } = models;

    // ====== SEED USERS ======
    console.log("Seeding users...");
    const users = await User.bulkCreate(
      [
        {
          user_id: "seed_user_1",
          name: "Elon Musk",
          username: "elonmusk",
          email: "elon@x.com",
          bio: "Mars & Cars, Chips & Dips",
          profile_picture: "https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg",
        },
        {
          user_id: "seed_user_2",
          name: "Sam Altman",
          username: "sama",
          email: "sam@openai.com",
          bio: "CEO @OpenAI",
          profile_picture: "https://pbs.twimg.com/profile_images/804990434455887872/BG0Xh7Oa_400x400.jpg",
        },
        {
          user_id: "seed_user_3",
          name: "Dan Abramov",
          username: "dan_abramov",
          email: "dan@react.dev",
          bio: "Working on @blaborsky. Previously co-created Redux and Create React App. Ex-React team at Meta.",
          profile_picture: "https://pbs.twimg.com/profile_images/1336281436685541376/fRSl8uJP_400x400.jpg",
        },
        {
          user_id: "seed_user_4",
          name: "Fireship",
          username: "firaborsky",
          email: "fire@fireship.io",
          bio: "High-intensity code tutorials. This is fine. 🔥",
          profile_picture: "https://pbs.twimg.com/profile_images/1187814172428484608/MBgOeLHY_400x400.jpg",
        },
        {
          user_id: "seed_user_5",
          name: "Lex Fridman",
          username: "lexfridman",
          email: "lex@lexfridman.com",
          bio: "Research scientist at MIT. Host of the Lex Fridman Podcast.",
          profile_picture: "https://pbs.twimg.com/profile_images/956331551435960322/OaqR8pAB_400x400.jpg",
        },
        {
          user_id: "seed_user_6",
          name: "Theo",
          username: "t3dotgg",
          email: "theo@t3.gg",
          bio: "CEO @Ping.gg • Content about TypeScript, React, Next.js",
          profile_picture: "https://pbs.twimg.com/profile_images/1605762947686375425/lsoGWWPE_400x400.jpg",
        },
        {
          user_id: "seed_user_7",
          name: "Vercel",
          username: "vercel",
          email: "info@vercel.com",
          bio: "Develop. Preview. Ship. Creators of Next.js.",
          profile_picture: "https://pbs.twimg.com/profile_images/1252531684353998848/6R0-p1Vf_400x400.jpg",
        },
        {
          user_id: "seed_user_8",
          name: "Guillermo Rauch",
          username: "raaborsky",
          email: "guillermo@vercel.com",
          bio: "CEO @Vercel. Creator of @socketio, Mongoose, Next.js",
          profile_picture: "https://pbs.twimg.com/profile_images/1576257734810312704/ucxb4lHy_400x400.jpg",
        },
      ],
      { ignoreDuplicates: true }
    );
    console.log(`  Created ${users.length} users`);

    // ====== SEED POSTS ======
    console.log("Seeding posts...");
    const posts = await Post.bulkCreate(
      [
        {
          user_id: "seed_user_1",
          content: "The thing I love most about X is that it's a global town square. Free speech is the bedrock of a functioning democracy. #FreeSpeech #X",
          view_count: 14500000,
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
        {
          user_id: "seed_user_1",
          content: "Starship flight test was incredible. Humanity is becoming multiplanetary. 🚀 #SpaceX #Starship #Mars",
          view_count: 8900000,
          created_at: new Date(Date.now() - 5 * 60 * 60 * 1000),
        },
        {
          user_id: "seed_user_2",
          content: "We just shipped GPT-5. It's our most capable model yet. Reasoning, multimodal, agents — all significantly improved. #AI #GPT5 #OpenAI",
          view_count: 5600000,
          created_at: new Date(Date.now() - 3 * 60 * 60 * 1000),
        },
        {
          user_id: "seed_user_2",
          content: "AGI is closer than most people think. The rate of progress is incredible. #AGI #AI",
          view_count: 3200000,
          created_at: new Date(Date.now() - 8 * 60 * 60 * 1000),
        },
        {
          user_id: "seed_user_3",
          content: "React Server Components are not a framework feature. They're a React feature that frameworks can adopt. This is an important distinction. #ReactJS #WebDev",
          view_count: 890000,
          created_at: new Date(Date.now() - 4 * 60 * 60 * 1000),
        },
        {
          user_id: "seed_user_3",
          content: "Hot take: useEffect is not the problem. Not understanding the mental model is the problem. Effects synchronize your component with external systems. That's it.",
          view_count: 1200000,
          created_at: new Date(Date.now() - 12 * 60 * 60 * 1000),
        },
        {
          user_id: "seed_user_4",
          content: "JavaScript just mass-hired 10 new frameworks this week. In other news, water is wet. 🔥\n\nNew video dropping tomorrow on the state of JS in 2026. #JavaScript #WebDev #Frameworks",
          view_count: 2100000,
          created_at: new Date(Date.now() - 6 * 60 * 60 * 1000),
        },
        {
          user_id: "seed_user_4",
          content: "The virgin \"I need to learn every framework\" vs the chad \"I'll just use vanilla JS and a CDN\" \n\nBoth are wrong. The answer is always Rust. Obviously. 🦀",
          view_count: 3400000,
          created_at: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
        {
          user_id: "seed_user_5",
          content: "Love is the answer. But what is the question? Perhaps the question itself is the answer. Let me think about this more on a long walk.",
          view_count: 780000,
          created_at: new Date(Date.now() - 7 * 60 * 60 * 1000),
        },
        {
          user_id: "seed_user_5",
          content: "Just recorded a 4-hour conversation with a brilliant mind. The beautiful thing about long-form conversations is that you can explore ideas deeply, without the constraints of soundbites.",
          view_count: 1500000,
          created_at: new Date(Date.now() - 18 * 60 * 60 * 1000),
        },
        {
          user_id: "seed_user_6",
          content: "TypeScript isn't just about types. It's about developer experience. Autocomplete, refactoring, catching bugs early. The types are just the mechanism. #TypeScript #DX",
          view_count: 670000,
          created_at: new Date(Date.now() - 9 * 60 * 60 * 1000),
        },
        {
          user_id: "seed_user_6",
          content: "Hot take: if your React app needs a state management library, you probably have an architecture problem, not a state problem.\n\nServer state → React Query\nURL state → Router\nForm state → React Hook Form\nUI state → useState\n\nWhat's left?",
          view_count: 2300000,
          created_at: new Date(Date.now() - 28 * 60 * 60 * 1000),
        },
        {
          user_id: "seed_user_7",
          content: "Introducing Vercel AI SDK 5.0 — Build AI-powered applications with streaming, tool use, and multi-modal support out of the box. #AI #Vercel #NextJS\n\nnpx create-next-app --ai",
          view_count: 890000,
          created_at: new Date(Date.now() - 10 * 60 * 60 * 1000),
        },
        {
          user_id: "seed_user_8",
          content: "Ship early, ship often. The best feedback comes from production, not from design reviews.\n\nPerfect is the enemy of deployed.",
          view_count: 560000,
          created_at: new Date(Date.now() - 14 * 60 * 60 * 1000),
        },
        {
          user_id: "seed_user_8",
          content: "Next.js 16 is going to change the game. We've been working on something special. Stay tuned. 👀 #NextJS #Vercel #WebDev",
          view_count: 1800000,
          created_at: new Date(Date.now() - 30 * 60 * 60 * 1000),
        },
        {
          user_id: "seed_user_1",
          content: "Who wants to see a mass unboxing of Optimus robots? Working at the Fremont factory right now. They're getting smarter every day.",
          view_count: 7200000,
          created_at: new Date(Date.now() - 36 * 60 * 60 * 1000),
        },
        {
          user_id: "seed_user_4",
          content: "Every junior dev: \"I built a todo app!\"\n\nEvery senior dev: \"I also built a todo app. But this one has microservices, Kubernetes, a CI/CD pipeline, and it still doesn't work.\"",
          view_count: 4100000,
          created_at: new Date(Date.now() - 48 * 60 * 60 * 1000),
        },
      ],
      { ignoreDuplicates: true }
    );
    console.log(`  Created ${posts.length} posts`);

    // ====== SEED LIKES ======
    console.log("Seeding likes...");
    const allPosts = await Post.findAll({ attributes: ["post_id"] });
    const likeData = [];
    const userIds = ["seed_user_1", "seed_user_2", "seed_user_3", "seed_user_4", "seed_user_5", "seed_user_6", "seed_user_7", "seed_user_8"];

    for (const post of allPosts) {
      const numLikes = Math.floor(Math.random() * 5) + 2;
      const shuffled = [...userIds].sort(() => Math.random() - 0.5);
      for (let i = 0; i < numLikes; i++) {
        likeData.push({
          user_id: shuffled[i],
          post_id: post.post_id,
        });
      }
    }
    await Like.bulkCreate(likeData, { ignoreDuplicates: true });
    console.log(`  Created ${likeData.length} likes`);

    // ====== SEED COMMENTS ======
    console.log("Seeding comments...");
    const commentData = [
      { post_id: allPosts[0]?.post_id, user_id: "seed_user_3", content: "Free speech with responsibility. The balance is key." },
      { post_id: allPosts[0]?.post_id, user_id: "seed_user_5", content: "Agreed. Open dialogue is essential for progress." },
      { post_id: allPosts[2]?.post_id, user_id: "seed_user_1", content: "Impressive work. Looking forward to testing it." },
      { post_id: allPosts[2]?.post_id, user_id: "seed_user_6", content: "The speed improvements alone are incredible." },
      { post_id: allPosts[4]?.post_id, user_id: "seed_user_6", content: "This needed to be said. So many people confuse this." },
      { post_id: allPosts[4]?.post_id, user_id: "seed_user_8", content: "Exactly. We adopted RSC in Next.js because it's a React primitive." },
      { post_id: allPosts[6]?.post_id, user_id: "seed_user_3", content: "Lmao, too accurate 😂" },
      { post_id: allPosts[6]?.post_id, user_id: "seed_user_6", content: "Can confirm, added 3 new frameworks to my project this morning." },
      { post_id: allPosts[11]?.post_id, user_id: "seed_user_3", content: "This is the way. Don't fight the platform." },
      { post_id: allPosts[11]?.post_id, user_id: "seed_user_4", content: "Based take. I'd add: global state → Zustand for the 0.01% of cases." },
      { post_id: allPosts[12]?.post_id, user_id: "seed_user_6", content: "Streaming AI responses with React Server Components is *chef's kiss*" },
      { post_id: allPosts[14]?.post_id, user_id: "seed_user_1", content: "Next.js keeps getting better. Ship it!" },
    ].filter(c => c.post_id);

    await Comment.bulkCreate(commentData, { ignoreDuplicates: true });
    console.log(`  Created ${commentData.length} comments`);

    // ====== SEED FOLLOWERS ======
    console.log("Seeding followers...");
    const followerData = [
      { follower_user_id: "seed_user_2", followed_user_id: "seed_user_1" },
      { follower_user_id: "seed_user_3", followed_user_id: "seed_user_1" },
      { follower_user_id: "seed_user_4", followed_user_id: "seed_user_1" },
      { follower_user_id: "seed_user_5", followed_user_id: "seed_user_1" },
      { follower_user_id: "seed_user_6", followed_user_id: "seed_user_1" },
      { follower_user_id: "seed_user_1", followed_user_id: "seed_user_2" },
      { follower_user_id: "seed_user_3", followed_user_id: "seed_user_2" },
      { follower_user_id: "seed_user_5", followed_user_id: "seed_user_2" },
      { follower_user_id: "seed_user_1", followed_user_id: "seed_user_3" },
      { follower_user_id: "seed_user_6", followed_user_id: "seed_user_3" },
      { follower_user_id: "seed_user_8", followed_user_id: "seed_user_3" },
      { follower_user_id: "seed_user_3", followed_user_id: "seed_user_4" },
      { follower_user_id: "seed_user_6", followed_user_id: "seed_user_4" },
      { follower_user_id: "seed_user_1", followed_user_id: "seed_user_5" },
      { follower_user_id: "seed_user_2", followed_user_id: "seed_user_5" },
      { follower_user_id: "seed_user_3", followed_user_id: "seed_user_6" },
      { follower_user_id: "seed_user_4", followed_user_id: "seed_user_6" },
      { follower_user_id: "seed_user_6", followed_user_id: "seed_user_7" },
      { follower_user_id: "seed_user_8", followed_user_id: "seed_user_7" },
      { follower_user_id: "seed_user_7", followed_user_id: "seed_user_8" },
      { follower_user_id: "seed_user_6", followed_user_id: "seed_user_8" },
    ];
    await Follower.bulkCreate(followerData, { ignoreDuplicates: true });
    console.log(`  Created ${followerData.length} followers`);

    console.log("\n✅ Seed completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

seed();

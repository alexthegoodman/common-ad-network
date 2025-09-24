import { PrismaClient } from "@prisma/client";
import { hashPassword, generateInviteCode } from "../app/lib/auth";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // UPDATE THIS EMAIL BEFORE RUNNING THE SEED
  const ADMIN_EMAIL = "alexthegoodman@gmail.com"; // <-- Change this to your email
  const ADMIN_PASSWORD = "testing"; // <-- Change this to your password
  const ADMIN_COMPANY = "Common Ad Network";
  const ADMIN_COMPANY_LINK = "https://common-ad-network.vercel.app";

  // Check if admin user already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (existingAdmin) {
    console.log(`✅ Admin user with email ${ADMIN_EMAIL} already exists`);
    return;
  }

  // Create admin user with high karma
  console.log("👤 Creating admin user...");
  const hashedPassword = await hashPassword(ADMIN_PASSWORD);

  const adminUser = await prisma.user.create({
    data: {
      email: ADMIN_EMAIL,
      password: hashedPassword,
      companyName: ADMIN_COMPANY,
      companyLink: ADMIN_COMPANY_LINK,
      karma: 10000, // Start with high karma
      isApproved: true,
    },
  });

  console.log(`✅ Admin user created with ID: ${adminUser.id}`);
  console.log(`📧 Email: ${adminUser.email}`);
  console.log(`🏢 Company: ${adminUser.companyName}`);
  console.log(`⚡ Karma: ${adminUser.karma}`);

  // Create initial invite codes for the admin to use
  console.log("🎫 Creating initial invite codes...");

  const inviteCodes = [];
  for (let i = 0; i < 5; i++) {
    const code = generateInviteCode();
    const inviteCode = await prisma.inviteCode.create({
      data: {
        code,
        createdBy: adminUser.id,
      },
    });
    inviteCodes.push(inviteCode.code);
  }

  console.log(`✅ Created ${inviteCodes.length} invite codes:`);
  inviteCodes.forEach((code, index) => {
    console.log(`   ${index + 1}. ${code}`);
  });

  // Create a sample ad for testing
  console.log("📢 Creating sample ad...");

  const sampleAd = await prisma.ad.create({
    data: {
      userId: adminUser.id,
      headline: "Welcome to Common Ad Network!",
      description:
        "The ad exchange for indie makers. Join our community and start earning karma today!",
      imageUrl:
        "https://via.placeholder.com/400x300/6366f1/ffffff?text=Common+Ad+Network",
      linkUrl: "https://common-ad-network.vercel.app",
      impressions: 100, // Some sample data
      clicks: 5,
    },
  });

  console.log(`✅ Sample ad created with ID: ${sampleAd.id}`);

  // Create a welcome post
  console.log("📝 Creating welcome post...");

  const welcomePost = await prisma.post.create({
    data: {
      userId: adminUser.id,
      content: `🎉 Welcome to Common Ad Network! This is the social feed where indie makers can connect, share ideas, and collaborate. Feel free to introduce yourself and your projects!

Key features:
• Earn karma by displaying ads and getting genuine clicks
• Spend karma to promote your own ads across the network
• CTR-based rewards system (1-40 karma per click)
• Spam protection with IP validation
• Bonus karma for smaller sites

Let's build something amazing together! 🚀`,
    },
  });

  console.log(`✅ Welcome post created with ID: ${welcomePost.id}`);

  console.log("\n🎉 Seed completed successfully!");
  console.log("\n📋 Summary:");
  console.log(`   👤 Admin user: ${adminUser.email}`);
  console.log(`   🔑 Password: ${ADMIN_PASSWORD}`);
  console.log(`   🎫 Invite codes: ${inviteCodes.length} created`);
  console.log(`   📢 Sample ad: Created`);
  console.log(`   📝 Welcome post: Created`);

  console.log("\n🔗 Invite URLs for sharing:");
  inviteCodes.forEach((code, index) => {
    console.log(
      `   ${index + 1}. http://localhost:3000/register?invite=${code}`
    );
  });

  console.log("\n⚠️  Remember to:");
  console.log("   1. Update the ADMIN_EMAIL in prisma/seed.ts before running");
  console.log("   2. Change the default password after first login");
  console.log("   3. Set up your environment variables (.env)");
  console.log("   4. Deploy the embed script to your CDN");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// Test with different approaches to access Firestore
const admin = require("firebase-admin");

async function testWithServiceAccount() {
  try {
    // By default, firebase-admin uses the GOOGLE_APPLICATION_CREDENTIALS env variable
    // or credentials from the environment
    const listRegistrations = async () => {
      try {
        const db = admin.initializeApp().firestore();
        const snapshot = await db.collection("registrations").get();
        
        console.log("📊 Service Account Access:");
        console.log(`   Total documents: ${snapshot.size}\n`);
        
        snapshot.forEach((doc) => {
          const data = doc.data();
          console.log(`✅ ${data.name} (${data.email})`);
        });
      } catch (error) {
        console.error("❌ Service account access failed:", error.message);
        console.log("   (This is expected if GOOGLE_APPLICATION_CREDENTIALS is not set)\n");
      }
    };

    await listRegistrations();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

testWithServiceAccount();

const FIREBASE_PROJECT_ID = "sneakout-landing";
const FIREBASE_API_KEY = "AIzaSyA5Fivf6Yjvr1I-k1RnaHb8rhxbC7-I4J8";

const FIRESTORE_API_URL = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents`;

async function debugParsing() {
  try {
    console.log("📋 Fetching raw Firestore documents...\n");

    const url = `${FIRESTORE_API_URL}/registrations?pageSize=1000&key=${FIREBASE_API_KEY}`;
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error("❌ Error fetching from Firestore:", response.status);
      return;
    }

    const data = await response.json();
    const documents = data.documents || [];

    console.log(`📊 Raw documents count: ${documents.length}\n`);

    // Simulate the parsing logic
    const registrations = documents
      .map((doc, index) => {
        try {
          const fields = doc.fields || {};
          const parsed = {
            id: doc.name.split("/").pop(),
            name: fields.name?.stringValue || "",
            email: fields.email?.stringValue || "",
            phone: fields.phone?.stringValue,
            instagram: fields.instagram?.stringValue,
            timestamp: fields.timestamp?.timestampValue || new Date().toISOString(),
          };
          console.log(`✅ Document ${index + 1} parsed successfully:`);
          console.log(`   Name: "${parsed.name}"`);
          console.log(`   Email: "${parsed.email}"`);
          console.log(`   Has phone: ${!!parsed.phone}`);
          console.log(`   Has instagram: ${!!parsed.instagram}`);
          console.log(`   Timestamp: ${parsed.timestamp}\n`);
          return parsed;
        } catch (e) {
          console.warn(`❌ Error parsing document ${index + 1}:`, e.message);
          return null;
        }
      })
      .filter((r) => r !== null);

    console.log(`\n📈 Final results:`);
    console.log(`   Raw documents: ${documents.length}`);
    console.log(`   Parsed documents: ${registrations.length}`);
    console.log(`   Filtered out: ${documents.length - registrations.length}\n`);

    if (documents.length !== registrations.length) {
      console.log("⚠️  Document loss detected!");
    } else {
      console.log("✅ All documents parsed successfully!");
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

debugParsing();

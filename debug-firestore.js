const https = require("https");

const FIREBASE_PROJECT_ID = "sneakout-landing";
const FIREBASE_API_KEY = "AIzaSyA5Fivf6Yjvr1I-k1RnaHb8rhxbC7-I4J8";

const FIRESTORE_API_URL = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents`;

async function checkFirestore() {
  try {
    console.log("🔍 Checking Firestore registrations...\n");
    
    const url = `${FIRESTORE_API_URL}/registrations?pageSize=100&key=${FIREBASE_API_KEY}`;
    console.log(`Fetching from: ${FIRESTORE_API_URL}/registrations\n`);

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    console.log(`Status: ${response.status}\n`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Error:", errorText);
      return;
    }

    const data = await response.json();
    console.log("📊 Response structure:");
    console.log(`- documents: ${data.documents?.length || 0}`);
    console.log(`- nextPageToken: ${data.nextPageToken || "none"}\n`);

    if (!data.documents || data.documents.length === 0) {
      console.log("⚠️  No documents found!\n");
      return;
    }

    console.log(`✅ Found ${data.documents.length} documents:\n`);

    data.documents.forEach((doc, index) => {
      const fields = doc.fields || {};
      const docId = doc.name.split("/").pop();
      console.log(`${index + 1}. ${fields.name?.stringValue || "N/A"}`);
      console.log(`   Email: ${fields.email?.stringValue || "N/A"}`);
      console.log(`   Phone: ${fields.phone?.stringValue || "none"}`);
      console.log(`   Instagram: ${fields.instagram?.stringValue || "none"}`);
      console.log(`   Time: ${fields.timestamp?.timestampValue || "N/A"}`);
      console.log(`   Doc ID: ${docId}\n`);
    });

    // Check for next page token
    if (data.nextPageToken) {
      console.log(
        `\n📄 There's more data! nextPageToken: ${data.nextPageToken}`
      );
      console.log(
        "Note: The REST API response is paginated. Check if more documents exist."
      );
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

checkFirestore();

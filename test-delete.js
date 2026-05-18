const PROJECT_ID = "sneakout-landing";
const FIRESTORE_API_URL = "https://firestore.googleapis.com/v1/projects";

async function testDeleteEndpoint() {
  try {
    // First, fetch an ID to delete
    console.log("🔍 Fetching registrations to get an ID...");
    const fetchResponse = await fetch(
      `${FIRESTORE_API_URL}/${PROJECT_ID}/databases/(default)/documents/registrations`,
      { method: "GET" }
    );
    
    if (!fetchResponse.ok) {
      throw new Error(`Firebase API error: ${fetchResponse.statusText}`);
    }

    const data = await fetchResponse.json();
    if (!data.documents || data.documents.length === 0) {
      console.log("⚠️  No documents found to test deletion");
      return;
    }

    // Get first document ID
    const docPath = data.documents[0].name;
    const docName = docPath.split("/").pop();
    console.log(`✅ Found document: ${docName}`);
    console.log(`📄 Document path: ${docPath}`);

    // Now test the DELETE endpoint
    console.log("\n🗑️  Testing DELETE endpoint...");
    const testResponse = await fetch("http://localhost:3002/api/admin/registrations", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: docName }),
    });

    const result = await testResponse.json();
    console.log(`Status: ${testResponse.status}`);
    console.log("Response:", JSON.stringify(result, null, 2));

    if (testResponse.ok) {
      console.log("\n✅ DELETE endpoint works! Testing GET to verify deletion...");
      const verifyResponse = await fetch(
        `${FIRESTORE_API_URL}/${PROJECT_ID}/databases/(default)/documents/preRegistrations/${docName}`,
        { method: "GET" }
      );
      
      if (verifyResponse.status === 404) {
        console.log("✅ Document successfully deleted from Firestore!");
      } else {
        console.log("⚠️  Document still exists in Firestore");
      }
    } else {
      console.log("\n❌ DELETE endpoint failed");
    }
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

testDeleteEndpoint();

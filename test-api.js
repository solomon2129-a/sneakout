// This script tests the actual Next.js API endpoint
async function testAPIEndpoint() {
  try {
    console.log("🔍 Testing /api/admin/registrations endpoint...\n");

    const response = await fetch("http://localhost:3000/api/admin/registrations", {
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
    console.log(`✅ Response received`);
    console.log(`   Success: ${data.success}`);
    console.log(`   Count: ${data.count}`);
    console.log(`   Registrations: ${data.registrations?.length || 0}\n`);

    if (data.registrations) {
      console.log("📋 Registrations:");
      data.registrations.forEach((reg, index) => {
        console.log(`${index + 1}. ${reg.name} (${reg.email})`);
      });
    }
  } catch (error) {
    console.error(
      "❌ Error: Make sure the dev server is running on port 3000\n",
      error.message
    );
  }
}

testAPIEndpoint();

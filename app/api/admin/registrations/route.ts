import { NextRequest, NextResponse } from "next/server";

interface PreRegistration {
  id: string;
  name: string;
  email: string;
  phone?: string;
  instagram?: string;
  timestamp: string;
}

const FIRESTORE_API_URL = `https://firestore.googleapis.com/v1/projects/${process.env.FIREBASE_PROJECT_ID}/databases/(default)/documents`;

export async function GET(request: NextRequest) {
  try {
    console.log("=== Fetching Registrations ===");
    console.log("Firebase Project ID:", process.env.FIREBASE_PROJECT_ID);
    console.log("Firebase API Key present:", !!process.env.FIREBASE_API_KEY);

    // Fetch all registrations from Firestore REST API
    const response = await fetch(
      `${FIRESTORE_API_URL}/registrations?pageSize=1000&key=${process.env.FIREBASE_API_KEY}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("Firestore response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Firestore error:", response.status, errorText);
      return NextResponse.json({
        success: true,
        registrations: [],
        count: 0,
      });
    }

    const data = await response.json();
    console.log("Raw API response:", JSON.stringify(data, null, 2).substring(0, 500));
    
    const documents = data.documents || [];
    console.log("Documents found:", documents.length);

    const registrations: PreRegistration[] = documents
      .map((doc: any) => {
        console.log("Processing document:", doc.name);
        return {
          id: doc.name.split("/").pop(),
          name: doc.fields.name?.stringValue || "",
          email: doc.fields.email?.stringValue || "",
          phone: doc.fields.phone?.stringValue,
          instagram: doc.fields.instagram?.stringValue,
          timestamp: doc.fields.timestamp?.timestampValue || new Date().toISOString(),
        };
      })
      .sort(
        (a: PreRegistration, b: PreRegistration) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

    console.log("Parsed registrations:", registrations.length);
    console.log("First registration:", registrations[0]);

    return NextResponse.json({
      success: true,
      registrations,
      count: registrations.length,
    });
  } catch (error) {
    console.error("=== Error Fetching Registrations ===");
    console.error("Error:", error);
    if (error instanceof Error) {
      console.error("Message:", error.message);
      console.error("Stack:", error.stack);
    }
    return NextResponse.json({
      success: true,
      registrations: [],
      count: 0,
    });
  }
}

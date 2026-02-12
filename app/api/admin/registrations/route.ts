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
    console.log("API URL:", FIRESTORE_API_URL);

    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_API_KEY) {
      console.error("Missing Firebase credentials");
      return NextResponse.json({
        success: true,
        registrations: [],
        count: 0,
      });
    }

    // Fetch all registrations from Firestore REST API
    const url = `${FIRESTORE_API_URL}/registrations?pageSize=1000&key=${process.env.FIREBASE_API_KEY}`;
    console.log("Fetching from:", url.split("?")[0] + "?key=***");
    
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    console.log("Firestore response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Firestore error:", response.status, errorText.substring(0, 300));
      
      // Even if there's an error, return empty array (might just mean no documents yet)
      if (response.status === 404 || response.status === 400) {
        return NextResponse.json({
          success: true,
          registrations: [],
          count: 0,
        });
      }
      
      return NextResponse.json({
        success: false,
        error: "Failed to fetch from Firestore",
        registrations: [],
        count: 0,
      }, { status: response.status });
    }

    const data = await response.json();
    console.log("Raw API response keys:", Object.keys(data));
    
    const documents = data.documents || [];
    console.log("Documents found:", documents.length);

    if (documents.length === 0) {
      console.log("No documents found in Firestore");
      return NextResponse.json({
        success: true,
        registrations: [],
        count: 0,
      });
    }

    const registrations: PreRegistration[] = documents
      .map((doc: any) => {
        try {
          const fields = doc.fields || {};
          return {
            id: doc.name.split("/").pop(),
            name: fields.name?.stringValue || "",
            email: fields.email?.stringValue || "",
            phone: fields.phone?.stringValue,
            instagram: fields.instagram?.stringValue,
            timestamp: fields.timestamp?.timestampValue || new Date().toISOString(),
          };
        } catch (e) {
          console.warn("Error parsing document:", doc.name, e);
          return null;
        }
      })
      .filter((r: any) => r !== null)
      .sort(
        (a: PreRegistration, b: PreRegistration) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

    console.log("Successfully parsed registrations:", registrations.length);

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
      success: false,
      error: "Exception occurred while fetching registrations",
      registrations: [],
      count: 0,
    }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";

interface PreRegistration {
  fields: {
    id: { stringValue: string };
    name: { stringValue: string };
    email: { stringValue: string };
    phone?: { stringValue: string };
    instagram?: { stringValue: string };
    timestamp: { timestampValue: string };
  };
}

// Simple rate limiting (in-memory)
const submissionTracker: { [ip: string]: number[] } = {};
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 submissions per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  if (!submissionTracker[ip]) {
    submissionTracker[ip] = [];
  }

  submissionTracker[ip] = submissionTracker[ip].filter(
    (time) => now - time < RATE_LIMIT_WINDOW
  );

  if (submissionTracker[ip].length >= RATE_LIMIT_MAX) {
    return true;
  }

  submissionTracker[ip].push(now);
  return false;
}

const FIRESTORE_API_URL = `https://firestore.googleapis.com/v1/projects/${process.env.FIREBASE_PROJECT_ID}/databases/(default)/documents`;

async function checkDuplicateEmail(email: string): Promise<boolean> {
  try {
    const response = await fetch(
      `${FIRESTORE_API_URL}/registrations?pageSize=1000&key=${process.env.FIREBASE_API_KEY}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      console.error("Error checking duplicates:", response.status);
      return false;
    }

    const data = await response.json();
    const documents = data.documents || [];

    return documents.some((doc: any) => {
      return doc.fields.email.stringValue === email.toLowerCase();
    });
  } catch (error) {
    console.error("Error querying registrations:", error);
    return false;
  }
}

async function saveToFirestore(registration: any): Promise<boolean> {
  try {
    console.log("Saving to Firestore...", registration);

    const response = await fetch(
      `${FIRESTORE_API_URL}/registrations?key=${process.env.FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: {
            id: { stringValue: registration.id },
            name: { stringValue: registration.name },
            email: { stringValue: registration.email },
            ...(registration.phone && {
              phone: { stringValue: registration.phone },
            }),
            ...(registration.instagram && {
              instagram: { stringValue: registration.instagram },
            }),
            timestamp: { timestampValue: registration.timestamp },
          },
        }),
      }
    );

    console.log("Firestore response status:", response.status);

    if (!response.ok) {
      const error = await response.text();
      console.error("Firestore error:", error);
      return false;
    }

    const result = await response.json();
    console.log("Saved successfully:", result);
    return true;
  } catch (error) {
    console.error("Error saving to Firestore:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("=== Submission Request ===");
    console.log("Firebase Project ID:", process.env.FIREBASE_PROJECT_ID);
    console.log("Firebase API Key present:", !!process.env.FIREBASE_API_KEY);

    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, phone, instagram } = body;
    console.log("Form data received - Name:", name, "Email:", email);

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check for duplicate email
    console.log("Checking for duplicate email...");
    const isDuplicate = await checkDuplicateEmail(email);
    if (isDuplicate) {
      return NextResponse.json(
        { success: false, error: "Email already registered" },
        { status: 400 }
      );
    }

    // Create new registration
    const newRegistration = {
      id: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      ...(phone && { phone: phone.trim() }),
      ...(instagram && { instagram: instagram.trim() }),
      timestamp: new Date().toISOString(),
    };

    // Save to Firestore
    const saved = await saveToFirestore(newRegistration);

    if (!saved) {
      return NextResponse.json(
        { success: false, error: "Failed to save registration" },
        { status: 500 }
      );
    }

    console.log("Registration saved successfully!");
    return NextResponse.json({
      success: true,
      message: "Registration saved successfully",
    });
  } catch (error) {
    console.error("=== Submission Error ===");
    console.error("Error:", error);
    if (error instanceof Error) {
      console.error("Message:", error.message);
    }
    return NextResponse.json(
      { success: false, error: "Failed to process submission" },
      { status: 500 }
    );
  }
}

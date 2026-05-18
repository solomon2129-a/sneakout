import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  serverTimestamp 
} from "firebase/firestore";

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

async function checkDuplicateEmail(email: string): Promise<boolean> {
  try {
    const q = query(
      collection(db, "registrations"),
      where("email", "==", email.toLowerCase())
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking duplicates:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("=== Submission Request (Firestore SDK) ===");

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

    // Save to Firestore using SDK
    console.log("Saving to Firestore...");
    await addDoc(collection(db, "registrations"), {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      instagram: instagram?.trim() || null,
      timestamp: serverTimestamp(),
    });

    console.log("Registration saved successfully!");
    return NextResponse.json({
      success: true,
      message: "Registration saved successfully",
    });
  } catch (error) {
    console.error("=== Submission Error ===");
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process submission" },
      { status: 500 }
    );
  }
}


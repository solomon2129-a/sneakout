import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { 
  collection, 
  getDocs, 
  orderBy, 
  query, 
  deleteDoc, 
  doc 
} from "firebase/firestore";

interface PreRegistration {
  id: string;
  name: string;
  email: string;
  phone?: string;
  instagram?: string;
  timestamp: string;
}

export async function GET(request: NextRequest) {
  try {
    console.log("=== Fetching Registrations (Firestore SDK) ===");

    const q = query(
      collection(db, "registrations"),
      orderBy("timestamp", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const registrations: PreRegistration[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      registrations.push({
        id: doc.id,
        name: data.name || "",
        email: data.email || "",
        phone: data.phone,
        instagram: data.instagram,
        timestamp: data.timestamp?.toDate ? data.timestamp.toDate().toISOString() : new Date().toISOString(),
      });
    });

    console.log(`Successfully fetched ${registrations.length} registrations`);

    return NextResponse.json({
      success: true,
      registrations,
      count: registrations.length,
    });
  } catch (error) {
    console.error("=== Error Fetching Registrations ===");
    console.error("Error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch registrations",
      registrations: [],
      count: 0,
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    console.log("=== Deleting Registration (Firestore SDK) ===");
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({
        success: false,
        error: "Registration ID required",
      }, { status: 400 });
    }

    await deleteDoc(doc(db, "registrations", id));

    console.log("Registration deleted successfully:", id);
    return NextResponse.json({
      success: true,
      message: "Registration deleted successfully",
    });
  } catch (error) {
    console.error("=== Error Deleting Registration ===");
    console.error("Error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to delete registration",
    }, { status: 500 });
  }
}


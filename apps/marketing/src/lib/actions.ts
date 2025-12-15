"use server";

import fs from "fs/promises";
import path from "path";

interface WaitlistFormData {
  email: string;
  name?: string;
  company?: string;
  role?: string;
}

interface WaitlistResult {
  success: boolean;
  message: string;
}

export async function submitWaitlistForm(
  data: WaitlistFormData
): Promise<WaitlistResult> {
  try {
    // Validate email
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return {
        success: false,
        message: "Please provide a valid email address.",
      };
    }

    const waitlistDir = path.join(process.cwd(), "data", "waitlist");
    const waitlistFile = path.join(waitlistDir, "entries.json");

    // Ensure directory exists
    await fs.mkdir(waitlistDir, { recursive: true });

    // Read existing entries
    let entries: WaitlistFormData[] = [];
    try {
      const fileContent = await fs.readFile(waitlistFile, "utf-8");
      entries = JSON.parse(fileContent);
    } catch (error) {
      // File doesn't exist yet, that's okay
    }

    // Check if email already exists
    if (entries.some((entry) => entry.email === data.email)) {
      return {
        success: false,
        message: "You're already on the waitlist! We'll be in touch soon.",
      };
    }

    // Add new entry with timestamp
    entries.push({
      ...data,
      email: data.email,
      name: data.name,
      company: data.company,
      role: data.role,
    });

    // Write back to file
    await fs.writeFile(waitlistFile, JSON.stringify(entries, null, 2));

    return {
      success: true,
      message: "You're on the list! We'll notify you when we launch.",
    };
  } catch (error) {
    console.error("Waitlist submission error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

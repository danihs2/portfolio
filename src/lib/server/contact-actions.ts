"use server";

import { z } from "zod";
import type { ContactSubmissionValues } from "@/lib/portfolio-types";
import { sendContactNotificationEmail } from "@/lib/server/mailer";
import { prisma } from "@/lib/server/prisma";

const contactSubmissionSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.email("Enter a valid email."),
    country: z.string().min(2, "Country is required."),
    phone: z
      .string()
      .trim()
      .optional()
      .refine(
        (value) => !value || /^\+?[0-9()\-\s]{7,20}$/.test(value),
        "Phone number format looks invalid.",
      ),
    businessInquiry: z.string().min(4, "Business inquiry topic is required."),
    projectDetails: z
      .string()
      .min(20, "Project details must be at least 20 characters."),
    expectedStartDate: z.string().optional(),
    expectedEndDate: z.string().optional(),
  })
  .superRefine((values, ctx) => {
    if (values.expectedStartDate && values.expectedEndDate) {
      const start = Date.parse(values.expectedStartDate);
      const end = Date.parse(values.expectedEndDate);
      if (!Number.isNaN(start) && !Number.isNaN(end) && end < start) {
        ctx.addIssue({
          code: "custom",
          path: ["expectedEndDate"],
          message: "Expected end date must be after start date.",
        });
      }
    }
  });

export async function submitContactAction(values: ContactSubmissionValues) {
  const payload = contactSubmissionSchema.parse(values);

  const savedSubmission = await prisma.contactSubmission.create({
    data: payload,
  });

  await sendContactNotificationEmail(payload);

  return {
    id: savedSubmission.id,
    success: true,
  };
}

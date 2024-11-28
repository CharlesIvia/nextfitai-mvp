// services/api.ts
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "@/firebase/config";
import type { OfferAnalysis, EmailTemplate, UserDocumentsResponse, UserProfile, SubscriptionStatus } from "@/types/api";
import { get } from "http";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: async (headers) => {
      try {
        // Get Firebase auth token
        const token = await auth.currentUser?.getIdToken();
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);

          const uid = auth.currentUser?.uid;
          if (uid) {
            headers.set("x-user-id", uid);
          } else {
            console.error("User ID not found in Firebase auth object");
          }
        }

        // Set API key from environment variable
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        if (apiKey) {
          headers.set("x-api-key", apiKey);
        } else {
          console.error("API key not found in environment variables");
        }
      } catch (error) {
        console.error("Error setting headers:", error);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    // Get user profile from Firestore
    getUserProfile: builder.query<UserProfile, void>({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
    }),

    // Update user profile in backend
    updateUserProfile: builder.mutation<void, Partial<UserProfile>>({
      query: (updates) => ({
        url: "/user/profile",
        method: "PUT",
        body: updates,
      }),
    }),

    // Get upload URL
    getUploadUrl: builder.mutation<string, string>({
      query: (filename) => ({
        url: "/documents/get-upload-url",
        method: "POST",
        body: JSON.stringify({ filename, userId: auth.currentUser?.uid }),
      }),
    }),

    // Upload document - PDF file
    uploadDocument: builder.mutation<void, { fileId: string; file: File }>({
      query: ({ fileId, file }) => {
        const formData = new FormData();
        formData.append("file", file);

        return {
          url: `/documents/${fileId}/upload`,
          method: "POST",
          // Remove Content-Type header to let browser set it with boundary
          prepareHeaders: (headers: any) => {
            headers.set("Content-Type", "application/pdf");
            return headers;
          },
          body: formData,
        };
      },
    }),

    // Process document

    processDocument: builder.mutation<void, string>({
      query: (fileId) => ({
        url: `/documents/${fileId}/process`,
        method: "POST",
      }),
    }),

    // Get all user documents
    getUserDocuments: builder.query<UserDocumentsResponse["data"], void>({
      query: () => ({
        url: "/documents/user-documents",
        method: "GET",
      }),
      transformResponse: (response: UserDocumentsResponse) => response.data,
    }),

    //Update document

    updateDocument: builder.mutation<void, { fileId: string; data: any }>({
      query: ({ fileId, data }) => ({
        url: `/documents/${fileId}`,
        method: "PUT",
        body: data,
      }),
    }),

    // Analyze offer

    analyzeOffer: builder.mutation<OfferAnalysis, FormData>({
      query: (data) => ({
        url: "/analyze-offer",
        method: "POST",
        body: data,
      }),
    }),

    syncSubscription: builder.mutation<SubscriptionStatus, void>({
      query: () => ({
        url: "/subscriptions/sync",
        method: "POST",
      }),
    }),

    // Check subscription status
    getSubscriptionStatus: builder.query<SubscriptionStatus, string>({
      query: (uid) => ({
        url: `/subscriptions/status/${uid}`,
        method: "GET",
      }),
    }),

    getEmailTemplate: builder.mutation<
      EmailTemplate,
      {
        offerId: string;
        type: "counter_offer" | "acceptance" | "negotiation";
      }
    >({
      query: (params) => ({
        url: "/generate-email",
        method: "POST",
        body: params,
      }),
    }),
  }),
});

export const {
  useAnalyzeOfferMutation,
  useGetEmailTemplateMutation,
  useGetUploadUrlMutation,
  useUploadDocumentMutation,
  useProcessDocumentMutation,
  useGetUserDocumentsQuery,
  useUpdateDocumentMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useSyncSubscriptionMutation,
  useGetSubscriptionStatusQuery,
} = api;

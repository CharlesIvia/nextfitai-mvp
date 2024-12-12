// types/api.ts
export interface BaseResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface OfferAnalysis extends BaseResponse {
  data?: {
    marketRate: {
      min: number;
      max: number;
      median: number;
    };
    analysis: {
      strengths: string[];
      weaknesses: string[];
      opportunities: string[];
    };
    recommendations: {
      priority: string;
      explanation: string;
      suggestedAction: string;
    }[];
  };
}

export interface EmailTemplate extends BaseResponse {
  data?: {
    subject: string;
    body: string;
    type: "counter_offer" | "acceptance" | "negotiation";
  };
}

export interface DocumentData {
  id: string;
  status: "pending_upload" | "uploaded" | "processing" | "completed" | "error";
  createdAt: string;
  updatedAt: string;
  filePath: string;
  userId: string;
  extractedData?: {
    id: string;
  };
}

export interface OfferData {
  documentId: string;
  companyName: string;
  role: string;
  location: string;
  compensation: {
    baseSalary: number;
    equity: string | null;
    bonus: string | null;
  };
  benefits: string[];
  analysis: OfferAnalysis["data"];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserDocumentsResponse extends BaseResponse {
  data: {
    document: DocumentData;
    offer: OfferData | null;
  }[];
}

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  company: string;
  position: string;
  experience: string;
  industry: string;
  data: {
    [key: string]: string;
  };
}

export interface SubscriptionStatus {
  data: {
    uid: string;
    email: string;
    subscription_id?: string;
    status: "active" | "expired" | "cancelled" | "payment_failed" | "none";
    subscription_type?: string;
    expiry_date?: string;
    created_at?: string;
    last_synced: string;
  };
  meta: {
    isStale: boolean;
    lastSynced: string;
    message: string;
  };
}

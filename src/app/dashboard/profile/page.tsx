"use client";
import { useState, useEffect } from "react";
import { User, Mail, Building, Briefcase, ArrowLeft, Save } from "lucide-react";
import styles from "./profile.module.css";
import { useRouter } from "next/navigation";
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from "@/services/api";
import { Toast } from "@/components/toast/toast";
import Header from "@/components/header/header";

interface ProfileData {
  name: string;
  email: string;
  company: string;
  position: string;
  experience: string;
  industry: string;
}

const EXPERIENCE_OPTIONS = [
  { value: "0-2", label: "0-2 years" },
  { value: "2-5", label: "2-5 years" },
  { value: "5-10", label: "5-10 years" },
  { value: "10+", label: "10+ years" },
];

const INDUSTRY_OPTIONS = [
  { value: "technology", label: "Technology" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "retail", label: "Retail" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "other", label: "Other" },
];

const DEFAULT_PROFILE: ProfileData = {
  name: "",
  email: "",
  company: "",
  position: "",
  experience: "0-2",
  industry: "technology",
};

export default function Profile() {
  const router = useRouter();
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [profileData, setProfileData] = useState<ProfileData>(DEFAULT_PROFILE);

  const { data: profile, isLoading, refetch } = useGetUserProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateUserProfileMutation();

  // Update profile data when API data is received
  useEffect(() => {
    if (profile) {
      setProfileData({
        name: profile.data.name || "",
        email: profile.data.email || "",
        company: profile.data.company || "",
        position: profile.data.position || "",
        experience: profile.data.experience || "0-2",
        industry: profile.data.industry || "technology",
      });
    }
  }, [profile]);

  const handleInputChange =
    (field: keyof ProfileData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setProfileData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(profileData).unwrap();
      setNotification({
        type: "success",
        message: "Profile updated successfully",
      });
      await refetch();
    } catch (error) {
      setNotification({
        type: "error",
        message: "Failed to update profile. Please try again.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spin} />
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {notification && (
        <Toast message={notification.message} type={notification.type} onClose={() => setNotification(null)} />
      )}

      <div className={styles.content}>
        <Header />

        <div className={styles.profileWrapper}>
          <div className={styles.profileSection}>
            <div className={styles.profileHeader}>
              <div className={styles.avatarContainer}>
                <div className={styles.avatar}>
                  <User size={40} />
                </div>
                <button className={styles.uploadButton} disabled>
                  Change Photo
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor='name'>Full Name</label>
                  <div className={styles.inputWrapper}>
                    <User size={20} />
                    <input
                      id='name'
                      type='text'
                      value={profileData.name}
                      onChange={handleInputChange("name")}
                      placeholder='Enter your full name'
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor='email'>Email</label>
                  <div className={styles.inputWrapper}>
                    <Mail size={20} />
                    <input
                      id='email'
                      type='email'
                      value={profileData.email}
                      onChange={handleInputChange("email")}
                      placeholder='Enter your email'
                      readOnly // Email should typically be read-only
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor='company'>Company</label>
                  <div className={styles.inputWrapper}>
                    <Building size={20} />
                    <input
                      id='company'
                      type='text'
                      value={profileData.company}
                      onChange={handleInputChange("company")}
                      placeholder='Enter your company'
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor='position'>Position</label>
                  <div className={styles.inputWrapper}>
                    <Briefcase size={20} />
                    <input
                      id='position'
                      type='text'
                      value={profileData.position}
                      onChange={handleInputChange("position")}
                      placeholder='Enter your position'
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor='experience'>Experience Level</label>
                  <div className={styles.selectWrapper}>
                    <select id='experience' value={profileData.experience} onChange={handleInputChange("experience")}>
                      {EXPERIENCE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor='industry'>Industry</label>
                  <div className={styles.selectWrapper}>
                    <select id='industry' value={profileData.industry} onChange={handleInputChange("industry")}>
                      {INDUSTRY_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button type='submit' className={styles.saveButton} disabled={isUpdating}>
                {isUpdating ? (
                  <>
                    <span className={styles.spinner} />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Save Changes
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

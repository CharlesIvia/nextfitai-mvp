"use client";

import { useState } from "react";
import { ArrowLeft, Bell, Lock, Mail, Smartphone, Trash2, LogOut, CreditCard } from "lucide-react";
import styles from "./settings.module.css";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import ConfirmationDialog from "@/components/confirmation-dialog/confirmation-dialog";

export default function Settings() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    twoFactorAuth: false,
  });

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      router.replace("/");
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      // Delete user account
      // ...
      router.replace("/");
    } catch (error) {
      console.error("Error deleting account:", error);
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => router.push("/dashboard")}>
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
      </div>

      <div className={styles.content}>
        <section className={styles.settingsSection}>
          <h2>
            <Bell size={20} />
            Notifications
          </h2>
          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h3>Email Notifications</h3>
                <p>Receive updates about your offer analysis</p>
              </div>
              <label className={styles.switch}>
                <input
                  type='checkbox'
                  checked={settings.emailNotifications}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      emailNotifications: e.target.checked,
                    })
                  }
                />
                <span className={styles.slider}></span>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h3>Push Notifications</h3>
                <p>Get instant updates on your device</p>
              </div>
              <label className={styles.switch}>
                <input
                  type='checkbox'
                  checked={settings.pushNotifications}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      pushNotifications: e.target.checked,
                    })
                  }
                />
                <span className={styles.slider}></span>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h3>Marketing Emails</h3>
                <p>Receive tips and insights about negotiation</p>
              </div>
              <label className={styles.switch}>
                <input
                  type='checkbox'
                  checked={settings.marketingEmails}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      marketingEmails: e.target.checked,
                    })
                  }
                />
                <span className={styles.slider}></span>
              </label>
            </div>
          </div>
        </section>
        <section className={styles.settingsSection}>
          <h2>
            <Lock size={20} />
            Security
          </h2>
          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h3>Two-Factor Authentication</h3>
                <p>Add an extra layer of security to your account</p>
              </div>
              <label className={styles.switch}>
                <input
                  type='checkbox'
                  checked={settings.twoFactorAuth}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      twoFactorAuth: e.target.checked,
                    })
                  }
                />
                <span className={styles.slider}></span>
              </label>
            </div>

            <button className={styles.actionButton}>
              <Lock size={20} />
              Change Password
            </button>
          </div>
        </section>

        <section className={styles.settingsSection}>
          <h2>
            <CreditCard size={20} />
            Billing
          </h2>
          <div className={styles.settingsList}>
            <button className={styles.actionButton} onClick={() => router.push("/dashboard/settings/billing")}>
              <CreditCard size={20} />
              Manage Subscription
            </button>
          </div>
        </section>

        <section className={styles.settingsSection}>
          <h2>
            <Trash2 size={20} />
            Account
          </h2>
          <div className={styles.settingsList}>
            <button className={styles.actionButton} onClick={() => setShowLogoutConfirmation(true)} disabled={loading}>
              <LogOut size={20} />
              {loading ? "Signing out..." : "Sign Out"}
            </button>

            <button className={styles.dangerButton} onClick={() => setShowDeleteConfirmation(true)}>
              <Trash2 size={20} />
              Delete Account
            </button>
          </div>
        </section>
        <ConfirmationDialog
          isOpen={showLogoutConfirmation}
          onClose={() => setShowLogoutConfirmation(false)}
          onConfirm={() => {
            setShowLogoutConfirmation(false);
            handleSignOut();
          }}
          title='Sign Out'
          message="Are you sure you want to sign out? You'll need to sign in again to access your account."
          confirmText='Sign Out'
          cancelText='Cancel'
        />
        <ConfirmationDialog
          isOpen={showDeleteConfirmation}
          onClose={() => setShowDeleteConfirmation(false)}
          onConfirm={() => {
            setShowLogoutConfirmation(false);
            handleDeleteAccount();
          }}
          title='Delete Account'
          message='Are you sure you want to delete your account? This action cannot be undone.'
          confirmText='Delete Account'
          cancelText='Cancel'
        />
      </div>
    </div>
  );
}

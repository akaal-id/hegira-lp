"use client";

import { useState } from "react";
import { User, Lock, Save } from "lucide-react";
import DashboardButton from "@/components/ui/dashboard-button/DashboardButton";
import { initialOrganizerAccount, type OrganizerAccount } from "@/components/dashboard/mockData";
import styles from "./account.module.css";

export default function AccountPage() {
  const [account, setAccount] = useState<OrganizerAccount>(initialOrganizerAccount);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const [passwordState, setPasswordState] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleSubmitProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  const handleSubmitPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordState.oldPassword || !passwordState.newPassword) return;
    setPasswordSuccess(true);
    setPasswordState({ oldPassword: "", newPassword: "" });
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.headerBar}>
        <h1 className={styles.title}>
          <User className="text-[var(--color-hegra-turquoise)]" /> Organizer Account Info
        </h1>
        <p className={styles.subtitle}>
          Manage your personal details and organization profile credentials.
        </p>
      </div>

      {/* Main Account Form */}
      <form onSubmit={handleSubmitProfile} className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Organization Profile</h2>
          {profileSuccess && (
            <span className={styles.successMessage}>
              Profile details updated successfully!
            </span>
          )}
        </div>

        <div className={styles.formGrid}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Full Name</label>
            <input
              type="text"
              required
              value={account.fullName}
              onChange={(e) => setAccount({ ...account, fullName: e.target.value })}
              className={styles.input}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Email Address</label>
            <input
              type="email"
              required
              value={account.email}
              onChange={(e) => setAccount({ ...account, email: e.target.value })}
              className={styles.input}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Organization Name</label>
            <input
              type="text"
              required
              value={account.organizationName}
              onChange={(e) => setAccount({ ...account, organizationName: e.target.value })}
              className={styles.input}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Phone Number</label>
            <input
              type="text"
              required
              value={account.phoneNumber}
              onChange={(e) => setAccount({ ...account, phoneNumber: e.target.value })}
              className={styles.input}
            />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "0.5rem" }}>
          <DashboardButton
            variant="primary"
            size="sm"
            icon={<Save size={14} />}
            onClick={handleSubmitProfile}
          >
            Save Profile
          </DashboardButton>
        </div>
      </form>

      {/* Change Password Card */}
      <form onSubmit={handleSubmitPassword} className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle} style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
            <Lock size={14} className="text-[var(--color-hegra-turquoise)]" /> Change Password
          </h2>
          {passwordSuccess && (
            <span className={styles.successMessage}>
              Password updated successfully!
            </span>
          )}
        </div>

        <div className={styles.formGrid}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Current Password</label>
            <input
              type="password"
              value={passwordState.oldPassword}
              onChange={(e) => setPasswordState({ ...passwordState, oldPassword: e.target.value })}
              placeholder="••••••••"
              className={styles.input}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>New Password</label>
            <input
              type="password"
              value={passwordState.newPassword}
              onChange={(e) => setPasswordState({ ...passwordState, newPassword: e.target.value })}
              placeholder="••••••••"
              className={styles.input}
            />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "0.5rem" }}>
          <DashboardButton
            variant="secondary"
            size="sm"
            onClick={handleSubmitPassword}
          >
            Update Password
          </DashboardButton>
        </div>
      </form>
    </div>
  );
}

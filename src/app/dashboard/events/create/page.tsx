"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Image as ImageIcon, Map, Save, Sparkles, UploadCloud } from "lucide-react";
import { type DashboardEvent } from "@/components/dashboard/mockData";
import styles from "./createedit.module.css";

export default function CreateEventPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<Partial<DashboardEvent>>({
    name: "",
    theme: "",
    category: "b2c",
    status: "Draft",
    startDate: "",
    endDate: "",
    timeDisplay: "04:00 PM - 10:00 PM WIB",
    location: "",
    address: "",
    coverImageUrl: "/event_mock/KV-culfest.webp",
    parkingAvailable: true,
    totalQuota: 1000,
    description: "",
    termsAndConditions: "",
  });

  const handleChange = (field: keyof DashboardEvent, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.startDate) return;
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      {/* Top Header Bar */}
      <div className={styles.headerBar}>
        <div className={styles.headerLeft}>
          <button
            type="button"
            onClick={() => router.back()}
            className={styles.backButton}
            aria-label="Go back"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className={styles.headerTitle}>Create New Event</h1>
            <p className={styles.headerSubtitle}>
              Fill in your event details to publish on the Hegira platform.
            </p>
          </div>
        </div>

        <div className={styles.headerActions}>
          <button
            type="button"
            onClick={() => router.back()}
            className={styles.cancelButton}
          >
            Cancel
          </button>
          <button type="submit" className={styles.saveButton}>
            <Save size={15} />
            Publish Event
          </button>
        </div>
      </div>

      {/* Split Grid Layout */}
      <div className={styles.splitGrid}>
        {/* Left Column: Media & Placeholders */}
        <div className={styles.columnLeft}>
          {/* Cover Image Upload Card */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              <ImageIcon size={16} className="text-[var(--color-hegra-turquoise)]" /> Cover Banner Image
            </h2>

            <div className={styles.uploadDropzone}>
              {formData.coverImageUrl ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={formData.coverImageUrl}
                    alt="Cover preview"
                    className={styles.previewImage}
                  />
                  <div className={styles.uploadOverlay}>
                    <UploadCloud size={24} />
                    <span className={styles.uploadOverlayTitle}>Replace Cover Banner</span>
                    <span className={styles.uploadOverlaySub}>Recommended 16:9 ratio</span>
                  </div>
                </>
              ) : (
                <div className={styles.uploadEmpty}>
                  <UploadCloud size={28} className="text-[var(--color-hegra-turquoise)]" />
                  <span className={styles.uploadEmptyTitle}>Upload Cover Image</span>
                  <span className={styles.uploadEmptySub}>PNG, JPG, or WEBP (Max 5MB)</span>
                </div>
              )}
            </div>
          </div>

          {/* Event Layout Map Upload Card */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              <Map size={16} className="text-[var(--color-hegra-turquoise)]" /> Event Layout Plan
            </h2>

            <div className={styles.uploadDropzone}>
              <div className={styles.uploadEmpty}>
                <UploadCloud size={28} className="text-[var(--color-hegra-turquoise)]" />
                <span className={styles.uploadEmptyTitle}>Upload Layout Map</span>
                <span className={styles.uploadEmptySub}>Floor plan, stage map, or venue diagram</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Event Information */}
        <div className={styles.columnRight}>
          {/* Main Information Card */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              <Sparkles size={16} className="text-[var(--color-hegra-turquoise)]" /> Main Information
            </h2>

            <div className={styles.fieldGrid}>
              <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>
                  Event Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="e.g. Sunset Music Fest 2026"
                  className={styles.input}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Event Theme / Subtitle</label>
                <input
                  type="text"
                  value={formData.theme || ""}
                  onChange={(e) => handleChange("theme", e.target.value)}
                  placeholder="e.g. Beachfront Music Festival"
                  className={styles.input}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Event Category</label>
                <select
                  value={formData.category || "b2c"}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className={styles.input}
                >
                  <option value="b2c">B2C (Concerts, Festivals, Entertainment)</option>
                  <option value="b2b">B2B (Conferences, Summits, Corporate)</option>
                  <option value="b2g">B2G (Public Forums, Government)</option>
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>
                  Start Date <span className={styles.required}>*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.startDate || ""}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                  className={styles.input}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>End Date</label>
                <input
                  type="date"
                  value={formData.endDate || ""}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                  className={styles.input}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Event Schedule / Time</label>
                <input
                  type="text"
                  value={formData.timeDisplay || ""}
                  onChange={(e) => handleChange("timeDisplay", e.target.value)}
                  placeholder="e.g. 04:00 PM - 11:00 PM WIB"
                  className={styles.input}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Initial Event Status</label>
                <select
                  value={formData.status || "Draft"}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className={styles.input}
                >
                  <option value="Draft">Draft (Save privately)</option>
                  <option value="Active">Active (Publish immediately)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location & Quota Card */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Location & Quota</h2>

            <div className={styles.fieldGrid}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Venue Name / City</label>
                <input
                  type="text"
                  value={formData.location || ""}
                  onChange={(e) => handleChange("location", e.target.value)}
                  placeholder="e.g. Ancol Beach City, Jakarta"
                  className={styles.input}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Total Visitor Capacity / Quota</label>
                <input
                  type="number"
                  value={formData.totalQuota || 1000}
                  onChange={(e) => handleChange("totalQuota", Number(e.target.value))}
                  className={styles.input}
                />
              </div>

              <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Full Address</label>
                <textarea
                  rows={2}
                  value={formData.address || ""}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="Detailed venue address..."
                  className={styles.textarea}
                />
              </div>
            </div>
          </div>

          {/* Description & Terms Card */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Description & Terms</h2>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Full Description</label>
              <textarea
                rows={4}
                value={formData.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Highlight line-up performers, agenda, or key event features..."
                className={styles.textarea}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Terms & Conditions</label>
              <textarea
                rows={4}
                value={formData.termsAndConditions || ""}
                onChange={(e) => handleChange("termsAndConditions", e.target.value)}
                placeholder="Outline entry guidelines or redemption rules..."
                className={styles.textarea}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

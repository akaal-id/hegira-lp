"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  FileText,
  Save,
  ShieldCheck,
  Tag,
  Zap,
} from "lucide-react";
import { type DashboardEvent } from "@/components/dashboard/mockData";
import { TextField, DateField, TimeField, UploadField, RichTextField } from "@/components/dashboard/form-fields";
import styles from "./createedit.module.css";

const TERMS_TEMPLATE =
  "<ul><li>E-Tickets are non-refundable.</li><li>Visitors must bring valid identification.</li><li>Prohibited items: weapons, illegal substances, and outside food/beverages.</li></ul>";

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
    coverImageUrl: "",
    parkingAvailable: true,
    totalQuota: 1000,
    description: "",
    termsAndConditions: "",
  });

  const [amenities, setAmenities] = useState({
    parking: true,
    ac: true,
    vip: false,
    wheelchair: true,
  });

  const [layoutImageUrl, setLayoutImageUrl] = useState("");

  const handleChange = (field: keyof DashboardEvent, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleAmenity = (key: keyof typeof amenities) => {
    setAmenities((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Split the combined "hh:mm AM/PM - hh:mm AM/PM WIB" display string into its two time parts
  const [startTimePart, endTimePartRaw] = (formData.timeDisplay || "").split(" - ");
  const endTimePart = (endTimePartRaw || "").replace(/\s*WIB\s*$/i, "").trim();

  const updateStartTime = (value: string) => {
    handleChange("timeDisplay", `${value} - ${endTimePart || value} WIB`);
  };

  const updateEndTime = (value: string) => {
    handleChange("timeDisplay", `${startTimePart || value} - ${value} WIB`);
  };

  // Compute checklist completion percentage
  const completionStats = useMemo(() => {
    const checks = [
      { label: "Event Name & Subtitle", done: Boolean(formData.name) },
      { label: "Category & Status", done: Boolean(formData.category && formData.status) },
      { label: "Start Date", done: Boolean(formData.startDate) },
      { label: "Venue Location & City", done: Boolean(formData.location) },
      { label: "Description & Guidelines", done: Boolean(formData.description) },
      { label: "Cover Banner Image", done: Boolean(formData.coverImageUrl) },
    ];
    const completedCount = checks.filter((c) => c.done).length;
    const percentage = Math.round((completedCount / checks.length) * 100);
    return { checks, completedCount, total: checks.length, percentage };
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.startDate) return;
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      {/* Top Header Bar */}
      <div className={styles.headerBar}>
        <p className={styles.headerEyebrow}>New Event</p>
        <h1 className={styles.headerTitle}>Create Event</h1>
        <p className={styles.headerSubtitle}>
          Fill in your event details to publish on the Hegira platform.
        </p>
      </div>

      {/* 3-Column Split Grid Layout — Media + Forms left, sticky progress right */}
      <div className={styles.splitGrid}>
        {/* Left Column: Event Information Forms + Media Uploads */}
        <div className={styles.columnLeft}>
          {/* Main Event Essentials Section */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleGroup}>
                <h2 className={styles.sectionTitle}>Main Information</h2>
              </div>
            </div>

            <div className={styles.fieldGrid}>
              <TextField
                label="Event Name"
                required
                maxLength={100}
                showCounter
                value={formData.name || ""}
                onChange={(v) => handleChange("name", v)}
                placeholder="e.g. Sunset Music Fest 2026"
                className={styles.fullWidth}
              />

              <TextField
                label="Event Subtitle / Tagline"
                value={formData.theme || ""}
                onChange={(v) => handleChange("theme", v)}
                placeholder="e.g. The Premier Beachfront Summer Music Festival"
                className={styles.fullWidth}
              />

              {/* Category Segmented Control */}
              <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Event Category</label>
                <div className={styles.segmentedGroup}>
                  {[
                    { id: "b2c", label: "B2C" },
                    { id: "b2b", label: "B2B" },
                    { id: "b2g", label: "B2G" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleChange("category", cat.id)}
                      className={`${styles.segmentedOption} ${
                        formData.category === cat.id ? styles.segmentedOptionActive : ""
                      }`}
                    >
                      <Tag size={14} />
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Initial Event Status Segmented Control */}
              <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Initial Status</label>
                <div className={styles.segmentedGroup}>
                  <button
                    type="button"
                    onClick={() => handleChange("status", "Draft")}
                    className={`${styles.segmentedOption} ${
                      formData.status === "Draft" ? styles.segmentedOptionActive : ""
                    }`}
                  >
                    <FileText size={14} />
                    Draft
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange("status", "Active")}
                    className={`${styles.segmentedOption} ${
                      formData.status === "Active" ? styles.segmentedOptionActive : ""
                    }`}
                  >
                    <Zap size={14} />
                    Active
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Date, Schedule & Location Section */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleGroup}>
                <h2 className={styles.sectionTitle}>Date, Schedule & Location</h2>
              </div>
            </div>

            <div className={styles.fieldGrid}>
              <DateField
                label="Start Date"
                required
                value={formData.startDate || ""}
                onChange={(v) => handleChange("startDate", v)}
              />

              <TimeField
                label="Start Time"
                value={startTimePart || ""}
                onChange={updateStartTime}
              />

              <DateField
                label="End Date"
                value={formData.endDate || ""}
                onChange={(v) => handleChange("endDate", v)}
              />

              <TimeField
                label="End Time"
                value={endTimePart || ""}
                onChange={updateEndTime}
              />

              <TextField
                label="Venue Name / City"
                value={formData.location || ""}
                onChange={(v) => handleChange("location", v)}
                placeholder="e.g. Ancol Beach City, Jakarta"
                className={styles.fullWidth}
              />

              <TextField
                label="Full Address"
                multiline
                rows={2}
                value={formData.address || ""}
                onChange={(v) => handleChange("address", v)}
                placeholder="Detailed venue address, building number, hall, or gate entry..."
                className={styles.fullWidth}
              />
            </div>
          </div>

          {/* Description & Terms Section */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleGroup}>
                <h2 className={styles.sectionTitle}>Description & Terms</h2>
              </div>
            </div>

            <RichTextField
              label="Full Description"
              value={formData.description || ""}
              onChange={(html) => handleChange("description", html)}
              placeholder="Highlight line-up performers, agenda timetable, booth activities, or key event features..."
              minHeight="7rem"
            />

            <RichTextField
              label="Terms & Conditions"
              value={formData.termsAndConditions || ""}
              onChange={(html) => handleChange("termsAndConditions", html)}
              placeholder="Outline entry guidelines, age limits, ticket redemption rules, or security regulations..."
              minHeight="7rem"
              actions={
                <button
                  type="button"
                  onClick={() => handleChange("termsAndConditions", TERMS_TEMPLATE)}
                  className={styles.quickStepBtn}
                >
                  Load Template
                </button>
              }
            />
          </div>

          {/* Images Upload Section */}
          <div className={styles.sectionCard}>
            <UploadField
              label="Cover Banner"
              badge="16:9"
              aspectRatio="16 / 9"
              value={formData.coverImageUrl || ""}
              onChange={(url) => handleChange("coverImageUrl", url)}
              emptyTitle="Upload Cover Image"
            />
          </div>

          <div className={styles.sectionCard}>
            <UploadField
              label="Layout Plan"
              badge="Optional"
              aspectRatio="21 / 9"
              value={layoutImageUrl}
              onChange={setLayoutImageUrl}
              emptyTitle="Upload Layout Map"
              helperText="Floor plan, stage map, or venue diagram"
            />
          </div>

          {/* Additional Information Section */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleGroup}>
                <h2 className={styles.sectionTitle}>Additional Information</h2>
              </div>
            </div>

            <div className={styles.fieldGrid}>
              <TextField
                label="Total Visitor Capacity / Quota"
                type="number"
                min={1}
                value={String(formData.totalQuota || 1000)}
                onChange={(v) => handleChange("totalQuota", Number(v))}
                className={styles.fullWidth}
                endAdornment={
                  <>
                    <button
                      type="button"
                      onClick={() => handleChange("totalQuota", (formData.totalQuota || 1000) + 500)}
                      className={styles.quickStepBtn}
                    >
                      +500
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChange("totalQuota", (formData.totalQuota || 1000) + 1000)}
                      className={styles.quickStepBtn}
                    >
                      +1k
                    </button>
                  </>
                }
              />

              {/* Amenities & Features Chips */}
              <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Venue Amenities & Accessibility</label>
                <div className={styles.amenitiesGrid}>
                  <div
                    onClick={() => toggleAmenity("parking")}
                    className={`${styles.amenityChip} ${
                      amenities.parking ? styles.amenityChipActive : ""
                    }`}
                  >
                    <CheckCircle2
                      size={14}
                      className={amenities.parking ? "text-[var(--color-hegra-turquoise)]" : "text-gray-300"}
                    />
                    <span>Parking Lot</span>
                  </div>
                  <div
                    onClick={() => toggleAmenity("ac")}
                    className={`${styles.amenityChip} ${
                      amenities.ac ? styles.amenityChipActive : ""
                    }`}
                  >
                    <CheckCircle2
                      size={14}
                      className={amenities.ac ? "text-[var(--color-hegra-turquoise)]" : "text-gray-300"}
                    />
                    <span>Air Conditioned</span>
                  </div>
                  <div
                    onClick={() => toggleAmenity("vip")}
                    className={`${styles.amenityChip} ${
                      amenities.vip ? styles.amenityChipActive : ""
                    }`}
                  >
                    <CheckCircle2
                      size={14}
                      className={amenities.vip ? "text-[var(--color-hegra-turquoise)]" : "text-gray-300"}
                    />
                    <span>VIP Lounge</span>
                  </div>
                  <div
                    onClick={() => toggleAmenity("wheelchair")}
                    className={`${styles.amenityChip} ${
                      amenities.wheelchair ? styles.amenityChipActive : ""
                    }`}
                  >
                    <CheckCircle2
                      size={14}
                      className={amenities.wheelchair ? "text-[var(--color-hegra-turquoise)]" : "text-gray-300"}
                    />
                    <span>Accessible</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Vertical Border Divider (1px) */}
        <div className={styles.divider} />

        {/* Right Column: Sticky Progress + Actions */}
        <div className={styles.columnRight}>
          <div className={styles.stickyPanel}>
            {/* Event Readiness Checklist Progress Card */}
            <div className={styles.checklistCard}>
              <div className={styles.checklistHeader}>
                <h3 className={styles.checklistTitle}>
                  <ShieldCheck size={15} className="text-[var(--color-hegra-turquoise)]" />
                  Readiness Checklist
                </h3>
                <span className={styles.checklistCount}>
                  {completionStats.completedCount}/{completionStats.total}
                </span>
              </div>

              <div className={styles.progressTrack}>
                <div
                  className={styles.progressBar}
                  style={{ width: `${completionStats.percentage}%` }}
                />
              </div>

              <div className={styles.checkListItems}>
                {completionStats.checks.map((item) => (
                  <div
                    key={item.label}
                    className={`${styles.checkItem} ${item.done ? styles.checkItemDone : ""}`}
                  >
                    <CheckCircle2
                      size={14}
                      className={
                        item.done
                          ? "text-[var(--color-hegra-turquoise)]"
                          : "text-gray-300"
                      }
                    />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Actions */}
            <div className={styles.formActions}>
              <button type="submit" className={styles.saveButton}>
                <Save size={16} />
                Publish Event
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

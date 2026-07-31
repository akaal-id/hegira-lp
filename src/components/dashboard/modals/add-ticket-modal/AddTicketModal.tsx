"use client";

import { useState, type FormEvent } from "react";
import { Save, X } from "lucide-react";
import styles from "./AddTicketModal.module.css";

export interface TicketFormData {
  name: string;
  price: number;
  description: string;
  maxQuantity: number;
  maxPerTransaction: string;
  useEventSchedule: boolean;
  startDate: string;
  startTime: string;
}

interface AddTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: TicketFormData) => void;
}

const DEFAULT_FORM: TicketFormData = {
  name: "",
  price: 0,
  description: "",
  maxQuantity: 100,
  maxPerTransaction: "",
  useEventSchedule: true,
  startDate: "",
  startTime: "",
};

export default function AddTicketModal({ isOpen, onClose, onSave }: AddTicketModalProps) {
  const [formData, setFormData] = useState<TicketFormData>(DEFAULT_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};
    if (!formData.name.trim()) nextErrors.name = "Ticket name is required.";
    if (formData.price < 0) nextErrors.price = "Price cannot be negative.";
    if (!formData.maxQuantity || formData.maxQuantity <= 0) {
      nextErrors.maxQuantity = "Quantity must be greater than 0.";
    }
    if (!formData.useEventSchedule) {
      if (!formData.startDate) nextErrors.startDate = "Start date is required.";
      if (!formData.startTime) nextErrors.startTime = "Start time is required.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
      setFormData(DEFAULT_FORM);
      setErrors({});
    }
  };

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-labelledby="add-ticket-modal-title">
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2 id="add-ticket-modal-title" className={styles.title}>
            Add ticket
          </h2>
          <button type="button" onClick={onClose} aria-label="Close modal" className={styles.close}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="ticket-name" className={styles.label}>
              Ticket name <span className={styles.required}>*</span>
            </label>
            <input
              id="ticket-name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="e.g. Regular, VIP, Early Bird"
              className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
            />
            {errors.name && <p className={styles.errorText}>{errors.name}</p>}
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="ticket-price" className={styles.label}>
                Price (IDR) <span className={styles.required}>*</span>
              </label>
              <input
                id="ticket-price"
                type="number"
                min={0}
                step={1000}
                value={formData.price}
                onChange={(e) => setFormData((prev) => ({ ...prev, price: Number(e.target.value) }))}
                className={`${styles.input} ${errors.price ? styles.inputError : ""}`}
              />
              {errors.price && <p className={styles.errorText}>{errors.price}</p>}
            </div>

            <div className={styles.field}>
              <label htmlFor="ticket-quantity" className={styles.label}>
                Quantity <span className={styles.required}>*</span>
              </label>
              <input
                id="ticket-quantity"
                type="number"
                min={1}
                value={formData.maxQuantity}
                onChange={(e) => setFormData((prev) => ({ ...prev, maxQuantity: Number(e.target.value) }))}
                className={`${styles.input} ${errors.maxQuantity ? styles.inputError : ""}`}
              />
              {errors.maxQuantity && <p className={styles.errorText}>{errors.maxQuantity}</p>}
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="ticket-description" className={styles.label}>
              Description
            </label>
            <textarea
              id="ticket-description"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="e.g. Access to all areas, exclusive merchandise"
              className={styles.textarea}
            />
          </div>

          <div className={styles.scheduleBlock}>
            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={formData.useEventSchedule}
                onChange={(e) => setFormData((prev) => ({ ...prev, useEventSchedule: e.target.checked }))}
                className={styles.checkbox}
              />
              Use main event schedule
            </label>

            {!formData.useEventSchedule && (
              <div className={styles.scheduleFields}>
                <div className={styles.field}>
                  <label htmlFor="ticket-start-date" className={styles.labelSm}>
                    Start date
                  </label>
                  <input
                    id="ticket-start-date"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                    className={`${styles.inputSm} ${errors.startDate ? styles.inputError : ""}`}
                  />
                  {errors.startDate && <p className={styles.errorText}>{errors.startDate}</p>}
                </div>
                <div className={styles.field}>
                  <label htmlFor="ticket-start-time" className={styles.labelSm}>
                    Start time
                  </label>
                  <input
                    id="ticket-start-time"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData((prev) => ({ ...prev, startTime: e.target.value }))}
                    className={`${styles.inputSm} ${errors.startTime ? styles.inputError : ""}`}
                  />
                  {errors.startTime && <p className={styles.errorText}>{errors.startTime}</p>}
                </div>
              </div>
            )}
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancel}>
              Cancel
            </button>
            <button type="submit" className={styles.submit}>
              <Save size={16} /> Save ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

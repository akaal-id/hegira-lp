import Image from "next/image";
import styles from "./Logo.module.css";

interface LogoProps {
  variant?: "default" | "sidebar";
  className?: string;
}

export default function Logo({ variant = "default", className = "" }: LogoProps) {
  const sizeClass = variant === "sidebar" ? styles.sidebar : styles.default;

  return (
    <Image
      src="/icon/hegiralogo.png"
      alt="Hegira"
      width={988}
      height={386}
      className={`${styles.logo} ${sizeClass} ${className}`.trim()}
    />
  );
}

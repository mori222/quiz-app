import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="home">
      <Header title="ホーム" />
    </div>
  );
}
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>CYC Race Timer</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="https://cyc.pe.ca">CYC</a> Race Timer
        </h1>

        <Link href={"/race"}>
          <button className="btn btn-info mt-6">Get Started</button>
        </Link>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://acbconsulting.tech"
          target="_blank"
          rel="noopener noreferrer"
        >
          by ACB Consulting
        </a>
      </footer>
    </div>
  );
}

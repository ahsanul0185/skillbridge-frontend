import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 mb-1.5">
      <img
        src="/skillbridge.svg"
        className="max-h-6 dark:invert"
        alt="SkillBridge Logo"
      />
      <span
        className={`text-2xl text-primary tracking-wider font-semibold font-logan`}
      >
        SkillBridge
      </span>
    </Link>
  );
}

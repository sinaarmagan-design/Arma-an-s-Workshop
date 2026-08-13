import { registry, gifts } from "@/data/wedding";
import { formatCurrency } from "@/lib/formatCurrency";
import GiftList from "@/components/GiftList";

export const metadata = {
  title: "Wedding Gift List",
  description: "Our wedding gift list.",
};

export default function WeddingPage() {
  const totalGoal = gifts.reduce((sum, g) => sum + g.price, 0);
  const totalRaised = gifts.reduce((sum, g) => sum + (g.raised ?? 0), 0);
  const totalPct = totalGoal > 0 ? Math.min(100, Math.round((totalRaised / totalGoal) * 100)) : 0;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Intro */}
      <div className="max-w-xl mb-16">
        <p className="text-xs font-light tracking-[0.2em] uppercase text-gray-400 mb-4">
          {new Date(registry.weddingDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 className="font-playfair text-3xl font-medium text-gray-900 tracking-tight mb-6">
          {registry.coupleNames}
        </h1>
        <p className="font-lato text-sm font-light text-gray-600 leading-7">
          {registry.message}
        </p>
      </div>

      {/* Overall progress */}
      <div className="max-w-xl mb-16 pb-16 border-b border-gray-200">
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gray-900 transition-all duration-500"
            style={{ width: `${totalPct}%` }}
          />
        </div>
        <div className="flex items-baseline justify-between mt-2">
          <p className="text-xs font-light text-gray-500">
            {formatCurrency(totalRaised, registry.currency)} raised of{" "}
            {formatCurrency(totalGoal, registry.currency)}
          </p>
          <p className="text-xs font-light text-gray-400">{totalPct}%</p>
        </div>
      </div>

      {/* Gift list */}
      <GiftList gifts={gifts} bank={registry.bank} currency={registry.currency} />

      {/* General bank details */}
      <section className="mt-24 pb-8 pt-12 border-t border-gray-200 max-w-xl">
        <p className="text-xs font-light tracking-[0.2em] uppercase text-gray-400 mb-4">
          Prefer to send a general gift?
        </p>
        <p className="font-lato text-sm font-light text-gray-600 leading-7 mb-4">
          You&apos;re welcome to send any amount directly, without tying it to a
          specific item on the list.
        </p>
        <dl className="text-xs font-light text-gray-600 space-y-1.5">
          <div className="flex justify-between gap-3">
            <dt className="text-gray-400 uppercase tracking-[0.1em] text-[9px] mt-0.5">
              Account
            </dt>
            <dd className="text-right">{registry.bank.accountName}</dd>
          </div>
          <div className="flex justify-between gap-3 items-center">
            <dt className="text-gray-400 uppercase tracking-[0.1em] text-[9px]">
              IBAN
            </dt>
            <dd className="text-right font-mono tracking-wide">{registry.bank.iban}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-gray-400 uppercase tracking-[0.1em] text-[9px] mt-0.5">
              BIC
            </dt>
            <dd className="text-right font-mono">{registry.bank.bic}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-gray-400 uppercase tracking-[0.1em] text-[9px] mt-0.5">
              Bank
            </dt>
            <dd className="text-right">{registry.bank.bankName}</dd>
          </div>
        </dl>
        {registry.bank.note && (
          <p className="text-[11px] font-light text-gray-400 leading-5 mt-4">
            {registry.bank.note}
          </p>
        )}
      </section>
    </div>
  );
}

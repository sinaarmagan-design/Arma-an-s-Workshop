"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/formatCurrency";

export default function GiftCard({ gift, bank, currency }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const raised = gift.raised ?? 0;
  const pct = Math.min(100, Math.round((raised / gift.price) * 100));
  const funded = raised >= gift.price;

  async function copyIban() {
    try {
      await navigator.clipboard.writeText(bank.iban);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — user can still select the IBAN text manually
    }
  }

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white/40">
      {/* Image / placeholder */}
      <div className="relative aspect-[4/3] bg-gray-100 flex items-center justify-center">
        {gift.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={gift.imageUrl}
            alt={gift.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <p className="font-playfair text-lg text-gray-300 tracking-wide px-6 text-center">
            {gift.title}
          </p>
        )}
        {funded && (
          <span className="absolute top-3 right-3 text-[9px] font-light tracking-[0.15em] uppercase bg-gray-900 text-white px-2.5 py-1 rounded-full">
            Fully gifted
          </span>
        )}
      </div>

      <div className="p-5">
        {gift.category && (
          <p className="text-[9px] font-light text-gray-400 tracking-[0.2em] uppercase mb-1">
            {gift.category}
          </p>
        )}
        <h3 className="font-playfair text-base text-gray-900 mb-1">{gift.title}</h3>
        {gift.description && (
          <p className="text-xs font-light text-gray-500 leading-5 mb-4">
            {gift.description}
          </p>
        )}

        {/* Progress */}
        <div className="mb-4">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-900 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <p className="text-[11px] font-light text-gray-500">
              {formatCurrency(raised, currency)} of {formatCurrency(gift.price, currency)}
            </p>
            <p className="text-[11px] font-light text-gray-400">{pct}%</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {gift.purchaseLink && (
            <a
              href={gift.purchaseLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-[10px] font-light tracking-[0.15em] uppercase border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-200 rounded-full px-4 py-2.5"
            >
              Buy this gift
            </a>
          )}
          <button
            onClick={() => setOpen((o) => !o)}
            className={`flex-1 text-center text-[10px] font-light tracking-[0.15em] uppercase border transition-colors duration-200 rounded-full px-4 py-2.5 ${
              open
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-900"
            }`}
          >
            Contribute
          </button>
        </div>

        {/* Contribute info panel */}
        {open && (
          <div className="mt-4 pt-4 border-t border-gray-200 text-xs font-light text-gray-600 leading-6">
            <p className="mb-3">
              Send any amount by bank transfer — every contribution goes towards this
              gift.
            </p>
            <dl className="space-y-1 mb-3">
              <div className="flex justify-between gap-3">
                <dt className="text-gray-400 uppercase tracking-[0.1em] text-[9px] mt-0.5">
                  Account
                </dt>
                <dd className="text-right">{bank.accountName}</dd>
              </div>
              <div className="flex justify-between gap-3 items-center">
                <dt className="text-gray-400 uppercase tracking-[0.1em] text-[9px]">
                  IBAN
                </dt>
                <dd className="text-right font-mono tracking-wide">{bank.iban}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-gray-400 uppercase tracking-[0.1em] text-[9px] mt-0.5">
                  BIC
                </dt>
                <dd className="text-right font-mono">{bank.bic}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-gray-400 uppercase tracking-[0.1em] text-[9px] mt-0.5">
                  Bank
                </dt>
                <dd className="text-right">{bank.bankName}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-gray-400 uppercase tracking-[0.1em] text-[9px] mt-0.5">
                  Reference
                </dt>
                <dd className="text-right">{gift.title}</dd>
              </div>
            </dl>
            <button
              onClick={copyIban}
              className="text-[10px] font-light tracking-[0.15em] uppercase text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-900 transition-colors duration-200"
            >
              {copied ? "Copied" : "Copy IBAN"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

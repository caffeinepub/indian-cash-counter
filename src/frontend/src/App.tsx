import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IndianRupee, RotateCcw } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const DENOMINATIONS = [500, 200, 100, 50, 20, 10, 5, 2, 1] as const;

type Counts = Record<number, string>;

const initialCounts = (): Counts =>
  Object.fromEntries(DENOMINATIONS.map((d) => [d, ""]));

function formatRupee(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function App() {
  const [counts, setCounts] = useState<Counts>(initialCounts);

  const handleChange = (denomination: number, value: string) => {
    if (value === "" || /^\d+$/.test(value)) {
      setCounts((prev) => ({ ...prev, [denomination]: value }));
    }
  };

  const handleReset = () => setCounts(initialCounts());

  const grandTotal = DENOMINATIONS.reduce((sum, d) => {
    const count = Number.parseInt(counts[d] || "0", 10);
    return sum + d * (Number.isNaN(count) ? 0 : count);
  }, 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-5 px-4 shadow-md">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <div className="bg-primary-foreground/15 rounded-xl p-2">
            <IndianRupee className="w-7 h-7" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-800 tracking-tight leading-tight">
              Indian Cash Counter
            </h1>
            <p className="text-primary-foreground/75 text-sm font-body mt-0.5">
              Count your notes quickly &amp; accurately
            </p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-card rounded-2xl shadow-card border border-border overflow-hidden"
        >
          {/* Table header */}
          <div className="grid grid-cols-3 bg-secondary px-5 py-3 border-b border-border">
            <span className="font-display font-700 text-sm text-secondary-foreground uppercase tracking-wider">
              Denomination
            </span>
            <span className="font-display font-700 text-sm text-secondary-foreground uppercase tracking-wider text-center">
              No. of Notes
            </span>
            <span className="font-display font-700 text-sm text-secondary-foreground uppercase tracking-wider text-right">
              Sub-total
            </span>
          </div>

          {/* Denomination rows */}
          <div className="divide-y divide-border">
            {DENOMINATIONS.map((denomination, index) => {
              const count = Number.parseInt(counts[denomination] || "0", 10);
              const subtotal = denomination * (Number.isNaN(count) ? 0 : count);
              const markerIndex = index + 1;

              return (
                <motion.div
                  key={denomination}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.3 }}
                  className="grid grid-cols-3 items-center px-5 py-3.5 hover:bg-accent/30 transition-colors"
                >
                  {/* Denomination label */}
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-12 h-8 rounded-lg bg-primary/10 text-primary font-display font-700 text-sm">
                      ₹{denomination}
                    </span>
                  </div>

                  {/* Number input */}
                  <div className="flex justify-center">
                    <Input
                      data-ocid={`denomination.input.${markerIndex}`}
                      type="number"
                      min={0}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={counts[denomination]}
                      onChange={(e) =>
                        handleChange(denomination, e.target.value)
                      }
                      placeholder="0"
                      className="w-24 text-center font-body font-600 text-base border-border focus-visible:ring-primary bg-background"
                    />
                  </div>

                  {/* Subtotal */}
                  <div className="text-right">
                    <span
                      className={`font-display font-700 text-base ${
                        subtotal > 0 ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {subtotal > 0 ? formatRupee(subtotal) : "—"}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Grand Total */}
          <div className="bg-primary px-5 py-4 flex items-center justify-between">
            <span className="font-display font-800 text-lg text-primary-foreground tracking-tight">
              Grand Total
            </span>
            <span
              data-ocid="cash.grand_total"
              className="font-display font-800 text-2xl text-primary-foreground"
            >
              {formatRupee(grandTotal)}
            </span>
          </div>
        </motion.div>

        {/* Reset button */}
        <div className="mt-6 flex justify-center">
          <Button
            data-ocid="cash.reset_button"
            variant="outline"
            onClick={handleReset}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-display font-600 gap-2 px-8 py-5 text-base rounded-xl transition-all duration-200"
          >
            <RotateCcw className="w-4 h-4" />
            Reset All
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-muted-foreground border-t border-border font-body">
        © {new Date().getFullYear()}. Built with ❤️ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}

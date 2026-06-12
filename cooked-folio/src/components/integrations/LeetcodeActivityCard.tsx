"use client";

import { motion } from "framer-motion";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const sectionReveal = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
      mass: 0.8,
    },
  },
};

function DifficultyBar({
  label,
  solved,
  total,
  color,
}: {
  label: string;
  solved: number;
  total: number;
  color: string;
}) {
  const percentage = Math.min((solved / total) * 100, 100);

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span>{label}</span>

        <span className="text-muted-foreground">
          {solved}/{total}
        </span>
      </div>

      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className={`h-full ${color}`}
        />
      </div>
    </div>
  );
}

export function LeetcodeActivityCard() {
  const { data, error } = useSWR(
    "/api/leetcode/activity",
    fetcher,
    {
      refreshInterval: 300000,
    }
  );

  if (error || !data) {
    return (
      <section className="mb-6">
        <h2 className="text-sm font-mono text-muted-foreground mb-2 uppercase tracking-wider">
          // leetcode activity
        </h2>

        <p className="text-xs text-muted-foreground">
          {error ? "skill issue loading data." : "loading activity..."}
        </p>
      </section>
    );
  }

  const stats =
    data.matchedUser?.submitStats?.acSubmissionNum || [];

  const easy =
    stats.find((s: any) => s.difficulty === "Easy")?.count || 0;

  const medium =
    stats.find((s: any) => s.difficulty === "Medium")?.count || 0;

  const hard =
    stats.find((s: any) => s.difficulty === "Hard")?.count || 0;

  const total =
    stats.find((s: any) => s.difficulty === "All")?.count ||
    easy + medium + hard;

  const ranking =
    data.matchedUser?.profile?.ranking || null;

  const reputation =
    data.matchedUser?.profile?.reputation || 0;

  const contest = data.userContestRanking;

  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      className="mb-6 w-full"
    >
      <h2 className="flex items-center gap-2 text-sm font-mono text-muted-foreground mb-3 uppercase tracking-wider">
        // leetcode activity

        
      </h2>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border p-4">
            <p className="text-xs text-muted-foreground">
              Problems Solved
            </p>

            <p className="text-3xl font-bold mt-1">
              {total.toLocaleString()}
            </p>
          </div>
        {contest && (
          <div className="rounded-xl border border-border p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-muted-foreground">
                  Contest Rating
                </p>

                <p className="text-2xl font-bold mt-1">
                  {Math.round(contest.rating)}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-muted-foreground">
                  Contests
                </p>

                <p className="font-semibold">
                  {contest.attendedContestsCount}
                </p>
              </div>
            </div>

            <div className="mt-3 flex justify-between text-xs text-muted-foreground">
              <span>
                Top {contest.topPercentage.toFixed(2)}%
              </span>

              <span>
                #{contest.globalRanking.toLocaleString()}
              </span>
            </div>
          </div>
        )}
          
        </div>

        

        <div className="rounded-xl border border-border p-4">
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-xs text-muted-foreground">
                Reputation
              </p>

              <p className="font-semibold">
                {reputation.toLocaleString()}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-muted-foreground">
                Total Solved
              </p>

              <p className="font-semibold">
                {total.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <DifficultyBar
              label="Easy"
              solved={easy}
              total={900}
              color="bg-green-500"
            />

            <DifficultyBar
              label="Medium"
              solved={medium}
              total={1900}
              color="bg-yellow-500"
            />

            <DifficultyBar
              label="Hard"
              solved={hard}
              total={850}
              color="bg-red-500"
            />
          </div>
        </div>

        <div className="flex justify-center gap-3 text-xs">
          <span className="px-2 py-1 rounded-md bg-green-500/10 text-green-400">
            Easy {easy}
          </span>

          <span className="px-2 py-1 rounded-md bg-yellow-500/10 text-yellow-400">
            Medium {medium}
          </span>

          <span className="px-2 py-1 rounded-md bg-red-500/10 text-red-400">
            Hard {hard}
          </span>
        </div>
      </div>
    </motion.section>
  );
}
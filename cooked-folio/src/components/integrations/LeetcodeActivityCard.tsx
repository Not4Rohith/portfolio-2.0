"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [showTopics, setShowTopics] = useState(false);

  const { data, error } = useSWR("/api/leetcode/activity", fetcher, {
    refreshInterval: 300000,
  });

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

  // Basic Stats
  const stats = data.matchedUser?.submitStats?.acSubmissionNum || [];
  const easy = stats.find((s: any) => s.difficulty === "Easy")?.count || 0;
  const medium = stats.find((s: any) => s.difficulty === "Medium")?.count || 0;
  const hard = stats.find((s: any) => s.difficulty === "Hard")?.count || 0;
  const total =
    stats.find((s: any) => s.difficulty === "All")?.count ||
    easy + medium + hard;

  const reputation = data.matchedUser?.profile?.reputation || 0;
  const contest = data.userContestRanking;

  // Process Tags Data
  const tagCounts = data.matchedUser?.tagProblemCounts;
  const allTags = tagCounts
    ? [
        ...(tagCounts.advanced || []),
        ...(tagCounts.intermediate || []),
        ...(tagCounts.fundamental || []),
      ].sort((a, b) => b.problemsSolved - a.problemsSolved)
    : [];

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
            <p className="text-xs text-muted-foreground">Problems Solved</p>
            <p className="text-3xl font-bold mt-1">{total.toLocaleString()}</p>
          </div>

          {contest && (
            <div className="rounded-xl border border-border p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-muted-foreground">Contest Rating</p>
                  <p className="text-2xl font-bold mt-1">
                    {Math.round(contest.rating)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Contests</p>
                  <p className="font-semibold">{contest.attendedContestsCount}</p>
                </div>
              </div>
              <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                <span>Top {contest.topPercentage.toFixed(2)}%</span>
                <span>#{contest.globalRanking.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-border p-4">
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-xs text-muted-foreground">Reputation</p>
              <p className="font-semibold">{reputation.toLocaleString()}</p>
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

        {/* Collapsible Topics Section */}
        {allTags.length > 0 && (
          <div className="rounded-xl border border-border overflow-hidden">
            <button
              onClick={() => setShowTopics(!showTopics)}
              className="flex w-full items-center justify-between p-3 text-xs text-muted-foreground hover:bg-muted/30 transition-colors"
            >
              <span>Topic wise mastery</span>
              <span className="font-mono">
                {showTopics ? "[-]" : "[+]"}
              </span>
            </button>

            <AnimatePresence>
              {showTopics && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex flex-wrap gap-2 p-3 pt-0 border-t border-border/50 bg-muted/10">
                    {allTags.slice(0, 30).map((tag: any) => (
                      <span
                        key={tag.tagSlug}
                        className="flex items-center gap-1.5 px-2 py-1 rounded-md border border-border bg-background text-xs"
                      >
                        {tag.tagName}
                        <span className="text-muted-foreground">
                          {tag.problemsSolved}
                        </span>
                      </span>
                    ))}
                    {/* {allTags.length > 15 && (
                      <span className="px-2 py-1 text-xs text-muted-foreground self-center">
                        +{allTags.length - 15} more
                      </span>
                    )} */}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.section>
  );
}
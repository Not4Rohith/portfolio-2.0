import { NextResponse } from "next/server";

const LEETCODE_API = "https://leetcode.com/graphql";

const query = `
query userProfile($username: String!) {
  matchedUser(username: $username) {
    profile {
      ranking
      reputation
      userAvatar
    }

    submitStats {
      acSubmissionNum {
        difficulty
        count
      }
    }
  }

  userContestRanking(username: $username) {
    attendedContestsCount
    rating
    globalRanking
    totalParticipants
    topPercentage
  }
}
`;

export async function GET() {
  try {
    const username = process.env.LEETCODE_USERNAME;

    if (!username) {
      return NextResponse.json(
        { error: "leetcode username missing" },
        { status: 500 }
      );
    }

    const res = await fetch(LEETCODE_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          username,
        },
      }),
      cache: "no-store",
    });

    const json = await res.json();

    if (!res.ok || json.errors) {
      console.error(json.errors);

      return NextResponse.json(
        { error: "failed to fetch leetcode data" },
        { status: 500 }
      );
    }

    return NextResponse.json(json.data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "unexpected error" },
      { status: 500 }
    );
  }
}
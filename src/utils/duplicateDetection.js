// Utility function for duplicate issue detection
export function findSimilarReports(newReport, existingReports) {
  if (!newReport.building || !newReport.title) return [];

  // Extract keywords (words with 3+ characters, ignoring common stop words)
  const stopWords = new Set([
    "the", "and", "for", "with", "that", "this", "from", "are", "not", 
    "room", "block", "floor", "near", "has", "have", "been", "was", "were", "problem", "issue"
  ]);

  const cleanText = (text) =>
    (text || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length >= 3 && !stopWords.has(w));

  const newTitleWords = new Set(cleanText(newReport.title));
  const newDescWords = new Set(cleanText(newReport.description));
  const combinedNewKeywords = new Set([...newTitleWords, ...newDescWords]);

  const normalizedNewRoom = (newReport.room || "").toLowerCase().trim();

  const matches = [];

  for (const rep of existingReports) {
    let score = 0;
    const matchReasons = [];

    // Exact building match (critical prerequisite for duplicate in campus)
    const sameBuilding = rep.building.toLowerCase() === newReport.building.toLowerCase();
    if (!sameBuilding) continue;
    score += 20;

    // Room number match
    const normalizedRepRoom = (rep.room || "").toLowerCase().trim();
    if (
      normalizedNewRoom &&
      normalizedRepRoom &&
      (normalizedNewRoom.includes(normalizedRepRoom) ||
        normalizedRepRoom.includes(normalizedNewRoom) ||
        normalizedNewRoom === normalizedRepRoom)
    ) {
      score += 35;
      matchReasons.push("Same room/area location");
    }

    // Category match
    if (rep.category && newReport.category && rep.category === newReport.category) {
      score += 25;
      matchReasons.push("Identical issue category");
    }

    // Keyword matching
    const repKeywords = new Set([...cleanText(rep.title), ...cleanText(rep.description)]);
    let commonKeywords = 0;
    for (const word of combinedNewKeywords) {
      if (repKeywords.has(word)) {
        commonKeywords++;
      }
    }

    if (commonKeywords > 0) {
      score += Math.min(commonKeywords * 15, 45);
      matchReasons.push(`${commonKeywords} shared keyword(s)`);
    }

    // Threshold check: building match + (same room OR same category + keywords OR high keyword match)
    if (score >= 45) {
      matches.push({
        report: rep,
        score,
        reasons: matchReasons
      });
    }
  }

  // Sort by highest similarity score
  matches.sort((a, b) => b.score - a.score);
  return matches.map((m) => m.report);
}


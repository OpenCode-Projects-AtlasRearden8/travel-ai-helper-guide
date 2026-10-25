# 1. Itinerary Drafts You Verify

## Why "draft" is the important word

An AI-written itinerary is a *draft*: a fast, complete-looking sketch full of
details you didn't have to invent yourself. That's exactly its value — and
exactly its danger. AI tools are trained to give confident, tidy answers, and a
tidy answer can be quietly wrong: a museum closed on Mondays, a train that runs
"twice a day" at dawn, a neighborhood that's a 40-minute taxi ride, not a
"short walk."

The workflow in this chapter makes that harmless. You get a draft in minutes,
then spend ten minutes **vetting only the load-bearing details** — the things
that would wreck a day if they were wrong.

## Step 1: Give the AI your real constraints

Vague prompts get vague drafts. Before asking, decide:

- **Dates** (or "first week of June" if flexible)
- **Daily start and end times** — include the arrival day; it's usually a write-off
- **Travelers** — kids, mobility limits, "my partner needs coffee before 9 a.m."
- **Pace** — "one anchor activity per day, walk everywhere else"
- **Interest list** — top 3 things you'd be sad to miss
- **Budget style** — "mid-range, street food lunches, one nice dinner"

## Step 2: The prompt

Copy this and fill in the brackets:

```
Act as a local travel planner. Draft a [N]-day itinerary for [CITY] for
[TRAVELERS], [DATES], arriving [TIME] on day 1.

Constraints:
- Pace is relaxed: max 2 major sights per day, plus wandering.
- Group: [kids / mobility needs / early risers / etc.].
- Top interests: [food markets, art, hiking, ...].
- Budget: [style]. 
- Assume we'll use public transit and walking only.

For each activity, include:
- Estimated time needed, and a realistic time to arrive.
- Known closure rules or booking requirements IF you're confident;
  write "VERIFY" instead of guessing.
- A neighborhood note: is this same-day-compatible with the other stops?

End with a list of every fact I should double-check myself, ranked by
how badly it would hurt the trip if it were wrong.
```

The `VERIFY` rule is the heart of the prompt. You're telling the AI that
"verified unknown" is a better answer than "confident guess."

## Step 3: Read the draft like an editor

Skim for the four failure patterns:

1. **Geographic nonsense** — morning market north of the river, then a same-day
   museum far south of it. Ask: "regroup this day geographically."
2. **Impossible time math** — "morning: hike; lunch: cooking class; afternoon:
   three museums" is 14 hours of optimism. Ask it to recount the hours.
3. **Closed-when-you're-there** — opening days, seasons, national holidays.
   These all get `VERIFY` or a web check.
4. **Everything-is-amazing** — AI drafts rarely say "skip this." If every stop
   got a superlative, ask: "cut two stops and tell me why."

## Step 4: Verify the load-bearing details (15 minutes, no more)

Only these matter enough to check. Check each on the **official** site:

- [ ] Opening hours and closed days for your top 3 sights
- [ ] Whether any sight needs advance booking (many popular ones do)
- [ ] First/last departure times of any transit you'll rely on
- [ ] The one restaurant you'd be heartbroken to miss

Full checklist: see the [AI verification checklist](verification-checklist.md).
Once those are true, small errors elsewhere won't hurt — leave salad or slack
time in each day to absorb them.

## Step 5: Stress-test the draft

Three follow-up prompts worth their weight:

- *"Assume it rains on day 2. Rainy-day version?"*
- *"We slept badly and start at 11. Trim this day."*
- *"What's the most fragile link in this plan?"* — AI is surprisingly good at
  naming its own weak spots when asked directly.

## Common worries

**"Isn't booking a real agent safer?"** For complex trips — multi-city rail
passes, group tours, accessibility needs — yes, a human agent is worth it. AI is
for the self-planned trip where it does 80% of the typing.

**"The AI apologized and changed its answer — now I trust it less."** Changing
its answer when you push back is normal and fine. Don't resolve disagreements by
arguing; resolve them by **verifying on the primary source**. That's the whole
system.

**Reality check to keep in mind:** an itinerary draft usually needs one round of
human correction — usually the geographic regroup or the hours recount. Plan for
that round and it stops being a surprise.

## Copy-ready prompts

```
Regroup day 2 geographically so we walk in one direction all day.
```

```
Recount the hours in each day. Flag anything with more scheduled
time than actually exists between [start] and [dinner].
```

```
What are the three most fragile facts in this itinerary,
ranked by damage if wrong?
```

---

*Next: [Translation at tables and ticket windows](02-translation-restaurants-and-train-stations.md)*

---

*Part of the [AI Travel Tips](index.md) manual. Copyright (c) 2026 Asdale Dynamics, LLC — MIT-licensed.*

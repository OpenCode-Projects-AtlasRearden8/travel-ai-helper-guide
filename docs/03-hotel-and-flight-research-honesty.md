# 3. Hotel and Flight Research Honesty

## The uncomfortable truth about AI and prices

AI chat assistants are generally **not connected to live booking systems**. When
you ask "what's a good hotel in Lisbon under $120?", you get:
(a) hotels the AI remembers from its training data — sometimes years stale,
(b) prices that are either made up, long-gone, or suspiciously round — and
(c) reviews that may not reflect this year's management.

This is not because the AI is lazy. It's because **prices and availability are
facts that change by the minute**, and most chatbots can't or don't look them
up live. Honesty about this limitation *is* the feature: once you accept that
AI research is a *shortlist generator*, not a *booking engine*, everything works.

## The role split, in one table

| Task | AI is good at | You must do |
| --- | --- | --- |
| Shortlisting hotels | Explaining neighborhoods, building a shortlist by vibe & budget | Checking live rates + availability on booking sites |
| Comparing flight strategies | Explaining how fare classes, hubs, and seasons work | Real search on a flight metasearch or airline site |
| Review analysis | Summarizing whether a review complaint pattern is serious | Reading a handful of the *most recent* reviews yourself |
| "Is this price fair?" | Seasonality sanity check | Compare against official prices in the booking universe |

If AI ever *quotes you a live-sounding price*, say: *"Do you have live access to
that price, or is it from recollection?"* Watch what it answers. Use that
information accordingly.

## Method: shortlist → live check → book direct

**Step 1 — Shortlist with a sharp prompt:**

```
I need a hotel in [CITY], [DATES], budget about [USD] per night,
for [TRAVELERS]. I care about: [quiet room, breakfast, walkable to X,
late check-in, ...]. Suggest a shortlist of 5 candidates and tell me
one reason to pick and one reason to doubt each. If you're not sure
a hotel still operates or has been renovated recently, say so.
Then list anything I need to confirm on a booking site.
```

**Step 2 — Live check, 5 minutes:**
Search each shortlisted name in a major booking site or metasearch. Confirm:
still operating, rate in your budget, rooms actually available on your dates,
free cancellation (worth a small premium when plans are soft).

**Step 3 — Reviews yourself, 5 minutes:**
Sort reviews newest-first. Read the 5 most recent **and** the 5 lowest
recent ones. Patterns matter more than scores: "thin walls" in three
2024–2025 reviews is real; one 2017 rant is noise. Then ask AI:

```
Here are snippets from recent guest reviews. Which complaints are
one-off bad luck and which are structural, based on how many
independent guests mention them?
```

**Step 4 — Book direct (usually):**
Once you've chosen, the hotel's own site (or the airline's own site) often
matches agency prices but with easier cancellations, better room picks, and a
contact that can actually help you if plans change. Booking direct also removes
an entire layer of third-party confusion — which chapter 6 cares about a lot.

## Flights: what AI is actually useful for

- **Route and hub strategy:** "cheapest realistic way from [A] to [B]: direct,
  self-transfer, or through which hub? What seasons change the answer?"
- **Timing wisdom:** midweek departures, how early to arrive for a connection,
  why a 3-hour connection is safer than a 1-hour one on separate tickets.
- **Separate-ticket danger check — very useful, very important:** if you plan
  to book two separate tickets to save money, AI can gut-check them:

```
I want to book flight A (arrives [time]) and a separate cheaper
flight B (departs [time]) from the same or connected airports. You DID
NOT book these. Advise minimal safe connection time for self-transfer
with checked bags at [AIRPORT], and tell me the risks if flight A is late.
```

- **What AI cannot do:** see today's fares. Genuine search happens on
  metasearch sites and airline websites — AI just tells you what to search for
  and what traps to avoid (e.g., why "budget" airfares at [cheap hub] can
  include fees that eliminate savings).

## The honesty habits

1. Assume any price the AI says is **at best a year old, at worst invented** —
   always re-price on a live site. An honestly-expressed year-old ballpark is
   fine for understanding; an invented "cheap" number is not something to book.
2. Ask for **the doubts, not the selling point.** Whenever AI proposes a hotel,
   airline, or neighborhood, follow up with: *"Give me the strongest argument
   against this."*
3. Never paste booking references, passport data, or full itineraries into a
   chat. AI doesn't need them; scammers in chat would.
4. Beware the AI that says "prices usually rise, book now through this link."
   Genuine chat tools don't have links to book through, and any pressure to
   "book now" in a chat is a red flag (see [chapter 6](06-scam-resistant-booking-habits.md)).

## Copy-ready prompts

```
Take my shortlist of 5 hotels and rank them by how well they fit these
constraints, then tell me which single fact could disqualify each one
and has to be verified live.
```

```
Be genuinely critical: what's the strongest argument AGAINST booking
the hotel you recommended?
```

---

*Next: [Packing lists that fit your trip](04-packing-list-generation.md)*

---

*Part of the [AI Travel Tips](index.md) manual. Copyright (c) 2026 Asdale Dynamics, LLC — MIT-licensed.*

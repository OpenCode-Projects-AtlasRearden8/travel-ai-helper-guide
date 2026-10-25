# 4. Packing Lists That Fit Your Trip

## Why generated packing lists need *editing*, not printing

Ask any AI "what should I pack for a 10-day trip?" and you'll get 60 items that
are all technically reasonable and perfectly useless as a list — because a real
packing list is a **decision**, not a data dump. The fix is easy: constrain the
AI the way a good travel writer would.

## Step 1: Feed it the trip shape

```
Draft a packing list for this trip. Then, separately, mark each item
Essential / Nice / Cut-able, and tell me what assumptions you made.

Trip: [N days in CITY/COUNTRY, SEASON/MONTH]
Weather expectation: [e.g. 40-70°F, chance of rain, no humidity] 
  — if you're unsure of the season's weather, say so and tell me
  what to check.
Style of travel: [one carry-on only? checked bag? laundry available?]
Days with unusual needs: [hiking day X, fancy dinner day Y,
BEACH/POOL, rain-heavy city, religious sites, ...].
Traveler notes: [prescription meds, small kids, cold-sleeper, ...].
```

The magic phrase is **"tell me what assumptions you made."** Wrong assumptions
(washing machines, formal dinners, snow in April) are the main failure mode of
generated lists — surfacing them turns a generic list into *your* list.

## Step 2: The three cuts that matter

Generated lists are followed by a human pass. Three questions do most of it:

1. **Cut count.** "Could I buy this for less than [$10] at the destination
   instead of carrying it?" Umbrellas, beach towels, cheap sweaters, phone
   cases — yes, usually.
2. **Cut weight on the "just in case" items.** Ask AI directly:
   *"Which items on my list am I most likely to regret bringing, weighing
   at most 1 lb each?"* — the answer is almost always the same trio:
   third pair of shoes, the "just in case" dress, the second book.
3. **Cut items the trip doesn't trigger.** An itinerary-driven list is a
   from-the-start list that is *proven to travel* — which is why this guide
   fits with a print-and-binder planner kit rather than replacing it.

## Step 3: The special-occasion line items

For each day with an unusual requirement (wedding guest clothes, hiking boots,
a camera, a gift for a host, dressy shoes), ask:

```
Day 3 is a wedding. What items does THAT day alone add to my packing list,
beyond the everyday list?
```

You'll discover things the generic list missed: that fancy shoes also need
plastic bags, that a suit needs a hanger, that a beach day needs two extra
things you forgot to plan for.

## Step 4: Labels that survive real life

Mark each item with a destination-based label, not a generic one:

- **carry-on** — items you could not replace within 24 hours: meds, documents,
  one change of clothes, chargers, glasses, one comfort item. Rule: **if losing
  the checked bag would ruin a day, that item is carry-on.**
- **checked** — everything replaceable.
- **wear-on-plane** — heaviest items; empty water bottle; snacks.

Then run one final AI sanity check:

```
Here is my final list. What items am I MOST likely to have forgotten
that weigh under 100 g and would be annoying to buy within 12 hours
of landing? Top 5 only.
```

(The usual guilty answers: adapters, small padlock, tiny first-aid strip for
blisters, a pen for landing forms, an empty cloth bag for dirty shoes.)

## Companion note: kit ≠ manual

If a printable packing checklist is something you want in paper form, the
**free-travel-planner-kit** provides ready-made printables. This chapter does
the opposite: it shows how to *generate* the list with AI, then trim it. If you
use both, fill the kit's printable from your AI-generated list — the two
projects are intentionally complementary, never duplicating.

## Copy-ready prompts

```
What assumptions did you make about weather and laundry availability
in my trip? List them so I can correct any that are wrong.
```

```
Cut my packing list to one carry-on. Remove anything I can buy
at the destination for a reasonable local price, and tell me
what you removed and why.
```

---

*Next: [Offline planning for dead zones](05-offline-planning-with-local-models.md)*

---

*Part of the [AI Travel Tips](index.md) manual. Copyright (c) 2026 Asdale Dynamics, LLC — MIT-licensed.*

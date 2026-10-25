# 5. Offline Planning with Local Models

## The dead-zone problem

National parks, mountain trains, ferries, foreign basements, airplane seats —
some of the best parts of a trip happen where the internet doesn't. Cloud AI
tools go dark exactly when you need to re-plan: a closed trailhead, a missed
connection, "where can we eat nearby?" (which needs internet, but "what do we do
now that it's raining?" does not).

The fix is a **local model**: a small AI that runs entirely on your own laptop
(or, these days, some phones). No internet, no account, no data leaving the
machine. This chapter is deliberately beginner-friendly — you can do this even
if you've never installed anything but a browser.

## What "local model" means in one paragraph

Big-name AI chatbots run on company servers; your phone sends text to them and
gets text back. A local model is a much smaller AI *file* that runs on *your*
hardware with a small app. Modern small models (7–8 billion-parameter class) are
genuinely useful for this manual's tasks: itineraries, packing lists,
translations, re-planning when plans break. They are **weaker** than cloud
models at current-events facts — which doesn't matter, because half your
planning is already done before you board the plane.

**Important:** local models are still not fact-checkers. Everything in the
verification checklist applies — the model just doesn't need wifi to be wrong.

## Step 1: Install a free local AI app

A standard beginner setup today (all free, no account):

1. **Choose a runner app.** Popular beginner-friendly options include
   *Ollama* (command-line style but simple, runs on most laptops) and
   *LM Studio* (point-and-click GUI, downloads models inside the app). For most
   people, LM Studio is the gentler first stop.
2. **Download one small model.** Inside the app, pick a well-known small
   instruct model — think "a modern 7–8B class model" (names like Llama 3.1 8B
   Instruct, Qwen 2.5 7B Instruct, Mistral 7B Instruct are common families).
   Size on disk: about 4–6 GB.
3. **Test offline.** Turn off your wifi and chat with it. If it answers, you're
   ready for dead zones.

Hardware reality check: 8 GB of RAM is workable, 16 GB is comfortable. A 5-year
old laptop may be slow but usable. If it's painfully slow, use a *smaller*
quantized model — the app will show you options.

## Step 2: The flight plan — do the cloud work at home

Local models shine when you **pre-load the trip into them before you leave**.
At home, on fast wifi, do this with your *cloud* AI, then carry the results:

- Chapter 1's itinerary draft, verified.
- Chapter 2's screenshot deck of translated sentences.
- Chapter 4's packing list.
- The [trip worksheet](trip-worksheet.md) filled in.

Then, in a dead zone, the local model's job is **re-planning, not re-searching**:

```
Here is my day plan (itinerary below) and today's constraints
(trailhead closed / rain / missed 9:12 train / illness at 2 p.m.).
Full itinerary: [PASTE]. Constraint: [DESCRIBE].
Re-plan only the affected day, staying walkable from here, using
the assumption that nothing new can be verified online right now.
Mark anything that needs verification done later.
```

Copy the finished itinerary into your notes app before you travel, and paste it
into the local model — local models have no memory of what you did at home.
*The paste is the memory.*

## Step 3 (optional): A private reference card for sensitive moments

One genuine advantage of local models: **nothing you type leaves your machine.**
A useful, safe pattern for booking-sensitive moments:

```
Here are my options, written as [A with reason] / [B with reason] / [C with reason].
Help me think through which to pick, using only what I've given you.
No personal data is included, and I will make the final decision myself.
```

One caution worth keeping: never paste passwords, payment card numbers, full
passport numbers, or actual ticket codes into any AI — even a purely local one —
out of pure habit discipline. It costs you nothing and keeps the rule simple.

## Step 4: The offline day-trip script

A practical combo that works without any signal:

1. **Maps offline** — most major map apps allow pre-downloading regions.
   Download your destination city *and its airport region* at home.
2. **Translations offline** (chapter 2, layer 1).
3. **Local model** — for the "we're stuck, advise me" conversations.
4. **Paper backup** — one printed page (like the [trip worksheet](trip-worksheet.md)):
   day plan on paper fits in a pocket and never needs a charger.

## What local models are *bad* at (manage expectations)

- Anything time-sensitive: it doesn't know today's date, opening hours, or that
  a museum burned down last month.
- **Foreign-language breadth:** cloud translation beats small local models for
  uncommon languages; rely on the offline translation apps for that, and use the
  local model for *logistics reasoning*, not translation.
- Long documents: small models can lose track on very long pasted text — keep
  pastes short and specific.

## Setup checklist (print this bit)

- [ ] Runner app installed and tested offline.
- [ ] One small model downloaded (~4–6 GB).
- [ ] Airplane-mode chat test passed at home.
- [ ] Itinerary + worksheet + translation deck saved in notes app.
- [ ] Offline maps downloaded for destination and transit regions.
- [ ] Laptop + charger + (optional) power bank packed.

---

*Next: [Scam-resistant booking habits](06-scam-resistant-booking-habits.md)*

---

*Part of the [AI Travel Tips](index.md) manual. Copyright (c) 2026 Asdale Dynamics, LLC — MIT-licensed.*

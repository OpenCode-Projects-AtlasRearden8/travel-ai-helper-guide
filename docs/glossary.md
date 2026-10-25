# Glossary

Plain-English definitions, like a friend would give them. Terms are ordered
roughly as you meet them in the guide.

**AI assistant / chatbot** — software you talk to in ordinary language that
answers, drafts, and explains. Is *not* a live window onto the world: prices,
schedules, and opening times are usually from memory, not real-time.

**Hallucination** — when an AI states something false with total confidence
(a phone number, a train time, a museum that closed in 2019). Not a glitch;
a side effect of how these models produce text. The [checklist](verification-checklist.md)
exists because of it.

**Draft** — a first version you intend to check and change. In this manual,
every AI output is treated as a draft: fast, useful, untrusted.

**Verify / verification** — confirming a claim against the *primary source*:
the airline's own site, the museum's own site, the operator's own timetable.
You are the verifier; the AI is the drafter.

**Primary source** — the site or office run by whoever actually operates the
thing you're booking or visiting. Blogs, aggregators, and chats are
*secondary*; useful for discovery, never final for knife-edge facts.

**Camera translation** — pointing your phone's camera at written text (menus,
signs, ticket machines) and getting a live translation overlaid or listed.
Weakness: handwritten menus and oddly-lit fonts; doubled by asking for a dish
*description* rather than a literal word-for-word chart. See chapter 2.

**Screenshot deck** — a pre-written set of translated sentences saved as
images or notes on your phone, made at home in good conditions. Your layer-2
backup when apps and batteries fail. See chapter 2.

**Local model / local AI** — a small AI that runs entirely on your device with
no internet. Slower and less current than cloud AI, but it works in airplane
mode and in national parks, and nothing you type leaves your machine. See
chapter 5.

**Parameter (e.g. "7B" / "8B")** — rough measure of a model's size. B is
"billion". In this manual: 7–8B-class models are the sweet spot for travel
re-planning on an ordinary laptop.

**Runner app** — the program that downloads and runs a local model on your
machine (e.g. a GUI app or a command-line tool). The model file itself is not
an app; you need a runner. See chapter 5, step 1.

**Instruct model** — a model downloaded/tuned to *follow instructions* (write a
list, edit my plan) rather than merely continue text. When picking your first
local model, choose one whose name ends in "Instruct" or is described as
chat/instruction-tuned.

**Quantized model** — a compressed copy of a model (slightly less precise,
much smaller). Many runs on ordinary RAM only work because of quantization;
in your runner app, the defaults are usually the right ones for a beginner.

**Offline mode test** — switching your device's wifi fully off at home and
checking your local model/chat still answers. If it passes, it will pass in
the dead zone. Chapter 5, step 1.

**Load-bearing fact** — a fact whose being wrong would actually damage the
trip (museum hours, train's last departure, allergy wording). Everything else
in a draft can be wrong with little cost; these get your scarce checking time.

**Metasearch site** — a search site that *finds* and *compares* offers from
many booking sites, then sends you to one of them. Useful for live prices;
the "booking" step still happens at an actual seller, which is where chapter 6
applies.

**Booking direct / booking direct vs. agency** — reserving on the airline/hotel's
own site rather than a third party. Often matches the agency's price and gives
out easier cancels, better room choice, and a real contact when plans change.
See chapter 3.

**Self-transfer** — building a connection from two *separate* tickets; you
re-check-in and re-check-bags yourself. Cheaper sometimes; higher risk if the
first flight is late. A deliberately careful use of AI is gut-checking these
timings. See chapter 3.

**Chargeback** — the process of asking your card issuer to reverse a payment
for fraud or non-delivery. Fast reporting matters; hours count, not days.
See chapter 6.

**Phishing** — a fake message or website designed to look like a real company
so you'll type in payment or login details. The travel version almost always
arrives right after you book something real.

**Scam audit (of a message)** — asking an AI to analyze a suspicious message or
policy for scam-typical patterns, using only the pasted text with the
reference codes removed. See chapter 6.

**Offline kit** — the travel bundle that needs no signal: downloaded maps,
downloaded translation packs, notes app with the itinerary, charged local
model, and one paper page. Chapter 5's checklist; not the same thing as the
printables project.

**free-travel-planner-kit** — the companion project to this manual: printable
planning sheets (checklists, budgets, day-plan pages). This guide teaches the
AI workflow; the kit provides the paper. Neither repeats the other.

---

*Part of the [AI Travel Tips](index.md) manual. Copyright (c) 2026 Asdale Dynamics, LLC — MIT-licensed.*

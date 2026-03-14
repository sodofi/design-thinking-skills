# Design Thinking Process for The Synthesis

This reference contains the full step-by-step design thinking framework adapted for hackathon builders working on agentic infrastructure. Each phase includes exercises, templates, and worked examples.

## Table of Contents
1. Phase 1: Empathize
2. Phase 2: Define
3. Phase 3: Ideate
4. Phase 4: Prototype
5. Phase 5: Test
6. Jobs-to-be-Done Integration
7. Worked Example

---

## Phase 1: Empathize

The goal of this phase is to understand the human your project serves. Not in the abstract. In vivid, specific detail. You want to be able to describe this person's Wednesday afternoon, the moment they hit the problem you're solving, and how it makes them feel.

### Exercise 1A: Pick your person

Do not start with "users." Start with one person. Give them a name. Answer these questions:

- What do they do for work or life that puts them in contact with this problem?
- How technical are they? Do they know what a blockchain is?
- What country or situation are they in?
- What is at stake for them when this problem occurs?

If you don't know a person like this, look at the personas in `references/personas.md` and pick the one that resonates most. Then make them more specific.

### Exercise 1B: Empathy map

Draw four quadrants (mentally or on paper). Fill them in for your person in the context of the problem you're exploring:

**SAYS**: What would this person say out loud about the problem? What language do they use? What do they complain about to friends or colleagues? Be specific. Use their voice, not yours. A freelancer doesn't say "I lack payment sovereignty." She says "I just want to know my money actually went through without calling someone."

**THINKS**: What's going on in their head that they might not say out loud? What assumptions do they operate under? What worries gnaw at them? A researcher doesn't say "my metadata is being surveilled." He thinks "I wonder if anyone can see what I've been looking into."

**DOES**: What actions does this person take today to deal with the problem? What workarounds have they built? What tools do they use? How much time do they spend on this? A small business owner doesn't just "experience payment friction." She logs into three different platforms every morning, checks if transfers cleared, follows up manually on two that didn't, and keeps a spreadsheet as backup because she's been burned before.

**FEELS**: What emotions accompany this problem? Frustration, anxiety, resignation, anger, helplessness? Be honest. Don't project. A journalist in a hostile environment doesn't feel "interested in privacy tools." He feels afraid that the wrong person will connect his transactions to his sources.

### Exercise 1C: The "five whys"

Take the surface-level problem your person faces and ask "why?" five times to get to the root cause.

Example:
- **Problem**: Freelancer can't verify her agent paid the right vendor.
- Why? Because the payment went through a centralized processor that doesn't give her a receipt she can independently verify.
- Why? Because the processor's API returns a confirmation that means "we processed it" not "it settled."
- Why? Because settlement is actually handled by a different system she has no access to.
- Why? Because the payment infrastructure treats the agent's transactions as the processor's business, not the freelancer's.
- Why? Because the entire payment stack was designed for entities with bank accounts and legal agreements, not for autonomous agents acting on behalf of humans.

Now you have a root cause you can design against.

### Exercise 1D: Day-in-the-life journey

Write out the sequence of events in your person's day that leads them to encounter the problem. Start from when they wake up. What are they doing? What triggers the interaction with the agent? What happens step by step? Where does it go wrong? What do they do after it goes wrong?

This is different from a product user journey (which comes later). This is a life journey. The product doesn't exist yet. You're mapping how the problem shows up in their actual lived experience.

Template:
```
[Time/trigger] → [Action person takes] → [What happens] → [How they feel] → [What they do next]
```

---

## Phase 2: Define

The goal of this phase is to synthesize everything you learned in Phase 1 into a clear, actionable problem statement.

### Exercise 2A: Insight synthesis

Look at your empathy map and day-in-the-life journey. Find the contradictions, tensions, and surprises. These are your insights.

Insights are not observations. "Freelancers send a lot of invoices" is an observation. "Freelancers spend more time verifying payments went through than actually doing their work" is an insight. Insights reveal something unexpected about the relationship between the person and the problem.

Good insights have three properties:
- They reveal a need the person has that isn't being met
- They reframe the problem in a way that opens up new solution space
- They connect the emotional experience to the structural cause

### Exercise 2B: Problem statement

Write a problem statement using this format:

**[Person] needs a way to [need expressed as a verb] because [insight about why current solutions fail].**

Examples:
- "Priya, a freelance designer who invoices in three currencies, needs a way to verify that her agent paid the right vendor the right amount because the payment processors her agent uses don't give her independent proof of settlement."
- "Tomasz, a journalist in Warsaw covering corruption, needs a way to pay for API access and data services without creating a trail that links his queries to his identity because every API call his agent makes generates metadata that could be subpoenaed."
- "Daniela, who runs a small import business in Argentina, needs a way to enforce the terms her agent negotiated with suppliers because when the platform her agent used to make the deal changes its dispute resolution process, she has no recourse."

A good problem statement is specific enough to design against but open enough to allow for multiple solutions.

### Exercise 2C: How Might We questions

Reframe your problem statement as a "How Might We" (HMW) question. HMW questions turn problems into design challenges. They should be broad enough to invite creative solutions but narrow enough to provide focus.

Rules for good HMW questions:
- Don't include a solution in the question
- Don't make the question so broad it could mean anything
- Frame it from the human's perspective, not the technology's

Transform: "[Person] needs [X] because [Y]"
Into: "How might we [enable the person to achieve X] [given the constraint Y]?"

Examples:
- "How might we let Priya verify exactly where her money went without depending on the payment processor to tell the truth?"
- "How might we let Tomasz's agent access paid services without revealing what he's researching or who he is?"
- "How might we give Daniela enforceable agreements for her agent's deals that no single platform can rewrite after the fact?"

Generate 3-5 HMW questions from different angles on the same problem. Some should be broad, some narrow. The variety opens up different solution spaces.

---

## Phase 3: Ideate

The goal of this phase is to generate as many possible solutions as possible, then filter them through the constraints of the hackathon.

### Exercise 3A: Brainstorm (quantity over quality)

Set a timer for 10 minutes. Write down every possible solution to your HMW questions. Do not evaluate. Do not filter. Include wild ideas, boring ideas, expensive ideas, impossible ideas. The point is volume.

Rules:
- No criticism during brainstorming
- Build on others' ideas (if working with a team)
- Write one idea per line
- Go for at least 15 ideas

### Exercise 3B: CROPS filter

Take your list of ideas and run each one through the CROPS filter. For each idea, ask:

**Censorship Resistance**: Can a single entity block, freeze, or selectively disable this for certain users? If yes, can you redesign it so they can't?

**Open Source**: Is every component auditable? Are there any proprietary black boxes in the stack? Could someone fork this and run their own version?

**Privacy**: What data does the user (human) expose by using this? What metadata does the agent generate? Is privacy the default, or does the user have to opt into it?

**Security**: Does this do what it claims and nothing more? What happens if a component fails? What happens if the team disappears? Does the user have an exit path?

Ideas that pass all four aren't automatically good, but ideas that fail on any one need to be redesigned or dropped.

### Exercise 3C: Feasibility filter

For each remaining idea, ask:
- Can this be built (even as a prototype) in the hackathon timeframe?
- What Ethereum infrastructure does this use? (See theme-specific tools in `references/themes.md`)
- What's the minimum viable demonstration?
- Does the builder (you) have the technical skills or can you learn what's needed in time?

### Exercise 3D: Select and refine

Pick the 1-2 strongest ideas. For each, write a one-paragraph concept statement:

"For [person], who [situation], our project [what it does] so that [outcome for the human]. Unlike [current workaround], it [key differentiator rooted in CROPS]."

---

## Phase 4: Prototype

The goal of this phase is to build the smallest possible thing that proves the core value proposition.

### Hackathon prototype principles

You are not building a product. You are building a proof of concept that demonstrates one thing: the human need you identified can be met using Ethereum infrastructure in a way that centralized alternatives cannot match.

**What to build:**
- The core user flow, end to end, even if it's rough
- The one interaction where the CROPS advantage is most visible
- Enough that a judge or user can experience the value proposition firsthand

**What not to build:**
- Every feature you can imagine
- A polished UI (unless the UI IS the insight)
- Integrations that don't serve the core demonstration

### Prototype planning template

```
Core value proposition: [one sentence]
User journey (prototype scope):
  Step 1: [user/agent action] → [what happens]
  Step 2: [user/agent action] → [what happens]
  Step 3: [user/agent action] → [what happens]
  ...
CROPS moment: [the specific step where the Ethereum infrastructure advantage is visible]
Technologies needed: [list]
What's in scope: [list]
What's out of scope: [list]
Definition of "done" for the hackathon: [what you need to demonstrate]
```

---

## Phase 5: Test

The goal of this phase is to validate that your prototype actually delivers on the promise you made to your user.

### Exercise 5A: User walkthrough

Have someone who wasn't involved in building the prototype walk through the user journey. Watch what they do. Note where they get confused. Note where they say "oh, that's cool" and where they say "wait, what?"

Questions to ask after:
- In your own words, what does this do?
- Who would you say this is for?
- Would you use this? Why or why not?
- What's the most important thing it does?
- What's missing?

### Exercise 5B: CROPS stress test

For each CROPS property, ask:
- What happens if the centralized alternative comes back online? Why would the user still choose this?
- What happens if you (the builder) disappear? Does the user lose access?
- What data did the user expose in the demo? Could that be reduced?
- What could an adversary do to disrupt this for the user?

### Exercise 5C: Pitch preparation

Prepare to present your project in this order:
1. **The person.** Who is this for? Name them. Describe their situation.
2. **The problem.** What happens to them today?
3. **The insight.** What did you discover about why current solutions fail?
4. **The solution.** What does your project do?
5. **The demo.** Show the user journey.
6. **The CROPS advantage.** Why does this need Ethereum infrastructure?

---

## Jobs-to-be-Done Integration

Alongside empathy mapping, use the Jobs-to-be-Done (JTBD) framework to sharpen your understanding of what the human is trying to accomplish.

JTBD asks: when someone "hires" a product, what job are they hiring it to do?

The job has three dimensions:
- **Functional**: the practical task (move money to a vendor)
- **Emotional**: how they want to feel (confident the payment went through)
- **Social**: how they want to be perceived (professional, reliable, in control)

### JTBD statement template

"When [situation], I want to [motivation], so I can [desired outcome]."

Examples:
- "When my agent books a SaaS subscription for me, I want to know exactly what it paid and to whom, so I can catch errors before they become expensive."
- "When I send my agent to negotiate a contract with a supplier's agent, I want the terms to be locked in a way neither side can unilaterally change, so I can commit resources without worrying about the rug being pulled."
- "When my agent accesses a research database on my behalf, I want it to do so without revealing my identity or research topic, so I can study sensitive subjects without creating a profile that could be used against me."

Use JTBD to check your problem statement. If the job is clear, the problem statement should map directly to it.

---

## Worked Example: Priya the Freelancer

**Phase 1 (Empathize):**
Priya is a freelance UX designer in Mumbai. She works with clients in the US, Europe, and Southeast Asia. She uses an AI agent to send invoices, follow up on payments, and pay for design tools and SaaS subscriptions. She bills in USD, EUR, and INR depending on the client.

Empathy map:
- SAYS: "I just want to get paid and know it went through." "I spend more time chasing payments than designing." "I had a tool subscription I didn't even know my agent signed up for."
- THINKS: "Is this payment going to clear? Can I trust the exchange rate my agent got? What if it paid the wrong account?"
- DOES: Checks three platforms every morning. Keeps a spreadsheet cross-referencing agent transactions with bank statements. Manually verifies large payments by logging into each processor.
- FEELS: Frustrated by the lack of visibility. Anxious about errors she can't catch. Resigned to the manual verification routine she's built.

**Phase 2 (Define):**
Insight: Priya's agent handles her financial operations, but the infrastructure it runs on treats her as an afterthought. The payment processors give the agent a confirmation, but they don't give Priya independent proof of what actually happened. She's delegated the task but can't delegate the trust.

Problem statement: "Priya needs a way to independently verify every financial action her agent takes on her behalf because the payment infrastructure her agent uses doesn't provide her with trustworthy proof of settlement."

HMW: "How might we give Priya a transparent, tamper-proof record of every transaction her agent executes, without depending on any single payment processor to be honest?"

**Phase 3 (Ideate):**
Selected concept: An agent wallet with onchain settlement receipts. Every payment the agent makes settles onchain, giving Priya an independent, auditable record. She sets spending limits and approved vendors through a smart contract. The agent can operate within those bounds autonomously, and Priya can verify everything from a single dashboard that reads directly from the chain.

CROPS check:
- Censorship Resistance: No processor can freeze Priya's agent's payments. The settlement rail is permissionless.
- Open Source: The wallet contract and dashboard are open source and auditable.
- Privacy: Priya's vendor relationships are visible onchain, which is a problem. Needs privacy layer for vendor identities. Flag for further design.
- Security: Smart contract spending limits mean the agent can't go rogue. Priya has a kill switch. The contract is auditable.

**Phase 4 (Prototype):**
Build: A demo agent wallet contract with configurable spending limits, a simple agent that pays a test vendor, and a dashboard showing the onchain receipt with settlement proof. Out of scope: privacy layer, multi-currency, production UI.

**Phase 5 (Test):**
Success criteria: A judge can watch the agent pay a vendor, then independently verify the payment on the dashboard without trusting the agent or the vendor. The spending limit is enforced. The receipt is permanent and tamper-proof.

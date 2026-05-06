# Decisions

> Fill in each section with a short answer (a paragraph each is plenty). We
> will discuss these with you in the interview.

## 1. Boundary semantics

Why do back-to-back flights not conflict? Where in your code is that decided?
What would change if a customer asked for a 5-minute mandatory gap between
consecutive flights on the same stand?

> *(your answer here)*

## 2. MARS stands

How does your code handle MARS stands? Walk through what happens when a
wide-body lands on parent stand `A1` while a narrow-body is already parked
on child stand `A1L`.

> *(your answer here)*

## 3. Timezones

Where in your code does timezone conversion happen? What breaks if this
service is deployed on a server whose system timezone is not
`Asia/Singapore`?

> *(your answer here)*

## 4. Concurrency

Two ops controllers hit `POST /flights/check-allocation` for the same stand
at the same instant, both get a clean result, and both then `POST /flights`.

a. Walk through what your code and the database do today. Be specific about
   *which* statement runs in which order on each connection.

b. If the outcome is wrong, sketch a fix in code (5–20 lines is plenty —
   show the SQL, lock primitive, or constraint you'd add). You don't have
   to wire it in, but the sketch must be concrete enough to compile.

> *(your answer here)*

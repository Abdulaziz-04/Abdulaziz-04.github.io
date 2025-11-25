---
source: deepdives/backend_systems/price_notifier/price_notifier.html
title: Price Notifier with WhatsApp Alerts
type: page
---

deepdives/backend_systems/price_notifier/price_notifier.html

# Price Notifier with WhatsApp Alerts
Price Notifier with WhatsApp Alerts
← Back to Projects
Backend & Distributed Logic
Price Notifier with WhatsApp Alerts
Lightweight FastAPI service that checks live Amazon prices on demand
and every 6 hours, then sends WhatsApp alerts via Twilio when a target
is reached. Simple browser UI, optional send delay, Docker deploy, and
multi-URL tracking via CSV for personal use.

### Tech Stack
Tech Stack:
FastAPI, asyncio, BeautifulSoup, Twilio
API, uvicorn, React, Docker, Heroku
Submit an Amazon URL, target price, optional delay, and see a
structured JSON response from the API.

## Quick insights
Quick insights

### Purpose
Purpose:
Automate price checks for Amazon products
and alert on WhatsApp when a target is hit.

### Inputs
Inputs:
Product URL, target price, optional delay
in minutes, and optional per-request WhatsApp recipient.

### Automation
Automation:
A background task re-checks all saved
URLs every 6 hours and sends alerts when thresholds are met.

## Features
Features
Amazon-focused price extraction tuned for common product pages.
Immediate or delayed WhatsApp alerts via Twilio.
Multiple URL tracking stored in a CSV for a lightweight workflow.
Static UI served by the API, plus a health check endpoint.

## WhatsApp alert snapshot
WhatsApp alert snapshot
Example alert sent when the Amazon price dropped below the target.

## Amazon price parsing approach
Amazon price parsing approach
The service is targeted specifically at Amazon links. When a request
arrives, the backend fetches the page using a custom User-Agent to
avoid simplistic bot blocking. It then parses the HTML with
BeautifulSoup and looks for Amazon’s typical price containers such as
priceblock_ourprice
,
priceblock_dealprice
, and
priceblock_saleprice
.
If those are missing (for example on certain variations and deals
pages), it falls back to scanning the page text for the first
currency-like number. The parsed value is normalized to a numeric
price and compared to the target; if
price ≤ target
, an alert is queued immediately or
after the requested delay.
This keeps scraping resilient across common Amazon layouts while
remaining intentionally simple for a personal notifier.

## API Endpoints
API Endpoints
GET /
serves the User Interface.
GET /api/health
returns if the service is active or under
downtime.
POST /api/notify
accepts { url, target_price,
delay_minutes(0–1440), send_to? } and returns status, current price,
and Twilio SID if a message was sent.

## Deployment & reliability
Deployment & reliability
Dockerized and deployed to Heroku as an ASGI service.
Delayed sends use asyncio; recurring re-checks run every 6 hours in
process. For production hardening, this can be moved to a durable
job runner and datastore.
Clear error responses for missing Twilio config, invalid inputs, or
price parse failures.

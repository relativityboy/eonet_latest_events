# Nasa EONET Latest Events

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

This little app pulls the latest EONET events and displays them.
Clicking on an event takes you to it's detail page in the app.
This detail page displays some of the information available from EONET
and displays an OSM mini-map of the location (looked into
doing MODIS sourced satellite image but some areas don't have recent 
images and they tend to be low-rez 
), and a google link.

Apologies if my use of the NASA apis seems immature. It's my first time working
with them. I could have done something else, but this seemed fun.

## Getting Started

First, run the development server:

```bash
npm install

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


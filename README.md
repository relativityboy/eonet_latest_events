# (NASA) EONET Latest Events

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

This little app pulls the latest EONET events and displays them.
Clicking on an event takes you to it's detail page in the app.

The detail page displays 
* some of the information available from EONET
+ An OSM mini-map of the location (if coordinates are avail)
+ A google link.
+ Raw JSON of the event

Notes: 
* MODIS sourced satellite images were considered but some areas don't have recent 
images and they tend to be low-rez, so Went with OSM.
* Zero Vibe coding. ChatGPT was used for research and to speed tests/debugging.
* Had "finished" on 04.25 but recruiter asked if this was "my best work". Internal answer was "yeah, but NASA apis are slow sometimes..."
  So I added a funky spinner and DataError component Monday afternoon (which also begged for a layout change and new tests)
* I'm having fun with this project. It may evolve over-time. :)
* **BONUS Content:** In [docs/dev_scratch](./docs/dev_scratch) you'll 2 files you can 'drag into chrome' to play with. They _shoooouuuld_ run.
  *  [enonet-eventlist.html](./docs/dev_scratch/enonet-eventlist.html) a local file I used to play with the api giving event lists
  *  [viirs_realtime_globe.html](./docs/dev_scratch/viirs_realtime_globe.html) a globe showing real-ish time imagery of the Earth
     (if you replace the `2025-04-21` with `${ymdToday}`) that centers on your location, and you can spin with the mouse. This was the first thing I started playing with,
    and was going to use it on the main list page, but ran out of time to do it well enough, so for now it's
    just a bauble.

_Apologies if things are a little rough. It's my 1st use of NASA apis & openlayers.
I wanted to do something fun and figured this would give a good idea of what I can produce over a couple days of effort.
(Also, I may be going in for a root canal Tuesday. This has been a tug-of-war between pain & fun factors)_



## Running the app in dev 

```bash
npm install && npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


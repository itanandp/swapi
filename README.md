## About

Live URL: https://anand-swapi.vercel.app/

This project is a minimal front end for the star wars api available at [https://swapi.dev/](https://swapi.dev/) Skip to the bottom for setup and run info.

I started this project by reading through the technical requirements and taking a look through the API documentation. Immediately, I noticed two things: there were only six data types to worry about, with only a few hundred entries total, and the API was a little slow. This led me to choose Next.js for its static generation capabilities, which would allow me to push the API response time into the build phase, alleviating any frustration and creating a smoother browsing experience, all while saving the user from ever seeing a loading spinner.

From there, I knew I would have an index and six page types, and I could leverage Next's `getStaticPaths` and `getStaticProps` functions to generate pages for each entry.

I began by creating a basic index that would fetch all the planets from the SWAPI and render a page with links out to each one. 

I noticed that all the responses contained links to related resources, so I wrote a utility function that would take that URL and fetch its name or title, returning it with the resource path, which could be passed directly to `next/link` for local navigation. After writing the helper function, I stubbed out the entry page for each planet and wrote a planet parser that would take the response from SWAPI and replace any SWAPI URLs with the appropriate entry name and local link.

After this, I decided to test a static build, which generated 61 pages as expected in a little under 90 seconds and gave the desired result within the browser. I extrapolated that logic out for each of our data types and stubbed out the remaining pages.

After stubbing out all the basic views and testing out a build, I found that some species returned null for homeworld, so I had to update the parser to handle that case. I also added in some logic to our parsers to insert commas into some of the larger numbers for readability. I also added in some formatters to make some of the general statistics easier to read.

After this, I ran another full site build (269 pages) and began adding in Tailwind styles and performing any additional clean-up.

Here are a few things I would do if I were to continue spending time on this (I would estimate this to be another 1-2 hours):
- Add index pages for each category like we have for planets
- Add a header with a breadcrumb that shows our journey to the current entry.
- Add a footer with a link back out to SWAPI with the created and edited dates.
- Fix planet unknown to make it more clear what it is
- Improve parsers to protect us from reserved/unusual keys. ie. .length .MGLT and snake cases
- add a stats and facts pages with things like largest planet, highest pop, which character is in the most movies, etc.

Caveats/Notes:
- One of the trade-offs of going with a static site is having to trigger rebuilds or manage fetching new content. can be solved with next's isr or switching to an on request render.
- There's a bit of code duplication across the individual routes. Some could be solved by combining them and abstracting out logic further, but that could cause issues down the road if we add more types or if the types diverge. This is fine for now as it enabled me to quickly make changes to the individual type pages.
- I kept the UI pretty barebones in order to prioritize the code and logic around fetching the data and generating pages. If there had been some images or more complicated data to display I would have made the UI a larger focus.


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

import { Image } from "@unpic/react";
import { format } from "date-fns";
import { formatISODuration } from "date-fns";
import { Interweave } from "interweave";
import {
  MdArrowBackIosNew,
  MdIosShare,
  MdOutlineShoppingBasket,
  MdPlayArrow,
} from "react-icons/md";
import type { MusicAlbum, WithContext } from "schema-dts";

import { Button } from "@/components/button";
import { ProfileHint } from "@/components/profile-hint";
import { Text } from "@/components/text";
import { TrackListing } from "@/components/track-listing";
import {
  formatDuration,
  isoDurationToDateFnsDuration,
  sumIsoDurations,
} from "@/lib/duration";

export default function ReleasesShow() {
  const data = MOCK_DATA; // See bottom of file for mock data object

  // Will likely need to format this date in a more robust way depending on how dates are stored in the database (e.g. handling timezones)
  const formattedReleaseDate = format(data.date, "MMMM d, yyyy");

  const numberOfTracks = data.tracks.length;
  const totalIsoDuration = sumIsoDurations(
    data.tracks.map((track) => track.duration)
  );
  const totalDuration = isoDurationToDateFnsDuration(totalIsoDuration);
  const formattedTotalDuration = formatDuration(totalDuration);

  /**
   * JSON-LD helps search engines understand the content of the page.
   * @see https://schema.org/MusicAlbum
   */
  const jsonLd: WithContext<MusicAlbum> = {
    "@context": "https://schema.org",
    "@type": "MusicAlbum",
    name: data.title,
    image: data.image.src,
    byArtist: {
      "@type": "MusicGroup",
      name: data.artist.name,
      image: data.artist.image.src,
    },
    albumRelease: {
      "@type": "MusicRelease",
      name: "Let It Be",
      duration: totalIsoDuration,
      image: data.image.src,
    },
    datePublished: data.date.toISOString(),
    numTracks: numberOfTracks,
    track: {
      "@type": "ItemList",
      numberOfItems: numberOfTracks,
      itemListElement: data.tracks.map((track, i) => ({
        "@type": "ListItem",
        position: i,
        item: {
          "@type": "MusicRecording",
          name: track.title,
          duration: track.duration,
        },
      })),
    },
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-surface-container justify-between">
      <header className="bg-surface w-full flex items-center p-2">
        <div className="flex items-center gap-2 justify-start">
          <div className="flex items-center justify-center w-10 h-10">
            <MdArrowBackIosNew className="shrink-0 w-5 h-5 text-on-surface" />
          </div>
          <div>
            <div className="text-body-lg text-on-surface">{data.title}</div>
            <div className="text-body-md text-on-surface-variant">
              {data.artist.name}
            </div>
          </div>
        </div>
      </header>
      <main className="bg-surface max-w-3xl grow">
        <section
          id="hero"
          className="grid md:grid-cols-[45%,auto] bg-surface-container-high"
        >
          <div className="aspect-square bg-primary">
            <Image
              className="w-full h-full"
              src={data.image.src}
              alt={data.image.alt}
              layout="constrained"
              width={352}
              height={352}
            />
          </div>
          <div className="flex flex-col justify-end space-y-2 p-4 md:p-6">
            <div>
              <div className="text-body-lg text-primary">
                {data.artist.name}
              </div>
              <div className="text-title-lg text-on-surface">{data.title}</div>
              <div className="text-body-sm text-on-surface-variant">
                {[`${numberOfTracks} Tracks`, formattedTotalDuration]
                  .filter(Boolean)
                  .join(", ")}
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2 grow">
                <Button variant="secondary" className="pl-5">
                  <MdIosShare className="w-5 h-5" />
                  Share
                </Button>
                <Button variant="secondary" className="pl-5">
                  <MdOutlineShoppingBasket className="w-5 h-5" />
                  Buy
                </Button>
              </div>
              <Button variant="primary" className="h-12 px-9">
                <MdPlayArrow className="w-10 h-10" />
                <span className="sr-only">Play</span>
              </Button>
            </div>
          </div>
        </section>
        <section id="track-list" className="my-4">
          <ol>
            {data.tracks.map((track, i) => (
              <li key={track.id}>
                <TrackListing
                  number={i + 1}
                  title={track.title}
                  duration={track.duration}
                />
              </li>
            ))}
          </ol>
        </section>
        <section id="about" className="mx-4 md:mx-6 my-8 md:my-12 space-y-2">
          <h2 className="text-title-md text-on-surface-variant">About</h2>
          <Interweave
            tagName="div"
            className="text-body-md text-on-surface space-y-4"
            content={data.description}
          />
        </section>
        <section
          id="purchase-options"
          className="mx-4 md:mx-6 my-8 md:my-12 space-y-2"
        >
          <h2 className="text-title-md text-on-surface-variant">
            Purchase Options
          </h2>
        </section>
        <section id="tags" className="mx-4 md:mx-6 my-8 md:my-12 space-y-2">
          <h2 className="text-title-md text-on-surface-variant">Tags</h2>
        </section>
        <section id="copyright" className="mx-4 md:mx-6 my-12 md:my-16">
          <Text size="body-md" className="text-on-surface-variant">
            <span className="block">Released {formattedReleaseDate} </span>
            <span className="block">© All Rights Reserved</span>
          </Text>
        </section>
        <section id="about" className="my-8 md:my-12 space-y-4">
          <div className="px-4 md:px-6 space-y-4">
            <h2 className="text-title-md text-on-surface-variant">Artist</h2>
            <ProfileHint
              title={data.artist.name}
              subtitle={data.artist.location}
            />
          </div>
          <div className="aspect-[2/1] bg-primary">
            <Image
              className="w-full h-full"
              src={data.artist.image.src}
              alt={data.artist.image.alt}
              layout="fullWidth"
            />
          </div>
        </section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </main>
      <footer></footer>
    </div>
  );
}

/**
 * This is just a mock data object to use for development.
 * Fully expecting this data model to change subtly or drastically.
 * Remove when/as real data is available.
 */
const MOCK_DATA = {
  id: "1",
  artist: {
    id: "1",
    name: "Mary Yalex",
    location: "Frankfurt, Germany",
    image: {
      src: "https://cdn.shopify.com/static/sample-images/shoes.jpeg",
      alt: "Person in a white dress wearing sneakers on a yellow tiled floor",
      width: 1850,
      height: 1233,
    },
  },
  title: "Sentimental Journey",
  date: new Date("June 18, 2021"),
  description: `<p>Lorem ipsum dolor sit amet, consectetur <a href="https://google.com/">link example</a> adipiscing elit, sed do <strong>eiusmod</strong> tempor incididunt ut <em>labore</em> et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p>Dolore culpa reprehenderit proident officia do voluptate incididunt est sunt aute non dolor veniam. Lorem minim et culpa fugiat cillum velit sint non consequat occaecat pariatur elit nulla dolore. Deserunt esse tempor adipisicing irure proident laborum Lorem eiusmod reprehenderit pariatur sint. Enim anim velit officia duis fugiat ullamco Lorem ad ad sint est. Officia voluptate veniam officia duis sit sit anim aliqua consectetur consectetur incididunt veniam. Pariatur et labore nisi commodo cillum enim minim ut sunt. Culpa et duis sint veniam ipsum. Aliqua magna et duis nostrud consectetur consectetur nostrud exercitation quis.</p>`,
  image: {
    src: "https://cdn.shopify.com/static/sample-images/shoes.jpeg",
    alt: "Person in a white dress wearing sneakers on a yellow tiled floor",
    width: 1850,
    height: 1233,
  },
  tracks: [
    {
      id: "1",
      title: "Stellar State One",
      duration: formatISODuration({
        minutes: 5,
        seconds: 10,
      }),
    },
    {
      id: "2",
      title: "Stellar State Two",
      duration: formatISODuration({
        minutes: 4,
        seconds: 56,
      }),
    },
    {
      id: "3",
      title: "Stellar State Three",
      duration: formatISODuration({
        minutes: 3,
        seconds: 4,
      }),
    },
    {
      id: "4",
      title: "Stellar State Four",
      duration: formatISODuration({
        minutes: 2,
        seconds: 43,
      }),
    },
    {
      id: "5",
      title: "Stellar State Five",
      duration: formatISODuration({
        minutes: 10,
        seconds: 37,
      }),
    },
    {
      id: "6",
      title: "Stellar State Six",
      duration: formatISODuration({
        minutes: 3,
        seconds: 33,
      }),
    },
  ],
};

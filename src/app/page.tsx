// "use client";

import { Image } from "@unpic/react";
import { RiArrowLeftSLine } from "react-icons/ri";

import { AlbumCard } from "@/components/album-card";
import { Button } from "@/components/button";
import { FeaturedTrack } from "@/components/featured-track";
import { ListItem } from "@/components/list-item";
import { ProfileHint } from "@/components/profile-hint";
import { Text } from "@/components/text";
import { createTheme } from "@/lib/theme/create-theme";
import { formatTheme } from "@/lib/theme/format";
import { transformTheme } from "@/lib/theme/transform-theme";

const theme = createTheme({
  seed: "#1a3048",
});
const transformedTheme = transformTheme(theme);

export default function Home() {
  const data = MOCK_DATA; // See bottom of file for mock data object

  // Sort releases by date descending to show most recent first
  const releases = data.releases.sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  console.log({ theme });
  console.log({ transformedTheme });
  const cssFormat = formatTheme({
    theme: transformedTheme.dark,
    format: "css",
  });

  console.log({ cssFormat });

  return (
    <div
      className="flex min-h-screen flex-col items-center bg-surface-container justify-between"
      style={{ ...cssFormat }}
    >
      <header className="bg-surface w-full flex items-center p-2">
        <div className="flex items-center gap-2 justify-start">
          <div className="flex items-center justify-center w-10 h-10">
            <RiArrowLeftSLine className="shrink-0 w-6 h-6 text-on-surface" />
          </div>
          <Text as="span" size="body-lg">
            Mary Yalex
          </Text>
        </div>
      </header>
      <main className="bg-surface max-w-3xl grow">
        <section id="banner" className="aspect-[2/1] bg-primary">
          <Image
            className="w-full h-full"
            src="https://cdn.shopify.com/static/sample-images/shoes.jpeg"
            alt="Person in a white dress wearing sneakers on a yellow tiled floor"
            layout="fullWidth"
          />
        </section>
        <section id="about" className="mx-4 md:mx-6 my-4 space-y-4">
          <ProfileHint title="Mary Yalex" subtitle="Frankfurt, Germany" />
          <Text size="body-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
        </section>
        <section
          id="featured-track"
          className="mx-4 md:mx-6 my-8 md:my-12 space-y-2"
        >
          <Text as="h2" size="title-md" color="variant">
            Featured Track
          </Text>
          <FeaturedTrack />
        </section>
        <section
          id="discography"
          className="mx-4 md:mx-6 my-8 md:my-12 space-y-2"
        >
          <Text as="h2" size="title-md" color="variant">
            Discography
          </Text>
          <ul className="grid grid-cols-2 gap-x-2 md:gap-4">
            {releases.map((release) => (
              <li key={release.id}>
                <AlbumCard
                  title={release.title}
                  date={release.date}
                  image={release.image}
                />
              </li>
            ))}
          </ul>
        </section>
        <section
          id="merchandise"
          className="mx-4 md:mx-6 my-8 md:my-12 space-y-2"
        >
          <Text as="h2" size="title-md" color="variant">
            Merchandise
          </Text>
          <FeaturedTrack />
        </section>
        <section id="tags" className="mx-4 md:mx-6 my-8 md:my-12 space-y-2">
          <Text as="h2" size="title-md" color="variant">
            Tags
          </Text>
          <FeaturedTrack />
        </section>
      </main>
      <footer></footer>
      <h1>Artist website goes here</h1>
      <div className="w-full">
        <div className="text-title-lg">Button</div>
        <div>
          <div className="text-title-md">Primary</div>
          <Button variant="primary">Label</Button>
          <Button variant="primary" selected>
            Label
          </Button>
          <Button variant="primary" disabled>
            Label
          </Button>
        </div>
        <div>
          <div className="text-title-md">Secondary</div>
          <Button variant="secondary">Label</Button>
          <Button variant="secondary" selected>
            Label
          </Button>
          <Button variant="secondary" disabled>
            Label
          </Button>
        </div>
        <div>
          <div className="text-title-md">Tertiary</div>
          <Button variant="tertiary">Label</Button>
          <Button variant="tertiary" selected>
            Label
          </Button>
          <Button variant="tertiary" disabled>
            Label
          </Button>
        </div>
        <div>
          <div className="text-title-md">Outline</div>
          <Button variant="outline">Label</Button>
          <Button variant="outline" selected>
            Label
          </Button>
          <Button variant="outline" disabled>
            Label
          </Button>
        </div>
      </div>

      <div className="w-full divide-y">
        <ListItem
          overline="Overline"
          title="Title"
          subtitle="Subtitle"
          slot={<div className="w-full h-full bg-neutral-90" />}
        />
        <ListItem
          title="Title"
          subtitle="Subtitle"
          slot={<div className="w-full h-full bg-neutral-90" />}
        />
        <ListItem
          overline="Magna sunt velit id officia cupidatat minim et elit ipsum labore mollit aliquip nostrud enim ut mollit culpa excepteur minim veniam ex do ex dolor irure"
          title="Elit eiusmod reprehenderit ipsum labore cupidatat velit ex deserunt proident ex aliqua"
          subtitle="Excepteur ad esse Lorem dolor consectetur amet mollit aliqua do id adipisicing commodo aute esse elit."
          slot={<div className="w-full h-full bg-neutral-90" />}
        />
        <ListItem title="Title" subtitle="Subtitle" />
        <ListItem
          title="Title"
          slot={<div className="w-full h-full bg-neutral-90" />}
        />
        <ListItem title="Title" />
      </div>
      <div className="w-full divide-y">
        <ProfileHint title="Username" subtitle="@handle" />
        <ProfileHint
          title="Maximiliano Alejandro Ferdinand Bartholomew Rutherford Montgomery Beauregard Archibald Percival Thaddeus Zenith Ignatius Octavius Hermenegildo Theodosius Wellington Napoleon Endymion Vladimir"
          subtitle="@endlesslyintriguingcardinal19872654127894562317489651239"
        />
      </div>
      <div className="w-full divide-y">
        <FeaturedTrack />
      </div>
    </div>
  );
}

/**
 * This is just a mock data object to use for development.
 * Fully expecting this data model to change subtly or drastically.
 * Remove when/as real data is available.
 */
const MOCK_DATA = {
  releases: [
    {
      id: "1",
      title: "Sunset Stories",
      date: new Date("July 12, 2022"),
      image: {
        src: "https://cdn.shopify.com/static/sample-images/shoes.jpeg",
        alt: "Person in a white dress wearing sneakers on a yellow tiled floor",
        width: 352,
        height: 352,
      },
    },
    {
      id: "2",
      title: "Ohra",
      date: new Date("April 3, 2021"),
      image: {
        src: "https://cdn.shopify.com/static/sample-images/shoes.jpeg",
        alt: "Person in a white dress wearing sneakers on a yellow tiled floor",
        width: 352,
        height: 352,
      },
    },
    {
      id: "3",
      title: "Valley Drone",
      date: new Date("March 18, 2020"),
      image: {
        src: "https://cdn.shopify.com/static/sample-images/shoes.jpeg",
        alt: "Person in a white dress wearing sneakers on a yellow tiled floor",
        width: 352,
        height: 352,
      },
    },
    {
      id: "4",
      title: "Some Kind Of Joy",
      date: new Date("June 30, 2018"),
      image: {
        src: "https://cdn.shopify.com/static/sample-images/shoes.jpeg",
        alt: "Person in a white dress wearing sneakers on a yellow tiled floor",
        width: 352,
        height: 352,
      },
    },
  ],
};

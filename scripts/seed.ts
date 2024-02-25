import { db } from "@/server/db";
import {
  getAuthorsData,
  getBooksData,
  getParsedBookVersions,
} from "./fetchers";
import { author, book, version } from "@/server/db/schema";
import { chunk } from "./utils";

// const allAuthors = await getAuthorsData();
// const chunkedAuthors = chunk(allAuthors, 100) as (typeof allAuthors)[];

const allBooks = await getBooksData();
// const authorIdToNumberOfBooks = allBooks.reduce(
//   (acc, book) => {
//     const authorId = book.authorId;
//     if (acc[authorId]) {
//       acc[authorId]++;
//     } else {
//       acc[authorId] = 1;
//     }
//     return acc;
//   },
//   {} as Record<string, number>,
// );

// let authorBatchIdx = 1;
// for (const authors of chunkedAuthors) {
//   console.log(
//     `[AUTHORS] Seeding batch ${authorBatchIdx} / ${chunkedAuthors.length}`,
//   );

//   await db.insert(author).values(
//     authors.map((authorEntry) => ({
//       id: authorEntry.id,
//       primaryArabicName: authorEntry.primaryArabicName,
//       otherArabicNames: authorEntry.otherArabicNames,
//       primaryLatinName: authorEntry.primaryLatinName,
//       otherLatinNames: authorEntry.otherLatinNames,
//       year: authorEntry.year,
//       relatedGeographies: authorEntry.geographies,
//       numberOfBooks: authorIdToNumberOfBooks[authorEntry.id] ?? 0,
//     })),
//   );

//   authorBatchIdx++;
// }

// const chunkedBooks = chunk(allBooks, 100) as (typeof allBooks)[];

// let bookBatchIdx = 1;
// for (const books of chunkedBooks) {
//   console.log(`[BOOKS] Seeding batch ${bookBatchIdx} / ${chunkedBooks.length}`);

//   await db.insert(book).values(
//     books.map((bookEntry) => ({
//       id: bookEntry.id,
//       authorId: bookEntry.authorId,
//       primaryArabicName: bookEntry.primaryArabicName,
//       otherArabicNames: bookEntry.otherArabicNames,
//       primaryLatinName: bookEntry.primaryLatinName,
//       otherLatinNames: bookEntry.otherLatinNames,
//       genreTags: bookEntry.genreTags,
//       versionIds: bookEntry.versionIds,
//       numberOfVersions: bookEntry.versionIds.length,
//     })),
//   );

//   bookBatchIdx++;
// }

// DROP ALL DATA in the version table
await db.delete(version).execute();

let versionBatchIdx = 1;
for (const bookEntry of allBooks) {
  console.log(
    `[VERSIONS] Seeding batch ${versionBatchIdx} / ${allBooks.length}`,
  );

  const parsedBookVersions =
    bookEntry.versionIds.length > 0
      ? await getParsedBookVersions(bookEntry.id, bookEntry.versionIds)
      : [];

  if (parsedBookVersions === null) {
    console.log(
      `[VERSIONS] Failed to parse book versions for book ${bookEntry.id}`,
    );

    continue;
  }

  const finalVersions = parsedBookVersions.map((version, idx) => ({
    id: bookEntry.versionIds[idx]!,
    bookId: bookEntry.id,
    content: version,
  }));

  await db.insert(version).values(
    finalVersions.map((versionEntry) => ({
      id: versionEntry.id,
      bookId: versionEntry.bookId,
      metadata: versionEntry.content.metadata,
      blocks: versionEntry.content.content,
    })),
  );

  versionBatchIdx++;
}
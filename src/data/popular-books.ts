import { db } from "@/server/db";

export const popularBooks = [
  { slug: "sahih" },
  { slug: "sahih-1" },
  { slug: "sunan-4" },
  { slug: "sunan-3" },
  { slug: "sahih-wa-dacif-sunan-tirmidhi" },
  { slug: "sunan-sughra" },
  { slug: "muwatta" },
  { slug: "riyad-salihin" },
  { slug: "ihya-culum-din" },
  { slug: "tafsir-jalalayn" },
  { slug: "tafsir-quran-6" },
  { slug: "fath-bari" },
];

export const popularIslamicLawBooks = [
  { slug: "muwatta" },
  { slug: "mughni" },
  { slug: "hidaya-fi-sharh-bidaya" },
  { slug: "bidayat-mujtahid" },
  { slug: "umm" },
  { slug: "mukhtasar-4" },
  { slug: "risala" },
  { slug: "mukhtasar-sahih-bukhari" },
  { slug: "mabsut-1" },
  { slug: "radd-muhtar" },
  { slug: "muhalla-bi-athar" },
];

export const fetchPopularBooks = async () => {
  return db.query.book.findMany({
    where: (book, { or, eq }) => {
      return or(...popularBooks.map(({ slug }) => eq(book.slug, slug)));
    },
  });
};

export const fetchPopularIslamicLawBooks = async () => {
  return db.query.book.findMany({
    where: (book, { or, eq }) => {
      return or(
        ...popularIslamicLawBooks.map(({ slug }) => eq(book.slug, slug)),
      );
    },
  });
};

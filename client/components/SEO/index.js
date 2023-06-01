import Head from "next/head";

export default function SeoHead({ title }) {
  return (
    <Head>
      <title>{title ? `مورس | ${title}` : "مورس"}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href={"/favicon.ico"} />
    </Head>
  );
}

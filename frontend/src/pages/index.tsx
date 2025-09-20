import Head from "next/head";

export default function Root(props: { disableCustomTheme?: boolean }) {
  return (
    <div>
      <Head>
        <title>{`Nawy | Home`}</title>
      </Head>
    </div>
  );
}

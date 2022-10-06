import Head from 'next/head'

export default function Home() {
  return (
    <div className="container mx-auto p-10 m-10">
      <Head>
        <title>Chowmazing</title>
        <meta name="Chowmazing" content="It's what's for dinner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto p-10 m-10">
        <h1 className="p-4">
          Welcome to Chowmazing!
        </h1>

      </main>
    </div>
  )
}
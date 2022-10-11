import Head from 'next/head'
import { IngredientQuestions } from '../components/ingredientQuestions';

export default function Home({user}) {
  return (
    <div className="mx-auto p-10">
      <Head>
        <title>Chowmazing</title>
        <meta name="Chowmazing" content="It's what's for dinner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto p-10 m-10">
        <h1 className="text-center text-3xl font-extrabold text-white p-4">
          Welcome to Chowmazing, {user && user.first_name}!!
        </h1>
        <IngredientQuestions user={user}/>
      </main>
    </div>
  )
}
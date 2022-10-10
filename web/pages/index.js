import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import GoogleMapComponent from '../components/googleMap';
import { IngredientQuestions } from '../components/ingredientQuestions';

export default function Home({user}) {
  const router = useRouter();
  return (
    <div className="mx-auto p-10">
      <Head>
        <title>Chowmazing</title>
        <meta name="Chowmazing" content="It's what's for dinner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto p-10 m-10">
        <h1 className="p-4">
          Welcome to Chowmazing!!
        </h1>
        <IngredientQuestions user={user}/>
        {/* <GoogleMapComponent
        googleMapURL=`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}`
        loadingElement={<div className="h-full" />}
        containerElement={
          <div className="relative w-full rounded h-600-px" />
        }
        mapElement={<div className="rounded h-full" />} /> */}
      </main>
    </div>
  )
}
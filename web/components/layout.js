import { NavBar } from "./navbar"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import Footer from './footer'

export default function Layout({ children, user }) {
  return (
    <>
        <NavBar user={user}/>
        <main className="bg-main-1 w-screen h-screen">{children}</main>
        {/* <Footer /> */}
    </>
  )
}
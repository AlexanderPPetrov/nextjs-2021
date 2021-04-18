import Head from 'next/head'
import DefaultLayout from '../../components/layouts/Default'
import GamesList from "../../components/games/GameList"

export default function Games() {
  return (
    <DefaultLayout>
      <Head>
        <title>Games</title>
      </Head>
      <h1>Games</h1>
      <GamesList/>
    </DefaultLayout>
  )
}
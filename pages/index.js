import Head from 'next/head'
import DefaultLayout from '../components/layouts/Default'
import WeatherChart from '../components/charts/WeatherChart'

export default function Home() {
  return (
    <DefaultLayout>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="row">
        <WeatherChart/>
      </div>
    </DefaultLayout>
  )
}

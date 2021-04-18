import Head from 'next/head'
import DefaultLayout from '../../components/layouts/Default'
import { client } from "@apollo/client"
import { GET_CURRENT_USER } from "../../queries/user";

export default function Admin() {
  return (
    <DefaultLayout>
      <Head>
        <title>Admin panel</title>
      </Head>
      <h1>Visible only for Users with ADMIN role</h1>
    </DefaultLayout>
  )
}
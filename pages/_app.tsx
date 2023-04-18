import * as React from 'react'
import { AppProps } from 'next/app';
import Head from 'next/head';

import './style.css'

// Color palette: https://coolors.co/palette/111618-223036-315851-406159-476a64

function MainPage({ Component, pageProps }: AppProps) {
    return <>
        <Head>
            <title>
                Recipe App
            </title>
            <meta charSet="UTF-8"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        </Head>
        <Component {...pageProps}></Component>
    </>
}

export default MainPage
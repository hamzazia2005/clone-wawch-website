/* eslint-disable @next/next/inline-script-id */
import React from "react";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import "./globals.css";
import "./blogGlobals.scss";
//import { AppWrapper } from '@/context';
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
//import AOSinit from '@/animations/AOSinit';
import NextTopLoader from "nextjs-toploader";
import ClientEnhancer from "@/components/client-wrapper";
import { headers } from "next/headers";
// import Head from 'next/head';
// import { Suspense } from 'react';
// import Loader from '@/components/loader';
//import WhatsAppButton from '@/components/whatsapp-button';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://wawcd.com"),
  title: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
  description:
    "Maximize Your Impact with the Most Powerful WhatsApp Solution! Enjoy Privacy Features, Zero Inbox, Contact Saver for WhatsApp, Broadcasting, and Seamless Integration with ChatGPT, Hubspot, and More – All in One WhatsApp Solution.",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        href: "/favicon.ico",
        sizes: "16x16",
        type: "image/x-icon",
      },
      {
        url: "/favicon-32x32.ico",
        href: "/favicon-32x32.ico",
        sizes: "32x32",
        type: "image/x-icon",
      },
      {
        url: "/favicon-48x48.ico",
        href: "/favicon-48x48.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  },
};

export default async function Layout({ children }) {
  const headersList = await headers();
  const langFromHeader = headersList.get('x-language') || '';
  const lang = langFromHeader || 'en';
  const dir = lang.startsWith('ar') ? 'rtl' : 'ltr';
  
  const pathname = headersList.get('x-pathname') || '';
  const currentPath = pathname || '/';
  
  const englishOnlyPaths = ['/blog', '/resources', '/author'];
  const isEnglishOnlyPage = englishOnlyPaths.some(path => 
    currentPath === path || currentPath.startsWith(`${path}/`)
  );
  
  const supportedLanguages = ['en', 'fr', 'ar', 'pt'];
  const baseUrl = 'https://wawcd.com';
  
  const pathWithoutLang = isEnglishOnlyPage 
    ? currentPath 
    : currentPath.replace(/^\/(en|fr|ar|pt)(\/|$)/, '/') || '/';
  const cleanPath = pathWithoutLang === '/' ? '' : pathWithoutLang;
  
  return (
    <html lang={lang} dir={dir}>
      <head>
        {!isEnglishOnlyPage && supportedLanguages.map((langCode) => (
          <link
            key={langCode}
            rel="alternate"
            hrefLang={langCode}
            href={`${baseUrl}/${langCode}${cleanPath}`}
          />
        ))}
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${baseUrl}${cleanPath || '/'}`}
        />
      </head>
      <Script
        async
        src="https://cdn.tolt.io/tolt.js"
        data-tolt="0f9eae97-4b55-488f-8f78-5b9b955d11ae"
      ></Script>
      <GoogleTagManager gtmId="GTM-N6RMD8BD" />
      <Script
        id="apollo-tracking"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
            o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
            o.onload=function(){window.trackingFunctions.onLoad({appId:"682302507c8e8d0011c093a6"})},
            document.head.appendChild(o)}initApollo();
          `,
        }}
      />
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${
              process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "YOUR_PIXEL_ID"
            }');
            fbq('track', 'PageView');
          `,
        }}
      />
      <body className={`${plusJakartaSans.className} ${poppins.className}`}>
        {/* <AOSinit/> */}
        <NextTopLoader color="#47b772" height={4} showSpinner={false} />
        {/* <Suspense fallback={<Loader />}>
          <AppWrapper>
            {children}
            <WhatsAppButton />
          </AppWrapper>
        </Suspense> */}

        {/* {children} */}

        <ClientEnhancer>{children}</ClientEnhancer>
        {/* Commented out these scripts as stripe (and associated code) is not required for now*/}
        {/* <Script
          dangerouslySetInnerHTML={{
            __html: `
            window.updateButtonUrls = function updateButtonUrls() {
              var buttons = document.querySelectorAll('a[href^="https://buy.stripe.com"]');
              var toltReferral = window.tolt_referral;
              var gclid = localStorage.getItem("gclid");

              if (toltReferral || gclid) {
                for (var i = 0; i < buttons.length; i++) {
                  var btn = buttons[i];
                  var urlParams = [];

                  if (toltReferral && btn.href.indexOf("client_reference_id") === -1) {
                    localStorage.setItem("toltId", toltReferral);
                    urlParams.push('client_reference_id=' + toltReferral);
                  }

                  if (gclid && btn.href.indexOf("gclid") === -1) {
                    urlParams.push('gclid=' + gclid);
                  }

                  if (urlParams.length > 0) {
                    var separator = btn.href.indexOf('?') === -1 ? '?' : '&';
                    btn.href = btn.href + separator + urlParams.join('&');
                  }
                }
              }
            };

            setTimeout(updateButtonUrls, 1000);
            setTimeout(updateButtonUrls, 1900);
            setTimeout(updateButtonUrls, 2600);
            window.addEventListener("tolt_referral_ready", function() {
              if (window.tolt_referral) {
                updateButtonUrls();
              }
            });
          `,
          }}
        /> */}

        {/* <Script async src="https://js.stripe.com/v3/pricing-table.js"></Script> */}
      </body>
      <GoogleAnalytics gaId="G-LEYYSF0TEL" />
    </html>
  );
}

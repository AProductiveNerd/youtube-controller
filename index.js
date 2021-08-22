// ==UserScript==
// @name         Remove blocked channels
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const blocked_channels = [
    "Ali Abdaal",
    "Andrew Dotson",
    "Dave2D",
    "Elizabeth Filips",
    "Answer in Progress",
    "AsapSCIENCE",
    "Jay Foreman",
    "TheOdd1sOut",
    "Beluga",
    "Ben Awad",
    "BruhmasterL",
    "CGP Grey",
    "Code Bullet",
    "Dartigan",
    "Doctor A",
    "ElectroBOOM",
    "Fireship",
    "Glarses",
    "Gloggles",
    "GrandLineReview",
    "James Hoffmann",
    "Jarvis Johnson",
    "Jarvis Johnson! GOLD",
    "Kurzgesagt – In a Nutshell",
    "Linus Tech Tips",
    "Mehditation",
    "Mrwhosetheboss",
    "Nat Baimel",
    "RDCworld1",
    "Rhymestyle",
    "ShortCircuit",
    "Steve Mould",
    "SunlessKhan",
    "TechLinked",
    "Techquickie",
    "Tom Scott",
    "Totally Not Mark",
    "Mark Rober",
    "Vir Das COMEDY",
    "Stand-up Maths",
    "Veritasium",
  ];

  const blocked_keywords = ["Minecraft", "Rocket league"];

  const redirected_url = "https://www.taskhighlights.com/app";

  setInterval(() => {
    (async () => {
      console.log("Redirect ran");

      const test = window.location.pathname.includes("/c");

      if (test) {
        const channel_name = document.querySelector(
          "ytd-channel-name.ytd-c4-tabbed-header-renderer > div:nth-child(1) > div:nth-child(1) > yt-formatted-string:nth-child(1)"
        ).innerText;

        for (let i = 0; i < blocked_channels.length; i++) {
          const blocked_name = blocked_channels[i];

          if (
            channel_name?.toString().toLowerCase() ===
            blocked_name?.toLowerCase()
          ) {
            window.location.href = redirected_url;
          }
        }
      } else {
        const channel_name = await document.querySelector(
          "ytd-video-owner-renderer.ytd-video-secondary-info-renderer > div:nth-child(2) > ytd-channel-name:nth-child(1) > div:nth-child(1) > div:nth-child(1) > yt-formatted-string:nth-child(1) > a:nth-child(1)"
        ).innerText;

        const video_title = document.querySelector(
          "yt-formatted-string.ytd-video-primary-info-renderer:nth-child(1)"
        ).innerText;

        for (let i = 0; i < blocked_keywords.length; i++) {
          if (video_title.toLowerCase().includes(blocked_keywords[i].toLowerCase())) {
            window.location.href = redirected_url;
          }
        }

        for (let i = 0; i < blocked_channels.length; i++) {
          const blocked_name = blocked_channels[i];

          if (
            channel_name?.toString().toLowerCase() ===
            blocked_name?.toLowerCase()
          ) {
            window.location.href = redirected_url;
          }
        }
      }
    })();
  }, 3000);

  setInterval(() => {
    (async () => {
      console.log("Remove videos ran");

      const suggestions = await document.getElementsByTagName(
        "ytd-channel-name"
      );

      for (let i = 0; i < blocked_channels.length; i++) {
        const blocked_name = blocked_channels[i];

        for (let i = 0; i < suggestions.length; i++) {
          const suggestion = suggestions[i];

          if (suggestion.channelName?.runs) {
            const suggested_name = await suggestion.channelName?.runs[0]?.text;

            if (
              suggested_name?.toString().toLowerCase() ===
              blocked_name.toLowerCase()
            ) {
              suggestions[
                i
              ]?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentComponent?.remove();
            }
          }
        }
      }
    })();
  }, 3000);
})();

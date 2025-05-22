const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;
app.get('/stream.m3u8', async (req, res) => {
  const url = 'http://abgpow7aaaaaaaamaaaaaaaaaaaaa.live-cf.cdn.hotstar.com/hls/live/2027118/inallow-ipl-2025/hin/1540040369/15mindvrm015e7a7fbe3250475bb01f5232fb0cec8b22may2025/master_ap_1080_5.m3u8';

  const headers = {
  "accept": "*/*",
  "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,tr;q=0.7,zh-TW;q=0.6,zh-CN;q=0.5,zh;q=0.4,hi;q=0.3",
  "cookie": "CloudFront-Key-Pair-Id=APKAJC3ILMJXG4AINKJA; CloudFront-Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovLypsaXZlLWNmLmNkbi5ob3RzdGFyLmNvbS9obHMvbGl2ZS8yMDI3MTE4L2luYWxsb3ctaXBsLTIwMjUvaGluLzE1NDAwNDAzNjkvMTVtaW5kdnJtMDE1ZTdhN2ZiZTMyNTA0NzViYjAxZjUyMzJmYjBjZWM4YjIybWF5MjAyNS8qIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzQ4MDE3Njk2fX19XX0_; CloudFront-Signature=ZWrJBvtHYyek120BwZRR7NO6oedwsZapb-VOS8B64lD~K8SyQhLwtF~dCpgoFd1HNXFafE1rY2LW0W2wj3JjdKTzg9Pn7WnpWpEnfxVzi4SF4IwFy-yLUzT45sDVfEpqnwmiTGsl9AtaSd9EZAuNcRpXvBPLE~kts3GWVGBGSaugfMZY6gLeBk-JtzEzNeeO41XvgIdPxVUHJEIcjcaaXiyJyRGwamkdYYdUh2vMmSa3~s1XldRtHZRJmiYQSNrDwOALnCnOyT34Qgx7JNtTQjyinFcr~3M4Qo7UO-VIuWZj0-xTYE-ddQ1YBljdxp6iPVq1F-fIWED-PN2HBMHqNQ__; hdntl=exp=1747933096~raf=1747931896~acl=/hls/live/2027118/inallow-ipl-2025/hin/1540040369/15mindvrm015e7a7fbe3250475bb01f5232fb0cec8b22may2025/master_ap~ttl=1800~type=paid~data=ip=fTZUBkL3dzkmYfbDIGXE3h-userid=plviETcPixEg7uDYClgQm8EeAJ1gmwZ4l9KDXyIYRYvl-did=H8L2EFPAEnxM8SWwmxn8BYowiOd83qChhM1HHcnVCe18-cc=in-de=1-pl=web-ap=25.03.06.1-ut=free-fpassv2-rd=13698-cd=702-ad=14400-ce=1747931296-~hmac=037951360c47f540d8f2a59a1a53a73621e05453036947a1ca854c1f65b160b0; _gcl_au=1.1.1537666693.1743871299; _fbp=fb.1.1743871299591.943560287858811951; _gid=GA1.2.1122733730.1747931274; _gat_UA-53733575-1=1; _ga=GA1.1.1860060758.1743871299; _uetsid=b62cba20372911f0b22bb51d8f9cdf2c; _uetvid=d96fbe80123c11f096b4836449edb108; _ga_VJTFGHZ5NH=GS2.2.s1747931274$o6$g0$t1747931274$j60$l0$h0$dmREe4AnPbN7YOq7sTWuXhsh1V53G-kV5rw; _ga_QV5FD29XJC=GS2.1.s1747931273$o8$g1$t1747931285$j48$l0$h0$d53UX3SnkbCPR2qtb1NuAhmRWGuKYuSdjiQ; _ga_EPJ8DYH89Z=GS2.1.s1747931273$o8$g1$t1747931285$j48$l0$h0$dOYqGgcF5BnXn8HPs-WYGyFwVxe4j6fWUtA; _ga_2PV8LWETCX=GS2.1.s1747931273$o8$g1$t1747931285$j48$l0$h0$d73m4M12DdGjuuw3O3Yrxjn40XymhtyyW4g",
  "dnt": "1",
  "origin": "https://www.hotstar.com",
  "priority": "u=1, i",
  "referer": "https://www.hotstar.com/",
  "sec-ch-ua": "\"Chromium\";v=\"136\", \"Google Chrome\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": "\"Windows\"",
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-site",
  "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
};

try {

    const response = await axios.get(url, { headers });

    const m3u8Content = response.data;

const modifiedContent = m3u8Content.replace(
  /^(.+\.(ts|m4s|mp4))$/gm,
  (match) => `/segment?id=${encodeURIComponent(match)}`
);

    res.set('Content-Type', 'application/vnd.apple.mpegurl');
    res.send(modifiedContent);
  } catch (error) {
    console.error('Error fetching stream:', error.message);
    res.status(500).send('Error fetching stream');
  }
});

app.get('/segment', async (req, res) => {

  const segmentPath = req.query.id; 

  const fullSegmentUrl = `
http://abgpow7aaaaaaaamaaaaaaaaaaaaa.live-cf.cdn.hotstar.com/hls/live/2027118/inallow-ipl-2025/hin/1540040369/15mindvrm015e7a7fbe3250475bb01f5232fb0cec8b22may2025/${segmentPath}`;

console.log(fullSegmentUrl);

  const headers = {
  "accept": "*/*",
  "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,tr;q=0.7,zh-TW;q=0.6,zh-CN;q=0.5,zh;q=0.4,hi;q=0.3",
  "cookie": "CloudFront-Key-Pair-Id=APKAJC3ILMJXG4AINKJA; CloudFront-Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovLypsaXZlLWNmLmNkbi5ob3RzdGFyLmNvbS9obHMvbGl2ZS8yMDI3MTE4L2luYWxsb3ctaXBsLTIwMjUvaGluLzE1NDAwNDAzNjkvMTVtaW5kdnJtMDE1ZTdhN2ZiZTMyNTA0NzViYjAxZjUyMzJmYjBjZWM4YjIybWF5MjAyNS8qIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzQ4MDE3Njk2fX19XX0_; CloudFront-Signature=ZWrJBvtHYyek120BwZRR7NO6oedwsZapb-VOS8B64lD~K8SyQhLwtF~dCpgoFd1HNXFafE1rY2LW0W2wj3JjdKTzg9Pn7WnpWpEnfxVzi4SF4IwFy-yLUzT45sDVfEpqnwmiTGsl9AtaSd9EZAuNcRpXvBPLE~kts3GWVGBGSaugfMZY6gLeBk-JtzEzNeeO41XvgIdPxVUHJEIcjcaaXiyJyRGwamkdYYdUh2vMmSa3~s1XldRtHZRJmiYQSNrDwOALnCnOyT34Qgx7JNtTQjyinFcr~3M4Qo7UO-VIuWZj0-xTYE-ddQ1YBljdxp6iPVq1F-fIWED-PN2HBMHqNQ__; hdntl=exp=1747933096~raf=1747931896~acl=/hls/live/2027118/inallow-ipl-2025/hin/1540040369/15mindvrm015e7a7fbe3250475bb01f5232fb0cec8b22may2025/master_ap~ttl=1800~type=paid~data=ip=fTZUBkL3dzkmYfbDIGXE3h-userid=plviETcPixEg7uDYClgQm8EeAJ1gmwZ4l9KDXyIYRYvl-did=H8L2EFPAEnxM8SWwmxn8BYowiOd83qChhM1HHcnVCe18-cc=in-de=1-pl=web-ap=25.03.06.1-ut=free-fpassv2-rd=13698-cd=702-ad=14400-ce=1747931296-~hmac=037951360c47f540d8f2a59a1a53a73621e05453036947a1ca854c1f65b160b0; _gcl_au=1.1.1537666693.1743871299; _fbp=fb.1.1743871299591.943560287858811951; _gid=GA1.2.1122733730.1747931274; _gat_UA-53733575-1=1; _ga=GA1.1.1860060758.1743871299; _uetsid=b62cba20372911f0b22bb51d8f9cdf2c; _uetvid=d96fbe80123c11f096b4836449edb108; _ga_VJTFGHZ5NH=GS2.2.s1747931274$o6$g0$t1747931274$j60$l0$h0$dmREe4AnPbN7YOq7sTWuXhsh1V53G-kV5rw; _ga_QV5FD29XJC=GS2.1.s1747931273$o8$g1$t1747931285$j48$l0$h0$d53UX3SnkbCPR2qtb1NuAhmRWGuKYuSdjiQ; _ga_EPJ8DYH89Z=GS2.1.s1747931273$o8$g1$t1747931285$j48$l0$h0$dOYqGgcF5BnXn8HPs-WYGyFwVxe4j6fWUtA; _ga_2PV8LWETCX=GS2.1.s1747931273$o8$g1$t1747931285$j48$l0$h0$d73m4M12DdGjuuw3O3Yrxjn40XymhtyyW4g",
  "dnt": "1",
  "origin": "https://www.hotstar.com",
  "priority": "u=1, i",
  "referer": "https://www.hotstar.com/",
  "sec-ch-ua": "\"Chromium\";v=\"136\", \"Google Chrome\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": "\"Windows\"",
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-site",
  "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
};

  try {
    const segmentResponse = await axios.get(fullSegmentUrl, {
      headers,
      responseType : 'stream',
    });

    res.set(segmentResponse.headers);
    segmentResponse.data.pipe(res);
  } catch (err) {
    console.error('Error fetching segment:', err.message);
    res.status(500).send('Failed to fetch segment');
  }
});


app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>HLS Stream Player</title>
      <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
      <style>
        body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #000;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
}

video {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  border: 2px solid #000;
  object-fit: contain; /* or 'cover' for edge-to-edge */
}
      </style>
    </head>
    <body>
      <video id="video" controls autoplay></video>
      <script>
        const video = document.getElementById('video');
        const streamUrl = '/stream.m3u8';

        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(streamUrl);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
          });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = streamUrl;
          video.addEventListener('loadedmetadata', function () {
            video.play();
          });
        } else {
          alert("HLS not supported in this browser.");
        }
      </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
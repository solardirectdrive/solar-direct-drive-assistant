import { NextResponse } from "next/server";

const AGENT_ID = "_6SeVMWHF1AsnLo2R-8HK";
const CHATBASE = "https://chatbase.co";

async function proxy(request, context) {
  const params = await context.params;
  const pathParts = params?.path || [];
  const pathname = "/" + pathParts.join("/");

  let targetPath;

  if (pathname === "/") {
    targetPath = `/${AGENT_ID}/help`;
  } else if (pathname === "/help") {
    targetPath = `/${AGENT_ID}/help`;
  } else if (pathname.startsWith("/help/")) {
    targetPath = `/${AGENT_ID}${pathname}`;
  } else {
    targetPath = pathname;
  }

  const incomingUrl = new URL(request.url);
  const targetUrl = new URL(targetPath, CHATBASE);

  targetUrl.search = incomingUrl.search;

  const headers = new Headers(request.headers);

  headers.delete("host");
  headers.delete("content-length");

  const options = {
    method: request.method,
    headers,
    redirect: "manual"
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    options.body = await request.arrayBuffer();
  }

  const response = await fetch(targetUrl, options);

  const responseHeaders = new Headers(response.headers);

  const location = responseHeaders.get("location");

  if (location) {
    const currentOrigin = incomingUrl.origin;

    const rewrittenLocation = location
      .replace(
        `https://chatbase.co/${AGENT_ID}/help`,
        currentOrigin
      )
      .replace(
        `https://www.chatbase.co/${AGENT_ID}/help`,
        currentOrigin
      );

    responseHeaders.set("location", rewrittenLocation);
  }

  const setCookie = responseHeaders.get("set-cookie");

  if (setCookie) {
    responseHeaders.set(
      "set-cookie",
      setCookie
        .replace(/Domain=\.?chatbase\.co;?/gi, "")
        .replace(/Domain=\.?www\.chatbase\.co;?/gi, "")
    );
  }

  return new NextResponse(response.body, {
    status: response.status,
    headers: responseHeaders
  });
}

export async function GET(request, context) {
  return proxy(request, context);
}

export async function POST(request, context) {
  return proxy(request, context);
}

export async function PUT(request, context) {
  return proxy(request, context);
}

export async function PATCH(request, context) {
  return proxy(request, context);
}

export async function DELETE(request, context) {
  return proxy(request, context);
}

export async function OPTIONS(request, context) {
  return proxy(request, context);
}

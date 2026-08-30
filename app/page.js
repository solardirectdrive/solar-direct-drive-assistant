export default function Home() {
  return (
    <main
      style={{
        margin: 0,
        width: "100vw",
        height: "100dvh",
        overflow: "hidden",
        background: "#000",
      }}
    >
      <iframe
        src="YOUR_CHATBASE_IFRAME_URL"
        title="Solar Direct Drive Assistant"
        style={{
          width: "100%",
          height: "100%",
          border: "0",
          display: "block",
        }}
        allow="microphone"
      />
    </main>
  );
}

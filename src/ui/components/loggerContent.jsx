function getComponent(log) {
  // display for logs with only message
  if (log.message) {
    return (
      <>
        <div className="mx-2">{log.timestamp}</div>
        <div>{log.message}</div>
      </>
    );
  }

  // display for redirect logs
  if (log.type === "redirect") {
    // if its a child log
    if (String(log.id).includes("child")) {
      if (log.location && log.location === "FAQ") {
        return (
          <>
            <div className="mx-2">{log.timestamp}</div>
            <div>Player opened a portal to the wiki FAQ page</div>
          </>
        );
      }
      return (
        <>
          <div className="mx-2">{log.timestamp}</div>
          <div>Player opened another portal to the same location</div>
        </>
      );
    }

    // redirect: wiki
    if (log.location === "wiki") {
      if (log.tab && log.tab === "FAQ") {
        return (
          <>
            <div className="mx-2">{log.timestamp}</div>
            <div>Player opened a portal to the wiki FAQ page</div>
          </>
        );
      }

      return (
        <>
          <div className="mx-2">{log.timestamp}</div>
          <div>Player opened a portal to the wiki page</div>
        </>
      );
    }

    // redirect: wordpress
    if (log.location === "wordpress") {
      return (
        <>
          <div className="mx-2">{log.timestamp}</div>
          <div>
            Player opened a portal to the MozKa's Definitive Mousehunt Guide
          </div>
        </>
      );
    }

    // redirect: youtube
    if (log.location === "youtube") {
      return (
        <>
          <div className="mx-2">{log.timestamp}</div>
          <div>Player opened a portal to Mousehunt's youtube page</div>
        </>
      );
    }

    // redirect: merchandise
    if (log.location === "merchandise") {
      return (
        <>
          <div className="mx-2">{log.timestamp}</div>
          <div>Player opened a portal to Mousehunt's merchandise page</div>
        </>
      );
    }

    // redirect: facebook
    if (log.location === "facebook") {
      return (
        <>
          <div className="mx-2">{log.timestamp}</div>
          <div>Player opened a portal to Mousehunt's facebook page</div>
        </>
      );
    }

    // others
    return (
      <>
        <div className="mx-2">{log.timestamp}</div>
        <div>Player opened a portal to some unknown realm</div>
      </>
    );
  }

  // display for logs with location and subloc
  if (log.location && log.subloc) {
    return (
      <>
        <div className="mx-2">{log.timestamp}</div>
        <div>
          Player is looking at {log.subloc} in {log.location}
        </div>
      </>
    );
  }

  // default case
  return (
    <>
      <div className="mx-2">{log.timestamp}</div>
      <div>Player navigated to {log.location}</div>
    </>
  );
}

export default function LoggerContent({ log }) {
  const displayComponent = getComponent(log);
  return displayComponent;
}

import LoggerCard from "@/components/loggerCard";
import { Accordion } from "@/components/ui/accordion";
import { useEffect, useState } from "react";

const SAMPLE_LOGS = [
  {
    id: 1,
    timestamp: new Date().toLocaleTimeString(),
    message: "Client connected",
    location: "system",
    type: "system",
  },
];

export default function LoggerPage() {
  const [logs, setLogs] = useState(SAMPLE_LOGS);
  useEffect(() => {
    // Listening for the 'logEvent' channel event
    window.electron.receive("logEvent", (log) => {
      const lastLog = logs[0];

      // Check if previous log has the same location
      if (lastLog && lastLog.location === log.location) {
        // check if have children
        if (lastLog.children) {
          // if have children, check if last child has the same location
          if (
            lastLog.children[lastLog.children.length - 1].location === log.tab
          ) {
            // check if child has children, initialise if undefined
            if (!lastLog.children[lastLog.children.length - 1].children) {
              lastLog.children[lastLog.children.length - 1].children = [];
            }
            // add subtab as child of last children
            const grandchild = {
              id:
                "grandchild" +
                lastLog.children[lastLog.children.length - 1].children.length,
              timestamp: log.timestamp,
              location: log.subtab,
            };

            const updatedLastLog = {
              ...lastLog,
              children: [
                ...lastLog.children.slice(0, -1),
                {
                  ...lastLog.children[lastLog.children.length - 1],
                  children: [
                    ...lastLog.children[lastLog.children.length - 1].children,
                    grandchild,
                  ],
                },
              ],
            };

            setLogs((prevLogs) => {
              const updatedLogs = [...prevLogs];
              updatedLogs[0] = updatedLastLog; // Update the last log
              return updatedLogs;
            });
            return;
          }
        }

        // initialise children array since it is undefined
        if (!lastLog.children) {
          lastLog.children = [];
        }
        // If so, add tab as child of the previous log
        const child = {
          id: "child" + lastLog.children.length,
          timestamp: log.timestamp,
          location: log.tab,
        };

        // Add child to the previous log (make sure to not mutate state)
        const updatedLastLog = {
          ...lastLog,
          children: [...lastLog.children, child],
        };

        // Update the logs with the new last log
        setLogs((prevLogs) => {
          const updatedLogs = [...prevLogs];
          updatedLogs[0] = updatedLastLog; // Update the last log
          return updatedLogs;
        });
      } else {
        // Otherwise, add a new log
        const newLog = {
          id: logs.length + 1,
          timestamp: log.timestamp,
          type: log.type,
          location: log.location,
        };
        setLogs((prevLogs) => [newLog, ...prevLogs]);
      }
    });
  }, [logs]);
  return (
    <>
      <button onClick={() => console.log(logs)}>logs</button>
      <button onClick={() => console.log(logs[logs.length - 1])}>
        lastLogs
      </button>
      <div className="flex flex-col items-start justify-items-start h-screen w-screen">
        <div className="m-2">Activity Logger</div>
        <div>
          <Accordion type="multiple" className="w-[800px] rounded-none">
            {logs.map((log, idx) => (
              <LoggerCard key={idx} log={log} />
            ))}
          </Accordion>
        </div>
      </div>
    </>
  );
}

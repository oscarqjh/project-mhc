import { AccordionItem } from "@radix-ui/react-accordion";
import { AccordionContent, AccordionTrigger } from "./ui/accordion";
import { cn } from "@/lib/utils";
import "./loggerCard.css";

export default function LoggerCard({ log, level = 0, islast = false }) {
  return (
    <>
      <AccordionItem
        value={log.id}
        className={cn(
          "rounded-none hover:border-transparent",
          !log.children && "notclickable"
        )}
        disabled={!log.children}
      >
        <AccordionTrigger havechild={log.children}>
          <div className="flex items-start justify-items-start">
            {level !== 0 && (
              <>
                {Array.from({ length: level }, (_, index) => (
                  <div key={index} className="w-[15px]"></div>
                ))}
                {!islast ? <div>┡</div> : <div>┗</div>}
              </>
            )}
            {log.message ? (
              <>
                <div className="mx-2">{log.timestamp}</div>
                <div>{log.message}</div>
              </>
            ) : (
              <>
                <div className="mx-2">{log.timestamp}</div>
                <div>Player navigated to {log.location}</div>
              </>
            )}
          </div>
        </AccordionTrigger>

        {log.children && (
          <AccordionContent>
            {log.children.map((child, idx) => {
              const isLast = idx === log.children.length - 1;
              return (
                <LoggerCard
                  key={idx}
                  log={child}
                  level={level + 1}
                  islast={isLast}
                />
              );
            })}
          </AccordionContent>
        )}
      </AccordionItem>
    </>
  );
}

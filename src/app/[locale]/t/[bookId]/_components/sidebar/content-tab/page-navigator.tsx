"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useReaderVirtuoso } from "../../context";

export default function PageNavigator({
  popover = true,
  range,
}: {
  popover?: boolean;
  range: { start: number; end: number };
}) {
  const virtuosoRef = useReaderVirtuoso();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const pageNumber = Number(
      (e.currentTarget.elements.namedItem("pageNumber") as HTMLInputElement)
        .value,
    );

    if (pageNumber < range.start || pageNumber > range.end) {
      // TODO: show an error message
      return;
    }

    virtuosoRef.current?.scrollToIndex({
      // since range.start is our 0 index, we need to subtract it from the page number
      index: pageNumber - range.start,
      align: "center",
    });
  };

  const Content = (
    <>
      <h4 className="font-medium leading-none">Jump to page</h4>
      <p className="mt-2 text-sm text-muted-foreground">
        Enter a page number between {range.start} - {range.end}
      </p>

      <div className="mt-4 grid gap-2">
        <form
          className="grid grid-cols-3 items-center gap-2"
          onSubmit={handleSubmit}
        >
          <Input
            id="pageNumber"
            name="pageNumber"
            type="number"
            placeholder="Page number"
            className="col-span-2 h-9"
          />

          <Button>Go</Button>
        </form>
      </div>
    </>
  );

  if (!popover) {
    return Content;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 font-normal text-primary hover:text-primary"
        >
          Page Navigator
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 max-w-full py-5">
        {Content}
      </PopoverContent>
    </Popover>
  );
}

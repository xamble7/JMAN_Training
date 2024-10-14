import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "lucide-react";
import { Input } from "postcss";
import { Form } from "react-hook-form";

const Loading = () => {
  return (
    <>
      <Skeleton>
        <Skeleton className="w-full p-2 relative flex flex-col gap-y-4">
          <Skeleton>
            <Skeleton>
              <Skeleton />
              <Skeleton>
                <Skeleton />
              </Skeleton>
              <Skeleton />
            </Skeleton>
          </Skeleton>
          <Skeleton>
            <Skeleton>
              <Skeleton />
              <Skeleton>
                <Skeleton />
              </Skeleton>
              <Skeleton />
            </Skeleton>
          </Skeleton>
          <Skeleton />
        </Skeleton>
      </Skeleton>
      <Skeleton />
    </>
  );
};

export default Loading;

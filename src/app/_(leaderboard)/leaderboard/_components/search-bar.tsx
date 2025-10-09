import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast/useToast";
import { useRouter } from "next/navigation";

interface LeaderboardSearchProps {
  boardData: {
    name: string;
    nim: string;
    score: string;
  }[];
}

const searchSchema = z.object({
  nim: z.string({ required_error: "Name is required" }),
});

const LeaderboardSearch: React.FC<LeaderboardSearchProps> = ({ boardData }) => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
  });

  function onSubmit(data: z.infer<typeof searchSchema>) {
    if (boardData.some((item) => item.nim === data.nim) === false) {
      toast({
        title: "NIM tidak ditemukan",
        description: `${data.nim} tidak ditemukan`,
      });
      return;
    }
    router.push(
      `/leaderboard/#${
        boardData.findIndex((item) => item.nim === data.nim) + 1
      }`
    );
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-2 xs:w-96 flex-shrink"
      >
        <FormField
          control={form.control}
          name="nim"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Cari NIM"
                  {...field}
                  className="bg-background/50 backdrop-blur-md"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Jump</Button>
      </form>
    </Form>
  );
};

export default LeaderboardSearch;

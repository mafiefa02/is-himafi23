"use client";
import { motion } from "framer-motion";
import { Link2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import mockup from "./mockup.json";
import LeaderboardSearch from "./search-bar";

export default function ThirdLeaderboard() {
  const { data } = useSession();
  const profileboard = mockup.thirdPhase; // ini ntar diganti pake data dari database
  const sortedProfileboard = profileboard.sort((a, b) => b.score - a.score);
  const userRank =
    sortedProfileboard.findIndex((profile) => profile.nim === data?.user.nim) +
    1;

  return (
    <div>
      <div className="flex flex-col xs:flex-row xs:justify-between items-center xs:gap-4">
        {/* <LeaderboardSearch boardData={sortedProfileboard} /> */}
        <div className="my-4 font-semibold text-end text-sm md:text-xl flex gap-2 justify-end items-center flex-none">
          <p>Current rank: </p>

          {userRank ? (
            <HoverCard>
              <HoverCardTrigger>
                <Link href={`#${userRank}`}>
                  <Badge
                    className={cn(
                      "text-sm",
                      userRank === 1 &&
                        "bg-amber-300 text-black hover:bg-amber-400",
                      userRank === 2 &&
                        "bg-slate-300 text-black hover:bg-slate-400",
                      userRank === 3 &&
                        "bg-yellow-700 text-black hover:bg-yellow-800"
                    )}
                  >
                    {`#${userRank}`}
                  </Badge>
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="flex w-40 text-center">
                <p className="text-xs">Klik untuk melihat posisi mu</p>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <p>Unranked</p>
          )}
        </div>
      </div>

      {sortedProfileboard.map((profile, index) => (
        <motion.div
          id={`${index + 2}`}
          key={profile.userId}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0, 0.71, 0.2, 1.01],
            delay: index * 0.1,
          }}
        >
          <HoverCard>
            <HoverCardTrigger>
              <Link href={`/profile/${profile.nim}`}>
                <Card
                  className={cn(
                    "mt-2 bg-black/40 backdrop-blur-md hover:bg-slate-950/60",
                    index === 0 && "bg-gradient-to-l from-amber-300/10",
                    index === 1 && "bg-gradient-to-l from-slate-300/10",
                    index === 2 && "bg-gradient-to-l from-yellow-700/10 mb-4"
                  )}
                >
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div className="w-4/5 md:w-max grid lg:flex gap-4 items-center">
                        <Avatar className="w-8 h-8 hidden lg:flex">
                          <AvatarImage
                            src={
                              profile?.image ??
                              "https://uploadthing.com/f/6d7f1d22-cf67-4159-a73e-48d18741a9c7_profile.png"
                            }
                          />
                          <AvatarFallback>
                            {profile?.name?.[0] ?? "?"}
                          </AvatarFallback>
                        </Avatar>

                        <p
                          className={cn(
                            data?.user.nim === profile.nim
                              ? "text-accent"
                              : null,
                            index < 3
                              ? "text-sm md:text-lg font-bold"
                              : "text-sm md:text-base font-semibold"
                          )}
                        >
                          {profile.name}
                        </p>

                        <div className="flex gap-2">
                          <p className="text-foreground/40 text-xs md:text-base">{`@${profile.nim}`}</p>
                          <div className="md:hidden flex gap-3 items-center justify-end">
                            <p className="text-xs">Total Nilai:</p>
                            <p className="-ml-2 text-accent text-xs">
                              {profile.score}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row gap-4 items-end md:items-center">
                        <div className="hidden md:flex gap-4 items-end justify-end">
                          <p className="text-sm">Total Nilai:</p>
                          <p className="-ml-2 text-accent text-sm">
                            {profile.score}
                          </p>
                        </div>

                        <Badge
                          className={cn(
                            index === 0 &&
                              "bg-amber-300 text-black hover:bg-amber-400 text-lg",
                            index === 1 &&
                              "bg-slate-300 text-black hover:bg-slate-400 text-lg",
                            index === 2 &&
                              "bg-yellow-700 text-black hover:bg-yellow-800 text-lg"
                          )}
                        >
                          {`#${index + 1}`}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            </HoverCardTrigger>
            <HoverCardContent className="flex w-80 flex-auto">
              <div className="flex justify-between text-start space-x-4">
                <Avatar>
                  <AvatarImage
                    className="bg-cover"
                    src={
                      profile?.image ??
                      "https://uploadthing.com/f/6d7f1d22-cf67-4159-a73e-48d18741a9c7_profile.png"
                    }
                  />
                  <AvatarFallback>{profile?.name?.[0] ?? "?"}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">{profile.name}</h4>
                  <p className="text-sm">{profile.nim}</p>
                  <Separator className="my-2" />
                  <div className="flex items-center pt-2">
                    <Link2 className="w-4 h-4 mr-2" />
                    <span className="text-xs text-muted-foreground">
                      Klik untuk melihat profil
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </motion.div>
      ))}
    </div>
  );
}

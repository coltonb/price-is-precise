import Pusher from "pusher-js";

export function getPusherClient() {
  if (!process.env.pusherKey || !process.env.pusherCluster) {
    throw new Error("Pusher configured incorrectly.");
  }

  return new Pusher(process.env.pusherKey, {
    cluster: process.env.pusherCluster,
  });
}

export const QUERY_KEYS = {
  profile: {
    all: ["profile"],
    list: ["profile", "list"],
    byId: (userId: string) => ["profile", "byId", userId],
  },
  routine: {
    all: ["routine"],
    list: ["routine", "list"],
    userList: (userId: string) => ["routine", "userList", userId],
    byId: (postId: number) => ["routine", "byId", postId],
  },
  comment: {
    all: ["comment"],
    post: (postId: number) => ["comment", "post", postId],
  },
};

export const BUCKET_NAME = "uploads";

export type AppUser = {
  email: string;
  password: string;
  role: "admin" | "user";
};

const users: AppUser[] = [
  {
    email: "admin@example.com",
    password:
      "$2b$10$FmGnD/K.7egV1FmtCqZfE.I3w4isVH0ZQ7I6bFAaEyjeIPJe58un6",
    role: "admin",
  },
  {
    email: "user@example.com",
    password:
      "$2b$10$FmGnD/K.7egV1FmtCqZfE.I3w4isVH0ZQ7I6bFAaEyjeIPJe58un6",
    role: "user",
  },
  {
    email: "reader@example.com",
    password:
      "$2b$10$FmGnD/K.7egV1FmtCqZfE.I3w4isVH0ZQ7I6bFAaEyjeIPJe58un6",
    role: "user",
  },
  {
    email: "mayasaid225@gmail.com",
    password:
      "$2b$10$FmGnD/K.7egV1FmtCqZfE.I3w4isVH0ZQ7I6bFAaEyjeIPJe58un6",
    role: "admin",
  },
  {
    email: "tarekalmerhabi@gmail.com",
    password:
      "$2b$10$ub4u7zIP4mU4/wItbBbpuufzvzuEdUEaew//2uXbnl9KFJokPxRNO",
    role: "user",
  },
];

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function findUserByEmail(email: string) {
  const normalizedEmail = normalizeEmail(email);

  return users.find((user) => user.email === normalizedEmail);
}

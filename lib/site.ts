export const site = {
  name: "Yogesh Joshi",
  title: "Yogesh Joshi — Senior AI & Software Engineer",
  shortTitle: "DevYogesh",
  description:
    "Senior AI & Software Engineer building production-grade software, AI systems, intelligent automation, and scalable platforms.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://devyogesh.com") as string,
  email: "joshiyogesh0333@gmail.com",
  location: "Surat, Gujarat, India",
  socials: {
    github: "https://github.com/yogesh-joshi-0333",
    linkedin: "https://www.linkedin.com/in/yogesh-joshi-web-developer/",
    instagram: "https://www.instagram.com/yogesh_joshi_0333/",
  },
  githubUser: "yogesh-joshi-0333",
} as const;

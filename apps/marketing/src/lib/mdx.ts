import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const contentDirectory = path.join(process.cwd(), "content");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author?: string;
  image?: string;
  tags?: string[];
  content: string;
  readingTime: string;
}

export interface Page {
  slug: string;
  title: string;
  description?: string;
  content: string;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const blogDirectory = path.join(contentDirectory, "blog");

  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        author: data.author,
        image: data.image,
        tags: data.tags,
        content,
        readingTime: readingTime(content).text,
      } as BlogPost;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const blogDirectory = path.join(contentDirectory, "blog");
  const fullPath = path.join(blogDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    author: data.author,
    image: data.image,
    tags: data.tags,
    content,
    readingTime: readingTime(content).text,
  } as BlogPost;
}

export async function getPage(slug: string): Promise<Page | null> {
  const pagesDirectory = path.join(contentDirectory, "pages");
  const fullPath = path.join(pagesDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    description: data.description,
    content,
  } as Page;
}

export async function getAllPageSlugs(): Promise<string[]> {
  const pagesDirectory = path.join(contentDirectory, "pages");
  if (!fs.existsSync(pagesDirectory)) return [];
  return fs
    .readdirSync(pagesDirectory)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

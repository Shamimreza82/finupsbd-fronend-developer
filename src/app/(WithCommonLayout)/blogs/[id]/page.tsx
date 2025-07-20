import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// This would typically come from a database or CMS
const getBlogPost = (id: string) => {
  const posts = [
    {
      id: "1",
      title: "Understanding Your Credit Score: A Complete Guide for Beginners",
      content: `
        <p>Your credit score is one of the most important financial metrics that affects your ability to secure loans, credit cards, and even housing. Understanding how it works is crucial for your financial health.</p>
        
        <h2>What is a Credit Score?</h2>
        <p>A credit score is a three-digit number that represents your creditworthiness. It typically ranges from 300 to 850, with higher scores indicating better credit health.</p>
        
        <h2>Factors That Affect Your Credit Score</h2>
        <ul>
          <li><strong>Payment History (35%):</strong> Your track record of making payments on time</li>
          <li><strong>Credit Utilization (30%):</strong> How much of your available credit you're using</li>
          <li><strong>Length of Credit History (15%):</strong> How long you've had credit accounts</li>
          <li><strong>Credit Mix (10%):</strong> The variety of credit accounts you have</li>
          <li><strong>New Credit (10%):</strong> Recent credit inquiries and new accounts</li>
        </ul>
        
        <h2>How to Improve Your Credit Score</h2>
        <p>Improving your credit score takes time and consistent effort. Here are some proven strategies:</p>
        <ol>
          <li>Pay all bills on time, every time</li>
          <li>Keep credit utilization below 30%</li>
          <li>Don't close old credit cards</li>
          <li>Monitor your credit report regularly</li>
          <li>Consider becoming an authorized user</li>
        </ol>
      `,
      category: "Credit Score",
      date: "25 Jan 2024",
      image: "/placeholder.svg?height=400&width=800",
      author: "Financial Expert Team",
    },
  ]

  return posts.find((post) => post.id === id)
}


export default async function BlogPost(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params

  console.log(id)

  const post = getBlogPost(id)

  console.log(post)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>

        <article className="prose prose-lg max-w-none">
          <div className="mb-8">
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <span className="bg-gray-100 px-3 py-1 rounded-full">{post.category}</span>
              <span>{post.date}</span>
              <span>By {post.author}</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-64 object-cover rounded-lg mb-8"
            />
          </div>

          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </div>
    </div>
  )
}

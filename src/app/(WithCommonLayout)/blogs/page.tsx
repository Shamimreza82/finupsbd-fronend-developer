"use client"

import { useState } from "react"
import { Search, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

const blogPosts = [
  {
    id: 1,
    title: "Understanding Your Credit Score: A Complete Guide for Beginners",
    excerpt:
      "Learn how your credit score is calculated, why it matters, and practical tips to improve it for better financial health.",
    category: "Credit Score",
    date: "25 Jan 2024",
    image: "/placeholder.svg?height=200&width=300",
    readMoreText: "Read More",
  },
  {
    id: 2,
    title: "Top 5 Credit Cards for Rewards in Bangladesh [2024 Edition]",
    excerpt:
      "Learn how your credit score is calculated, why it matters, and practical tips to improve it for better financial health.",
    category: "Without Categories",
    date: "24 Jan 2024",
    image: "/placeholder.svg?height=200&width=300",
    readMoreText: "Explore Now",
  },
  {
    id: 3,
    title: "How to Choose the Right Personal Loan for Your Needs",
    excerpt:
      "Learn how your credit score is calculated, why it matters, and practical tips to improve it for better financial health.",
    category: "Loans",
    date: "23 Jan 2024",
    image: "/placeholder.svg?height=200&width=300",
    readMoreText: "Learn More",
  },
  {
    id: 4,
    title: "Understanding Your Credit Score: A Complete Guide for Beginners",
    excerpt:
      "Learn how your credit score is calculated, why it matters, and practical tips to improve it for better financial health.",
    category: "Credit Score",
    date: "25 Jan 2024",
    image: "/placeholder.svg?height=200&width=300",
    readMoreText: "Read More",
  },
  {
    id: 5,
    title: "Top 5 Credit Cards for Rewards in Bangladesh [2024 Edition]",
    excerpt:
      "Learn how your credit score is calculated, why it matters, and practical tips to improve it for better financial health.",
    category: "Without Categories",
    date: "24 Jan 2024",
    image: "/placeholder.svg?height=200&width=300",
    readMoreText: "Explore Now",
  },
  {
    id: 6,
    title: "How to Choose the Right Personal Loan for Your Needs",
    excerpt:
      "Learn how your credit score is calculated, why it matters, and practical tips to improve it for better financial health.",
    category: "Loans",
    date: "23 Jan 2024",
    image: "/placeholder.svg?height=200&width=300",
    readMoreText: "Learn More",
  },
  {
    id: 7,
    title: "Understanding Your Credit Score: A Complete Guide for Beginners",
    excerpt:
      "Learn how your credit score is calculated, why it matters, and practical tips to improve it for better financial health.",
    category: "Credit Score",
    date: "25 Jan 2024",
    image: "/placeholder.svg?height=200&width=300",
    readMoreText: "Read More",
  },
  {
    id: 8,
    title: "Top 5 Credit Cards for Rewards in Bangladesh [2024 Edition]",
    excerpt:
      "Learn how your credit score is calculated, why it matters, and practical tips to improve it for better financial health.",
    category: "Without Categories",
    date: "24 Jan 2024",
    image: "/placeholder.svg?height=200&width=300",
    readMoreText: "Explore Now",
  },
  {
    id: 9,
    title: "How to Choose the Right Personal Loan for Your Needs",
    excerpt:
      "Learn how your credit score is calculated, why it matters, and practical tips to improve it for better financial health.",
    category: "Loans",
    date: "23 Jan 2024",
    image: "/placeholder.svg?height=200&width=300",
    readMoreText: "Learn More",
  },
]

const categories = ["View all", "Last", "Credit card", "Credit score", "Customer Success"]
const sortOptions = ["Most recent", "Oldest first", "Most popular", "Alphabetical"]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("View all")
  const [sortBy, setSortBy] = useState("Most recent")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      activeCategory === "View all" || post.category.toLowerCase().includes(activeCategory.toLowerCase())
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-600 mb-2">Our blog</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">The latest writings from our team</h1>
          <p className="text-gray-600 mb-8">The latest industry news, interviews, technologies, and resources.</p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filter Tabs and Sort Dropdown */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "ghost"}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                {sortBy}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {sortOptions.map((option) => (
                <DropdownMenuItem key={option} onClick={() => setSortBy(option)} className="cursor-pointer">
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="text-xs font-medium">
                    {post.category}
                  </Badge>
                  <span className="text-xs text-gray-500">{post.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                <Link
                  href={`/blogs/${post.id}`}
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {post.readMoreText}
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results Message */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blog posts found matching your criteria.</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setActiveCategory("View all")
              }}
              variant="outline"
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

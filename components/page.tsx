'use client'

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Menu } from "lucide-react"

export function BlockPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <span className="font-bold text-xl flex items-center">
            <span className="text-primary">Tinta™</span>
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Product
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Templates
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Blog
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Pricing
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="sm">
            Sign in
          </Button>
          <Button size="sm">Start Free</Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    The Ultimate Digital <span className="text-blue-600">Journal</span>
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Write, draw and immortalize the things during your day-to-day life with the world's best-loved digital
                    journal.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg">Get yours now!</Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    alt="Hero Image"
                    className="relative"
                    height="400"
                    src="/placeholder.svg"
                    width="400"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-2">
                    <Image alt="Feature 1" height="100" src="/placeholder.svg" width="100" />
                    <h3 className="text-xl font-bold">Clear your tangled mind</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Access hundreds of brushes, shapes, and fonts to scribble your idea
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-2">
                    <Image alt="Feature 2" height="100" src="/placeholder.svg" width="100" />
                    <h3 className="text-xl font-bold">Write down your thoughts</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Note down, shape, & share your ideas with the world's best loved digital paper
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-2">
                    <Image alt="Feature 3" height="100" src="/placeholder.svg" width="100" />
                    <h3 className="text-xl font-bold">The choice is yours</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Customize your paper to create gorgeous page that you want
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">New! ✨</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Sync with your other devices</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Whether you're in the office, in the classroom, or at the grocery store, the latest versions of your
                    digital notes are only one tap away.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button variant="outline">Learn more</Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    alt="Sync Feature"
                    className="relative"
                    height="400"
                    src="/placeholder.svg"
                    width="400"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Tinta is Free for Students</h2>
                <p className="max-w-[900px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get started with Tinta today and experience the future of digital journaling.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="bg-white text-blue-600 hover:bg-gray-100" size="lg">
                  Try Free Now
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Tinta. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
"use client"

import { Card, CardContent } from "@/components/ui/card"

export function BalanceCardSkeleton() {
  return (
    <Card className="shadow-lg border-0 animate-pulse">
      <CardContent className="p-6">
        <div className="h-4 w-20 bg-muted rounded mb-2" />
        <div className="h-9 w-40 bg-muted rounded mb-2" />
        <div className="h-6 w-24 bg-muted rounded-full mb-4" />
        <div className="h-5 w-36 bg-muted rounded" />
      </CardContent>
    </Card>
  )
}

export function QuickActionsSkeleton() {
  return (
    <div className="grid grid-cols-4 gap-3 mt-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-2 animate-pulse">
          <div className="w-14 h-14 bg-muted rounded-2xl" />
          <div className="h-3 w-12 bg-muted rounded" />
        </div>
      ))}
    </div>
  )
}

export function RecentActivitySkeleton() {
  return (
    <Card className="mt-6 shadow-sm border-0 animate-pulse">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="h-5 w-32 bg-muted rounded" />
          <div className="h-4 w-16 bg-muted rounded" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div>
                <div className="h-4 w-28 bg-muted rounded mb-1" />
                <div className="h-3 w-12 bg-muted rounded" />
              </div>
              <div className="h-4 w-16 bg-muted rounded" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function TransactionItemSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-muted rounded-full" />
        <div>
          <div className="h-4 w-28 bg-muted rounded mb-1" />
          <div className="h-3 w-12 bg-muted rounded" />
        </div>
      </div>
      <div className="h-4 w-16 bg-muted rounded" />
    </div>
  )
}

export function TransactionGroupSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 w-12 bg-muted rounded mb-2 mx-1" />
      <Card className="shadow-sm border-0">
        <CardContent className="p-0">
          {Array.from({ length: 1 }).map((_, i) => (
            <TransactionItemSkeleton key={i} />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export function ExtratoSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <TransactionGroupSkeleton key={i} />
      ))}
    </div>
  )
}

export function StatsCardSkeleton() {
  return (
    <Card className="shadow-sm border-0 animate-pulse">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-muted rounded-full" />
        </div>
        <div className="h-3 w-16 bg-muted rounded mb-1" />
        <div className="h-6 w-24 bg-muted rounded" />
      </CardContent>
    </Card>
  )
}

export function ChartSkeleton() {
  return (
    <Card className="mt-4 shadow-sm border-0 animate-pulse">
      <CardContent className="p-4">
        <div className="h-4 w-36 bg-muted rounded mb-4" />
        <div className="h-48 w-full bg-muted rounded" />
      </CardContent>
    </Card>
  )
}

export function MonthlySummarySkeleton() {
  return (
    <Card className="mt-4 shadow-sm border-0 animate-pulse">
      <CardContent className="p-4">
        <div className="h-4 w-28 bg-muted rounded mb-3" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div className="h-4 w-28 bg-muted rounded" />
              <div className="h-4 w-16 bg-muted rounded" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

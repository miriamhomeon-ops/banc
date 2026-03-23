"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRightLeft, Copy, QrCode, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useMemo } from "react"
import { BalanceCardSkeleton, QuickActionsSkeleton, RecentActivitySkeleton } from "@/components/skeletons"
import { generateTransactions, formatCurrency, formatDate } from "@/data/transactions"

const quickActions = [
  { icon: ArrowRightLeft, label: "Transferir", href: "/pix-transfer" },
  { icon: Copy, label: "Pix Copia e Cola", href: "/pix-transfer" },
  { icon: QrCode, label: "Escanear QR Code", href: "/pix-transfer" },
  { icon: TrendingUp, label: "Lucros", href: "/rendimentos" },
]

export default function HomePage() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  
  const transactions = useMemo(() => generateTransactions(), [])
  const recentTransactions = useMemo(() => transactions.slice(0, 3), [transactions])

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-primary px-4 pt-6 pb-24">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1 animate-fade-in">
              <span className="text-2xl font-black text-primary-foreground">99</span>
              <span className="text-xl font-semibold text-primary-foreground">Pay</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center animate-scale-in">
              <span className="text-lg font-bold text-foreground">N</span>
            </div>
            <div className="animate-fade-in">
              <p className="text-primary-foreground/80 text-sm">Olá,</p>
              <p className="text-primary-foreground font-semibold text-lg">{user?.name}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 -mt-16">
        {/* Balance Card */}
        {isLoading ? (
          <BalanceCardSkeleton />
        ) : (
          <Card className="shadow-lg border-0 animate-fade-in-up">
            <CardContent className="p-6">
              <p className="text-muted-foreground text-sm mb-1">Saldo total</p>
              <p className="text-3xl font-bold text-card-foreground mb-2 animate-count-up">
                R$ 24.105,66
              </p>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs bg-primary/10 text-primary-foreground px-2 py-1 rounded-full font-medium animate-scale-in" style={{ backgroundColor: 'rgba(245, 197, 24, 0.15)', color: '#b8940e' }}>
                  115% do CDI
                </span>
              </div>
              <div className="flex items-center gap-1 text-success animate-slide-in-right">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">Lucro mensal +R$31,03</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        {isLoading ? (
          <QuickActionsSkeleton />
        ) : (
          <div className="grid grid-cols-4 gap-3 mt-6">
            {quickActions.map((action, index) => (
              <Link
                key={action.label}
                href={action.href}
                className={`flex flex-col items-center gap-2 opacity-0 animate-fade-in stagger-${index + 1}`}
              >
                <div className="w-14 h-14 bg-card rounded-2xl flex items-center justify-center shadow-sm border border-border press-effect">
                  <action.icon className="h-6 w-6 text-foreground" />
                </div>
                <span className="text-xs text-center text-foreground font-medium leading-tight">
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* Recent Activity Card */}
        {isLoading ? (
          <RecentActivitySkeleton />
        ) : (
          <Card className="mt-6 shadow-sm border-0 animate-fade-in-up stagger-5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-card-foreground">Atividade recente</p>
                <Link href="/extrato" className="text-sm text-primary font-medium press-effect" style={{ color: '#b8940e' }}>
                  Ver tudo
                </Link>
              </div>
              <div className="space-y-3">
                {recentTransactions.map((item, index) => (
                  <div 
                    key={item.id} 
                    className={`flex items-center justify-between py-2 border-b border-border last:border-0 opacity-0 animate-slide-in-right stagger-${index + 1}`}
                  >
                    <div>
                      <p className="text-sm font-medium text-card-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(item.date)}</p>
                    </div>
                    <p className="text-sm font-semibold text-success">+{formatCurrency(item.amount)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}

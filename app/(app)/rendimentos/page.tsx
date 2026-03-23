"use client"

import { useMemo, useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { generateTransactions, formatCurrency } from "@/data/transactions"
import { TrendingUp, Wallet, PiggyBank } from "lucide-react"
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { StatsCardSkeleton, ChartSkeleton, MonthlySummarySkeleton } from "@/components/skeletons"

export default function RendimentosPage() {
  const [isLoading, setIsLoading] = useState(true)
  const transactions = useMemo(() => generateTransactions(), [])
  
  // Calculate totals
  const totalEarnings = useMemo(() => {
    return transactions.reduce((sum, t) => sum + t.amount, 0)
  }, [transactions])

  // Generate chart data (cumulative balance over time)
  const chartData = useMemo(() => {
    const baseBalance = 23000
    const data = []
    let runningBalance = baseBalance
    const months = ['Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar']
    const earningsPerMonth = totalEarnings / 7
    
    for (const month of months) {
      runningBalance += earningsPerMonth + (Math.random() * 20 - 10)
      data.push({
        month,
        balance: parseFloat(runningBalance.toFixed(2))
      })
    }
    
    // Ensure last value matches target
    if (data.length > 0) {
      data[data.length - 1].balance = 24105.66
    }
    
    return data
  }, [totalEarnings])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-primary px-4 pt-6 pb-6">
        <div className="max-w-md mx-auto animate-fade-in">
          <h1 className="text-xl font-bold text-primary-foreground">Rendimentos</h1>
          <p className="text-primary-foreground/80 text-sm mt-1">Acompanhe seus lucros</p>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 mt-4 pb-24">
        {/* Stats Cards */}
        {isLoading ? (
          <div className="grid grid-cols-2 gap-3">
            <StatsCardSkeleton />
            <StatsCardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <Card className="shadow-sm border-0 animate-fade-in-up press-effect">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center animate-scale-in">
                    <Wallet className="h-4 w-4 text-primary" style={{ color: '#b8940e' }} />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Saldo atual</p>
                <p className="text-lg font-bold text-card-foreground animate-count-up">R$ 24.105,66</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0 animate-fade-in-up stagger-2 press-effect">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center animate-scale-in stagger-2">
                    <PiggyBank className="h-4 w-4 text-success" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Total acumulado</p>
                <p className="text-lg font-bold text-success animate-count-up stagger-2">{formatCurrency(totalEarnings)}</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* CDI Rate Card */}
        {isLoading ? (
          <div className="mt-4">
            <StatsCardSkeleton />
          </div>
        ) : (
          <Card className="mt-4 shadow-sm border-0 animate-fade-in-up stagger-3 press-effect">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rentabilidade</p>
                  <p className="text-2xl font-bold text-card-foreground animate-count-up stagger-3">115% do CDI</p>
                </div>
                <div className="flex items-center gap-1 bg-success/10 px-3 py-1.5 rounded-full animate-scale-in stagger-4">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <span className="text-sm font-semibold text-success">+0,98% a.m.</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Growth Chart */}
        {isLoading ? (
          <ChartSkeleton />
        ) : (
          <Card className="mt-4 shadow-sm border-0 animate-fade-in-up stagger-4">
            <CardContent className="p-4">
              <p className="text-sm font-semibold text-card-foreground mb-4">Crescimento do saldo</p>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#888' }}
                    />
                    <YAxis 
                      hide
                      domain={['dataMin - 500', 'dataMax + 500']}
                    />
                    <Tooltip 
                      formatter={(value: number) => [formatCurrency(value), 'Saldo']}
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="balance"
                      stroke="#22c55e"
                      strokeWidth={2}
                      fill="url(#balanceGradient)"
                      animationDuration={1500}
                      animationEasing="ease-out"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Monthly Summary */}
        {isLoading ? (
          <MonthlySummarySkeleton />
        ) : (
          <Card className="mt-4 shadow-sm border-0 animate-fade-in-up stagger-5">
            <CardContent className="p-4">
              <p className="text-sm font-semibold text-card-foreground mb-3">Resumo mensal</p>
              <div className="space-y-3">
                {[
                  { month: "Março 2026", earnings: 31.03 },
                  { month: "Fevereiro 2026", earnings: 89.42 },
                  { month: "Janeiro 2026", earnings: 95.18 },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between py-2 border-b border-border last:border-0 opacity-0 animate-slide-in-right stagger-${index + 1}`}
                  >
                    <p className="text-sm text-card-foreground">{item.month}</p>
                    <p className="text-sm font-semibold text-success">
                      +{formatCurrency(item.earnings)}
                    </p>
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

"use client"

import { useMemo, useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { generateTransactions, formatCurrency, formatDate, groupTransactionsByDate } from "@/data/transactions"
import { TrendingUp } from "lucide-react"
import { ExtratoSkeleton, StatsCardSkeleton } from "@/components/skeletons"

export default function ExtratoPage() {
  const [isLoading, setIsLoading] = useState(true)
  const transactions = useMemo(() => generateTransactions(), [])
  const groupedTransactions = useMemo(() => groupTransactionsByDate(transactions), [transactions])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-primary px-4 pt-6 pb-6">
        <div className="max-w-md mx-auto animate-fade-in">
          <h1 className="text-xl font-bold text-primary-foreground">Extrato</h1>
          <p className="text-primary-foreground/80 text-sm mt-1">Histórico de transações</p>
        </div>
      </header>

      {/* Balance Summary */}
      <div className="max-w-md mx-auto px-4 -mt-0">
        {isLoading ? (
          <div className="mt-4">
            <StatsCardSkeleton />
          </div>
        ) : (
          <Card className="mt-4 shadow-sm border-0 animate-fade-in-up">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Saldo atual</p>
                  <p className="text-2xl font-bold text-card-foreground animate-count-up">R$ 24.105,66</p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center animate-scale-in">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Transactions List */}
      <div className="max-w-md mx-auto px-4 mt-4 pb-24">
        {isLoading ? (
          <ExtratoSkeleton />
        ) : (
          <div className="space-y-4">
            {Array.from(groupedTransactions.entries()).map(([dateKey, dayTransactions], groupIndex) => (
              <div 
                key={dateKey} 
                className={`opacity-0 animate-fade-in-up`}
                style={{ animationDelay: `${Math.min(groupIndex * 0.05, 0.3)}s` }}
              >
                <p className="text-sm font-semibold text-muted-foreground mb-2 px-1">
                  {formatDate(dayTransactions[0].date)}
                </p>
                <Card className="shadow-sm border-0">
                  <CardContent className="p-0">
                    {dayTransactions.map((transaction, index) => (
                      <div
                        key={transaction.id}
                        className={`flex items-center justify-between p-4 press-effect ${
                          index < dayTransactions.length - 1 ? "border-b border-border" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                            <TrendingUp className="h-5 w-5 text-success" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-card-foreground">
                              {transaction.label}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {transaction.date.toLocaleTimeString('pt-BR', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-success">
                          +{formatCurrency(transaction.amount)}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
